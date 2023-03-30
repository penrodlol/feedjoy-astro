import { createClient } from '@supabase/supabase-js';
import { load } from 'cheerio';
import fetch from 'node-fetch';
import { Configuration, OpenAIApi } from 'openai';
import { parallel, sift } from 'radash';
import UserAgent from 'user-agents';
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

const headers = { 'User-Agent': new UserAgent(/Chrome/).toString() };
const summaries = sift(
  await parallel(15, posts.data, async ({ id, link }) => {
    const $ = load(await fetch(link, { headers }).then((res) => res.text()));
    $('header, footer, aside, noscript').remove();
    const root = $('main').length > 0 ? $('main p') : $('body p');
    const fullText = root.text().replace(/[^\x00-\x7F]/g, '');
    const text = fullText.split(' ').slice(0, 8000).join(' ');

    const payload = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'user', content: `Summarize in 1 paragraph: ${text}` },
      ],
    });

    const summary = payload.data.choices?.[0]?.message?.content;
    return summary != null ? { id, summary } : null;
  }),
);

const payload = await supabase.rpc('bulk_update_summaries', { summaries });
if (payload.error) throw payload.error;
