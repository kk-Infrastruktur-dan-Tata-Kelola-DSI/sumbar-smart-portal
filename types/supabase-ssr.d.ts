// Temporary ambient module declarations to satisfy TypeScript in environments
// where @supabase/ssr is not installed yet. This is only for type-checking
// and should be removed once dependencies are installed locally.

declare module "@supabase/ssr" {
  export type CookieOptions = any;

  export function createBrowserClient(
    url: string,
    key: string,
  ): any;

  export function createServerClient(
    url: string,
    key: string,
    options: {
      cookies: {
        getAll: () => Array<{ name: string; value: string }>;
        setAll: (
          cookies: { name: string; value: string; options: CookieOptions }[],
        ) => void;
      };
    },
  ): any;
}

