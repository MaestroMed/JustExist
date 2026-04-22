import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@nacks/ui';
import { PageShell, PageHeader } from '@/components/layouts/PageShell';
import { ArtworkCard } from '@/components/shop/ArtworkCard';
import { getFeaturedArtworks } from '@/lib/content/artworks';

export const metadata: Metadata = {
  title: 'Panier',
  description: 'Tes œuvres en attente de validation.',
  robots: { index: false, follow: false },
};

export default function PanierPage() {
  const featured = getFeaturedArtworks(3);

  return (
    <PageShell>
      <Container size="wide" className="py-20 md:py-24">
        <PageHeader eyebrow="Panier · 0 article" title="Ton panier attend." />

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          {/* Empty state */}
          <div className="flex flex-col items-start gap-8 rounded-sm border border-[var(--color-cream-100)] bg-[var(--color-ink)] p-10 md:p-16">
            <svg
              aria-hidden="true"
              width="88"
              height="88"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-[var(--color-cream-400)]"
            >
              <path d="M3 6h18l-2 13H5L3 6z" />
              <path d="M8 6V4a4 4 0 1 1 8 0v2" />
            </svg>
            <div>
              <h2
                className="font-[var(--font-display)] font-[500] leading-[1] tracking-[-0.02em] text-[var(--color-cream)]"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
              >
                Aucune œuvre pour l'instant.
              </h2>
              <p className="mt-4 max-w-md font-[var(--font-body)] text-base text-[var(--color-cream-600)]">
                Les œuvres que tu ajoutes au panier apparaissent ici. Tu peux les retenir 24&nbsp;h avant
                de finaliser. Tant qu'elles ne sont pas payées, elles restent disponibles pour tout le monde.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:flex-row">
              <Link
                href="/oeuvres"
                className="inline-flex items-center gap-2 bg-[var(--color-cream)] px-6 py-3 font-[var(--font-display)] text-sm uppercase tracking-[0.2em] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-blood)] hover:text-[var(--color-cream)]"
                data-cursor="link"
                data-cursor-label="Explorer"
              >
                Explorer la galerie →
              </Link>
              <Link
                href="/drops"
                className="inline-flex items-center gap-2 border border-[var(--color-cream)] px-6 py-3 font-[var(--font-display)] text-sm uppercase tracking-[0.2em] text-[var(--color-cream)] transition-colors hover:bg-[var(--color-cream)] hover:text-[var(--color-ink)]"
                data-cursor="link"
              >
                Voir les drops →
              </Link>
            </div>
            <p className="mt-4 font-[var(--font-mono)] text-xs text-[var(--color-cream-400)]">
              Le tunnel de paiement complet arrivera au Sprint 6 (Stripe Payment Intents embeddé).
            </p>
          </div>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            <div className="flex flex-col gap-3 border border-[var(--color-cream-100)] p-6">
              <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-cream-600)]">
                Récapitulatif
              </p>
              <dl className="flex flex-col gap-3 font-[var(--font-body)] text-sm">
                <div className="flex items-center justify-between text-[var(--color-cream-600)]">
                  <dt>Sous-total</dt>
                  <dd className="tabular-nums">0 €</dd>
                </div>
                <div className="flex items-center justify-between text-[var(--color-cream-600)]">
                  <dt>Livraison</dt>
                  <dd className="tabular-nums">— €</dd>
                </div>
                <div className="flex items-center justify-between border-t border-[var(--color-cream-100)] pt-3 text-[var(--color-cream)]">
                  <dt className="font-[var(--font-display)] text-base">Total estimé</dt>
                  <dd className="font-[var(--font-mono)] text-xl tabular-nums">0 €</dd>
                </div>
              </dl>
              <button
                type="button"
                disabled
                className="mt-2 w-full cursor-not-allowed bg-[var(--color-cream)]/20 px-6 py-3 font-[var(--font-display)] text-sm uppercase tracking-[0.2em] text-[var(--color-cream)]"
              >
                Passer commande
              </button>
            </div>
            <div className="flex flex-col gap-2 border border-[var(--color-cream-100)] p-6 font-[var(--font-body)] text-sm text-[var(--color-cream-600)]">
              <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.3em] text-[var(--color-cream-600)]">
                Avantages cercle
              </p>
              <p>Frais de port France offerts dès 300&nbsp;€.</p>
              <p>Accès aux drops VIP 24&nbsp;h avant.</p>
              <p>Carton rigide et papier de soie systématique.</p>
            </div>
          </aside>
        </div>

        {featured.length > 0 && (
          <section className="mt-24">
            <div className="mb-8 flex items-end justify-between">
              <h2
                className="font-[var(--font-display)] font-[500] leading-[1] tracking-[-0.02em] text-[var(--color-cream)]"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
              >
                Peut-être celles-ci ?
              </h2>
              <Link
                href="/oeuvres"
                className="font-[var(--font-mono)] text-xs uppercase tracking-[0.25em] text-[var(--color-cream-600)] hover:text-[var(--color-cream)]"
                data-cursor="link"
              >
                Toutes les œuvres →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {featured.map((a) => (
                <ArtworkCard key={a.slug} artwork={a} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </PageShell>
  );
}
