import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

async function requireAdmin() {
  const supabase = await createClient();
  if (!supabase) {
    return { supabase: null, error: NextResponse.json({ error: 'Not configured' }, { status: 503 }) };
  }

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return { supabase: null, error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  }

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (!profile || profile.role !== 'admin') {
    return { supabase: null, error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) };
  }

  return { supabase, error: null };
}

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { supabase, error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;

  const { data, error: queryError } = await supabase!
    .from('events')
    .select('*, event_bullets(*)')
    .eq('id', id)
    .single();

  if (queryError) {
    return NextResponse.json({ error: queryError.message }, { status: 404 });
  }

  return NextResponse.json(data);
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const { supabase, error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const body = await request.json() as Record<string, unknown>;

  const { data, error: updateError } = await supabase!
    .from('events')
    .update(body)
    .eq('id', id)
    .select()
    .single();

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const { supabase, error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;

  const { error: deleteError } = await supabase!
    .from('events')
    .delete()
    .eq('id', id);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
