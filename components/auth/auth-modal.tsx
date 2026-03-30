'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';

/**
 * AuthModal — That One Time
 * Sign in / sign up modal overlay.
 * Supports email + password and OAuth (Google).
 */

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'signup';
}

export function AuthModal({
  isOpen,
  onClose,
  defaultMode = 'login',
}: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    const supabase = createClient();
    if (!supabase) {
      setError('Authentication is not configured.');
      setLoading(false);
      return;
    }

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: displayName },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (error) throw error;
        setSuccessMessage('Check your email for a confirmation link.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        onClose();
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'An error occurred';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: 'google') => {
    const supabase = createClient();
    if (!supabase) return;
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) setError(error.message);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-[60]"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-x-4 z-[60] flex flex-col"
            style={{
              top: '50%',
              transform: 'translateY(-50%)',
              maxWidth: '390px',
              margin: '0 auto',
              backgroundColor: 'var(--color-surface)',
              borderRadius: '24px',
              padding: '32px 24px',
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Title */}
            <h2
              className="text-center mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '28px',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
              }}
            >
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>

            {/* OAuth button */}
            <button
              onClick={() => handleOAuth('google')}
              className="w-full flex items-center justify-center gap-2 mb-4 transition-opacity active:opacity-70"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 700,
                padding: '12px',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid rgba(0,0,0,0.1)',
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-text-primary)',
                cursor: 'pointer',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path
                  d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
                  fill="#4285F4"
                />
                <path
                  d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
                  fill="#34A853"
                />
                <path
                  d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                  fill="#FBBC05"
                />
                <path
                  d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
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
              {mode === 'signup' && (
                <input
                  type="text"
                  placeholder="Display name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                  className="w-full outline-none"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1px solid rgba(0,0,0,0.1)',
                    backgroundColor: 'var(--color-background)',
                  }}
                />
              )}

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
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid rgba(0,0,0,0.1)',
                  backgroundColor: 'var(--color-background)',
                }}
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full outline-none"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid rgba(0,0,0,0.1)',
                  backgroundColor: 'var(--color-background)',
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

              {successMessage && (
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: '#2E7D32',
                    textAlign: 'center',
                  }}
                >
                  {successMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full transition-opacity active:opacity-70 disabled:opacity-50"
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
                  marginTop: '4px',
                }}
              >
                {loading
                  ? '...'
                  : mode === 'login'
                    ? 'Sign In'
                    : 'Create Account'}
              </button>
            </form>

            {/* Toggle mode */}
            <p
              className="text-center mt-4"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'var(--color-text-body)',
              }}
            >
              {mode === 'login'
                ? "Don't have an account? "
                : 'Already have an account? '}
              <button
                onClick={() => {
                  setMode(mode === 'login' ? 'signup' : 'login');
                  setError(null);
                  setSuccessMessage(null);
                }}
                style={{
                  fontWeight: 700,
                  color: 'var(--color-primary)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
