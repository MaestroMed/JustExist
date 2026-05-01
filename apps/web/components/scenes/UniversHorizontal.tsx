import Link from 'next/link';
import { Container } from '@nacks/ui';
import { characters, type Character } from '@/lib/content/characters';
import { CharacterPortrait } from '@/components/art/CharacterPortrait';
import { UniversCardAnim } from './UniversHorizontalAnim';

/**
 * SCÈNE — Univers (DA Zwirner / Hermès).
 *
 * Présentation calme et photo-first des 4 personnages signature de Nacks
 * comme une galerie d'artistes. Layout vertical, grid 4 cards, espace
 * négatif, typo serif italic + Inter, aucun spray fluo full-card.
 *
 * NB : nom de fichier conservé (UniversHorizontal) car page.tsx l'importe.
 * Layout effectif = vertical, grid responsive 1 / 2 / 4 colonnes.
 *
 * Server component shell (data + structure) + UniversCardAnim client
 * wrapper qui anime au scroll avec Motion `whileInView`.
 */

const INK = '#0a0a0a';
const CREAM = '#f5f1e8';
const PAPER = '#fafafa';

const FONT_SERIF = "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = 'var(--font-body, Inter, system-ui, sans-serif)';
const FONT_MONO = 'var(--font-mono, ui-monospace, Menlo, monospace)';

export function UniversHorizontal() {
  return (
    <section
      className="relative w-full"
      style={{
        backgroundColor: CREAM,
        color: INK,
        paddingTop: 'clamp(5rem, 10vh, 8rem)',
        paddingBottom: 'clamp(5rem, 10vh, 8rem)',
      }}
      aria-label={`Univers Nacks — ${characters.length} personnages`}
    >
      <Container size="full" style={{ maxWidth: '1440px' }}>
        {/* ── Header ── */}
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
              L'Univers Nacks
            </p>
            <h2
              style={{
                fontFamily: FONT_SERIF,
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(2.4rem, 5.5vw, 5rem)',
                lineHeight: 1.02,
                letterSpacing: '-0.015em',
                color: INK,
                margin: 0,
              }}
            >
              Quatre personnages.
              <br />
              Mille histoires.
            </h2>
          </div>

          <div className="md:col-span-5 md:pl-8 md:pb-2">
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 'clamp(0.95rem, 1.05vw, 1.1rem)',
                lineHeight: 1.6,
                color: 'rgba(10,10,10,0.72)',
                maxWidth: '32rem',
                margin: 0,
              }}
            >
              Mr Poppy, Gorille, Renard, Lion — quatre figures récurrentes
              qui peuplent les murs et les œuvres depuis 2018.
            </p>
          </div>
        </header>

        {/* ── Grille 4 cards ── */}
        <ul
          className="grid list-none grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          style={{
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
            margin: 0,
            padding: 0,
          }}
        >
          {characters.map((c, i) => (
            <li key={c.slug} className="flex">
              <CharacterCard character={c} index={i} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ============================================================
 *  CharacterCard
 * ============================================================ */
function CharacterCard({ character, index }: { character: Character; index: number }) {
  const { slug, name, tagline, artworks, introducedAt } = character;

  return (
    <UniversCardAnim index={index} className="group flex w-full flex-col">
      <Link
        href={`/univers/${slug}`}
        className="flex w-full flex-1 flex-col"
        style={{ color: INK, textDecoration: 'none' }}
        aria-label={`Découvrir l'univers ${name}`}
      >
        {/* Image — aspect 3/4, paper bg, subtle border */}
        <div
          className="univers-card-frame relative w-full overflow-hidden"
          style={{
            aspectRatio: '3 / 4',
            backgroundColor: PAPER,
            border: '1px solid rgba(10,10,10,0.08)',
            transition: 'transform 480ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 480ms cubic-bezier(0.22, 1, 0.36, 1)',
            boxShadow:
              '0 1px 1px rgba(0,0,0,0.04), 0 8px 20px -12px rgba(0,0,0,0.18)',
          }}
        >
          <CharacterPortrait
            character={slug}
            className="absolute inset-0 h-full w-full"
          />
        </div>

        {/* Info bloc */}
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
              fontSize: 'clamp(1.5rem, 2vw, 1.85rem)',
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
              fontSize: 'clamp(0.9rem, 0.95vw, 1rem)',
              lineHeight: 1.45,
              color: 'rgba(10,10,10,0.7)',
              margin: 0,
            }}
          >
            {tagline}
          </p>

          <div
            className="mt-auto flex items-center justify-between"
            style={{ paddingTop: 'clamp(0.6rem, 1.2vh, 0.9rem)' }}
          >
            <span
              style={{
                fontFamily: FONT_MONO,
                fontSize: '0.7rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(10,10,10,0.45)',
              }}
            >
              {artworks} œuvres · {introducedAt} →
            </span>

            <span
              className="univers-card-cta"
              style={{
                fontFamily: FONT_SERIF,
                fontStyle: 'italic',
                fontSize: '0.95rem',
                color: INK,
                opacity: 0,
                transform: 'translateX(-6px)',
                transition: 'opacity 320ms ease-out, transform 320ms ease-out',
              }}
            >
              Découvrir →
            </span>
          </div>
        </div>
      </Link>

      {/* Hover styles scoped to the card */}
      <style>{`
        .group:hover .univers-card-frame {
          transform: scale(1.02);
          box-shadow: 0 2px 4px rgba(0,0,0,0.06), 0 24px 40px -18px rgba(0,0,0,0.28);
        }
        .group:hover .univers-card-cta {
          opacity: 1;
          transform: translateX(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .univers-card-frame { transition: none; }
          .univers-card-cta { transition: none; opacity: 1; transform: none; }
          .group:hover .univers-card-frame { transform: none; }
        }
      `}</style>
    </UniversCardAnim>
  );
}
