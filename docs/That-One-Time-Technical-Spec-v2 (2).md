# That One Time — Technical Specification

**Version:** 2.0
**Date:** March 2026
**Stack:** Next.js + Supabase + Vercel

This document contains everything needed to build the product to spec. It references the finalized User Stories, Design System v2, and Figma frames as source of truth. All data model, API, component, and build decisions trace back to those documents.

---

## Changelog (v1 → v2)

| Area | Change |
|------|--------|
| **Filters** | Simplified from 4 separate filter types (category, vibe, time, place) to a single horizontal pill bar: `Tragic \| Inspiring \| Chill \| Recent`. Active pill turns yellow with `×` to clear. |
| **Event detail** | Peek + expanded combined into one flow: sheet opens at ~40%, scrolling up within the sheet expands to ~80%. "DEEP DIVE" label + yellow bullet dots + inline images. |
| **Bottom action bar** | New persistent component at bottom of ALL sheets: "CLOSE READER" (text button, left) + "EXPLORE THIS ERA" (filled pill button, right). |
| **Event card types** | Formalized two variants: Broad (with image, right-aligned dates) and Specific (no image, left-aligned dates). Both have "EXPAND DETAILS" CTA. |
| **Entity cards** | Now show title, creator, AND description line in list view (not just title + creator). |
| **Scroll-to-top** | Bottom-left position (not bottom-right). Non-invasive caret. |
| **Components** | Removed separate VibeFilter, TimeFilter, PlaceFilter. Added BottomActionBar, EventDetailSheet (merged peek/expanded), EventCardBroad, EventCardSpecific. |
| **Build order** | Consumer sprints first (1–4), admin sprints second (5–7), polish last. Seed data via Supabase dashboard during consumer sprints. |
| **events table** | Added `event_type` field ('broad' \| 'specific'), `preview_image_url`, `preview_image_desaturated` flag. |
| **timeline_tags** | Tag values updated to match finalized filter pills: Tragic, Inspiring, Chill, Recent. |

---

## 1. Data Model (Supabase / Postgres)

### 1.1 Entity Relationship Summary

```
profiles ─────────────────────── bookmarked_timelines
    │                                     │
    │                                     │
    ├── bookmarked_events                 │
    │                                     │
    │                                     ▼
    │                              timelines
    │                                │    │
    │                                │    ├── timeline_entities (books, podcasts, movies)
    │                                │    │
    │                                │    ├── timeline_tags
    │                                │    │
    │                                │    └── home_sections ◄── home_section_timelines
    │                                │
    │                                ▼
    │                              events
    │                                │
    │                                ├── event_entity_refs (people, places per event)
    │                                │
    │                                ├── event_images
    │                                │
    │                                ├── event_sources
    │                                │
    │                                ├── event_bullets (ordered content blocks)
    │                                │
    │                                └── connections (event_from ↔ event_to)
    │
    └── content_flags
```

### 1.2 Table Definitions

#### `profiles`
Extends Supabase auth.users with app-specific data.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | uuid | PK, references auth.users(id) | |
| display_name | text | not null | |
| avatar_url | text | nullable | |
| role | text | not null, default 'user' | 'user', 'editor', 'admin' |
| subscription_tier | text | not null, default 'free' | 'free', 'pro' |
| onboarding_complete | boolean | default false | |
| created_at | timestamptz | not null, default now() | |
| updated_at | timestamptz | not null, default now() | |

---

#### `timelines`
Core content unit.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | uuid | PK, default gen_random_uuid() | |
| title | text | not null | e.g., "Palestine and Israel" |
| subtitle | text | nullable | e.g., "A deep dive into the 100 year conflict." |
| slug | text | unique, not null | URL-friendly, auto-generated from title |
| introduction | text | nullable | 200–400 word editorial intro (overlaid on hero) |
| scope_note | text | nullable | "This timeline covers X, not Y" |
| time_span_start | text | not null | Flexible: "1517", "500 BCE", "March 1969" |
| time_span_end | text | not null | |
| time_span_start_sort | integer | not null | Sortable integer (year, negative for BCE) |
| time_span_end_sort | integer | not null | |
| cover_image_url | text | nullable | Supabase storage URL — used for hero AND browse card |
| cover_image_focal_x | real | default 0.5 | 0–1, for responsive cropping |
| cover_image_focal_y | real | default 0.5 | |
| browse_description | text | nullable | Short description shown on browse card (2–3 lines) |
| status | text | not null, default 'draft' | 'draft', 'published', 'unlisted', 'archived' |
| tier | text | not null, default 'flagship' | 'flagship', 'ai_reviewed', 'community' |
| creator_id | uuid | references profiles(id) | null for admin-created |
| perspective_epistemological | text | nullable | e.g., "Academic Consensus" |
| perspective_geographic | text | nullable | e.g., "Western Academic" |
| contributor_credits | text | nullable | |
| event_count | integer | not null, default 0 | Denormalized for card display |
| bg_color | text | default '#0F0F0F' | Hex color |
| bg_image_url | text | nullable | |
| bg_image_opacity | real | default 0.3 | 0–1 |
| accent_color | text | default '#7D1F01' | Primary brand color per design system |
| header_style | text | default 'light_on_dark' | 'light_on_dark', 'dark_on_light' |
| header_gradient | text | nullable | CSS gradient string for hero overlay |
| published_at | timestamptz | nullable | |
| created_at | timestamptz | not null, default now() | |
| updated_at | timestamptz | not null, default now() | |

**Indexes:** `slug` (unique), `status`, `time_span_start_sort`, `created_at`

---

#### `timeline_tags`
Filter tags assigned to timelines. Used for browse page filter pills.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | uuid | PK | |
| timeline_id | uuid | FK → timelines, not null | |
| tag_value | text | not null | 'tragic', 'inspiring', 'chill', 'recent' |

**Indexes:** `timeline_id`
**Unique:** `(timeline_id, tag_value)`

---

#### `events`
Individual moments within a timeline.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | uuid | PK | |
| timeline_id | uuid | FK → timelines, not null, on delete cascade | |
| event_type | text | not null, default 'specific' | 'broad' or 'specific' — controls card variant |
| title | text | not null | e.g., "Ottoman Rule", "Balfour Declaration" |
| preview_text | text | nullable | 4–5 line preview shown on timeline card |
| date_display | text | not null | Human-readable: "1517 — 1917", "1917" |
| date_sort | integer | not null | Sortable: year as integer |
| date_precision | text | default 'year' | 'exact', 'month', 'year', 'decade', 'range' |
| date_range_end_display | text | nullable | For broad events: "1917" |
| date_range_end_sort | integer | nullable | |
| era_label | text | nullable | Section header grouping (not displayed on card) |
| preview_image_url | text | nullable | Only for 'broad' event type cards |
| preview_image_desaturated | boolean | default true | Apply B&W treatment per design system |
| sort_order | integer | not null, default 0 | Manual override for editorial sequencing |
| created_at | timestamptz | not null, default now() | |
| updated_at | timestamptz | not null, default now() | |

**Indexes:** `timeline_id`, `(timeline_id, sort_order)`, `(timeline_id, date_sort)`

---

#### `event_bullets`
Ordered content blocks for the event detail bottom sheet (Deep Dive view). Each bullet = one yellow dot + text block.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | uuid | PK | |
| event_id | uuid | FK → events, on delete cascade | |
| content | text | not null | Paragraph text for this bullet point |
| sort_order | integer | not null, default 0 | Display order in the detail sheet |

**Indexes:** `(event_id, sort_order)`

---

#### `event_images`
Inline images shown within the event detail bottom sheet (below the bullet content).

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | uuid | PK | |
| event_id | uuid | FK → events, on delete cascade | |
| image_url | text | not null | Supabase storage URL |
| context_label | text | nullable | Uppercase label, e.g., "CARTOGRAPHIC CONTEXT" |
| caption | text | nullable | Description below the label |
| credit | text | nullable | Photographer/source attribution |
| sort_order | integer | default 0 | |

---

#### `event_sources`
Citations for each event.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | uuid | PK | |
| event_id | uuid | FK → events, on delete cascade | |
| title | text | not null | Source title |
| url | text | nullable | |
| source_type | text | nullable | 'primary', 'academic', 'institutional', 'journalistic', 'popular' |

---

#### `event_entity_refs`
People and places referenced within a specific event (inline in the detail sheet).

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | uuid | PK | |
| event_id | uuid | FK → events, on delete cascade | |
| entity_type | text | not null | 'person' or 'place' |
| name | text | not null | "Isaac Newton" or "Greenwich Observatory" |
| subtitle | text | nullable | Role/title for people, location for places |
| context_line | text | nullable | 1-sentence relevance to this event |
| sort_order | integer | default 0 | |

---

#### `connections`
Causal links between events within a timeline. (P1 — not in MVP Sprint 1–4 but schema included for completeness.)

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | uuid | PK | |
| timeline_id | uuid | FK → timelines, on delete cascade | |
| from_event_id | uuid | FK → events, on delete cascade | Upstream event |
| to_event_id | uuid | FK → events, on delete cascade | Downstream event |
| relationship_type | text | not null | 'caused', 'enabled', 'responded_to', 'preceded', 'co_occurred' |
| description | text | nullable | 1-sentence explanation |
| created_at | timestamptz | default now() | |

**Unique:** `(from_event_id, to_event_id)`

---

#### `entities`
Global entity library — books, podcasts, movies. Shared across timelines.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | uuid | PK | |
| entity_type | text | not null | 'book', 'podcast', 'movie' |
| title | text | not null | |
| creator_name | text | nullable | Author / host / director |
| secondary_creator | text | nullable | Guest (podcast), co-director, co-author |
| year | text | nullable | Publication/release year |
| duration | text | nullable | For podcasts/movies (e.g., "3h 12m") |
| description | text | nullable | Full description |
| cover_image_url | text | nullable | Book cover, podcast art, movie poster |
| rating | real | nullable | 1.0–5.0 editorial rating |
| external_links | jsonb | default '[]' | Array of {platform, url} objects |
| created_at | timestamptz | default now() | |
| updated_at | timestamptz | default now() | |

**Example `external_links`:**
```json
[
  {"platform": "Amazon", "url": "https://amazon.com/..."},
  {"platform": "Goodreads", "url": "https://goodreads.com/..."}
]
```

**Indexes:** `entity_type`, `title`

---

#### `timeline_entities`
Junction table linking entities to specific timelines, with per-timeline context.

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | uuid | PK | |
| timeline_id | uuid | FK → timelines, on delete cascade | |
| entity_id | uuid | FK → entities, on delete cascade | |
| context_line | text | not null | Per-timeline "why this matters here" |
| description_line | text | nullable | Short description shown in the list card |
| sort_order | integer | default 0 | Editorial priority order within the list |
| created_at | timestamptz | default now() | |

**Unique:** `(timeline_id, entity_id)`

---

#### `bookmarked_timelines`

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | uuid | PK | |
| user_id | uuid | FK → profiles, on delete cascade | |
| timeline_id | uuid | FK → timelines, on delete cascade | |
| created_at | timestamptz | default now() | |

**Unique:** `(user_id, timeline_id)`

---

#### `bookmarked_events`

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | uuid | PK | |
| user_id | uuid | FK → profiles, on delete cascade | |
| event_id | uuid | FK → events, on delete cascade | |
| created_at | timestamptz | default now() | |

**Unique:** `(user_id, event_id)`

---

#### `content_flags`

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | uuid | PK | |
| user_id | uuid | FK → profiles | |
| flagged_type | text | not null | 'timeline' or 'event' |
| flagged_id | uuid | not null | ID of the timeline or event |
| flag_type | text | not null | 'missing_context', 'single_perspective', 'factual_dispute', 'outdated', 'missing_voices', 'inappropriate' |
| note | text | nullable | User's explanation |
| status | text | default 'open' | 'open', 'resolved', 'dismissed', 'escalated' |
| resolved_at | timestamptz | nullable | |
| created_at | timestamptz | default now() | |

---

#### `home_sections`

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | uuid | PK | |
| title | text | not null | "Trending", "Staff Picks", etc. |
| sort_order | integer | not null | |
| is_visible | boolean | default true | |
| created_at | timestamptz | default now() | |

---

#### `home_section_timelines`

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | uuid | PK | |
| section_id | uuid | FK → home_sections, on delete cascade | |
| timeline_id | uuid | FK → timelines, on delete cascade | |
| sort_order | integer | not null | |
| is_pinned | boolean | default false | |

**Unique:** `(section_id, timeline_id)`

---

#### `affiliate_clicks`

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | uuid | PK | |
| entity_id | uuid | FK → entities | |
| timeline_id | uuid | FK → timelines | |
| user_id | uuid | nullable | Anonymized or null for guests |
| platform | text | not null | "Amazon", "Spotify", etc. |
| clicked_at | timestamptz | default now() | |

---

### 1.3 Row-Level Security (RLS) Summary

| Table | Public (anon) | Authenticated (user) | Admin |
|-------|---------------|---------------------|-------|
| timelines | SELECT where status = 'published' | + own drafts | Full CRUD |
| events | SELECT where timeline is published | Same | Full CRUD |
| event_bullets | SELECT where event's timeline is published | Same | Full CRUD |
| entities | SELECT | SELECT | Full CRUD |
| timeline_entities | SELECT | SELECT | Full CRUD |
| profiles | SELECT own | UPDATE own | Full CRUD |
| bookmarked_* | — | CRUD own | Read all |
| content_flags | — | INSERT own | Full CRUD |
| home_sections | SELECT visible | SELECT visible | Full CRUD |
| connections | SELECT where timeline is published | Same | Full CRUD |
| affiliate_clicks | — | INSERT | Read all |

---

## 2. API Routes (Next.js App Router)

All routes use the `/app` directory convention. API routes handle data mutations; server components handle reads where possible.

### 2.1 Public API (Consumer)

```
GET  /api/timelines                     → List published timelines (with tag filters)
     ?tags=tragic,inspiring             → Filter by tag values
GET  /api/timelines/[slug]              → Single timeline with metadata + theme
GET  /api/timelines/[slug]/events       → All events for a timeline (ordered), includes event_bullets
GET  /api/timelines/[slug]/entities     → All entities grouped by type (book/podcast/movie)
GET  /api/timelines/[slug]/connections  → All causal connections (P1)
GET  /api/search                        → Search across timelines, events, entities
     ?q=ottoman                         → Query string
GET  /api/home                          → Home screen: landing page data + total timeline count
POST /api/affiliate-click               → Log an affiliate CTA click
```

### 2.2 Authenticated API (User)

```
GET    /api/me                          → Current user profile
PATCH  /api/me                          → Update profile
GET    /api/me/bookmarks/timelines      → User's bookmarked timelines
POST   /api/me/bookmarks/timelines      → Bookmark a timeline
DELETE /api/me/bookmarks/timelines/[id] → Remove bookmark
GET    /api/me/bookmarks/events         → User's bookmarked events
POST   /api/me/bookmarks/events         → Bookmark an event
DELETE /api/me/bookmarks/events/[id]    → Remove bookmark
POST   /api/flags                       → Submit a content flag
```

### 2.3 Admin API

All admin routes check `profile.role === 'admin'` via middleware.

```
# Timelines
GET    /api/admin/timelines             → All timelines (any status)
POST   /api/admin/timelines             → Create timeline
PATCH  /api/admin/timelines/[id]        → Update timeline (metadata, theme, status)
DELETE /api/admin/timelines/[id]        → Archive/delete timeline
PATCH  /api/admin/timelines/[id]/status → Change status (publish, unpublish, archive)

# Events
GET    /api/admin/timelines/[id]/events       → All events for admin editing
POST   /api/admin/timelines/[id]/events       → Create event
PATCH  /api/admin/events/[id]                 → Update event
DELETE /api/admin/events/[id]                 → Delete event
PATCH  /api/admin/events/reorder              → Bulk reorder events

# Event Bullets (Deep Dive content)
GET    /api/admin/events/[id]/bullets         → All bullets for an event
POST   /api/admin/events/[id]/bullets         → Add bullet
PATCH  /api/admin/event-bullets/[id]          → Edit bullet
DELETE /api/admin/event-bullets/[id]          → Delete bullet
PATCH  /api/admin/events/[id]/bullets/reorder → Reorder bullets

# Event Images (inline in Deep Dive)
POST   /api/admin/events/[id]/images          → Upload event image
PATCH  /api/admin/event-images/[id]           → Update label/caption
DELETE /api/admin/event-images/[id]           → Remove image

# Event Entity References
POST   /api/admin/events/[id]/refs            → Add person/place reference
PATCH  /api/admin/event-refs/[id]             → Edit reference
DELETE /api/admin/event-refs/[id]             → Remove reference

# Connections (P1)
POST   /api/admin/timelines/[id]/connections  → Create connection
PATCH  /api/admin/connections/[id]            → Edit connection
DELETE /api/admin/connections/[id]            → Delete connection

# Entities (global library)
GET    /api/admin/entities                    → All entities (filterable by type)
POST   /api/admin/entities                    → Create entity
PATCH  /api/admin/entities/[id]               → Update entity
DELETE /api/admin/entities/[id]               → Delete entity (with cascade warning)
POST   /api/admin/entities/import             → Bulk CSV import

# Timeline ↔ Entity linking
POST   /api/admin/timelines/[id]/entities     → Link entity to timeline
PATCH  /api/admin/timeline-entities/[id]      → Update context/description/sort
DELETE /api/admin/timeline-entities/[id]      → Unlink entity from timeline

# Home Screen
GET    /api/admin/home-sections               → All sections with timelines
POST   /api/admin/home-sections               → Create section
PATCH  /api/admin/home-sections/[id]          → Update section
DELETE /api/admin/home-sections/[id]          → Delete section
POST   /api/admin/home-sections/[id]/timelines → Add timeline to section
PATCH  /api/admin/home-sections/[id]/reorder  → Reorder timelines in section

# Tags
POST   /api/admin/timelines/[id]/tags        → Add tag to timeline
DELETE /api/admin/timeline-tags/[id]          → Remove tag

# Flags
GET    /api/admin/flags                       → All flags (filterable)
PATCH  /api/admin/flags/[id]                  → Update flag status

# Dashboard
GET    /api/admin/dashboard                   → Aggregate stats

# Image upload
POST   /api/admin/upload                      → Upload image to Supabase storage
```

---

## 3. Component Architecture

Components are named to match the Design System v2 sections. CSS token references (e.g., `color-primary`, `color-accent-yellow`) map to the design system color table.

### 3.1 Shared / Primitive Components

```
components/
  ui/
    BottomSheet.tsx          → Reusable bottom sheet (peek at ~40%, expand to ~80% on scroll-up,
                               dismiss on swipe-down/overlay tap). Drag handle always visible.
                               Design system §5.9, §5.12.
    BottomActionBar.tsx      → Sticky bar at bottom of ALL sheets: "CLOSE READER" (left) +
                               "EXPLORE THIS ERA" (right, filled pill). Design system §5.11.
    PillBar.tsx              → Horizontal scrollable pill bar. Shared between entity pills and
                               filter pills. White default, yellow (#FFCC00) when active.
                               Active filter pills show × to clear. Design system §5.3.
    TimelineCard.tsx         → Browse card: image with gradient overlay, date pill, title,
                               description area with "VIEW TIMELINE →". Design system §5.2.
    Badge.tsx                → Small label (date pill on browse card, tag labels)
    SearchBar.tsx            → Pill-shaped, magnifying glass icon, debounced 300ms.
                               Design system §5.4.
    BookmarkButton.tsx       → Toggle bookmark (heart/ribbon icon)
    ShareButton.tsx          → Triggers native share sheet
    SkeletonCard.tsx         → Loading placeholder (browse cards, entity cards)
    EmptyState.tsx           → "No results" / "Nothing here yet"
    ScrollToTop.tsx          → 48px circle button, #E8E8E6, bottom-LEFT.
                               Design system §5.7.
```

### 3.2 Consumer Feature Components

```
components/
  timeline/
    TimelineHeader.tsx       → Full-width hero image + gradient overlay + title + subtitle.
                               Design system §5.5. Newsreader SemiBold 48px white.
    EntityPillBar.tsx        → Books | Podcasts | Movies pills. Sticky below header.
                               Tapping opens EntityListSheet. Design system §5.6.
    TimelineSpine.tsx        → Vertical 3px line, rgba(125,31,0,0.2), 23px from left edge.
                               Design system §5.7.
    EventCardBroad.tsx       → Broad period event: right-aligned date (Newsreader 36px),
                               title, card with image (desaturated) + body + "EXPAND DETAILS →".
                               Design system §5.8.
    EventCardSpecific.tsx    → Specific event: left-aligned date (Newsreader 24px),
                               title, card with body only + "EXPAND DETAILS →".
                               Design system §5.8.
    EventNode.tsx            → Circular dot on spine, marks each event position.
    EraHeader.tsx            → Section divider for era groupings.
    CausalLink.tsx           → (P1) Visual connection line/arrow between events.
    ConnectionTooltip.tsx    → (P1) Mini-card on connection tap.

  bottom-sheet/
    EventDetailSheet.tsx     → "DEEP DIVE" sheet content. §5.12.
                               Structure: drag handle → "DEEP DIVE" label → event title
                               (Newsreader 28px) → BulletList → InlineImage → BottomActionBar.
    BulletList.tsx           → Ordered list of yellow (#FFCC00) 24px dots with text blocks.
                               Manrope Regular 16px, 28px line-height. 32px gap between items.
    BulletItem.tsx           → Single dot + text block.
    InlineImage.tsx          → Full-width image (16px radius) + context label
                               (Manrope Bold 10px uppercase, #7D1F01) + caption.
    EntityListSheet.tsx      → Sheet content for entity pill tap. §5.9.
                               Structure: drag handle → section title (Newsreader 28px)
                               → scrollable EntityCard list → BottomActionBar.
    EntityDetailSheet.tsx    → Single entity detail view within list sheet.
                               Slides in from list. Back arrow returns to list.
    ConnectionsSection.tsx   → (P1) "Caused by" / "Led to" within event detail.

  entity/
    EntityCard.tsx           → Horizontal card in entity list: cover image (120px wide,
                               12px radius) + title + creator + description line.
                               Design system §5.10.
    PersonRef.tsx            → Inline person reference (name, role, context) in event detail.
    PlaceRef.tsx             → Inline place reference (name, location, context).
    AffiliateCTA.tsx         → External link button with tracking. Opens external browser.

  home/
    LandingPage.tsx          → Full-screen landing: hero collage + title (Philosopher 48px)
                               + tagline + "Total Timelines: N" + EXPLORE CTA. Design system §6.
    BrowsePage.tsx           → Search bar + filter pills + timeline card feed.
    FilterPills.tsx          → Tragic | Inspiring | Chill | Recent.
                               Active: yellow + ×. Inactive: white.

  search/
    SearchResults.tsx        → Grouped results (Timelines, Events, People, Places)
    SearchResultItem.tsx     → Single result row

  auth/
    AuthModal.tsx            → Sign in / sign up modal
    GuestPrompt.tsx          → "Sign up to save" prompt
```

### 3.3 Admin Components

```
components/
  admin/
    AdminLayout.tsx          → Sidebar nav + header for all admin pages
    AdminSidebar.tsx         → Nav: Dashboard, Timelines, Entities, Home Screen, Flags

    dashboard/
      StatCard.tsx           → Single metric display
      ContentSummary.tsx     → Timelines by status, entity counts

    timeline-editor/
      TimelineForm.tsx       → Create/edit timeline metadata
      ThemeEditor.tsx        → Background, colors, gradient, header style + live preview
      StatusControl.tsx      → Draft/Published/Unlisted/Archived toggle
      TagManager.tsx         → Add/remove filter tags (Tragic, Inspiring, etc.)
      EventList.tsx          → Sortable list of events (drag to reorder)
      EventForm.tsx          → Create/edit event — includes event_type toggle (broad/specific)
      BulletEditor.tsx       → Add/edit/reorder bullet content blocks for event detail
      EventImageUploader.tsx → Upload inline images with context label + caption
      SourceForm.tsx         → Add/edit citation
      EntityRefForm.tsx      → Add/edit person or place reference

    entity-editor/
      EntityLibrary.tsx      → Global entity list with search, filter by type
      EntityForm.tsx         → Create/edit entity (adapts fields by type)
      EntityLinker.tsx       → Link existing entity to timeline (with context + description lines)
      BulkImport.tsx         → CSV upload, column mapping, preview, confirm
      DuplicateDetector.tsx  → Shows potential duplicates during create/import

    home-editor/
      SectionManager.tsx     → Create, reorder, toggle visibility of home sections
      SectionTimelines.tsx   → Add/reorder/pin timelines within a section

    flags/
      FlagQueue.tsx          → Filterable list of open flags
      FlagDetail.tsx         → Single flag with context + action buttons

    shared/
      ImageUploader.tsx      → Reusable upload component
      RichTextInput.tsx      → Basic rich text (bold, italic, links)
      ConfirmModal.tsx       → "Are you sure?" for destructive actions
      CSVPreview.tsx         → Table preview of parsed CSV before import
```

---

## 4. File/Folder Structure (Next.js App Router)

```
that-one-time/
├── .env.local
├── next.config.js
├── tailwind.config.js
├── package.json
├── tsconfig.json
│
├── supabase/
│   ├── migrations/
│   │   ├── 001_profiles.sql
│   │   ├── 002_timelines.sql
│   │   ├── 003_events.sql
│   │   ├── 004_event_bullets.sql
│   │   ├── 005_entities.sql
│   │   ├── 006_connections.sql
│   │   ├── 007_bookmarks.sql
│   │   ├── 008_flags.sql
│   │   ├── 009_home_sections.sql
│   │   ├── 010_affiliate_clicks.sql
│   │   └── 011_rls_policies.sql
│   ├── seed.sql
│   └── types.ts
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   ├── admin.ts
│   │   └── middleware.ts
│   ├── utils/
│   │   ├── slugify.ts
│   │   ├── date-helpers.ts
│   │   ├── affiliate.ts
│   │   └── csv-parser.ts
│   ├── hooks/
│   │   ├── useBottomSheet.ts
│   │   ├── useBookmark.ts
│   │   ├── useSearch.ts
│   │   ├── useSwipeNavigation.ts
│   │   └── useIntersection.ts
│   └── types/
│       ├── timeline.ts
│       ├── event.ts
│       ├── entity.ts
│       └── admin.ts
│
├── app/
│   ├── layout.tsx                        # Root layout (fonts, theme provider, auth)
│   ├── page.tsx                          # Landing page (Philosopher title, EXPLORE CTA)
│   ├── loading.tsx
│   │
│   ├── browse/
│   │   └── page.tsx                      # Browse/search page (search bar + filter pills + cards)
│   │
│   ├── timeline/
│   │   └── [slug]/
│   │       ├── page.tsx                  # Timeline view (SSR for SEO)
│   │       ├── loading.tsx
│   │       └── opengraph-image.tsx       # Dynamic OG image for social sharing
│   │
│   ├── search/
│   │   └── page.tsx                      # Dedicated search results page
│   │
│   ├── auth/
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── callback/route.ts
│   │
│   ├── profile/
│   │   ├── page.tsx
│   │   └── bookmarks/page.tsx
│   │
│   ├── admin/
│   │   ├── layout.tsx
│   │   ├── page.tsx                      # Dashboard
│   │   ├── timelines/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/
│   │   │       ├── page.tsx              # Edit timeline (metadata + theme)
│   │   │       ├── events/page.tsx
│   │   │       ├── entities/page.tsx
│   │   │       └── connections/page.tsx  # (P1)
│   │   ├── entities/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   ├── import/page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── home/
│   │   │   └── page.tsx
│   │   └── flags/
│   │       └── page.tsx
│   │
│   └── api/
│       ├── timelines/route.ts
│       ├── timelines/[slug]/
│       │   ├── route.ts
│       │   ├── events/route.ts
│       │   ├── entities/route.ts
│       │   └── connections/route.ts
│       ├── search/route.ts
│       ├── home/route.ts
│       ├── me/route.ts
│       ├── me/bookmarks/...
│       ├── flags/route.ts
│       ├── affiliate-click/route.ts
│       └── admin/...
│
├── components/                           # (structure per Section 3)
│
├── public/
│   ├── fonts/
│   │   ├── Philosopher-Bold.woff2
│   │   ├── Newsreader-SemiBoldItalic.woff2
│   │   ├── Newsreader-Regular.woff2
│   │   ├── WorkSans-Bold.woff2
│   │   ├── Manrope-Regular.woff2
│   │   ├── Manrope-Light.woff2
│   │   └── Manrope-Bold.woff2
│   ├── icons/
│   ├── og-default.png
│   └── manifest.json
│
└── styles/
    └── globals.css                       # Tailwind base + design system CSS variables
```

---

## 5. Build Order

Consumer first, admin second. Seed data via Supabase dashboard for Sprints 1–4.

### Sprint 0: Foundation (Week 1)

- [ ] Initialize Next.js project with TypeScript, Tailwind, ESLint
- [ ] Set up Supabase project (database, auth, storage buckets)
- [ ] Write and run all SQL migrations
- [ ] Generate Supabase TypeScript types
- [ ] Configure Supabase clients (browser, server, admin)
- [ ] Set up auth (email + Google/Apple)
- [ ] Load all custom fonts (Philosopher, Newsreader, Work Sans, Manrope)
- [ ] Set up design system CSS variables in globals.css (all color tokens, gradients, spacing)
- [ ] Build root layout with font loading and auth provider
- [ ] Deploy empty shell to Vercel, confirm pipeline works
- [ ] Seed database with 1 sample timeline ("Palestine and Israel"), 5 events (3 broad, 2 specific), 3 books, 2 podcasts, 1 movie via Supabase dashboard

### Sprint 1: Consumer — Landing + Browse (Weeks 2–3)
**Stories:** 1.1, 3.1, 3.2

- [ ] Landing page (hero collage, Philosopher title, tagline, "Total Timelines: N", EXPLORE CTA)
- [ ] Browse page with search bar (debounced, inline results)
- [ ] Filter pills: Tragic | Inspiring | Chill | Recent (yellow active + × clear)
- [ ] Timeline card feed (image + gradient, date pill, title, description, "VIEW TIMELINE →")
- [ ] Skeleton loading state for cards
- [ ] Navigation: Landing → Browse → Timeline

### Sprint 2: Consumer — Timeline View + Event Detail (Weeks 4–5)
**Stories:** 1.2, 1.3, 1.5

- [ ] Timeline page with hero header (full-width image + gradient + title + subtitle, SSR)
- [ ] Entity pill bar (Books | Podcasts | Movies) — sticky, not functional yet
- [ ] Timeline spine + event nodes
- [ ] EventCardBroad (image, desaturated, right-aligned date, "EXPAND DETAILS →")
- [ ] EventCardSpecific (no image, left-aligned date, "EXPAND DETAILS →")
- [ ] BottomSheet component (shared, reusable, peek ~40% → expand ~80% on scroll-up)
- [ ] EventDetailSheet ("DEEP DIVE" label, title, BulletList, InlineImage)
- [ ] BottomActionBar ("CLOSE READER" + "EXPLORE THIS ERA")
- [ ] Horizontal swipe between events with caret arrows
- [ ] Scroll-to-top button (bottom-left)
- [ ] Open Graph dynamic images for timeline pages (SEO)

### Sprint 3: Consumer — Entity Pills + Sheets (Week 6)
**Stories:** 2.1, 2.2, 2.3, 2.4, 2.5, 2.6

- [ ] Entity pill bar now functional — tapping opens EntityListSheet
- [ ] EntityListSheet (drag handle, section title, scrollable EntityCard list)
- [ ] EntityCard (cover image + title + creator + description line)
- [ ] Entity detail view within sheet (tap card → expand with full description + CTA)
- [ ] Back navigation within sheet (back arrow or swipe-right)
- [ ] Book detail with affiliate CTA
- [ ] Podcast detail with affiliate CTA
- [ ] Movie detail with streaming CTA
- [ ] Affiliate click tracking (POST on CTA tap)
- [ ] BottomActionBar shared across entity sheets

### Sprint 4: Consumer — Auth + Bookmarks (Week 7)
**Stories:** User account stories from user stories doc

- [ ] Login/signup pages (email + social)
- [ ] OAuth callback handling
- [ ] Guest browsing with signup prompts
- [ ] Bookmark events
- [ ] Bookmark timelines
- [ ] Profile/library page with bookmarked content

### Sprint 5: Admin CMS — Timelines + Events (Weeks 8–9)
**Stories:** Admin Epic 1 (1.1–1.5), Admin Epic 2 (2.1–2.4)

- [ ] Admin layout with sidebar, role check
- [ ] Dashboard with stat cards
- [ ] Timeline CRUD (create, edit, delete, status management)
- [ ] Theme editor (background, gradient, accent color) with live preview
- [ ] Tag manager (Tragic, Inspiring, Chill, Recent)
- [ ] Home section manager (create, reorder, pin timelines)
- [ ] Event CRUD (both broad and specific types)
- [ ] Bullet editor (add/edit/reorder Deep Dive content blocks)
- [ ] Event image uploader with context label + caption
- [ ] Event entity reference form (people/places)

### Sprint 6: Admin CMS — Entities + Moderation (Week 10)
**Stories:** Admin Epic 3 (3.1–3.7), Admin Epic 4 (4.1), Admin Epic 5 (5.1)

- [ ] Global entity library (search, filter by type)
- [ ] Entity CRUD (adapts by type: book/podcast/movie)
- [ ] Entity linker (link to timeline with context + description lines)
- [ ] Bulk CSV import
- [ ] Image upload and management
- [ ] Content dashboard with real stats
- [ ] Flag review queue (if flagging is built on consumer side)

### Sprint 7: Polish + Launch (Weeks 11–12)

- [ ] PWA manifest + service worker
- [ ] Responsive QA across device sizes
- [ ] Performance audit (Lighthouse, Core Web Vitals)
- [ ] SEO: meta tags, structured data (JSON-LD), sitemap.xml
- [ ] Error boundaries and 404/500 pages
- [ ] Analytics integration (Plausible or PostHog)
- [ ] Populate 3–5 flagship timelines with full content
- [ ] Final Vercel production deployment

---

## 6. Environment Setup

### 6.1 Environment Variables (.env.local)

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
AMAZON_AFFILIATE_TAG=thatonetime-20
```

### 6.2 Dependencies

```json
{
  "dependencies": {
    "next": "^14",
    "@supabase/supabase-js": "^2",
    "@supabase/ssr": "^0.1",
    "tailwindcss": "^3",
    "framer-motion": "^11",
    "lucide-react": "^0.383",
    "papaparse": "^5",
    "zustand": "^4",
    "date-fns": "^3",
    "@dnd-kit/core": "^6",
    "@dnd-kit/sortable": "^8"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/react": "^18",
    "eslint": "^8",
    "eslint-config-next": "^14",
    "supabase": "^1"
  }
}
```

| Package | Purpose |
|---------|---------|
| framer-motion | Bottom sheet gestures, page transitions, swipe navigation |
| lucide-react | Icon library (hamburger, caret, search, bookmark) |
| papaparse | CSV parsing for bulk entity import |
| zustand | Lightweight state management (bottom sheet state, active filters) |
| date-fns | Date formatting and comparison |
| @dnd-kit | Drag-and-drop for admin event reordering, home section management |
| supabase (dev) | CLI for migrations, type generation, local development |

---

## 7. Conventions

### 7.1 Code Conventions

- **TypeScript strict mode** — no `any` types
- **Server Components by default** — use `'use client'` only for interactivity (bottom sheets, forms, filters, pills)
- **Data fetching in Server Components** — use Supabase server client
- **Mutations via API routes** — all writes go through `/api/`
- **Optimistic updates** for bookmarks — update UI immediately, sync in background
- **File naming:** `kebab-case` for files, `PascalCase` for components, `camelCase` for functions/variables

### 7.2 Styling Conventions

- **Tailwind only** — no CSS modules, no styled-components
- **CSS variables** for design system tokens — defined in `globals.css`, consumed everywhere:
  ```css
  :root {
    --color-primary: #7D1F01;
    --color-primary-dark: #6B0109;
    --color-accent-yellow: #FFCC00;
    --color-background: #F6F6F6;
    --color-surface: #FFFFFF;
    --color-text-primary: #0A0A0A;
    --color-text-secondary: #1A1C1B;
    --color-text-body: #58413F;
    --color-divider: rgba(125, 31, 0, 0.2);
    --color-node: #E8E8E6;
    --color-cta-dark: #5A1A00;
    --font-display: 'Philosopher', serif;
    --font-date: 'Newsreader', serif;
    --font-heading: 'Work Sans', sans-serif;
    --font-body: 'Manrope', sans-serif;
  }
  ```
- **Mobile-first** — design for 390px width, scale up
- **Touch targets** — minimum 44x44px for all interactive elements
- **Animation budget** — bottom sheet transitions < 300ms, page transitions < 200ms
- **Border radius values:** 48px (event cards), 28px (browse cards), 24px (bottom sheets), 20px (entity cards), 16px (inline images), 12px (entity card images), 44px (pills, CTAs)

### 7.3 Data Conventions

- **UUIDs** for all primary keys
- **Slugs** for public URLs (`/timeline/palestine-and-israel`)
- **Soft delete** — archive, don't destroy
- **Denormalized counts** — `event_count` on timelines updated via trigger or on save
- **All timestamps in UTC** — format for display in client

### 7.4 Route Conventions

- `/` — Landing page
- `/browse` — Browse/search page with filter pills and timeline cards
- `/timeline/[slug]` — Public timeline page (SSR, SEO-indexed)
- `/admin/*` — Admin pages (role-protected)
- `/api/admin/*` — Admin API routes (service role client)
- `/api/*` — Public/authenticated API routes

### 7.5 Design System Cross-Reference

Every component in Section 3 references the corresponding Design System v2 section (§ number). When building, always consult the design system for exact pixel values, colors, fonts, and spacing. The design system is the visual source of truth; this spec is the structural source of truth.
