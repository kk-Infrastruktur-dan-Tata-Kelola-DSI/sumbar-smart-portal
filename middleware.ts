import type { NextRequest } from "next/server";
import { createClient as handleSupabase } from "./utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  // Delegate to Supabase middleware helper to refresh session cookies
  return await handleSupabase(request);
}

// Exclude Next.js internals and static assets from middleware
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};

