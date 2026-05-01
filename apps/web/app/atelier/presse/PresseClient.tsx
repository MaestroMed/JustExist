'use client';

import { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { PageShell } from '@/components/layouts/PageShell';

/**
 * PRESSE — DA editorial premium 2028.
 *
 * Hub presse pour journalistes / médias. Kit téléchargeable, mentions presse,
 * contact dédié. Background cream, ink sur cream, serif italic XXL, Inter body.
 * Inspiration David Zwirner / Hauser & Wirth / Hermès newsroom.
 *
 * Animations : Motion whileInView fade-up sections, prefers-reduced-motion respect.
 */

const INK = 'var(--color-ink, #0a0a0a)';
const CREAM = 'var(--color-cream, #f5f1e8)';
const PAPER = 'var(--color-paint-white, #fafafa)';

const FONT_SERIF = "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = "var(--font-body, Inter, system-ui, sans-serif)";

/* ───────── Kit presse — assets téléchargeables ───────── */
const KIT_ASSETS: ReadonlyArray<{
  label: string;
  format: string;
  size: string;
  href: string;
}> = [
  {
    label: 'Photos HD — Œuvres',
    format: 'ZIP · 12 visuels',
    size: '~120 Mo',
    href: '/press/nacks-photos-hd.zip',
  },
  {
    label: 'Biographie officielle',
    format: 'PDF · FR / EN',
    size: '~480 Ko',
    href: '/press/nacks-bio.pdf',
  },
  {
    label: 'Dossier de presse',
    format: 'PDF',
    size: '~6 Mo',
    href: '/press/nacks-dossier-presse.pdf',
  },
  {
    label: 'Logos · Identité',
    format: 'ZIP · SVG · PNG',
    size: '~3 Mo',
    href: '/press/nacks-logos.zip',
  },
];

/* ───────── Mentions presse ───────── */
const PRESS_MENTIONS: ReadonlyArray<{
  outlet: string;
  title: string;
  date: string;
  href: string;
}> = [
  {
    outlet: 'Le Monde',
    title: "Naguy Claude, le peintre qui fait passer la rue en galerie",
    date: 'Mars 2026',
    href: '#',
  },
  {
    outlet: 'Beaux Arts Magazine',
    title: "Mr Poppy ou la grammaire d'un personnage signature",
    date: 'Février 2026',
    href: '#',
  },
  {
    outlet: 'France Inter',
    title: "L'invité culture — Nacks, atelier ouvert",
    date: 'Janvier 2026',
    href: '#',
  },
  {
    outlet: 'Konbini',
    title: "Dans l'atelier parisien de Nacks",
    date: 'Décembre 2025',
    href: '#',
  },
  {
    outlet: 'Numéro',
    title: "Pop-up Los Angeles — sold out en 48 heures",
    date: 'Novembre 2025',
    href: '#',
  },
  {
    outlet: 'Vogue France',
    title: "Le nouveau langage de la peinture urbaine",
    date: 'Octobre 2025',
    href: '#',
  },
];

/* ───────── SVG download icon (inline) ───────── */
function DownloadIcon() {
  return (
    <svg
      aria-hidden
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M7 1.5V9.5M7 9.5L3.5 6M7 9.5L10.5 6M2 12.5H12"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      aria-hidden
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M4.5 2H10V7.5M10 2L4 8M2 5V10H7"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PresseClient() {
  const reduced = useReducedMotion();

  const fadeUp = reduced
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
        aria-label="Presse — header"
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
            {...fadeUp}
            className="uppercase"
            style={{
              fontFamily: FONT_BODY,
              fontSize: 'clamp(0.7rem, 0.78vw, 0.82rem)',
              letterSpacing: '0.28em',
              color: 'rgba(10,10,10,0.55)',
              margin: 0,
            }}
          >
            Presse / Media Kit
          </motion.p>

          <motion.h1
            {...fadeUp}
            transition={{ ...(fadeUp as { transition?: object }).transition, delay: reduced ? 0 : 0.08 }}
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
            Pour la presse.
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ ...(fadeUp as { transition?: object }).transition, delay: reduced ? 0 : 0.16 }}
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
            Naguy Claude est ouvert aux interviews, captations atelier et sujets
            éditoriaux. Délais courts acceptés. Contact direct, sans intermédiaire.
          </motion.p>
        </div>
      </section>

      {/* ═════════ Section 2 — Kit presse (cream split) ═════════ */}
      <section
        aria-label="Kit presse — assets téléchargeables"
        className="relative w-full"
        style={{
          backgroundColor: CREAM,
          color: INK,
          paddingBlock: 'clamp(5rem, 10vh, 10rem)',
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
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-[clamp(2.5rem,6vw,6rem)]">
            {/* Colonne gauche — Titre + intro */}
            <motion.div {...fadeUp} className="flex flex-col gap-[clamp(1.5rem,3vh,2.5rem)]">
              <p
                className="uppercase"
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 'clamp(0.7rem, 0.78vw, 0.82rem)',
                  letterSpacing: '0.28em',
                  color: 'rgba(10,10,10,0.55)',
                  margin: 0,
                }}
              >
                01 · Le kit
              </p>

              <h2
                style={{
                  fontFamily: FONT_SERIF,
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 'clamp(2.25rem, 5vw, 4rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  color: INK,
                  margin: 0,
                }}
              >
                Tout ce qu&apos;il
                <br />
                vous faut.
              </h2>

              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 'clamp(0.95rem, 1.05vw, 1.1rem)',
                  lineHeight: 1.65,
                  color: 'rgba(10,10,10,0.7)',
                  maxWidth: '28rem',
                  margin: 0,
                }}
              >
                Photos haute définition, biographie en français et anglais, dossier
                de presse complet, logos vectorisés. Téléchargement libre.
              </p>
            </motion.div>

            {/* Colonne droite — Liste assets */}
            <div className="flex flex-col gap-3">
              {KIT_ASSETS.map((asset, i) => (
                <motion.a
                  key={asset.label}
                  href={asset.href}
                  download
                  {...fadeUp}
                  transition={{
                    ...(fadeUp as { transition?: object }).transition,
                    delay: reduced ? 0 : 0.06 * i,
                  }}
                  className="group relative flex items-center justify-between gap-6 transition-colors"
                  data-cursor="link"
                  style={{
                    padding: 'clamp(1.25rem, 2.4vw, 1.75rem) clamp(1.25rem, 2.4vw, 2rem)',
                    backgroundColor: PAPER,
                    border: '1px solid rgba(10,10,10,0.08)',
                    borderRadius: '4px',
                    boxShadow:
                      '0 1px 1px rgba(10,10,10,0.04), 0 14px 28px -22px rgba(10,10,10,0.14)',
                  }}
                >
                  <div className="flex flex-col gap-1 min-w-0 flex-1">
                    <span
                      style={{
                        fontFamily: FONT_SERIF,
                        fontStyle: 'italic',
                        fontWeight: 400,
                        fontSize: 'clamp(1.1rem, 1.3vw, 1.35rem)',
                        lineHeight: 1.2,
                        color: INK,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {asset.label}
                    </span>
                    <span
                      className="uppercase"
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: 'clamp(0.7rem, 0.78vw, 0.78rem)',
                        letterSpacing: '0.18em',
                        color: 'rgba(10,10,10,0.5)',
                      }}
                    >
                      {asset.format} &middot; {asset.size}
                    </span>
                  </div>

                  <span
                    className="flex items-center gap-2 transition-transform duration-300 group-hover:translate-y-0.5"
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: 'clamp(0.78rem, 0.85vw, 0.88rem)',
                      letterSpacing: '0.06em',
                      color: INK,
                      flexShrink: 0,
                    }}
                  >
                    <DownloadIcon />
                    Télécharger
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═════════ Section 3 — Mentions presse (ink) ═════════ */}
      <section
        aria-label="Mentions presse"
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
            {...fadeUp}
            className="uppercase"
            style={{
              fontFamily: FONT_BODY,
              fontSize: 'clamp(0.7rem, 0.78vw, 0.82rem)',
              letterSpacing: '0.28em',
              color: 'rgba(245,241,232,0.55)',
              margin: 0,
            }}
          >
            02 · Ils en parlent
          </motion.p>

          <motion.h2
            {...fadeUp}
            transition={{ ...(fadeUp as { transition?: object }).transition, delay: reduced ? 0 : 0.08 }}
            className="mt-[clamp(1rem,2vh,1.75rem)]"
            style={{
              fontFamily: FONT_SERIF,
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              lineHeight: 1,
              letterSpacing: '-0.025em',
              color: CREAM,
              margin: 0,
            }}
          >
            Récents.
          </motion.h2>

          <ul
            className="mt-[clamp(3rem,6vh,5rem)] grid grid-cols-1 sm:grid-cols-2 gap-[clamp(0.75rem,1.6vw,1.5rem)]"
            style={{ listStyle: 'none', padding: 0, margin: 0 }}
          >
            {PRESS_MENTIONS.map((m, i) => (
              <motion.li
                key={`${m.outlet}-${m.date}`}
                {...fadeUp}
                transition={{
                  ...(fadeUp as { transition?: object }).transition,
                  delay: reduced ? 0 : 0.05 * i,
                }}
              >
                <a
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col justify-between gap-[clamp(2rem,4vh,3rem)] transition-colors h-full"
                  data-cursor="link"
                  style={{
                    padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                    backgroundColor: 'transparent',
                    border: '1px solid rgba(245,241,232,0.12)',
                    borderRadius: '4px',
                    minHeight: 'clamp(11rem, 16vh, 14rem)',
                  }}
                >
                  <div className="flex flex-col gap-[clamp(0.75rem,1.5vh,1rem)]">
                    <span
                      className="uppercase"
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: 'clamp(0.7rem, 0.78vw, 0.82rem)',
                        letterSpacing: '0.22em',
                        color: 'rgba(245,241,232,0.5)',
                      }}
                    >
                      {m.outlet}
                    </span>
                    <span
                      style={{
                        fontFamily: FONT_SERIF,
                        fontStyle: 'italic',
                        fontWeight: 400,
                        fontSize: 'clamp(1.25rem, 1.8vw, 1.6rem)',
                        lineHeight: 1.25,
                        letterSpacing: '-0.015em',
                        color: CREAM,
                      }}
                    >
                      {m.title}
                    </span>
                  </div>
                  <div className="flex items-end justify-between gap-3">
                    <span
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: 'clamp(0.78rem, 0.85vw, 0.88rem)',
                        color: 'rgba(245,241,232,0.55)',
                      }}
                    >
                      {m.date}
                    </span>
                    <span
                      className="flex items-center gap-1.5 uppercase transition-transform duration-300 group-hover:translate-x-1"
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: 'clamp(0.7rem, 0.78vw, 0.78rem)',
                        letterSpacing: '0.22em',
                        color: 'rgba(245,241,232,0.65)',
                      }}
                    >
                      Lire <ExternalIcon />
                    </span>
                  </div>
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═════════ Section 4 — Contact presse (cream) ═════════ */}
      <section
        aria-label="Contact presse"
        className="relative w-full overflow-hidden"
        style={{
          backgroundColor: CREAM,
          color: INK,
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
          <motion.div
            {...fadeUp}
            className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-[clamp(2.5rem,6vw,6rem)] lg:items-end"
          >
            <div className="flex flex-col gap-[clamp(1.25rem,2.5vh,2rem)]">
              <p
                className="uppercase"
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 'clamp(0.7rem, 0.78vw, 0.82rem)',
                  letterSpacing: '0.28em',
                  color: 'rgba(10,10,10,0.55)',
                  margin: 0,
                }}
              >
                03 · Contact direct
              </p>

              <h2
                style={{
                  fontFamily: FONT_SERIF,
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 'clamp(2.25rem, 5vw, 4rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  color: INK,
                  margin: 0,
                }}
              >
                Écrivez-nous.
              </h2>
            </div>

            <div
              className="flex flex-col gap-6"
              style={{
                padding: 'clamp(2rem, 4vw, 3rem)',
                backgroundColor: PAPER,
                border: '1px solid rgba(10,10,10,0.08)',
                borderRadius: '4px',
                boxShadow:
                  '0 1px 1px rgba(10,10,10,0.04), 0 18px 40px -22px rgba(10,10,10,0.18)',
              }}
            >
              <div className="flex flex-col gap-1.5">
                <span
                  className="uppercase"
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 'clamp(0.7rem, 0.78vw, 0.78rem)',
                    letterSpacing: '0.22em',
                    color: 'rgba(10,10,10,0.5)',
                  }}
                >
                  Email presse
                </span>
                <a
                  href="mailto:presse@nacksgalerie.com"
                  className="transition-opacity hover:opacity-70"
                  data-cursor="link"
                  style={{
                    fontFamily: FONT_SERIF,
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: 'clamp(1.4rem, 2vw, 1.85rem)',
                    color: INK,
                    letterSpacing: '-0.01em',
                  }}
                >
                  presse@nacksgalerie.com
                </a>
              </div>

              <div
                aria-hidden
                style={{
                  height: '1px',
                  backgroundColor: 'rgba(10,10,10,0.08)',
                }}
              />

              <div className="flex flex-col gap-1.5">
                <span
                  className="uppercase"
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 'clamp(0.7rem, 0.78vw, 0.78rem)',
                    letterSpacing: '0.22em',
                    color: 'rgba(10,10,10,0.5)',
                  }}
                >
                  Téléphone &middot; Sur demande
                </span>
                <span
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 'clamp(0.95rem, 1.05vw, 1.1rem)',
                    lineHeight: 1.55,
                    color: 'rgba(10,10,10,0.72)',
                  }}
                >
                  Communiqué après le premier échange. Pour interview programmée
                  ou captation atelier.
                </span>
              </div>

              <div
                aria-hidden
                style={{
                  height: '1px',
                  backgroundColor: 'rgba(10,10,10,0.08)',
                }}
              />

              <div className="flex flex-col gap-1.5">
                <span
                  className="uppercase"
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 'clamp(0.7rem, 0.78vw, 0.78rem)',
                    letterSpacing: '0.22em',
                    color: 'rgba(10,10,10,0.5)',
                  }}
                >
                  Délai de réponse
                </span>
                <span
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 'clamp(0.95rem, 1.05vw, 1.1rem)',
                    lineHeight: 1.55,
                    color: 'rgba(10,10,10,0.72)',
                  }}
                >
                  Sous 24 heures, jours ouvrés. Délais courts acceptés &mdash;
                  préciser l&apos;urgence en objet.
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
}
