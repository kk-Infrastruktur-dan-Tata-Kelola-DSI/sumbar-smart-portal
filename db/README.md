# Database Schema untuk Budaya Section

## Overview

Schema database untuk mengelola konten budaya, wisata, dan kuliner Sumatera Barat. Database ini dirancang untuk mendukung aplikasi Sumbar Smart Portal dengan fitur-fitur seperti pencarian, filtering, rating, dan review.

## Struktur Database

### 1. `kabupatens`
Menyimpan informasi kabupaten/kota di Sumatera Barat dengan koordinat geografis.

**Kolom:**
- `id` (UUID): Primary key
- `name` (TEXT): Nama kabupaten/kota
- `slug` (TEXT): URL-friendly identifier
- `latitude` (DECIMAL): Koordinat latitude
- `longitude` (DECIMAL): Koordinat longitude
- `color` (TEXT): Warna hex untuk marker di peta
- `description` (TEXT): Deskripsi kabupaten
- `created_at`, `updated_at` (TIMESTAMPTZ): Timestamp

**Seed Data:** 8 kabupaten/kota (Padang, Agam, Tanah Datar, Lima Puluh Kota, Pesisir Selatan, Solok, Padang Pariaman, Bukittinggi)

### 2. `budaya_categories`
Kategori untuk item budaya (Alam, Budaya, Pantai, Kuliner, Religi, dll).

**Kolom:**
- `id` (UUID): Primary key
- `name` (TEXT): Nama kategori
- `slug` (TEXT): URL-friendly identifier
- `icon` (TEXT): Emoji atau identifier icon
- `description` (TEXT): Deskripsi kategori
- `created_at` (TIMESTAMPTZ): Timestamp

**Seed Data:** Alam, Budaya, Pantai, Kuliner, Religi, Danau, Air Terjun

### 3. `budaya_items`
Tabel utama untuk konten budaya (objek wisata, tradisi, kuliner).

**Kolom:**
- `id` (UUID): Primary key
- `name` (TEXT): Nama item
- `slug` (TEXT): URL-friendly identifier
- `kabupaten_id` (UUID): Foreign key ke kabupatens
- `category_id` (UUID): Foreign key ke budaya_categories
- `type` (TEXT): Tipe konten - 'objek', 'tradisi', atau 'kuliner'
- `description` (TEXT): Deskripsi singkat
- `long_description` (TEXT): Penjelasan detail
- `image_url` (TEXT): URL gambar utama
- `thumbnail_url` (TEXT): URL thumbnail
- `rating` (DECIMAL): Rating 0-5
- `reviews_count` (INTEGER): Jumlah review
- `latitude`, `longitude` (DECIMAL): Koordinat spesifik (opsional)
- `address` (TEXT): Alamat lengkap
- `contact_phone`, `contact_email`, `website_url` (TEXT): Kontak
- `opening_hours` (JSONB): Jam operasional dalam format JSON
- `ticket_price` (JSONB): Harga tiket dalam format JSON
- `facilities` (TEXT[]): Array fasilitas
- `tags` (TEXT[]): Array tag untuk filtering
- `status` (TEXT): 'draft', 'published', atau 'archived'
- `featured` (BOOLEAN): Highlight di homepage
- `view_count` (INTEGER): Jumlah views
- `created_at`, `updated_at` (TIMESTAMPTZ): Timestamp

**Indexes:**
- kabupaten_id, category_id, type, status, featured, slug, tags (GIN)

### 4. `budaya_images`
Galeri gambar tambahan untuk item budaya.

**Kolom:**
- `id` (UUID): Primary key
- `budaya_item_id` (UUID): Foreign key ke budaya_items
- `image_url` (TEXT): URL gambar
- `caption` (TEXT): Keterangan gambar
- `display_order` (INTEGER): Urutan tampilan
- `created_at` (TIMESTAMPTZ): Timestamp

### 5. `budaya_reviews`
Review dan rating dari pengunjung.

**Kolom:**
- `id` (UUID): Primary key
- `budaya_item_id` (UUID): Foreign key ke budaya_items
- `user_id` (UUID): Link ke auth.users (opsional)
- `user_name` (TEXT): Nama reviewer
- `rating` (INTEGER): Rating 1-5
- `comment` (TEXT): Komentar
- `helpful_count` (INTEGER): Jumlah helpful votes
- `visit_date` (DATE): Tanggal kunjungan
- `status` (TEXT): 'pending', 'approved', atau 'rejected'
- `created_at`, `updated_at` (TIMESTAMPTZ): Timestamp

**Trigger:** Update otomatis rating dan reviews_count di budaya_items saat review approved

### 6. `budaya_events`
Event budaya dan tradisi yang terjadwal.

**Kolom:**
- `id` (UUID): Primary key
- `budaya_item_id` (UUID): Foreign key ke budaya_items (opsional)
- `kabupaten_id` (UUID): Foreign key ke kabupatens (opsional)
- `name` (TEXT): Nama event
- `description` (TEXT): Deskripsi
- `event_date` (DATE): Tanggal event
- `start_time`, `end_time` (TIME): Waktu
- `location` (TEXT): Lokasi
- `organizer` (TEXT): Penyelenggara
- `status` (TEXT): 'upcoming', 'ongoing', 'completed', 'cancelled'
- `created_at`, `updated_at` (TIMESTAMPTZ): Timestamp

## Row Level Security (RLS)

Semua tabel menggunakan RLS dengan kebijakan:

1. **Public Read Access:**
   - `kabupatens`: Semua data dapat dibaca
   - `budaya_categories`: Semua data dapat dibaca
   - `budaya_items`: Hanya item dengan status 'published'
   - `budaya_images`: Hanya gambar untuk item published
   - `budaya_reviews`: Hanya review dengan status 'approved'
   - `budaya_events`: Semua event dapat dibaca

2. **Authenticated Write Access:**
   - `budaya_reviews`: User dapat insert review sendiri (status 'pending')
   - Admin access untuk insert/update/delete memerlukan policy tambahan

## Functions

### `update_budaya_item_rating()`
Trigger function yang otomatis update rating dan reviews_count di budaya_items saat ada review baru atau review di-approve.

### `increment_budaya_item_views(item_id UUID)`
Function untuk increment view count item (security definer).

## Migrations

File migrations terletak di `db/migrations/`:

1. **0001_content_schema.sql** - Schema dasar untuk content management
2. **0002_budaya_schema.sql** - Schema untuk budaya section
3. **0003_budaya_seed_data.sql** - Data awal (seed data)

## Cara Menggunakan

### 1. Setup Database di Supabase

```bash
# Login ke Supabase
supabase login

# Link project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

### 2. Manual Setup via Supabase Dashboard

1. Buka Supabase Dashboard → SQL Editor
2. Copy-paste isi file migration satu per satu:
   - `0001_content_schema.sql`
   - `0002_budaya_schema.sql`
   - `0003_budaya_seed_data.sql`
3. Execute setiap query

### 3. Menggunakan dalam Aplikasi

```typescript
import { getBudayaItems, getKabupatens } from '@/utils/budaya-queries';

// Get all items
const { items, total } = await getBudayaItems({
  limit: 20,
  offset: 0,
});

// Get items by kabupaten
const { items } = await getBudayaItems({
  kabupaten_slug: 'padang',
  type: 'objek',
});

// Get kabupatens with item counts
const kabupatens = await getKabupatens(true);
```

## TypeScript Types

Types tersedia di `types/budaya.ts`:
- `Kabupaten`
- `BudayaCategory`
- `BudayaItem`
- `BudayaItemWithRelations`
- `BudayaReview`
- `BudayaEvent`
- Dan lainnya...

## Query Helper Functions

File `utils/budaya-queries.ts` menyediakan:

- `getKabupatens()` - Get semua kabupaten
- `getBudayaItems()` - Get items dengan filtering
- `getBudayaItemBySlug()` - Get detail item
- `getFeaturedBudayaItems()` - Get featured items
- `createBudayaReview()` - Submit review
- `getBudayaStats()` - Get statistik
- `searchBudayaItems()` - Full-text search

## Contoh Data

Seed data mencakup 20+ items meliputi:
- **Objek Wisata:** Pantai Air Manis, Danau Maninjau, Istana Pagaruyung, dll.
- **Tradisi:** Tabuik, Maanta Pabukoan, Turun Mandi
- **Kuliner:** Rendang Lokan, Serabi Painan, Bika Pariaman, Bareh Solok

## Environment Variables

Pastikan `.env.local` memiliki:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Security Notes

1. RLS aktif di semua tabel
2. Review memerlukan approval (status 'pending' → 'approved')
3. Public users hanya bisa read published content
4. Write operations memerlukan authentication
5. Admin operations memerlukan service role atau custom policies

## Future Enhancements

- [ ] Add PostGIS untuk advanced geospatial queries
- [ ] Implement full-text search dengan postgres tsvector
- [ ] Add image optimization dan CDN integration
- [ ] Implement caching layer (Redis)
- [ ] Add analytics tracking
- [ ] Multi-language support
- [ ] Social features (likes, shares, bookmarks)
