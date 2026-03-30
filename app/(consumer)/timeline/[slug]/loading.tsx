import { SkeletonTimelineEvent } from '@/components/ui/skeleton-card';

/**
 * Timeline page loading state — hero placeholder + skeleton events.
 */

export default function TimelineLoading() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      {/* Nav placeholder */}
      <div style={{ height: '64px', backgroundColor: 'var(--color-surface)' }} />

      {/* Hero placeholder */}
      <div
        className="animate-pulse"
        style={{ height: '487px', backgroundColor: '#d4d4d4' }}
      />

      {/* Entity pills placeholder */}
      <div
        className="flex justify-center gap-2"
        style={{ padding: '12px 24px' }}
      >
        {[70, 90, 70].map((w, i) => (
          <div
            key={i}
            className="animate-pulse"
            style={{
              height: '30px',
              width: `${w}px`,
              borderRadius: '44px',
              backgroundColor: '#e5e5e5',
            }}
          />
        ))}
      </div>

      {/* Skeleton events */}
      <div style={{ padding: '24px 30px 80px' }}>
        <div className="flex flex-col" style={{ gap: '40px' }}>
          <SkeletonTimelineEvent />
          <SkeletonTimelineEvent />
          <SkeletonTimelineEvent />
        </div>
      </div>
    </div>
  );
}
