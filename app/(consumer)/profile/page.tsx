'use client';

import { useRouter } from 'next/navigation';
import { NavBar } from '@/components/ui/nav-bar';
import { useAuthStore } from '@/stores/auth-store';

/**
 * Profile Page — That One Time
 * Displays user info with links to bookmarks and sign out.
 */

export default function ProfilePage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  const signOut = useAuthStore((s) => s.signOut);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div
        className="min-h-screen"
        style={{ backgroundColor: 'var(--color-background)' }}
      >
        <NavBar />
        <main className="flex items-center justify-center" style={{ padding: '80px 30px' }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              color: 'var(--color-text-body)',
            }}
          >
            Loading...
          </p>
        </main>
      </div>
    );
  }

  if (!user) {
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
            className="mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '28px',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
            }}
          >
            Sign in to view your profile
          </h1>
          <a
            href="/auth/login"
            className="inline-flex items-center justify-center transition-opacity active:opacity-70"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              padding: '14px 32px',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: 'var(--color-primary)',
              color: '#FFFFFF',
              marginTop: '16px',
            }}
          >
            Sign In
          </a>
        </main>
      </div>
    );
  }

  const displayName =
    user.user_metadata?.display_name || user.email?.split('@')[0] || 'User';

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <NavBar />
      <main style={{ padding: '32px 30px' }}>
        {/* User info */}
        <div
          className="flex flex-col items-center text-center mb-8"
          style={{ padding: '24px' }}
        >
          {/* Avatar placeholder */}
          <div
            className="flex items-center justify-center mb-4"
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '28px',
                fontWeight: 700,
                color: '#FFFFFF',
              }}
            >
              {displayName.charAt(0).toUpperCase()}
            </span>
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
            }}
          >
            {displayName}
          </h1>
          <p
            className="mt-1"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--color-text-body)',
            }}
          >
            {user.email}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3" style={{ maxWidth: '335px', margin: '0 auto' }}>
          <a
            href="/profile/bookmarks"
            className="flex items-center justify-between transition-opacity active:opacity-70"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              fontWeight: 400,
              padding: '16px 20px',
              borderRadius: '16px',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-card-border)',
              color: 'var(--color-text-primary)',
            }}
          >
            My Bookmarks
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
              <path
                d="M1 1L7 7L1 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          <button
            onClick={handleSignOut}
            className="flex items-center justify-center transition-opacity active:opacity-70"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              padding: '14px',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: 'transparent',
              border: '1px solid rgba(0,0,0,0.1)',
              color: 'var(--color-text-primary)',
              cursor: 'pointer',
              marginTop: '8px',
            }}
          >
            Sign Out
          </button>
        </div>
      </main>
    </div>
  );
}
