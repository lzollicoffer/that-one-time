import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/admin-api';

/**
 * GET /api/admin/timelines/[id]/tags — get tags for a timeline
 * PUT /api/admin/timelines/[id]/tags — replace all tags for a timeline
 *   Body: { tags: string[] } e.g. { tags: ["tragic", "recent"] }
 */

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { supabase, error } = getAdminClient();
  if (error) return error;
  const { id } = await params;

  const { data } = await supabase!
    .from('timeline_tags')
    .select('tag_value')
    .eq('timeline_id', id);

  return NextResponse.json(
    (data || []).map((t: { tag_value: string }) => t.tag_value)
  );
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { supabase, error } = getAdminClient();
  if (error) return error;
  const { id } = await params;
  const { tags } = (await request.json()) as { tags: string[] };

  // Delete existing tags
  await supabase!.from('timeline_tags').delete().eq('timeline_id', id);

  // Insert new tags
  if (tags.length > 0) {
    await supabase!.from('timeline_tags').insert(
      tags.map((tag) => ({ timeline_id: id, tag_value: tag }))
    );
  }

  return NextResponse.json({ success: true });
}
