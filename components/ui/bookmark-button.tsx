'use client';

/**
 * Bookmark Button — That One Time
 * Heart/bookmark icon that toggles between filled and outline states.
 * Used on timeline headers and event detail sheets.
 */

interface BookmarkButtonProps {
  isBookmarked: boolean;
  onToggle: () => void;
  size?: number;
  color?: string;
}

export function BookmarkButton({
  isBookmarked,
  onToggle,
  size = 24,
  color = '#FFFFFF',
}: BookmarkButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onToggle();
      }}
      className="transition-transform active:scale-90"
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '4px',
      }}
      aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={isBookmarked ? color : 'none'}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    </button>
  );
}
