'use client';

import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { NavBar } from '@/components/ui/nav-bar';
import { TimelineHeader } from '@/components/timeline/timeline-header';
import { EntityPillBar } from '@/components/timeline/entity-pill-bar';
import { TimelineEventList } from '@/components/timeline/timeline-event-list';
import { EventDetailSheet } from '@/components/timeline/event-detail-sheet';
import { EntityListSheet } from '@/components/timeline/entity-list-sheet';
import { ScrollToTop } from '@/components/timeline/scroll-to-top';
import { AuthModal } from '@/components/auth/auth-modal';
import { TimelineEvent } from '@/types/timeline';
import { useAuthStore } from '@/stores/auth-store';
import { useBookmarkStore } from '@/stores/bookmark-store';
import {
  PALESTINE_ISRAEL_TIMELINE,
  PALESTINE_ISRAEL_EVENTS,
} from '@/lib/api/mock-timeline-data';
import {
  PALESTINE_ISRAEL_BOOKS,
  PALESTINE_ISRAEL_PODCASTS,
  PALESTINE_ISRAEL_MOVIES,
} from '@/lib/api/mock-entity-data';

/**
 * Timeline View Page — That One Time
 * Story 1.2 — View Timeline
 * Story 1.3 — View Event Detail (Peek State / Deep Dive)
 * Story 1.5 — Navigate Between Events
 *
 * Acceptance Criteria:
 * - Vertical event list with spine/connector and circular nodes
 * - Broad events: year range, title, preview, image, "expand details"
 * - Specific events: text only, "expand details"
 * - Timeline header: full-width image with title, time span, gradient
 * - Entity pills (Books, Podcasts, Movies) sticky below header
 * - Scroll-to-top button
 * - Bottom sheet on "Expand Details" tap
 */

export default function TimelinePage() {
  const params = useParams();
  const slug = params.slug as string;

  // For now, only the Palestine-Israel timeline is available
  const timeline = PALESTINE_ISRAEL_TIMELINE;
  const events = PALESTINE_ISRAEL_EVENTS;

  const user = useAuthStore((s) => s.user);
  const {
    bookmarkedTimelines,
    bookmarkedEvents,
    toggleTimelineBookmark,
    toggleEventBookmark,
    fetchBookmarks,
  } = useBookmarkStore();

  const [activePill, setActivePill] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(
    null
  );
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (user) {
      fetchBookmarks();
    }
  }, [user, fetchBookmarks]);

  const handleTimelineBookmark = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    toggleTimelineBookmark(timeline.id);
  };

  const handleEventBookmark = (eventId: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    toggleEventBookmark(eventId);
  };

  const isEventBookmarked = (eventId: string) => {
    return bookmarkedEvents.has(eventId);
  };

  const activeEntities = useMemo(() => {
    if (!activePill) return [];
    switch (activePill) {
      case 'Books':
        return PALESTINE_ISRAEL_BOOKS;
      case 'Podcasts':
        return PALESTINE_ISRAEL_PODCASTS;
      case 'Movies':
        return PALESTINE_ISRAEL_MOVIES;
      default:
        return [];
    }
  }, [activePill]);

  const handlePillClick = (pill: string) => {
    setActivePill(activePill === pill ? null : pill);
  };

  const handleEntitySheetClose = () => {
    setActivePill(null);
  };

  const handleExpandEvent = (event: TimelineEvent) => {
    setSelectedEvent(event);
  };

  const handleCloseSheet = () => {
    setSelectedEvent(null);
  };

  const handleNavigateEvent = (event: TimelineEvent) => {
    setSelectedEvent(event);
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      {/* Nav Bar */}
      <NavBar />

      {/* Timeline Header Hero */}
      <TimelineHeader
        timeline={timeline}
        isBookmarked={bookmarkedTimelines.has(timeline.id)}
        onToggleBookmark={handleTimelineBookmark}
      />

      {/* Entity Pill Bar — sticky */}
      <EntityPillBar activePill={activePill} onPillClick={handlePillClick} />

      {/* Timeline Events with Spine */}
      <TimelineEventList events={events} onExpandEvent={handleExpandEvent} />

      {/* Scroll-to-Top Button */}
      <ScrollToTop />

      {/* Event Detail Bottom Sheet */}
      <EventDetailSheet
        event={selectedEvent}
        events={events}
        onClose={handleCloseSheet}
        onNavigate={handleNavigateEvent}
        isEventBookmarked={isEventBookmarked}
        onToggleEventBookmark={handleEventBookmark}
      />

      {/* Auth Modal — shown when guest tries to bookmark */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode="signup"
      />

      {/* Entity List Bottom Sheet (Books / Podcasts / Movies) */}
      <EntityListSheet
        entityType={activePill}
        entities={activeEntities}
        onClose={handleEntitySheetClose}
      />
    </div>
  );
}
