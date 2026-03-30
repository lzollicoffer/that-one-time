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

export async function GET(request: NextRequest) {
  const { supabase, error } = await requireAdmin();
  if (error) return error;

  const { searchParams } = new URL(request.url);
  const entityType = searchParams.get('entity_type');

  let query = supabase!.from('entities').select('*');

  if (entityType) {
    query = query.eq('entity_type', entityType);
  }

  const { data, error: queryError } = await query.order('created_at', { ascending: false });

  if (queryError) {
    return NextResponse.json({ error: queryError.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const { supabase, error } = await requireAdmin();
  if (error) return error;

  const body = await request.json() as Record<string, unknown>;

  const { data, error: insertError } = await supabase!
    .from('entities')
    .insert({
      entity_type: body.entity_type,
      title: body.title,
      creator_name: body.creator_name,
      description: body.description,
      cover_image_url: body.cover_image_url,
      external_links: body.external_links,
    })
    .select()
    .single();

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
