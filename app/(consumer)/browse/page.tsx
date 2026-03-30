'use client';

import { useState, useMemo, useEffect } from 'react';
import { NavBar } from '@/components/ui/nav-bar';
import { SearchBar } from '@/components/ui/search-bar';
import { FilterPill } from '@/components/ui/filter-pill';
import { BrowseCard } from '@/components/ui/browse-card';
import { SkeletonBrowseCard } from '@/components/ui/skeleton-card';

/**
 * Browse & Search Page — That One Time
 * Epic 1, Story 1.1 — Browse Timeline Catalog
 *
 * Fetches published timelines from Supabase via /api/timelines.
 * Cover images come from the database (uploaded via admin CMS).
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

const FILTER_OPTIONS = ['Tragic', 'Inspiring', 'Chill', 'Recent'];

export default function BrowsePage() {
  const [timelines, setTimelines] = useState<Timeline[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/timelines')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        setTimelines(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredTimelines = useMemo(() => {
    return timelines.filter((timeline) => {
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
  }, [timelines, searchQuery, activeFilter]);

  const handleFilterClick = (filterLabel: string) => {
    setActiveFilter(activeFilter === filterLabel ? null : filterLabel);
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <NavBar />

      <main style={{ padding: '24px 30px' }}>
        <div>
          <SearchBar placeholder="Search" onSearch={setSearchQuery} />
        </div>

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

        <div
          className="flex flex-col"
          style={{ gap: 'var(--spacing-xl)' }}
        >
          {loading ? (
            <>
              <SkeletonBrowseCard />
              <SkeletonBrowseCard />
              <SkeletonBrowseCard />
            </>
          ) : filteredTimelines.length > 0 ? (
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
