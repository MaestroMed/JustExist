'use client';

import { motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import { PageShell } from '@/components/layouts/PageShell';

/**
 * RACCOURCIS — DA editorial premium 2028.
 *
 * Page « easter egg / shortcuts » restylée. Background cream, ink sur cream.
 * Layout 2 colonnes : Keyboard / Liens utiles. Section easter egg en bas.
 * Drip noir SVG décoratif coin de page (clin d'œil graphique sobre).
 *
 * Inspiration David Zwirner colophon page / Aesop site map / Hermès raccourcis.
 *
 * Animations : Motion whileInView fade-up sections, prefers-reduced-motion respect.
 */

const INK = 'var(--color-ink, #0a0a0a)';
const CREAM = 'var(--color-cream, #f5f1e8)';
const PAPER = 'var(--color-paint-white, #fafafa)';

const FONT_SERIF = "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = "var(--font-body, Inter, system-ui, sans-serif)";

/* ───────── Touches clavier ───────── */
type Key = { keys: string[]; label: string };

const KEYBOARD: ReadonlyArray<Key> = [
  { keys: ['/'], label: 'Ouvrir la recherche' },
  { keys: ['?'], label: 'Ouvrir l’aide raccourcis' },
  { keys: ['Esc'], label: 'Fermer modale, drawer, lightbox' },
  { keys: ['G', 'H'], label: 'Aller à l’accueil' },
  { keys: ['G', 'O'], label: 'Aller aux œuvres' },
  { keys: ['G', 'A'], label: 'Aller à l’atelier' },
  { keys: ['G', 'J'], label: 'Aller au journal' },
  { keys: ['G', 'P'], label: 'Aller au panier' },
  { keys: ['←', '→'], label: 'Naviguer dans la lightbox' },
  { keys: ['Tab'], label: 'Skip link « Aller au contenu principal »' },
];

/* ───────── Liens utiles ───────── */
type Lien = { href: string; label: string; sub?: string };

const LIENS: ReadonlyArray<Lien> = [
  {
    href: '/atelier/commission',
    label: 'Commission sur mesure',
    sub: 'Pour une œuvre, à votre histoire',
  },
  {
    href: '/atelier/presse',
    label: 'Presse / Media kit',
    sub: 'Photos HD, biographie, dossier',
  },
  {
    href: '/atelier/chronologie',
    label: 'Chronologie 2018-2026',
    sub: 'L’arc complet de l’œuvre',
  },
  {
    href: '/#manifeste',
    label: 'Manifeste',
    sub: 'À propos &mdash; ancre home',
  },
  {
    href: '/atelier/contact',
    label: 'Contact direct',
    sub: 'Naguy lit tout, répond sous 72 h',
  },
  {
    href: '/legal/mentions-legales',
    label: 'Mentions légales',
    sub: 'Et conditions générales',
  },
];

export function RaccourcisClient() {
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
        aria-label="Raccourcis — header"
        className="relative w-full overflow-hidden"
        style={{
          backgroundColor: CREAM,
          color: INK,
          paddingBlock: 'clamp(6rem, 14vh, 12rem)',
        }}
      >
        {/* Drip noir SVG décoratif — coin haut droit */}
        <svg
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            top: 'clamp(2.5rem, 5vh, 5rem)',
            right: 'clamp(2rem, 5vw, 6rem)',
            height: 'clamp(2.5rem, 5vw, 4.5rem)',
            width: '8px',
            overflow: 'visible',
            opacity: 0.7,
          }}
          viewBox="0 0 8 70"
          preserveAspectRatio="none"
        >
          <path
            d="M4,0 C4,30 3.5,48 4,62 Q4,68 4.5,62 C4.5,48 4,30 4,0 Z"
            fill={INK}
          />
          <circle cx="4" cy="65" r="2.4" fill={INK} />
        </svg>

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
            Raccourcis / Shortcuts
          </motion.p>

          <motion.h1
            {...fadeUp}
            transition={{
              ...(fadeUp as { transition?: object }).transition,
              delay: reduced ? 0 : 0.08,
            }}
            className="mt-[clamp(1.5rem,3vh,2.5rem)] text-balance"
            style={{
              fontFamily: FONT_SERIF,
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(2.5rem, 7vw, 6rem)',
              lineHeight: 0.96,
              letterSpacing: '-0.025em',
              color: INK,
              margin: 0,
              maxWidth: '20ch',
            }}
          >
            Les raccourcis
            <br />
            de l&apos;atelier.
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{
              ...(fadeUp as { transition?: object }).transition,
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
            Pour les curieux qui lisent le code. Touches clavier qui font gagner
            du temps, liens vers les sub-pages utiles, et un dernier petit
            secret en bas de page.
          </motion.p>
        </div>
      </section>

      {/* ═════════ Section 2 — 2 colonnes Keyboard / Liens (cream) ═════════ */}
      <section
        aria-label="Touches clavier et liens utiles"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(2.5rem,6vw,5rem)]">
            {/* ───────── Colonne gauche — Keyboard ───────── */}
            <motion.div {...fadeUp} className="flex flex-col gap-[clamp(2rem,4vh,3rem)]">
              <header className="flex flex-col gap-3">
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
                  01 · Keyboard
                </p>
                <h2
                  style={{
                    fontFamily: FONT_SERIF,
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                    lineHeight: 1.05,
                    letterSpacing: '-0.02em',
                    color: INK,
                    margin: 0,
                  }}
                >
                  Touches.
                </h2>
              </header>

              <ul
                className="flex flex-col"
                style={{ listStyle: 'none', padding: 0, margin: 0 }}
              >
                {KEYBOARD.map((k, i) => (
                  <li
                    key={`kb-${i}`}
                    className="flex items-center justify-between gap-6"
                    style={{
                      paddingBlock: 'clamp(0.85rem, 1.6vh, 1.15rem)',
                      borderTop:
                        i === 0
                          ? '1px solid rgba(10,10,10,0.12)'
                          : '1px solid rgba(10,10,10,0.08)',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: 'clamp(0.92rem, 1vw, 1.05rem)',
                        color: 'rgba(10,10,10,0.78)',
                        lineHeight: 1.4,
                      }}
                    >
                      {k.label}
                    </span>
                    <span className="flex items-center gap-1.5 flex-shrink-0">
                      {k.keys.map((key, j) => (
                        <kbd
                          key={`${i}-${j}`}
                          className="inline-flex items-center justify-center"
                          style={{
                            fontFamily: FONT_BODY,
                            fontSize: 'clamp(0.72rem, 0.82vw, 0.82rem)',
                            fontWeight: 500,
                            color: INK,
                            backgroundColor: PAPER,
                            border: '1px solid rgba(10,10,10,0.15)',
                            borderRadius: '4px',
                            padding: '0.25rem 0.55rem',
                            minWidth: '1.65rem',
                            height: '1.65rem',
                            boxShadow: 'inset 0 -1px 0 rgba(10,10,10,0.08)',
                          }}
                        >
                          {key}
                        </kbd>
                      ))}
                    </span>
                  </li>
                ))}
                {/* Filet final */}
                <li
                  aria-hidden
                  style={{ borderTop: '1px solid rgba(10,10,10,0.08)' }}
                />
              </ul>
            </motion.div>

            {/* ───────── Colonne droite — Liens utiles ───────── */}
            <motion.div
              {...fadeUp}
              transition={{
                ...(fadeUp as { transition?: object }).transition,
                delay: reduced ? 0 : 0.1,
              }}
              className="flex flex-col gap-[clamp(2rem,4vh,3rem)]"
            >
              <header className="flex flex-col gap-3">
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
                  02 · Liens utiles
                </p>
                <h2
                  style={{
                    fontFamily: FONT_SERIF,
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                    lineHeight: 1.05,
                    letterSpacing: '-0.02em',
                    color: INK,
                    margin: 0,
                  }}
                >
                  Pages.
                </h2>
              </header>

              <ul
                className="flex flex-col"
                style={{ listStyle: 'none', padding: 0, margin: 0 }}
              >
                {LIENS.map((l, i) => (
                  <li
                    key={l.href}
                    style={{
                      borderTop:
                        i === 0
                          ? '1px solid rgba(10,10,10,0.12)'
                          : '1px solid rgba(10,10,10,0.08)',
                    }}
                  >
                    <Link
                      href={l.href}
                      className="group flex items-center justify-between gap-6 transition-opacity"
                      data-cursor="link"
                      style={{
                        paddingBlock: 'clamp(0.85rem, 1.6vh, 1.15rem)',
                      }}
                    >
                      <div className="flex flex-col gap-1 min-w-0">
                        <span
                          style={{
                            fontFamily: FONT_SERIF,
                            fontStyle: 'italic',
                            fontWeight: 400,
                            fontSize: 'clamp(1rem, 1.2vw, 1.2rem)',
                            color: INK,
                            lineHeight: 1.25,
                            letterSpacing: '-0.01em',
                          }}
                        >
                          {l.label}
                        </span>
                        {l.sub && (
                          <span
                            style={{
                              fontFamily: FONT_BODY,
                              fontSize: 'clamp(0.78rem, 0.85vw, 0.88rem)',
                              color: 'rgba(10,10,10,0.55)',
                              lineHeight: 1.4,
                            }}
                            dangerouslySetInnerHTML={{ __html: l.sub }}
                          />
                        )}
                      </div>
                      <span
                        aria-hidden
                        className="flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                        style={{
                          fontFamily: FONT_BODY,
                          fontSize: 'clamp(1rem, 1.1vw, 1.2rem)',
                          color: 'rgba(10,10,10,0.5)',
                        }}
                      >
                        &rarr;
                      </span>
                    </Link>
                  </li>
                ))}
                <li
                  aria-hidden
                  style={{ borderTop: '1px solid rgba(10,10,10,0.08)' }}
                />
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═════════ Section 3 — Easter egg (ink) ═════════ */}
      <section
        aria-label="Easter egg"
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
          <motion.div
            {...fadeUp}
            className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-[clamp(2.5rem,6vw,6rem)] lg:items-end"
          >
            <div className="flex flex-col gap-[clamp(1.25rem,2.5vh,2rem)]">
              <p
                className="uppercase"
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 'clamp(0.7rem, 0.78vw, 0.82rem)',
                  letterSpacing: '0.28em',
                  color: 'rgba(245,241,232,0.55)',
                  margin: 0,
                }}
              >
                03 · Pour les explorateurs
              </p>

              <h2
                style={{
                  fontFamily: FONT_SERIF,
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 'clamp(2.25rem, 5vw, 4rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.025em',
                  color: CREAM,
                  margin: 0,
                }}
              >
                Trouvé une easter egg&nbsp;?
              </h2>

              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 'clamp(1rem, 1.1vw, 1.2rem)',
                  lineHeight: 1.65,
                  color: 'rgba(245,241,232,0.7)',
                  maxWidth: '36rem',
                  margin: 0,
                }}
              >
                Il y en a quelques-unes, planquées dans les coins. Si vous en
                trouvez une, dites-le-nous &mdash; on aime savoir qui regarde
                vraiment.
              </p>
            </div>

            <div>
              <a
                href="mailto:surprise@nacksgalerie.com?subject=J%27ai%20trouv%C3%A9%20une%20easter%20egg"
                className="group relative inline-flex items-center justify-center transition-transform hover:scale-[1.02]"
                data-cursor="link"
                style={{
                  fontFamily: FONT_SERIF,
                  fontStyle: 'italic',
                  fontSize: 'clamp(1rem, 1.1vw, 1.2rem)',
                  color: INK,
                  backgroundColor: CREAM,
                  padding:
                    'clamp(0.95rem,1.8vh,1.25rem) clamp(1.6rem,2.6vw,2.4rem)',
                  borderRadius: '999px',
                  boxShadow:
                    '0 1px 1px rgba(10,10,10,0.18), 0 18px 40px -18px rgba(10,10,10,0.5)',
                }}
              >
                <span className="relative z-10">
                  Dire ce que j&apos;ai trouvé&nbsp;
                  <span
                    aria-hidden
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
}
