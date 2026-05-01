import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@nacks/ui';
import { PageShell } from '@/components/layouts/PageShell';
import { CharacterPortrait } from '@/components/art/CharacterPortrait';
import { ArtPoster } from '@/components/art/ArtPoster';
import {
  characters,
  getCharacter,
  type Character,
  type CharacterSlug,
} from '@/lib/content/characters';
import {
  getArtworksByCharacter,
  formatPrice,
  type Artwork,
} from '@/lib/content/artworks';
import { FadeUp, StatCountUp } from './CharacterPageAnim';

/**
 * /univers/[character] — page détail personnage.
 *
 * DA cream/ink alternance, Playfair italic display, Inter body, soft shadows.
 * Refs : David Zwirner artist pages, Hermès collections, Acne Studios designer.
 *
 * Server component : data + structure. Animations via FadeUp/StatCountUp client.
 *
 * Sections :
 *  1. Hero perso (cream) — split portrait / nom + tagline + bio
 *  2. Stats (ink) — 4 colonnes count-up cream
 *  3. Œuvres (cream) — grid 2/3/4 ArtworkCard, empty state
 *  4. Autres personnages (cream) — 3 cards CharacterCard
 */

const INK = '#0a0a0a';
const CREAM = '#f5f1e8';
const PAPER = '#fafafa';

const FONT_SERIF = "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = 'var(--font-body, Inter, system-ui, sans-serif)';
const FONT_MONO = 'var(--font-mono, ui-monospace, Menlo, monospace)';

type Params = Promise<{ character: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { character } = await params;
  const data = getCharacter(character as CharacterSlug);
  if (!data) return { title: 'Personnage introuvable' };
  return {
    title: `${data.name} — Univers Nacks`,
    description: `${data.tagline}. ${data.phrase}`,
    openGraph: {
      title: `${data.name} — Univers Nacks`,
      description: data.tagline,
      type: 'website',
      locale: 'fr_FR',
      siteName: 'Nacks Galerie',
      url: `/univers/${data.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.name} — Univers Nacks`,
      description: data.tagline,
    },
    alternates: { canonical: `/univers/${data.slug}` },
  };
}

export async function generateStaticParams() {
  return characters.map((c) => ({ character: c.slug }));
}

export default async function CharacterPage({ params }: { params: Params }) {
  const { character } = await params;
  const data = getCharacter(character as CharacterSlug);
  if (!data) notFound();

  const artworks = getArtworksByCharacter(data.slug);
  const others = characters.filter((c) => c.slug !== data.slug);

  // Stats dérivées
  const totalWorks = data.artworks; // count source de vérité (lib/characters)
  const availableWorks = artworks.filter((a) => a.status === 'in_stock').length;
  const seriesCount = data.drops; // séries / drops où il apparaît

  return (
    <PageShell>
      {/* ── Section 1 — Hero personnage (cream) ── */}
      <section
        className="relative w-full"
        style={{
          backgroundColor: CREAM,
          color: INK,
          paddingTop: 'clamp(4rem, 8vh, 7rem)',
          paddingBottom: 'clamp(5rem, 10vh, 9rem)',
        }}
      >
        <Container size="full" style={{ maxWidth: '1440px' }}>
          {/* Eyebrow + retour */}
          <div className="mb-[clamp(2rem,4vh,3rem)] flex items-center gap-4">
            <Link
              href="/univers"
              data-cursor="link"
              style={{
                fontFamily: FONT_MONO,
                fontSize: '0.72rem',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'rgba(10,10,10,0.55)',
                textDecoration: 'none',
              }}
            >
              ← Univers
            </Link>
            <span
              aria-hidden
              style={{
                width: '1.5rem',
                height: '1px',
                backgroundColor: 'rgba(10,10,10,0.2)',
              }}
            />
            <p
              style={{
                fontFamily: FONT_MONO,
                fontSize: '0.72rem',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: 'rgba(10,10,10,0.55)',
                margin: 0,
              }}
            >
              L&apos;Univers / {data.name}
            </p>
          </div>

          {/* Split portrait / texte */}
          <div className="grid items-start gap-[clamp(2.5rem,5vw,5rem)] md:grid-cols-12">
            <FadeUp className="md:col-span-5" duration={0.8}>
              <div
                className="relative w-full overflow-hidden"
                style={{
                  aspectRatio: '3 / 4',
                  backgroundColor: PAPER,
                  border: '1px solid rgba(10,10,10,0.08)',
                  boxShadow:
                    '0 1px 1px rgba(0,0,0,0.04), 0 18px 40px -22px rgba(0,0,0,0.22)',
                }}
              >
                <CharacterPortrait
                  character={data.slug}
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </FadeUp>

            <div className="md:col-span-7 md:pt-2">
              <FadeUp index={0}>
                <p
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: '0.72rem',
                    letterSpacing: '0.32em',
                    textTransform: 'uppercase',
                    color: 'rgba(10,10,10,0.55)',
                    marginBottom: 'clamp(1rem, 2vh, 1.5rem)',
                  }}
                >
                  Personnage signature · Depuis {data.introducedAt}
                </p>
              </FadeUp>

              <FadeUp index={1}>
                <h1
                  style={{
                    fontFamily: FONT_SERIF,
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: 'clamp(3rem, 7.5vw, 7rem)',
                    lineHeight: 0.98,
                    letterSpacing: '-0.02em',
                    color: INK,
                    margin: 0,
                  }}
                >
                  {data.name}
                </h1>
              </FadeUp>

              <FadeUp index={2}>
                <p
                  style={{
                    fontFamily: FONT_SERIF,
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: 'clamp(1.25rem, 1.8vw, 1.65rem)',
                    lineHeight: 1.35,
                    color: 'rgba(10,10,10,0.78)',
                    marginTop: 'clamp(1.25rem, 2.5vh, 1.75rem)',
                    marginBottom: 0,
                    maxWidth: '32ch',
                  }}
                >
                  {data.tagline}.
                </p>
              </FadeUp>

              <FadeUp index={3}>
                <div
                  style={{
                    marginTop: 'clamp(2rem, 4vh, 2.75rem)',
                    paddingTop: 'clamp(1.5rem, 3vh, 2rem)',
                    borderTop: '1px solid rgba(10,10,10,0.12)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'clamp(1rem, 2vh, 1.4rem)',
                  }}
                >
                  {data.lore.map((paragraph, i) => (
                    <p
                      key={i}
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: 'clamp(0.95rem, 1.05vw, 1.1rem)',
                        lineHeight: 1.65,
                        color: 'rgba(10,10,10,0.72)',
                        margin: 0,
                        maxWidth: '54ch',
                      }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </FadeUp>

              <FadeUp index={4}>
                <p
                  style={{
                    fontFamily: FONT_SERIF,
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: 'clamp(1rem, 1.1vw, 1.15rem)',
                    color: 'rgba(10,10,10,0.55)',
                    marginTop: 'clamp(1.75rem, 3.5vh, 2.25rem)',
                    marginBottom: 0,
                  }}
                >
                  « {data.phrase} »
                </p>
              </FadeUp>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Section 2 — Stats / Repères (ink) ── */}
      <section
        aria-label="Repères du personnage"
        className="relative w-full"
        style={{
          backgroundColor: INK,
          color: CREAM,
          paddingTop: 'clamp(4rem, 8vh, 7rem)',
          paddingBottom: 'clamp(4rem, 8vh, 7rem)',
        }}
      >
        <Container size="full" style={{ maxWidth: '1440px' }}>
          <FadeUp>
            <div className="grid grid-cols-2 gap-[clamp(2rem,4vw,3.5rem)] md:grid-cols-4">
              <StatBlock label="Œuvres au total" value={totalWorks} />
              <StatBlock
                label={`Depuis ${data.introducedAt}`}
                value={2026 - data.introducedAt}
                suffix={2026 - data.introducedAt > 1 ? ' ans' : ' an'}
                inline
              />
              <StatBlock label="Drops & séries" value={seriesCount} />
              <StatBlock label="Disponibles" value={availableWorks} />
            </div>
          </FadeUp>
        </Container>
      </section>

      {/* ── Section 3 — Œuvres (cream) ── */}
      <section
        aria-label={`Œuvres avec ${data.name}`}
        className="relative w-full"
        style={{
          backgroundColor: CREAM,
          color: INK,
          paddingTop: 'clamp(5rem, 10vh, 9rem)',
          paddingBottom: 'clamp(5rem, 10vh, 9rem)',
        }}
      >
        <Container size="full" style={{ maxWidth: '1440px' }}>
          {/* Header */}
          <FadeUp>
            <header className="mb-[clamp(3rem,6vh,5rem)] grid items-end gap-8 md:grid-cols-12">
              <div className="md:col-span-7">
                <p
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: '0.72rem',
                    letterSpacing: '0.32em',
                    textTransform: 'uppercase',
                    color: 'rgba(10,10,10,0.55)',
                    marginBottom: 'clamp(1rem, 2vh, 1.5rem)',
                  }}
                >
                  La galerie
                </p>
                <h2
                  style={{
                    fontFamily: FONT_SERIF,
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: 'clamp(2.2rem, 4.8vw, 4.4rem)',
                    lineHeight: 1.02,
                    letterSpacing: '-0.015em',
                    color: INK,
                    margin: 0,
                  }}
                >
                  Œuvres avec {data.name}.
                </h2>
              </div>

              {artworks.length > 0 && (
                <div className="md:col-span-5 md:self-end md:pb-2 md:text-right">
                  <Link
                    href={`/oeuvres?character=${data.slug}`}
                    data-cursor="link"
                    data-cursor-label="Galerie"
                    className="inline-flex items-center"
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
                    Voir toutes les œuvres&nbsp;→
                  </Link>
                </div>
              )}
            </header>
          </FadeUp>

          {/* Grille / empty state */}
          {artworks.length === 0 ? (
            <FadeUp>
              <div
                className="flex items-center justify-center"
                style={{
                  paddingTop: 'clamp(3rem, 6vh, 5rem)',
                  paddingBottom: 'clamp(3rem, 6vh, 5rem)',
                  borderTop: '1px solid rgba(10,10,10,0.1)',
                  borderBottom: '1px solid rgba(10,10,10,0.1)',
                }}
              >
                <p
                  style={{
                    fontFamily: FONT_SERIF,
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                    color: 'rgba(10,10,10,0.55)',
                    margin: 0,
                  }}
                >
                  Bientôt.
                </p>
              </div>
            </FadeUp>
          ) : (
            <ul
              className="grid list-none grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              style={{
                gap: 'clamp(1.5rem, 2.5vw, 2.5rem)',
                margin: 0,
                padding: 0,
              }}
            >
              {artworks.map((art, i) => (
                <FadeUp key={art.slug} index={i} as="li" y={20}>
                  <ArtworkTile art={art} />
                </FadeUp>
              ))}
            </ul>
          )}
        </Container>
      </section>

      {/* ── Section 4 — Autres personnages (cream) ── */}
      <section
        aria-label="Autres personnages de l'univers"
        className="relative w-full"
        style={{
          backgroundColor: CREAM,
          color: INK,
          paddingTop: 'clamp(4rem, 8vh, 7rem)',
          paddingBottom: 'clamp(5rem, 10vh, 9rem)',
          borderTop: '1px solid rgba(10,10,10,0.08)',
        }}
      >
        <Container size="full" style={{ maxWidth: '1440px' }}>
          <FadeUp>
            <header className="mb-[clamp(2.5rem,5vh,4rem)] grid items-end gap-8 md:grid-cols-12">
              <div className="md:col-span-7">
                <p
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: '0.72rem',
                    letterSpacing: '0.32em',
                    textTransform: 'uppercase',
                    color: 'rgba(10,10,10,0.55)',
                    marginBottom: 'clamp(1rem, 2vh, 1.5rem)',
                  }}
                >
                  Continuer l&apos;exploration
                </p>
                <h2
                  style={{
                    fontFamily: FONT_SERIF,
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: 'clamp(2rem, 4vw, 3.6rem)',
                    lineHeight: 1.02,
                    letterSpacing: '-0.015em',
                    color: INK,
                    margin: 0,
                  }}
                >
                  Découvrir l&apos;univers.
                </h2>
              </div>
              <div className="md:col-span-5 md:self-end md:pb-2 md:text-right">
                <Link
                  href="/univers"
                  data-cursor="link"
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
                  Tous les personnages&nbsp;→
                </Link>
              </div>
            </header>
          </FadeUp>

          <ul
            className="grid list-none grid-cols-1 md:grid-cols-3"
            style={{
              gap: 'clamp(1.5rem, 3vw, 2.5rem)',
              margin: 0,
              padding: 0,
            }}
          >
            {others.map((c, i) => (
              <FadeUp key={c.slug} index={i} as="li">
                <CharacterTile character={c} />
              </FadeUp>
            ))}
          </ul>
        </Container>
      </section>
    </PageShell>
  );
}

/* ============================================================
 *  StatBlock — numéro grand serif italic + label mono
 * ============================================================ */
function StatBlock({
  label,
  value,
  suffix,
  inline,
}: {
  label: string;
  value: number;
  suffix?: string;
  inline?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span
        style={{
          fontFamily: FONT_SERIF,
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
          lineHeight: 0.95,
          letterSpacing: '-0.02em',
          color: CREAM,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        <StatCountUp value={value} />
        {inline && suffix && (
          <span
            style={{
              fontFamily: FONT_BODY,
              fontStyle: 'normal',
              fontSize: 'clamp(0.85rem, 1vw, 1rem)',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'rgba(245,241,232,0.6)',
              marginLeft: '0.4rem',
              fontWeight: 500,
            }}
          >
            {suffix}
          </span>
        )}
      </span>
      <span
        style={{
          fontFamily: FONT_BODY,
          fontSize: 'clamp(0.78rem, 0.85vw, 0.9rem)',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(245,241,232,0.6)',
          fontWeight: 500,
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* ============================================================
 *  ArtworkTile — pattern NacksShow ArtworkCard, server-only
 * ============================================================ */
function ArtworkTile({ art }: { art: Artwork }) {
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
      className="nacks-tile group block h-full"
      aria-label={`${art.title} — ${priceLabel}`}
      style={{ color: INK, textDecoration: 'none' }}
    >
      <div
        className="nacks-tile-media relative overflow-hidden"
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
        <div className="nacks-tile-img absolute inset-0">
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
              backgroundColor: isSoldOut
                ? 'rgba(250,250,250,0.92)'
                : 'rgba(10,10,10,0.85)',
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
        .nacks-tile:hover .nacks-tile-media {
          box-shadow: 0 18px 38px -16px rgba(10,10,10,0.22), 0 2px 6px rgba(10,10,10,0.06);
        }
        .nacks-tile:hover .nacks-tile-img { transform: scale(1.018); }
        .nacks-tile-img {
          transition: transform 720ms cubic-bezier(0.22,1,0.36,1);
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .nacks-tile:hover .nacks-tile-img { transform: none; }
        }
      `}</style>
    </Link>
  );
}

/* ============================================================
 *  CharacterTile — pattern UniversHorizontal CharacterCard
 * ============================================================ */
function CharacterTile({ character }: { character: Character }) {
  const { slug, name, tagline, artworks, introducedAt } = character;

  return (
    <Link
      href={`/univers/${slug}`}
      data-cursor="link"
      className="character-tile group flex w-full flex-col"
      style={{ color: INK, textDecoration: 'none' }}
      aria-label={`Découvrir ${name}`}
    >
      <div
        className="character-tile-frame relative w-full overflow-hidden"
        style={{
          aspectRatio: '3 / 4',
          backgroundColor: PAPER,
          border: '1px solid rgba(10,10,10,0.08)',
          transition:
            'transform 480ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 480ms cubic-bezier(0.22, 1, 0.36, 1)',
          boxShadow:
            '0 1px 1px rgba(0,0,0,0.04), 0 8px 20px -12px rgba(0,0,0,0.18)',
        }}
      >
        <CharacterPortrait
          character={slug}
          className="absolute inset-0 h-full w-full"
        />
      </div>

      <div
        className="flex flex-1 flex-col"
        style={{
          paddingTop: 'clamp(1rem, 2vh, 1.5rem)',
          gap: 'clamp(0.4rem, 1vh, 0.6rem)',
        }}
      >
        <h3
          style={{
            fontFamily: FONT_SERIF,
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(1.4rem, 1.8vw, 1.7rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
            color: INK,
            margin: 0,
          }}
        >
          {name}
        </h3>

        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 'clamp(0.88rem, 0.95vw, 1rem)',
            lineHeight: 1.45,
            color: 'rgba(10,10,10,0.7)',
            margin: 0,
          }}
        >
          {tagline}
        </p>

        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: '0.7rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(10,10,10,0.45)',
            marginTop: 'clamp(0.5rem, 1vh, 0.75rem)',
          }}
        >
          {artworks} œuvres · {introducedAt} →
        </span>
      </div>

      <style>{`
        .character-tile:hover .character-tile-frame {
          transform: scale(1.02);
          box-shadow: 0 2px 4px rgba(0,0,0,0.06), 0 24px 40px -18px rgba(0,0,0,0.28);
        }
        @media (prefers-reduced-motion: reduce) {
          .character-tile-frame { transition: none; }
          .character-tile:hover .character-tile-frame { transform: none; }
        }
      `}</style>
    </Link>
  );
}
