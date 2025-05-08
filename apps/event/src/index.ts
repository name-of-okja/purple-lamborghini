import { Hono } from 'hono';
import { createSupabaseClient } from '@repo/supabase';
type Bindings = {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();
app.get('/', async (c) => {
  const db = createSupabaseClient(c);
  const result = await db.from('event').select('*');

  return c.json(result);
});

export default app;
