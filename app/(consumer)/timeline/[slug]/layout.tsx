import type { Metadata } from 'next';
import { TimelineJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld';

/**
 * Timeline layout — provides SEO metadata and JSON-LD for timeline pages.
 * The actual page is a client component, so metadata is handled here.
 */

// Known timeline metadata — will be dynamic from Supabase in production
const TIMELINE_META: Record<
  string,
  { title: string; description: string; image: string }
> = {
  'palestine-and-israel': {
    title: 'Palestine and Israel: A Complete History',
    description:
      'A deep dive into a conflict that has spanned 100 years, reshaping the geopolitical landscape of the Middle East. Explore 25 key events from 1517 to 2026.',
    image: '/images/timelines/palestine-israel-hero.jpg',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = TIMELINE_META[slug];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  if (!meta) {
    return { title: 'Timeline' };
  }

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'article',
      url: `${baseUrl}/timeline/${slug}`,
      images: [{ url: meta.image, width: 1200, height: 630, alt: meta.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [meta.image],
    },
  };
}

export default async function TimelineLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = TIMELINE_META[slug];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return (
    <>
      {meta && (
        <>
          <TimelineJsonLd
            title={meta.title}
            description={meta.description}
            url={`${baseUrl}/timeline/${slug}`}
            coverImageUrl={meta.image}
          />
          <BreadcrumbJsonLd
            items={[
              { name: 'Home', url: baseUrl },
              { name: 'Browse', url: `${baseUrl}/browse` },
              { name: meta.title, url: `${baseUrl}/timeline/${slug}` },
            ]}
          />
        </>
      )}
      {children}
    </>
  );
}
