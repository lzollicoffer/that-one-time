'use client';

/**
 * SkeletonCard — loading placeholder for browse cards and entity cards.
 * Matches the dimensions and border-radius of BrowseCard.
 * Uses CSS animation shimmer effect.
 */

export function SkeletonBrowseCard() {
  return (
    <div
      className="animate-pulse overflow-hidden"
      style={{
        borderRadius: 'var(--radius-browse-card)',
        backgroundColor: 'var(--color-surface)',
      }}
    >
      {/* Image placeholder */}
      <div
        style={{
          height: '294px',
          backgroundColor: '#e5e5e5',
        }}
      />
      {/* Content placeholder */}
      <div style={{ padding: '20px 24px 24px' }}>
        <div
          className="mx-auto"
          style={{
            height: '14px',
            width: '80%',
            backgroundColor: '#e5e5e5',
            borderRadius: '4px',
            marginBottom: '8px',
          }}
        />
        <div
          className="mx-auto"
          style={{
            height: '14px',
            width: '60%',
            backgroundColor: '#eeeeee',
            borderRadius: '4px',
            marginBottom: '16px',
          }}
        />
        <div
          className="mx-auto"
          style={{
            height: '11px',
            width: '100px',
            backgroundColor: '#eeeeee',
            borderRadius: '4px',
          }}
        />
      </div>
    </div>
  );
}

export function SkeletonEntityCard() {
  return (
    <div
      className="animate-pulse flex"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-card-border)',
        borderRadius: 'var(--radius-entity-card)',
        padding: '16px',
        gap: '16px',
      }}
    >
      <div
        style={{
          width: '120px',
          height: '150px',
          backgroundColor: '#e5e5e5',
          borderRadius: 'var(--radius-entity-card-image)',
          flexShrink: 0,
        }}
      />
      <div className="flex flex-col justify-center flex-1 gap-2">
        <div style={{ height: '16px', width: '70%', backgroundColor: '#e5e5e5', borderRadius: '4px' }} />
        <div style={{ height: '14px', width: '50%', backgroundColor: '#eeeeee', borderRadius: '4px' }} />
      </div>
    </div>
  );
}

export function SkeletonTimelineEvent() {
  return (
    <div className="animate-pulse flex items-start" style={{ gap: '39px' }}>
      {/* Node dot */}
      <div
        style={{
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          backgroundColor: '#e5e5e5',
          flexShrink: 0,
          marginTop: '12px',
        }}
      />
      <div className="flex-1 flex flex-col gap-2">
        {/* Date */}
        <div style={{ height: '24px', width: '120px', backgroundColor: '#e5e5e5', borderRadius: '4px' }} />
        {/* Title */}
        <div style={{ height: '16px', width: '180px', backgroundColor: '#eeeeee', borderRadius: '4px' }} />
        {/* Card body */}
        <div
          style={{
            borderRadius: 'var(--radius-event-card)',
            backgroundColor: 'var(--color-surface)',
            padding: '31px 32px 32px',
          }}
        >
          <div style={{ height: '14px', width: '100%', backgroundColor: '#eeeeee', borderRadius: '4px', marginBottom: '8px' }} />
          <div style={{ height: '14px', width: '90%', backgroundColor: '#eeeeee', borderRadius: '4px', marginBottom: '8px' }} />
          <div style={{ height: '14px', width: '70%', backgroundColor: '#eeeeee', borderRadius: '4px' }} />
        </div>
      </div>
    </div>
  );
}
