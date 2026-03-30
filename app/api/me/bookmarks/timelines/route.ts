import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * GET /api/me/bookmarks/timelines — list bookmarked timelines
 * POST /api/me/bookmarks/timelines — bookmark a timeline
 * DELETE /api/me/bookmarks/timelines?timelineId=xxx — remove bookmark
 */

export async function GET() {
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Not configured' }, { status: 503 });
  }
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('bookmarked_timelines')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Not configured' }, { status: 503 });
  }
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { timelineId } = await request.json();

  const { data, error } = await supabase
    .from('bookmarked_timelines')
    .insert({ user_id: user.id, timeline_id: timelineId })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

export async function DELETE(request: Request) {
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Not configured' }, { status: 503 });
  }
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const timelineId = searchParams.get('timelineId');

  if (!timelineId) {
    return NextResponse.json(
      { error: 'timelineId is required' },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from('bookmarked_timelines')
    .delete()
    .eq('user_id', user.id)
    .eq('timeline_id', timelineId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
