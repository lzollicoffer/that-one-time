import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * POST /api/admin/upload — Upload image to Supabase storage.
 * Accepts multipart form data with a "file" field.
 * Returns the public URL of the uploaded image.
 *
 * Uses the service role key to bypass RLS on storage.
 */

export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return NextResponse.json({ error: 'Not configured' }, { status: 503 });
  }

  const supabase = createClient(url, key);

  const formData = await request.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  // Generate a unique path: images/timelines/{timestamp}-{filename}
  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const path = `timelines/${timestamp}-${safeName}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const { error: uploadError } = await supabase.storage
    .from('images')
    .upload(path, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json(
      { error: uploadError.message },
      { status: 500 }
    );
  }

  const { data: publicUrlData } = supabase.storage
    .from('images')
    .getPublicUrl(path);

  return NextResponse.json({ url: publicUrlData.publicUrl });
}
