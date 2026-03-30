/**
 * Mock entity data for the Israel–Palestine timeline.
 * To be replaced with Supabase queries via /lib/api/ functions.
 */

import { TimelineEntity } from '@/types/timeline';

export const PALESTINE_ISRAEL_BOOKS: TimelineEntity[] = [
  {
    id: 'book-1',
    timelineId: 'israel-palestine-complete-history',
    entityType: 'book',
    title: 'The 100 Years War on Palestine',
    creator: 'Rashid Khalidi',
    description:
      'A landmark history of the hundred years of war waged against the Palestinians from the fall of the Ottoman Empire to today.',
    coverImageUrl: '/images/entities/100-years-war.jpg',
    externalUrl: 'https://www.amazon.com/dp/1250787653?tag=thatonetime-20',
    sortOrder: 1,
  },
  {
    id: 'book-2',
    timelineId: 'israel-palestine-complete-history',
    entityType: 'book',
    title: 'The Israel-Palestine Conflict: 100 Years of War',
    creator: 'James L. Gelvin',
    description:
      'A balanced, comprehensive account of the conflict from its origins to the present day.',
    coverImageUrl: '/images/entities/israel-palestine-conflict.jpg',
    externalUrl: 'https://www.amazon.com/dp/1108819400?tag=thatonetime-20',
    sortOrder: 2,
  },
  {
    id: 'book-3',
    timelineId: 'israel-palestine-complete-history',
    entityType: 'book',
    title: 'The Israel-Palestine Conflict: 100 Years of War',
    creator: 'James L. Gelvin',
    description:
      'A balanced, comprehensive account of the conflict from its origins to the present day.',
    coverImageUrl: '/images/entities/israel-palestine-conflict.jpg',
    externalUrl: 'https://www.amazon.com/dp/1108819400?tag=thatonetime-20',
    sortOrder: 3,
  },
];

export const PALESTINE_ISRAEL_PODCASTS: TimelineEntity[] = [
  {
    id: 'podcast-1',
    timelineId: 'israel-palestine-complete-history',
    entityType: 'podcast',
    title: 'The Israeli-Palestinian Conflict: A 30-Minute Guide',
    creator: 'Noam Wessman',
    description:
      'A concise overview of the key events and turning points in the Israeli-Palestinian conflict.',
    coverImageUrl: '/images/entities/unpacking-history.jpg',
    externalUrl: 'https://open.spotify.com/',
    sortOrder: 1,
  },
  {
    id: 'podcast-2',
    timelineId: 'israel-palestine-complete-history',
    entityType: 'podcast',
    title: 'The Israeli-Palestinian Conflict: A 30-Minute Guide',
    creator: 'Noam Wessman',
    description:
      'A concise overview of the key events and turning points in the Israeli-Palestinian conflict.',
    coverImageUrl: '/images/entities/unpacking-history.jpg',
    externalUrl: 'https://open.spotify.com/',
    sortOrder: 2,
  },
  {
    id: 'podcast-3',
    timelineId: 'israel-palestine-complete-history',
    entityType: 'podcast',
    title: 'The Israeli-Palestinian Conflict: A 30-Minute Guide',
    creator: 'Noam Wessman',
    description:
      'A concise overview of the key events and turning points in the Israeli-Palestinian conflict.',
    coverImageUrl: '/images/entities/unpacking-history.jpg',
    externalUrl: 'https://open.spotify.com/',
    sortOrder: 3,
  },
];

export const PALESTINE_ISRAEL_MOVIES: TimelineEntity[] = [
  {
    id: 'movie-1',
    timelineId: 'israel-palestine-complete-history',
    entityType: 'movie',
    title: 'No Other Land',
    creator: 'Yuval Abraham, Basel Adra, Hamdan Ballal',
    description:
      'A documentary following Palestinian activist Basel Adra and Israeli journalist Yuval Abraham as they document the destruction of Palestinian villages in the West Bank.',
    coverImageUrl: '/images/entities/no-other-land.jpg',
    externalUrl: 'https://www.amazon.com/',
    sortOrder: 1,
  },
  {
    id: 'movie-2',
    timelineId: 'israel-palestine-complete-history',
    entityType: 'movie',
    title: 'No Other Land',
    creator: 'Yuval Abraham, Basel Adra, Hamdan Ballal',
    description:
      'A documentary following Palestinian activist Basel Adra and Israeli journalist Yuval Abraham as they document the destruction of Palestinian villages in the West Bank.',
    coverImageUrl: '/images/entities/no-other-land.jpg',
    externalUrl: 'https://www.amazon.com/',
    sortOrder: 2,
  },
  {
    id: 'movie-3',
    timelineId: 'israel-palestine-complete-history',
    entityType: 'movie',
    title: 'No Other Land',
    creator: 'Yuval Abraham, Basel Adra, Hamdan Ballal',
    description:
      'A documentary following Palestinian activist Basel Adra and Israeli journalist Yuval Abraham as they document the destruction of Palestinian villages in the West Bank.',
    coverImageUrl: '/images/entities/no-other-land.jpg',
    externalUrl: 'https://www.amazon.com/',
    sortOrder: 3,
  },
];
