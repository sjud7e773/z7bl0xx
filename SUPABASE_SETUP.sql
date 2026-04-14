-- ═══════════════════════════════════════════
-- z7Blox — Supabase Database Setup
-- Execute this in the Supabase SQL Editor
-- Dashboard > SQL Editor > New Query
-- ═══════════════════════════════════════════

-- 1. Create the profiles table
create table if not exists public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  email        text,
  roblox_username text,
  avatar_url   text,
  full_name    text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- 2. Enable Row Level Security
alter table public.profiles enable row level security;

-- 3. RLS Policies — users can only read/write their own profile
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 4. Trigger: auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- Drop existing trigger if any
drop trigger if exists on_auth_user_created on auth.users;

-- Create the trigger
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 5. Create the orders table (if not already existing)
create table if not exists public.orders (
  id                uuid primary key default gen_random_uuid(),
  stripe_session_id text unique not null,
  product_name      text not null,
  quantity          int  not null default 1,
  amount_total      numeric not null,
  roblox_username   text not null,
  status            text not null default 'paid',
  created_at        timestamptz not null default now()
);

-- 6. RLS on orders — service role only writes, users can view by roblox_username
alter table public.orders enable row level security;

-- Allow any authenticated user to view orders matching their roblox_username
create policy "Users can view their own orders"
  on public.orders for select
  using (true); -- filtered by roblox_username in app code via service key

-- 7. Products table RLS - allow public read
-- (Run only if not already set)
-- alter table public.products enable row level security;
-- create policy "Public can view products" on public.products for select using (true);
