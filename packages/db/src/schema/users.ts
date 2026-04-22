import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  pgEnum,
  index,
  primaryKey,
  integer,
  text,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const userRoleEnum = pgEnum('user_role', ['guest', 'user', 'vip', 'admin']);

export const users = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 320 }).notNull().unique(),
    name: varchar('name', { length: 120 }),
    role: userRoleEnum('role').notNull().default('user'),
    isVip: boolean('is_vip').notNull().default(false),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    lastLoginAt: timestamp('last_login_at', { withTimezone: true }),
    emailVerifiedAt: timestamp('email_verified_at', { withTimezone: true }),
    image: varchar('image', { length: 500 }),
  },
  (t) => [index('users_email_idx').on(t.email), index('users_role_idx').on(t.role)],
);

// Auth.js adapter tables — compatibilité Drizzle Adapter
export const accounts = pgTable(
  'accounts',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: varchar('type', { length: 32 }).notNull(),
    provider: varchar('provider', { length: 64 }).notNull(),
    providerAccountId: varchar('provider_account_id', { length: 256 }).notNull(),
    refreshToken: text('refresh_token'),
    accessToken: text('access_token'),
    expiresAt: integer('expires_at'),
    tokenType: varchar('token_type', { length: 32 }),
    scope: varchar('scope', { length: 256 }),
    idToken: text('id_token'),
    sessionState: varchar('session_state', { length: 256 }),
  },
  (t) => [
    primaryKey({ columns: [t.provider, t.providerAccountId] }),
    index('accounts_user_idx').on(t.userId),
  ],
);

export const sessions = pgTable(
  'sessions',
  {
    sessionToken: varchar('session_token', { length: 256 }).primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    expires: timestamp('expires', { withTimezone: true }).notNull(),
  },
  (t) => [index('sessions_user_idx').on(t.userId)],
);

export const verificationTokens = pgTable(
  'verification_tokens',
  {
    identifier: varchar('identifier', { length: 320 }).notNull(),
    token: varchar('token', { length: 256 }).notNull(),
    expires: timestamp('expires', { withTimezone: true }).notNull(),
  },
  (t) => [primaryKey({ columns: [t.identifier, t.token] })],
);

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
}));
