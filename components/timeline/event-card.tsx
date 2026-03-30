'use client';

import { TimelineEvent } from '@/types/timeline';

/**
 * Event Card — That One Time
 * Design System §5.8:
 *
 * Two variants:
 * - Broad: date range right-aligned, image (desaturated), body text, expand CTA
 * - Specific: single date left-aligned, no image, body text, expand CTA
 *
 * Both share: white card, border-radius 48px, "EXPAND DETAILS →" CTA
 */

interface EventCardProps {
  event: TimelineEvent;
  onExpand: (event: TimelineEvent) => void;
}

export function EventCard({ event, onExpand }: EventCardProps) {
  const isBroad = event.eventType === 'broad';

  return (
    <div className="flex flex-col" style={{ gap: '8px' }}>
      {/* Date label */}
      <p
        style={{
          fontFamily: 'var(--font-date)',
          fontSize: isBroad ? '36px' : '24px',
          fontWeight: 600,
          fontStyle: 'italic',
          lineHeight: '40px',
          color: 'var(--color-text-primary)',
          textAlign: isBroad ? 'right' : 'left',
        }}
      >
        {event.date}
      </p>

      {/* Event title */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: isBroad ? '20px' : '16px',
          fontWeight: 400,
          lineHeight: '32px',
          color: 'var(--color-text-secondary)',
          textAlign: isBroad ? 'right' : 'left',
        }}
      >
        {event.title}
      </p>

      {/* Card body */}
      <div
        className="overflow-hidden"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-event-card)',
          padding: isBroad && event.imageUrl ? '24px 32px 40px' : '31px 32px 32px',
        }}
      >
        {/* Image — broad events only, desaturated */}
        {isBroad && event.imageUrl && (
          <div
            className="relative w-full overflow-hidden"
            style={{
              borderRadius: 'var(--radius-event-card-image)',
              height: '216px',
              marginBottom: '16px',
            }}
          >
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            {/* Desaturation overlay via mix-blend-mode */}
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: 'rgba(255,255,255,0.5)',
                mixBlendMode: 'saturation',
              }}
            />
          </div>
        )}

        {/* Card description text */}
        <p
          className="text-center"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '22.75px',
            color: 'var(--color-text-body)',
            maxWidth: '260px',
            margin: '0 auto',
          }}
        >
          {event.cardDescription}
        </p>

        {/* Expand Details CTA — centered */}
        <div className="flex justify-center" style={{ marginTop: '16px' }}>
          <button
            onClick={() => onExpand(event)}
            className="flex items-center gap-1 transition-opacity active:opacity-70"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              lineHeight: '15px',
              color: 'var(--color-text-primary)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Expand Details
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
              <path
                d="M1 1L5 5L1 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
