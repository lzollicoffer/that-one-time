import { createBrowserClient } from '@supabase/ssr';

/**
 * Supabase browser client — used in Client Components.
 * Creates a singleton client for the browser environment.
 * Returns null if env vars are not configured (build time / dev without Supabase).
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  return createBrowserClient(url, key);
}
