/**
 * Hook Sentry — no-op tant que @sentry/nextjs n'est pas installé.
 * Préparé pour l'install Sprint 2+ quand on a le SENTRY_DSN.
 * API stable : captureException() + isSentryEnabled() utilisables partout.
 */

export function isSentryEnabled(): boolean {
  return Boolean(process.env.SENTRY_DSN);
}

export async function captureException(
  error: unknown,
  context?: Record<string, unknown>,
): Promise<void> {
  // TODO Sprint 2+ : wire @sentry/nextjs quand SENTRY_DSN posé.
  // Pour l'instant on log en console (visible Vercel logs).
  if (context) {
    console.error('[nacks] exception:', error, '— ctx:', context);
  } else {
    console.error('[nacks] exception:', error);
  }
}
