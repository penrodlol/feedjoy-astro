import { createClient } from '@supabase/supabase-js';
import type { Database } from './index.d';

export default createClient<Database>(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
);
