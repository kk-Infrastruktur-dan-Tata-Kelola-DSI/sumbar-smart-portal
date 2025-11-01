# 🗄️ Database Schema untuk Section Budaya

## 📋 Ringkasan

Saya telah membuat **skema database lengkap** untuk menggantikan data dummy di section Budaya. Database ini dirancang profesional dengan fitur-fitur enterprise seperti:

✅ **Full CRUD operations**
✅ **Row Level Security (RLS)**
✅ **Automatic triggers** untuk update rating
✅ **Geographic data** dengan latitude/longitude
✅ **Review system** dengan approval workflow
✅ **Image gallery** support
✅ **Event scheduling**
✅ **Full-text search ready**
✅ **TypeScript types** lengkap
✅ **API routes** siap pakai

---

## 📁 File yang Dibuat

### 1. Database Migrations
- **`db/migrations/0002_budaya_schema.sql`** - Schema lengkap untuk budaya section
- **`db/migrations/0003_budaya_seed_data.sql`** - Data awal 20+ items (objek, tradisi, kuliner)

### 2. TypeScript Types
- **`types/budaya.ts`** - Interface lengkap untuk semua entities

### 3. Database Query Functions
- **`utils/budaya-queries.ts`** - Helper functions untuk query database

### 4. API Routes
- **`app/api/budaya/route.ts`** - GET items dengan filtering
- **`app/api/budaya/kabupatens/route.ts`** - GET semua kabupaten
- **`app/api/budaya/[slug]/route.ts`** - GET detail item by slug

### 5. Documentation
- **`db/README.md`** - Dokumentasi lengkap schema dan cara penggunaan

---

## 🗃️ Struktur Database

### Tabel Utama

#### 1️⃣ **kabupatens**
Menyimpan 8 kabupaten/kota dengan koordinat geografis.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| name | TEXT | Nama kabupaten (e.g., "Kota Padang") |
| slug | TEXT | URL-friendly (e.g., "padang") |
| latitude | DECIMAL | Koordinat latitude |
| longitude | DECIMAL | Koordinat longitude |
| color | TEXT | Hex color untuk map marker |
| description | TEXT | Deskripsi singkat |

#### 2️⃣ **budaya_categories**
Kategori untuk filtering (Alam, Budaya, Pantai, Kuliner, Religi, dll).

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| name | TEXT | Nama kategori |
| slug | TEXT | URL-friendly |
| icon | TEXT | Emoji (e.g., "🏖️") |

#### 3️⃣ **budaya_items** ⭐ TABEL UTAMA
Item budaya: objek wisata, tradisi, kuliner.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| name | TEXT | Nama item |
| slug | TEXT | URL-friendly |
| kabupaten_id | UUID | Foreign key ke kabupatens |
| category_id | UUID | Foreign key ke categories |
| **type** | TEXT | **'objek', 'tradisi', 'kuliner'** |
| description | TEXT | Deskripsi singkat |
| long_description | TEXT | Penjelasan detail lengkap |
| image_url | TEXT | URL gambar utama |
| rating | DECIMAL | Rating 0-5 |
| reviews_count | INTEGER | Jumlah review |
| tags | TEXT[] | Array tags untuk filtering |
| status | TEXT | 'draft', 'published', 'archived' |
| featured | BOOLEAN | Highlight di homepage |
| view_count | INTEGER | Page views |
| opening_hours | JSONB | `{"monday": "09:00-17:00"}` |
| ticket_price | JSONB | `{"adult": 10000, "child": 5000}` |
| facilities | TEXT[] | Array fasilitas |

#### 4️⃣ **budaya_images**
Galeri gambar tambahan untuk setiap item.

#### 5️⃣ **budaya_reviews**
Review dan rating dari user dengan approval system.

| Field | Type | Description |
|-------|------|-------------|
| budaya_item_id | UUID | Item yang di-review |
| user_name | TEXT | Nama reviewer |
| rating | INTEGER | 1-5 |
| comment | TEXT | Komentar |
| status | TEXT | 'pending', 'approved', 'rejected' |

**Auto-trigger:** Saat review approved → rating & reviews_count di `budaya_items` otomatis update!

#### 6️⃣ **budaya_events**
Event budaya/tradisi yang terjadwal.

---

## 🚀 Cara Setup

### Option 1: Via Supabase CLI (Recommended)

```bash
# Install Supabase CLI jika belum
npm install -g supabase

# Login
supabase login

# Link ke project
supabase link --project-ref YOUR_PROJECT_REF

# Run migrations
supabase db push
```

### Option 2: Via Supabase Dashboard (Manual)

1. Buka **Supabase Dashboard** → **SQL Editor**
2. Buat query baru
3. Copy-paste isi file **`0002_budaya_schema.sql`**
4. Klik **Run**
5. Ulangi untuk **`0003_budaya_seed_data.sql`**

✅ Selesai! Database sudah terisi dengan 20+ items.

---

## 💻 Cara Menggunakan dalam Aplikasi

### 1. Import Query Functions

```typescript
import { 
  getBudayaItems, 
  getKabupatens,
  getBudayaItemBySlug,
  getFeaturedBudayaItems,
} from '@/utils/budaya-queries';
```

### 2. Contoh Penggunaan

#### Get semua items dengan filtering
```typescript
const { items, total } = await getBudayaItems({
  kabupaten_slug: 'padang',
  type: 'objek',
  limit: 20,
  offset: 0,
});
```

#### Get items by search
```typescript
const { items } = await getBudayaItems({
  search: 'pantai',
  order_by: 'rating',
  order_direction: 'desc',
});
```

#### Get detail item
```typescript
const item = await getBudayaItemBySlug('pantai-air-manis');
console.log(item.kabupaten); // Include relasi
console.log(item.category);
console.log(item.images); // Galeri gambar
console.log(item.recent_reviews); // 5 review terbaru
```

#### Get featured items untuk homepage
```typescript
const featured = await getFeaturedBudayaItems(6);
```

### 3. Via API Routes

```typescript
// GET /api/budaya
const response = await fetch('/api/budaya?type=objek&kabupaten=padang');
const data = await response.json();

// GET /api/budaya/kabupatens
const kabupatens = await fetch('/api/budaya/kabupatens');

// GET /api/budaya/[slug]
const item = await fetch('/api/budaya/pantai-air-manis');
```

---

## 📊 Data Seed yang Tersedia

### Kabupaten (8 items)
- Kota Padang
- Kabupaten Agam
- Kabupaten Tanah Datar
- Kabupaten Lima Puluh Kota
- Kabupaten Pesisir Selatan
- Kabupaten Solok
- Kabupaten Padang Pariaman
- Kota Bukittinggi

### Budaya Items (20+ items)

#### 🏖️ Objek Wisata
- Pantai Air Manis (Padang)
- Masjid Raya Sumbar (Padang)
- Danau Maninjau (Agam)
- Ngarai Sianok (Agam)
- Istana Pagaruyung (Tanah Datar)
- Lembah Harau (Lima Puluh Kota)
- Kelok Sembilan (Lima Puluh Kota)
- Pantai Carocok Painan (Pesisir Selatan)
- Danau Kembar (Solok)
- Pantai Gandoriah (Padang Pariaman)
- Jam Gadang (Bukittinggi)

#### 🎎 Tradisi
- Tabuik (Padang)
- Maanta Pabukoan (Tanah Datar)
- Turun Mandi (Bukittinggi)

#### 🍽️ Kuliner
- Rumah Makan Sederhana (Padang)
- Rendang Lokan (Agam)
- Randang Talua (Lima Puluh Kota)
- Serabi Painan (Pesisir Selatan)
- Bareh Solok (Solok)
- Bika Pariaman (Padang Pariaman)

Setiap item sudah dilengkapi dengan:
- ✅ Deskripsi singkat & detail
- ✅ Rating & jumlah review
- ✅ Tags untuk filtering
- ✅ Image URL dari Unsplash
- ✅ Featured status

---

## 🔒 Security Features

### Row Level Security (RLS) Active
- ✅ Public read untuk published items
- ✅ Only authenticated users bisa submit review
- ✅ Review butuh approval sebelum tampil
- ✅ Draft items tidak visible ke public

### Automatic Updates
- ✅ Trigger auto-update rating saat review approved
- ✅ Timestamp auto-update (created_at, updated_at)
- ✅ View count increment via secure function

---

## 🎯 Langkah Selanjutnya

### 1. Update Budaya Page
Ganti data dummy dengan query database:

```typescript
// app/budaya/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { getBudayaItems, getKabupatens } from '@/utils/budaya-queries';

export default function BudayaPage() {
  const [items, setItems] = useState([]);
  const [kabupatens, setKabupatens] = useState([]);
  
  useEffect(() => {
    async function loadData() {
      const kabData = await getKabupatens();
      const { items: budayaItems } = await getBudayaItems({
        status: 'published',
        limit: 100,
      });
      
      setKabupatens(kabData);
      setItems(budayaItems);
    }
    
    loadData();
  }, []);
  
  // ... rest of component
}
```

### 2. Admin Panel (Optional)
Buat halaman admin untuk:
- ➕ Add new items
- ✏️ Edit existing items
- ✅ Approve reviews
- 📊 View statistics

### 3. Advanced Features
- 🔍 Implement full-text search dengan PostgreSQL
- 📷 Upload gambar ke Supabase Storage
- 🗺️ PostGIS untuk advanced geospatial queries
- 💾 Redis caching untuk performance
- 📱 Social features (likes, bookmarks, shares)

---

## 📚 API Documentation

### GET `/api/budaya`
Get budaya items dengan filtering.

**Query Parameters:**
- `kabupaten` - Filter by kabupaten slug
- `category` - Filter by category slug
- `type` - Filter by type (objek, tradisi, kuliner)
- `search` - Full-text search
- `featured` - Get only featured items (true/false)
- `limit` - Items per page (default: 20)
- `offset` - Pagination offset (default: 0)
- `order_by` - Sort field (rating, reviews_count, view_count, created_at)
- `order_direction` - Sort direction (asc, desc)

**Response:**
```json
{
  "items": [...],
  "total": 42,
  "limit": 20,
  "offset": 0
}
```

### GET `/api/budaya/kabupatens`
Get all kabupatens dengan item counts.

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Kota Padang",
    "slug": "padang",
    "latitude": -0.9480,
    "longitude": 100.3631,
    "color": "#3b82f6",
    "item_count": 4
  }
]
```

### GET `/api/budaya/[slug]`
Get detail item by slug.

**Response:**
```json
{
  "id": "uuid",
  "name": "Pantai Air Manis",
  "slug": "pantai-air-manis",
  "type": "objek",
  "description": "...",
  "long_description": "...",
  "rating": 4.8,
  "reviews_count": 1420,
  "kabupaten": { ... },
  "category": { ... },
  "images": [...],
  "recent_reviews": [...]
}
```

---

## 🎉 Kesimpulan

Database schema sudah **production-ready** dengan:
- ✅ Normalized structure
- ✅ Proper indexing
- ✅ Security policies
- ✅ TypeScript support
- ✅ API routes
- ✅ Seed data lengkap
- ✅ Dokumentasi detail

Tinggal **setup Supabase** dan ganti **dummy data** dengan **database queries**! 🚀

---

## 📞 Support

Jika ada pertanyaan atau butuh bantuan setup, silakan tanya! 😊
