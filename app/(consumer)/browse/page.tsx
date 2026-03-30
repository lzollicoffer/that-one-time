'use client';

import { useState, useMemo } from 'react';
import { NavBar } from '@/components/ui/nav-bar';
import { SearchBar } from '@/components/ui/search-bar';
import { FilterPill } from '@/components/ui/filter-pill';
import { BrowseCard } from '@/components/ui/browse-card';

/**
 * Browse & Search Page — That One Time
 * Epic 1, Story 1.1 — Browse Timeline Catalog
 *
 * Acceptance Criteria:
 * - Browse page with timeline cards
 * - Search bar with type-ahead capability
 * - Filter pills: Tragic | Inspiring | Chill | Recent
 * - Cards show title, time span, cover image, brief description
 * - Tapping a card navigates to the timeline view
 *
 * Design Reference: docs/design/search page).png
 */

interface Timeline {
  id: string;
  slug: string;
  title: string;
  timeSpan: string;
  description: string;
  coverImageUrl: string;
  tags: string[];
}

// Mock timeline data — to be replaced with Supabase query via /lib/api/
const MOCK_TIMELINES: Timeline[] = [
  {
    id: 'palestine-israel',
    slug: 'palestine-and-israel',
    title: 'Palestine and Israel',
    timeSpan: '1517 — PRESENT',
    description:
      'A deep dive into a conflict that has spanned 100 years, reshaping the geopolitical landscape of the Middle East.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=800&h=600&fit=crop',
    tags: ['tragic', 'recent'],
  },
  {
    id: 'chernobyl-disaster',
    slug: 'chernobyl-disaster',
    title: 'Chernobyl Disaster',
    timeSpan: '1986',
    description:
      'The worst nuclear disaster in history that changed the way the world looked at reactors forever.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1550232497-01b3a80b5ffd?w=800&h=600&fit=crop',
    tags: ['tragic'],
  },
  {
    id: 'space-race',
    slug: 'the-space-race',
    title: 'The Space Race',
    timeSpan: '1957 — PRESENT',
    description:
      'The tension that launched humanity into the cosmos and toward the final frontier.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop',
    tags: ['inspiring'],
  },
  {
    id: 'renaissance',
    slug: 'the-renaissance',
    title: 'The Renaissance',
    timeSpan: '1300 — 1600',
    description:
      'A cultural and artistic movement that redefined human potential and artistic expression.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1578926078328-02a4c8267587?w=800&h=600&fit=crop',
    tags: ['inspiring', 'chill'],
  },
  {
    id: 'industrial-revolution',
    slug: 'industrial-revolution',
    title: 'Industrial Revolution',
    timeSpan: '1760 — 1840',
    description:
      'The transformation of agrarian societies into industrial superpowers with lasting effects.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&h=600&fit=crop',
    tags: ['inspiring', 'chill'],
  },
];

const FILTER_OPTIONS = ['Tragic', 'Inspiring', 'Chill', 'Recent'];

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filteredTimelines = useMemo(() => {
    return MOCK_TIMELINES.filter((timeline) => {
      if (
        searchQuery &&
        !timeline.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !timeline.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      if (activeFilter) {
        const filterTag = activeFilter.toLowerCase();
        if (!timeline.tags.includes(filterTag)) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, activeFilter]);

  const handleFilterClick = (filterLabel: string) => {
    setActiveFilter(activeFilter === filterLabel ? null : filterLabel);
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      {/* Shared NavBar */}
      <NavBar />

      {/* Main Content */}
      <main
        style={{
          padding: '24px 30px',
        }}
      >
        {/* Search Bar */}
        <div>
          <SearchBar placeholder="Search" onSearch={setSearchQuery} />
        </div>

        {/* Filter Pills — horizontal scroll, gap 9px, 16px vertical padding */}
        <div
          className="flex overflow-x-auto justify-center"
          style={{ gap: '9px', padding: '16px 0' }}
        >
          {FILTER_OPTIONS.map((filterLabel) => (
            <FilterPill
              key={filterLabel}
              label={filterLabel}
              active={activeFilter === filterLabel}
              onClick={() => handleFilterClick(filterLabel)}
            />
          ))}
        </div>

        {/* Browse Cards — 24px vertical gap */}
        <div
          className="flex flex-col"
          style={{ gap: 'var(--spacing-xl)' }}
        >
          {filteredTimelines.length > 0 ? (
            filteredTimelines.map((timeline) => (
              <BrowseCard
                key={timeline.id}
                id={timeline.id}
                title={timeline.title}
                timeSpan={timeline.timeSpan}
                description={timeline.description}
                coverImageUrl={timeline.coverImageUrl}
                slug={timeline.slug}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  color: 'var(--color-text-body)',
                }}
              >
                No timelines found. Try adjusting your search or filters.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
