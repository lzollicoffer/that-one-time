'use client';

export interface FilterPillProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

/**
 * Filter Pill — That One Time
 * Design System §5.3:
 *
 * - Default: white bg, black text, subtle border
 * - Selected: yellow (#FFCC00) bg, black text, no border
 * - Shape: border-radius 44px (fully rounded)
 * - Padding: 15.5px horizontal, 5.2px vertical
 * - Label: Manrope Bold, 13px, uppercase, tracking +1.3px
 * - Active pill shows × to clear
 * - Only one active at a time
 */
export function FilterPill({ label, active = false, onClick }: FilterPillProps) {
  return (
    <button
      onClick={onClick}
      className="whitespace-nowrap flex items-center gap-1 transition-colors"
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '13px',
        fontWeight: 700,
        letterSpacing: '1.3px',
        textTransform: 'uppercase',
        lineHeight: '19.5px',
        borderRadius: 'var(--radius-pill)',
        padding: '5.2px 15.5px',
        backgroundColor: active
          ? 'var(--color-accent-yellow)'
          : 'var(--color-surface)',
        color: 'var(--color-text-primary)',
        border: active ? 'none' : '1px solid rgba(0,0,0,0.1)',
      }}
    >
      {label}
      {active && (
        <span style={{ fontSize: '15px', lineHeight: '1' }}>×</span>
      )}
    </button>
  );
}
