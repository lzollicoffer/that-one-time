'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * NavBar — That One Time
 * Frosted glass sticky nav bar with hamburger + app wordmark.
 * Hamburger opens a slide-out drawer from the left.
 *
 * Design System §5.1:
 * - backdrop-blur: 12px, white bg, subtle shadow
 * - Hamburger icon (18×12px) + "That One Time" in Philosopher Bold 25px
 * - Height: ~64px (16px vertical padding × 2 + content)
 * - Fixed/sticky at top
 */

const DRAWER_LINKS = [
  { label: 'Home', href: '/browse' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  return (
    <>
      <header
        className="sticky top-0 z-50 w-full"
        style={{
          backgroundColor: 'var(--color-nav-background)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: 'var(--shadow-nav-bar)',
        }}
      >
        <div
          className="flex items-center gap-3"
          style={{
            padding: '16px 24px',
          }}
        >
          {/* Hamburger icon — 18×12px */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex flex-col justify-between"
            style={{ width: '18px', height: '12px' }}
            aria-label="Open menu"
          >
            <span
              className="block w-full bg-black"
              style={{ height: '2px', borderRadius: '1px' }}
            />
            <span
              className="block w-full bg-black"
              style={{ height: '2px', borderRadius: '1px' }}
            />
            <span
              className="block w-full bg-black"
              style={{ height: '2px', borderRadius: '1px' }}
            />
          </button>

          {/* App wordmark — Philosopher Bold 25px, links to browse */}
          <Link
            href="/browse"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '25px',
              fontWeight: 700,
              letterSpacing: '-0.85px',
              color: 'var(--color-text-primary)',
            }}
          >
            That One Time
          </Link>
        </div>
      </header>

      {/* Drawer overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-[60]"
          style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Slide-out drawer */}
      <div
        className="fixed top-0 left-0 z-[70] flex flex-col"
        style={{
          width: '280px',
          height: '100vh',
          backgroundColor: '#FFFFFF',
          transform: drawerOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 250ms ease-in-out',
          boxShadow: drawerOpen
            ? '4px 0 24px rgba(0,0,0,0.1)'
            : 'none',
        }}
      >
        {/* Drawer header with close button */}
        <div
          className="flex items-center justify-between"
          style={{ padding: '16px 24px' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '22px',
              fontWeight: 700,
              letterSpacing: '-0.85px',
              color: 'var(--color-text-primary)',
            }}
          >
            That One Time
          </span>
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M15 5L5 15M5 5L15 15"
                stroke="var(--color-text-primary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            backgroundColor: 'rgba(0,0,0,0.06)',
            margin: '0 24px',
          }}
        />

        {/* Nav links */}
        <nav
          className="flex flex-col"
          style={{ padding: '16px 24px', gap: '4px' }}
        >
          {DRAWER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block transition-opacity active:opacity-70"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                fontWeight: pathname === link.href ? 700 : 400,
                color: 'var(--color-text-primary)',
                padding: '12px 0',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
