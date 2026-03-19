create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  fid bigint unique not null,
  username text,
  wallet_address text,
  total_points integer not null default 0,
  streak integer not null default 0,
  last_checkin_date date,
  created_at timestamptz not null default now()
);

create table if not exists checkins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  checkin_date date not null,
  fee_amount numeric(18,8) not null default 0,
  fee_symbol text not null default 'ETH',
  points_earned integer not null default 0,
  created_at timestamptz not null default now(),
  unique(user_id, checkin_date)
);

create table if not exists quests (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  type text not null,
  points_reward integer not null default 0,
  is_daily boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists quest_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  quest_id uuid not null references quests(id) on delete cascade,
  proof_url_or_text text,
  status text not null default 'pending',
  points_earned integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists point_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  source text not null,
  amount integer not null,
  meta jsonb,
  created_at timestamptz not null default now()
);

create table if not exists conversions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  points_spent integer not null,
  token_amount numeric(18,8) not null default 0,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

insert into quests (title, description, type, points_reward, is_daily)
values
  ('Follow akun utama', 'Follow akun campaign utama', 'follow', 15, true),
  ('Like + recast post campaign', 'Like jeung recast post utama', 'engagement', 20, true),
  ('Cast kalimat campaign', 'Nyieun cast nurutkeun parentah', 'cast', 30, true)
on conflict do nothing;
