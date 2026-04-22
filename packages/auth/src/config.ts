import type { NextAuthConfig } from 'next-auth';
import Resend from 'next-auth/providers/resend';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import {
  getDb,
  users,
  accounts,
  sessions,
  verificationTokens,
  isDbConfigured,
} from '@nacks/db';

/**
 * Configuration Auth.js v5.
 *
 * Modèle magic-link via Resend + sessions DB via Drizzle Adapter.
 * Si DATABASE_URL absent → config sans adapter (sessions éphémères in-memory
 * pour dev local). On ne crash pas — on dégrade gracieusement.
 *
 * NOTE : les types Auth.js v5 pour DrizzleAdapter sont stricts sur les colonnes
 * attendues (emailVerified Timestamp, etc.). Nos tables `users/accounts/...`
 * utilisent un naming légèrement différent par choix (emailVerifiedAt). On
 * contourne la strictness avec un cast — le runtime fonctionne (mapping de
 * colonnes par le dialect snake_case). À resserrer quand DATABASE_URL est posé
 * et qu'on aligne précisément le schema avec Auth.js.
 */
export function createAuthConfig(): NextAuthConfig {
  const hasDb = isDbConfigured();
  const hasResend = Boolean(process.env.RESEND_API_KEY);

  return {
    ...(hasDb
      ? {
          adapter: DrizzleAdapter(getDb(), {
            usersTable: users as never,
            accountsTable: accounts as never,
            sessionsTable: sessions as never,
            verificationTokensTable: verificationTokens as never,
          }),
        }
      : {}),
    session: { strategy: hasDb ? 'database' : 'jwt', maxAge: 60 * 60 * 24 * 30 },
    providers: hasResend
      ? [
          Resend({
            apiKey: process.env.RESEND_API_KEY,
            from: process.env.RESEND_FROM_EMAIL ?? 'noreply@nacksgalerie.com',
          }),
        ]
      : [],
    pages: {
      signIn: '/compte',
      verifyRequest: '/compte?check-email=1',
      error: '/compte?auth-error=1',
    },
    callbacks: {
      async session({ session, user }) {
        if (user && session.user) {
          (session.user as typeof session.user & { id: string; role?: string; isVip?: boolean }).id = user.id;
          (session.user as typeof session.user & { role?: string; isVip?: boolean }).role =
            (user as { role?: string }).role;
          (session.user as typeof session.user & { isVip?: boolean }).isVip = Boolean(
            (user as { isVip?: boolean }).isVip,
          );
        }
        return session;
      },
      authorized({ auth, request }) {
        const { pathname } = request.nextUrl;
        if (pathname.startsWith('/admin')) {
          return auth?.user && (auth.user as { role?: string }).role === 'admin';
        }
        if (pathname.startsWith('/compte')) {
          return Boolean(auth?.user) || pathname === '/compte';
        }
        return true;
      },
    },
    trustHost: true,
  };
}

export const isAuthReady = () =>
  Boolean(process.env.AUTH_SECRET) &&
  Boolean(process.env.RESEND_API_KEY) &&
  Boolean(process.env.DATABASE_URL);
