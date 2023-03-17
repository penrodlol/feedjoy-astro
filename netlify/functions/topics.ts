import type { Database } from '@lib/supabase/types';
import { schedule } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';
import { Configuration, OpenAIApi } from 'openai';

const { SUPABASE_URL, SUPABASE_SERVICE_ROLE, OPENAI_API_KEY } = process.env;
const supabase = createClient<Database>(SUPABASE_URL!, SUPABASE_SERVICE_ROLE!);
const openai = new OpenAIApi(new Configuration({ apiKey: OPENAI_API_KEY! }));

export const handler = schedule('@weekly', async () => {
  const posts = await supabase
    .from('post')
    .select()
    .order('pub_date', { ascending: false })
    .limit(10);

  if (posts.error) {
    console.error(posts.error);
    return { statusCode: 500 };
  }

  const titles = posts.data.map((post) => `- ${post.title.trim()}`).join('\n');
  const prompt =
    'What are the top 5 web development frameworks and tools in the following list?' +
    `Return a comma delimited list.\n\n${titles}\n\n`;

  const payload = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  });

  const _topics = payload.data.choices?.[0]?.message?.content;
  const topics = _topics?.split(',').map((topic) => topic.trim());
  if (!topics) return { statusCode: 500 };

  const stats = await supabase
    .from('topic')
    .insert(topics.map((name) => ({ name })));

  if (stats.error) {
    console.error(stats.error);
    return { statusCode: 500 };
  }

  return { statusCode: 200 };
});
