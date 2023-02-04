import { createClient } from '@supabase/supabase-js';
import type { Database } from './index.d';

export type Post = Database['public']['Tables']['post']['Row'];

export const supabase = createClient<Database>(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
);
