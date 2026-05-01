'use client';

import Image from 'next/image';
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

/* ───────── Mentions presse — sources réelles documentées ───────── */
const PRESS_MENTIONS: ReadonlyArray<{
  outlet: string;
  title: string;
  date: string;
  href: string;
  quote?: string;
}> = [
  {
    outlet: 'Le Parisien',
    title:
      "Nacks, l'artiste aux 500 000 abonnés sur TikTok peint pour les enfants malades à la Foire de Paris",
    date: '25 avril 2023',
    href: 'https://www.leparisien.fr/val-d-oise-95/nacks-lartiste-aux-500-000-abonnes-sur-tiktok-peint-pour-les-enfants-malades-a-la-foire-de-paris-25-04-2023-WHGZPRJRTVGZ5LFD3SZ7WE5QF4.php',
    quote:
      "Une fresque «Partage» peinte au POSCA pour IMAGINE for Margo, association de lutte contre le cancer pédiatrique.",
  },
  {
    outlet: 'AirZen Radio',
    title:
      "Paris : Nacks, l'artiste peintre aux 500 000 abonnés sur les réseaux",
    date: '2023',
    href: 'https://www.airzen.fr/paris-nacks-lartiste-peintre-aux-500-000-abonnes-sur-les-reseaux/',
    quote:
      "Portrait radio d'un peintre autodidacte du Val-d'Oise qui rassemble une communauté en ligne autour de ses fresques au POSCA.",
  },
  {
    outlet: 'POSCA',
    title:
      "Nacks & La Voix Off pour une fresque interactive à la Foire de Paris",
    date: '2023',
    href: 'https://www.posca.com/fr/communities/street-art/nacks-la-voix-off-fresque-foire-de-paris-2023/',
    quote:
      "Reportage officiel POSCA sur la performance live de Nacks et La Voix Off pendant la Foire de Paris.",
  },
  {
    outlet: 'POSCA',
    title:
      "POSCA & Nacks à la Foire de Paris pour une fresque nommée «Partage»",
    date: '2023',
    href: 'https://www.posca.com/fr/communities/street-art/posca-nacks-a-la-foire-de-paris-posca-2023/',
    quote:
      "Plongée dans le making-of de la fresque «Partage», jury du 1er concours Street Art de la Foire.",
  },
  {
    outlet: 'POSCA',
    title: 'NACKS, La Voix Off & TikTok — les fresques de prénoms',
    date: '2022',
    href: 'https://www.posca.com/fr/communities/life-custom-fr/nacks-la-voix-off-les-prenoms-tiktok2/',
    quote:
      "Le format «Nacks Show» décrypté : fresques de prénoms en live, communauté TikTok @nacksgalerie.",
  },
  {
    outlet: 'IMAGINE for Margo',
    title:
      "Foire de Paris : l'artiste NACKS se mobilise pour l'association IMAGINE for Margo",
    date: 'Avril 2023',
    href: 'https://imagineformargo.org/foire-de-paris-lartiste-nacks-se-mobilise-pour-lassociation-imagine-for-margo-qui-lutte-contre-le-cancer-des-enfants/',
    quote:
      "L'association partenaire raconte l'engagement de Nacks pour la lutte contre le cancer des enfants.",
  },
  {
    outlet: 'World Today News',
    title: "Teal — Nacks' paintings and graffiti are popular",
    date: '2023',
    href: 'https://www.world-today-news.com/teal-nacks-paintings-and-graffiti-are-popular/',
    quote:
      "Coverage internationale de la trajectoire de Nacks, entre peinture, graffiti et reconnaissance des collectionneurs.",
  },
  {
    outlet: 'Artspace Warehouse',
    title: 'Naguy Claude — profil galerie, biographie, œuvres disponibles',
    date: 'Depuis 2020',
    href: 'https://www.artspacewarehouse.com/en/artist-naguy-claude',
    quote:
      "Galerie représentante à Los Angeles. Biographie complète, œuvres disponibles, group shows 2024.",
  },
  {
    outlet: 'Artsy',
    title: 'Naguy Claude — profil, œuvres, CV exposition',
    date: '2025',
    href: 'https://www.artsy.net/artist/naguy-claude',
    quote:
      "Référencement Artsy : œuvre «Street Life» (2025), CV d'expositions, biographie institutionnelle.",
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

      {/* ═════════ Banner journalistique — photo atelier ═════════ */}
      <motion.figure
        {...fadeUp}
        className="relative w-full overflow-hidden"
        style={{ margin: 0, aspectRatio: '21 / 9', maxHeight: '60vh' }}
      >
        <Image
          src="/photos/portrait/naguy-painting-mickey.jpg"
          alt="Naguy Claude en train de peindre une fresque Mickey en mots dans son atelier de Sarcelles"
          fill
          sizes="100vw"
          priority={false}
          className="object-cover"
        />
        <figcaption
          className="absolute"
          style={{
            bottom: 'clamp(1rem, 2vh, 1.5rem)',
            left: 'clamp(1.5rem, 4vw, 5rem)',
            fontFamily: FONT_BODY,
            fontSize: 'clamp(0.7rem, 0.78vw, 0.82rem)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.95)',
            textShadow: '0 1px 3px rgba(0,0,0,0.7)',
          }}
        >
          Naguy &laquo;&nbsp;Nacks&nbsp;&raquo; Claude — atelier de Sarcelles
        </figcaption>
      </motion.figure>

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
                    minHeight: 'clamp(13rem, 20vh, 18rem)',
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
                        fontSize: 'clamp(1.15rem, 1.6vw, 1.45rem)',
                        lineHeight: 1.3,
                        letterSpacing: '-0.015em',
                        color: CREAM,
                      }}
                    >
                      {m.title}
                    </span>
                    {m.quote && (
                      <span
                        style={{
                          fontFamily: FONT_BODY,
                          fontSize: 'clamp(0.85rem, 0.95vw, 0.95rem)',
                          lineHeight: 1.55,
                          color: 'rgba(245,241,232,0.62)',
                          marginTop: '0.5rem',
                        }}
                      >
                        &laquo; {m.quote} &raquo;
                      </span>
                    )}
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
