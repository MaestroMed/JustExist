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
 *
 * Données : faits réels documentés, validés par Naguy 'Nacks' Claude.
 */

const INK = 'var(--color-ink, #0a0a0a)';
const CREAM = 'var(--color-cream, #f5f1e8)';

const FONT_SERIF = "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = "var(--font-body, Inter, system-ui, sans-serif)";

/* ───────── Jalons réels — adolescence → 2026 ───────── */
type Jalon = {
  year: string;
  label: string;
  detail: string;
  place?: string;
};

const TIMELINE: ReadonlyArray<Jalon> = [
  {
    year: 'Enfance',
    label: 'Le déclic au Maroc',
    detail:
      "Vers dix ans, en vacances familiales, je regarde un peintre travailler dans la rue. Quelque chose se met en place — au retour, c'est le Posca avant le pinceau, le carnet avant la toile.",
    place: 'Maroc',
  },
  {
    year: '16 ans',
    label: 'Première exposition sous le nom Nacks',
    detail:
      "Adolescence, premier accrochage public. Le pseudonyme se fixe. Le travail commence à sortir du carnet et à exister hors de l'atelier.",
    place: 'Île-de-France',
  },
  {
    year: 'Avant 2018',
    label: 'Technicien son et lumière — puis tout quitter',
    detail:
      "Job alimentaire de jour, peinture la nuit. Choix de tout quitter pour peindre à temps plein. Autodidacte, on apprend en faisant, en ratant, en recommençant.",
    place: 'Paris',
  },
  {
    year: '2018',
    label: 'Prix Révélations Beaux-Arts',
    detail:
      "Premier signal institutionnel. Le geste de la rue entre dans la salle sans rien renier — POSCA, acrylique, spray, collage, stencil. Les portes commencent à s'ouvrir.",
    place: 'Paris',
  },
  {
    year: '2019',
    label: 'Solo — Truffaut Paris',
    detail:
      "Première grande exposition solo dans un espace parisien. Le travail trouve son public hors des galeries traditionnelles, dans un lieu de passage.",
    place: 'Paris',
  },
  {
    year: '2020',
    label: 'Trois solos parisiens · Représentation Los Angeles',
    detail:
      "Paname Art Café et Legacy Store du Fouquet's à Paris. Début de la représentation par Artspace Warehouse Gallery, Los Angeles — relation continue depuis. L'année où la trajectoire s'accélère.",
    place: 'Paris · Los Angeles',
  },
  {
    year: '2021',
    label: 'Casart Urban Gallery — Casablanca',
    detail:
      "Première exposition à l'étranger après LA. Retour symbolique au Maroc, là où l'enfance avait planté la graine. Le cercle commence à se boucler.",
    place: 'Casablanca',
  },
  {
    year: '2022',
    label: 'Lancement TikTok @nacksgalerie · Nacks Show',
    detail:
      "Juin 2022, démarrage du compte avec La Voix Off. Naissance du format Nacks Show : fresques interactives en live, prénoms des viewers peints en direct au POSCA. Le studio devient scène.",
    place: 'Sarcelles · TikTok',
  },
  {
    year: '2023',
    label: 'Foire de Paris · IMAGINE for Margo · 500 000 abonnés',
    detail:
      "27 avril → 7 mai, fresque «Partage» Mickey au POSCA pour l'association IMAGINE for Margo, qui lutte contre le cancer pédiatrique. Membre du jury du 1er concours Street Art de la Foire. Cap des 500 000 abonnés franchi sur les réseaux.",
    place: 'Paris',
  },
  {
    year: '2024',
    label: 'Group shows Artspace Warehouse — Los Angeles',
    detail:
      "«Top Throwback Character Art» et «Gentle Graffiti», deux expositions collectives à Culver City. Confirmation de la place chez les collectionneurs internationaux.",
    place: 'Los Angeles',
  },
  {
    year: '2026',
    label: 'Lancement nacksgalerie.com',
    detail:
      "Galerie en ligne officielle. Vente directe, sans intermédiaire. Commissions sur mesure, originaux numérotés, certificats d'authenticité. Le studio devient adresse.",
    place: 'Online',
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
            Chronologie / De l&apos;enfance à 2026
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
            Du déclic d&apos;enfance au Maroc à la galerie en ligne. Du Prix
            Révélations Beaux-Arts à la Foire de Paris, de Casablanca à Los
            Angeles, de Sarcelles à TikTok. Un fil, sans coupure.
          </motion.p>
        </div>
      </section>

      {/* ═════════ Section 2 — Timeline (cream) ═════════ */}
      <section
        aria-label="Timeline carrière"
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
