/**
 * Design Tokens — That One Time
 * All color, typography, and spacing values used throughout the app.
 * Never hardcode these values inline — always import from this file.
 */

// ============================================================================
// COLOR TOKENS
// ============================================================================

export const COLORS = {
  // Primary brand colors
  primary: '#7D1F01', // Deep burnt red — CTAs, primary actions
  primaryDark: '#6B0109',
  primaryCTA: '#5A1A00', // Darker variant for button states

  // Accent
  accentYellow: '#FFCC00', // Selected pills, bullet dots, active states

  // Neutral / Surface
  background: '#F6F6F6', // App shell background
  surface: '#FFFFFF', // Cards, sheets, nav bar
  textPrimary: '#0A0A0A', // Main text, headings on light backgrounds
  textSecondary: '#1A1C1B', // Event titles in timeline view
  textBody: '#58413F', // Body/description text inside cards
  textMuted: 'rgba(60, 60, 67, 0.6)', // Placeholder text
  divider: 'rgba(125, 31, 0, 0.2)', // Timeline spine/vertical connector
  node: '#E8E8E6', // Timeline spine node / scroll-to-top button
  dragHandle: '#C4C4C4',
  cardBorder: 'rgba(0, 0, 0, 0.06)',

  // Overlay & gradients
  overlayDark: 'rgba(0, 0, 0, 0.3)',
  navBarBackground: 'rgba(255, 255, 255, 1)',
} as const;

// ============================================================================
// TYPOGRAPHY / FONT FAMILIES
// ============================================================================

export const FONT_FAMILIES = {
  display: "'Philosopher', serif",
  date: "'Newsreader', serif",
  heading: "'Work Sans', sans-serif",
  body: "'Manrope', sans-serif",
} as const;

// ============================================================================
// FONT SIZES
// ============================================================================

export const FONT_SIZES = {
  // App wordmark
  appWordmark: '25px', // Nav bar
  appWordmarkLanding: '48px', // Landing page hero

  // Headings
  h1: '48px', // Landing page hero title
  h2: '36px', // Era date label on timeline
  h3: '30px', // Timeline card title on browse page
  h4: '28px', // Event detail title, sheet section title
  bodyLg: '20px', // Event title (broad)
  body: '16px', // Event title (specific), entity detail, event detail body
  bodySm: '14px', // Browse description, entity creator, body text in cards
  label: '13px', // Filter pills, entity pills
  labelSmall: '11px', // Browse CTA, date pill label
  caption: '10px', // "DEEP DIVE" label, context label, small uppercase
} as const;

// ============================================================================
// FONT WEIGHTS
// ============================================================================

export const FONT_WEIGHTS = {
  light: 300,
  regular: 400,
  semiBold: 600,
  bold: 700,
} as const;

// ============================================================================
// LINE HEIGHTS
// ============================================================================

export const LINE_HEIGHTS = {
  tight: '30px',
  snug: '34px',
  normal: '40px',
  relaxed: '22.75px',
} as const;

// ============================================================================
// LETTER SPACING (TRACKING)
// ============================================================================

export const LETTER_SPACING = {
  tight: '-0.85px',
  negative: '-0.26px',
  none: '0px',
  normal: '1px',
  wide: '1.1px',
  wider: '1.2px',
  widest: '1.3px',
} as const;

// ============================================================================
// SPACING VALUES
// ============================================================================

export const SPACING = {
  // Base spacing unit
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '40px',

  // Common page padding
  pageHorizontal: '30px', // Left/right content padding
  pageHorizontalNav: '24px', // Nav/header containers

  // Common gaps
  cardGap: '24px', // Browse feed card vertical gap
  eventGap: '40px', // Timeline event vertical gap

  // Navigation
  navVertical: '16px', // Nav bar vertical padding

  // Cards
  eventCardPadding: '32px', // Horizontal
  eventCardPaddingTop: '31px',
  eventCardPaddingBottom: '32px',
  eventCardGap: '8px', // Between date label and title
  entityCardInner: '16px',
  entityCardGap: '16px', // Image to text

  // Timeline
  timelineSpineLeft: '23px',
  timelineEventContentLeft: '39px',

  // Bottom sheets
  bottomSheetPadding: '24px',
  bottomSheetRadius: '24px',
  bottomSheetDragHandleTop: '12px',
  bottomSheetDragHandleWidth: '40px',
  bottomSheetDragHandleHeight: '4px',

  // Action bars
  bottomActionBarHeight: '64px',
  bottomActionBarVertical: '16px',
  bottomActionBarHorizontal: '24px',

  // Event detail
  bulletDotSize: '24px',
  bulletDotLeftOffset: '24px',
  eventDetailTextLeftOffset: '60px', // 24 + 24 + 12
  eventDetailParagraphGap: '32px',
  eventDetailImageRadius: '16px',
} as const;

// ============================================================================
// BORDER RADIUS VALUES
// ============================================================================

export const RADII = {
  // Specific use cases
  eventCard: '48px',
  eventCardImage: '26px',
  browseCard: '28px',
  bottomSheet: '24px',
  entityCard: '20px',
  entityCardImage: '12px',
  pill: '44px',
  rounded: '16px',
} as const;

// ============================================================================
// ANIMATION/TRANSITION DURATIONS
// ============================================================================

export const DURATIONS = {
  fast: '200ms',
  normal: '300ms',
  slow: '500ms',
} as const;

// ============================================================================
// VIEWPORT / RESPONSIVE
// ============================================================================

export const BREAKPOINTS = {
  mobile: '390px', // Primary design canvas (iPhone-sized)
  tablet: '768px',
  desktop: '1200px',
} as const;

// ============================================================================
// SHADOW TOKENS
// ============================================================================

export const SHADOWS = {
  navBar: '0px 0px 32px rgba(50, 50, 50, 0.06)',
} as const;
