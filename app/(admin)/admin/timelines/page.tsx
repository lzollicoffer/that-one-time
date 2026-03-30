'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

/**
 * Admin Timeline List — manage all timelines.
 * Story 1.1–1.4: Create, edit, status management.
 */

interface AdminTimeline {
  id: string;
  title: string;
  slug: string;
  status: string;
  event_count: number;
  updated_at: string;
}

export default function AdminTimelinesPage() {
  const [timelines, setTimelines] = useState<AdminTimeline[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/timelines')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        setTimelines(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    await fetch(`/api/admin/timelines/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    setTimelines((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  const statusColors: Record<string, string> = {
    draft: '#FFA726',
    published: '#66BB6A',
    unlisted: '#42A5F5',
    archived: '#BDBDBD',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '24px',
            fontWeight: 700,
          }}
        >
          Timelines
        </h1>
        <Link
          href="/admin/timelines/new"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: 700,
            padding: '10px 20px',
            borderRadius: '8px',
            backgroundColor: 'var(--color-primary)',
            color: '#FFFFFF',
          }}
        >
          + New Timeline
        </Link>
      </div>

      {loading ? (
        <p style={{ fontFamily: 'var(--font-body)', color: '#666' }}>
          Loading...
        </p>
      ) : timelines.length === 0 ? (
        <p style={{ fontFamily: 'var(--font-body)', color: '#666' }}>
          No timelines yet. Create your first timeline to get started.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {timelines.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between"
              style={{
                padding: '16px 20px',
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #eee',
              }}
            >
              <div className="flex items-center gap-4">
                {/* Status dot */}
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: statusColors[t.status] || '#999',
                  }}
                />
                <div>
                  <Link
                    href={`/admin/timelines/${t.id}`}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#0a0a0a',
                    }}
                  >
                    {t.title}
                  </Link>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      color: '#999',
                      marginTop: '2px',
                    }}
                  >
                    {t.event_count} events &middot; /{t.slug}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={t.status}
                  onChange={(e) => handleStatusChange(t.id, e.target.value)}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    border: '1px solid #ddd',
                    backgroundColor: '#fff',
                  }}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="unlisted">Unlisted</option>
                  <option value="archived">Archived</option>
                </select>
                <Link
                  href={`/admin/timelines/${t.id}`}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    backgroundColor: 'var(--color-primary)',
                    padding: '6px 14px',
                    borderRadius: '6px',
                  }}
                >
                  Edit
                </Link>
                <Link
                  href={`/admin/timelines/${t.id}/events`}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: 'var(--color-primary)',
                  }}
                >
                  Events
                </Link>
                <Link
                  href={`/admin/timelines/${t.id}/entities`}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: 'var(--color-primary)',
                  }}
                >
                  Entities
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
