-- PMkisanOnline database schema for Supabase (Postgres).
-- Run this once in your Supabase project's SQL Editor:
-- Dashboard -> SQL Editor -> New Query -> paste this file -> Run

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- States table -----------------------------------------------------------
create table if not exists states (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

-- Seed the 28 Indian states (safe to re-run - ON CONFLICT skips duplicates)
insert into states (name, slug) values
  ('Andhra Pradesh', 'andhra-pradesh'),
  ('Arunachal Pradesh', 'arunachal-pradesh'),
  ('Assam', 'assam'),
  ('Bihar', 'bihar'),
  ('Chhattisgarh', 'chhattisgarh'),
  ('Goa', 'goa'),
  ('Gujarat', 'gujarat'),
  ('Haryana', 'haryana'),
  ('Himachal Pradesh', 'himachal-pradesh'),
  ('Jharkhand', 'jharkhand'),
  ('Karnataka', 'karnataka'),
  ('Kerala', 'kerala'),
  ('Madhya Pradesh', 'madhya-pradesh'),
  ('Maharashtra', 'maharashtra'),
  ('Manipur', 'manipur'),
  ('Meghalaya', 'meghalaya'),
  ('Mizoram', 'mizoram'),
  ('Nagaland', 'nagaland'),
  ('Odisha', 'odisha'),
  ('Punjab', 'punjab'),
  ('Rajasthan', 'rajasthan'),
  ('Sikkim', 'sikkim'),
  ('Tamil Nadu', 'tamil-nadu'),
  ('Telangana', 'telangana'),
  ('Tripura', 'tripura'),
  ('Uttar Pradesh', 'uttar-pradesh'),
  ('Uttarakhand', 'uttarakhand'),
  ('West Bengal', 'west-bengal')
on conflict (slug) do nothing;

-- Posts (schemes) table ----------------------------------------------------
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null check (category in ('central', 'state')),
  benefit text not null default '',
  last_date text not null default 'Ongoing',
  short_summary text not null default '',
  description text not null default '',
  eligibility text[] not null default '{}',
  documents_required text[] not null default '{}',
  how_to_apply text not null default '',
  official_link text,
  state_id uuid references states(id) on delete set null,
  status text not null default 'active' check (status in ('active', 'expired', 'upcoming')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_category_idx on posts(category);
create index if not exists posts_status_idx on posts(status);
create index if not exists posts_state_id_idx on posts(state_id);

-- Row Level Security ---------------------------------------------------
-- Public (anon) visitors can only READ. All writes go through the app's
-- API routes, which use the SUPABASE_SERVICE_ROLE_KEY (server-only) and
-- bypass RLS after checking the caller is a logged-in admin.
alter table states enable row level security;
alter table posts enable row level security;

drop policy if exists "Public read access to states" on states;
create policy "Public read access to states"
  on states for select
  to anon, authenticated
  using (true);

drop policy if exists "Public read access to posts" on posts;
create policy "Public read access to posts"
  on posts for select
  to anon, authenticated
  using (true);

-- Storage bucket for scheme images/attachments -----------------------------
insert into storage.buckets (id, name, public)
values ('scheme-assets', 'scheme-assets', true)
on conflict (id) do nothing;

drop policy if exists "Public read access to scheme-assets" on storage.objects;
create policy "Public read access to scheme-assets"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'scheme-assets');
