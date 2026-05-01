import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@nacks/ui';
import { PageShell } from '@/components/layouts/PageShell';
import { ArtPoster } from '@/components/art/ArtPoster';
import {
  artworks,
  formatPrice,
  getArtwork,
  type Artwork,
} from '@/lib/content/artworks';
import {
  drops,
  getDrop,
  getAllDrops,
  type Drop,
} from '@/lib/content/drops';
import {
  buildBreadcrumb,
  serializeJsonLd,
} from '@/lib/seo/jsonld';

/**
 * SÉRIE — page détail.
 *
 * DA e-commerce galerie premium (Hermès Collection / David Zwirner Series).
 * Hero série calme + story + grid des œuvres + autres séries.
 *
 * Pas de countdown, pas d'urgence. Status calme : "Édition close" / "X / Y restantes" / "Bientôt".
 *
 * Server component pour data + SEO. Animations stagger via la grille
 * Motion whileInView dans les sous-composants.
 */

const INK = 'var(--color-ink, #0a0a0a)';
const CREAM = 'var(--color-cream, #f5f1e8)';
const PAPER = '#fafafa';

const FONT_SERIF = "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = "var(--font-body, Inter, system-ui, sans-serif)";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const drop = getDrop(slug);
  if (!drop) return { title: 'Série introuvable' };
  return {
    title: `${drop.title} — Série`,
    description: drop.subtitle,
    openGraph: {
      title: `${drop.title} — Série Nacks Galerie`,
      description: drop.subtitle,
      type: 'website',
      locale: 'fr_FR',
      siteName: 'Nacks Galerie',
      url: `/drops/${drop.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${drop.title} — Série Nacks Galerie`,
      description: drop.subtitle,
    },
    alternates: { canonical: `/drops/${drop.slug}` },
  };
}

export async function generateStaticParams() {
  return drops.map((d) => ({ slug: d.slug }));
}

/* ============================================================
 *  Helpers
 * ============================================================ */

function statusLabel(drop: Drop): string {
  if (drop.status === 'sold_out' || drop.status === 'past') return 'Édition close';
  if (drop.status === 'upcoming') return 'Bientôt';
  const remaining = Math.max(drop.editionSize - drop.sold, 0);
  return `${remaining} / ${drop.editionSize} restantes`;
}

function seriesArtworks(drop: Drop): readonly Artwork[] {
  // Stratégie : on prend toutes les œuvres du même personnage.
  // Si pas de character (rare), on tombe sur l'artwork principal.
  if (drop.character) {
    const list = artworks.filter((a) => a.character === drop.character);
    if (list.length > 0) return list;
  }
  const main = getArtwork(drop.artworkSlug);
  return main ? [main] : [];
}

function buildStory(drop: Drop): string[] {
  // 2-3 paragraphes éditoriaux à partir du lore + subtitle + materials/spec.
  const para1 = drop.lore;
  const para2 = drop.subtitle.endsWith('.') ? drop.subtitle : `${drop.subtitle}.`;
  const techSpec = drop.spec.find((s) => s.label === 'Technique')?.value;
  const para3 = techSpec
    ? `Réalisée en ${techSpec.toLowerCase()}, la série rejoint la ligne d'atelier : papier d'art, encres pigmentaires, signatures originales et certificats embossés.`
    : `Chaque pièce est accompagnée d'un certificat d'authenticité signé au Posca, embossé, avec un numéro unique enregistré dans le registre de l'atelier.`;
  return [para1, para2, para3];
}

/* ============================================================
 *  Page
 * ============================================================ */

export default async function SeriesDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const drop = getDrop(slug);
  if (!drop) notFound();

  const seriesPieces = seriesArtworks(drop);
  const story = buildStory(drop);
  const otherSeries = getAllDrops()
    .filter((d) => d.slug !== drop.slug)
    .slice(0, 3);
  const meta = {
    pieces: seriesPieces.length,
    year: drop.opensAt.getFullYear(),
    materials: drop.spec.find((s) => s.label === 'Technique')?.value ?? 'Posca, spray, acrylique',
  };

  return (
    <PageShell>
      {/* ==========================================================
       *  Section 1 — Hero série (cream, calme, éditorial)
       * ========================================================== */}
      <section
        aria-label={`${drop.title} — présentation de la série`}
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
              style={{ color: 'inherit', textDecoration: 'none' }}
              className="hover:text-[var(--color-ink)]"
            >
              Accueil
            </Link>
            <span aria-hidden>/</span>
            <Link
              href="/drops"
              data-cursor="link"
              style={{ color: 'inherit', textDecoration: 'none' }}
              className="hover:text-[var(--color-ink)]"
            >
              Séries
            </Link>
            <span aria-hidden>/</span>
            <span style={{ color: INK }} className="truncate">
              {drop.title}
            </span>
          </nav>

          {/* Hero split : info gauche / image droite */}
          <div
            className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr]"
            style={{ gap: 'clamp(2rem, 4vw, 5rem)', alignItems: 'center' }}
          >
            {/* Info column */}
            <div
              className="flex flex-col"
              style={{ gap: 'clamp(1rem, 2vh, 1.5rem)' }}
            >
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
                Séries / {drop.slug}
              </p>

              <h1
                style={{
                  fontFamily: FONT_SERIF,
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 'clamp(2.6rem, 6.5vw, 6rem)',
                  lineHeight: 1.0,
                  letterSpacing: '-0.025em',
                  color: INK,
                  margin: 0,
                }}
                className="text-balance"
              >
                {drop.title}
              </h1>

              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 'clamp(0.95rem, 1.05vw, 1.15rem)',
                  lineHeight: 1.6,
                  color: 'rgba(10,10,10,0.7)',
                  margin: 0,
                  maxWidth: '40ch',
                }}
              >
                {drop.subtitle}
              </p>

              {/* Métadonnées — Inter mono-style, calme */}
              <div
                className="flex flex-wrap"
                style={{
                  gap: 'clamp(0.75rem, 1.5vw, 1.25rem)',
                  marginTop: 'clamp(0.75rem, 1.5vh, 1.25rem)',
                  paddingTop: 'clamp(1rem, 2vh, 1.5rem)',
                  borderTop: '1px solid rgba(10,10,10,0.12)',
                }}
              >
                <MetaPill label="Œuvres" value={`${meta.pieces}`} />
                <MetaPill label="Année" value={`${meta.year}`} />
                <MetaPill label="Statut" value={statusLabel(drop)} />
              </div>

              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: '0.85rem',
                  lineHeight: 1.55,
                  color: 'rgba(10,10,10,0.6)',
                  margin: 0,
                  marginTop: 'clamp(0.5rem, 1vh, 0.75rem)',
                }}
              >
                {meta.materials}
              </p>
            </div>

            {/* Cover image — large, photo-first */}
            <div
              className="relative w-full overflow-hidden"
              style={{
                aspectRatio: '4 / 5',
                backgroundColor: PAPER,
                border: '1px solid rgba(10,10,10,0.08)',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
              }}
            >
              <ArtPoster
                variant={drop.posterVariant}
                label={drop.title}
                className="absolute inset-0"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ==========================================================
       *  Section 2 — Story (ink alternance, éditorial calme)
       * ========================================================== */}
      <section
        aria-label="Histoire de la série"
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
            style={{ maxWidth: 'min(900px, 100%)' }}
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
              L&apos;histoire
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
              Une obsession, une série.
            </h2>

            <div
              className="flex flex-col"
              style={{ gap: 'clamp(1rem, 1.6vh, 1.25rem)' }}
            >
              {story.map((p, i) => (
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

            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: '0.72rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(245,241,232,0.5)',
                marginTop: 'clamp(2rem, 3vh, 2.5rem)',
              }}
            >
              — Notes d&apos;atelier, Nacks
            </p>
          </div>
        </Container>
      </section>

      {/* ==========================================================
       *  Section 3 — Grid des œuvres dans la série (cream)
       * ========================================================== */}
      {seriesPieces.length > 0 && (
        <section
          aria-label="Œuvres de la série"
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
                  La série
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
                  Les œuvres.
                </h2>
              </div>

              <Link
                href="/oeuvres"
                data-cursor="link"
                data-cursor-label="Galerie"
                className="group inline-flex items-center self-end whitespace-nowrap"
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
              {seriesPieces.map((art) => (
                <SeriesArtworkCard key={art.slug} art={art} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ==========================================================
       *  Section 4 — Autres séries (ink alternance)
       * ========================================================== */}
      {otherSeries.length > 0 && (
        <section
          aria-label="Autres séries"
          className="relative"
          style={{
            backgroundColor: INK,
            color: CREAM,
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
                    color: 'rgba(245,241,232,0.55)',
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
                    color: CREAM,
                    margin: 0,
                  }}
                  className="text-balance"
                >
                  Autres séries.
                </h2>
              </div>

              <Link
                href="/drops"
                data-cursor="link"
                data-cursor-label="Toutes"
                className="group inline-flex items-center self-end whitespace-nowrap"
                style={{
                  fontFamily: FONT_SERIF,
                  fontStyle: 'italic',
                  fontSize: 'clamp(1rem, 1.05vw, 1.15rem)',
                  color: CREAM,
                  paddingBottom: '4px',
                  borderBottom: '1px solid rgba(245,241,232,0.35)',
                  textDecoration: 'none',
                }}
              >
                <span>Toutes les séries&nbsp;→</span>
              </Link>
            </header>

            <div
              className="grid grid-cols-1 md:grid-cols-3"
              style={{ gap: 'clamp(1.25rem, 2.8vw, 2.25rem)' }}
            >
              {otherSeries.map((d) => (
                <OtherSeriesCard key={d.slug} drop={d} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── JSON-LD — BreadcrumbList ── */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd([
            buildBreadcrumb([
              { name: 'Accueil', href: '/' },
              { name: 'Séries', href: '/drops' },
              { name: drop.title, href: `/drops/${drop.slug}` },
            ]),
          ]),
        }}
      />
    </PageShell>
  );
}

/* ============================================================
 *  Sub-components
 * ============================================================ */

function MetaPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col" style={{ gap: '0.2rem' }}>
      <span
        style={{
          fontFamily: FONT_BODY,
          fontSize: '0.65rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(10,10,10,0.5)',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: FONT_BODY,
          fontSize: '0.92rem',
          fontVariantNumeric: 'tabular-nums',
          color: INK,
          fontWeight: 500,
          letterSpacing: '0.01em',
        }}
      >
        {value}
      </span>
    </div>
  );
}

function SeriesArtworkCard({ art }: { art: Artwork }) {
  const isSoldOut = art.status === 'sold_out';
  const isComing = art.status === 'coming';
  const priceLabel = formatPrice(art.priceCents);
  const seriesLabel = (() => {
    if (art.edition) return `Édition de ${art.edition.size}`;
    if (art.type === 'original') return 'Pièce unique';
    if (art.type === 'poster') return 'Open edition';
    if (art.type === 'figurine') return 'Édition limitée';
    return art.subtitle;
  })();

  return (
    <Link
      href={`/oeuvres/${art.slug}`}
      data-cursor="link"
      data-cursor-label="Voir"
      className="series-art-card group block"
      aria-label={`${art.title} — ${priceLabel}`}
      style={{ color: INK, textDecoration: 'none' }}
    >
      <div
        className="series-art-card-media relative overflow-hidden"
        style={{
          aspectRatio: '4 / 5',
          backgroundColor: PAPER,
          border: '1px solid rgba(10,10,10,0.08)',
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
          transition:
            'box-shadow 480ms cubic-bezier(0.22,1,0.36,1), transform 480ms cubic-bezier(0.22,1,0.36,1)',
          willChange: 'transform, box-shadow',
        }}
      >
        <div className="series-art-card-img absolute inset-0">
          <ArtPoster
            variant={art.posterVariant}
            label={art.title}
            className="absolute inset-0"
          />
        </div>

        {(isSoldOut || isComing) && (
          <div
            className="absolute z-10"
            style={{
              top: '0.75rem',
              right: '0.75rem',
              padding: '0.32rem 0.6rem',
              fontFamily: FONT_BODY,
              fontSize: '0.62rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: isSoldOut ? 'rgba(10,10,10,0.7)' : PAPER,
              backgroundColor: isSoldOut ? 'rgba(250,250,250,0.92)' : 'rgba(10,10,10,0.85)',
              border: isSoldOut ? '1px solid rgba(10,10,10,0.12)' : 'none',
              backdropFilter: 'blur(4px)',
            }}
          >
            {isSoldOut ? 'Vendue' : 'À venir'}
          </div>
        )}
      </div>

      <div
        className="flex items-start justify-between gap-3"
        style={{ marginTop: 'clamp(0.85rem, 1.4vh, 1.1rem)' }}
      >
        <div className="min-w-0 flex-1">
          <h3
            style={{
              fontFamily: FONT_SERIF,
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(1rem, 1.15vw, 1.2rem)',
              lineHeight: 1.25,
              color: INK,
              margin: 0,
            }}
          >
            {art.title}
          </h3>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: '0.78rem',
              lineHeight: 1.4,
              color: 'rgba(10,10,10,0.55)',
              marginTop: '0.25rem',
              letterSpacing: '0.01em',
            }}
          >
            {seriesLabel}
          </p>
        </div>
        <span
          style={{
            fontFamily: FONT_BODY,
            fontSize: 'clamp(0.9rem, 1vw, 1rem)',
            color: INK,
            whiteSpace: 'nowrap',
            fontVariantNumeric: 'tabular-nums',
            paddingTop: '0.15rem',
          }}
        >
          {priceLabel}
        </span>
      </div>

      <style>{`
        .series-art-card:hover .series-art-card-media {
          box-shadow: 0 18px 38px -16px rgba(10,10,10,0.22), 0 2px 6px rgba(10,10,10,0.06);
        }
        .series-art-card:hover .series-art-card-img {
          transform: scale(1.018);
        }
        .series-art-card-img {
          transition: transform 720ms cubic-bezier(0.22,1,0.36,1);
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .series-art-card:hover .series-art-card-img { transform: none; }
        }
      `}</style>
    </Link>
  );
}

function OtherSeriesCard({ drop }: { drop: Drop }) {
  const isClosed = drop.status === 'sold_out' || drop.status === 'past';
  const isComing = drop.status === 'upcoming';
  const label = isClosed ? 'Édition close' : isComing ? 'Bientôt' : 'Disponible';
  const year = drop.opensAt.getFullYear();

  return (
    <Link
      href={`/drops/${drop.slug}`}
      data-cursor="link"
      data-cursor-label="Voir"
      className="other-series-card group block"
      aria-label={drop.title}
      style={{ color: CREAM, textDecoration: 'none' }}
    >
      <div
        className="other-series-card-media relative overflow-hidden"
        style={{
          aspectRatio: '4 / 5',
          backgroundColor: 'rgba(245,241,232,0.05)',
          border: '1px solid rgba(245,241,232,0.12)',
          transition: 'transform 480ms cubic-bezier(0.22,1,0.36,1)',
          willChange: 'transform',
        }}
      >
        <div className="other-series-card-img absolute inset-0">
          <ArtPoster
            variant={drop.posterVariant}
            label={drop.title}
            className="absolute inset-0"
          />
        </div>

        <div
          className="absolute z-10"
          style={{
            top: '0.75rem',
            right: '0.75rem',
            padding: '0.32rem 0.6rem',
            fontFamily: FONT_BODY,
            fontSize: '0.62rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(10,10,10,0.85)',
            backgroundColor: 'rgba(245,241,232,0.92)',
            border: '1px solid rgba(245,241,232,0.2)',
            backdropFilter: 'blur(4px)',
          }}
        >
          {label}
        </div>
      </div>

      <div
        className="flex flex-col gap-1"
        style={{ marginTop: 'clamp(0.85rem, 1.4vh, 1.1rem)' }}
      >
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: '0.7rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(245,241,232,0.55)',
            margin: 0,
          }}
        >
          Série · {year}
        </p>
        <h3
          style={{
            fontFamily: FONT_SERIF,
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(1.1rem, 1.4vw, 1.4rem)',
            lineHeight: 1.2,
            color: CREAM,
            margin: 0,
          }}
        >
          {drop.title}
        </h3>
      </div>

      <style>{`
        .other-series-card:hover .other-series-card-img {
          transform: scale(1.018);
        }
        .other-series-card-img {
          transition: transform 720ms cubic-bezier(0.22,1,0.36,1);
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .other-series-card:hover .other-series-card-img { transform: none; }
        }
      `}</style>
    </Link>
  );
}
