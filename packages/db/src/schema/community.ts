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
import { users } from './users';
import { artworks } from './artworks';

export const commissionStatusEnum = pgEnum('commission_status', [
  'new',
  'reviewed',
  'accepted',
  'declined',
  'in_progress',
  'delivered',
  'archived',
]);

export const commissions = pgTable(
  'commissions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').references(() => users.id),
    firstName: varchar('first_name', { length: 120 }).notNull(),
    lastName: varchar('last_name', { length: 120 }).notNull(),
    email: varchar('email', { length: 320 }).notNull(),
    phone: varchar('phone', { length: 40 }),
    occasion: varchar('occasion', { length: 120 }),
    budgetBand: varchar('budget_band', { length: 40 }),
    dimensions: varchar('dimensions', { length: 120 }),
    brief: text('brief').notNull(),
    deadline: varchar('deadline', { length: 120 }),
    source: varchar('source', { length: 80 }),
    score: integer('score'),
    status: commissionStatusEnum('status').notNull().default('new'),
    references: jsonb('references'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    answeredAt: timestamp('answered_at', { withTimezone: true }),
  },
  (t) => [
    index('commissions_status_idx').on(t.status),
    index('commissions_email_idx').on(t.email),
  ],
);

export const newsletterStatusEnum = pgEnum('newsletter_status', [
  'pending',
  'subscribed',
  'unsubscribed',
  'bounced',
]);

export const newsletterSubscribers = pgTable(
  'newsletter_subscribers',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 320 }).notNull().unique(),
    name: varchar('name', { length: 120 }),
    status: newsletterStatusEnum('status').notNull().default('subscribed'),
    source: varchar('source', { length: 64 }),
    subscribedAt: timestamp('subscribed_at', { withTimezone: true }).notNull().defaultNow(),
    unsubscribedAt: timestamp('unsubscribed_at', { withTimezone: true }),
    verifiedAt: timestamp('verified_at', { withTimezone: true }),
    meta: jsonb('meta'),
  },
  (t) => [
    index('newsletter_subscribers_email_idx').on(t.email),
    index('newsletter_subscribers_status_idx').on(t.status),
  ],
);

export const wishlistItems = pgTable(
  'wishlist_items',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    artworkId: uuid('artwork_id')
      .notNull()
      .references(() => artworks.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index('wishlist_user_idx').on(t.userId),
    index('wishlist_artwork_idx').on(t.artworkId),
  ],
);

export const contactMessages = pgTable(
  'contact_messages',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 120 }).notNull(),
    email: varchar('email', { length: 320 }).notNull(),
    subject: varchar('subject', { length: 255 }).notNull(),
    body: text('body').notNull(),
    type: varchar('type', { length: 40 }).notNull().default('general'),
    status: varchar('status', { length: 40 }).notNull().default('new'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    answeredAt: timestamp('answered_at', { withTimezone: true }),
  },
  (t) => [index('contact_status_idx').on(t.status)],
);
