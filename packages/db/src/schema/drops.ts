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
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './users';
import { artworks } from './artworks';

export const dropStatusEnum = pgEnum('drop_status', ['upcoming', 'live', 'sold_out', 'past']);

export const dropPurchaseStatusEnum = pgEnum('drop_purchase_status', [
  'pending',
  'paid',
  'shipped',
  'delivered',
  'refunded',
  'cancelled',
]);

export const drops = pgTable(
  'drops',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    slug: varchar('slug', { length: 128 }).notNull().unique(),
    title: varchar('title', { length: 255 }).notNull(),
    subtitle: varchar('subtitle', { length: 500 }),
    artworkId: uuid('artwork_id')
      .notNull()
      .references(() => artworks.id),
    type: varchar('type', { length: 32 }).notNull(),
    editionSize: integer('edition_size').notNull(),
    priceCents: integer('price_cents').notNull(),
    currency: varchar('currency', { length: 3 }).notNull().default('EUR'),
    opensAt: timestamp('opens_at', { withTimezone: true }).notNull(),
    closesAt: timestamp('closes_at', { withTimezone: true }),
    vipOpensAt: timestamp('vip_opens_at', { withTimezone: true }).notNull(),
    status: dropStatusEnum('status').notNull().default('upcoming'),
    coverImageUrl: varchar('cover_image_url', { length: 500 }),
    videoUrl: varchar('video_url', { length: 500 }),
    lore: text('lore'),
    spec: jsonb('spec'), // [{ label, value }]
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index('drops_slug_idx').on(t.slug),
    index('drops_status_idx').on(t.status),
    index('drops_opens_at_idx').on(t.opensAt),
  ],
);

export const dropPurchases = pgTable(
  'drop_purchases',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    dropId: uuid('drop_id')
      .notNull()
      .references(() => drops.id),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id),
    editionNumber: integer('edition_number'),
    stripePaymentIntentId: varchar('stripe_payment_intent_id', { length: 256 }),
    status: dropPurchaseStatusEnum('status').notNull().default('pending'),
    shippingAddress: jsonb('shipping_address'),
    purchasedAt: timestamp('purchased_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index('drop_purchases_drop_idx').on(t.dropId),
    index('drop_purchases_user_idx').on(t.userId),
    index('drop_purchases_status_idx').on(t.status),
  ],
);

export const dropsRelations = relations(drops, ({ one, many }) => ({
  artwork: one(artworks, {
    fields: [drops.artworkId],
    references: [artworks.id],
  }),
  purchases: many(dropPurchases),
}));
