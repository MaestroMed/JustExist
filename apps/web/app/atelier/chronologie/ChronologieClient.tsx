'use client';

import { motion, useReducedMotion } from 'motion/react';
import { PageShell } from '@/components/layouts/PageShell';

/**
 * CHRONOLOGIE — DA editorial premium 2028.
 *
 * Timeline détaillée de la carrière. Plus exhaustive que la mini-timeline
 * d'/atelier. Background cream, layout vertical gauche-aligné : année serif
 * italic XXL ink/30%, événement à droite avec titre serif italic + description
 * Inter. Connecteur ligne fine ink/15% + dot ink à chaque année.
 *
 * Animations : Motion stagger fade-up par item, dot scale-in.
 * prefers-reduced-motion respect.
 *
 * Inspiration David Zwirner career timeline / Hauser & Wirth bio pages.
 */

const INK = 'var(--color-ink, #0a0a0a)';
const CREAM = 'var(--color-cream, #f5f1e8)';

const FONT_SERIF = "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = "var(--font-body, Inter, system-ui, sans-serif)";

/* ───────── Jalons exhaustifs 2018 → 2026 ───────── */
type Jalon = {
  year: string;
  label: string;
  detail: string;
  place?: string;
};

const TIMELINE: ReadonlyArray<Jalon> = [
  {
    year: '2018',
    label: 'Prix Révélations Beaux-Arts',
    detail:
      "Premier signal institutionnel. Le geste de la rue entre dans la salle. La galerie ne remplace pas le mur — elle l'accompagne.",
    place: 'Paris',
  },
  {
    year: '2019',
    label: 'Première fresque commandée',
    detail:
      "Mairie de Sarcelles. Mur de quartier, format monumental. Le retour aux origines, mais avec un cadre officiel cette fois.",
    place: 'Sarcelles',
  },
  {
    year: '2020',
    label: '« Murs et carnets » — solo show',
    detail:
      "Galerie 47, Paris. Première exposition solo. Acrylique, Posca, aérosol. Refus du décor, présence du geste.",
    place: 'Paris',
  },
  {
    year: '2021',
    label: 'Pop-up Hong Kong',
    detail:
      "Collaboration avec la fondation HK Arts. Trois semaines de résidence et de présence. Ouverture asiatique.",
    place: 'Hong Kong',
  },
  {
    year: '2022',
    label: 'Lancement de la série Mr Poppy',
    detail:
      "Naissance du personnage signature. 10 originaux vendus à la communauté en quelques jours. Le langage devient lexique.",
    place: 'Atelier',
  },
  {
    year: '2023',
    label: '« JUST EXIST » — Reims & livre',
    detail:
      "Exposition manifeste à Reims. Publication du livre éponyme aux éditions Skira — première monographie. Le titre devient devise.",
    place: 'Reims',
  },
  {
    year: '2024',
    label: 'Pop-up Los Angeles · Lion d\'Eiffel',
    detail:
      "Artspace Warehouse Gallery, Culver City. Sold out en 48 h au vernissage. Lancement de la série Lion d'Eiffel.",
    place: 'Los Angeles',
  },
  {
    year: '2025',
    label: 'Mise en ligne nacksgalerie.com',
    detail:
      "Le royaume numérique s'ouvre au monde. Vente directe, sans intermédiaire. Acquisition assistée, certificats d'authenticité.",
    place: 'Online',
  },
  {
    year: '2026',
    label: 'Tour Casablanca + Dijon',
    detail:
      "Deux pop-ups, deux territoires. Casablanca pour le Maghreb, Dijon pour la France des régions. La galerie continue de bouger.",
    place: 'Casablanca · Dijon',
  },
];

export function ChronologieClient() {
  const reduced = useReducedMotion();

  const fadeUpHeader = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-80px' },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <PageShell>
      {/* ═════════ Section 1 — Header (cream) ═════════ */}
      <section
        aria-label="Chronologie — header"
        className="relative w-full overflow-hidden"
        style={{
          backgroundColor: CREAM,
          color: INK,
          paddingBlock: 'clamp(6rem, 14vh, 12rem)',
        }}
      >
        <div
          className="relative mx-auto"
          style={{
            maxWidth: 'var(--container-max, 1440px)',
            paddingInline: 'clamp(1.5rem, 4vw, 5rem)',
          }}
        >
          <motion.p
            {...fadeUpHeader}
            className="uppercase"
            style={{
              fontFamily: FONT_BODY,
              fontSize: 'clamp(0.7rem, 0.78vw, 0.82rem)',
              letterSpacing: '0.28em',
              color: 'rgba(10,10,10,0.55)',
              margin: 0,
            }}
          >
            Chronologie / Depuis 2018
          </motion.p>

          <motion.h1
            {...fadeUpHeader}
            transition={{
              ...(fadeUpHeader as { transition?: object }).transition,
              delay: reduced ? 0 : 0.08,
            }}
            className="mt-[clamp(1.5rem,3vh,2.5rem)] text-balance"
            style={{
              fontFamily: FONT_SERIF,
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(3rem, 8vw, 7.5rem)',
              lineHeight: 0.96,
              letterSpacing: '-0.025em',
              color: INK,
              margin: 0,
              maxWidth: '20ch',
            }}
          >
            L&apos;arc de l&apos;œuvre.
          </motion.h1>

          <motion.p
            {...fadeUpHeader}
            transition={{
              ...(fadeUpHeader as { transition?: object }).transition,
              delay: reduced ? 0 : 0.16,
            }}
            className="mt-[clamp(1.5rem,3vh,2.5rem)]"
            style={{
              fontFamily: FONT_BODY,
              fontSize: 'clamp(1rem, 1.15vw, 1.25rem)',
              lineHeight: 1.65,
              color: 'rgba(10,10,10,0.7)',
              maxWidth: '40rem',
              margin: 0,
            }}
          >
            Neuf années, un fil. Du Prix Révélations à la galerie en ligne, des
            murs de Sarcelles aux pop-ups de Los Angeles. Lecture verticale,
            sans coupure.
          </motion.p>
        </div>
      </section>

      {/* ═════════ Section 2 — Timeline (cream) ═════════ */}
      <section
        aria-label="Timeline 2018-2026"
        className="relative w-full"
        style={{
          backgroundColor: CREAM,
          color: INK,
          paddingBlock: 'clamp(4rem, 8vh, 8rem)',
          borderTop: '1px solid rgba(10,10,10,0.08)',
        }}
      >
        <div
          className="relative mx-auto"
          style={{
            maxWidth: 'var(--container-max, 1440px)',
            paddingInline: 'clamp(1.5rem, 4vw, 5rem)',
          }}
        >
          <ol
            className="relative"
            style={{ listStyle: 'none', padding: 0, margin: 0 }}
          >
            {/* Connecteur vertical — ligne fine ink/15% (desktop) */}
            <div
              aria-hidden
              className="hidden lg:block absolute"
              style={{
                left: 'calc(8rem + 0.5rem)',
                top: '0.5rem',
                bottom: '0.5rem',
                width: '1px',
                backgroundColor: 'rgba(10,10,10,0.15)',
              }}
            />

            {TIMELINE.map((j, i) => (
              <TimelineItem key={j.year} item={j} index={i} reduced={reduced} />
            ))}
          </ol>
        </div>
      </section>

      {/* ═════════ Section 3 — Coda (ink) ═════════ */}
      <section
        aria-label="Coda — la suite"
        className="relative w-full overflow-hidden"
        style={{
          backgroundColor: INK,
          color: CREAM,
          paddingBlock: 'clamp(5rem, 10vh, 10rem)',
        }}
      >
        <div
          className="relative mx-auto"
          style={{
            maxWidth: 'var(--container-max, 1440px)',
            paddingInline: 'clamp(1.5rem, 4vw, 5rem)',
          }}
        >
          <motion.p
            {...fadeUpHeader}
            className="uppercase"
            style={{
              fontFamily: FONT_BODY,
              fontSize: 'clamp(0.7rem, 0.78vw, 0.82rem)',
              letterSpacing: '0.28em',
              color: 'rgba(245,241,232,0.55)',
              margin: 0,
            }}
          >
            La suite
          </motion.p>

          <motion.h2
            {...fadeUpHeader}
            transition={{
              ...(fadeUpHeader as { transition?: object }).transition,
              delay: reduced ? 0 : 0.08,
            }}
            className="mt-[clamp(1rem,2vh,1.75rem)] text-balance"
            style={{
              fontFamily: FONT_SERIF,
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: CREAM,
              margin: 0,
              maxWidth: '32ch',
            }}
          >
            La chronologie n&apos;est pas un trophée &mdash; c&apos;est un fil
            qui continue.
          </motion.h2>
        </div>
      </section>
    </PageShell>
  );
}

/* ═════════════════════════════════════════════════════════════════════
 *  TimelineItem — un jalon, avec dot scale-in et stagger fade-up
 * ═════════════════════════════════════════════════════════════════════ */
function TimelineItem({
  item,
  index,
  reduced,
}: {
  item: Jalon;
  index: number;
  reduced: boolean | null;
}) {
  const baseDelay = reduced ? 0 : Math.min(0.06 * index, 0.4);

  const fadeUp = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-60px' },
        transition: {
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1] as const,
          delay: baseDelay,
        },
      };

  const dotIn = reduced
    ? {}
    : {
        initial: { opacity: 0, scale: 0.4 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true, margin: '-60px' },
        transition: {
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1] as const,
          delay: baseDelay + 0.05,
        },
      };

  return (
    <li
      className="relative grid grid-cols-1 lg:grid-cols-[8rem_2rem_1fr] gap-x-[clamp(1rem,2vw,2rem)] gap-y-3"
      style={{
        paddingBlock: 'clamp(1.75rem, 3vh, 2.75rem)',
        borderTop:
          index === 0
            ? '1px solid rgba(10,10,10,0.15)'
            : '1px solid rgba(10,10,10,0.08)',
      }}
    >
      {/* Année — serif italic XXL ink/30% (desktop) */}
      <motion.div
        {...fadeUp}
        className="flex items-start lg:justify-end"
      >
        <span
          style={{
            fontFamily: FONT_SERIF,
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)',
            lineHeight: 0.95,
            color: 'rgba(10,10,10,0.32)',
            letterSpacing: '-0.02em',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {item.year}
        </span>
      </motion.div>

      {/* Dot — visible desktop only, aligné sur le connecteur vertical */}
      <div className="hidden lg:flex items-start justify-center pt-3">
        <motion.span
          {...dotIn}
          aria-hidden
          className="inline-block"
          style={{
            width: '11px',
            height: '11px',
            borderRadius: '999px',
            backgroundColor: INK,
            boxShadow: '0 0 0 4px ' + CREAM,
          }}
        />
      </div>

      {/* Titre + description */}
      <motion.div
        {...fadeUp}
        transition={{
          ...(fadeUp as { transition?: { delay?: number } }).transition,
          delay: baseDelay + 0.04,
        }}
        className="flex flex-col gap-2"
        style={{ maxWidth: '40rem' }}
      >
        <h3
          style={{
            fontFamily: FONT_SERIF,
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(1.25rem, 1.6vw, 1.5rem)',
            lineHeight: 1.2,
            letterSpacing: '-0.015em',
            color: INK,
            margin: 0,
          }}
        >
          {item.label}
        </h3>
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 'clamp(0.95rem, 1.05vw, 1.1rem)',
            lineHeight: 1.65,
            color: 'rgba(10,10,10,0.7)',
            margin: 0,
          }}
        >
          {item.detail}
        </p>
        {item.place && (
          <span
            className="uppercase mt-1"
            style={{
              fontFamily: FONT_BODY,
              fontSize: 'clamp(0.65rem, 0.72vw, 0.75rem)',
              letterSpacing: '0.22em',
              color: 'rgba(10,10,10,0.5)',
            }}
          >
            {item.place}
          </span>
        )}
      </motion.div>
    </li>
  );
}
