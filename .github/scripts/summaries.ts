import { createClient } from '@supabase/supabase-js';
import { load } from 'cheerio';
import fetch from 'node-fetch';
import { Configuration, OpenAIApi } from 'openai';
import { parallel, sift } from 'radash';
import type { Database } from '../../src/lib/supabase/types';

const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!,
);

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY! }),
);

const posts = await supabase.from('post').select().is('summary', null);
if (posts.error) throw posts.error;

const summaries = sift(
  await parallel(15, posts.data, async (post) => {
    const $ = load(await fetch(post.link).then((res) => res.text()));
    const root = $('article').length > 0 ? $('article p') : $('body p');
    const text = root.children().remove().end().text().slice(0, 3800);
    const payload = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: `Summarize in 1 paragraph: ${text}` },
      ],
    });

    const summary = payload.data.choices?.[0]?.message?.content;
    return summary != null ? { id: post.id, summary } : null;
  }),
);

const payload = await supabase.rpc('bulk_update_summaries', { summaries });
if (payload.error) throw payload.error;