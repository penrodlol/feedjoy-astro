import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

export type Site = Database['public']['Tables']['site']['Row'];
export type Post = Database['public']['Tables']['post']['Row'];

export default createClient<Database>(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
);
