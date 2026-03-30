'use client';

import { useRef, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { TimelineEvent } from '@/types/timeline';
import { BottomActionBar } from '@/components/ui/bottom-action-bar';

/**
 * Event Detail Bottom Sheet (Deep Dive) — That One Time
 * Design System §5.12:
 *
 * Full-screen bottom sheet triggered by "EXPAND DETAILS" on event card.
 * - Drag handle at top
 * - "DEEP DIVE" label
 * - Event title (Newsreader Regular 28px)
 * - Yellow bullet dots (#FFCC00, 24px) with content blocks
 * - Optional inline images with context labels
 * - Sticky bottom action bar
 *
 * Framer Motion: slide up, < 300ms, dismiss via swipe down or tap overlay.
 */

interface EventDetailSheetProps {
  event: TimelineEvent | null;
  events: TimelineEvent[];
  onClose: () => void;
  onNavigate: (event: TimelineEvent) => void;
}

export function EventDetailSheet({
  event,
  events,
  onClose,
  onNavigate,
}: EventDetailSheetProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (event && contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [event]);

  // Lock body scroll when sheet is open
  useEffect(() => {
    if (event) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [event]);

  const currentIndex = event
    ? events.findIndex((e) => e.id === event.id)
    : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < events.length - 1;

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 100 || info.velocity.y > 500) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {event && (
        <>
          {/* Dimmed overlay */}
          <motion.div
            className="fixed inset-0 z-50"
            style={{ backgroundColor: 'var(--color-overlay-dark)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            className="fixed inset-x-0 bottom-0 z-50 flex flex-col"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderRadius: '24px 24px 0 0',
              maxHeight: '95vh',
              height: '95vh',
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300, duration: 0.3 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-2 shrink-0">
              <div
                style={{
                  width: '40px',
                  height: '4px',
                  borderRadius: '2px',
                  backgroundColor: 'var(--color-drag-handle)',
                }}
              />
            </div>

            {/* Scrollable content */}
            <div
              ref={contentRef}
              className="flex-1 overflow-y-auto"
              style={{ padding: '0 24px' }}
            >
              {/* DEEP DIVE label */}
              <p
                className="text-center"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  lineHeight: '15px',
                  color: 'var(--color-text-body)',
                  marginTop: '8px',
                }}
              >
                Deep Dive
              </p>

              {/* Event title */}
              <h2
                className="text-center"
                style={{
                  fontFamily: 'var(--font-date)',
                  fontSize: '28px',
                  fontWeight: 400,
                  lineHeight: '34px',
                  color: 'var(--color-text-primary)',
                  marginTop: '4px',
                  marginBottom: '24px',
                }}
              >
                {event.title}
              </h2>

              {/* Bullet point content */}
              <div className="flex flex-col" style={{ gap: '32px' }}>
                {event.detailBullets.map((bullet) => (
                  <div key={bullet.id} className="flex items-start">
                    {/* Yellow bullet dot */}
                    <div
                      className="shrink-0"
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-accent-yellow)',
                        marginRight: '12px',
                        marginTop: '2px',
                      }}
                    />

                    {/* Bullet text */}
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '16px',
                        fontWeight: 400,
                        lineHeight: '28px',
                        color: 'var(--color-text-secondary)',
                        flex: 1,
                      }}
                    >
                      {bullet.content}
                    </p>
                  </div>
                ))}
              </div>

              {/* Inline images */}
              {event.images.length > 0 && (
                <div className="mt-8">
                  {event.images.map((image) => (
                    <div key={image.id} className="mb-6">
                      <img
                        src={image.imageUrl}
                        alt={image.caption}
                        className="w-full object-cover"
                        style={{ borderRadius: '16px' }}
                      />
                      {image.contextLabel && (
                        <p
                          className="mt-3"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '10px',
                            fontWeight: 700,
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            lineHeight: '15px',
                            color: 'var(--color-primary)',
                          }}
                        >
                          {image.contextLabel}
                        </p>
                      )}
                      {image.caption && (
                        <p
                          className="mt-1"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '14px',
                            fontWeight: 400,
                            lineHeight: '22.75px',
                            color: 'var(--color-text-body)',
                          }}
                        >
                          {image.caption}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Navigation carets */}
              <div
                className="flex items-center justify-between"
                style={{ padding: '6px 4px', marginTop: '32px' }}
              >
                {hasPrev ? (
                  <button
                    onClick={() => onNavigate(events[currentIndex - 1])}
                    className="flex items-center gap-1 transition-opacity active:opacity-70"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-body)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                      <path
                        d="M5 1L1 5L5 9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Previous
                  </button>
                ) : (
                  <div />
                )}
                {hasNext ? (
                  <button
                    onClick={() => onNavigate(events[currentIndex + 1])}
                    className="flex items-center gap-1 transition-opacity active:opacity-70"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-body)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Next
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
                ) : (
                  <div />
                )}
              </div>

              {/* Spacer for bottom action bar */}
              <div style={{ height: '64px' }} />
            </div>

            {/* Bottom Action Bar */}
            <BottomActionBar onClose={onClose} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
