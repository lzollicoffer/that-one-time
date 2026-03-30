import { create } from 'zustand';

/**
 * Zustand bookmark store — manages bookmarked timeline and event IDs.
 * Optimistic updates: UI updates immediately, syncs with server in background.
 */

interface BookmarkState {
  bookmarkedTimelines: Set<string>;
  bookmarkedEvents: Set<string>;
  loading: boolean;
  toggleTimelineBookmark: (timelineId: string) => Promise<void>;
  toggleEventBookmark: (eventId: string) => Promise<void>;
  fetchBookmarks: () => Promise<void>;
}

export const useBookmarkStore = create<BookmarkState>((set, get) => ({
  bookmarkedTimelines: new Set<string>(),
  bookmarkedEvents: new Set<string>(),
  loading: false,

  fetchBookmarks: async () => {
    set({ loading: true });
    try {
      const [timelinesRes, eventsRes] = await Promise.all([
        fetch('/api/me/bookmarks/timelines'),
        fetch('/api/me/bookmarks/events'),
      ]);

      if (timelinesRes.ok) {
        const data = await timelinesRes.json();
        set({
          bookmarkedTimelines: new Set(
            data.map((b: { timeline_id: string }) => b.timeline_id)
          ),
        });
      }

      if (eventsRes.ok) {
        const data = await eventsRes.json();
        set({
          bookmarkedEvents: new Set(
            data.map((b: { event_id: string }) => b.event_id)
          ),
        });
      }
    } catch {
      // Silently fail — bookmarks are non-critical
    } finally {
      set({ loading: false });
    }
  },

  toggleTimelineBookmark: async (timelineId: string) => {
    const { bookmarkedTimelines } = get();
    const isBookmarked = bookmarkedTimelines.has(timelineId);

    // Optimistic update
    const next = new Set(bookmarkedTimelines);
    if (isBookmarked) {
      next.delete(timelineId);
    } else {
      next.add(timelineId);
    }
    set({ bookmarkedTimelines: next });

    // Sync with server
    try {
      if (isBookmarked) {
        await fetch(`/api/me/bookmarks/timelines?timelineId=${timelineId}`, {
          method: 'DELETE',
        });
      } else {
        await fetch('/api/me/bookmarks/timelines', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ timelineId }),
        });
      }
    } catch {
      // Revert on failure
      set({ bookmarkedTimelines });
    }
  },

  toggleEventBookmark: async (eventId: string) => {
    const { bookmarkedEvents } = get();
    const isBookmarked = bookmarkedEvents.has(eventId);

    // Optimistic update
    const next = new Set(bookmarkedEvents);
    if (isBookmarked) {
      next.delete(eventId);
    } else {
      next.add(eventId);
    }
    set({ bookmarkedEvents: next });

    // Sync with server
    try {
      if (isBookmarked) {
        await fetch(`/api/me/bookmarks/events?eventId=${eventId}`, {
          method: 'DELETE',
        });
      } else {
        await fetch('/api/me/bookmarks/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ eventId }),
        });
      }
    } catch {
      // Revert on failure
      set({ bookmarkedEvents });
    }
  },
}));
