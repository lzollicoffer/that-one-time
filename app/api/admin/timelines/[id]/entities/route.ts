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
    .from('timeline_entities')
    .select('*, entities(*)')
    .eq('timeline_id', id)
    .order('sort_order', { ascending: true });

  if (queryError) {
    return NextResponse.json({ error: queryError.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  const { supabase, error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const body = await request.json() as Record<string, unknown>;

  const { data, error: insertError } = await supabase!
    .from('timeline_entities')
    .insert({
      timeline_id: id,
      entity_id: body.entity_id,
      context_line: body.context_line,
      sort_order: body.sort_order,
    })
    .select('*, entities(*)')
    .single();

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { supabase, error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const entityId = searchParams.get('entityId');

  if (!entityId) {
    return NextResponse.json({ error: 'entityId query parameter is required' }, { status: 400 });
  }

  const { error: deleteError } = await supabase!
    .from('timeline_entities')
    .delete()
    .eq('timeline_id', id)
    .eq('entity_id', entityId);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
