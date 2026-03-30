import Link from 'next/link';

/**
 * 404 Not Found Page — That One Time
 */

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center"
      style={{
        backgroundColor: 'var(--color-background)',
        padding: '30px',
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '48px',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          marginBottom: '8px',
        }}
      >
        404
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '20px',
          fontWeight: 300,
          color: 'var(--color-text-body)',
          lineHeight: '32px',
          maxWidth: '325px',
          marginBottom: '32px',
        }}
      >
        This moment in history hasn&apos;t been written yet.
      </p>
      <Link
        href="/browse"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '16px',
          fontWeight: 400,
          letterSpacing: '1.2px',
          textTransform: 'uppercase',
          backgroundColor: 'var(--color-primary)',
          color: '#FFFFFF',
          width: '335px',
          height: '51px',
          borderRadius: '87px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Explore Timelines
      </Link>
    </div>
  );
}
