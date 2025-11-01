// Example: How to migrate Budaya page from dummy data to database

/**
 * BEFORE (Dummy Data)
 * ==================
 */

const destinationsByKabupaten: Record<string, any[]> = {
  padang: [
    {
      id: 1,
      name: "Pantai Air Manis",
      kabupaten: "Kota Padang",
      type: "objek",
      // ... hardcoded data
    },
  ],
  // ... more dummy data
};

const allDestinations = Object.values(destinationsByKabupaten).flat();

/**
 * AFTER (Database)
 * ================
 */

"use client";

import { useEffect, useState } from 'react';
import { getBudayaItems, getKabupatens } from '@/utils/budaya-queries';
import type { BudayaItemWithRelations, KabupatenWithItems } from '@/types/budaya';

export default function BudayaPage() {
  const [items, setItems] = useState<BudayaItemWithRelations[]>([]);
  const [kabupatens, setKabupatens] = useState<KabupatenWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedKabupaten, setSelectedKabupaten] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  // Load data from database
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        
        // Get kabupatens with item counts
        const kabData = await getKabupatens(true);
        setKabupatens(kabData);
        
        // Get all budaya items
        const { items: budayaItems } = await getBudayaItems({
          status: 'published',
          limit: 100, // Adjust as needed
          order_by: 'rating',
          order_direction: 'desc',
        });
        
        setItems(budayaItems);
      } catch (error) {
        console.error('Error loading budaya data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);

  // Filter items based on selected kabupaten and category
  const filteredItems = items.filter(item => {
    // Filter by kabupaten
    if (selectedKabupaten) {
      const matchKab = kabupatens.find(k => k.slug === selectedKabupaten);
      if (matchKab && item.kabupaten_id !== matchKab.id) {
        return false;
      }
    }
    
    // Filter by type (Semua, Objek, Tradisi, Kuliner)
    if (selectedCategory !== "Semua") {
      const typeMap: Record<string, string> = {
        "Objek": "objek",
        "Tradisi": "tradisi",
        "Kuliner": "kuliner",
      };
      if (item.type !== typeMap[selectedCategory]) {
        return false;
      }
    }
    
    return true;
  });

  // Convert kabupatens data for map component
  const kabupatenData = kabupatens.map(kab => ({
    name: kab.name,
    key: kab.slug,
    lat: kab.latitude,
    lng: kab.longitude,
    color: kab.color,
  }));

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MapSumbar
        items={kabupatenData}
        onKabupatenClick={(key) => setSelectedKabupaten(key)}
        selectedKey={selectedKabupaten}
      />
      
      {/* Display filtered items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <Card key={item.id}>
            <CardBody>
              <Image src={item.image_url} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.kabupaten?.name}</p>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-400" />
                <span>{item.rating}</span>
                <span>({item.reviews_count} reviews)</span>
              </div>
              <Button onPress={() => setSelectedItem(item)}>
                Lihat Detail
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}

/**
 * ALTERNATIVE: Server-Side Rendering (Recommended for SEO)
 * =========================================================
 */

// app/budaya/page.tsx
import { getBudayaItems, getKabupatens } from '@/utils/budaya-queries';
import BudayaClient from './BudayaClient';

export default async function BudayaPage() {
  // Fetch data on server
  const kabupatens = await getKabupatens(true);
  const { items } = await getBudayaItems({
    status: 'published',
    limit: 100,
    order_by: 'rating',
    order_direction: 'desc',
  });

  // Pass to client component
  return <BudayaClient initialItems={items} initialKabupatens={kabupatens} />;
}

// app/budaya/BudayaClient.tsx
"use client";

import { useState } from 'react';
import type { BudayaItemWithRelations, KabupatenWithItems } from '@/types/budaya';

interface Props {
  initialItems: BudayaItemWithRelations[];
  initialKabupatens: KabupatenWithItems[];
}

export default function BudayaClient({ initialItems, initialKabupatens }: Props) {
  const [items] = useState(initialItems);
  const [kabupatens] = useState(initialKabupatens);
  const [selectedKabupaten, setSelectedKabupaten] = useState<string | null>(null);
  
  // ... rest of component (filtering, UI, etc.)
}

/**
 * SEARCH FUNCTIONALITY
 * ====================
 */

// Client-side search with debouncing
import { useEffect, useState } from 'react';
import { searchBudayaItems } from '@/utils/budaya-queries';
import { useDebouncedCallback } from 'use-debounce'; // or custom hook

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = useDebouncedCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const items = await searchBudayaItems(q, 10);
      setResults(items);
    } finally {
      setLoading(false);
    }
  }, 500);

  useEffect(() => {
    handleSearch(query);
  }, [query]);

  return (
    <div>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari destinasi..."
      />
      {loading && <Spinner />}
      {results.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}

/**
 * FEATURED ITEMS FOR HOMEPAGE
 * ============================
 */

// app/page.tsx
import { getFeaturedBudayaItems } from '@/utils/budaya-queries';

export default async function HomePage() {
  const featured = await getFeaturedBudayaItems(6);

  return (
    <section>
      <h2>Destinasi Unggulan</h2>
      <div className="grid grid-cols-3 gap-6">
        {featured.map(item => (
          <Card key={item.id}>
            <Image src={item.image_url} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.kabupaten?.name}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

/**
 * DETAIL PAGE
 * ===========
 */

// app/budaya/[slug]/page.tsx
import { getBudayaItemBySlug } from '@/utils/budaya-queries';
import { notFound } from 'next/navigation';

export default async function BudayaDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const item = await getBudayaItemBySlug(params.slug);

  if (!item) {
    notFound();
  }

  return (
    <div>
      <Image src={item.image_url} alt={item.name} />
      <h1>{item.name}</h1>
      <p>{item.kabupaten?.name}</p>
      
      {/* Full description */}
      <div dangerouslySetInnerHTML={{ __html: item.long_description || '' }} />
      
      {/* Rating */}
      <div className="flex items-center">
        <Star className="fill-yellow-400" />
        <span>{item.rating}</span>
        <span>({item.reviews_count} reviews)</span>
      </div>
      
      {/* Tags */}
      <div className="flex gap-2">
        {item.tags?.map(tag => (
          <Chip key={tag}>{tag}</Chip>
        ))}
      </div>
      
      {/* Gallery */}
      {item.images && item.images.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {item.images.map(img => (
            <Image key={img.id} src={img.image_url} alt={img.caption || ''} />
          ))}
        </div>
      )}
      
      {/* Reviews */}
      {item.recent_reviews && (
        <div>
          <h2>Review Terbaru</h2>
          {item.recent_reviews.map(review => (
            <div key={review.id}>
              <p>{review.user_name}</p>
              <p>Rating: {review.rating}/5</p>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * MIGRATION CHECKLIST
 * ===================
 * 
 * [ ] Setup Supabase database (run migrations)
 * [ ] Verify seed data loaded correctly
 * [ ] Update environment variables
 * [ ] Replace dummy data arrays with database queries
 * [ ] Update type definitions to use database types
 * [ ] Test filtering functionality
 * [ ] Test search functionality
 * [ ] Add loading states
 * [ ] Add error handling
 * [ ] Test pagination if needed
 * [ ] Implement caching strategy (optional)
 * [ ] Add Supabase realtime subscriptions (optional)
 */
