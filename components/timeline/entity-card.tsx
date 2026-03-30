'use client';

import { TimelineEntity } from '@/types/timeline';

/**
 * Entity Card (List Item) — That One Time
 * Design System §5.10:
 *
 * Horizontal card: cover image left, text right.
 * Shared layout across Books, Podcasts, and Movies.
 *
 * - Card: white, border-radius 20px, 1px subtle border, padding 16px
 * - Cover image: 120px wide, border-radius 12px
 * - Title: Manrope Regular 16px, #1A1C1B
 * - Creator: Manrope Regular 14px, #58413F
 */

interface EntityCardProps {
  entity: TimelineEntity;
}

export function EntityCard({ entity }: EntityCardProps) {
  return (
    <div
      className="flex items-start"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-card-border)',
        borderRadius: 'var(--radius-entity-card)',
        padding: '16px',
        gap: '16px',
      }}
    >
      {/* Cover image */}
      <div
        className="shrink-0 overflow-hidden"
        style={{
          width: '120px',
          height: entity.entityType === 'podcast' ? '120px' : '150px',
          borderRadius: 'var(--radius-entity-card-image)',
          backgroundColor: '#e5e5e5',
        }}
      >
        <img
          src={entity.coverImageUrl}
          alt={entity.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text block */}
      <div className="flex flex-col justify-center min-h-[120px]">
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '22px',
            color: 'var(--color-text-secondary)',
          }}
        >
          {entity.title}
        </p>
        <p
          className="mt-1"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '20px',
            color: 'var(--color-text-body)',
          }}
        >
          {entity.creator}
        </p>
      </div>
    </div>
  );
}
