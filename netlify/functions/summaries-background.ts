import type { Database } from '@lib/supabase/types';
import type { BackgroundHandler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';
import { load } from 'cheerio';
import fetch from 'node-fetch';
import { Configuration, OpenAIApi } from 'openai';
import { parallel, sift } from 'radash';

const { ACCESS_TOKEN, OPENAI_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE } =
  process.env;
const supabase = createClient<Database>(SUPABASE_URL!, SUPABASE_SERVICE_ROLE!);
const openai = new OpenAIApi(new Configuration({ apiKey: OPENAI_API_KEY! }));

export const handler: BackgroundHandler = async ({ headers }) => {
  if (headers['X-Access-Token'] !== ACCESS_TOKEN) return;

  const posts = await supabase.from('post').select().is('summary', null);
  if (posts.error) return console.error(posts.error);
  if (!posts.data.length) return;

  const summaries = sift(
    await parallel(15, posts.data, async (post) => {
      const $ = load(await fetch(post.link).then((res) => res.text()));
      const content = $('main p')
        .children()
        .remove()
        .end()
        .text()
        .slice(0, 3800);

      const payload = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', content: `Summarize in 1 paragraph: ${content}` },
        ],
      });

      const summary = payload.data.choices?.[0]?.message?.content;
      return summary != null ? { id: post.id, summary } : null;
    }),
  );

  if (!summaries.length) return;

  const payload = await supabase.rpc('bulk_update_summaries', { summaries });

  if (payload.error) return console.error(payload.error);
};
