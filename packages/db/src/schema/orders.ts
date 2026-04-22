import {
  pgTable,
  uuid,
  varchar,
  integer,
  timestamp,
  pgEnum,
  index,
  jsonb,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './users';
import { artworks } from './artworks';
import { drops } from './drops';

export const orderStatusEnum = pgEnum('order_status', [
  'cart',
  'pending_payment',
  'paid',
  'shipped',
  'delivered',
  'cancelled',
  'refunded',
]);

export const orders = pgTable(
  'orders',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').references(() => users.id),
    guestEmail: varchar('guest_email', { length: 320 }),
    totalCents: integer('total_cents').notNull(),
    currency: varchar('currency', { length: 3 }).notNull().default('EUR'),
    status: orderStatusEnum('status').notNull().default('cart'),
    stripePaymentIntentId: varchar('stripe_payment_intent_id', { length: 256 }),
    shippingAddress: jsonb('shipping_address'),
    billingAddress: jsonb('billing_address'),
    shippingMethod: varchar('shipping_method', { length: 64 }),
    shippingCents: integer('shipping_cents').notNull().default(0),
    trackingNumber: varchar('tracking_number', { length: 128 }),
    notes: varchar('notes', { length: 500 }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index('orders_user_idx').on(t.userId), index('orders_status_idx').on(t.status)],
);

export const orderItems = pgTable(
  'order_items',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    orderId: uuid('order_id')
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),
    artworkId: uuid('artwork_id').references(() => artworks.id),
    dropId: uuid('drop_id').references(() => drops.id),
    variantId: uuid('variant_id'),
    quantity: integer('quantity').notNull().default(1),
    unitPriceCents: integer('unit_price_cents').notNull(),
    editionNumber: integer('edition_number'),
    title: varchar('title', { length: 255 }).notNull(),
    meta: jsonb('meta'),
  },
  (t) => [index('order_items_order_idx').on(t.orderId)],
);

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  items: many(orderItems),
}));
