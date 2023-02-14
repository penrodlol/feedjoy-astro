import { cluster } from 'radash';
import supabase, { Post } from '.';

export const getSites = async () =>
  supabase
    .from('site')
    .select('*, post!inner(pub_date)')
    .not('post.pub_date', 'is', null)
    .order('name', { ascending: true })
    .then(({ data, error }) => {
      if (error) throw new Error(error.message);

      const chunks = cluster(data, 30);
      return chunks.map((_sites, i) => {
        const current = i + 1;
        const isFirst = current === 1;
        const isLast = current === chunks.length;
        const sites = _sites.map(({ post, ...site }) => {
          const posts = post as Array<Post>;
          return { ...site, total: posts.length, lastest: posts[0]?.pub_date };
        });

        return { sites, current, isFirst, isLast };
      });
    });
