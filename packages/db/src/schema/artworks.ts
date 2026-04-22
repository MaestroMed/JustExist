import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  timestamp,
  boolean,
  pgEnum,
  index,
  jsonb,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { characters } from './characters';

export const artworkTypeEnum = pgEnum('artwork_type', [
  'original',
  'giclee',
  'serigraphie',
  'poster',
  'figurine',
  'merch',
]);

export const artworkStatusEnum = pgEnum('artwork_status', [
  'draft',
  'in_stock',
  'sold_out',
  'on_demand',
  'coming',
]);

export const artworks = pgTable(
  'artworks',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    slug: varchar('slug', { length: 128 }).notNull().unique(),
    title: varchar('title', { length: 255 }).notNull(),
    subtitle: varchar('subtitle', { length: 500 }),
    type: artworkTypeEnum('type').notNull(),
    characterId: uuid('character_id').references(() => characters.id),
    year: integer('year'),
    dimensions: varchar('dimensions', { length: 120 }),
    materials: text('materials'),
    lore: text('lore'),
    priceCents: integer('price_cents').notNull(),
    currency: varchar('currency', { length: 3 }).notNull().default('EUR'),
    editionSize: integer('edition_size'),
    editionRemaining: integer('edition_remaining'),
    status: artworkStatusEnum('status').notNull().default('draft'),
    featured: boolean('featured').notNull().default(false),
    posterVariant: varchar('poster_variant', { length: 64 }),
    coverImageUrl: varchar('cover_image_url', { length: 500 }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index('artworks_slug_idx').on(t.slug),
    index('artworks_status_idx').on(t.status),
    index('artworks_type_idx').on(t.type),
    index('artworks_character_idx').on(t.characterId),
  ],
);

export const artworkImages = pgTable(
  'artwork_images',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    artworkId: uuid('artwork_id')
      .notNull()
      .references(() => artworks.id, { onDelete: 'cascade' }),
    url: varchar('url', { length: 500 }).notNull(),
    alt: varchar('alt', { length: 255 }),
    sortOrder: integer('sort_order').notNull().default(0),
    isPrimary: boolean('is_primary').notNull().default(false),
    width: integer('width'),
    height: integer('height'),
  },
  (t) => [index('artwork_images_artwork_idx').on(t.artworkId)],
);

export const artworkVariants = pgTable(
  'artwork_variants',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    artworkId: uuid('artwork_id')
      .notNull()
      .references(() => artworks.id, { onDelete: 'cascade' }),
    sku: varchar('sku', { length: 64 }).notNull().unique(),
    name: varchar('name', { length: 255 }).notNull(),
    priceCents: integer('price_cents').notNull(),
    stock: integer('stock').notNull().default(0),
    attributes: jsonb('attributes'), // size, format, color...
  },
  (t) => [index('artwork_variants_artwork_idx').on(t.artworkId)],
);

export const artworksRelations = relations(artworks, ({ one, many }) => ({
  character: one(characters, {
    fields: [artworks.characterId],
    references: [characters.id],
  }),
  images: many(artworkImages),
  variants: many(artworkVariants),
}));
