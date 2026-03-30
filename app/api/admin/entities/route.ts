import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/admin-api';

export async function GET(request: NextRequest) {
  const { supabase, error } = getAdminClient();
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

  // Fetch linked timelines for all returned entities
  if (data && data.length > 0) {
    const entityIds = data.map((e: { id: string }) => e.id);
    const { data: links } = await supabase!
      .from('timeline_entities')
      .select('entity_id, timeline_id, timelines(id, title)')
      .in('entity_id', entityIds);

    // Build a map of entity_id -> array of timeline names
    const linkMap: Record<string, { id: string; title: string }[]> = {};
    if (links) {
      for (const link of links) {
        const eid = (link as Record<string, unknown>).entity_id as string;
        const tl = (link as Record<string, unknown>).timelines as { id: string; title: string } | null;
        if (!tl) continue;
        if (!linkMap[eid]) linkMap[eid] = [];
        linkMap[eid].push({ id: tl.id, title: tl.title.replace(/\n/g, ' ') });
      }
    }

    // Attach linked_timelines to each entity
    const enriched = data.map((e: { id: string }) => ({
      ...e,
      linked_timelines: linkMap[e.id] || [],
    }));

    return NextResponse.json(enriched);
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const { supabase, error } = getAdminClient();
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
