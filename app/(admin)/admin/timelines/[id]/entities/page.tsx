'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

/**
 * Timeline Entities Page — Admin CMS
 * Story 3.1–3.6: Link/unlink books, podcasts, movies to a timeline.
 */

interface LinkedEntity {
  id: string;
  entity_id: string;
  context_line: string;
  sort_order: number;
  entities: {
    id: string;
    entity_type: string;
    title: string;
    creator_name: string;
  };
}

export default function TimelineEntitiesPage() {
  const params = useParams();
  const timelineId = params.id as string;

  const [linked, setLinked] = useState<LinkedEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLinker, setShowLinker] = useState(false);
  const [entityId, setEntityId] = useState('');
  const [contextLine, setContextLine] = useState('');

  useEffect(() => {
    fetchLinked();
  }, [timelineId]);

  const fetchLinked = () => {
    fetch(`/api/admin/timelines/${timelineId}/entities`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        setLinked(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleLink = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/admin/timelines/${timelineId}/entities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        entity_id: entityId,
        context_line: contextLine,
        sort_order: linked.length,
      }),
    });
    setEntityId('');
    setContextLine('');
    setShowLinker(false);
    fetchLinked();
  };

  const handleUnlink = async (entityLinkId: string) => {
    if (!confirm('Unlink this entity from the timeline?')) return;
    await fetch(
      `/api/admin/timelines/${timelineId}/entities?entityId=${entityLinkId}`,
      { method: 'DELETE' }
    );
    fetchLinked();
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

  const typeColors: Record<string, string> = {
    book: '#1565C0',
    podcast: '#6A1B9A',
    movie: '#E65100',
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
            Linked Entities
          </h1>
        </div>
        <button
          onClick={() => setShowLinker(!showLinker)}
          style={{
            fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 700,
            padding: '10px 20px', borderRadius: '8px',
            backgroundColor: 'var(--color-primary)', color: '#FFFFFF', border: 'none', cursor: 'pointer',
          }}
        >
          + Link Entity
        </button>
      </div>

      {showLinker && (
        <form onSubmit={handleLink} className="flex flex-col gap-3 mb-6 p-4" style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #eee' }}>
          <input placeholder="Entity ID (from entity library)" value={entityId} onChange={(e) => setEntityId(e.target.value)} style={inputStyle} required />
          <input placeholder="Why this matters here (context line)" value={contextLine} onChange={(e) => setContextLine(e.target.value)} style={inputStyle} required />
          <div className="flex gap-2">
            <button type="submit" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 700, padding: '8px 16px', borderRadius: '6px', backgroundColor: 'var(--color-primary)', color: '#fff', border: 'none', cursor: 'pointer' }}>Link</button>
            <button type="button" onClick={() => setShowLinker(false)} style={{ fontFamily: 'var(--font-body)', fontSize: '13px', padding: '8px 16px', borderRadius: '6px', border: '1px solid #ddd', cursor: 'pointer', backgroundColor: '#fff' }}>Cancel</button>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#999' }}>
            Tip: Find the entity ID from the <Link href="/admin/entities" style={{ color: 'var(--color-primary)' }}>entity library</Link>.
          </p>
        </form>
      )}

      {loading ? (
        <p style={{ fontFamily: 'var(--font-body)', color: '#666' }}>Loading...</p>
      ) : linked.length === 0 ? (
        <p style={{ fontFamily: 'var(--font-body)', color: '#666' }}>No entities linked to this timeline yet.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {linked.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between"
              style={{ padding: '12px 16px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee' }}
            >
              <div className="flex items-center gap-3">
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.5px',
                  color: typeColors[item.entities?.entity_type] || '#666',
                  padding: '2px 6px', borderRadius: '4px',
                  backgroundColor: '#f5f5f5',
                }}>
                  {item.entities?.entity_type}
                </span>
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600 }}>
                    {item.entities?.title}
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#999' }}>
                    {item.entities?.creator_name} &middot; {item.context_line}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleUnlink(item.id)}
                style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#D32F2F', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Unlink
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
