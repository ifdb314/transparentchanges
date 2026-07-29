-- TransparentChanges — Supabase schema
-- Run this once in your Supabase project's SQL Editor (Dashboard → SQL Editor → New query → paste → Run).

create extension if not exists "pgcrypto";

-- 1. Founding Circle pledges (money / spread the word / volunteer / employee)
create table if not exists founding_circle_entries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  pledge_type text not null check (pledge_type in ('money', 'word', 'volunteer', 'employee')),
  name text not null,
  location text not null,
  amount_cents integer,              -- null unless pledge_type = 'money'
  help_text text,                    -- "how can you help, what can you do" — volunteer/employee only
  source_page text,                  -- which page the pledge came from, for attribution
  user_agent text
);

-- 2. Suggested industries (from the Ventures page "Suggest an Industry" form)
create table if not exists industry_suggestions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  industry text not null,
  why_needed text not null,
  name text not null,
  location text not null,
  votes integer not null default 0
);

-- 3. Ventures + upvotes (seeded with the 5 official ventures)
create table if not exists ventures (
  slug text primary key,
  name text not null,
  votes integer not null default 0,
  is_official boolean not null default true
);

insert into ventures (slug, name, votes, is_official) values
  ('rides', 'Rides', 749, true),
  ('market', 'Market', 612, true),
  ('law', 'Law', 588, true),
  ('plumbing', 'Plumbing', 501, true),
  ('home-building', 'Home Building', 467, true)
on conflict (slug) do nothing;

-- Row Level Security: the public site can INSERT (submit forms, upvote) but cannot
-- read anything back — reads only happen server-side with the service role key
-- (used by the admin dashboard, which never ships to the browser).
alter table founding_circle_entries enable row level security;
alter table industry_suggestions enable row level security;
alter table ventures enable row level security;

create policy "public can submit pledges" on founding_circle_entries
  for insert to anon with check (true);

create policy "public can submit suggestions" on industry_suggestions
  for insert to anon with check (true);

create policy "public can read venture vote counts" on ventures
  for select to anon using (true);

-- Note: there is deliberately no public UPDATE policy on `ventures` or
-- `industry_suggestions` — vote increments go through the server-side API
-- route (using the service role key), which does simple abuse-resistant
-- rate limiting before writing. See app/api/*/route.ts.
