'use client';

import { Timeline } from '@/types/timeline';

/**
 * Timeline Header — That One Time
 * Design System §5.5:
 *
 * Full-width hero image at top of timeline view (~487px tall).
 * Warm gradient overlay with title and subtitle bottom-aligned, centered.
 */

interface TimelineHeaderProps {
  timeline: Timeline;
}

export function TimelineHeader({ timeline }: TimelineHeaderProps) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: '487px' }}
    >
      {/* Background image */}
      <img
        src={timeline.coverImageUrl}
        alt={timeline.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Warm gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(0deg, rgba(63,38,29,0.48) 24%, rgba(248,133,79,0.48) 79%)',
        }}
      />

      {/* Content — bottom-aligned, centered */}
      <div
        className="absolute bottom-0 left-0 right-0 flex flex-col items-center text-center"
        style={{ padding: '0 24px 18px' }}
      >
        <h1
          className="text-white whitespace-pre-line"
          style={{
            fontFamily: 'var(--font-date)',
            fontSize: '48px',
            fontWeight: 600,
            lineHeight: '40px',
          }}
        >
          {timeline.title}
        </h1>
        <p
          className="text-white mt-3"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '22.75px',
          }}
        >
          {timeline.subtitle}
        </p>
      </div>
    </div>
  );
}
