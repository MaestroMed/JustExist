import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  timestamp,
  pgEnum,
  index,
  jsonb,
  boolean,
} from 'drizzle-orm/pg-core';

export const journalCategoryEnum = pgEnum('journal_category', [
  'behind-the-scenes',
  'drop-story',
  'interview',
  'guide',
  'essai',
  'news',
]);

export const journalStatusEnum = pgEnum('journal_status', ['draft', 'scheduled', 'published', 'archived']);

export const journalPosts = pgTable(
  'journal_posts',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    slug: varchar('slug', { length: 200 }).notNull().unique(),
    title: varchar('title', { length: 255 }).notNull(),
    subtitle: varchar('subtitle', { length: 500 }),
    excerpt: text('excerpt'),
    body: text('body'), // markdown ou rich-text JSON
    bodyJson: jsonb('body_json'), // tiptap future
    coverVariant: varchar('cover_variant', { length: 64 }),
    coverImageUrl: varchar('cover_image_url', { length: 500 }),
    category: journalCategoryEnum('category').notNull(),
    author: varchar('author', { length: 120 }).notNull().default('Nacks'),
    readingTime: integer('reading_time'),
    featured: boolean('featured').notNull().default(false),
    status: journalStatusEnum('status').notNull().default('draft'),
    publishedAt: timestamp('published_at', { withTimezone: true }),
    seoTitle: varchar('seo_title', { length: 120 }),
    seoDescription: varchar('seo_description', { length: 255 }),
    ogImage: varchar('og_image', { length: 500 }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index('journal_slug_idx').on(t.slug),
    index('journal_status_idx').on(t.status),
    index('journal_published_idx').on(t.publishedAt),
  ],
);
