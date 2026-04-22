import { NextResponse } from 'next/server';
import { isEmail, isNonEmptyString, sanitizeText } from '@/lib/validation';
import { hitRateLimit, getClientKey } from '@/lib/server/rate-limit';

const BUDGET_BANDS = new Set([
  '1 500 – 2 500 €',
  '2 500 – 4 000 €',
  '4 000 – 6 000 €',
  '6 000 € et plus',
]);

export async function POST(request: Request) {
  const rl = hitRateLimit({
    key: `commission:${getClientKey(request.headers)}`,
    capacity: 2,
    refillPerMinute: 1,
  });
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: 'Trop de demandes. Réessaie dans une minute.' },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Payload invalide.' }, { status: 400 });
  }

  const firstName = sanitizeText(body.firstName, 120);
  const lastName = sanitizeText(body.lastName, 120);
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const phone = sanitizeText(body.phone, 40) || null;
  const occasion = sanitizeText(body.occasion, 120) || null;
  const budgetBand = sanitizeText(body.budgetBand, 40) || null;
  const dimensions = sanitizeText(body.dimensions, 120) || null;
  const brief = sanitizeText(body.brief, 3000);
  const deadline = sanitizeText(body.deadline, 120) || null;
  const source = sanitizeText(body.source, 80) || null;

  const errors: string[] = [];
  if (!isNonEmptyString(firstName, 120)) errors.push('Prénom requis.');
  if (!isNonEmptyString(lastName, 120)) errors.push('Nom requis.');
  if (!isEmail(email)) errors.push('Email invalide.');
  if (!isNonEmptyString(brief, 3000)) errors.push('Brief requis.');
  if (budgetBand && !BUDGET_BANDS.has(budgetBand)) errors.push('Budget hors plage.');
  if (errors.length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  // Scoring basique — permet à Nacks d'arbitrer vite
  let score = 0;
  if (budgetBand === '6 000 € et plus') score += 30;
  else if (budgetBand === '4 000 – 6 000 €') score += 20;
  else if (budgetBand === '2 500 – 4 000 €') score += 10;
  if (brief.length > 400) score += 10;
  if (deadline && /\d/.test(deadline)) score += 5;
  if (source === 'TikTok' || source === 'Instagram') score += 5;

  const hasDb = Boolean(process.env.DATABASE_URL);
  if (hasDb) {
    try {
      const { getDb, commissions } = await import('@nacks/db');
      await getDb().insert(commissions).values({
        firstName,
        lastName,
        email,
        phone,
        occasion,
        budgetBand,
        dimensions,
        brief,
        deadline,
        source,
        score,
        status: 'new',
      });
    } catch (e) {
      console.error('[commission] DB insert failed:', e);
    }
  } else {
    console.info('[commission] (no DB) candidature from', email, 'score:', score);
  }

  const hasResend = Boolean(process.env.RESEND_API_KEY);
  if (hasResend) {
    try {
      const [{ Resend }, { CommissionReceiptEmail, renderEmail }] = await Promise.all([
        import('resend'),
        import('@nacks/emails'),
      ]);
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { html, text } = await renderEmail(
        CommissionReceiptEmail({
          firstName,
          budgetBand: budgetBand ?? 'À discuter',
          deadline: deadline ?? undefined,
        }),
      );
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? 'contact@nacksgalerie.com',
        to: email,
        subject: 'Candidature reçue — Nacks Galerie',
        html,
        text,
      });
    } catch (e) {
      console.error('[commission] Resend send failed:', e);
    }
  }

  return NextResponse.json({ ok: true, score });
}
