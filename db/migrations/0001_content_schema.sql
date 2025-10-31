-- Migration: initial content schema for Supabase
-- Safe to run multiple times (guards where possible)

-- Enable required extensions
create extension if not exists "pgcrypto";

-- ==============================
-- TABLE: categories
-- ==============================
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  created_at timestamptz default now()
);

-- ==============================
-- TABLE: contents
-- ==============================
create table if not exists contents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  body text,
  type text check (type in ('article', 'announcement', 'event', 'page')) default 'article',
  thumbnail text,
  status text check (status in ('draft', 'published')) default 'published',
  category_id uuid references categories(id) on delete set null,
  tags text[],
  published_at timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ==============================
-- TABLE: events
-- ==============================
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  content_id uuid references contents(id) on delete cascade,
  location text,
  start_date timestamptz,
  end_date timestamptz,
  organizer text
);

-- ==============================
-- TABLE: services
-- ==============================
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  url text not null,
  icon text,
  category text,
  status text default 'active',
  created_at timestamptz default now()
);

-- ==============================
-- TRIGGERS: updated_at for contents
-- ==============================
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_contents_updated_at on contents;
create trigger trg_contents_updated_at
before update on contents
for each row execute function set_updated_at();

-- ==============================
-- INDEXES
-- ==============================
create index if not exists idx_contents_status on contents(status);
create index if not exists idx_contents_category on contents(category_id);
create index if not exists idx_events_content_id on events(content_id);
create index if not exists idx_services_status on services(status);

-- ==============================
-- ROW LEVEL SECURITY (RLS)
-- Enable and add read policies suitable for public content
-- ==============================
alter table if exists categories enable row level security;
alter table if exists contents enable row level security;
alter table if exists events enable row level security;
alter table if exists services enable row level security;

-- Categories readable by everyone
do $$
begin
  if not exists (
    select 1 from pg_policies where schemaname = current_schema and tablename = 'categories' and policyname = 'categories_select_all'
  ) then
    create policy categories_select_all on categories for select using (true);
  end if;
end; $$;

-- Only published contents are publicly readable
do $$
begin
  if not exists (
    select 1 from pg_policies where schemaname = current_schema and tablename = 'contents' and policyname = 'contents_select_published'
  ) then
    create policy contents_select_published on contents for select to anon, authenticated using (status = 'published');
  end if;
end; $$;

-- Events for published contents are publicly readable
do $$
begin
  if not exists (
    select 1 from pg_policies where schemaname = current_schema and tablename = 'events' and policyname = 'events_select_for_published_contents'
  ) then
    create policy events_select_for_published_contents on events for select to anon, authenticated using (
      exists (
        select 1 from contents c where c.id = events.content_id and c.status = 'published'
      )
    );
  end if;
end; $$;

-- Only active services are publicly readable
do $$
begin
  if not exists (
    select 1 from pg_policies where schemaname = current_schema and tablename = 'services' and policyname = 'services_select_active'
  ) then
    create policy services_select_active on services for select to anon, authenticated using (status = 'active');
  end if;
end; $$;

-- Note: No insert/update/delete policies are defined. Writes remain blocked unless you add policies
-- (recommended: restrict to service role or authenticated admins).

