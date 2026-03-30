import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/admin-api';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { supabase, error } = getAdminClient();
  if (error) return error;

  const { id } = await params;

  const { data, error: queryError } = await supabase!
    .from('events')
    .select('*')
    .eq('timeline_id', id)
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
    .from('events')
    .insert({
      timeline_id: id,
      event_type: body.event_type,
      title: body.title,
      preview_text: body.preview_text,
      date_display: body.date_display,
      date_sort: body.date_sort,
      preview_image_url: body.preview_image_url,
      sort_order: body.sort_order,
    })
    .select()
    .single();

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
