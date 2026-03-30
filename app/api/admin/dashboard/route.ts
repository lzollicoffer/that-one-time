import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/admin-api';

export async function GET() {
  const { supabase, error } = getAdminClient();
  if (error) return error;

  const [timelinesResult, eventsResult, entitiesResult] = await Promise.all([
    supabase!.from('timelines').select('status'),
    supabase!.from('events').select('id', { count: 'exact', head: true }),
    supabase!.from('entities').select('entity_type'),
  ]);

  const timelinesByStatus: Record<string, number> = {};
  if (timelinesResult.data) {
    for (const t of timelinesResult.data) {
      const status = (t as unknown as { status: string }).status ?? 'unknown';
      timelinesByStatus[status] = (timelinesByStatus[status] ?? 0) + 1;
    }
  }

  const entitiesByType: Record<string, number> = {};
  if (entitiesResult.data) {
    for (const e of entitiesResult.data) {
      const type = (e as unknown as { entity_type: string }).entity_type ?? 'unknown';
      entitiesByType[type] = (entitiesByType[type] ?? 0) + 1;
    }
  }

  return NextResponse.json({
    timelinesByStatus,
    totalEvents: eventsResult.count ?? 0,
    entitiesByType,
  });
}
