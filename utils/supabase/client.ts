
import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Developer-friendly diagnostics if env vars are missing in the browser
if (typeof window !== "undefined") {
  if (!supabaseUrl || !supabaseKey) {
    // eslint-disable-next-line no-console
    console.error(
      "[Supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Client-side data fetching will fail.\n" +
      "Set them in .env.local and restart the dev server."
    );
  }
}

export const createClient = () =>
  createBrowserClient(
    supabaseUrl!,
    supabaseKey!,
  );
