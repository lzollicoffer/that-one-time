'use client';

/**
 * Entity Pill Bar — That One Time
 * Design System §5.6:
 *
 * Horizontal row of entity pills (BOOKS, PODCASTS, MOVIES).
 * Sticky below the hero. Active pill turns yellow.
 * Tapping opens entity bottom sheet (Sprint 3).
 */

interface EntityPillBarProps {
  activePill: string | null;
  onPillClick: (pill: string) => void;
}

const ENTITY_PILLS = ['Books', 'Podcasts', 'Movies'];

export function EntityPillBar({ activePill, onPillClick }: EntityPillBarProps) {
  return (
    <div
      className="sticky top-[64px] z-40 w-full flex justify-center"
      style={{
        backgroundColor: 'var(--color-background)',
        padding: '12px 24px',
        gap: '9px',
      }}
    >
      {ENTITY_PILLS.map((pill) => {
        const isActive = activePill === pill;
        return (
          <button
            key={pill}
            onClick={() => onPillClick(pill)}
            className="whitespace-nowrap transition-colors"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '1.3px',
              textTransform: 'uppercase',
              lineHeight: '19.5px',
              borderRadius: 'var(--radius-pill)',
              padding: '5.2px 15.5px',
              backgroundColor: isActive
                ? 'var(--color-accent-yellow)'
                : 'var(--color-surface)',
              color: 'var(--color-text-primary)',
              border: isActive ? 'none' : '1px solid rgba(0,0,0,0.1)',
            }}
          >
            {pill}
          </button>
        );
      })}
    </div>
  );
}
