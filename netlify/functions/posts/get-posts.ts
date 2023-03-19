import type { Site } from '@lib/supabase';
import { flat, parallel } from 'radash';
import Parser from 'rss-parser';

export const getPosts = async (sites: Array<Site>) => {
  const parser = new Parser();
  const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
  const payload = await parallel(15, sites, async (site) => {
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
  });

  return flat(payload);
};
