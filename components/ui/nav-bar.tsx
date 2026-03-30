'use client';

/**
 * NavBar — That One Time
 * Frosted glass sticky nav bar with hamburger + app wordmark.
 *
 * Design System §5.1:
 * - backdrop-blur: 12px, white bg, subtle shadow
 * - Hamburger icon (18×12px) + "That One Time" in Philosopher Bold 25px
 * - Height: ~64px (16px vertical padding × 2 + content)
 * - Fixed/sticky at top
 */

export function NavBar() {
  return (
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

        {/* App wordmark — Philosopher Bold 25px */}
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '25px',
            fontWeight: 700,
            letterSpacing: '-0.85px',
            color: 'var(--color-text-primary)',
          }}
        >
          That One Time
        </span>
      </div>
    </header>
  );
}
