'use client';

import { useEffect, useState } from 'react';

/**
 * Admin Dashboard — That One Time
 * Story 5.1 — Content Dashboard
 *
 * Shows: total timelines by status, total events, total entities by type,
 * quick links to create timeline or manage entities.
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
          Connect Supabase to view dashboard stats. Configure
          NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in
          .env.local.
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
              {Object.entries(stats.timelinesByStatus).map(
                ([status, count]) => (
                  <StatCard key={status} label={status} value={count} />
                )
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
              {Object.entries(stats.entitiesByType).map(([type, count]) => (
                <StatCard key={type} label={type} value={count} />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Quick links */}
      <div className="flex gap-3 mt-8">
        <a
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
        </a>
        <a
          href="/admin/entities"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: 500,
            padding: '10px 20px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            color: '#333',
          }}
        >
          Manage Entities
        </a>
      </div>
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
