// Budaya database queries using Supabase
import { createClient } from '@/utils/supabase/server';
import type {
  BudayaItem,
  BudayaItemWithRelations,
  Kabupaten,
  BudayaCategory,
  GetBudayaItemsParams,
  GetBudayaItemsResponse,
  CreateReviewParams,
  BudayaStats,
  KabupatenWithItems,
} from '@/types/budaya';

/**
 * Get all kabupatens with optional item counts
 */
export async function getKabupatens(includeItemCount = false): Promise<KabupatenWithItems[]> {
  const supabase = await createClient();
  
  let query = supabase
    .from('kabupatens')
    .select('*')
    .order('name');

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching kabupatens:', error);
    throw error;
  }

  if (!includeItemCount) {
    return data as KabupatenWithItems[];
  }

  // Fetch item counts for each kabupaten
  const kabupatensWithCounts = await Promise.all(
    (data || []).map(async (kab: Kabupaten) => {
      const { count } = await supabase
        .from('budaya_items')
        .select('*', { count: 'exact', head: true })
        .eq('kabupaten_id', kab.id)
        .eq('status', 'published');
      
      return {
        ...kab,
        item_count: count || 0,
      };
    })
  );

  return kabupatensWithCounts;
}

/**
 * Get kabupaten by slug
 */
export async function getKabupatenBySlug(slug: string): Promise<Kabupaten | null> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('kabupatens')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching kabupaten:', error);
    return null;
  }

  return data;
}

/**
 * Get all budaya categories
 */
export async function getBudayaCategories(): Promise<BudayaCategory[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('budaya_categories')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }

  return data || [];
}

/**
 * Get budaya items with filtering, search, and pagination
 */
export async function getBudayaItems(
  params: GetBudayaItemsParams = {}
): Promise<GetBudayaItemsResponse> {
  const supabase = await createClient();
  
  const {
    kabupaten_slug,
    category_slug,
    type,
    search,
    featured,
    status = 'published',
    limit = 20,
    offset = 0,
    order_by = 'rating',
    order_direction = 'desc',
  } = params;

  // Build query
  let query = supabase
    .from('budaya_items')
    .select(`
      *,
      kabupaten:kabupatens(*),
      category:budaya_categories(*)
    `, { count: 'exact' })
    .eq('status', status);

  // Apply filters
  if (kabupaten_slug) {
    const kabupaten = await getKabupatenBySlug(kabupaten_slug);
    if (kabupaten) {
      query = query.eq('kabupaten_id', kabupaten.id);
    }
  }

  if (category_slug) {
    const { data: category } = await supabase
      .from('budaya_categories')
      .select('id')
      .eq('slug', category_slug)
      .single();
    
    if (category) {
      query = query.eq('category_id', category.id);
    }
  }

  if (type) {
    query = query.eq('type', type);
  }

  if (featured !== undefined) {
    query = query.eq('featured', featured);
  }

  if (search) {
    query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,tags.cs.{${search}}`);
  }

  // Apply ordering
  query = query.order(order_by, { ascending: order_direction === 'asc' });

  // Apply pagination
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    console.error('Error fetching budaya items:', error);
    throw error;
  }

  return {
    items: (data || []) as BudayaItemWithRelations[],
    total: count || 0,
    limit,
    offset,
  };
}

/**
 * Get single budaya item by slug with all relations
 */
export async function getBudayaItemBySlug(slug: string): Promise<BudayaItemWithRelations | null> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('budaya_items')
    .select(`
      *,
      kabupaten:kabupatens(*),
      category:budaya_categories(*),
      images:budaya_images(*),
      recent_reviews:budaya_reviews(*)
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .order('display_order', { foreignTable: 'budaya_images' })
    .order('created_at', { foreignTable: 'budaya_reviews', ascending: false })
    .limit(5, { foreignTable: 'budaya_reviews' })
    .single();

  if (error) {
    console.error('Error fetching budaya item:', error);
    return null;
  }

  // Increment view count (fire and forget)
  supabase.rpc('increment_budaya_item_views', { item_id: data.id }).then();

  return data as BudayaItemWithRelations;
}

/**
 * Get featured budaya items
 */
export async function getFeaturedBudayaItems(limit = 6): Promise<BudayaItemWithRelations[]> {
  const { items } = await getBudayaItems({
    featured: true,
    limit,
    order_by: 'rating',
    order_direction: 'desc',
  });
  
  return items;
}

/**
 * Create a review for a budaya item
 */
export async function createBudayaReview(params: CreateReviewParams): Promise<boolean> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('budaya_reviews')
    .insert({
      budaya_item_id: params.budaya_item_id,
      user_name: params.user_name,
      rating: params.rating,
      comment: params.comment,
      visit_date: params.visit_date,
      status: 'pending', // Reviews need approval
    });

  if (error) {
    console.error('Error creating review:', error);
    return false;
  }

  return true;
}

/**
 * Get budaya statistics
 */
export async function getBudayaStats(): Promise<BudayaStats | null> {
  const supabase = await createClient();
  
  try {
    // Total items
    const { count: totalItems } = await supabase
      .from('budaya_items')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'published');

    // Total kabupatens
    const { count: totalKabupatens } = await supabase
      .from('kabupatens')
      .select('*', { count: 'exact', head: true });

    // Total reviews
    const { count: totalReviews } = await supabase
      .from('budaya_reviews')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'approved');

    // Average rating
    const { data: avgData } = await supabase
      .from('budaya_items')
      .select('rating')
      .eq('status', 'published');
    
    const averageRating = avgData && avgData.length > 0
      ? avgData.reduce((sum: number, item: { rating: number }) => sum + item.rating, 0) / avgData.length
      : 0;

    // Items by type
    const { data: typeData } = await supabase
      .from('budaya_items')
      .select('type')
      .eq('status', 'published');
    
    const itemsByType = {
      objek: typeData?.filter((item: { type: string }) => item.type === 'objek').length || 0,
      tradisi: typeData?.filter((item: { type: string }) => item.type === 'tradisi').length || 0,
      kuliner: typeData?.filter((item: { type: string }) => item.type === 'kuliner').length || 0,
    };

    // Items by kabupaten
    const { data: kabupatenData } = await supabase
      .from('budaya_items')
      .select(`
        kabupaten:kabupatens(name)
      `)
      .eq('status', 'published');
    
    const kabupatenCounts = kabupatenData?.reduce((acc: any, item: any) => {
      const name = item.kabupaten?.name;
      if (name) {
        acc[name] = (acc[name] || 0) + 1;
      }
      return acc;
    }, {});

    const itemsByKabupaten = Object.entries(kabupatenCounts || {}).map(([name, count]) => ({
      kabupaten_name: name,
      count: count as number,
    }));

    return {
      total_items: totalItems || 0,
      total_kabupatens: totalKabupatens || 0,
      total_reviews: totalReviews || 0,
      average_rating: parseFloat(averageRating.toFixed(1)),
      items_by_type: itemsByType,
      items_by_kabupaten: itemsByKabupaten,
    };
  } catch (error) {
    console.error('Error fetching budaya stats:', error);
    return null;
  }
}

/**
 * Search budaya items by query (full-text search)
 */
export async function searchBudayaItems(query: string, limit = 10): Promise<BudayaItemWithRelations[]> {
  const { items } = await getBudayaItems({
    search: query,
    limit,
    order_by: 'rating',
  });
  
  return items;
}
