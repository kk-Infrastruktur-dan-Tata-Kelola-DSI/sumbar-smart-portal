// API route for kabupatens
import { NextResponse } from 'next/server';
import { getKabupatens } from '@/utils/budaya-queries';

export async function GET() {
  try {
    const kabupatens = await getKabupatens(true);
    return NextResponse.json(kabupatens);
  } catch (error) {
    console.error('Error in kabupatens API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch kabupatens' },
      { status: 500 }
    );
  }
}
