import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * OAuth callback route — handles the code exchange after social login.
 * Supabase redirects here after Google/Apple auth.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/browse';

  if (code) {
    const supabase = await createClient();
    if (supabase) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // If code exchange fails, redirect to login with error
  return NextResponse.redirect(`${origin}/auth/login?error=auth_failed`);
}
