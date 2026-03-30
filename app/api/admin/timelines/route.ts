import { NextRequest, NextResponse } from 'next/server';
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

  const { data, error: queryError } = await supabase!
    .from('timelines')
    .select('*')
    .order('updated_at', { ascending: false });

  if (queryError) {
    return NextResponse.json({ error: queryError.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const { supabase, error } = await requireAdmin();
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
