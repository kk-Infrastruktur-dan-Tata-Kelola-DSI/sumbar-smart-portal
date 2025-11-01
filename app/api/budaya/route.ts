// API route for budaya items
import { NextRequest, NextResponse } from 'next/server';
import { getBudayaItems } from '@/utils/budaya-queries';
import type { BudayaItemType } from '@/types/budaya';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const kabupaten_slug = searchParams.get('kabupaten') || undefined;
    const category_slug = searchParams.get('category') || undefined;
    const type = searchParams.get('type') as BudayaItemType | undefined;
    const search = searchParams.get('search') || undefined;
    const featured = searchParams.get('featured') === 'true' ? true : undefined;
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    const order_by = searchParams.get('order_by') as any || 'rating';
    const order_direction = searchParams.get('order_direction') as 'asc' | 'desc' || 'desc';

    // Fetch data
    const result = await getBudayaItems({
      kabupaten_slug,
      category_slug,
      type,
      search,
      featured,
      limit,
      offset,
      order_by,
      order_direction,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in budaya API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch budaya items' },
      { status: 500 }
    );
  }
}
