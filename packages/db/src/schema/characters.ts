import { pgTable, uuid, varchar, text, integer, timestamp, index } from 'drizzle-orm/pg-core';

export const characters = pgTable(
  'characters',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    slug: varchar('slug', { length: 64 }).notNull().unique(),
    name: varchar('name', { length: 120 }).notNull(),
    tagline: varchar('tagline', { length: 255 }),
    phrase: text('phrase'),
    lore: text('lore'),
    primaryColor: varchar('primary_color', { length: 9 }).notNull(),
    accentColor: varchar('accent_color', { length: 9 }),
    introducedAt: integer('introduced_at'),
    signature: text('signature'),
    model3dUrl: varchar('model_3d_url', { length: 500 }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index('characters_slug_idx').on(t.slug)],
);
