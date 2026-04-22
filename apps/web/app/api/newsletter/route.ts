import { NextResponse } from 'next/server';
import { isEmail, sanitizeText } from '@/lib/validation';
import { hitRateLimit, getClientKey } from '@/lib/server/rate-limit';

export async function POST(request: Request) {
  const key = `newsletter:${getClientKey(request.headers)}`;
  const rl = hitRateLimit({ key, capacity: 3, refillPerMinute: 2 });
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: 'Trop de tentatives, réessaie dans une minute.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil(rl.retryAfterMs / 1000)) } },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Payload invalide.' }, { status: 400 });
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const name = sanitizeText(body.name, 120) || null;
  const source = sanitizeText(body.source, 64) || 'site';

  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: 'Email invalide.' }, { status: 400 });
  }

  const hasDb = Boolean(process.env.DATABASE_URL);
  if (hasDb) {
    try {
      const { getDb, newsletterSubscribers } = await import('@nacks/db');
      await getDb()
        .insert(newsletterSubscribers)
        .values({ email, name, source, status: 'subscribed' })
        .onConflictDoNothing({ target: newsletterSubscribers.email });
    } catch (e) {
      console.error('[newsletter] DB insert failed:', e);
    }
  } else {
    console.info('[newsletter] (no DB) subscription from', email, 'source:', source);
  }

  // Envoi email de bienvenue si Resend configuré
  const hasResend = Boolean(process.env.RESEND_API_KEY);
  if (hasResend) {
    try {
      const [{ Resend }, { WelcomeEmail, renderEmail }] = await Promise.all([
        import('resend'),
        import('@nacks/emails'),
      ]);
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { html, text } = await renderEmail(WelcomeEmail({ firstName: name ?? undefined }));
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? 'contact@nacksgalerie.com',
        to: email,
        subject: 'Bienvenue dans le cercle',
        html,
        text,
      });
    } catch (e) {
      console.error('[newsletter] Resend send failed:', e);
    }
  }

  return NextResponse.json({ ok: true });
}
