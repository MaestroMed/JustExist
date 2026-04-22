import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@nacks/ui';
import { PageShell } from '@/components/layouts/PageShell';

export const metadata: Metadata = {
  title: 'Commander',
  description: 'Tunnel de paiement sécurisé Nacks Galerie.',
  robots: { index: false, follow: false },
};

const STEPS = [
  { n: 1, label: 'Identification', body: 'Email ou magic link.' },
  { n: 2, label: 'Livraison', body: 'Adresse, mode, créneau.' },
  { n: 3, label: 'Paiement', body: 'Carte, Apple Pay, Google Pay, SEPA.' },
  { n: 4, label: 'Confirmation', body: 'Récap + emails automatiques.' },
] as const;

export default function CheckoutPage() {
  return (
    <PageShell>
      <Container size="wide" className="py-20 md:py-24">
        <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-blood)]">
          Tunnel de paiement
        </p>
        <h1
          className="mt-4 font-[var(--font-display)] font-[500] leading-[0.95] tracking-[-0.03em] text-[var(--color-cream)]"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
        >
          Bientôt.
        </h1>
        <p className="mt-4 max-w-2xl font-[var(--font-body)] text-lg text-[var(--color-cream-600)]">
          Le tunnel de paiement complet — Stripe Elements embeddé, 4 étapes, UX 100 % Nacks — arrive au
          Sprint 6. Voici son architecture.
        </p>

        <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col gap-4">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className="relative flex items-start gap-6 border border-[var(--color-cream-100)] p-6 transition-colors hover:border-[var(--color-cream)] md:p-8"
              >
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-[var(--color-cream)] font-[var(--font-mono)] text-sm font-[500] text-[var(--color-cream)]">
                  0{s.n}
                </span>
                <div>
                  <p className="font-[var(--font-display)] text-xl font-[500] text-[var(--color-cream)]">
                    {s.label}
                  </p>
                  <p className="mt-1 font-[var(--font-body)] text-sm text-[var(--color-cream-600)]">
                    {s.body}
                  </p>
                </div>
                {i < STEPS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-4 left-10 h-4 w-px bg-[var(--color-cream-100)]"
                  />
                )}
              </div>
            ))}
          </div>

          <aside className="flex flex-col gap-6">
            <div className="flex flex-col gap-3 border border-[var(--color-cream-100)] bg-[var(--color-ink)] p-8">
              <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-blood)]">
                Engagements
              </p>
              <ul className="flex flex-col gap-3 font-[var(--font-body)] text-sm text-[var(--color-cream-600)]">
                <li>Aucun rebond sur page Stripe générique — UX continue.</li>
                <li>Paiement Apple Pay / Google Pay / SEPA natifs sans rebond.</li>
                <li>Aucune donnée bancaire stockée chez nous — Stripe gère.</li>
                <li>Confirmation instantanée + email personnel signé Nacks.</li>
                <li>Anti-bot (Cloudflare Turnstile) pendant les drops à forte demande.</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3 border border-[var(--color-cream-100)] p-8">
              <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-cream-600)]">
                En attendant
              </p>
              <p className="font-[var(--font-body)] text-sm text-[var(--color-cream-600)]">
                Rejoins le cercle pour être prévenu dès que le premier drop avec paiement live est ouvert.
              </p>
              <Link
                href="/#cercle"
                className="mt-2 inline-flex items-center gap-2 font-[var(--font-mono)] text-xs uppercase tracking-[0.25em] text-[var(--color-cream)] transition-opacity hover:opacity-70"
                data-cursor="link"
              >
                Inscription newsletter →
              </Link>
            </div>
          </aside>
        </div>
      </Container>
    </PageShell>
  );
}
