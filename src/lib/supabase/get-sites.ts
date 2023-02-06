import { cluster } from 'radash';
import supabase from '.';

export type GetSites = Awaited<ReturnType<typeof getSites>>;

export const getSites = async () =>
  supabase
    .from('site')
    .select()
    .order('name', { ascending: true })
    .then(({ data, error }) => {
      if (error) throw new Error(error.message);

      const chunks = cluster(data, 30);
      return chunks.map((sites, i) => {
        const current = i + 1;
        const isFirst = current === 1;
        const isLast = current === chunks.length;

        return { sites, current, isFirst, isLast };
      });
    });
