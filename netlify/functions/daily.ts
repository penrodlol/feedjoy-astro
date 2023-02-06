import type { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';
import { parallel } from 'radash';
import Parser from 'rss-parser';

export const handler: Handler = async () => {
  const url = process.env.PUBLIC_SUPABASE_URL;
  const key = process.env.PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { statusCode: 403 };

  const supabase = createClient(url, key);

  const urls = await supabase.from('url').select();
  if (urls.error) return { statusCode: 500, body: urls.error.message };

  const parser = new Parser();
  await parallel(5, urls.data, async ({ id: site_id, url }) =>
    parser.parseURL(url).then(({ title: site, link, items: posts }) => {
      if (!site || !link || !posts) return;

      return supabase.from('post').upsert(
        posts
          .filter((post) => post.title && post.link && post.pubDate)
          .map((post) => ({
            title: post.title,
            link: post.link,
            pub_date: post.pubDate,
            site_id,
          })),
        { onConflict: 'site_id, link', ignoreDuplicates: true },
      );
    }),
  );

  return { statusCode: 200 };
};
