'use client';

import { TimelineEvent } from '@/types/timeline';
import { EventCard } from './event-card';

/**
 * Timeline Event List with Spine — That One Time
 * Design System §5.7 + §5.8:
 *
 * Vertical spine (3px wide, divider color) at 23px from left.
 * Circular nodes (16px) at each event.
 * Event content offset 39px from spine.
 * 40px vertical gap between events.
 */

interface TimelineEventListProps {
  events: TimelineEvent[];
  onExpandEvent: (event: TimelineEvent) => void;
}

export function TimelineEventList({
  events,
  onExpandEvent,
}: TimelineEventListProps) {
  return (
    <div
      className="relative"
      style={{ padding: '24px 30px 80px' }}
    >
      {/* Vertical spine line */}
      <div
        className="absolute top-0 bottom-0"
        style={{
          left: '23px',
          width: '3px',
          backgroundColor: 'var(--color-divider)',
        }}
      />

      {/* Event nodes + cards */}
      <div className="flex flex-col" style={{ gap: '40px' }}>
        {events.map((event) => (
          <div key={event.id} className="relative flex items-start">
            {/* Node dot — centered on the 3px spine at left: 23px */}
            <div
              className="absolute shrink-0"
              style={{
                left: '-13.5px',
                top: '12px',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-divider)',
                zIndex: 1,
              }}
            />

            {/* Event content */}
            <div
              className="w-full"
              style={{ marginLeft: '39px' }}
            >
              <EventCard event={event} onExpand={onExpandEvent} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
