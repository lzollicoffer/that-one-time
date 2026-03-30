/**
 * Shared TypeScript types for timelines, events, and entities.
 * Used across consumer and admin features.
 */

export type EventType = 'broad' | 'specific';

export interface EventBullet {
  id: string;
  eventId: string;
  content: string;
  sortOrder: number;
}

export interface EventImage {
  id: string;
  eventId: string;
  imageUrl: string;
  caption: string;
  contextLabel: string;
  sortOrder: number;
}

export interface TimelineEvent {
  id: string;
  timelineId: string;
  date: string;
  title: string;
  cardDescription: string;
  eventType: EventType;
  imageUrl?: string;
  sortOrder: number;
  detailBullets: EventBullet[];
  images: EventImage[];
}

export interface Timeline {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  period: string;
  coverImageUrl: string;
  description: string;
  tags: string[];
  status: 'draft' | 'published' | 'unlisted' | 'archived';
}

export type EntityType = 'book' | 'podcast' | 'movie';

export interface TimelineEntity {
  id: string;
  timelineId: string;
  entityType: EntityType;
  title: string;
  creator: string;
  description: string;
  coverImageUrl: string;
  externalUrl: string;
  sortOrder: number;
}
