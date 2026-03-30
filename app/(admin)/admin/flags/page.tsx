'use client';

import { useEffect, useState } from 'react';

/**
 * Flag Review Queue — Admin CMS
 * Story 5.1: Review flagged content.
 */

interface ContentFlag {
  id: string;
  flagged_type: string;
  flag_type: string;
  note: string;
  status: string;
  created_at: string;
}

export default function FlagsPage() {
  const [flags, setFlags] = useState<ContentFlag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Flags API not yet connected — placeholder
    setLoading(false);
  }, []);

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-body)', fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>
        Content Flags
      </h1>

      {loading ? (
        <p style={{ fontFamily: 'var(--font-body)', color: '#666' }}>Loading...</p>
      ) : flags.length === 0 ? (
        <div style={{ padding: '48px 0', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#999' }}>
            No flags to review.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#ccc', marginTop: '8px' }}>
            Flags will appear here when users report content issues.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {flags.map((flag) => (
            <div
              key={flag.id}
              style={{ padding: '16px', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #eee' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#E65100', padding: '2px 6px', borderRadius: '4px', backgroundColor: '#FFF3E0' }}>
                  {flag.flag_type}
                </span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#999', textTransform: 'uppercase' }}>
                  {flag.flagged_type}
                </span>
              </div>
              {flag.note && (
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#333' }}>{flag.note}</p>
              )}
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#999', marginTop: '8px' }}>
                {new Date(flag.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
