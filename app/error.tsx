'use client';

/**
 * Global Error Boundary — That One Time
 * Catches runtime errors and shows a recovery UI.
 */

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
          fontSize: '32px',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          marginBottom: '8px',
        }}
      >
        Something went wrong
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '16px',
          fontWeight: 400,
          color: 'var(--color-text-body)',
          lineHeight: '28px',
          maxWidth: '325px',
          marginBottom: '24px',
        }}
      >
        We hit an unexpected error. Try refreshing the page.
      </p>
      <button
        onClick={reset}
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
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Try Again
      </button>
    </div>
  );
}
