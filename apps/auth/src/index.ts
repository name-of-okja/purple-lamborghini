import { createSupabaseClient } from '@repo/supabase';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { jwt, sign } from 'hono/jwt';

const app = new Hono<{ Bindings: Bindings }>();

app.use('*', cors());

app.use('/me', async (c, next) => {
  const jwtMiddleware = jwt({
    secret: c.env.JWT_KEY,
  });

  return jwtMiddleware(c, next);
});

app.post('/login', async (c) => {
  try {
    const { email } = await c.req.json();

    if (!email) {
      return c.json({ error: 'Required Email' }, 400);
    }

    const db = createSupabaseClient(c);

    const { data } = await db
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    let user = data;
    if (data == null) {
      const { data, error } = await db
        .from('users')
        .insert({ email })
        .select('*')
        .single();
      if (error) {
        return c.json({ error: error.message }, 400);
      }
      user = data;
    }

    const payload = {
      sub: user!.user_id,
      email: user!.email,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2,
    };

    const token = await sign(payload, c.env.JWT_KEY);

    return c.json({ token });
  } catch (err) {
    console.error('Login Error', err);
    return c.json({ error: 'Internal server Error' }, 500);
  }
});

app.get('/me', (c) => {
  const payload = c.get('jwtPayload');
  if (!payload) {
    return c.json({ error: 'Unauthorized - No payload' }, 401);
  }
  return c.json({
    userId: payload.sub,
    email: payload.email,
  });
});

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

export default app;

type Bindings = {
  JWT_KEY: string;
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
};
