import { cluster } from 'radash';
import supabase, { Post } from '.';

export const getSite = async () =>
  supabase
    .from('site')
    .select('*, post(*)')
    .order('pub_date', { ascending: false, foreignTable: 'post' })
    .then(({ data, error }) => {
      if (error) throw new Error(error.message);

      return data.map((_site) => {
        const { post, ...site } = _site;
        const chunks = cluster(post as Array<Post>, 30);
        const pages = chunks.map((posts, i) => {
          const current = i + 1;
          const isFirst = current === 1;
          const isLast = current === chunks.length;
          return { posts, current, isFirst, isLast };
        });

        return { ...site, pages };
      });
    });
