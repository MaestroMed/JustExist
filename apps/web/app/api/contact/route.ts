import { NextResponse } from 'next/server';
import { isEmail, isNonEmptyString, sanitizeText } from '@/lib/validation';
import { hitRateLimit, getClientKey } from '@/lib/server/rate-limit';

const CONTACT_TYPES = new Set(['general', 'press', 'collab', 'commission', 'other']);

export async function POST(request: Request) {
  const rl = hitRateLimit({
    key: `contact:${getClientKey(request.headers)}`,
    capacity: 3,
    refillPerMinute: 2,
  });
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: 'Trop de messages. Réessaie dans une minute.' },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Payload invalide.' }, { status: 400 });
  }

  const name = sanitizeText(body.name, 120);
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const subject = sanitizeText(body.subject, 255);
  const message = sanitizeText(body.message ?? body.body, 3000);
  const typeIn = sanitizeText(body.type, 40);
  const type = CONTACT_TYPES.has(typeIn) ? typeIn : 'general';

  const errors: string[] = [];
  if (!isNonEmptyString(name, 120)) errors.push('Nom requis.');
  if (!isEmail(email)) errors.push('Email invalide.');
  if (!isNonEmptyString(subject, 255)) errors.push('Sujet requis.');
  if (!isNonEmptyString(message, 3000)) errors.push('Message requis.');
  if (errors.length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const hasDb = Boolean(process.env.DATABASE_URL);
  if (hasDb) {
    try {
      const { getDb, contactMessages } = await import('@nacks/db');
      await getDb().insert(contactMessages).values({
        name,
        email,
        subject,
        body: message,
        type,
        status: 'new',
      });
    } catch (e) {
      console.error('[contact] DB insert failed:', e);
    }
  } else {
    console.info('[contact] (no DB) message from', email, 'subject:', subject);
  }

  return NextResponse.json({ ok: true });
}
