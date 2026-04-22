import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

let _db: PostgresJsDatabase<typeof schema> | null = null;
let _sql: ReturnType<typeof postgres> | null = null;

/**
 * Client Drizzle paresseux.
 * Ne se connecte qu'au premier appel → safe à importer sans DATABASE_URL
 * (l'app ne crash pas en dev tant qu'on ne touche pas la DB).
 */
export function getDb(): PostgresJsDatabase<typeof schema> {
  if (_db) return _db;
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      '[@nacks/db] DATABASE_URL absent — impossible de connecter PostgreSQL. ' +
        'Définis-le dans .env.local (ou lance avec Neon branch dev).',
    );
  }
  _sql = postgres(url, { prepare: false, max: 10 });
  _db = drizzle(_sql, { schema, casing: 'snake_case' });
  return _db;
}

export function isDbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export async function closeDb(): Promise<void> {
  if (_sql) await _sql.end({ timeout: 5 });
  _sql = null;
  _db = null;
}

export { schema };
export type Database = PostgresJsDatabase<typeof schema>;
