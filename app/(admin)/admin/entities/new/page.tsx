'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Create Entity Page — Admin CMS
 * Story 3.1–3.3: Add book, podcast, or movie.
 */

interface TimelineOption {
  id: string;
  title: string;
}

export default function NewEntityPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [timelines, setTimelines] = useState<TimelineOption[]>([]);
  const [linkTimelineId, setLinkTimelineId] = useState('');
  const [linkContextLine, setLinkContextLine] = useState('');

  const [form, setForm] = useState({
    entity_type: 'book',
    title: '',
    creator_name: '',
    description: '',
    cover_image_url: '',
    year: '',
    duration: '',
    external_links: [{ platform: '', url: '' }],
  });

  useEffect(() => {
    fetch('/api/admin/timelines')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (Array.isArray(data)) {
          setTimelines(
            data.map((t: { id: string; title: string }) => ({
              id: t.id,
              title: t.title.replace(/\n/g, ' '),
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateLink = (index: number, field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      external_links: prev.external_links.map((l, i) =>
        i === index ? { ...l, [field]: value } : l
      ),
    }));
  };

  const addLink = () => {
    setForm((prev) => ({
      ...prev,
      external_links: [...prev.external_links, { platform: '', url: '' }],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const res = await fetch('/api/admin/entities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const entityData = await res.json();

      // If a timeline was selected, link the entity to it
      if (linkTimelineId && entityData.id) {
        await fetch(`/api/admin/timelines/${linkTimelineId}/entities`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            entity_id: entityData.id,
            context_line: linkContextLine || 'Related content',
            sort_order: 0,
          }),
        });
      }

      router.push('/admin/entities');
    } else {
      const data = await res.json();
      setError(data.error || 'Failed to create entity');
      setSaving(false);
    }
  };

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

  const creatorLabel =
    form.entity_type === 'book'
      ? 'Author'
      : form.entity_type === 'podcast'
        ? 'Host'
        : 'Director';

  return (
    <div style={{ maxWidth: '640px' }}>
      <h1 style={{ fontFamily: 'var(--font-body)', fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>
        New Entity
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#666' }}>Type</span>
          <select value={form.entity_type} onChange={(e) => updateField('entity_type', e.target.value)} style={inputStyle}>
            <option value="book">Book</option>
            <option value="podcast">Podcast</option>
            <option value="movie">Movie</option>
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#666' }}>Title *</span>
          <input type="text" value={form.title} onChange={(e) => updateField('title', e.target.value)} style={inputStyle} required />
        </label>

        <label className="flex flex-col gap-1">
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#666' }}>{creatorLabel}</span>
          <input type="text" value={form.creator_name} onChange={(e) => updateField('creator_name', e.target.value)} style={inputStyle} />
        </label>

        <div className="flex gap-4">
          <label className="flex flex-col gap-1 flex-1">
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#666' }}>Year</span>
            <input type="text" value={form.year} onChange={(e) => updateField('year', e.target.value)} style={inputStyle} />
          </label>
          {(form.entity_type === 'podcast' || form.entity_type === 'movie') && (
            <label className="flex flex-col gap-1 flex-1">
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#666' }}>Duration</span>
              <input type="text" value={form.duration} onChange={(e) => updateField('duration', e.target.value)} style={inputStyle} placeholder="e.g. 2h 15m" />
            </label>
          )}
        </div>

        <label className="flex flex-col gap-1">
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#666' }}>Description</span>
          <textarea value={form.description} onChange={(e) => updateField('description', e.target.value)} rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
        </label>

        <label className="flex flex-col gap-1">
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#666' }}>Cover Image URL</span>
          <input type="text" value={form.cover_image_url} onChange={(e) => updateField('cover_image_url', e.target.value)} style={inputStyle} />
        </label>

        {/* External links */}
        <div>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#666' }}>External Links</span>
          {form.external_links.map((link, i) => (
            <div key={i} className="flex gap-2 mt-2">
              <input placeholder="Platform (e.g. Amazon)" value={link.platform} onChange={(e) => updateLink(i, 'platform', e.target.value)} style={{ ...inputStyle, width: '140px' }} />
              <input placeholder="URL" value={link.url} onChange={(e) => updateLink(i, 'url', e.target.value)} style={inputStyle} />
            </div>
          ))}
          <button type="button" onClick={addLink} style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', marginTop: '8px' }}>
            + Add Link
          </button>
        </div>

        {/* Link to Timeline */}
        <div
          style={{
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid #eee',
            backgroundColor: '#fafafa',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              fontWeight: 600,
              color: '#666',
              display: 'block',
              marginBottom: '8px',
            }}
          >
            Link to Timeline (optional)
          </span>
          <select
            value={linkTimelineId}
            onChange={(e) => setLinkTimelineId(e.target.value)}
            style={inputStyle}
          >
            <option value="">None — add to library only</option>
            {timelines.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>

          {linkTimelineId && (
            <div style={{ marginTop: '8px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#666',
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                Why this matters here *
              </span>
              <input
                type="text"
                placeholder="e.g. Essential reading for understanding the conflict"
                value={linkContextLine}
                onChange={(e) => setLinkContextLine(e.target.value)}
                style={inputStyle}
              />
            </div>
          )}
        </div>

        {error && <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#D32F2F' }}>{error}</p>}

        <div className="flex gap-3 mt-4">
          <button type="submit" disabled={saving} style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 700, padding: '10px 24px', borderRadius: '8px', backgroundColor: 'var(--color-primary)', color: '#fff', border: 'none', cursor: 'pointer', opacity: saving ? 0.5 : 1 }}>
            {saving ? 'Creating...' : 'Create Entity'}
          </button>
          <button type="button" onClick={() => router.push('/admin/entities')} style={{ fontFamily: 'var(--font-body)', fontSize: '14px', padding: '10px 24px', borderRadius: '8px', border: '1px solid #ddd', backgroundColor: '#fff', cursor: 'pointer' }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
