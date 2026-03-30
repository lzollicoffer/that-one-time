import { NavBar } from '@/components/ui/nav-bar';

/**
 * About Page — placeholder.
 */

export default function AboutPage() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <NavBar />
      <main
        className="flex flex-col items-center text-center"
        style={{ padding: '80px 30px' }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '32px',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            marginBottom: '16px',
          }}
        >
          About
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            fontWeight: 300,
            lineHeight: '28px',
            color: 'var(--color-text-body)',
            maxWidth: '325px',
          }}
        >
          That One Time is an evolving collection of big and small moments.
          We curate historical timelines so you can explore events in depth
          and discover related books, podcasts, and movies.
        </p>
      </main>
    </div>
  );
}
