'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

/**
 * Edit Entity Page — Admin CMS
 * Story 3.5: Edit entity item.
 */

interface EntityData {
  id: string;
  entity_type: string;
  title: string;
  creator_name: string;
  description: string;
  cover_image_url: string;
  year: string;
  duration: string;
  external_links: { platform: string; url: string }[];
}

export default function EditEntityPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [form, setForm] = useState<EntityData | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/admin/entities/${id}`)
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

    const res = await fetch(`/api/admin/entities/${id}`, {
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
    if (!confirm('Delete this entity from the platform?')) return;
    await fetch(`/api/admin/entities/${id}`, { method: 'DELETE' });
    router.push('/admin/entities');
  };

  if (!form) {
    return <p style={{ fontFamily: 'var(--font-body)', color: '#666' }}>Loading...</p>;
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
      <h1 style={{ fontFamily: 'var(--font-body)', fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>
        Edit: {form.title}
      </h1>

      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#666' }}>Type</span>
          <input type="text" value={form.entity_type} disabled style={{ ...inputStyle, backgroundColor: '#f5f5f5' }} />
        </label>

        <label className="flex flex-col gap-1">
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#666' }}>Title</span>
          <input type="text" value={form.title} onChange={(e) => updateField('title', e.target.value)} style={inputStyle} />
        </label>

        <label className="flex flex-col gap-1">
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#666' }}>Creator</span>
          <input type="text" value={form.creator_name || ''} onChange={(e) => updateField('creator_name', e.target.value)} style={inputStyle} />
        </label>

        <label className="flex flex-col gap-1">
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#666' }}>Description</span>
          <textarea value={form.description || ''} onChange={(e) => updateField('description', e.target.value)} rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
        </label>

        <label className="flex flex-col gap-1">
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#666' }}>Cover Image URL</span>
          <input type="text" value={form.cover_image_url || ''} onChange={(e) => updateField('cover_image_url', e.target.value)} style={inputStyle} />
        </label>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#999' }}>
          Entity ID: {form.id} (use this to link to timelines)
        </p>

        {error && <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#D32F2F' }}>{error}</p>}
        {saved && <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#2E7D32' }}>Saved</p>}

        <div className="flex gap-3 mt-4">
          <button onClick={handleSave} disabled={saving} style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 700, padding: '10px 24px', borderRadius: '8px', backgroundColor: 'var(--color-primary)', color: '#fff', border: 'none', cursor: 'pointer', opacity: saving ? 0.5 : 1 }}>
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button onClick={handleDelete} style={{ fontFamily: 'var(--font-body)', fontSize: '14px', padding: '10px 24px', borderRadius: '8px', border: '1px solid #D32F2F', color: '#D32F2F', backgroundColor: '#fff', cursor: 'pointer' }}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
