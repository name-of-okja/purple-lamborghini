create table users (
  user_id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamp with time zone not null default now()
);