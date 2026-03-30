'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ImageUploader } from '@/components/admin/shared/image-uploader';

/**
 * Create Timeline Page — Admin CMS
 * Story 1.1: Create Timeline with full editorial controls.
 */

export default function NewTimelinePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    slug: '',
    introduction: '',
    time_span_start: '',
    time_span_end: '',
    browse_description: '',
    cover_image_url: '',
  });

  const TAG_OPTIONS = ['tragic', 'inspiring', 'chill', 'recent'];

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === 'title' && !form.slug) {
      setForm((prev) => ({
        ...prev,
        [field]: value,
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const res = await fetch('/api/admin/timelines', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const data = await res.json();
      // Save tags
      if (selectedTags.length > 0) {
        await fetch(`/api/admin/timelines/${data.id}/tags`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tags: selectedTags }),
        });
      }
      router.push(`/admin/timelines/${data.id}`);
    } else {
      const data = await res.json();
      setError(data.error || 'Failed to create timeline');
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: '640px' }}>
      <h1
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '24px',
          fontWeight: 700,
          marginBottom: '24px',
        }}
      >
        New Timeline
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormField label="Title *" value={form.title} onChange={(v) => updateField('title', v)} />
        <FormField label="Subtitle" value={form.subtitle} onChange={(v) => updateField('subtitle', v)} />
        <FormField label="Slug *" value={form.slug} onChange={(v) => updateField('slug', v)} />
        <div className="flex gap-4">
          <FormField label="Start Date *" value={form.time_span_start} onChange={(v) => updateField('time_span_start', v)} />
          <FormField label="End Date *" value={form.time_span_end} onChange={(v) => updateField('time_span_end', v)} />
        </div>
        <FormField label="Browse Description" value={form.browse_description} onChange={(v) => updateField('browse_description', v)} multiline />
        <FormField label="Introduction (200-400 words)" value={form.introduction} onChange={(v) => updateField('introduction', v)} multiline rows={6} />
        {/* Category Tags */}
        <div className="flex flex-col gap-1">
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#666' }}>
            Category Tags
          </span>
          <div className="flex gap-2 flex-wrap">
            {TAG_OPTIONS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: selectedTags.includes(tag) ? 700 : 400,
                  padding: '6px 14px',
                  borderRadius: '20px',
                  backgroundColor: selectedTags.includes(tag) ? 'var(--color-accent-yellow)' : '#fff',
                  border: selectedTags.includes(tag) ? 'none' : '1px solid #ddd',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <ImageUploader
          label="Cover Image"
          value={form.cover_image_url}
          onChange={(v) => updateField('cover_image_url', v)}
        />

        {error && (
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#D32F2F' }}>{error}</p>
        )}

        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            disabled={saving}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 700,
              padding: '10px 24px',
              borderRadius: '8px',
              backgroundColor: 'var(--color-primary)',
              color: '#FFFFFF',
              border: 'none',
              cursor: saving ? 'not-allowed' : 'pointer',
              opacity: saving ? 0.5 : 1,
            }}
          >
            {saving ? 'Creating...' : 'Create Timeline'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/timelines')}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              padding: '10px 24px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              backgroundColor: '#fff',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function FormField({
  label,
  value,
  onChange,
  multiline = false,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  rows?: number;
}) {
  const inputStyle = {
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    backgroundColor: '#fff',
    width: '100%',
    outline: 'none',
  };

  return (
    <label className="flex flex-col gap-1 flex-1">
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          fontWeight: 600,
          color: '#666',
        }}
      >
        {label}
      </span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={inputStyle}
        />
      )}
    </label>
  );
}
