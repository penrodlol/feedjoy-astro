import type { Database } from '@lib/supabase/types';
import type { BackgroundHandler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';
import { flat, parallel } from 'radash';
import Parser from 'rss-parser';

const { ACCESS_TOKEN, SUPABASE_URL, SUPABASE_SERVICE_ROLE } = process.env;
const supabase = createClient<Database>(SUPABASE_URL!, SUPABASE_SERVICE_ROLE!);

export const handler: BackgroundHandler = async ({ headers }) => {
  if (headers['X-Access-Token'] !== ACCESS_TOKEN) return;

  const sites = await supabase.from('site').select();
  if (sites.error) return console.error(sites.error);

  const parser = new Parser();
  const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
  const posts = flat(
    await parallel(15, sites.data, async (site) => {
      const feed = await parser.parseURL(site.url);

      return feed.items
        .filter((post) => post.title && post.link && post.pubDate)
        .filter((post) => new Date(post.pubDate as string) > twoDaysAgo)
        .map((post) => ({
          site_id: site.id,
          title: post.title as string,
          link: post.link as string,
          pub_date: post.pubDate as string,
        }));
    }),
  );

  const payload = await supabase
    .from('post')
    .upsert(posts, { onConflict: 'site_id, link', ignoreDuplicates: true });

  if (payload.error) return console.error(payload.error);
};
