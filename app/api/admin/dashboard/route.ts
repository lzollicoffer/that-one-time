import { NextResponse } from 'next/server';
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

export async function GET() {
  const { supabase, error } = await requireAdmin();
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
