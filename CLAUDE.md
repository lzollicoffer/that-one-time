# CLAUDE.md — That One Time
 
Read this file completely at the start of every session before writing a single line of code.
 
---
 
## What We're Building
 
**That One Time** is a mobile-first Next.js web application. Users browse curated historical timelines, explore events in depth, and discover related books, podcasts, and movies tied to each historical era. There is also an admin CMS for managing all content.
 
---
 
## Source of Truth Files — Read These Before Building
 
### Specifications & Content
@docs/project-instructions.md
@docs/That-One-Time-Technical-Spec-v2.md
@docs/design-system-v2.md
@docs/User_Stories_TimelineApp.md
 
### Seed Data — Timeline 1 (Israel–Palestine)
@docs/israel-palestine-timeline-v2.md
 
---
 
## Design References — Match These Exactly
 
**Figma file key:** `jbt7sdDfckAraLz0sIE3SM`
 
Always try the Figma MCP tool first when building a screen. If rate-limited, fall back to the exported PNGs below. Never guess at visual details — ask if uncertain.
 
| Screen | PNG Reference | Sprint |
|--------|--------------|--------|
| Landing Page | @docs/design/Landing_Page.png | 1 |
| Browse / Search | @docs/design/search_page_.png | 1 |
| Timeline View | @docs/design/Timeline_View.png | 2 |
| Event Card (peek state) | @docs/design/Event_Sheet.png | 2 |
| Event Detail (expanded) | @docs/design/Event_sheet_full.png | 2 |
| Books Bottom Sheet | @docs/design/Books_Sheet.png | 3 |
| Podcasts Bottom Sheet | @docs/design/Podcasts_Sheet.png | 3 |
| Movies Bottom Sheet | @docs/design/Movies_Sheet.png | 3 |
 
---
 
## Tech Stack — Strict, Do Not Deviate
 
| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14+ with App Router |
| Language | TypeScript — strict mode, zero `any` |
| Styling | Tailwind CSS only |
| Database & Auth | Supabase (Postgres + Supabase Auth) |
| Client State | Zustand |
| Server State / Fetching | TanStack Query (React Query) |
| Animation | Framer Motion — all sheets and transitions |
| Fonts | Philosopher, Newsreader, Work Sans, Manrope via `next/font` |
 
Do not introduce any new library, package, or architectural pattern without explicit approval. If you think something would help, suggest it and wait.
 
---
 
## Project Structure — Always Follow This Exactly
 
```
/app
  /page.tsx                         # Landing page
  /(consumer)
    /browse/page.tsx                 # Browse / search page
    /timeline/[slug]/page.tsx        # Timeline view (SSR, SEO-indexed)
  /(admin)
    /dashboard/page.tsx
    /timelines/page.tsx
    /timelines/[id]/page.tsx
/components
  /ui                               # Primitive components: pills, buttons, sheets
  /timeline                         # Timeline-specific components
  /admin                            # Admin CMS components
/hooks                              # Custom React hooks
/stores                             # Zustand stores
/lib
  /supabase.ts                      # Supabase client init
  /api/                             # ALL data fetching utilities live here
/constants
  /tokens.ts                        # ALL design tokens — never hardcode values
/types                              # Shared TypeScript interfaces
/docs                               # Reference files (this folder — do not edit)
```
 
---
 
## Design Tokens — Never Hardcode These
 
All tokens live in `/constants/tokens.ts` and as CSS variables in `globals.css`. Import from there — never write hex values inline.
 
```css
/* globals.css :root */
--color-primary: #7D1F01;          /* Deep burnt red — CTAs, primary actions */
--color-primary-dark: #6B0109;
--color-accent-yellow: #FFCC00;    /* Active pills, selected states */
--color-background: #F6F6F6;       /* App shell background */
--color-surface: #FFFFFF;          /* Cards and sheet surfaces */
--color-text-primary: #0A0A0A;
--color-text-secondary: #1A1C1B;
--color-text-body: #58413F;        /* Body text inside cards */
--color-divider: rgba(125, 31, 0, 0.2);
--color-node: #E8E8E6;             /* Timeline spine nodes */
--color-cta-dark: #5A1A00;
 
--font-display: 'Philosopher', serif;
--font-date: 'Newsreader', serif;
--font-heading: 'Work Sans', sans-serif;
--font-body: 'Manrope', sans-serif;
```
 
**Border radius values:**
- Event cards: `48px`
- Browse cards: `28px`
- Bottom sheets: `24px`
- Entity cards: `20px`
- Inline images: `16px`
- Entity card images: `12px`
- Pills and CTAs: `44px`
 
---
 
## Key UI Behaviors
 
### Bottom Sheets (Framer Motion — required)
- **Peek state:** ~40% viewport height — triggered by tapping an event
- **Expanded state:** ~80% viewport height — triggered by scrolling up within the sheet
- **Dismiss:** swipe down or tap outside
- All transitions must complete in **< 300ms**
- Page transitions: **< 200ms**
 
### Event Card Variants
- **Broad** (`event_type: 'broad'`): has preview image (desaturated/B&W), date right-aligned, "EXPAND DETAILS →" CTA
- **Specific** (`event_type: 'specific'`): no image, date left-aligned, "EXPAND DETAILS →" CTA
 
### Event Detail Sheet ("Deep Dive")
- Label: `DEEP DIVE` in small caps at top
- Yellow bullet dots (`#FFCC00`) next to each content block
- Inline images appear below bullet content with caption and context label
- Bottom action bar: `CLOSE READER` (text, left) + `EXPLORE THIS ERA` (filled pill, right)
 
### Entity Sheets (Books / Podcasts / Movies)
- Opened via pill bar tabs at top of timeline view
- Shows: cover image + title + creator + description line per item
- Same bottom action bar as event detail
 
### Filter Pills (Browse Page)
- Options: `Tragic | Inspiring | Chill | Recent`
- Active pill: yellow (`#FFCC00`) background with `×` to clear
- Only one active at a time
 
---
 
## Code Conventions
 
- **Named exports** for all components — no default exports
- **TypeScript interfaces** for all component props — defined in same file or imported from `/types`
- **`'use client'`** directive required at top of any component using hooks, browser APIs, or interactivity
- **Server Components by default** — only opt into client when necessary
- **All Supabase queries** go through `/lib/api/` functions — never write raw Supabase calls inside components
- **All writes** go through `/api/` route handlers — never mutate directly from components
- **No inline styles** except where Framer Motion requires dynamic values
- **File naming:** `kebab-case` for files, `PascalCase` for components, `camelCase` for functions/variables
- **Optimistic updates** for bookmarks — update UI immediately, sync in background
 
---
 
## Data Model Quick Reference
 
### Key Tables
- `timelines` — core content unit with slug, cover image, time span, tags, status
- `events` — individual moments; `event_type` = 'broad' | 'specific'
- `event_bullets` — ordered yellow-dot content blocks for Deep Dive view
- `event_images` — inline images shown in detail sheet
- `timeline_entities` — books, podcasts, movies linked to a timeline
- `timeline_tags` — filter tags: 'tragic' | 'inspiring' | 'chill' | 'recent'
- `profiles` — extends Supabase auth; roles: 'user' | 'editor' | 'admin'
 
### URL / Route Conventions
- `/` — Landing page
- `/browse` — Browse and search with filter pills
- `/timeline/[slug]` — Public timeline (e.g. `/timeline/palestine-and-israel`)
- `/admin/*` — Role-protected admin pages
- `/api/admin/*` — Admin API routes (service role)
- `/api/*` — Public/authenticated API routes
 
### Environment Variables (`.env.local`)
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
AMAZON_AFFILIATE_TAG=thatonetime-20
```
 
---
 
## Build Order — P0 First, Do Not Skip Ahead
 
| Sprint | Focus | Stories |
|--------|-------|---------|
| 1 | Landing page + Browse/Search | Consumer Epic 1 |
| 2 | Timeline view + Event cards + Detail sheet | Consumer Epic 1 cont. |
| 3 | Entity sheets (Books, Podcasts, Movies) | Consumer Epic 2 |
| 4 | Auth + Bookmarks | Consumer Epic 3 |
| 5–6 | Admin CMS (timelines, events, entities) | Admin Epics 1–5 |
| 7 | Polish, PWA, SEO, launch | — |
 
Do not build P2 or P3 features unless explicitly instructed.
 
---
 
## Seed Content
 
The first timeline to seed into Supabase is **Israel–Palestine: A Complete History (1517–2026)**.
All 25 events with `date`, `title`, `card_description`, and `detail_bullets` are in:
@docs/israel-palestine-timeline-v2.md
 
Each event maps directly to the `events` + `event_bullets` tables. Seed via Supabase dashboard during Sprint 1.
 
---
 
## How to Work — Rules of Engagement
 
1. **Before building any screen:** identify the Epic and User Story in `User_Stories_TimelineApp.md`. State which story and acceptance criteria you are addressing.
2. **Before building any UI component:** read `design-system-v2.md`. Try the Figma MCP tool. Fall back to PNG exports if rate-limited.
3. **Build one component at a time.** Finish it fully — types, data wiring, responsive behavior — before moving on.
4. **Do not add** features, UI elements, or behaviors not in the spec.
5. **Do not refactor** working code unless explicitly asked.
6. **When ambiguous:** ask, don't assume.
7. **If design system conflicts with spec:** flag it, do not silently resolve.
8. **Ask before making any architectural decision** not covered by these instructions.