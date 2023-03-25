import type { Database } from '@lib/supabase/types';
import { createClient } from '@supabase/supabase-js';
import { flat, parallel } from 'radash';
import Parser from 'rss-parser';

const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!,
);

(async () => {
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
})();
