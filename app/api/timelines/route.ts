import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * GET /api/timelines — public endpoint for published timelines.
 * Returns all published timelines with their tags.
 * Used by the browse page to display timeline cards.
 */

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return NextResponse.json([]);
  }

  const supabase = createClient(url, key);

  const { data: timelines, error } = await supabase
    .from('timelines')
    .select('id, title, slug, time_span_start, time_span_end, browse_description, cover_image_url, status, event_count')
    .eq('status', 'published')
    .order('created_at', { ascending: true });

  if (error) {
    return NextResponse.json([]);
  }

  // Fetch tags for all timelines
  const timelineIds = timelines.map((t: { id: string }) => t.id);
  const { data: tags } = await supabase
    .from('timeline_tags')
    .select('timeline_id, tag_value')
    .in('timeline_id', timelineIds);

  const tagMap: Record<string, string[]> = {};
  if (tags) {
    for (const tag of tags) {
      const tid = (tag as { timeline_id: string }).timeline_id;
      const val = (tag as { tag_value: string }).tag_value;
      if (!tagMap[tid]) tagMap[tid] = [];
      tagMap[tid].push(val);
    }
  }

  const result = timelines.map((t: Record<string, unknown>) => ({
    id: t.id,
    slug: t.slug,
    title: (t.title as string).replace(/\n/g, ' '),
    timeSpan: `${t.time_span_start} — ${t.time_span_end}`.toUpperCase(),
    description: t.browse_description || '',
    coverImageUrl: t.cover_image_url || '',
    tags: tagMap[t.id as string] || [],
  }));

  return NextResponse.json(result);
}
