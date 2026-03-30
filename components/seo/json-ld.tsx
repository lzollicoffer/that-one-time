/**
 * JSON-LD Structured Data — That One Time
 * Outputs schema.org structured data for SEO.
 * Used in timeline pages for rich search results.
 */

interface TimelineJsonLdProps {
  title: string;
  description: string;
  url: string;
  coverImageUrl?: string;
  datePublished?: string;
  dateModified?: string;
}

export function TimelineJsonLd({
  title,
  description,
  url,
  coverImageUrl,
  datePublished,
  dateModified,
}: TimelineJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    ...(coverImageUrl && { image: coverImageUrl }),
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    publisher: {
      '@type': 'Organization',
      name: 'That One Time',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    },
    isPartOf: {
      '@type': 'WebSite',
      name: 'That One Time',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface BreadcrumbJsonLdProps {
  items: { name: string; url: string }[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
