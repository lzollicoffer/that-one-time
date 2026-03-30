import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * Creates a Supabase admin client for admin API routes.
 * Uses the service role key to bypass RLS.
 *
 * When user auth is enabled later, add session checking here.
 * For now, admin routes are accessible without login to allow
 * content management during development.
 */
export function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return {
      supabase: null,
      error: NextResponse.json({ error: 'Not configured' }, { status: 503 }),
    };
  }

  return { supabase: createClient(url, key), error: null };
}
