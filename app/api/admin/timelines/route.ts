import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/admin-api';

export async function GET() {
  const { supabase, error } = getAdminClient();
  if (error) return error;

  // Try sort_order first; fall back to created_at if column doesn't exist yet
  let { data, error: queryError } = await supabase!
    .from('timelines')
    .select('*')
    .order('sort_order', { ascending: true });

  if (queryError && queryError.code === '42703') {
    const fallback = await supabase!
      .from('timelines')
      .select('*')
      .order('created_at', { ascending: true });
    data = fallback.data;
    queryError = fallback.error;
  }

  if (queryError) {
    return NextResponse.json({ error: queryError.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const { supabase, error } = getAdminClient();
  if (error) return error;

  const body = await request.json() as Record<string, unknown>;

  const { data, error: insertError } = await supabase!
    .from('timelines')
    .insert({
      title: body.title,
      subtitle: body.subtitle,
      slug: body.slug,
      introduction: body.introduction,
      time_span_start: body.time_span_start,
      time_span_end: body.time_span_end,
      cover_image_url: body.cover_image_url,
      status: body.status ?? 'draft',
      browse_description: body.browse_description,
    })
    .select()
    .single();

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
