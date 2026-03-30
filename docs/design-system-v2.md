# Design System Reference — "That One Time"

> **Purpose:** This is the authoritative visual and interaction design reference for the app. All UI built for this product must conform to these tokens, patterns, and rules. Do not deviate unless a change is explicitly validated.
>
> **Source:** Extracted from Figma frames (Landing Page, Browse/Search Page, Timeline View, Event Detail Sheet, Books Sheet, Podcasts Sheet, Movies Sheet).

---

## 1. Brand & Identity

| Property | Value |
|---|---|
| **App name** | That One Time |
| **Tagline** | An evolving collection of big and small moments. |
| **Logo/wordmark style** | App name in Philosopher Bold, used inline in the top nav |
| **Brand tone** | Editorial, thoughtful, archival — not sterile or corporate |

---

## 2. Color Palette

### Primary Colors

| Token | Hex | Usage |
|---|---|---|
| `color-primary` | `#7D1F01` | CTA button background (Explore), primary action, "CARTOGRAPHIC CONTEXT" label |
| `color-primary-dark` | `#6B0109` | Alternate deep red (card gradients, accent) |
| `color-primary-cta` | `#5A1A00` (approx) | "EXPLORE THIS ERA" button in bottom action bar |
| `color-accent-yellow` | `#FFCC00` | Selected entity/filter pills; bullet dots in event detail; secondary brand accent |

### Neutral / Surface Colors

| Token | Hex | Usage |
|---|---|---|
| `color-background` | `#F6F6F6` | App shell background (browse page, timeline page) |
| `color-surface` | `#FFFFFF` | Cards, bottom sheets, nav bar, pills (default state), bottom action bar |
| `color-text-primary` | `#0A0A0A` / `#000000` | Main text, headings on light backgrounds |
| `color-text-secondary` | `#1A1C1B` | Event titles in timeline view |
| `color-text-body` | `#58413F` | Body/description text inside cards and event detail |
| `color-text-muted` | `rgba(60, 60, 67, 0.6)` | Placeholder text (search bar) |
| `color-divider` | `rgba(125, 31, 0, 0.2)` | Timeline spine/vertical connector line |
| `color-node` | `#E8E8E6` | Timeline spine node / scroll-to-top button background |
| `color-drag-handle` | `#C4C4C4` (approx) | Bottom sheet drag handle pill |
| `color-card-border` | `rgba(0, 0, 0, 0.06)` (approx) | Subtle border on entity list cards |

### Overlay & Gradient Colors

| Usage | Value |
|---|---|
| Timeline header gradient (warm) | `linear-gradient(0deg, rgba(63,38,29,0.48) 24%, rgba(248,133,79,0.48) 79%)` |
| Card image gradient (cool-to-warm) | `linear-gradient(0deg, rgba(107,1,9,0.6) bottom → transparent top)` |
| Landing page top overlay | `linear-gradient(0deg, rgba(93,93,93,0) → rgb(93,93,93))` |
| Nav bar background | `rgba(255,255,255,1)` with `backdrop-blur: 12px` and `box-shadow: 0px 0px 32px rgba(50,50,50,0.06)` |
| Bottom sheet overlay (behind sheet) | `rgba(0, 0, 0, 0.3)` (approx) — dimmed background |

---

## 3. Typography

All type is set in one of three families. Do not substitute other fonts.

### Font Families

| Role | Family | Notes |
|---|---|---|
| **Display / App name** | `Philosopher` Bold | Used for app wordmark in nav ("That One Time") and landing page hero title |
| **Date / Era labels** | `Newsreader` SemiBold Italic | Used for year/date range labels on timeline events (e.g., "1517 — 1917") |
| **Sheet section titles** | `Newsreader` Regular | Used for entity list headers ("Books", "Podcasts", "Movies") and event detail title ("Ottoman Rule") in bottom sheets |
| **Headers (H2/H3)** | `Work Sans` Bold | Used for timeline card titles on the browse/grid page |
| **Body / UI** | `Manrope` Regular, Light, Bold | Default for all body copy, descriptions, labels, pills, CTAs |

### Type Scale

| Element | Font | Weight | Size | Line Height | Tracking | Notes |
|---|---|---|---|---|---|---|
| App wordmark (nav) | Philosopher | Bold | 25px | — | -0.85px | Landing hero: 48px |
| Landing subtitle | Manrope | Light | 20px | 32px | -0.85px | — |
| Landing counter | Manrope | Regular | 16px | 32px | — | "Total Timelines: 5" |
| CTA button label | Manrope | Regular | 16px | — | +1.2px | Uppercase |
| Timeline card title | Work Sans | Bold | 30px | 30px | — | On image, white |
| Date pill label | Manrope | Bold | 10px | 15px | +1px | Uppercase |
| Browse description | Manrope | Regular | 14px | 22.75px | — | `#58413F` |
| Browse CTA ("View Timeline") | Manrope | Bold | 11px | 16.5px | +1.1px | Uppercase |
| Filter pill label | Manrope | Bold | 13px | 19.5px | +1.3px | Uppercase |
| Era date label (timeline) | Newsreader | SemiBold Italic | 36px | 40px | — | Right-aligned for broad events |
| Specific event date | Newsreader | SemiBold Italic | 24px | 40px | — | Left-aligned for specific events |
| Event title (broad) | Manrope | Regular | 20px | 32px | — | `#1A1C1B` |
| Event title (specific) | Manrope | Regular | 16px | 32px | — | `#1A1C1B` |
| Event body text | Manrope | Regular | 14px | 22.75px | — | `#58413F`, centered in card |
| "Expand Details" label | Manrope | Bold | 10px | 15px | +1px | Uppercase, right-aligned |
| Timeline hero title | Newsreader | SemiBold | 48px | 40px | — | White, on image with gradient |
| Timeline hero subtitle | Manrope | Regular | 14px | 22.75px | — | White |
| Entity pill label | Manrope | Bold | 13px | 19.5px | +1.3px | Uppercase |
| Search placeholder | SF Pro Text | Regular | ~11px | 14px | -0.26px | System font — use system default |
| **Sheet section title** | Newsreader | Regular | 28px | — | — | Centered; "Books", "Podcasts", "Movies" |
| **"DEEP DIVE" label** | Manrope | Bold | 10px | 15px | +1px | Uppercase, centered, `#58413F` |
| **Event detail title** | Newsreader | Regular | 28px | 34px | — | Centered; "Ottoman Rule" |
| **Event detail body** | Manrope | Regular | 16px | 28px | — | `#1A1C1B`, generous line-height |
| **Entity card title** | Manrope | Regular | 16px | 22px | — | `#1A1C1B` |
| **Entity card creator** | Manrope | Regular | 14px | 20px | — | `#58413F` |
| **Context label (caps)** | Manrope | Bold | 10px | 15px | +1px | Uppercase, `#7D1F01`; e.g., "CARTOGRAPHIC CONTEXT" |
| **"CLOSE READER"** | Manrope | Bold | 12px | — | +1px | Uppercase, `#0A0A0A` |
| **"EXPLORE THIS ERA"** | Manrope | Bold | 12px | — | +1px | Uppercase, white on dark bg |

---

## 4. Spacing & Layout

### Base Grid
- **Mobile canvas width:** 390–402px (iPhone-sized)
- **Horizontal page padding:** 30px left/right (content), 24px for nav/header containers
- **Card gap (browse feed):** 24px vertical between cards

### Key Spacing Values

| Context | Value |
|---|---|
| Nav bar vertical padding | 16px top/bottom |
| Search bar + filter block top offset | 96px from top |
| Event card inner padding | 32px horizontal, 31px top, 32px bottom |
| Event card border radius | 48px |
| Event card image border radius | 26px |
| Gap between event date label and title | 8px bottom margin |
| Gap between event title and card body | 16px |
| Gap between "Expand Details" and body text | 16px |
| Browse card border radius | 28–29px |
| Browse card image height | ~294px (75% of card height) |
| Browse card total height | 389px |
| Timeline spine left offset | 23px from left edge |
| Event content left offset from spine | 39px |
| Gap between events (vertical) | 40px |
| **Bottom sheet top border radius** | 24px |
| **Bottom sheet drag handle width** | 40px |
| **Bottom sheet drag handle height** | 4px |
| **Bottom sheet drag handle top margin** | 12px |
| **Bottom sheet content padding** | 24px horizontal |
| **Entity card gap (vertical)** | 16px |
| **Entity card inner padding** | 16px |
| **Entity card image width** | 120px |
| **Entity card image height** | ~150px (portrait, aspect-fit) |
| **Entity card image border radius** | 12px |
| **Entity card border radius** | 20px |
| **Entity card gap (image to text)** | 16px |
| **Bottom action bar height** | ~64px |
| **Bottom action bar padding** | 16px vertical, 24px horizontal |
| **Event detail bullet dot size** | 24px diameter |
| **Event detail bullet dot left offset** | 24px from sheet left edge |
| **Event detail text left offset** | 60px (24px dot offset + 24px dot + 12px gap) |
| **Event detail paragraph gap** | 32px between bullet points |
| **Event detail inline image border radius** | 16px |
| **Gap between sheet title and first item** | 24px |

---

## 5. Components

### 5.1 Top Navigation Bar

- **Style:** Frosted glass — `backdrop-blur: 12px`, `background: white`, `box-shadow: 0 0 32px rgba(50,50,50,0.06)`
- **Left:** Hamburger icon (18×12px) + app wordmark ("That One Time") in Philosopher Bold 25px
- **Right:** Nothing shown on browse page (implied profile/settings area)
- **Height:** ~64px total (16px vertical padding × 2 + content)
- **Position:** Fixed/sticky at top of screen

### 5.2 Browse Card (Timeline Grid Card)

**Structure (top to bottom):**
1. **Image area** (~75% of card height): full-bleed photo with a warm gradient overlay (bottom-heavy, `rgba(107,1,9,0.6)` → transparent). Contains:
   - **Date Pill** — white rounded pill, Manrope Bold 10px uppercase, tracking +1px, positioned bottom-left of image
   - **Timeline Title** — Work Sans Bold 30px, white, line-height 30px, below pill
2. **Description area** (~25%): white background, centered
   - Body text: Manrope Regular 14px, `#58413F`
   - "VIEW TIMELINE →" CTA: Manrope Bold 11px uppercase, tracking +1.1px, black, with small arrow icon (12×12px)

**Card shell:** `background: white`, `border-radius: 28–29px`, `overflow: hidden`

### 5.3 Filter Pills (Category & Entity)

| State | Background | Text Color | Border | Notes |
|---|---|---|---|---|
| Default | `#FFFFFF` | `#000000` | `1px solid rgba(0,0,0,0.1)` | White pill, black uppercase label |
| Selected | `#FFCC00` | `#000000` | none | Yellow pill; bold highlight |

- **Shape:** `border-radius: 44px` (fully rounded)
- **Padding:** 15.5px horizontal, 5.2px vertical
- **Label:** Manrope Bold, 13px, uppercase, tracking +1.3px
- **Row:** horizontal scroll, `gap: 9px`, no pill wraps

### 5.4 Search Bar

- **Background:** White
- **Border radius:** 76px (pill shape)
- **Padding:** 16px left, 5px right and vertical
- **Height:** 49px
- **Icon:** Magnifying glass, left-aligned, ~18px
- **Placeholder text:** "Search", SF Pro Text Regular ~11px, muted gray `rgba(60,60,67,0.6)`

### 5.5 Timeline Header (Hero)

- **Full-width image** at top of timeline view, ~487px tall
- **Gradient overlay:** `linear-gradient(0deg, rgba(63,38,29,0.48) 24%, rgba(248,133,79,0.48) 79%)` — warm earth tones over the photo
- **Content (bottom-aligned, centered):**
  - Title: Newsreader SemiBold, 48px, white, line-height 40px
  - Subtitle/tagline: Manrope Regular, 14px, white, line-height 22.75px
- **Padding:** 24px horizontal, 18px bottom
- **Hero remains visible** when entity pill bottom sheets are open — sheets overlay below the hero

### 5.6 Entity Pills (Books / Podcasts / Movies)

- Same visual spec as filter pills (§5.3) in default state
- Displayed in a horizontal row below the timeline header, above the event list
- **Sticky** — stay pinned at top when scrolling through events
- Active pill turns yellow (`#FFCC00`) with black text
- **Pill labels:** "BOOKS", "PODCASTS", "MOVIES" — all uppercase
- Tapping a pill opens the entity list bottom sheet (§5.9) — does NOT filter the timeline events
- Only one pill can be active at a time
- Tapping an already-active pill or dismissing the sheet deselects it

### 5.7 Timeline Spine & Event Nodes

- **Spine:** vertical line, 3px wide, `rgba(125,31,0,0.2)` — positioned 23px from left edge, runs full event list height
- **Nodes:** circular dot, 16px diameter, same left position (23px), marks each event
- **Scroll-to-top button:** 48px circular button, `#E8E8E6`, positioned bottom-right (`right: ~30px`, `bottom: [sticky]`)

### 5.8 Event Cards — Two Variants

**Broad Period Event** (e.g., "Ottoman Rule", "British Mandate")
- Date: Newsreader SemiBold Italic, 36px, right-aligned
- Title: Manrope Regular, 20px, `#1A1C1B`, right-aligned
- Card: white, `border-radius: 48px`, contains:
  - Image (260×216px, `border-radius: 26px`, desaturated via `mix-blend-mode: saturation` + white overlay)
  - Body text: Manrope Regular 14px, `#58413F`, centered, 260px wide
  - "EXPAND DETAILS →": Manrope Bold 10px uppercase, tracking +1px, right-aligned, with 6px wide caret icon

**Specific Event** (e.g., "Balfour Declaration", "Mandate for Palestine")
- Date: Newsreader SemiBold Italic, 24px, left-aligned
- Title: Manrope Regular, 16px, `#1A1C1B`, left-aligned
- Card: white, `border-radius: 48px`, narrower (~324px wide), **no image**
  - Body text: Manrope Regular 14px, `#58413F`
  - "EXPAND DETAILS →": same as above

**Vertical rhythm:** Date label → 8px gap → event title → 16px gap → card body

### 5.9 Entity List Bottom Sheet (Books / Podcasts / Movies)

The bottom sheet triggered by tapping an entity pill. Overlays the timeline view — the hero image and entity pills remain visible above.

**Sheet Structure (top to bottom):**

1. **Drag Handle**
   - Dark gray pill, `#C4C4C4`, centered
   - Width: 40px, height: 4px, border-radius: 2px
   - Top margin: 12px from sheet top edge

2. **Section Title**
   - Font: Newsreader Regular, 28px, `#0A0A0A`, centered
   - Text matches the selected pill: "Books", "Podcasts", or "Movies"
   - Top margin: 20px below drag handle
   - Bottom margin: 24px above first card

3. **Entity Card List** (scrollable)
   - Vertical stack of entity cards with 16px gap
   - List scrolls independently within the sheet

4. **Bottom Action Bar** (sticky at sheet bottom — see §5.11)

**Sheet Shell:**
- Background: `#FFFFFF`
- Border radius: 24px top-left, 24px top-right, 0 bottom
- Sheet height: approximately 55–60% of screen when open (hero still visible above)
- Horizontal padding: 24px

### 5.10 Entity Card (List Item)

Shared layout across Books, Podcasts, and Movies. Horizontal card with image left, text right.

**Layout:**
```
┌──────────────────────────────────────┐
│  ┌──────────┐                        │
│  │          │  Title                  │
│  │  Cover   │  Subtitle line 2       │
│  │  Image   │  Creator name          │
│  │          │                        │
│  └──────────┘                        │
└──────────────────────────────────────┘
```

**Card Shell:**
- Background: `#FFFFFF`
- Border: `1px solid rgba(0, 0, 0, 0.06)` (very subtle)
- Border radius: 20px
- Padding: 16px
- No shadow (flat with subtle border)

**Cover Image:**
- Width: 120px
- Height: auto (aspect-fit, typically ~150px for portrait book/movie covers, ~120px square for podcast art)
- Border radius: 12px
- Object-fit: cover

**Text Block (right of image):**
- Left margin from image: 16px
- **Title:** Manrope Regular, 16px, `#1A1C1B`, line-height 22px
  - Books: book title
  - Podcasts: episode/show title
  - Movies: movie title
- **Creator:** Manrope Regular, 14px, `#58413F`, line-height 20px
  - Books: author name
  - Podcasts: host name
  - Movies: director(s) / creator names (comma-separated)
- Vertically centered within card

### 5.11 Bottom Action Bar

Persistent sticky bar at the bottom of all bottom sheets (entity lists and event detail).

**Layout:**
```
┌──────────────────────────────────────┐
│  CLOSE READER     [EXPLORE THIS ERA] │
└──────────────────────────────────────┘
```

**Bar Shell:**
- Background: `#FFFFFF`
- Top border: `1px solid rgba(0, 0, 0, 0.06)` or subtle shadow
- Padding: 16px vertical, 24px horizontal
- Height: ~64px
- Position: sticky bottom of sheet (always visible, content scrolls behind it)

**"CLOSE READER" button (left):**
- Type: text-only button (no background)
- Font: Manrope Bold, 12px, uppercase, tracking +1px
- Color: `#0A0A0A`
- Action: dismisses the bottom sheet, returns to timeline view

**"EXPLORE THIS ERA" button (right):**
- Type: filled button
- Background: `#5A1A00` (dark brown — darker than `color-primary`)
- Font: Manrope Bold, 12px, uppercase, tracking +1px, white
- Border radius: 44px (fully rounded pill)
- Padding: 14px horizontal, 12px vertical
- Width: ~200px (flexible)
- Action: navigates user into the timeline events for the currently displayed era

### 5.12 Event Detail Bottom Sheet (Deep Dive)

Full-screen bottom sheet triggered by tapping "EXPAND DETAILS" on a timeline event card. Covers the entire screen (hero not visible).

**Sheet Structure (top to bottom):**

1. **Drag Handle**
   - Same spec as entity list sheet: `#C4C4C4`, 40×4px, centered, 12px from top

2. **"DEEP DIVE" Label**
   - Font: Manrope Bold, 10px, uppercase, tracking +1px
   - Color: `#58413F`
   - Alignment: centered
   - Top margin: 16px below drag handle

3. **Event Title**
   - Font: Newsreader Regular, 28px, `#0A0A0A`
   - Alignment: centered
   - Top margin: 4px below "DEEP DIVE" label
   - Bottom margin: 24px above first bullet

4. **Bullet Point Content**
   - Content is presented as a series of text blocks, each preceded by a yellow bullet dot
   - **Yellow dot:** `#FFCC00`, 24px diameter circle
   - **Dot position:** left-aligned, 24px from sheet left edge, vertically centered with the first line of its text block
   - **Text position:** left edge at ~60px from sheet left (dot offset + dot width + 12px gap)
   - **Text:** Manrope Regular, 16px, `#1A1C1B`, line-height 28px
   - **Gap between bullet blocks:** 32px
   - Text wraps within a right margin of 24px from sheet right edge

5. **Inline Image Section** (optional, at bottom of content)
   - Full-width image within sheet padding (24px left/right)
   - Border radius: 16px
   - Below image:
     - **Context label:** Manrope Bold, 10px, uppercase, tracking +1px, `#7D1F01` (deep red)
     - **Description:** Manrope Regular, 14px, `#58413F`, below label
     - Label top margin: 12px below image
     - Description top margin: 4px below label

6. **Bottom Action Bar** (sticky — same spec as §5.11)

**Sheet Shell:**
- Background: `#FFFFFF`
- Border radius: 24px top-left, 24px top-right
- Height: full screen (covers hero/timeline completely)
- Content is scrollable; bottom action bar is sticky

---

## 6. Landing Page

- **Full-screen** mobile canvas (~874px tall)
- **Background:** White base with decorative circular gradient overlays (gray, soft)
- **Hero imagery:** Collage-style — Rodin's Thinker + globe + supplementary imagery, masked/composited
- **Content (vertically centered/bottom-heavy):**
  - App title: Philosopher Bold, 48px, `#0A0A0A`, center-aligned, tracking -0.85px
  - Tagline: Manrope Light, 20px, line-height 32px, centered, 325px wide
  - Counter: Manrope Regular, 16px, "Total Timelines: [N]", centered
- **CTA Button:**
  - Background: `#7D1F01` (deep burnt red)
  - Width: 335px, height: 51px, `border-radius: 87px`
  - Label: Manrope Regular, 16px, white, uppercase, tracking +1.2px — "EXPLORE"
  - Position: ~798px from top (~30px from screen bottom)

---

## 7. Interaction Patterns

| Pattern | Spec |
|---|---|
| **Entity pill tap** | Opens entity list bottom sheet (§5.9). Only one pill active at a time. Sheet overlays timeline; hero remains visible above. |
| **Entity pill dismiss** | Swipe sheet down, tap "CLOSE READER", or tap dimmed overlay. Pill deselects, returns to timeline. |
| **Entity card tap** | Expands to entity detail within the sheet (§5.10 → expanded view with full description + CTA). Back arrow returns to list. |
| **Event "EXPAND DETAILS" tap** | Opens event detail bottom sheet (§5.12) at full screen height. |
| **Bottom sheet — drag handle** | Always present at top; signals swipe affordance |
| **Event navigation (event detail sheet)** | Horizontal swipe; caret arrows bottom-left/right corners |
| **"CLOSE READER" tap** | Dismisses any bottom sheet (entity list or event detail). Returns to timeline view. |
| **"EXPLORE THIS ERA" tap** | From entity list: dismisses sheet and scrolls timeline to the era. From event detail: same behavior. |
| **All transitions** | < 300ms |
| **Card hover/tap state** | Use standard opacity tap feedback (opacity: 0.7 on press) |
| **Affiliate CTAs** | Open in external browser only (not in-app webview) |

---

## 8. Imagery Style

- **Cover images:** Full-bleed photography (historical, cinematic, evocative)
- **Event images (timeline cards):** Desaturated (black & white treatment) using `mix-blend-mode: saturation` overlay — applied via white layer on top of image
- **Event detail inline images:** Full color, with rounded corners (16px). Historical maps, documents, photographs.
- **Hero images:** Full color with warm gradient overlay
- **Entity cover images:** Full color, standard book/album/poster art as-is — no desaturation treatment
- **Aspect ratios:**
  - Browse card image: ~341:294 (approx 7:6)
  - Timeline hero: ~402:487 (portrait)
  - Entity card cover (books/movies): ~120:150 (portrait, 4:5)
  - Entity card cover (podcasts): ~120:120 (square, 1:1)
- **Border radius on images inside cards:** 26px (timeline cards), 12px (entity cards), 16px (event detail inline)

---

## 9. Iconography

| Icon | Size | Usage |
|---|---|---|
| Hamburger menu | 18×12px | Top-left in nav bar |
| Arrow / caret (right) | 12×12px (browse CTA), 6×3.7px (expand details) | Inline with text labels |
| Scroll-to-top | 48px circle button | Bottom-right of timeline view |
| Search magnifying glass | ~18px | Left of search bar input |

Icon style: simple, minimal line weight — no filled icons observed. Color: black or contextual.

---

## 10. Component Hierarchy (Screen → Components)

### Timeline View (default state)
```
┌─ NavBar (sticky top) ─────────────────────┐
│  ☰  That One Time                         │
├───────────────────────────────────────────┤
│  TimelineHero (full-width image + title)  │
├─ EntityPillBar (sticky below hero) ───────┤
│  [BOOKS]  [PODCASTS]  [MOVIES]            │
├─ TimelineSpine + EventList ───────────────┤
│  ● 1517 — 1917                            │
│  │ Ottoman Rule                           │
│  │ ┌─ EventCard (broad) ───────────┐      │
│  │ │ image + body + expand details │      │
│  │ └───────────────────────────────┘      │
│  ● 1917                                  │
│  │ Balfour Declaration                    │
│  │ ┌─ EventCard (specific) ────────┐     │
│  │ │ body + expand details         │     │
│  │ └───────────────────────────────┘     │
│  ...                                      │
└───────────────────────────────────────────┘
```

### Entity Pill Tapped (e.g., Books)
```
┌─ NavBar ──────────────────────────────────┐
├─ TimelineHero (still visible) ────────────┤
├─ EntityPillBar ───────────────────────────┤
│  [BOOKS●]  [PODCASTS]  [MOVIES]           │
├═══════════════════════════════════════════┤
│  ┌─ BottomSheet ────────────────────────┐ │
│  │  ── drag handle ──                   │ │
│  │         Books                        │ │
│  │  ┌─ EntityCard ────────────────────┐ │ │
│  │  │ [cover]  Title / Author         │ │ │
│  │  └─────────────────────────────────┘ │ │
│  │  ┌─ EntityCard ────────────────────┐ │ │
│  │  │ [cover]  Title / Author         │ │ │
│  │  └─────────────────────────────────┘ │ │
│  │  ...                                 │ │
│  ├──────────────────────────────────────┤ │
│  │ CLOSE READER    [EXPLORE THIS ERA]   │ │
│  └──────────────────────────────────────┘ │
└───────────────────────────────────────────┘
```

### Event Detail (Deep Dive)
```
┌─────────────────────────────────────────┐
│  ┌─ BottomSheet (full screen) ────────┐ │
│  │  ── drag handle ──                 │ │
│  │       DEEP DIVE                    │ │
│  │     Ottoman Rule                   │ │
│  │                                    │ │
│  │  ● Body text paragraph 1...       │ │
│  │                                    │ │
│  │  ● Body text paragraph 2...       │ │
│  │                                    │ │
│  │  ● Body text paragraph 3...       │ │
│  │                                    │ │
│  │  ┌─ Inline Image ──────────────┐  │ │
│  │  │  [historical map/photo]     │  │ │
│  │  └─────────────────────────────┘  │ │
│  │  CARTOGRAPHIC CONTEXT             │ │
│  │  Description text...              │ │
│  │                                    │ │
│  ├────────────────────────────────────┤ │
│  │ CLOSE READER    [EXPLORE THIS ERA] │ │
│  └────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

---

## 11. What's Not Yet Documented

These areas still require additional frames or design decisions to fully spec:

- Entity card **expanded/detail view** within the list sheet (tap a book → see full description + CTA)
- **Hamburger menu** open state / drawer contents
- **Empty states** (search no results, empty entity list, timeline with no events)
- **Error states** (network failure, content not found)
- **Skeleton/loading states** (card shimmer, sheet loading)
- **Share modal** (share as image vs. link)
- **Bookmark icon** placement and states (on timeline header, on event detail)
- **Flag modal** (flag type selection UI)
- **User profile / library page**
- **Onboarding flow** (category + vibe selection)
- **Admin CMS interface** (separate design system section — functional, not polished)
- **Toast/notification patterns** (bookmark confirmed, flag submitted)
- **Causal connection** visual treatment (link lines, tooltips)
