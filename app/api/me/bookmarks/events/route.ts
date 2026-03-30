import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * GET /api/me/bookmarks/events — list bookmarked events
 * POST /api/me/bookmarks/events — bookmark an event
 * DELETE /api/me/bookmarks/events?eventId=xxx — remove bookmark
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
    .from('bookmarked_events')
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

  const { eventId } = await request.json();

  const { data, error } = await supabase
    .from('bookmarked_events')
    .insert({ user_id: user.id, event_id: eventId })
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
  const eventId = searchParams.get('eventId');

  if (!eventId) {
    return NextResponse.json(
      { error: 'eventId is required' },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from('bookmarked_events')
    .delete()
    .eq('user_id', user.id)
    .eq('event_id', eventId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
