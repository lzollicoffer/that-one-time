'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

/**
 * Entity Library — Admin CMS
 * Story 3.7: Global searchable entity list.
 */

interface LinkedTimeline {
  id: string;
  title: string;
}

interface AdminEntity {
  id: string;
  entity_type: string;
  title: string;
  creator_name: string;
  created_at: string;
  linked_timelines?: LinkedTimeline[];
}

export default function EntityLibraryPage() {
  const [entities, setEntities] = useState<AdminEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    const url = typeFilter
      ? `/api/admin/entities?entity_type=${typeFilter}`
      : '/api/admin/entities';
    fetch(url)
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        setEntities(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [typeFilter]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this entity? It will be removed from all timelines.')) return;
    await fetch(`/api/admin/entities/${id}`, { method: 'DELETE' });
    setEntities((prev) => prev.filter((e) => e.id !== id));
  };

  const typeColors: Record<string, string> = {
    book: '#1565C0',
    podcast: '#6A1B9A',
    movie: '#E65100',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 style={{ fontFamily: 'var(--font-body)', fontSize: '24px', fontWeight: 700 }}>
          Entity Library
        </h1>
        <div className="flex gap-2">
          <Link
            href="/admin/entities/new"
            style={{
              fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 700,
              padding: '10px 20px', borderRadius: '8px',
              backgroundColor: 'var(--color-primary)', color: '#FFFFFF',
            }}
          >
            + New Entity
          </Link>
        </div>
      </div>

      {/* Type filter */}
      <div className="flex gap-2 mb-4">
        {['', 'book', 'podcast', 'movie'].map((t) => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            style={{
              fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: typeFilter === t ? 700 : 400,
              padding: '6px 14px', borderRadius: '6px',
              backgroundColor: typeFilter === t ? '#eee' : '#fff',
              border: '1px solid #ddd', cursor: 'pointer',
            }}
          >
            {t || 'All'}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ fontFamily: 'var(--font-body)', color: '#666' }}>Loading...</p>
      ) : entities.length === 0 ? (
        <p style={{ fontFamily: 'var(--font-body)', color: '#666' }}>No entities found.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {entities.map((entity) => (
            <div
              key={entity.id}
              className="flex items-center justify-between"
              style={{ padding: '12px 16px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee' }}
            >
              <div className="flex items-center gap-3">
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.5px',
                  color: typeColors[entity.entity_type] || '#666',
                  padding: '2px 6px', borderRadius: '4px', backgroundColor: '#f5f5f5',
                }}>
                  {entity.entity_type}
                </span>
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600 }}>{entity.title}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#999' }}>
                      {entity.creator_name}
                    </span>
                    {entity.linked_timelines && entity.linked_timelines.length > 0 ? (
                      entity.linked_timelines.map((tl) => (
                        <span
                          key={tl.id}
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '10px',
                            fontWeight: 600,
                            color: '#FFFFFF',
                            backgroundColor: '#666',
                            padding: '2px 8px',
                            borderRadius: '10px',
                          }}
                        >
                          {tl.title}
                        </span>
                      ))
                    ) : (
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '10px',
                          fontWeight: 600,
                          color: '#999',
                          backgroundColor: '#f0f0f0',
                          padding: '2px 8px',
                          borderRadius: '10px',
                        }}
                      >
                        Unlinked
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/entities/${entity.id}`} style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: 'var(--color-primary)' }}>
                  Edit
                </Link>
                <button onClick={() => handleDelete(entity.id)} style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#D32F2F', background: 'none', border: 'none', cursor: 'pointer' }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
