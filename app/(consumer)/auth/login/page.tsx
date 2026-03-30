'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NavBar } from '@/components/ui/nav-bar';
import { createClient } from '@/lib/supabase/client';

/**
 * Login Page — That One Time
 * Email + password sign in with Google OAuth option.
 */

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    if (!supabase) {
      setError('Authentication is not configured.');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/browse');
    }
  };

  const handleOAuth = async () => {
    const supabase = createClient();
    if (!supabase) return;
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <NavBar />
      <main
        className="flex flex-col items-center"
        style={{ padding: '48px 30px' }}
      >
        <h1
          className="mb-8"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '32px',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
          }}
        >
          Sign In
        </h1>

        <div className="w-full" style={{ maxWidth: '335px' }}>
          {/* Google OAuth */}
          <button
            onClick={handleOAuth}
            className="w-full flex items-center justify-center gap-2 mb-6 transition-opacity active:opacity-70"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 700,
              padding: '14px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid rgba(0,0,0,0.1)',
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text-primary)',
              cursor: 'pointer',
            }}
          >
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="flex-1"
              style={{ height: '1px', backgroundColor: 'rgba(0,0,0,0.1)' }}
            />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: 'var(--color-text-body)',
              }}
            >
              or
            </span>
            <div
              className="flex-1"
              style={{ height: '1px', backgroundColor: 'rgba(0,0,0,0.1)' }}
            />
          </div>

          {/* Email form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full outline-none"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                padding: '14px 16px',
                borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.1)',
                backgroundColor: 'var(--color-surface)',
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full outline-none"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                padding: '14px 16px',
                borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.1)',
                backgroundColor: 'var(--color-surface)',
              }}
            />

            {error && (
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: '#D32F2F',
                  textAlign: 'center',
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 transition-opacity active:opacity-70 disabled:opacity-50"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                padding: '14px',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: 'var(--color-primary)',
                color: '#FFFFFF',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? '...' : 'Sign In'}
            </button>
          </form>

          <p
            className="text-center mt-6"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'var(--color-text-body)',
            }}
          >
            Don&apos;t have an account?{' '}
            <a
              href="/auth/signup"
              style={{
                fontWeight: 700,
                color: 'var(--color-primary)',
                textDecoration: 'underline',
              }}
            >
              Sign up
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
