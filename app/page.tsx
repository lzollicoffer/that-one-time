'use client';

import Image from 'next/image';
import Link from 'next/link';

/**
 * Landing Page — That One Time
 * Epic 1, Story 1.1 — Browse Timeline Catalog
 *
 * Acceptance Criteria:
 * - "Explore" CTA on landing screen leads to /browse
 * - Shows app branding (name, tagline)
 * - Displays total timeline count
 *
 * Design Reference: docs/design/Landing Page.png
 * Hero composition: Thinker (center), Globe+temple (top-right), Explosion (right)
 */

interface LandingPageProps {
  totalTimelines?: number;
}

export default function LandingPage({
  totalTimelines = 5,
}: LandingPageProps) {
  return (
    <main className="relative w-full min-h-screen flex flex-col items-center bg-white overflow-hidden">
      {/* ── Hero Image Collage ── */}
      <div className="relative w-full max-w-[390px] mx-auto" style={{ height: '620px' }}>
        {/* Gray background that fades smoothly to white */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, #8A8A8A 0%, #A0A0A0 25%, #B8B8B8 40%, #D0D0D0 55%, #E4E4E4 70%, #F2F2F2 82%, #FFFFFF 92%)',
          }}
        />

        {/* Globe + Temple — top-left, large, partially clipped */}
        <div
          className="absolute z-10"
          style={{
            top: '-20px',
            left: '-40px',
            width: '320px',
            height: '320px',
          }}
        >
          <Image
            src="/images/hero/globe.png"
            alt="Globe with ancient temple and book — representing world history"
            width={320}
            height={320}
            className="object-cover"
            style={{ borderRadius: '0 0 160px 0' }}
            priority
          />
        </div>

        {/* Explosion — right side, behind thinker */}
        <div
          className="absolute z-10"
          style={{
            top: '160px',
            right: '-10px',
            width: '160px',
            height: '160px',
          }}
        >
          <Image
            src="/images/hero/explosion.png"
            alt="Mushroom cloud — representing pivotal moments in history"
            width={160}
            height={160}
            className="object-contain"
            priority
          />
        </div>

        {/* Thinker — center, dominant, in front */}
        <div
          className="absolute z-20"
          style={{
            bottom: '0px',
            left: '50%',
            transform: 'translateX(-55%)',
            width: '320px',
            height: '500px',
          }}
        >
          <Image
            src="/images/hero/thinker.png"
            alt="Rodin's Thinker statue — contemplating history"
            width={320}
            height={500}
            className="object-contain object-bottom"
            style={{ mixBlendMode: 'luminosity' }}
            priority
          />
        </div>

        {/* Bottom fade from hero to white content area */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: '240px',
            background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.3) 25%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.92) 70%, #FFFFFF 100%)',
            zIndex: 25,
          }}
        />
      </div>

      {/* ── Text Content ── */}
      <div className="relative z-30 flex flex-col items-center px-8 text-center mt-2">
        {/* App Name — Philosopher Bold, 48px */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '48px',
            lineHeight: '1.1',
            letterSpacing: '-0.85px',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
          }}
        >
          That One Time
        </h1>

        {/* Tagline — Manrope Light, 20px */}
        <p
          className="max-w-[325px] mt-4"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '20px',
            lineHeight: '32px',
            letterSpacing: '-0.85px',
            fontWeight: 300,
            color: 'var(--color-text-primary)',
          }}
        >
          An evolving collection of big and small moments.
        </p>

        {/* Timeline Counter — Manrope Regular, 16px */}
        <p
          className="mt-3"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            lineHeight: '32px',
            fontWeight: 400,
            color: 'var(--color-text-primary)',
          }}
        >
          Total Timelines: {totalTimelines}
        </p>

        {/* EXPLORE CTA Button */}
        <Link
          href="/browse"
          className="mt-8 mb-8 inline-flex items-center justify-center transition-opacity hover:opacity-90 active:opacity-70"
          style={{
            backgroundColor: 'var(--color-primary)',
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            letterSpacing: '1.2px',
            fontWeight: 400,
            color: '#FFFFFF',
            textTransform: 'uppercase',
            width: '335px',
            height: '51px',
            borderRadius: '87px',
          }}
        >
          Explore
        </Link>
      </div>
    </main>
  );
}
