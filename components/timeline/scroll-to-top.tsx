'use client';

import { useState, useEffect } from 'react';

/**
 * Scroll-to-Top Button — That One Time
 * Design System §5.7:
 *
 * 48px circular button, #E8E8E6 background.
 * Positioned bottom-right, appears after scrolling down.
 */

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed z-50 flex items-center justify-center transition-opacity"
      style={{
        bottom: '30px',
        right: '30px',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: 'var(--color-node)',
        border: 'none',
      }}
      aria-label="Scroll to top"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M8 13V3M8 3L3 8M8 3L13 8"
          stroke="var(--color-text-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
