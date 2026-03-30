import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/admin-api';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { supabase, error } = getAdminClient();
  if (error) return error;

  const { id } = await params;

  const { data, error: queryError } = await supabase!
    .from('entities')
    .select('*')
    .eq('id', id)
    .single();

  if (queryError) {
    return NextResponse.json({ error: queryError.message }, { status: 404 });
  }

  return NextResponse.json(data);
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const { supabase, error } = getAdminClient();
  if (error) return error;

  const { id } = await params;
  const body = await request.json() as Record<string, unknown>;

  const { data, error: updateError } = await supabase!
    .from('entities')
    .update(body)
    .eq('id', id)
    .select()
    .single();

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const { supabase, error } = getAdminClient();
  if (error) return error;

  const { id } = await params;

  const { error: deleteError } = await supabase!
    .from('entities')
    .delete()
    .eq('id', id);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
