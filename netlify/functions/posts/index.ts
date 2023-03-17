import type { Database } from '@lib/supabase/types';
import { schedule } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';
import { getPosts } from './get-posts';
import { getSummaries } from './get-summaries';

const { SUPABASE_URL, SUPABASE_SERVICE_ROLE } = process.env;
const supabase = createClient<Database>(SUPABASE_URL!, SUPABASE_SERVICE_ROLE!);

export const handler = schedule('@daily', async () => {
  const sites = await supabase.from('site').select();
  if (sites.error) {
    console.error(sites.error);
    return { statusCode: 500 };
  }

  const posts = await getPosts(sites.data);
  if (!posts.length) return { statusCode: 200 };

  const upserted = await supabase
    .from('post')
    .upsert(posts, { onConflict: 'site_id, link', ignoreDuplicates: true })
    .select();
  if (upserted.error) {
    console.error(upserted.error);
    return { statusCode: 500 };
  }
  if (!upserted.data.length) return { statusCode: 200 };

  const summaries = await getSummaries(upserted.data);
  if (!summaries.length) return { statusCode: 200 };

  const updated = await supabase.rpc('bulk_update_summaries', { summaries });
  if (updated.error) {
    console.error(updated.error);
    return { statusCode: 500 };
  }

  return { statusCode: 200 };
});
