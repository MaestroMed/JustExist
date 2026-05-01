import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@nacks/ui';
import { PageShell } from '@/components/layouts/PageShell';
import { CharacterPortrait } from '@/components/art/CharacterPortrait';
import { characters, type Character } from '@/lib/content/characters';
import { getArtworksByCharacter } from '@/lib/content/artworks';
import { UniversCardAnim } from '@/components/scenes/UniversHorizontalAnim';

/**
 * PAGE — /univers (listing complet des personnages).
 *
 * DA premium calme façon Zwirner / Hauser & Wirth (page "Artists") :
 * background cream, header serif italic XXXL, grille 2 cols larges,
 * portraits paper bg + soft shadow, infos détaillées par perso, CTA final.
 *
 * Distinct de la scène home `UniversHorizontal` (teaser 4 cols) — ici
 * grille 2 cols pour respirer, infos plus complètes, lore court intégré.
 *
 * Server component (data + metadata). Animations Motion via wrappers
 * client (`UniversCardAnim`). prefers-reduced-motion respecté en aval.
 */

export const metadata: Metadata = {
  title: "L'univers Nacks — quatre personnages, une mythologie",
  description:
    "Mr Poppy, Gorille de Rome, Renard de Paris, Lion d'Eiffel : quatre figures récurrentes de l'œuvre de Nacks depuis 2018. Chacune a son histoire, ses séries, ses œuvres.",
};

const INK = '#0a0a0a';
const CREAM = '#f5f1e8';
const PAPER = '#fafafa';

const FONT_SERIF = "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = 'var(--font-body, Inter, system-ui, sans-serif)';
const FONT_MONO = 'var(--font-mono, ui-monospace, Menlo, monospace)';

export default function UniversPage() {
  return (
    <PageShell>
      <section
        className="relative w-full"
        style={{
          backgroundColor: CREAM,
          color: INK,
          paddingTop: 'clamp(6rem, 12vh, 11rem)',
          paddingBottom: 'clamp(5rem, 10vh, 8rem)',
        }}
      >
        <Container size="full" style={{ maxWidth: '1440px' }}>
          {/* ── Header ── */}
          <UniversCardAnim index={0} className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: '0.72rem',
                  letterSpacing: '0.32em',
                  textTransform: 'uppercase',
                  color: 'rgba(10,10,10,0.55)',
                  marginBottom: 'clamp(1.25rem, 2.4vh, 1.75rem)',
                  margin: 0,
                }}
              >
                L&apos;Univers Nacks
              </p>
              <h1
                style={{
                  fontFamily: FONT_SERIF,
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 'clamp(3rem, 7vw, 7rem)',
                  lineHeight: 0.98,
                  letterSpacing: '-0.02em',
                  color: INK,
                  margin: 'clamp(1.25rem, 2.4vh, 1.75rem) 0 0 0',
                }}
              >
                Quatre personnages.
                <br />
                Une mythologie.
              </h1>
            </div>

            <div className="md:col-span-5 md:pb-3">
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 'clamp(1rem, 1.1vw, 1.15rem)',
                  lineHeight: 1.6,
                  color: 'rgba(10,10,10,0.72)',
                  maxWidth: '38rem',
                  margin: 0,
                }}
              >
                Mr Poppy, Gorille de Rome, Renard de Paris, Lion d&apos;Eiffel —
                quatre figures récurrentes qui peuplent les murs depuis 2018.
                Chacun a son histoire, ses œuvres, ses séries.
              </p>
            </div>
          </UniversCardAnim>
        </Container>
      </section>

      {/* ── Grille personnages ── */}
      <section
        className="relative w-full"
        style={{
          backgroundColor: CREAM,
          color: INK,
          paddingBottom: 'clamp(5rem, 10vh, 9rem)',
        }}
      >
        <Container size="full" style={{ maxWidth: '1440px' }}>
          <ul
            className="grid list-none grid-cols-1 md:grid-cols-2"
            style={{
              gap: 'clamp(2rem, 4vw, 4rem)',
              margin: 0,
              padding: 0,
            }}
          >
            {characters.map((c, i) => (
              <li key={c.slug} className="flex">
                <CharacterListingCard character={c} index={i} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── CTA bas ── */}
      <section
        className="relative w-full"
        style={{
          backgroundColor: CREAM,
          color: INK,
          paddingBottom: 'clamp(6rem, 12vh, 10rem)',
        }}
      >
        <Container size="full" style={{ maxWidth: '1440px' }}>
          <UniversCardAnim
            index={0}
            className="border-t pt-[clamp(3rem,6vh,5rem)]"
          >
            <div
              className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
              style={{
                borderTopColor: 'rgba(10,10,10,0.12)',
              }}
            >
              <div>
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
                  Pour aller plus loin
                </p>
                <p
                  style={{
                    fontFamily: FONT_SERIF,
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)',
                    lineHeight: 1.05,
                    letterSpacing: '-0.015em',
                    color: INK,
                    margin: 'clamp(0.75rem, 1.6vh, 1.25rem) 0 0 0',
                    maxWidth: '24ch',
                  }}
                >
                  Pas encore décidé ? Voir toutes les œuvres.
                </p>
              </div>

              <div
                className="flex flex-wrap items-end gap-x-10 gap-y-4"
                style={{ paddingBottom: '0.25rem' }}
              >
                <CTALink href="/oeuvres" label="Voir le catalogue" />
                <CTALink
                  href="/atelier/commission"
                  label="Demander un custom"
                />
              </div>
            </div>
          </UniversCardAnim>
        </Container>
      </section>
    </PageShell>
  );
}

/* ============================================================
 *  CharacterListingCard — large card 2-col grid, paper portrait,
 *  numero, nom, tagline, lore court, stats inline, CTA Découvrir.
 * ============================================================ */
function CharacterListingCard({
  character,
  index,
}: {
  character: Character;
  index: number;
}) {
  const { slug, name, tagline, lore, introducedAt } = character;
  const artworksCount = getArtworksByCharacter(slug).length;
  const numero = String(index + 1).padStart(2, '0');
  const description = lore[0] ?? '';

  return (
    <UniversCardAnim
      index={index}
      className="group flex w-full flex-col"
    >
      <Link
        href={`/univers/${slug}`}
        className="flex w-full flex-1 flex-col"
        style={{ color: INK, textDecoration: 'none' }}
        aria-label={`Découvrir l'univers ${name}`}
        data-cursor="link"
        data-cursor-label="Entrer"
      >
        {/* Portrait — aspect 4/5, paper bg, soft shadow */}
        <div
          className="univers-listing-frame relative w-full overflow-hidden"
          style={{
            aspectRatio: '4 / 5',
            backgroundColor: PAPER,
            border: '1px solid rgba(10,10,10,0.08)',
            transition:
              'transform 480ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 480ms cubic-bezier(0.22, 1, 0.36, 1)',
            boxShadow:
              '0 1px 1px rgba(0,0,0,0.04), 0 10px 24px -14px rgba(0,0,0,0.20)',
          }}
        >
          <CharacterPortrait
            character={slug}
            className="absolute inset-0 h-full w-full"
          />

          {/* Numero badge top-left */}
          <span
            className="absolute"
            style={{
              top: 'clamp(0.9rem, 1.6vw, 1.25rem)',
              left: 'clamp(0.9rem, 1.6vw, 1.25rem)',
              fontFamily: FONT_MONO,
              fontSize: '0.68rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'rgba(10,10,10,0.55)',
            }}
          >
            Personnage {numero}
          </span>
        </div>

        {/* Info bloc */}
        <div
          className="flex flex-1 flex-col"
          style={{
            paddingTop: 'clamp(1.25rem, 2.4vh, 1.75rem)',
            gap: 'clamp(0.55rem, 1.1vh, 0.85rem)',
          }}
        >
          <h2
            style={{
              fontFamily: FONT_SERIF,
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(1.85rem, 2.8vw, 2.4rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.015em',
              color: INK,
              margin: 0,
            }}
          >
            {name}
          </h2>

          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 'clamp(0.95rem, 1.05vw, 1.05rem)',
              lineHeight: 1.45,
              color: 'rgba(10,10,10,0.72)',
              margin: 0,
            }}
          >
            {tagline}
          </p>

          {description && (
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 'clamp(0.9rem, 0.98vw, 0.98rem)',
                lineHeight: 1.6,
                color: 'rgba(10,10,10,0.65)',
                margin: 'clamp(0.4rem, 0.8vh, 0.6rem) 0 0 0',
                maxWidth: '40ch',
              }}
            >
              {description}
            </p>
          )}

          <div
            className="mt-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-3"
            style={{ paddingTop: 'clamp(1rem, 2vh, 1.4rem)' }}
          >
            <span
              style={{
                fontFamily: FONT_MONO,
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(10,10,10,0.5)',
              }}
            >
              {artworksCount} œuvre{artworksCount > 1 ? 's' : ''} · Depuis{' '}
              {introducedAt}
            </span>

            <span
              className="univers-listing-cta inline-flex items-center"
              style={{
                fontFamily: FONT_SERIF,
                fontStyle: 'italic',
                fontSize: 'clamp(1rem, 1.05vw, 1.1rem)',
                color: INK,
              }}
            >
              <span className="univers-listing-cta-text">
                Découvrir&nbsp;→
              </span>
            </span>
          </div>
        </div>
      </Link>

      {/* Hover styles scoped */}
      <style>{`
        .group:hover .univers-listing-frame {
          transform: scale(1.02);
          box-shadow: 0 4px 8px rgba(0,0,0,0.06), 0 28px 50px -20px rgba(0,0,0,0.30);
        }
        .univers-listing-cta-text {
          background-image: linear-gradient(currentColor, currentColor);
          background-size: 100% 1px;
          background-position: 0 100%;
          background-repeat: no-repeat;
          padding-bottom: 3px;
          transition: background-size 360ms cubic-bezier(0.65,0,0.35,1);
        }
        .group:hover .univers-listing-cta-text {
          background-size: 0% 1px;
          background-position: 100% 100%;
        }
        @media (prefers-reduced-motion: reduce) {
          .univers-listing-frame { transition: none; }
          .univers-listing-cta-text { transition: none; }
          .group:hover .univers-listing-frame { transform: none; }
          .group:hover .univers-listing-cta-text { background-size: 100% 1px; }
        }
      `}</style>
    </UniversCardAnim>
  );
}

/* ============================================================
 *  CTALink — italic underline animé, identique pattern home
 * ============================================================ */
function CTALink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      data-cursor="link"
      data-cursor-label={label}
      className="cta-link group inline-flex items-center"
      style={{
        fontFamily: FONT_SERIF,
        fontStyle: 'italic',
        fontSize: 'clamp(1.05rem, 1.15vw, 1.25rem)',
        color: INK,
        textDecoration: 'none',
      }}
    >
      <span className="cta-link-text">{label}&nbsp;→</span>
      <style>{`
        .cta-link-text {
          background-image: linear-gradient(currentColor, currentColor);
          background-size: 100% 1px;
          background-position: 0 100%;
          background-repeat: no-repeat;
          padding-bottom: 4px;
          transition: background-size 360ms cubic-bezier(0.65,0,0.35,1);
        }
        .cta-link:hover .cta-link-text {
          background-size: 0% 1px;
          background-position: 100% 100%;
        }
        @media (prefers-reduced-motion: reduce) {
          .cta-link-text { transition: none; }
          .cta-link:hover .cta-link-text { background-size: 100% 1px; }
        }
      `}</style>
    </Link>
  );
}
