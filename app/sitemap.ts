import type { MetadataRoute } from 'next';

/**
 * Dynamic sitemap generation — That One Time
 * Generates sitemap.xml with all public routes.
 * When Supabase is connected, will include all published timeline slugs.
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/browse`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Known timeline slugs — will be dynamic from Supabase in production
  const timelineSlugs = ['palestine-and-israel'];

  const timelineRoutes: MetadataRoute.Sitemap = timelineSlugs.map((slug) => ({
    url: `${baseUrl}/timeline/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...timelineRoutes];
}
