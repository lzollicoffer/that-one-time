'use client';

import { useEffect, useState } from 'react';

/**
 * Admin Dashboard — That One Time
 * Story 5.1 — Content Dashboard
 *
 * Fetches aggregate stats from /api/admin/dashboard which queries
 * Supabase using the service role key (bypasses RLS):
 *   - timelinesByStatus: count of timelines grouped by status (draft/published/unlisted/archived)
 *   - totalEvents: total count across all events table rows
 *   - entitiesByType: count of entities grouped by entity_type (book/podcast/movie)
 *
 * These are simple COUNT queries against the existing tables.
 * No additional Supabase configuration needed beyond the env vars
 * already set in .env.local.
 */

interface DashboardStats {
  timelinesByStatus: Record<string, number>;
  totalEvents: number;
  entitiesByType: Record<string, number>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '24px',
          fontWeight: 700,
          marginBottom: '24px',
        }}
      >
        Dashboard
      </h1>

      {loading ? (
        <p style={{ fontFamily: 'var(--font-body)', color: '#666' }}>
          Loading stats...
        </p>
      ) : !stats ? (
        <p style={{ fontFamily: 'var(--font-body)', color: '#666' }}>
          Unable to load dashboard stats. Check the browser console for errors.
        </p>
      ) : (
        <>
          {/* Timeline stats */}
          <div className="mb-8">
            <h2
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: '#999',
                marginBottom: '12px',
              }}
            >
              Timelines
            </h2>
            <div className="flex gap-4 flex-wrap">
              {Object.entries(stats.timelinesByStatus).length > 0 ? (
                Object.entries(stats.timelinesByStatus).map(
                  ([status, count]) => (
                    <StatCard key={status} label={status} value={count} />
                  )
                )
              ) : (
                <StatCard label="Total" value={0} />
              )}
            </div>
          </div>

          {/* Events */}
          <div className="mb-8">
            <h2
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: '#999',
                marginBottom: '12px',
              }}
            >
              Events
            </h2>
            <StatCard label="Total" value={stats.totalEvents} />
          </div>

          {/* Entities */}
          <div className="mb-8">
            <h2
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: '#999',
                marginBottom: '12px',
              }}
            >
              Entities
            </h2>
            <div className="flex gap-4 flex-wrap">
              {Object.entries(stats.entitiesByType).length > 0 ? (
                Object.entries(stats.entitiesByType).map(([type, count]) => (
                  <StatCard key={type} label={type} value={count} />
                ))
              ) : (
                <StatCard label="Total" value={0} />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div
      style={{
        padding: '16px 24px',
        borderRadius: '12px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #eee',
        minWidth: '120px',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '28px',
          fontWeight: 700,
          color: '#0a0a0a',
        }}
      >
        {value}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          fontWeight: 500,
          color: '#999',
          textTransform: 'capitalize',
          marginTop: '4px',
        }}
      >
        {label}
      </p>
    </div>
  );
}
