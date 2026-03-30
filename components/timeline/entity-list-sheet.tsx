'use client';

import { useRef, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { TimelineEntity } from '@/types/timeline';
import { EntityCard } from './entity-card';
import { BottomActionBar } from '@/components/ui/bottom-action-bar';

/**
 * Entity List Bottom Sheet — That One Time
 * Design System §5.9:
 *
 * Bottom sheet triggered by tapping an entity pill.
 * Overlays the timeline view — hero and entity pills remain visible above.
 *
 * - Drag handle at top
 * - Section title (Newsreader Regular 28px, centered)
 * - Scrollable entity card list (16px gap)
 * - Sticky bottom action bar
 *
 * Sheet height: ~55-60% of screen (hero still visible above).
 * Framer Motion: slide up, < 300ms.
 */

interface EntityListSheetProps {
  entityType: string | null;
  entities: TimelineEntity[];
  onClose: () => void;
}

export function EntityListSheet({
  entityType,
  entities,
  onClose,
}: EntityListSheetProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (entityType && contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [entityType]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.y > 80 || info.velocity.y > 400) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {entityType && (
        <>
          {/* Dimmed overlay — only covers area below hero/pills */}
          <motion.div
            className="fixed inset-0 z-30"
            style={{ backgroundColor: 'var(--color-overlay-dark)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            className="fixed inset-x-0 bottom-0 z-40 flex flex-col"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderRadius: '24px 24px 0 0',
              maxHeight: '60vh',
              height: '60vh',
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 300,
              duration: 0.3,
            }}
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

            {/* Section title */}
            <h2
              className="text-center shrink-0"
              style={{
                fontFamily: 'var(--font-date)',
                fontSize: '28px',
                fontWeight: 400,
                color: 'var(--color-text-primary)',
                marginTop: '12px',
                marginBottom: '24px',
              }}
            >
              {entityType}
            </h2>

            {/* Divider */}
            <div
              className="shrink-0"
              style={{
                height: '1px',
                backgroundColor: 'var(--color-card-border)',
                margin: '0 24px 24px',
              }}
            />

            {/* Scrollable entity card list */}
            <div
              ref={contentRef}
              className="flex-1 overflow-y-auto"
              style={{ padding: '0 24px' }}
            >
              <div className="flex flex-col" style={{ gap: '16px' }}>
                {entities.map((entity) => (
                  <EntityCard key={entity.id} entity={entity} />
                ))}
              </div>

              {/* Spacer for bottom action bar */}
              <div style={{ height: '80px' }} />
            </div>

            {/* Bottom Action Bar */}
            <BottomActionBar onClose={onClose} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
