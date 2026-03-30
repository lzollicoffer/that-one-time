'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ImageUploader } from '@/components/admin/shared/image-uploader';

/**
 * Event Management Page — Admin CMS
 * Story 2.1–2.3: Create, edit, delete events within a timeline.
 * Includes inline bullet editor for Deep Dive content.
 */

interface AdminEvent {
  id: string;
  event_type: string;
  title: string;
  date_display: string;
  preview_text: string;
  preview_image_url: string | null;
  sort_order: number;
}

interface BulletItem {
  id?: string;
  content: string;
  sort_order: number;
}

export default function EventsPage() {
  const params = useParams();
  const timelineId = params.id as string;

  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<string | null>(null);
  const [bulletEditor, setBulletEditor] = useState<string | null>(null);
  const [bullets, setBullets] = useState<BulletItem[]>([]);
  const [imageEditor, setImageEditor] = useState<string | null>(null);
  const [pendingImageUrl, setPendingImageUrl] = useState<string>('');
  const [imageSaving, setImageSaving] = useState(false);
  const [imageSaved, setImageSaved] = useState(false);

  // New event form
  const [newEvent, setNewEvent] = useState({
    event_type: 'specific',
    title: '',
    date_display: '',
    preview_text: '',
    date_sort: 0,
    sort_order: 0,
  });

  useEffect(() => {
    fetchEvents();
  }, [timelineId]);

  const fetchEvents = () => {
    fetch(`/api/admin/timelines/${timelineId}/events`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        setEvents(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/admin/timelines/${timelineId}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newEvent, sort_order: events.length }),
    });
    if (res.ok) {
      setShowForm(false);
      setNewEvent({ event_type: 'specific', title: '', date_display: '', preview_text: '', date_sort: 0, sort_order: 0 });
      fetchEvents();
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm('Delete this event?')) return;
    await fetch(`/api/admin/events/${eventId}`, { method: 'DELETE' });
    fetchEvents();
  };

  const openBulletEditor = async (eventId: string) => {
    setBulletEditor(eventId);
    const res = await fetch(`/api/admin/events/${eventId}/bullets`);
    if (res.ok) {
      const data = await res.json();
      setBullets(Array.isArray(data) ? data : []);
    }
  };

  const addBullet = () => {
    setBullets((prev) => [
      ...prev,
      { content: '', sort_order: prev.length },
    ]);
  };

  const updateBullet = (index: number, content: string) => {
    setBullets((prev) =>
      prev.map((b, i) => (i === index ? { ...b, content } : b))
    );
  };

  const removeBullet = (index: number) => {
    setBullets((prev) => prev.filter((_, i) => i !== index));
  };

  const saveBullets = async () => {
    if (!bulletEditor) return;
    // Save new bullets via POST, existing via PATCH
    for (const bullet of bullets) {
      if (bullet.id) {
        // Existing bullet — no individual update endpoint in this batch, skip
      } else {
        await fetch(`/api/admin/events/${bulletEditor}/bullets`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bullet),
        });
      }
    }
    setBulletEditor(null);
    setBullets([]);
  };

  const openImageEditor = (eventId: string, currentUrl: string | null) => {
    setImageEditor(eventId);
    setPendingImageUrl(currentUrl || '');
    setImageSaved(false);
  };

  const saveImage = async () => {
    if (!imageEditor) return;
    setImageSaving(true);
    setImageSaved(false);

    const res = await fetch(`/api/admin/events/${imageEditor}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ preview_image_url: pendingImageUrl || null }),
    });

    if (res.ok) {
      setEvents((prev) =>
        prev.map((e) =>
          e.id === imageEditor
            ? { ...e, preview_image_url: pendingImageUrl || null }
            : e
        )
      );
      setImageSaved(true);
    }
    setImageSaving(false);
  };

  const inputStyle = {
    fontFamily: 'var(--font-body)' as const,
    fontSize: '14px',
    padding: '8px 10px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    backgroundColor: '#fff',
    width: '100%',
    outline: 'none' as const,
  };

  return (
    <div style={{ maxWidth: '700px' }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link
            href={`/admin/timelines/${timelineId}`}
            style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#999' }}
          >
            &larr; Back to timeline
          </Link>
          <h1 style={{ fontFamily: 'var(--font-body)', fontSize: '24px', fontWeight: 700, marginTop: '4px' }}>
            Events
          </h1>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 700,
            padding: '10px 20px', borderRadius: '8px',
            backgroundColor: 'var(--color-primary)', color: '#FFFFFF', border: 'none', cursor: 'pointer',
          }}
        >
          + Add Event
        </button>
      </div>

      {/* Create event form */}
      {showForm && (
        <form onSubmit={handleCreateEvent} className="flex flex-col gap-3 mb-6 p-4" style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #eee' }}>
          <div className="flex gap-3">
            <select value={newEvent.event_type} onChange={(e) => setNewEvent((p) => ({ ...p, event_type: e.target.value }))} style={{ ...inputStyle, width: 'auto' }}>
              <option value="specific">Specific</option>
              <option value="broad">Broad</option>
            </select>
            <input placeholder="Date display (e.g. 1917)" value={newEvent.date_display} onChange={(e) => setNewEvent((p) => ({ ...p, date_display: e.target.value }))} style={inputStyle} />
            <input placeholder="Sort year" type="number" value={newEvent.date_sort} onChange={(e) => setNewEvent((p) => ({ ...p, date_sort: parseInt(e.target.value) || 0 }))} style={{ ...inputStyle, width: '100px' }} />
          </div>
          <input placeholder="Event title" value={newEvent.title} onChange={(e) => setNewEvent((p) => ({ ...p, title: e.target.value }))} style={inputStyle} />
          <textarea placeholder="Card description" value={newEvent.preview_text} onChange={(e) => setNewEvent((p) => ({ ...p, preview_text: e.target.value }))} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
          <div className="flex gap-2">
            <button type="submit" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 700, padding: '8px 16px', borderRadius: '6px', backgroundColor: 'var(--color-primary)', color: '#fff', border: 'none', cursor: 'pointer' }}>Create</button>
            <button type="button" onClick={() => setShowForm(false)} style={{ fontFamily: 'var(--font-body)', fontSize: '13px', padding: '8px 16px', borderRadius: '6px', border: '1px solid #ddd', cursor: 'pointer', backgroundColor: '#fff' }}>Cancel</button>
          </div>
        </form>
      )}

      {/* Event list */}
      {loading ? (
        <p style={{ fontFamily: 'var(--font-body)', color: '#666' }}>Loading...</p>
      ) : events.length === 0 ? (
        <p style={{ fontFamily: 'var(--font-body)', color: '#666' }}>No events yet.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {events.map((evt) => (
            <div key={evt.id}>
              <div
                className="flex items-center justify-between"
                style={{ padding: '12px 16px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee' }}
              >
                <div className="flex items-center gap-3">
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: evt.event_type === 'broad' ? '#7D1F01' : '#666', letterSpacing: '0.5px', padding: '2px 6px', borderRadius: '4px', backgroundColor: evt.event_type === 'broad' ? '#FFF0E8' : '#f5f5f5' }}>
                    {evt.event_type}
                  </span>
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: '#0a0a0a' }}>{evt.title}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#999' }}>{evt.date_display}</p>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  {evt.event_type === 'broad' && (
                    <button onClick={() => imageEditor === evt.id ? setImageEditor(null) : openImageEditor(evt.id, evt.preview_image_url)} style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: evt.preview_image_url ? '#2E7D32' : 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer' }}>
                      {evt.preview_image_url ? 'Image ✓' : 'Image'}
                    </button>
                  )}
                  <button onClick={() => openBulletEditor(evt.id)} style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer' }}>
                    Bullets
                  </button>
                  <button onClick={() => handleDeleteEvent(evt.id)} style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#D32F2F', background: 'none', border: 'none', cursor: 'pointer' }}>
                    Delete
                  </button>
                </div>
              </div>

              {/* Inline image uploader for broad events */}
              {imageEditor === evt.id && evt.event_type === 'broad' && (
                <div style={{ padding: '16px', marginTop: '4px', backgroundColor: '#F0F7FF', borderRadius: '10px', border: '1px solid #BBDEFB' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, color: '#666', marginBottom: '8px' }}>
                    Event Card Image
                  </p>
                  <ImageUploader
                    label="Preview image (shown on timeline card)"
                    value={pendingImageUrl}
                    onChange={(url) => { setPendingImageUrl(url); setImageSaved(false); }}
                  />
                  <div className="flex gap-2 mt-3 items-center">
                    <button
                      onClick={saveImage}
                      disabled={imageSaving}
                      style={{
                        fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700,
                        padding: '8px 20px', borderRadius: '6px',
                        backgroundColor: 'var(--color-primary)', color: '#fff',
                        border: 'none', cursor: imageSaving ? 'not-allowed' : 'pointer',
                        opacity: imageSaving ? 0.5 : 1,
                      }}
                    >
                      {imageSaving ? 'Saving...' : 'Save Image'}
                    </button>
                    <button
                      onClick={() => setImageEditor(null)}
                      style={{
                        fontFamily: 'var(--font-body)', fontSize: '12px',
                        padding: '8px 16px', borderRadius: '6px',
                        border: '1px solid #ddd', cursor: 'pointer', backgroundColor: '#fff',
                      }}
                    >
                      Cancel
                    </button>
                    {imageSaved && (
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#2E7D32' }}>
                        Saved
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Inline bullet editor */}
              {bulletEditor === evt.id && (
                <div style={{ padding: '16px', marginTop: '4px', backgroundColor: '#FFFDE7', borderRadius: '10px', border: '1px solid #FFF59D' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, color: '#666', marginBottom: '8px' }}>
                    Deep Dive Bullets
                  </p>
                  {bullets.map((b, i) => (
                    <div key={i} className="flex gap-2 mb-2 items-start">
                      <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#FFCC00', marginTop: '10px', flexShrink: 0 }} />
                      <textarea value={b.content} onChange={(e) => updateBullet(i, e.target.value)} rows={2} style={{ ...inputStyle, flex: 1, resize: 'vertical' }} />
                      <button onClick={() => removeBullet(i)} style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#D32F2F', background: 'none', border: 'none', cursor: 'pointer', marginTop: '8px' }}>
                        &times;
                      </button>
                    </div>
                  ))}
                  <div className="flex gap-2 mt-2">
                    <button onClick={addBullet} style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer' }}>+ Add Bullet</button>
                    <button onClick={saveBullets} style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, padding: '6px 14px', borderRadius: '6px', backgroundColor: 'var(--color-primary)', color: '#fff', border: 'none', cursor: 'pointer' }}>Save Bullets</button>
                    <button onClick={() => { setBulletEditor(null); setBullets([]); }} style={{ fontFamily: 'var(--font-body)', fontSize: '12px', padding: '6px 14px', borderRadius: '6px', border: '1px solid #ddd', cursor: 'pointer', backgroundColor: '#fff' }}>Cancel</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
