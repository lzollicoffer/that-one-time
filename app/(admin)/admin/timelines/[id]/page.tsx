'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

/**
 * Edit Timeline Page — Admin CMS
 * Story 1.2: Edit timeline metadata
 * Story 1.3: Visual theming (bg color, accent color, header style)
 * Story 1.4: Manage status
 */

interface TimelineData {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  introduction: string;
  time_span_start: string;
  time_span_end: string;
  browse_description: string;
  cover_image_url: string;
  status: string;
  bg_color: string;
  accent_color: string;
  header_style: string;
  event_count: number;
}

export default function EditTimelinePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [form, setForm] = useState<TimelineData | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/admin/timelines/${id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setForm(data))
      .catch(() => {});
  }, [id]);

  const updateField = (field: string, value: string) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
    setSaved(false);
  };

  const handleSave = async () => {
    if (!form) return;
    setSaving(true);
    setError(null);
    setSaved(false);

    const res = await fetch(`/api/admin/timelines/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setSaved(true);
    } else {
      const data = await res.json();
      setError(data.error || 'Failed to save');
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this timeline?')) return;
    await fetch(`/api/admin/timelines/${id}`, { method: 'DELETE' });
    router.push('/admin/timelines');
  };

  if (!form) {
    return (
      <p style={{ fontFamily: 'var(--font-body)', color: '#666' }}>
        Loading...
      </p>
    );
  }

  const inputStyle = {
    fontFamily: 'var(--font-body)' as const,
    fontSize: '14px',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    backgroundColor: '#fff',
    width: '100%',
    outline: 'none' as const,
  };

  return (
    <div style={{ maxWidth: '640px' }}>
      <div className="flex items-center justify-between mb-6">
        <h1
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '24px',
            fontWeight: 700,
          }}
        >
          Edit: {form.title}
        </h1>
        <div className="flex gap-2">
          <Link
            href={`/admin/timelines/${id}/events`}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 600,
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              color: '#333',
            }}
          >
            Events ({form.event_count})
          </Link>
          <Link
            href={`/admin/timelines/${id}/entities`}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 600,
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              color: '#333',
            }}
          >
            Entities
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Metadata */}
        <label className="flex flex-col gap-1">
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#666' }}>Title</span>
          <input type="text" value={form.title} onChange={(e) => updateField('title', e.target.value)} style={inputStyle} />
        </label>

        <label className="flex flex-col gap-1">
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#666' }}>Subtitle</span>
          <input type="text" value={form.subtitle || ''} onChange={(e) => updateField('subtitle', e.target.value)} style={inputStyle} />
        </label>

        <label className="flex flex-col gap-1">
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#666' }}>Slug</span>
          <input type="text" value={form.slug} onChange={(e) => updateField('slug', e.target.value)} style={inputStyle} />
        </label>

        <div className="flex gap-4">
          <label className="flex flex-col gap-1 flex-1">
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#666' }}>Start</span>
            <input type="text" value={form.time_span_start || ''} onChange={(e) => updateField('time_span_start', e.target.value)} style={inputStyle} />
          </label>
          <label className="flex flex-col gap-1 flex-1">
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#666' }}>End</span>
            <input type="text" value={form.time_span_end || ''} onChange={(e) => updateField('time_span_end', e.target.value)} style={inputStyle} />
          </label>
        </div>

        <label className="flex flex-col gap-1">
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#666' }}>Browse Description</span>
          <textarea value={form.browse_description || ''} onChange={(e) => updateField('browse_description', e.target.value)} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
        </label>

        <label className="flex flex-col gap-1">
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#666' }}>Introduction</span>
          <textarea value={form.introduction || ''} onChange={(e) => updateField('introduction', e.target.value)} rows={6} style={{ ...inputStyle, resize: 'vertical' }} />
        </label>

        <label className="flex flex-col gap-1">
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#666' }}>Cover Image URL</span>
          <input type="text" value={form.cover_image_url || ''} onChange={(e) => updateField('cover_image_url', e.target.value)} style={inputStyle} />
        </label>

        {/* Status */}
        <label className="flex flex-col gap-1">
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#666' }}>Status</span>
          <select value={form.status} onChange={(e) => updateField('status', e.target.value)} style={inputStyle}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="unlisted">Unlisted</option>
            <option value="archived">Archived</option>
          </select>
        </label>

        {/* Theme settings */}
        <h2 style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 700, marginTop: '16px' }}>
          Visual Theme
        </h2>

        <div className="flex gap-4">
          <label className="flex flex-col gap-1 flex-1">
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#666' }}>Background Color</span>
            <input type="color" value={form.bg_color || '#0F0F0F'} onChange={(e) => updateField('bg_color', e.target.value)} style={{ ...inputStyle, height: '40px', padding: '4px' }} />
          </label>
          <label className="flex flex-col gap-1 flex-1">
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#666' }}>Accent Color</span>
            <input type="color" value={form.accent_color || '#7D1F01'} onChange={(e) => updateField('accent_color', e.target.value)} style={{ ...inputStyle, height: '40px', padding: '4px' }} />
          </label>
          <label className="flex flex-col gap-1 flex-1">
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#666' }}>Header Style</span>
            <select value={form.header_style || 'light_on_dark'} onChange={(e) => updateField('header_style', e.target.value)} style={inputStyle}>
              <option value="light_on_dark">Light on Dark</option>
              <option value="dark_on_light">Dark on Light</option>
            </select>
          </label>
        </div>

        {error && <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#D32F2F' }}>{error}</p>}
        {saved && <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#2E7D32' }}>Saved successfully</p>}

        <div className="flex gap-3 mt-4">
          <button onClick={handleSave} disabled={saving} style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 700, padding: '10px 24px', borderRadius: '8px', backgroundColor: 'var(--color-primary)', color: '#FFFFFF', border: 'none', cursor: 'pointer', opacity: saving ? 0.5 : 1 }}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button onClick={handleDelete} style={{ fontFamily: 'var(--font-body)', fontSize: '14px', padding: '10px 24px', borderRadius: '8px', border: '1px solid #D32F2F', color: '#D32F2F', backgroundColor: '#fff', cursor: 'pointer' }}>
            Delete Timeline
          </button>
        </div>
      </div>
    </div>
  );
}
