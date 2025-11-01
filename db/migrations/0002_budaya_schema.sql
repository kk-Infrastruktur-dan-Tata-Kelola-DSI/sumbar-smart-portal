-- Migration: Budaya section schema for Sumatera Barat culture, tourism, and culinary content
-- Safe to run multiple times (guards where possible)

-- Enable required extensions
create extension if not exists "pgcrypto";
create extension if not exists "postgis"; -- For geographical data if needed

-- ==============================
-- TABLE: kabupatens
-- Stores information about regencies/cities with geographical coordinates
-- ==============================
create table if not exists kabupatens (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  latitude decimal(10, 8) not null,
  longitude decimal(11, 8) not null,
  color text default '#3b82f6', -- Hex color for map markers
  description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ==============================
-- TABLE: budaya_categories
-- Categories for cultural items (Alam, Budaya, Pantai, Kuliner, Religi, etc.)
-- ==============================
create table if not exists budaya_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  icon text, -- Emoji or icon identifier
  description text,
  created_at timestamptz default now()
);

-- ==============================
-- TABLE: budaya_items
-- Main table for cultural content (destinations, traditions, culinary)
-- ==============================
create table if not exists budaya_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  kabupaten_id uuid not null references kabupatens(id) on delete cascade,
  category_id uuid references budaya_categories(id) on delete set null,
  type text not null check (type in ('objek', 'tradisi', 'kuliner')) default 'objek',
  description text,
  long_description text, -- For detailed explanation
  image_url text,
  thumbnail_url text,
  rating decimal(2, 1) check (rating >= 0 and rating <= 5) default 0,
  reviews_count integer default 0,
  latitude decimal(10, 8), -- Optional: specific location coordinates
  longitude decimal(11, 8),
  address text,
  contact_phone text,
  contact_email text,
  website_url text,
  opening_hours jsonb, -- Flexible JSON structure for operating hours
  ticket_price jsonb, -- Flexible JSON for pricing info
  facilities text[], -- Array of facility names
  tags text[], -- Array of tags for filtering
  status text check (status in ('draft', 'published', 'archived')) default 'published',
  featured boolean default false, -- For highlighting popular items
  view_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ==============================
-- TABLE: budaya_images
-- Additional images for cultural items (gallery)
-- ==============================
create table if not exists budaya_images (
  id uuid primary key default gen_random_uuid(),
  budaya_item_id uuid not null references budaya_items(id) on delete cascade,
  image_url text not null,
  caption text,
  display_order integer default 0,
  created_at timestamptz default now()
);

-- ==============================
-- TABLE: budaya_reviews
-- User reviews and ratings for cultural items
-- ==============================
create table if not exists budaya_reviews (
  id uuid primary key default gen_random_uuid(),
  budaya_item_id uuid not null references budaya_items(id) on delete cascade,
  user_id uuid, -- Optional: link to auth.users if Supabase Auth is used
  user_name text,
  rating integer not null check (rating >= 1 and rating <= 5),
  comment text,
  helpful_count integer default 0,
  visit_date date,
  status text check (status in ('pending', 'approved', 'rejected')) default 'pending',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ==============================
-- TABLE: budaya_events
-- Events related to traditions or cultural activities
-- ==============================
create table if not exists budaya_events (
  id uuid primary key default gen_random_uuid(),
  budaya_item_id uuid references budaya_items(id) on delete cascade,
  kabupaten_id uuid references kabupatens(id) on delete cascade,
  name text not null,
  description text,
  event_date date,
  start_time time,
  end_time time,
  location text,
  organizer text,
  status text check (status in ('upcoming', 'ongoing', 'completed', 'cancelled')) default 'upcoming',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ==============================
-- TRIGGERS: updated_at timestamps
-- ==============================
drop trigger if exists trg_kabupatens_updated_at on kabupatens;
create trigger trg_kabupatens_updated_at
before update on kabupatens
for each row execute function set_updated_at();

drop trigger if exists trg_budaya_items_updated_at on budaya_items;
create trigger trg_budaya_items_updated_at
before update on budaya_items
for each row execute function set_updated_at();

drop trigger if exists trg_budaya_reviews_updated_at on budaya_reviews;
create trigger trg_budaya_reviews_updated_at
before update on budaya_reviews
for each row execute function set_updated_at();

drop trigger if exists trg_budaya_events_updated_at on budaya_events;
create trigger trg_budaya_events_updated_at
before update on budaya_events
for each row execute function set_updated_at();

-- ==============================
-- INDEXES for performance
-- ==============================
create index if not exists idx_budaya_items_kabupaten on budaya_items(kabupaten_id);
create index if not exists idx_budaya_items_category on budaya_items(category_id);
create index if not exists idx_budaya_items_type on budaya_items(type);
create index if not exists idx_budaya_items_status on budaya_items(status);
create index if not exists idx_budaya_items_featured on budaya_items(featured);
create index if not exists idx_budaya_items_slug on budaya_items(slug);
create index if not exists idx_budaya_items_tags on budaya_items using gin(tags);
create index if not exists idx_budaya_images_item on budaya_images(budaya_item_id);
create index if not exists idx_budaya_reviews_item on budaya_reviews(budaya_item_id);
create index if not exists idx_budaya_reviews_status on budaya_reviews(status);
create index if not exists idx_budaya_events_item on budaya_events(budaya_item_id);
create index if not exists idx_budaya_events_kabupaten on budaya_events(kabupaten_id);
create index if not exists idx_budaya_events_status on budaya_events(status);

-- ==============================
-- ROW LEVEL SECURITY (RLS)
-- Enable and add policies for public read access
-- ==============================
alter table if exists kabupatens enable row level security;
alter table if exists budaya_categories enable row level security;
alter table if exists budaya_items enable row level security;
alter table if exists budaya_images enable row level security;
alter table if exists budaya_reviews enable row level security;
alter table if exists budaya_events enable row level security;

-- Kabupatens readable by everyone
drop policy if exists kabupatens_select_all on kabupatens;
create policy kabupatens_select_all on kabupatens for select using (true);

-- Categories readable by everyone
drop policy if exists budaya_categories_select_all on budaya_categories;
create policy budaya_categories_select_all on budaya_categories for select using (true);

-- Published budaya items readable by everyone
drop policy if exists budaya_items_select_published on budaya_items;
create policy budaya_items_select_published on budaya_items 
  for select to anon, authenticated 
  using (status = 'published');

-- Images for published items readable by everyone
drop policy if exists budaya_images_select_for_published on budaya_images;
create policy budaya_images_select_for_published on budaya_images 
  for select to anon, authenticated 
  using (
    exists (
      select 1 from budaya_items bi 
      where bi.id = budaya_images.budaya_item_id 
      and bi.status = 'published'
    )
  );

-- Approved reviews readable by everyone
drop policy if exists budaya_reviews_select_approved on budaya_reviews;
create policy budaya_reviews_select_approved on budaya_reviews 
  for select to anon, authenticated 
  using (status = 'approved');

-- Events readable by everyone
drop policy if exists budaya_events_select_all on budaya_events;
create policy budaya_events_select_all on budaya_events 
  for select to anon, authenticated 
  using (true);

-- Users can insert their own reviews (requires authentication)
drop policy if exists budaya_reviews_insert_own on budaya_reviews;
create policy budaya_reviews_insert_own on budaya_reviews 
  for insert to authenticated 
  with check (auth.uid() = user_id);

-- ==============================
-- SEED DATA: Initial kabupatens
-- ==============================
insert into kabupatens (name, slug, latitude, longitude, color, description) 
values 
  ('Kota Padang', 'padang', -0.9480, 100.3631, '#3b82f6', 'Ibu kota Provinsi Sumatera Barat'),
  ('Kabupaten Agam', 'agam', -0.2209, 100.1703, '#10b981', 'Kabupaten dengan pemandangan alam indah'),
  ('Kabupaten Tanah Datar', 'tanah-datar', -0.4797, 100.5746, '#a855f7', 'Pusat kebudayaan Minangkabau'),
  ('Kabupaten Lima Puluh Kota', 'lima-puluh-kota', 0.0734, 100.5296, '#f97316', 'Kabupaten dengan alam menakjubkan'),
  ('Kabupaten Pesisir Selatan', 'pesisir-selatan', -1.7223, 100.8903, '#14b8a6', 'Kabupaten pesisir dengan pantai indah'),
  ('Kabupaten Solok', 'solok', -0.7885, 100.6550, '#ec4899', 'Kabupaten dengan danau dan alam sejuk'),
  ('Kabupaten Padang Pariaman', 'padang-pariaman', -0.5547, 100.2152, '#6366f1', 'Kabupaten pesisir dengan pantai cantik'),
  ('Kota Bukittinggi', 'bukittinggi', -0.3039, 100.3835, '#ef4444', 'Kota wisata dengan udara sejuk')
on conflict (slug) do nothing;

-- ==============================
-- SEED DATA: Initial categories
-- ==============================
insert into budaya_categories (name, slug, icon, description) 
values 
  ('Alam', 'alam', '🏞️', 'Wisata alam dan pemandangan'),
  ('Budaya', 'budaya', '🏛️', 'Situs budaya dan sejarah'),
  ('Pantai', 'pantai', '🏖️', 'Destinasi pantai'),
  ('Kuliner', 'kuliner', '🍽️', 'Makanan dan minuman khas'),
  ('Religi', 'religi', '🕌', 'Tempat ibadah dan wisata religi'),
  ('Danau', 'danau', '🌊', 'Danau dan sungai'),
  ('Air Terjun', 'air-terjun', '💧', 'Air terjun dan mata air')
on conflict (slug) do nothing;

-- ==============================
-- FUNCTIONS: Helper functions
-- ==============================

-- Function to update rating and review count
create or replace function update_budaya_item_rating()
returns trigger as $$
begin
  update budaya_items
  set 
    rating = (
      select coalesce(round(avg(rating)::numeric, 1), 0)
      from budaya_reviews
      where budaya_item_id = new.budaya_item_id
      and status = 'approved'
    ),
    reviews_count = (
      select count(*)
      from budaya_reviews
      where budaya_item_id = new.budaya_item_id
      and status = 'approved'
    )
  where id = new.budaya_item_id;
  
  return new;
end;
$$ language plpgsql;

-- Trigger to update rating after review insert/update
drop trigger if exists trg_update_rating_on_review on budaya_reviews;
create trigger trg_update_rating_on_review
after insert or update of status, rating on budaya_reviews
for each row
when (new.status = 'approved')
execute function update_budaya_item_rating();

-- Function to increment view count
create or replace function increment_budaya_item_views(item_id uuid)
returns void as $$
begin
  update budaya_items
  set view_count = view_count + 1
  where id = item_id;
end;
$$ language plpgsql security definer;

-- ==============================
-- COMMENTS for documentation
-- ==============================
comment on table kabupatens is 'Kabupaten/Kota di Sumatera Barat dengan koordinat geografis';
comment on table budaya_categories is 'Kategori konten budaya (Alam, Budaya, Pantai, dll)';
comment on table budaya_items is 'Item budaya utama: objek wisata, tradisi, kuliner';
comment on table budaya_images is 'Galeri gambar untuk item budaya';
comment on table budaya_reviews is 'Review dan rating dari pengunjung';
comment on table budaya_events is 'Event budaya dan tradisi yang terjadwal';
comment on column budaya_items.type is 'Tipe konten: objek (wisata), tradisi, kuliner';
comment on column budaya_items.opening_hours is 'JSON: {monday: "09:00-17:00", tuesday: "closed", ...}';
comment on column budaya_items.ticket_price is 'JSON: {adult: 10000, child: 5000, ...}';
