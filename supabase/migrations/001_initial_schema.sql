-- SocialLite Calendar – initial schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles (extends auth.users)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Calendars (private, duo, group, community, public)
create type calendar_mode as enum ('private', 'duo', 'group', 'community', 'public');
create table public.calendars (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  mode calendar_mode not null,
  owner_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Calendar members (for shared/group calendars – stores per-user color)
create table public.calendar_members (
  id uuid primary key default uuid_generate_v4(),
  calendar_id uuid not null references public.calendars(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null check (role in ('owner', 'member', 'viewer')),
  color_hex text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  unique(calendar_id, user_id)
);

-- Duo links (pair of users + shared calendar)
create table public.duo_links (
  id uuid primary key default uuid_generate_v4(),
  user_a_id uuid not null references public.profiles(id) on delete cascade,
  user_b_id uuid not null references public.profiles(id) on delete cascade,
  calendar_id uuid not null references public.calendars(id) on delete cascade,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  unique(user_a_id, user_b_id)
);

-- Friendships (for Duo/Group: "connected friends only")
create table public.friendships (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  friend_id uuid not null references public.profiles(id) on delete cascade,
  status text not null check (status in ('pending', 'accepted')),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  unique(user_id, friend_id),
  check (user_id != friend_id)
);

-- Event category and status
create type event_category as enum ('work', 'personal', 'health', 'hobbies');
create type event_status as enum ('scheduled', 'tentative', 'cancelled');

-- Events (all modes; calendar_id null = private event not on a shared calendar)
create table public.events (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  calendar_id uuid references public.calendars(id) on delete set null,
  title text not null,
  description text,
  start_at timestamptz not null,
  end_at timestamptz not null,
  category event_category not null default 'personal',
  is_confidential boolean not null default false,
  is_recurring boolean not null default false,
  recurrence_rule text,
  status event_status not null default 'scheduled',
  location text,
  reminder_minutes int,
  mode calendar_mode not null default 'private',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Event proposals (group/community: propose → accept/reject)
create table public.event_proposals (
  id uuid primary key default uuid_generate_v4(),
  event_id uuid not null references public.events(id) on delete cascade,
  calendar_id uuid not null references public.calendars(id) on delete cascade,
  proposed_by uuid not null references public.profiles(id) on delete cascade,
  status text not null check (status in ('pending', 'accepted', 'rejected')),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Event attendees (who accepted/declined – for group/community visibility)
create table public.event_attendees (
  id uuid primary key default uuid_generate_v4(),
  event_id uuid not null references public.events(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  response text not null check (response in ('accepted', 'declined', 'pending')),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  unique(event_id, user_id)
);

-- Communities (Tab 4 – hosts create, members join)
create table public.communities (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  host_id uuid not null references public.profiles(id) on delete cascade,
  description text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create table public.community_members (
  id uuid primary key default uuid_generate_v4(),
  community_id uuid not null references public.communities(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null check (role in ('host', 'member')),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  unique(community_id, user_id)
);

-- Public events (Tab 5 – sign up / host; no per-user acceptance visibility)
create table public.public_events (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  start_at timestamptz not null,
  end_at timestamptz not null,
  location text,
  host_id uuid not null references public.profiles(id) on delete cascade,
  is_public boolean not null default true,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Indexes for common queries
create index idx_events_user_start on public.events(user_id, start_at);
create index idx_events_calendar_start on public.events(calendar_id, start_at) where calendar_id is not null;
create index idx_events_mode on public.events(mode);
create index idx_calendar_members_calendar on public.calendar_members(calendar_id);
create index idx_calendar_members_user on public.calendar_members(user_id);
create index idx_duo_links_user_a on public.duo_links(user_a_id);
create index idx_duo_links_user_b on public.duo_links(user_b_id);
create index idx_public_events_start on public.public_events(start_at);

-- RLS (simplified – tighten per your auth rules)
alter table public.profiles enable row level security;
alter table public.calendars enable row level security;
alter table public.calendar_members enable row level security;
alter table public.duo_links enable row level security;
alter table public.friendships enable row level security;
alter table public.events enable row level security;
alter table public.event_proposals enable row level security;
alter table public.event_attendees enable row level security;
alter table public.communities enable row level security;
alter table public.community_members enable row level security;
alter table public.public_events enable row level security;

-- Profiles: users can read/update own
create policy "Profiles select own" on public.profiles for select using (auth.uid() = id);
create policy "Profiles update own" on public.profiles for update using (auth.uid() = id);
create policy "Profiles insert own" on public.profiles for insert with check (auth.uid() = id);

-- Events: users can CRUD own; add policies for shared calendars as needed
create policy "Events select own" on public.events for select using (auth.uid() = user_id);
create policy "Events insert own" on public.events for insert with check (auth.uid() = user_id);
create policy "Events update own" on public.events for update using (auth.uid() = user_id);
create policy "Events delete own" on public.events for delete using (auth.uid() = user_id);

-- Public events: anyone can read
create policy "Public events select" on public.public_events for select using (true);
create policy "Public events insert own" on public.public_events for insert with check (auth.uid() = host_id);
create policy "Public events update own" on public.public_events for update using (auth.uid() = host_id);
create policy "Public events delete own" on public.public_events for delete using (auth.uid() = host_id);

-- Trigger to keep updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();
create trigger calendars_updated_at before update on public.calendars
  for each row execute function public.set_updated_at();
create trigger events_updated_at before update on public.events
  for each row execute function public.set_updated_at();
