import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@nacks/ui';
import { PageShell } from '@/components/layouts/PageShell';
import { ArtworkCard } from '@/components/shop/ArtworkCard';
import { ArtPoster } from '@/components/art/ArtPoster';
import { ProductAccordion } from '@/components/shop/ProductAccordion';
import { ArtworkGallery } from '@/components/shop/ArtworkGallery';
import { SplitHeading } from '@/components/polish/SplitHeading';
import { ShareButtons } from '@/components/polish/ShareButtons';
import { artworks, formatPrice, getArtwork } from '@/lib/content/artworks';
import { getCharacter } from '@/lib/content/characters';
import {
  buildArtwork,
  buildBreadcrumb,
  buildFAQ,
  serializeJsonLd,
} from '@/lib/seo/jsonld';

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
          {/* Gauche : image + lightbox (client component) */}
          <div className="lg:col-span-7">
            <ArtworkGallery variant={artwork.posterVariant} title={artwork.title} />
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

              {/* Share */}
              <div className="mt-2 border-t border-[var(--color-cream-100)] pt-6">
                <ShareButtons
                  url={`/oeuvres/${artwork.slug}`}
                  title={`${artwork.title} — Nacks Galerie`}
                  description={artwork.subtitle}
                />
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

        {/* Accordion coloré : FAQ / Livraison / Authenticité / Contact */}
        <section className="mx-auto mt-20 max-w-3xl">
          <SplitHeading
            text="Tout ce qu'il faut savoir."
            as="h2"
            className="mb-8 block font-[var(--font-display)] font-[500] leading-[1] tracking-[-0.025em] text-[var(--color-cream)]"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
            mode="words"
            stagger={0.03}
            blur
          />
          <ProductAccordion
            items={[
              {
                id: 'authenticite',
                title: "Authenticité & certificat",
                tone: 'peach',
                content: (
                  <>
                    <p>
                      Chaque pièce est accompagnée d'un certificat d'authenticité (COA) papier, signé au
                      Posca par Nacks, avec embossage sec et numéro unique. La provenance est aussi
                      enregistrée dans un registre numérique consultable à tout moment.
                    </p>
                    <p className="mt-2">
                      Pour les éditions limitées, le numéro de série est peint à la main au dos de la
                      pièce.
                    </p>
                  </>
                ),
              },
              {
                id: 'livraison',
                title: 'Livraison & emballage',
                tone: 'blue',
                content: (
                  <>
                    <p>
                      <strong>France métropolitaine :</strong> Colissimo Suivi, 3 à 7 jours ouvrés.
                      Frais offerts dès 300 €.
                    </p>
                    <p className="mt-1">
                      <strong>International :</strong> UPS ou DHL selon destination (5 à 12 jours).
                      Douanes à la charge de l'acheteur.
                    </p>
                    <p className="mt-1">
                      <strong>Retrait atelier :</strong> Sarcelles, sur rendez-vous, gratuit.
                    </p>
                    <p className="mt-2">
                      Emballage : carton rigide, papier de soie, coins renforcés. Assurance incluse à
                      hauteur de la valeur déclarée.
                    </p>
                  </>
                ),
              },
              {
                id: 'retours',
                title: 'Retours & remboursement',
                tone: 'rose',
                content: (
                  <>
                    <p>
                      14 jours pour se rétracter sans justification, conformément au Code de la
                      consommation. L'œuvre doit revenir dans son emballage d'origine, état parfait,
                      frais de retour à ta charge sauf défaut.
                    </p>
                    <p className="mt-2">
                      Remboursement intégral sous 10 jours après réception et inspection, sur la carte
                      utilisée pour l'achat.
                    </p>
                  </>
                ),
              },
              {
                id: 'support',
                title: 'Contact & support',
                tone: 'acid',
                content: (
                  <>
                    <p>
                      Une question avant l'achat, un doute sur le format, une demande de devis
                      personnalisé ? Écris directement :
                    </p>
                    <p className="mt-2 font-[var(--font-mono)] text-sm">
                      <a href="mailto:contact@nacksgalerie.com" className="underline">
                        contact@nacksgalerie.com
                      </a>
                    </p>
                    <p className="mt-2">Réponse sous 48 à 72 heures ouvrées, par Nacks.</p>
                  </>
                ),
              },
            ]}
          />
        </section>
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
      {/* JSON-LD — VisualArtwork + Product + BreadcrumbList + FAQPage */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd([
            ...buildArtwork(artwork, character),
            buildBreadcrumb([
              { name: 'Accueil', href: '/' },
              { name: 'Œuvres', href: '/oeuvres' },
              { name: artwork.title, href: `/oeuvres/${artwork.slug}` },
            ]),
            buildFAQ([
              {
                question: "L'œuvre est-elle authentique ?",
                answer:
                  "Oui. Chaque œuvre est accompagnée d'un certificat d'authenticité papier signé au Posca, avec embossage sec et numéro unique.",
              },
              {
                question: "Quels sont les délais de livraison ?",
                answer:
                  "France : 3 à 7 jours ouvrés via Colissimo Suivi. International : 5 à 12 jours via UPS ou DHL.",
              },
              {
                question: "Puis-je me rétracter ?",
                answer:
                  "Oui, 14 jours à compter de la réception, conformément au Code de la consommation français. L'œuvre doit revenir en parfait état.",
              },
            ]),
          ]),
        }}
      />
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
