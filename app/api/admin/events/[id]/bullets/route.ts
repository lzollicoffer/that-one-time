import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/admin-api';

interface RouteParams {
  params: Promise<{ id: string }>;
}

interface BulletUpdate {
  id: string;
  content: string;
  sort_order: number;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { supabase, error } = getAdminClient();
  if (error) return error;

  const { id } = await params;

  const { data, error: queryError } = await supabase!
    .from('event_bullets')
    .select('*')
    .eq('event_id', id)
    .order('sort_order', { ascending: true });

  if (queryError) {
    return NextResponse.json({ error: queryError.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  const { supabase, error } = getAdminClient();
  if (error) return error;

  const { id } = await params;
  const body = await request.json() as Record<string, unknown>;

  const { data, error: insertError } = await supabase!
    .from('event_bullets')
    .insert({
      event_id: id,
      content: body.content,
      sort_order: body.sort_order,
    })
    .select()
    .single();

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const { supabase, error } = getAdminClient();
  if (error) return error;

  const { id } = await params;
  const body = await request.json() as BulletUpdate[];

  if (!Array.isArray(body)) {
    return NextResponse.json({ error: 'Request body must be an array of bullet updates' }, { status: 400 });
  }

  const results = await Promise.all(
    body.map((bullet) =>
      supabase!
        .from('event_bullets')
        .update({ content: bullet.content, sort_order: bullet.sort_order })
        .eq('id', bullet.id)
        .eq('event_id', id)
        .select()
        .single()
    )
  );

  const errors = results.filter((r) => r.error);
  if (errors.length > 0) {
    return NextResponse.json(
      { error: 'Some updates failed', details: errors.map((e) => e.error?.message) },
      { status: 500 }
    );
  }

  return NextResponse.json(results.map((r) => r.data));
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { supabase, error } = getAdminClient();
  if (error) return error;

  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const bulletId = searchParams.get('bulletId');

  if (!bulletId) {
    return NextResponse.json({ error: 'bulletId query parameter is required' }, { status: 400 });
  }

  const { error: deleteError } = await supabase!
    .from('event_bullets')
    .delete()
    .eq('id', bulletId)
    .eq('event_id', id);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
