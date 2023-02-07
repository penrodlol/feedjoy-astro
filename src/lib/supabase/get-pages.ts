import { cluster } from 'radash';
import supabase, { Site } from '.';

export const getPages = async () =>
  supabase
    .from('post')
    .select('*, site (name)')
    .order('pub_date', { ascending: false })
    .then(({ data, error }) => {
      if (error) throw new Error(error.message);

      const chunks = cluster(data, 30);
      return chunks.map((_posts, i) => {
        const current = i + 1;
        const isFirst = current === 1;
        const isLast = current === chunks.length;
        const posts = _posts.map((_post) => {
          const { site, ...post } = _post;
          return { ...post, siteName: (site as Site).name };
        });

        return { posts, current, isFirst, isLast };
      });
    });
