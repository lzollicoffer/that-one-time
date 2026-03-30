'use client';

import { useEffect } from 'react';
import { NavBar } from '@/components/ui/nav-bar';
import { useAuthStore } from '@/stores/auth-store';
import { useBookmarkStore } from '@/stores/bookmark-store';

/**
 * Bookmarks Page — That One Time
 * Displays user's bookmarked timelines and events.
 */

export default function BookmarksPage() {
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  const { bookmarkedTimelines, bookmarkedEvents, fetchBookmarks } =
    useBookmarkStore();

  useEffect(() => {
    if (user) {
      fetchBookmarks();
    }
  }, [user, fetchBookmarks]);

  if (loading) {
    return (
      <div
        className="min-h-screen"
        style={{ backgroundColor: 'var(--color-background)' }}
      >
        <NavBar />
        <main
          className="flex items-center justify-center"
          style={{ padding: '80px 30px' }}
        >
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
            Sign in to view bookmarks
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

  const timelineCount = bookmarkedTimelines.size;
  const eventCount = bookmarkedEvents.size;
  const isEmpty = timelineCount === 0 && eventCount === 0;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <NavBar />
      <main style={{ padding: '32px 30px' }}>
        <h1
          className="mb-6"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
          }}
        >
          My Bookmarks
        </h1>

        {isEmpty ? (
          <div className="text-center" style={{ padding: '48px 0' }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                color: 'var(--color-text-body)',
                lineHeight: '28px',
              }}
            >
              You haven&apos;t bookmarked anything yet. Browse timelines and tap
              the bookmark icon to save content here.
            </p>
            <a
              href="/browse"
              className="inline-flex items-center justify-center mt-6 transition-opacity active:opacity-70"
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
              }}
            >
              Browse Timelines
            </a>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* Summary counts */}
            <div
              className="flex gap-4"
              style={{ marginBottom: '8px' }}
            >
              <div
                className="flex-1 text-center"
                style={{
                  padding: '16px',
                  borderRadius: '16px',
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-card-border)',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-date)',
                    fontSize: '28px',
                    fontWeight: 600,
                    color: 'var(--color-primary)',
                  }}
                >
                  {timelineCount}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-body)',
                    marginTop: '4px',
                  }}
                >
                  Timelines
                </p>
              </div>
              <div
                className="flex-1 text-center"
                style={{
                  padding: '16px',
                  borderRadius: '16px',
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-card-border)',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-date)',
                    fontSize: '28px',
                    fontWeight: 600,
                    color: 'var(--color-primary)',
                  }}
                >
                  {eventCount}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-body)',
                    marginTop: '4px',
                  }}
                >
                  Events
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
