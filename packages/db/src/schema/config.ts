import { pgTable, varchar, jsonb, timestamp } from 'drizzle-orm/pg-core';

/**
 * Key-value store pour la configuration du site
 * (frais de livraison, taux TVA, texte légaux, etc.)
 */
export const siteConfig = pgTable('site_config', {
  key: varchar('key', { length: 120 }).primaryKey(),
  value: jsonb('value').notNull(),
  description: varchar('description', { length: 255 }),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
