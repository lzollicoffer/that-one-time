# Project Instructions — That One Time

## What We're Building
A mobile-first Next.js web application called **"That One Time"** — an editorial timeline product where users browse curated historical timelines, explore events in depth, and discover related books, podcasts, and movies. There is also an admin CMS for managing all content.

---

## Tech Stack — Strict, Do Not Deviate
- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript — all files must be typed; no `any` unless explicitly approved
- **Styling:** Tailwind CSS
- **Database & Auth:** Supabase (Postgres + Supabase Auth)
- **State management:** Zustand for client state; React Query (TanStack Query) for server state / data fetching
- **Animation:** Framer Motion for all transitions and bottom sheet interactions
- **Fonts:** Load via `next/font` — Philosopher, Newsreader, Work Sans, Manrope (see design system)

Do not introduce new libraries, packages, or architectural patterns without being explicitly asked to. If you think a library would help, suggest it and wait for approval before using it.

---

## Project Structure — Always Follow This
```
/app                        # Next.js App Router pages
  /page.tsx                 # Landing page
  /(consumer)               # Consumer-facing routes
    /browse/page.tsx        # Timeline browse/search
    /timeline/[id]/page.tsx # Timeline view
  /(admin)                  # Admin CMS routes
    /dashboard/page.tsx
    /timelines/page.tsx
    /timelines/[id]/page.tsx
/components
  /ui                       # Primitive UI components (pills, buttons, sheets)
  /timeline                 # Timeline-specific components
  /admin                    # Admin CMS components
/hooks                      # Custom React hooks
/stores                     # Zustand stores
/lib
  /supabase.ts              # Supabase client
  /api/                     # Data fetching utilities
/constants
  /tokens.ts                # ALL design tokens (colors, typography, spacing)
/types                      # Shared TypeScript types/interfaces
```

---

## Design System Rules — Non-Negotiable
The uploaded `design-system.md` file is the visual source of truth. Always read it before building any UI component.

- **Never hardcode** color hex values, font sizes, or spacing values inline. Always import from `/constants/tokens.ts`
- **Never substitute fonts.** The app uses Philosopher, Newsreader, Work Sans, and Manrope only
- **Primary brand color:** `#7D1F01` (deep burnt red) for CTAs and primary actions
- **Accent color:** `#FFCC00` for selected pills and active states
- **Background:** `#F6F6F6` for app shell; `#FFFFFF` for cards and surfaces
- **Body text color inside cards:** `#58413F`
- All bottom sheets use Framer Motion. Peek state = 40% viewport height. Expanded = 80%. Dismiss on swipe down or tap outside
- All transitions must complete in < 300ms
- The app is **mobile-first**. Design and build for ~390px wide viewport first. Desktop is secondary

---

## Code Conventions
- Use **named exports** for all components
- All components must have **TypeScript interfaces** for their props — defined in the same file or imported from `/types`
- Use **Tailwind utility classes** for styling. Component-level CSS modules are acceptable for complex animations only
- Client components must be explicitly marked with `'use client'` at the top
- Server components are the default — only opt into client when needed (interactivity, hooks, browser APIs)
- All Supabase queries go through `/lib/api/` utility functions — never write raw Supabase calls directly in components
- **No inline styles** except where Framer Motion requires dynamic values

---

## Product Spec Rules
The uploaded `product-spec.md` is the feature source of truth.

- Before building any screen or component, identify the relevant Epic and Story in the spec
- Ensure **all acceptance criteria** for that story are met before considering it complete
- Do not add features, UI elements, or behaviors not described in the spec
- When a spec requirement is ambiguous, ask for clarification rather than making an assumption
- Build in priority order: **P0 first, then P1.** Do not build P2 or P3 features unless explicitly instructed

---

## Figma Reference
The Figma file key is: `jbt7sdDfckAraLz0sIE3SM`

When building any UI component:
1. Check the Figma file for the relevant frame using the MCP Figma tool
2. Match the visual output as closely as possible to the frame
3. If the Figma tool is unavailable (rate limit), fall back to `design-system.md`
4. Never guess at visual details — if uncertain, ask

---

## How to Work
- **Build one screen or component at a time.** Finish it fully — including types, data wiring, and responsive behavior — before moving on
- **Always show your work.** When building a component, briefly state which story you're implementing and which acceptance criteria you're addressing
- **Ask before making architectural decisions** not covered by these instructions
- **Do not refactor working code** unless explicitly asked to
- When you're unsure whether something is in scope, reference the spec rather than guessing
- If something in the design system conflicts with something in the spec, flag it and ask — do not silently resolve it yourself
