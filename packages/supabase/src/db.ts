import { createClient } from '@supabase/supabase-js';
import { Database } from './supabase.types.js';

export function createSupabaseClient(c: any) {
  const SUPABASE_URL = c.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = c.env.SUPABASE_ANON_KEY;
  return createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
}
