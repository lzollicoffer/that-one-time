import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * GET /api/timelines/[slug] — public endpoint for a single timeline with events.
 * Returns the timeline metadata, events (with bullets), and linked entities.
 * Used by the consumer timeline view page.
 */

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return NextResponse.json({ error: 'Not configured' }, { status: 503 });
  }

  const { slug } = await params;
  const supabase = createClient(url, key);

  // Fetch timeline
  const { data: timeline, error: tlError } = await supabase
    .from('timelines')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (tlError || !timeline) {
    return NextResponse.json({ error: 'Timeline not found' }, { status: 404 });
  }

  // Fetch events with bullets
  const { data: events } = await supabase
    .from('events')
    .select('*, event_bullets(id, content, sort_order)')
    .eq('timeline_id', timeline.id)
    .order('sort_order', { ascending: true });

  // Fetch linked entities
  const { data: entityLinks } = await supabase
    .from('timeline_entities')
    .select('*, entities(*)')
    .eq('timeline_id', timeline.id)
    .order('sort_order', { ascending: true });

  return NextResponse.json({
    timeline: {
      ...timeline,
      title: timeline.title,
    },
    events: (events || []).map((e: Record<string, unknown>) => ({
      id: e.id,
      timelineId: e.timeline_id,
      date: e.date_display,
      title: e.title,
      cardDescription: e.preview_text || '',
      eventType: e.event_type,
      imageUrl: e.preview_image_url || undefined,
      sortOrder: e.sort_order,
      detailBullets: (
        (e.event_bullets as { id: string; content: string; sort_order: number }[]) || []
      )
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((b) => ({
          id: b.id,
          eventId: e.id,
          content: b.content,
          sortOrder: b.sort_order,
        })),
      images: [],
    })),
    entities: (entityLinks || []).map((link: Record<string, unknown>) => {
      const entity = link.entities as Record<string, unknown> | null;
      return {
        id: entity?.id || link.entity_id,
        timelineId: link.timeline_id,
        entityType: entity?.entity_type || 'book',
        title: entity?.title || '',
        creator: entity?.creator_name || '',
        description: entity?.description || '',
        coverImageUrl: entity?.cover_image_url || '',
        externalUrl: '',
        sortOrder: link.sort_order,
      };
    }),
  });
}
