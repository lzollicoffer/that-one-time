'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Bulk Import Entities — Admin CMS
 * Story 3.4: CSV import for books, podcasts, or movies.
 */

interface ParsedRow {
  title: string;
  creator_name: string;
  description: string;
  link: string;
}

export default function ImportEntitiesPage() {
  const router = useRouter();
  const [entityType, setEntityType] = useState('book');
  const [csvText, setCsvText] = useState('');
  const [parsed, setParsed] = useState<ParsedRow[]>([]);
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleParse = () => {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) {
      setError('CSV must have a header row and at least one data row.');
      return;
    }

    const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
    const titleIdx = headers.indexOf('title');
    const creatorIdx = headers.findIndex((h) => ['author', 'host', 'director', 'creator'].includes(h));
    const descIdx = headers.indexOf('description');
    const linkIdx = headers.indexOf('link');

    if (titleIdx === -1) {
      setError('CSV must have a "title" column.');
      return;
    }

    const rows: ParsedRow[] = [];
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',').map((c) => c.trim());
      rows.push({
        title: cols[titleIdx] || '',
        creator_name: creatorIdx >= 0 ? cols[creatorIdx] || '' : '',
        description: descIdx >= 0 ? cols[descIdx] || '' : '',
        link: linkIdx >= 0 ? cols[linkIdx] || '' : '',
      });
    }

    setParsed(rows);
    setError(null);
  };

  const handleImport = async () => {
    setImporting(true);
    setError(null);

    for (const row of parsed) {
      await fetch('/api/admin/entities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entity_type: entityType,
          title: row.title,
          creator_name: row.creator_name,
          description: row.description,
          external_links: row.link
            ? [{ platform: 'Link', url: row.link }]
            : [],
        }),
      });
    }

    router.push('/admin/entities');
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

  return (
    <div style={{ maxWidth: '700px' }}>
      <h1 style={{ fontFamily: 'var(--font-body)', fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>
        Bulk Import Entities
      </h1>

      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#666' }}>Entity Type</span>
          <select value={entityType} onChange={(e) => setEntityType(e.target.value)} style={inputStyle}>
            <option value="book">Books</option>
            <option value="podcast">Podcasts</option>
            <option value="movie">Movies</option>
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: '#666' }}>
            Paste CSV (columns: title, author/host/director, description, link)
          </span>
          <textarea
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            rows={8}
            placeholder={'title,author,description,link\nThe 100 Years War,Rashid Khalidi,A landmark history...,https://...'}
            style={{ ...inputStyle, fontFamily: 'monospace', fontSize: '12px', resize: 'vertical' }}
          />
        </label>

        <button
          onClick={handleParse}
          style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 700, padding: '10px 20px', borderRadius: '8px', border: '1px solid #ddd', backgroundColor: '#fff', cursor: 'pointer', alignSelf: 'flex-start' }}
        >
          Preview
        </button>

        {error && <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#D32F2F' }}>{error}</p>}

        {parsed.length > 0 && (
          <>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #eee' }}>
                    <th style={{ textAlign: 'left', padding: '8px', color: '#666' }}>Title</th>
                    <th style={{ textAlign: 'left', padding: '8px', color: '#666' }}>Creator</th>
                    <th style={{ textAlign: 'left', padding: '8px', color: '#666' }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {parsed.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '8px' }}>{row.title}</td>
                      <td style={{ padding: '8px' }}>{row.creator_name}</td>
                      <td style={{ padding: '8px', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#666' }}>
              {parsed.length} items will be imported as {entityType}s.
            </p>

            <button
              onClick={handleImport}
              disabled={importing}
              style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 700, padding: '10px 24px', borderRadius: '8px', backgroundColor: 'var(--color-primary)', color: '#fff', border: 'none', cursor: 'pointer', opacity: importing ? 0.5 : 1, alignSelf: 'flex-start' }}
            >
              {importing ? 'Importing...' : `Import ${parsed.length} Items`}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
