import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * GET /api/me — returns the current user's profile
 * PATCH /api/me — updates the current user's profile
 */

export async function GET() {
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Not configured' }, { status: 503 });
  }
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(profile);
}

export async function PATCH(request: Request) {
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Not configured' }, { status: 503 });
  }
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { display_name, avatar_url } = body;

  const { data, error } = await supabase
    .from('profiles')
    .update({
      display_name,
      avatar_url,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
