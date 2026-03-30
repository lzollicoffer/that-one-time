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
import { Timeline, TimelineEvent, TimelineEntity } from '@/types/timeline';

/**
 * Timeline View Page — That One Time
 * Fetches timeline, events, and entities from the database via /api/timelines/[slug].
 * Event images uploaded via admin CMS display on broad event cards.
 */

export default function TimelinePage() {
  const params = useParams();
  const slug = params.slug as string;

  const [timeline, setTimeline] = useState<Timeline | null>(null);
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [entities, setEntities] = useState<TimelineEntity[]>([]);
  const [loading, setLoading] = useState(true);

  const [activePill, setActivePill] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  useEffect(() => {
    fetch(`/api/timelines/${slug}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) {
          setTimeline({
            id: data.timeline.id,
            slug: data.timeline.slug,
            title: data.timeline.title,
            subtitle: data.timeline.subtitle || '',
            period: `${data.timeline.time_span_start}–${data.timeline.time_span_end}`,
            coverImageUrl: data.timeline.cover_image_url || '',
            description: data.timeline.browse_description || '',
            tags: [],
            status: data.timeline.status,
          });
          setEvents(data.events);
          setEntities(data.entities);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const entityCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    counts['Books'] = entities.filter((e) => e.entityType === 'book').length;
    counts['Podcasts'] = entities.filter((e) => e.entityType === 'podcast').length;
    counts['Movies'] = entities.filter((e) => e.entityType === 'movie').length;
    return counts;
  }, [entities]);

  const activeEntities = useMemo(() => {
    if (!activePill) return [];
    const typeMap: Record<string, string> = {
      Books: 'book',
      Podcasts: 'podcast',
      Movies: 'movie',
    };
    return entities.filter((e) => e.entityType === typeMap[activePill]);
  }, [activePill, entities]);

  const handlePillClick = (pill: string) => {
    setActivePill(activePill === pill ? null : pill);
  };

  const handleEntitySheetClose = () => {
    setActivePill(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
        <NavBar />
        <div className="flex items-center justify-center" style={{ padding: '120px 30px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--color-text-body)' }}>
            Loading timeline...
          </p>
        </div>
      </div>
    );
  }

  if (!timeline) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
        <NavBar />
        <div className="flex flex-col items-center justify-center text-center" style={{ padding: '120px 30px' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
            Timeline not found
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--color-text-body)', marginTop: '8px' }}>
            This timeline may not exist or hasn&apos;t been published yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      <NavBar />
      <TimelineHeader timeline={timeline} />
      <EntityPillBar activePill={activePill} onPillClick={handlePillClick} counts={entityCounts} />

      {events.length > 0 ? (
        <TimelineEventList events={events} onExpandEvent={setSelectedEvent} />
      ) : (
        <div className="text-center" style={{ padding: '60px 30px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--color-text-body)' }}>
            Events are coming soon for this timeline.
          </p>
        </div>
      )}

      <ScrollToTop />

      <EventDetailSheet
        event={selectedEvent}
        events={events}
        onClose={() => setSelectedEvent(null)}
        onNavigate={setSelectedEvent}
      />

      <EntityListSheet
        entityType={activePill}
        entities={activeEntities}
        onClose={handleEntitySheetClose}
      />
    </div>
  );
}
