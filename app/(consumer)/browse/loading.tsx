import { SkeletonBrowseCard } from '@/components/ui/skeleton-card';

/**
 * Browse page loading state — skeleton cards.
 * Story 1.1: Skeleton cards shown as loading state.
 */

export default function BrowseLoading() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      {/* Nav placeholder */}
      <div
        className="sticky top-0 z-50 w-full"
        style={{
          height: '64px',
          backgroundColor: 'var(--color-surface)',
        }}
      />

      <main style={{ padding: '24px 30px' }}>
        {/* Search bar placeholder */}
        <div
          className="animate-pulse"
          style={{
            height: '49px',
            borderRadius: '76px',
            backgroundColor: '#e5e5e5',
            marginBottom: '16px',
          }}
        />

        {/* Filter pills placeholder */}
        <div className="flex gap-2 mb-6" style={{ padding: '16px 0' }}>
          {[80, 100, 60, 70].map((w, i) => (
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

        {/* Skeleton cards */}
        <div className="flex flex-col" style={{ gap: '24px' }}>
          <SkeletonBrowseCard />
          <SkeletonBrowseCard />
          <SkeletonBrowseCard />
        </div>
      </main>
    </div>
  );
}
