'use client';

import Link from 'next/link';

export interface BrowseCardProps {
  id: string;
  title: string;
  timeSpan: string;
  description: string;
  coverImageUrl?: string;
  slug: string;
}

/**
 * Browse Card — That One Time
 * Design System §5.2:
 *
 * Structure:
 * - Image area (~75%): full-bleed photo + warm gradient overlay
 *   - Date pill: bottom-left of image, white rounded pill
 *   - Title: bottom of image area, above gradient
 * - Content area (~25%): white background
 *   - Description text (Manrope Regular 14px, #58413F)
 *   - "VIEW TIMELINE →" CTA (Manrope Bold 11px, uppercase)
 *
 * Card shell: white, border-radius 28px, overflow hidden
 */
export function BrowseCard({
  title,
  timeSpan,
  description,
  coverImageUrl,
  slug,
}: BrowseCardProps) {
  return (
    <Link href={`/timeline/${slug}`}>
      <div
        className="cursor-pointer group overflow-hidden transition-transform active:scale-[0.98]"
        style={{
          borderRadius: 'var(--radius-browse-card)',
          backgroundColor: 'var(--color-surface)',
        }}
      >
        {/* Image Container (~75% of card, ~294px) */}
        <div
          className="relative w-full overflow-hidden"
          style={{ height: '294px', backgroundColor: '#d4d4d4' }}
        >
          {/* Background Image — using img for external URLs */}
          {coverImageUrl && (
            <img
              src={coverImageUrl}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {/* Gradient Overlay — warm, bottom-heavy */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(0deg, rgba(107,1,9,0.6) 0%, transparent 60%)',
            }}
          />

          {/* Date Pill + Title — bottom-left of image, pill then title with 8px gap */}
          <div
            className="absolute flex flex-col items-start"
            style={{
              bottom: '16px',
              left: '20px',
              right: '20px',
            }}
          >
            <span
              className="inline-block rounded-full bg-white text-black"
              style={{
                padding: '6px 14px',
                fontFamily: 'var(--font-body)',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                lineHeight: '15px',
                marginBottom: '8px',
              }}
            >
              {timeSpan}
            </span>
            <h2
              className="text-white"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '30px',
                fontWeight: 700,
                lineHeight: '30px',
              }}
            >
              {title}
            </h2>
          </div>
        </div>

        {/* Content Area (~25% of card) */}
        <div
          className="text-center"
          style={{
            backgroundColor: 'var(--color-surface)',
            padding: '20px 24px 24px',
          }}
        >
          <p
            className="mb-4"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              lineHeight: '22.75px',
              color: 'var(--color-text-body)',
            }}
          >
            {description}
          </p>

          <p
            className="font-bold uppercase flex items-center justify-center gap-1"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '1.1px',
              color: 'var(--color-text-primary)',
            }}
          >
            View Timeline
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="ml-1"
            >
              <path
                d="M4.5 2.5L8 6L4.5 9.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </p>
        </div>
      </div>
    </Link>
  );
}
