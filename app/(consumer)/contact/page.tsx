import { NavBar } from '@/components/ui/nav-bar';

/**
 * Contact Page — placeholder.
 */

export default function ContactPage() {
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
          Contact
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
          Have a question, suggestion, or want to contribute a timeline?
          We&apos;d love to hear from you. Reach out and we&apos;ll get back
          to you soon.
        </p>
      </main>
    </div>
  );
}
