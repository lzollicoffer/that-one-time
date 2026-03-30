'use client';

/**
 * Bottom Action Bar — That One Time
 * Design System §5.11:
 *
 * Sticky bar at bottom of all bottom sheets.
 * Left: "CLOSE READER" text button
 * Right: "EXPLORE THIS ERA" filled pill button
 */

interface BottomActionBarProps {
  onClose: () => void;
}

export function BottomActionBar({ onClose }: BottomActionBarProps) {
  return (
    <div
      className="sticky bottom-0 left-0 right-0 flex items-center justify-center"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderTop: '1px solid var(--color-card-border)',
        padding: '16px 24px',
        height: '64px',
      }}
    >
      <button
        onClick={onClose}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          color: 'var(--color-text-primary)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Close Reader
      </button>
    </div>
  );
}
