import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@nacks/ui';
import { PageShell } from '@/components/layouts/PageShell';
import { ArtPoster } from '@/components/art/ArtPoster';
import { artworks } from '@/lib/content/artworks';
import { getAllDrops, type Drop } from '@/lib/content/drops';
import { DropsListAnim } from './DropsListAnim';

/**
 * SÉRIES / COLLECTIONS — listing.
 *
 * DA e-commerce galerie premium 2028 (David Zwirner / Hauser & Wirth + Hermès).
 * Chaque "drop" historique est ici présenté comme une SÉRIE thématique :
 * un ensemble cohérent d'œuvres autour d'une obsession.
 *
 * Pas de countdown, pas d'urgence, pas de "live now". Juste : nombre de pièces,
 * statut (Disponible / Édition close / Bientôt), année.
 *
 * Server component pour data + SEO ; animations stagger client via DropsListAnim.
 */

const INK = 'var(--color-ink, #0a0a0a)';
const CREAM = 'var(--color-cream, #f5f1e8)';
const PAPER = '#fafafa';

const FONT_SERIF = "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = "var(--font-body, Inter, system-ui, sans-serif)";

export const metadata: Metadata = {
  title: 'Séries — Collections thématiques',
  description:
    'Chaque série explore une obsession. Limitées, signées, numérotées. Originaux, sérigraphies, giclées et figurines.',
  openGraph: {
    title: 'Séries — Nacks Galerie',
    description:
      'Collections thématiques. Chaque série explore une obsession. Limitées, signées, numérotées.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Nacks Galerie',
    url: '/drops',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Séries — Nacks Galerie',
    description:
      'Collections thématiques. Chaque série explore une obsession.',
  },
  alternates: { canonical: '/drops' },
};

type SeriesMeta = {
  count: number;
  year: number;
  statusLabel: 'Disponible' | 'Édition close' | 'Bientôt';
};

function buildSeriesMeta(drop: Drop): SeriesMeta {
  // Compte les œuvres affiliées : par character (priorité) sinon par artworkSlug.
  let count = 1;
  if (drop.character) {
    count = artworks.filter((a) => a.character === drop.character).length || 1;
  }
  // Année : on prend l'année d'ouverture du drop.
  const year = drop.opensAt.getFullYear();
  // Status : pas de countdown, juste un label calme.
  const statusLabel: SeriesMeta['statusLabel'] =
    drop.status === 'sold_out' || drop.status === 'past'
      ? 'Édition close'
      : drop.status === 'upcoming'
        ? 'Bientôt'
        : 'Disponible';
  return { count, year, statusLabel };
}

export default function DropsListingPage() {
  const allDrops = getAllDrops();

  return (
    <PageShell>
      {/* ==========================================================
       *  Header section — cream, calme, éditorial
       * ========================================================== */}
      <section
        aria-label="Séries — collections thématiques"
        className="relative"
        style={{
          backgroundColor: CREAM,
          color: INK,
          paddingBlock: 'clamp(4.5rem, 9vh, 9rem)',
        }}
      >
        <Container size="full">
          <header className="mb-[clamp(3rem,6vh,5rem)] grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
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
                Séries / Collections
              </p>

              <h1
                style={{
                  fontFamily: FONT_SERIF,
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 'clamp(2.6rem, 6vw, 5.4rem)',
                  lineHeight: 1.02,
                  letterSpacing: '-0.02em',
                  color: INK,
                  margin: 0,
                }}
                className="text-balance"
              >
                Séries thématiques.
              </h1>

              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 'clamp(0.95rem, 1.05vw, 1.15rem)',
                  lineHeight: 1.6,
                  color: 'rgba(10,10,10,0.68)',
                  marginTop: 'clamp(1rem, 2.2vh, 1.5rem)',
                  maxWidth: '46ch',
                }}
              >
                Chaque série explore une obsession. Limitées, signées,
                numérotées.
              </p>
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
              <span className="drops-cta">Toutes les œuvres&nbsp;→</span>
            </Link>
          </header>

          {/* ── Grille séries ── */}
          {allDrops.length > 0 ? (
            <DropsListAnim>
              {allDrops.map((drop) => (
                <SeriesCard key={drop.slug} drop={drop} />
              ))}
            </DropsListAnim>
          ) : (
            <p
              style={{
                fontFamily: FONT_SERIF,
                fontStyle: 'italic',
                fontSize: 'clamp(1.1rem, 1.4vw, 1.4rem)',
                color: 'rgba(10,10,10,0.55)',
                marginTop: '4rem',
              }}
            >
              Première série en préparation.
            </p>
          )}
        </Container>

        <style>{`
          .drops-cta {
            background-image: linear-gradient(currentColor, currentColor);
            background-size: 100% 1px;
            background-position: 0 100%;
            background-repeat: no-repeat;
            transition: background-size 320ms cubic-bezier(0.65,0,0.35,1);
          }
          a:hover .drops-cta { background-size: 0% 1px; background-position: 100% 100%; }
        `}</style>
      </section>

      {/* ==========================================================
       *  Note éditoriale — ink alternance
       * ========================================================== */}
      <section
        aria-label="Note éditoriale"
        className="relative"
        style={{
          backgroundColor: INK,
          color: CREAM,
          paddingBlock: 'clamp(4rem, 8vh, 8rem)',
        }}
      >
        <Container size="full">
          <div
            className="mx-auto"
            style={{ maxWidth: 'min(820px, 100%)' }}
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
              Note d&apos;atelier
            </p>
            <p
              style={{
                fontFamily: FONT_SERIF,
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(1.4rem, 2.2vw, 2.1rem)',
                lineHeight: 1.4,
                color: CREAM,
                margin: 0,
              }}
              className="text-balance"
            >
              Une série naît quand un personnage refuse de se taire. On peint,
              on tire, on signe, on numérote. Quand l&apos;édition est close,
              elle l&apos;est pour toujours.
            </p>
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: '0.72rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(245,241,232,0.5)',
                marginTop: 'clamp(1.5rem, 2.5vh, 2rem)',
              }}
            >
              — Nacks
            </p>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}

/* ============================================================
 *  SeriesCard — card aspect 4/5 photo-first, infos sous
 * ============================================================ */
function SeriesCard({ drop }: { drop: Drop }) {
  const meta = buildSeriesMeta(drop);
  const isClosed = meta.statusLabel === 'Édition close';
  const isComing = meta.statusLabel === 'Bientôt';

  // Excerpt court (1-2 lignes max). Tronque le subtitle.
  const excerpt = drop.subtitle.length > 90 ? `${drop.subtitle.slice(0, 87)}…` : drop.subtitle;

  return (
    <Link
      href={`/drops/${drop.slug}`}
      data-cursor="link"
      data-cursor-label="Voir"
      className="series-card group block"
      aria-label={`${drop.title} — ${meta.count} œuvres · ${meta.year}`}
      style={{ color: INK, textDecoration: 'none' }}
    >
      {/* ── Cover image ── */}
      <div
        className="series-card-media relative overflow-hidden"
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
        <div className="series-card-img absolute inset-0">
          <ArtPoster
            variant={drop.posterVariant}
            label={drop.title}
            className="absolute inset-0"
          />
        </div>

        {/* Badge statut — top-right, subtil */}
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
            fontWeight: 500,
            color: isClosed
              ? 'rgba(10,10,10,0.7)'
              : isComing
                ? PAPER
                : INK,
            backgroundColor: isClosed
              ? 'rgba(250,250,250,0.92)'
              : isComing
                ? 'rgba(10,10,10,0.85)'
                : 'rgba(250,250,250,0.92)',
            border: isClosed || !isComing ? '1px solid rgba(10,10,10,0.12)' : 'none',
            backdropFilter: 'blur(4px)',
          }}
        >
          {meta.statusLabel}
        </div>
      </div>

      {/* ── Info bloc ── */}
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
            color: 'rgba(10,10,10,0.55)',
            margin: 0,
          }}
        >
          {meta.count} œuvre{meta.count > 1 ? 's' : ''} · {meta.year}
        </p>

        <h2
          style={{
            fontFamily: FONT_SERIF,
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(1.15rem, 1.4vw, 1.5rem)',
            lineHeight: 1.2,
            letterSpacing: '-0.005em',
            color: INK,
            margin: 0,
            marginTop: '0.15rem',
          }}
          className="text-balance"
        >
          {drop.title}
        </h2>

        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: '0.85rem',
            lineHeight: 1.5,
            color: 'rgba(10,10,10,0.6)',
            margin: 0,
            marginTop: '0.35rem',
          }}
        >
          {excerpt}
        </p>
      </div>

      {/* Hover */}
      <style>{`
        .series-card:hover .series-card-media {
          box-shadow: 0 18px 38px -16px rgba(10,10,10,0.22), 0 2px 6px rgba(10,10,10,0.06);
        }
        .series-card:hover .series-card-img {
          transform: scale(1.018);
        }
        .series-card-img {
          transition: transform 720ms cubic-bezier(0.22,1,0.36,1);
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .series-card:hover .series-card-img { transform: none; }
        }
      `}</style>
    </Link>
  );
}
