# Debugging Panduan - Budaya Page & Interactive Map

## Masalah yang Diatasi

Peta interaktif tidak berfungsi di browser berbasis Chromium (Chrome, Edge, Brave) tetapi bekerja di Firefox. Perubahan ini mengatasi:

1. **Fetching data inconsistencies** antara browser
2. **CORS dan RLS issues** dengan Supabase client-side
3. **Pointer events** dan z-index conflicts di Chromium
4. **Type coercion** untuk koordinat lat/lng

## Perubahan Utama

### 1. API Routes dengan Server-Side Fetching

**Sebelum:** Direct Supabase client di browser
```typescript
const supabase = createClient();
const { data } = await supabase.from("kabupatens").select("*");
```

**Sesudah:** Fetch via Next.js API routes
```typescript
const response = await fetch('/api/budaya/kabupatens');
const data = await response.json();
```

**Keuntungan:**
- Server-side queries lebih konsisten cross-browser
- Menghindari CORS issues
- RLS policies diterapkan di server
- Better error handling dan logging

### 2. Type Safety untuk Koordinat

```typescript
// Memaksa konversi ke number (Supabase sering return DECIMAL as string)
lat: Number(kab.latitude),
lng: Number(kab.longitude),
```

### 3. Enhanced Debug Logging

Set environment variable untuk mengaktifkan logging rinci:
```bash
NEXT_PUBLIC_MAP_DEBUG=1
```

Logs yang akan muncul:
- `[BudayaPage] Loaded data via API routes` - Data counts
- `[MapSumbar] Leaflet CSS loaded successfully` - CSS loading status
- `[MapSumbar] Map initialized` - Map setup
- `[MapSumbar] Creating marker` - Per marker creation
- `[MapSumbar] Marker click` - Click events
- `[MapSumbar] Click stack` - Element stack under cursor
- `[MapSumbar] Potential overlay` - Blocking elements

### 4. Error Boundaries

Halaman sekarang menampilkan error state yang jelas jika fetch gagal:
```typescript
if (error) {
  return <div>⚠️ Gagal Memuat Data: {error}</div>
}
```

## Cara Setup & Debug

### Setup Environment

1. Copy `.env.local.example` ke `.env.local`:
```powershell
Copy-Item .env.local.example .env.local
```

2. Isi dengan Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

3. Aktifkan debug mode (opsional):
```env
NEXT_PUBLIC_MAP_DEBUG=1
```

### Jalankan Dev Server

```powershell
npm run dev
```

### Debug di Browser

1. Buka Chrome/Edge DevTools (F12)
2. Ke tab Console
3. Navigate ke `/budaya`
4. Lihat logs:

**Data Loading:**
```
[API /budaya/kabupatens] Returning 8 kabupatens
[API /budaya] Returning 45 items out of 45 total
[BudayaPage] Loaded data via API routes { kabupatens: 8, items: 45 }
```

**Map Initialization:**
```
[MapSumbar] Leaflet CSS loaded successfully
[MapSumbar] Leaflet module loaded
[MapSumbar] Map initialized { center: [-0.7399, 100.3835], zoom: 7.5 }
[MapSumbar] Creating marker { idx: 0, key: 'padang', name: 'Kota Padang', ... }
```

**Click Events:**
```
[MapSumbar] Click stack (top->bottom) [
  { tag: "path", class: "...", z: "1000", pe: "auto" },
  { tag: "svg", class: "custom-pin-icon", z: "1000", pe: "auto" },
  ...
]
[MapSumbar] Marker click (dom) -> padang
[MapSumbar] Marker click (leaflet) -> padang
```

**Jika Ada Masalah:**
```
[MapSumbar] Failed to load Leaflet CSS. Interactivity/markers may be broken.
[MapSumbar] Potential overlay above map center { tag: "DIV", z: "9999", pe: "auto" }
```

## Kemungkinan Issues & Solusi

### 1. "Failed to fetch" di Console

**Penyebab:** API route tidak bisa dijangkau atau server error

**Solusi:**
- Check terminal server untuk error logs
- Pastikan `npm run dev` berjalan
- Check network tab di DevTools untuk HTTP status

### 2. Data kosong tapi no error

**Penyebab:** Database kosong atau RLS policy blocking

**Solusi:**
```sql
-- Check data exists
SELECT COUNT(*) FROM kabupatens;
SELECT COUNT(*) FROM budaya_items WHERE status = 'published';

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename IN ('kabupatens', 'budaya_items');
```

### 3. Map renders tapi markers tidak clickable di Chrome

**Penyebab:** Overlay blocking pointer events

**Solusi:**
- Check console untuk `[MapSumbar] Potential overlay above map center`
- Identify element dengan z-index tinggi
- Set `pointer-events: none` pada overlay atau turunkan z-index

### 4. Coordinates tidak valid

**Penyebab:** Database return string, bukan number

**Solusi:** Sudah diatasi dengan `Number()` casting, tapi check di console:
```
[BudayaPage] kabupatenData computed { sample: [{ lat: -0.948, lng: 100.363 }] }
```
Pastikan lat/lng adalah number, bukan string.

## Testing Checklist

- [ ] Data loading di Chrome
- [ ] Data loading di Firefox
- [ ] Data loading di Edge
- [ ] Map renders dengan pins
- [ ] Pins clickable di Chrome
- [ ] Pins clickable di Firefox
- [ ] Pins clickable di Edge
- [ ] Filter by kabupaten works
- [ ] Filter by category works
- [ ] Search works
- [ ] No console errors
- [ ] No network errors

## Files Modified

- `app/budaya/page.tsx` - Changed to fetch via API routes
- `app/api/budaya/route.ts` - Added debug logging, cache headers
- `app/api/budaya/kabupatens/route.ts` - Added debug logging, cache headers
- `components/MapSumbar.tsx` - Enhanced pointer events, debug logging
- `utils/supabase/client.ts` - Added env var validation

## Performance Notes

- API routes sekarang set `dynamic = 'force-dynamic'` dan `revalidate = 0` untuk debugging
- Untuk production, enable caching:
  ```typescript
  export const revalidate = 60; // Cache 60 seconds
  ```

## Rollback

Jika perlu kembali ke versi lama:
```bash
git checkout HEAD~1 -- app/budaya/page.tsx
```

## Contact

Jika masih ada masalah setelah mengikuti panduan ini, share:
1. Console logs (full)
2. Network tab (requests & responses)
3. Browser version
4. Environment variables (tanpa credentials)
