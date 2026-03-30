'use client';

/**
 * GuestPrompt — That One Time
 * "Sign up to save" prompt shown to unauthenticated users
 * when they try to bookmark content.
 */

interface GuestPromptProps {
  onSignUp: () => void;
  message?: string;
}

export function GuestPrompt({
  onSignUp,
  message = 'Sign up to save your bookmarks',
}: GuestPromptProps) {
  return (
    <div
      className="flex items-center justify-between"
      style={{
        padding: '12px 16px',
        borderRadius: '16px',
        backgroundColor: 'var(--color-background)',
        border: '1px solid var(--color-card-border)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          fontWeight: 400,
          color: 'var(--color-text-body)',
        }}
      >
        {message}
      </p>
      <button
        onClick={onSignUp}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          padding: '8px 16px',
          borderRadius: 'var(--radius-pill)',
          backgroundColor: 'var(--color-primary)',
          color: '#FFFFFF',
          border: 'none',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}
      >
        Sign Up
      </button>
    </div>
  );
}
