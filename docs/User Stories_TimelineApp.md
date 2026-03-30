# Product Spec: Timeline App — User Stories Reference

> **Purpose:** This document is a structured reference for an AI assistant helping build this application. It covers all consumer and admin user stories, organized by epic and priority. Use this to understand intended behavior, UI patterns, and feature scope.

---

## Scope Overview

| Layer | Epics | Stories | Priority |
|---|---|---|---|
| **Consumer** | Timeline Browsing, Entity Layers, Search & Discovery, Sharing, Monetization | ~22 | P0–P3 |
| **Admin** | Timeline Mgmt, Event Mgmt, Entity Content Mgmt, Visual Assets, Moderation | ~29 | P0–P1 |

**MVP = P0 + P1 (approx. 45 stories)**

- **Consumer MVP:** Browse → explore → deep dive, entity pills (books/podcasts/movies), causal connections, search/filter, user accounts
- **Admin MVP:** Full CMS for timelines, events, entities, visual theming, moderation, content dashboard
- Admin UX priority: functional over polished. Consumer UX priority: polished.

---

## Consumer Stories

### Epic 1: Timeline Browsing
*Core interaction loop: land → pick timeline → scroll events → tap for detail*

---

#### 1.1 Browse Timeline Catalog
**As a user** landing on the app, I want to see a curated collection of timeline cards so I can find something interesting.

**Acceptance Criteria:**
- "Explore" CTA on landing screen leads to the browse/search screen
- Scrollable feed of timeline cards; each shows: title, time span, cover image, brief description
- Type-ahead search bar at the top (see Epic 3)
- Horizontal scrollable category filter pills: `Tragic` | `Inspiring` | `Chill` | `Recent`
- Tapping a card navigates to the full timeline view
- Skeleton cards shown as loading state

---

#### 1.2 View Timeline
**As a user** who selected a timeline, I want a vertically scrollable, chronological event list so I can follow the story.

**Acceptance Criteria:**
- Vertical event list with a visible spine/connector; each event connects via a circular node
- **Broad-period events** (e.g., "British Mandate Period"): card shows year range, title, 4–5 line preview, small image, "expand details" button with caret arrow
- **Specific events** (e.g., "Balfour Declaration signed"): text only — no image, same "expand details" button
- Events grouped by era/phase with section headers
- **Timeline header:** full-width image with title, time span, and 200–400 word editorial intro overlaid with a readable gradient
- **Entity pills** (Books, Podcasts, Movies) appear below the header, above the event list — sticky while scrolling
- Scroll position indicator shows progress through the timeline
- Sticky "↑" caret button (bottom-left, non-invasive) to jump back to top

---

#### 1.3 View Event Detail — Peek State
**As a user** who taps an event, I want a bottom sheet with the full detail so I can read context and see visuals.

**Acceptance Criteria:**
- Tapping event triggers bottom sheet sliding up to ~40% screen height
- Scrolling up within sheet expands it to ~80%
- Sheet content: `"Deep dive: [event title]"` header → bulleted notes (stylized to match app) → occasional images inline
- Scroll position indicator within sheet
- Timeline behind sheet: visible but dimmed
- Dismiss: swipe down, tap outside (dimmed area), or drag handle
- Drag handle at top of sheet signals swipe affordance
- Transition: smooth, < 300ms

---

#### 1.5 Navigate Between Events
**As a user** viewing event detail, I want to swipe left/right to move to adjacent events without closing the sheet.

**Acceptance Criteria:**
- Horizontal swipe on bottom sheet content navigates to prev/next event
- Small caret arrows in bottom-left and bottom-right corners of sheet indicate this
- First event: no left caret. Last event: no right caret
- Sheet stays open at current height during navigation
- Event content slides in with animation
- Timeline scroll position updates to highlight new active event (still dimmed)
- Edge events show subtle bounce to indicate no further events

---

### Epic 2: Entity Layers
*Media and knowledge connected to the timeline. Pills open bottom sheets — they do not filter the event list.*

---

#### 2.1 Timeline-Level Entity Pills
**As a user** viewing a timeline, I want tappable pills (Books, Podcasts, Movies) so I can access all related media.

**Acceptance Criteria:**
- Horizontal pill row: `Books` | `Podcasts` | `Movies` — below header, above event list, sticky while scrolling
- Default style: white. Selected style: yellow (app's secondary primary color)
- Each pill shows a count badge (e.g., `Books (7)`)
- Tapping opens a bottom sheet — does NOT filter the event list
- If a timeline has zero items for an entity type, that pill is hidden or visually disabled
- Dismissing the sheet returns to normal timeline view with no state change

---

#### 2.2 Entity List Bottom Sheet — Peek State
**As a user** who tapped an entity pill, I want a scrollable list of related items so I can browse without leaving the timeline.

**Acceptance Criteria:**
- Bottom sheet slides to ~40% (same animation pattern as event detail)
- Header: entity type label + count (e.g., `Books · 7`)
- Each item card: title, creator (author/host/director), description line
- Scrollable list with scroll bar for position
- Dismiss: tap overlay or swipe down

---

#### 2.3 Entity List — Item Detail
**As a user** browsing the entity list, I want to tap an item to see its full detail and decide whether to engage.

**Acceptance Criteria:**
- Tapping an item transitions (slides) to a detail view within the sheet
- Detail view: title, creator, full description, rating (if available), CTA button
- CTA opens external affiliate-tagged link in external browser (not in-app webview)
- Back navigation: back arrow, swipe-right, or "← back to full list" caret button (bottom-left)
- Swipe down from list view dismisses the entire sheet

---

#### 2.4 Books Entity Card

**Acceptance Criteria:**
- List card: book cover image, title, author, description line
- Detail view: title, author, description, community/editorial rating, CTA
- CTAs: `"View on Goodreads"` or `"View on Amazon"` (affiliate-tagged)

---

#### 2.5 Podcasts Entity Card

**Acceptance Criteria:**
- List card: podcast image, title, host, description line
- Detail view: episode/show name, host, guest (if applicable), duration, full description, CTA
- CTAs: `"Listen on Spotify"` / `"Listen on Apple Podcasts"` (affiliate-tagged)

---

#### 2.6 Movies Entity Card

**Acceptance Criteria:**
- List card: movie poster, title, director, description line
- Detail view: title, director, year, runtime, full description, CTA
- CTA: `"Watch on [platform]"` — prioritize actual availability (Netflix first; rental fallback to Apple TV / Amazon)
- Scope includes both narrative films and documentaries

---

#### 2.7 Event-Level Entity References
**As a user** reading an expanded event, I want to see key people and places mentioned in that event.

**Acceptance Criteria:**
- Expanded event detail includes optional `Key Figures` and/or `Key Places` sections
- People: name, title/role, 1-sentence contextual relevance
- Places: name, location, 1-sentence contextual relevance
- Inline within the event detail — not a bottom sheet
- Not required for every event — editorial judgment applies

---

### Epic 3: Search & Discovery

---

#### 3.1 Search Bar
**As a user**, I want to search by keyword to find timelines, events, or people directly.

**Acceptance Criteria:**
- Search bar at top of browse/search screen, above timeline list and filter pills
- Returns results across: timelines, events, entities (including people and places)
- Type-ahead results, debounced (300ms delay)
- Empty state: suggests most recent additions
- Minimum query length: 2 characters

---

#### 3.2 Category Filter
**As a user** browsing the home screen, I want to filter timelines by category.

**Acceptance Criteria:**
- Horizontal scrollable filter pills: `Tragic` | `Inspiring` | `Chill` | `Recent`
- Default: white. Active: yellow + `×` to clear
- Selecting a pill filters the timeline card feed
- Tapping an active pill clears the filter and returns pill to white
- Filter persists until changed or cleared

---

### Epic 4: Sharing & Virality

---

#### 4.1 Share Timeline
**As a user**, I want to share a specific timeline with context so friends can jump to it.

**Acceptance Criteria:**
- Share button on timeline page
- Shared content includes: timeline title, date range, 1-sentence summary, cover image
- Deep link opens app (or web fallback) to that specific timeline

---

### Epic 5: Monetization Infrastructure *(P3)*

---

#### 5.1 Affiliate Link Tracking

**Acceptance Criteria:**
- All external entity CTAs are affiliate-tagged
- Click events logged: entity ID, timeline ID, user ID (anonymized), entity type, timestamp
- Dashboard tracks: total clicks, CTR by entity type, estimated commission revenue
- Links open in external browser for proper attribution

---

---

## Admin Stories

> Admin UX philosophy: functional and fast-moving. No need to be beautiful — polish lives on the consumer side.

---

### Epic 1: Admin — Timeline Management

---

#### 1.1 Create Timeline
**As the platform owner**, I want to create timelines with full editorial controls.

**Acceptance Criteria:**
- Admin timeline editor is a separate interface from the consumer app
- **Required fields:** title, subtitle, editorial intro (200–400 words), time span (start/end), filter/category tags, cover image
- **Optional fields:** scope note, perspective tags (epistemological lens + geographic standpoint), contributor credits
- New timelines default to `Draft` status (not visible to users)
- Auto-save with version history and ability to revert

---

#### 1.2 Edit Timeline Metadata
**As the platform owner**, I want to update any timeline metadata post-creation.

**Acceptance Criteria:**
- All creation fields (1.1) are editable post-creation
- Metadata edits to published timelines go live immediately (no separate re-publish step)
- Edit history logged with timestamps
- Preview before going live

---

#### 1.3 Timeline Visual Theming
**As the platform owner**, I want to customize each timeline's visual appearance for a distinct editorial feel.

**Acceptance Criteria:**
- Theme editor accessible from the admin timeline editor
- **Configurable properties:**
  - Background color (hex picker or preset palette)
  - Background image (upload or URL, with opacity/overlay controls)
  - Accent color (used for spine, pill highlights, link colors)
  - Header style (light-on-dark or dark-on-light — auto-detected from background)
  - Card style (event card background color/opacity)
- Live preview of changes on the actual timeline
- Default theme applied when no customization is set
- Theme settings are per-timeline (not global)
- Background images auto-compressed/optimized on upload for mobile

---

#### 1.4 Manage Timeline Status
**As the platform owner**, I want to control publication status of each timeline.

**Statuses:**
| Status | Behavior |
|---|---|
| `Draft` | Not visible to users |
| `Published` | Live and discoverable |
| `Unlisted` | Accessible via direct link; not in search/home feed |
| `Archived` | Hidden but preserved for records |

**Acceptance Criteria:**
- Status changes are logged with timestamps
- Bulk status change supported (e.g., publish 5 timelines at once)
- Scheduled publishing (future date/time) — P1, not required for MVP

---

#### 1.5 Reorder & Organize Timelines
**As the platform owner**, I want to control the order and grouping of timelines on the home screen.

**Acceptance Criteria:**
- Admin interface for managing home screen sections
- Drag-to-reorder timelines within sections
- Create, rename, reorder, and delete sections
- Pin option to keep a timeline at top of a section regardless of algorithm/recency
- Changes reflected immediately for users

---

### Epic 2: Admin — Event Management

---

#### 2.1 Create Event
**As the platform owner**, I want to add events to a timeline with full editorial detail.

**Acceptance Criteria:**
- **Event fields:** date (exact, month/year, year, or range), title, short preview (1 line for timeline view), full summary (150–300 words), "why this matters here" context line, images/visuals (with caption + credit), source citations (title, URL, source type tag), category tags, vibe tags
- Events created within the context of a specific timeline
- Manual reorder or chronological sort (with editorial override)
- Rich text editor for summary (bold, italic, links — not full WYSIWYG)
- Drag-and-drop image upload

---

#### 2.2 Edit Event
**As the platform owner**, I want to update any field on an existing event.

**Acceptance Criteria:**
- All creation fields (2.1) are editable
- Edit history logged with timestamps and previous values
- Edits to published events go live immediately

---

#### 2.3 Delete / Archive Event
**As the platform owner**, I want to remove or archive events.

**Acceptance Criteria:**
- Delete: permanent removal from the timeline
- Archive: hidden from public view, preserved in admin
- Deleting an event with causal connections triggers a warning listing affected connections
- Bulk delete/archive supported

---

#### 2.4 Manage Event-Level Entity References
**As the platform owner**, I want to attach key people and places to specific events.

**Acceptance Criteria:**
- Within event editor: add people references (name, role/title, 1-sentence context) and place references (name, location, 1-sentence context)
- Autocomplete/search against existing entity references across all timelines (prevent duplicates)
- Ability to reorder, edit, and remove references per event

---

### Epic 3: Admin — Entity Content Management

*How books, podcasts, and movies get onto the platform and are maintained.*

---

#### 3.1 Add Book to Timeline

**Acceptance Criteria:**
- **Fields:** title, author, description, cover image (upload or URL), external link (Amazon/Goodreads), editorial rating (1–5)
- Search/autocomplete against existing books in the platform DB — reuse metadata instead of re-entering
- Reorder books within the list (editorial priority, not alphabetical)
- Books appear in the Books pill immediately after save (if timeline is published)

---

#### 3.2 Add Podcast to Timeline

**Acceptance Criteria:**
- **Fields:** show name, episode name (if specific), host, guest (if applicable), duration, "why this matters here" (required), description, external link (Spotify/Apple Podcasts), rating
- Search/autocomplete against existing podcasts in platform DB
- Reorder within list

---

#### 3.3 Add Movie to Timeline

**Acceptance Criteria:**
- **Fields:** title, director, year, runtime, "why this matters here" (required), description, poster image (upload or URL), streaming availability (platform + link, multiple supported), rating
- Search/autocomplete against existing movies in platform DB
- Includes both narrative films and documentaries
- Reorder within list

---

#### 3.4 Bulk Import Entities

**Acceptance Criteria:**
- CSV import for books, podcasts, or movies
- **Books CSV columns:** title, author, description, link, rating
- Preview parsed items before confirming import
- Column mapping UI (in case headers don't match exactly)
- "Why this matters here" is required per item — prompt to fill if missing from CSV
- Error handling for missing required fields and duplicate detection
- Import assigns items to a specific timeline

---

#### 3.5 Edit Entity Item

**Acceptance Criteria:**
- All entity fields editable post-creation
- Editing a shared entity (used on multiple timelines) shows: `"This item appears on X timelines. Changes will affect all of them."`
- Exception: "why this matters here" is per-timeline and editable independently
- Edit history logged

---

#### 3.6 Remove Entity Item from Timeline

**Acceptance Criteria:**
- Remove = disassociate from this timeline only (does not delete from platform DB)
- "Delete from platform" option available (with warning if linked to other timelines)
- Entity pill count badge updates automatically after removal

---

#### 3.7 Entity Library (Global View)

**Acceptance Criteria:**
- Searchable, filterable list of all entities across all timelines
- **Filters:** type (Books/Podcasts/Movies), timeline association, date added
- Each item shows: title, creator, number of timelines linked to, date added
- Bulk actions: delete, merge duplicates
- Add an existing entity to a new timeline from this view (with prompt for timeline-specific "why this matters here")

---

### Epic 4: Admin — Visual Asset Management

---

#### 4.1 Upload & Manage Images

**Acceptance Criteria:**
- Supported formats: JPG, PNG, WebP (max 10MB per image)
- Auto-compressed/optimized for mobile delivery on upload
- Image library searchable by filename, tag, or associated timeline
- Images can be tagged with descriptive labels for reuse
- Upload available from event editor or global image library
- Crop/focal point setting for images displayed at multiple aspect ratios (timeline card cover vs. event detail)

---

### Epic 5: Admin — Moderation & Quality

---

#### 5.1 Content Dashboard

**Acceptance Criteria:**
- **Dashboard shows:**
  - Total timelines by status (Draft / Published / Unlisted / Archived)
  - Total events across all timelines
  - Total entities by type (Books / Podcasts / Movies)
  - Recent flags (count + trend)
  - Top-performing timelines (by views, bookmarks, or engagement)
- Filterable by date range
- Quick links: create new timeline, review flags, manage entity library

---

## Priority Reference

| Epic | Stories | Priority |
|---|---|---|
| Consumer: Timeline Browsing | 5 | P0 |
| Consumer: Entity Layers | 7 | P0 |
| Admin: Timeline Mgmt | 5 | P0 |
| Admin: Event Mgmt | 5 | P0 |
| Admin: Entity Content Mgmt | 7 | P0 |
| Consumer: Search & Discovery | 5 | P1 |
| Consumer: User Accounts | 3 | P1 |
| Admin: Visual Assets | 2 | P1 |
| Admin: Moderation | 3 | P1 |
| Causal Connections | 3 | P1 |
| Consumer: Sharing & Virality | 2 | P2 |
| Consumer: AI Features | 3 | P2 |
| Consumer: Manual Creation | 4 | P2 |
| Consumer: Community & UGC | 4 | P3 |
| Consumer: Monetization | 3 | P3 |
| **Total** | **~62** | |

---

## Key UI Patterns (Quick Reference)

| Pattern | Behavior |
|---|---|
| **Bottom sheet — peek** | Slides to ~40% screen height |
| **Bottom sheet — expanded** | Scrolling up within sheet expands to ~80% |
| **Bottom sheet — dismiss** | Swipe down or tap dimmed background |
| **Drag handle** | Always present at top of sheet to signal swipe affordance |
| **Entity pills** | Sticky below timeline header; white default, yellow when selected |
| **Filter pills** | White default; yellow + × when active |
| **Event navigation** | Horizontal swipe within bottom sheet; caret arrows at bottom corners |
| **Affiliate CTAs** | Always open in external browser (not in-app webview) |
| **Transition speed** | All animations < 300ms |
| **Editorial intro** | 200–400 words, overlaid on header image with gradient for readability |
| **Event preview** | 4–5 lines visible before "expand details" |
| **Full event summary** | 150–300 words |
