import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@nacks/ui';
import { PageShell } from '@/components/layouts/PageShell';
import { ArtworkCard } from '@/components/shop/ArtworkCard';
import { ArtPoster } from '@/components/art/ArtPoster';
import { artworks, formatPrice, getArtwork } from '@/lib/content/artworks';
import { getCharacter } from '@/lib/content/characters';

type Params = Promise<{ handle: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { handle } = await params;
  const artwork = getArtwork(handle);
  if (!artwork) return { title: 'Œuvre introuvable' };
  return {
    title: artwork.title,
    description: artwork.subtitle,
  };
}

export async function generateStaticParams() {
  return artworks.map((a) => ({ handle: a.slug }));
}

export default async function ArtworkPage({ params }: { params: Params }) {
  const { handle } = await params;
  const artwork = getArtwork(handle);
  if (!artwork) notFound();

  const character = artwork.character ? getCharacter(artwork.character) : null;
  const related = artworks
    .filter((a) => a.slug !== artwork.slug && (a.character === artwork.character || a.type === artwork.type))
    .slice(0, 3);

  const soldOut = artwork.status === 'sold_out';
  const coming = artwork.status === 'coming';

  return (
    <PageShell>
      <Container size="full" className="pt-10 md:pt-14">
        {/* Breadcrumb */}
        <nav className="mb-10 flex items-center gap-2 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.25em] text-[var(--color-cream-600)]">
          <Link href="/oeuvres" className="hover:text-[var(--color-cream)]" data-cursor="link">Œuvres</Link>
          <span>/</span>
          <span className="truncate text-[var(--color-cream)]">{artwork.title}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Gauche : image */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm shadow-[0_60px_160px_-60px_rgba(0,0,0,0.9)]">
              <ArtPoster variant={artwork.posterVariant} label={artwork.title} />
            </div>
            {/* Mini gallery placeholders — 3 autres vues */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {['detail', 'signature', 'context'].map((view) => (
                <div
                  key={view}
                  className="relative aspect-square overflow-hidden rounded-sm bg-[var(--color-cream-100)] opacity-60"
                >
                  <ArtPoster variant={artwork.posterVariant} label={`${artwork.title} — ${view}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Droite : info sticky */}
          <aside className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <div className="flex flex-col gap-6">
              {/* Type */}
              <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-blood)]">
                {typeLabel(artwork.type)}
                {artwork.edition && ` · édition ${artwork.edition.size}`}
              </p>

              {/* Titre */}
              <h1
                className="font-[var(--font-display)] font-[500] leading-[0.95] tracking-[-0.03em] text-[var(--color-cream)]"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
              >
                {artwork.title}
              </h1>
              <p className="font-[var(--font-body)] text-base text-[var(--color-cream-600)]">
                {artwork.subtitle}
              </p>

              {/* Lore */}
              <p className="font-[var(--font-body)] text-sm italic leading-[1.6] text-[var(--color-cream-600)]">
                « {artwork.lore} »
              </p>

              {/* Prix */}
              <div className="flex items-baseline justify-between gap-4 border-y border-[var(--color-cream-100)] py-6">
                <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.25em] text-[var(--color-cream-600)]">
                  {coming ? 'Date à venir' : soldOut ? 'Vendu' : 'Prix'}
                </span>
                <span className="font-[var(--font-mono)] text-3xl font-[500] tabular-nums text-[var(--color-cream)]">
                  {coming ? '—' : formatPrice(artwork.priceCents)}
                </span>
              </div>

              {/* Stock / édition */}
              {artwork.edition && !soldOut && !coming && (
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between font-[var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--color-cream-600)]">
                    <span>Restants</span>
                    <span>{artwork.edition.remaining} / {artwork.edition.size}</span>
                  </div>
                  <div className="h-[2px] overflow-hidden bg-[var(--color-cream-100)]">
                    <div
                      className="h-full bg-[var(--color-blood)]"
                      style={{ width: `${((artwork.edition.size - artwork.edition.remaining) / artwork.edition.size) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* CTA */}
              {!coming && !soldOut && (
                <button
                  type="button"
                  disabled
                  className="group inline-flex w-full items-center justify-between bg-[var(--color-cream)] px-8 py-5 font-[var(--font-display)] text-sm font-[500] uppercase tracking-[0.2em] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-blood)] hover:text-[var(--color-cream)] disabled:cursor-not-allowed disabled:opacity-70"
                  data-cursor="buy"
                  data-cursor-label="Ajouter"
                  title="Sprint 2 : Stripe Payment Intents"
                >
                  <span>Ajouter au panier</span>
                  <span>→</span>
                </button>
              )}

              {soldOut && (
                <div className="flex flex-col gap-2 border border-[var(--color-cream-100)] p-6 text-center">
                  <p className="font-[var(--font-display)] text-lg text-[var(--color-cream)]">Pièce vendue</p>
                  <p className="font-[var(--font-body)] text-sm text-[var(--color-cream-600)]">
                    Rejoins le cercle pour être prévenu des prochains drops similaires.
                  </p>
                </div>
              )}

              {coming && (
                <div className="flex flex-col gap-2 border border-[var(--color-blood)] p-6 text-center">
                  <p className="font-[var(--font-display)] text-lg text-[var(--color-blood)]">Drop à venir</p>
                  <p className="font-[var(--font-body)] text-sm text-[var(--color-cream-600)]">
                    Ouverture bientôt. Date exacte dans la prochaine newsletter.
                  </p>
                </div>
              )}

              {/* Spécifications */}
              <div className="mt-4 flex flex-col gap-3 border-t border-[var(--color-cream-100)] pt-6">
                <h3 className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.3em] text-[var(--color-cream-600)]">
                  Spécifications
                </h3>
                <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 font-[var(--font-body)] text-sm">
                  <dt className="font-[var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--color-cream-600)]">Dimensions</dt>
                  <dd className="text-[var(--color-cream)]">{artwork.dimensions}</dd>
                  <dt className="font-[var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--color-cream-600)]">Année</dt>
                  <dd className="text-[var(--color-cream)]">{artwork.year}</dd>
                  <dt className="font-[var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--color-cream-600)]">Matériaux</dt>
                  <dd className="text-[var(--color-cream)]">{artwork.materials}</dd>
                  <dt className="font-[var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--color-cream-600)]">Signature</dt>
                  <dd className="text-[var(--color-cream)]">Au Posca, au recto</dd>
                  <dt className="font-[var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--color-cream-600)]">Certificat</dt>
                  <dd className="text-[var(--color-cream)]">COA papier avec embossage</dd>
                  <dt className="font-[var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--color-cream-600)]">Expédition</dt>
                  <dd className="text-[var(--color-cream)]">7 jours ouvrés, tube renforcé</dd>
                </dl>
              </div>

              {character && (
                <Link
                  href={`/univers/${character.slug}`}
                  className="mt-6 flex items-center justify-between gap-4 border border-[var(--color-cream-100)] px-6 py-4 transition-colors hover:border-[var(--color-cream)]"
                  data-cursor="link"
                >
                  <div>
                    <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.3em] text-[var(--color-cream-600)]">
                      Personnage
                    </p>
                    <p className="mt-1 font-[var(--font-display)] text-lg text-[var(--color-cream)]">
                      {character.name}
                    </p>
                  </div>
                  <span className="text-[var(--color-cream-600)]">→</span>
                </Link>
              )}
            </div>
          </aside>
        </div>
      </Container>

      {related.length > 0 && (
        <Container size="full" className="py-24">
          <div className="mb-10 flex items-end justify-between">
            <h2
              className="font-[var(--font-display)] font-[500] leading-[1] tracking-[-0.02em] text-[var(--color-cream)]"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
            >
              Tu aimeras aussi
            </h2>
            <Link
              href="/oeuvres"
              className="font-[var(--font-mono)] text-xs uppercase tracking-[0.25em] text-[var(--color-cream-600)] hover:text-[var(--color-cream)]"
              data-cursor="link"
            >
              Toutes les œuvres →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <ArtworkCard key={a.slug} artwork={a} />
            ))}
          </div>
        </Container>
      )}
    </PageShell>
  );
}

function typeLabel(t: string) {
  const map: Record<string, string> = {
    original: 'Original',
    giclee: 'Giclée',
    serigraphie: 'Sérigraphie',
    poster: 'Poster',
    figurine: 'Figurine',
    merch: 'Merch',
  };
  return map[t] ?? t;
}
