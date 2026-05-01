import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@nacks/ui';
import { PageShell } from '@/components/layouts/PageShell';
import { PDPGallery } from '@/components/shop/PDPGallery';
import { PDPActions } from '@/components/shop/PDPActions';
import { PDPDetails } from '@/components/shop/PDPDetails';
import { PDPRelatedCard } from '@/components/shop/PDPRelatedCard';
import { artworks, formatPrice, getArtwork } from '@/lib/content/artworks';
import {
  getCharacterOrProject,
  isExperimentalProject,
} from '@/lib/content/characters';
import {
  buildArtwork,
  buildBreadcrumb,
  buildFAQ,
  serializeJsonLd,
} from '@/lib/seo/jsonld';

/**
 * PDP — Page détail œuvre. DA premium gallery (Zwirner / Hermès / Acne Studios).
 * Photo-first, calme, hierarchie info claire, certifications mises en valeur.
 *
 * Server component pour data fetching + SEO. Les sous-composants client
 * (PDPGallery, PDPActions, PDPDetails) gèrent l'interactivité.
 */

const INK = 'var(--color-ink, #0a0a0a)';
const CREAM = 'var(--color-cream, #f5f1e8)';

const FONT_SERIF = "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = "var(--font-body, Inter, system-ui, sans-serif)";

type Params = Promise<{ handle: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { handle } = await params;
  const artwork = getArtwork(handle);
  if (!artwork) return { title: 'Œuvre introuvable' };
  return {
    title: artwork.title,
    description: artwork.subtitle,
    openGraph: {
      title: `${artwork.title} — Nacks Galerie`,
      description: artwork.subtitle,
      type: 'article',
      locale: 'fr_FR',
      siteName: 'Nacks Galerie',
      url: `/oeuvres/${artwork.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${artwork.title} — Nacks Galerie`,
      description: artwork.subtitle,
    },
    alternates: {
      canonical: `/oeuvres/${artwork.slug}`,
    },
  };
}

export async function generateStaticParams() {
  return artworks.map((a) => ({ handle: a.slug }));
}

const TYPE_LABEL: Record<string, string> = {
  original: 'Original',
  giclee: 'Tirage limité',
  serigraphie: 'Sérigraphie limitée',
  poster: 'Open edition',
  figurine: 'Figurine éditée',
  merch: 'Merch',
};

export default async function ArtworkPage({ params }: { params: Params }) {
  const { handle } = await params;
  const artwork = getArtwork(handle);
  if (!artwork) notFound();

  const character = artwork.character ? getCharacterOrProject(artwork.character) : null;
  const characterIsExperimental = artwork.character
    ? isExperimentalProject(artwork.character)
    : false;

  // Œuvres de la même série / même personnage
  const sameSeries = artworks.filter(
    (a) =>
      a.slug !== artwork.slug &&
      artwork.character &&
      a.character === artwork.character,
  );
  const fallback = artworks.filter(
    (a) => a.slug !== artwork.slug && a.type === artwork.type,
  );
  const related = (sameSeries.length >= 3 ? sameSeries : [...sameSeries, ...fallback])
    .filter((a, i, arr) => arr.findIndex((b) => b.slug === a.slug) === i)
    .slice(0, 4);

  const eyebrow = TYPE_LABEL[artwork.type] ?? artwork.type;
  const isComing = artwork.status === 'coming';
  const isSoldOut = artwork.status === 'sold_out';

  // Description fallback : on combine subtitle + lore en 2-3 paragraphes éditoriaux
  const descriptionParas = buildDescription(artwork);

  return (
    <PageShell>
      {/* ==========================================================
       *  Section 1 — Galerie + Info (split cream)
       * ========================================================== */}
      <section
        aria-label={`${artwork.title} — galerie et information`}
        className="relative"
        style={{
          backgroundColor: CREAM,
          color: INK,
          paddingBlock: 'clamp(2.5rem, 5vh, 4.5rem)',
        }}
      >
        <Container size="full">
          {/* Breadcrumb */}
          <nav
            aria-label="Fil d'Ariane"
            className="mb-[clamp(2rem,3.5vh,3rem)] flex items-center"
            style={{
              gap: '0.5rem',
              fontFamily: FONT_BODY,
              fontSize: '0.7rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(10,10,10,0.55)',
            }}
          >
            <Link
              href="/"
              data-cursor="link"
              className="hover:text-[var(--color-ink)]"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              Accueil
            </Link>
            <span aria-hidden>/</span>
            <Link
              href="/oeuvres"
              data-cursor="link"
              className="hover:text-[var(--color-ink)]"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              Œuvres
            </Link>
            <span aria-hidden>/</span>
            <span style={{ color: INK }} className="truncate">
              {artwork.title}
            </span>
          </nav>

          {/* Split */}
          <div
            className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr]"
            style={{ gap: 'clamp(2rem, 4vw, 5rem)' }}
          >
            {/* ── Colonne gauche : galerie ── */}
            <div className="lg:sticky lg:top-[calc(var(--spacing,1px)*0+6rem)] lg:self-start">
              <PDPGallery
                variant={artwork.posterVariant}
                title={artwork.title}
                photo={artwork.photo}
              />
            </div>

            {/* ── Colonne droite : info & action ── */}
            <aside
              className="flex flex-col"
              style={{ gap: 'clamp(1.25rem, 2vh, 1.75rem)' }}
            >
              {/* Eyebrow */}
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: '0.72rem',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: 'rgba(10,10,10,0.55)',
                  margin: 0,
                }}
              >
                {eyebrow}
                {artwork.edition && ` · n° à attribuer / ${artwork.edition.size}`}
              </p>

              {/* Titre */}
              <h1
                style={{
                  fontFamily: FONT_SERIF,
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
                  lineHeight: 1.02,
                  letterSpacing: '-0.015em',
                  color: INK,
                  margin: 0,
                }}
                className="text-balance"
              >
                {artwork.title}
              </h1>

              {/* Year + dimensions + materials */}
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: '0.92rem',
                  lineHeight: 1.6,
                  color: 'rgba(10,10,10,0.65)',
                  margin: 0,
                }}
              >
                {artwork.year} · {artwork.dimensions} · {artwork.materials}
              </p>

              {/* Prix */}
              <div
                className="flex items-baseline justify-between"
                style={{
                  marginTop: 'clamp(0.5rem, 1vh, 1rem)',
                  paddingBlock: 'clamp(0.75rem, 1.4vh, 1rem)',
                  borderTop: '1px solid rgba(10,10,10,0.12)',
                  borderBottom: '1px solid rgba(10,10,10,0.12)',
                  gap: '1rem',
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: '0.72rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'rgba(10,10,10,0.55)',
                  }}
                >
                  {isComing ? 'Date à venir' : isSoldOut ? 'Vendue' : 'Prix'}
                </span>
                <span
                  style={{
                    fontFamily: FONT_SERIF,
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: 'clamp(1.6rem, 2.4vw, 2.1rem)',
                    color: INK,
                    fontVariantNumeric: 'tabular-nums',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {isComing ? '—' : formatPrice(artwork.priceCents)}
                </span>
              </div>

              {/* Édition */}
              {artwork.edition && !isComing && (
                <div className="flex flex-col" style={{ gap: '0.6rem' }}>
                  <p
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: '0.78rem',
                      lineHeight: 1.55,
                      color: 'rgba(10,10,10,0.65)',
                      margin: 0,
                    }}
                  >
                    Édition limitée · {artwork.edition.size} exemplaires ·
                    Numérotée et signée à la main · {artwork.edition.remaining}{' '}
                    restant{artwork.edition.remaining > 1 ? 's' : ''}
                  </p>
                  <div
                    aria-hidden
                    style={{
                      height: 2,
                      backgroundColor: 'rgba(10,10,10,0.08)',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        backgroundColor: INK,
                        width: `${
                          ((artwork.edition.size - artwork.edition.remaining) /
                            artwork.edition.size) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Actions (CTA + wishlist + status) */}
              <PDPActions
                slug={artwork.slug}
                title={artwork.title}
                status={artwork.status}
              />

              {/* Description courte (preview au-dessus du fold) */}
              <div
                className="flex flex-col"
                style={{
                  gap: 'clamp(0.6rem, 1vh, 0.85rem)',
                  marginTop: 'clamp(0.5rem, 1vh, 1rem)',
                }}
              >
                {descriptionParas.slice(0, 2).map((p, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: FONT_SERIF,
                      fontStyle: 'italic',
                      fontWeight: 400,
                      fontSize: 'clamp(0.95rem, 1.05vw, 1.05rem)',
                      lineHeight: 1.6,
                      color: 'rgba(10,10,10,0.78)',
                      margin: 0,
                    }}
                    className="text-balance"
                  >
                    {p}
                  </p>
                ))}
              </div>

              {/* Détails techniques expandable */}
              <PDPDetails
                rows={[
                  { label: 'Technique', value: artwork.materials },
                  { label: 'Support', value: supportLabel(artwork.type) },
                  { label: 'Année', value: String(artwork.year) },
                  { label: 'Dimensions', value: artwork.dimensions },
                  ...(artwork.edition
                    ? [
                        {
                          label: 'Édition',
                          value: `${artwork.edition.size} exemplaires numérotés`,
                        },
                      ]
                    : []),
                  {
                    label: 'Certificat',
                    value:
                      "Certificat d'authenticité signé au Posca, embossé, numéro unique",
                  },
                  {
                    label: 'Livraison',
                    value:
                      'France 35 € · International sur devis · Tube renforcé, 7 j ouvrés',
                  },
                ]}
              />

              {/* Lien univers / projet expérimental si applicable */}
              {character && characterIsExperimental ? (
                <div
                  className="flex items-center justify-between"
                  style={{
                    marginTop: 'clamp(0.5rem, 1vh, 0.75rem)',
                    paddingBlock: '1rem',
                    borderTop: '1px solid rgba(10,10,10,0.12)',
                    color: INK,
                    gap: '1rem',
                  }}
                >
                  <div className="flex flex-col" style={{ gap: '0.2rem' }}>
                    <span
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: '0.7rem',
                        letterSpacing: '0.22em',
                        textTransform: 'uppercase',
                        color: 'rgba(10,10,10,0.55)',
                      }}
                    >
                      Projet expérimental
                    </span>
                    <span
                      style={{
                        fontFamily: FONT_SERIF,
                        fontStyle: 'italic',
                        fontSize: 'clamp(1.05rem, 1.2vw, 1.2rem)',
                        color: INK,
                      }}
                    >
                      {character.name}
                    </span>
                  </div>
                </div>
              ) : character && (
                <Link
                  href={`/univers/${character.slug}`}
                  data-cursor="link"
                  data-cursor-label="Univers"
                  className="pdp-character-link group flex items-center justify-between"
                  style={{
                    marginTop: 'clamp(0.5rem, 1vh, 0.75rem)',
                    paddingBlock: '1rem',
                    borderTop: '1px solid rgba(10,10,10,0.12)',
                    color: INK,
                    textDecoration: 'none',
                    gap: '1rem',
                  }}
                >
                  <div className="flex flex-col" style={{ gap: '0.2rem' }}>
                    <span
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: '0.7rem',
                        letterSpacing: '0.22em',
                        textTransform: 'uppercase',
                        color: 'rgba(10,10,10,0.55)',
                      }}
                    >
                      Univers
                    </span>
                    <span
                      style={{
                        fontFamily: FONT_SERIF,
                        fontStyle: 'italic',
                        fontSize: 'clamp(1.05rem, 1.2vw, 1.2rem)',
                        color: INK,
                      }}
                    >
                      {character.name}
                    </span>
                  </div>
                  <span
                    aria-hidden
                    style={{
                      fontFamily: FONT_BODY,
                      color: 'rgba(10,10,10,0.55)',
                      transition: 'transform 320ms cubic-bezier(0.22,1,0.36,1)',
                    }}
                    className="pdp-character-arrow"
                  >
                    →
                  </span>
                  <style>{`
                    .pdp-character-link:hover .pdp-character-arrow {
                      transform: translateX(4px);
                      color: ${INK};
                    }
                  `}</style>
                </Link>
              )}
            </aside>
          </div>
        </Container>
      </section>

      {/* ==========================================================
       *  Section 2 — L'œuvre (story, ink alternance)
       * ========================================================== */}
      <section
        aria-label={`${artwork.title} — l'œuvre`}
        className="relative"
        style={{
          backgroundColor: INK,
          color: CREAM,
          paddingBlock: 'clamp(5rem, 9vh, 9rem)',
        }}
      >
        <Container size="full">
          <div
            className="mx-auto"
            style={{
              maxWidth: 'min(900px, 100%)',
            }}
          >
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: '0.72rem',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'rgba(245,241,232,0.55)',
                marginBottom: 'clamp(1rem, 2vh, 1.5rem)',
              }}
            >
              L&apos;œuvre
            </p>

            <h2
              style={{
                fontFamily: FONT_SERIF,
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.015em',
                color: CREAM,
                margin: 0,
                marginBottom: 'clamp(2rem, 3.5vh, 3rem)',
              }}
              className="text-balance"
            >
              {storyHeadline(artwork)}
            </h2>

            <div
              className="flex flex-col"
              style={{ gap: 'clamp(1rem, 1.6vh, 1.25rem)' }}
            >
              {descriptionParas.map((p, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: FONT_SERIF,
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: 'clamp(1rem, 1.15vw, 1.2rem)',
                    lineHeight: 1.65,
                    color: 'rgba(245,241,232,0.82)',
                    margin: 0,
                  }}
                  className="text-balance"
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Pull-quote style éditorial */}
            <blockquote
              style={{
                marginTop: 'clamp(2.5rem, 4vh, 3.5rem)',
                paddingLeft: 'clamp(1.5rem, 3vw, 2.5rem)',
                borderLeft: '2px solid rgba(245,241,232,0.35)',
              }}
            >
              <p
                style={{
                  fontFamily: FONT_SERIF,
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 'clamp(1.4rem, 2.4vw, 2rem)',
                  lineHeight: 1.3,
                  letterSpacing: '-0.01em',
                  color: CREAM,
                  margin: 0,
                }}
                className="text-balance"
              >
                « {artwork.lore} »
              </p>
              <cite
                style={{
                  display: 'block',
                  fontFamily: FONT_BODY,
                  fontStyle: 'normal',
                  fontSize: '0.72rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,241,232,0.5)',
                  marginTop: 'clamp(1rem, 1.5vh, 1.25rem)',
                }}
              >
                Notes d&apos;atelier — Nacks
              </cite>
            </blockquote>

            {/* Mini certificat block */}
            <div
              className="grid"
              style={{
                marginTop: 'clamp(3rem, 5vh, 4rem)',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 'clamp(1.5rem, 3vw, 2.5rem)',
                paddingTop: 'clamp(2rem, 3vh, 2.5rem)',
                borderTop: '1px solid rgba(245,241,232,0.12)',
              }}
            >
              <CertCell
                label="Certificat"
                value="Authentifié, embossé, signé au Posca"
              />
              <CertCell
                label="Provenance"
                value="Atelier Nacks — Sarcelles, 95"
              />
              <CertCell
                label="Retours"
                value="14 jours, conformément au Code de la consommation"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ==========================================================
       *  Section 3 — Œuvres dans la même série (cream alternance)
       * ========================================================== */}
      {related.length > 0 && (
        <section
          aria-label="Œuvres similaires"
          className="relative"
          style={{
            backgroundColor: CREAM,
            color: INK,
            paddingBlock: 'clamp(5rem, 9vh, 9rem)',
          }}
        >
          <Container size="full">
            <header className="mb-[clamp(3rem,5vh,4rem)] grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: '0.72rem',
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: 'rgba(10,10,10,0.55)',
                    marginBottom: 'clamp(1rem, 2vh, 1.5rem)',
                  }}
                >
                  À découvrir
                </p>
                <h2
                  style={{
                    fontFamily: FONT_SERIF,
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: 'clamp(2rem, 4.2vw, 3.4rem)',
                    lineHeight: 1.05,
                    letterSpacing: '-0.015em',
                    color: INK,
                    margin: 0,
                  }}
                  className="text-balance"
                >
                  {character
                    ? `Œuvres dans la même série.`
                    : `Œuvres similaires.`}
                </h2>
              </div>

              <Link
                href="/oeuvres"
                data-cursor="link"
                data-cursor-label="Galerie"
                className="group inline-flex items-center self-end whitespace-nowrap pdp-related-cta"
                style={{
                  fontFamily: FONT_SERIF,
                  fontStyle: 'italic',
                  fontSize: 'clamp(1rem, 1.05vw, 1.15rem)',
                  color: INK,
                  paddingBottom: '4px',
                  borderBottom: '1px solid rgba(10,10,10,0.35)',
                  textDecoration: 'none',
                }}
              >
                <span>Toutes les œuvres&nbsp;→</span>
              </Link>
            </header>

            <div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              style={{ gap: 'clamp(1rem, 2.5vw, 2rem)' }}
            >
              {related.map((a, i) => (
                <PDPRelatedCard key={a.slug} art={a} index={i} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── JSON-LD — VisualArtwork + Product + BreadcrumbList + FAQPage ── */}
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
                question: 'Quels sont les délais de livraison ?',
                answer:
                  'France : 3 à 7 jours ouvrés via Colissimo Suivi. International : 5 à 12 jours via UPS ou DHL.',
              },
              {
                question: 'Puis-je me rétracter ?',
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

/* ============================================================
 *  Helpers
 * ============================================================ */

function CertCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col" style={{ gap: '0.4rem' }}>
      <p
        style={{
          fontFamily: FONT_BODY,
          fontSize: '0.7rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(245,241,232,0.5)',
          margin: 0,
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: FONT_SERIF,
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: '0.95rem',
          lineHeight: 1.5,
          color: 'rgba(245,241,232,0.82)',
          margin: 0,
        }}
      >
        {value}
      </p>
    </div>
  );
}

function supportLabel(type: string): string {
  const map: Record<string, string> = {
    original: 'Toile montée sur châssis bois',
    giclee: 'Papier Hahnemühle Photo Rag 308 g',
    serigraphie: 'Papier Somerset Satin 410 g',
    poster: 'Papier couché 200 g',
    figurine: 'Résine époxy peinte main',
    merch: 'Coton biologique',
  };
  return map[type] ?? '—';
}

function storyHeadline(artwork: { title: string; type: string }): string {
  if (artwork.type === 'original') return 'Une pièce unique, peinte à la main.';
  if (artwork.type === 'serigraphie')
    return 'Sérigraphie tirée à la main, signée et numérotée.';
  if (artwork.type === 'giclee')
    return 'Tirage limité, papier d\'art, signature originale.';
  if (artwork.type === 'figurine')
    return 'Figurine éditée, peinte main, numérotée.';
  if (artwork.type === 'poster') return 'Poster open edition, à accrocher.';
  return artwork.title;
}

function buildDescription(artwork: {
  subtitle: string;
  lore: string;
  type: string;
  materials: string;
  dimensions: string;
}): string[] {
  // Lore principal + une phrase contextualisante sur la matérialité
  const para1 = artwork.lore;
  const para2 = `${artwork.subtitle}, ${artwork.dimensions}. Réalisé en ${artwork.materials.toLowerCase()}.`;
  const para3 =
    'Chaque pièce est accompagnée de son certificat d\'authenticité — papier embossé, signé au Posca, avec un numéro unique enregistré dans le registre de l\'atelier.';
  return [para1, para2, para3];
}
