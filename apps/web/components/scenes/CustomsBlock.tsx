'use client';

import { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { DripButton } from '@/components/ui/DripButton';

/**
 * CUSTOMS BLOCK — DA editorial premium 2028.
 *
 * Section dédiée à la commande sur-mesure (revenu récurrent business).
 * Inspiration David Zwirner / Hermès commission / Aesop bespoke.
 *
 * Background ink (#0a0a0a) pour contraste avec NacksShow cream juste au-dessus.
 * Typo serif italic Playfair pour le titre, Inter pour le body.
 * Layout split asymétrique 45/55 : narratif gauche, mosaïque thumbnails droite.
 * Animations Motion whileInView, prefers-reduced-motion respecté.
 *
 * Pas de countdown, pas d'urgence, pas de "live now". Invitation calme.
 */

const INK = 'var(--color-ink, #0a0a0a)';
const CREAM = 'var(--color-cream, #f5f1e8)';
const PAPER = 'var(--color-paint-white, #fafafa)';
const SPRAY_PINK = 'var(--color-spray-pink, #ff1f8f)';

const FONT_SERIF =
  "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = "var(--font-body, Inter, system-ui, sans-serif)";
const FONT_GRAFFITI =
  "var(--font-graffiti, 'Permanent Marker', system-ui, sans-serif)";

/**
 * Customs déjà réalisés — placeholders éditoriaux.
 * À remplacer par data réelle quand le layer customs sera ajouté
 * dans apps/web/lib/content/.
 */
type CustomItem = {
  id: string;
  title: string;
  client: string;
  format: string;
  accent: string;
};

const CUSTOMS: ReadonlyArray<CustomItem> = [
  {
    id: '001',
    title: 'Mr Poppy — Salon privé',
    client: 'Collectionneur · Paris 16e',
    format: 'Toile 80 × 100 cm',
    accent: 'var(--color-spray-pink, #ff1f8f)',
  },
  {
    id: '002',
    title: 'Fresque entrée bureau',
    client: 'Studio créatif · Pantin',
    format: 'Mur 4 × 2,5 m',
    accent: 'var(--color-spray-yellow, #fae600)',
  },
  {
    id: '003',
    title: 'Sneakers signées',
    client: 'Cadeau anniversaire',
    format: 'Air Force 1 — paire',
    accent: 'var(--color-spray-blue, #0044ff)',
  },
];

export function CustomsBlock() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = prefersReducedMotion
    ? { initial: { opacity: 1, y: 0 }, whileInView: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
      };

  return (
    <section
      ref={sectionRef}
      aria-label="Customs — commande sur-mesure"
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: INK,
        color: CREAM,
        paddingBlock: 'clamp(5rem, 10vh, 10rem)',
      }}
    >
      {/* Micro tag NACKS — coin haut droit, discret cream */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute select-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: prefersReducedMotion ? 0.45 : 0.45 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          top: 'clamp(1.5rem, 3vh, 2.5rem)',
          right: 'clamp(1.5rem, 4vw, 5rem)',
          fontFamily: FONT_GRAFFITI,
          fontSize: 'clamp(0.85rem, 1vw, 1rem)',
          letterSpacing: '0.18em',
          color: CREAM,
          transform: 'rotate(-4deg)',
        }}
      >
        NACKS
      </motion.span>

      <div
        className="relative mx-auto"
        style={{
          maxWidth: 'var(--container-max, 1440px)',
          paddingInline: 'clamp(1.5rem, 4vw, 5rem)',
        }}
      >
        <div className="grid grid-cols-1 gap-[clamp(2.5rem,6vw,5rem)] lg:grid-cols-[45fr_55fr] lg:items-start">
          {/* ───────── Colonne gauche : narratif + CTA ───────── */}
          <div className="flex flex-col gap-[clamp(1.5rem,3vh,2.25rem)]">
            <motion.p
              {...fadeUp}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="uppercase"
              style={{
                fontFamily: FONT_BODY,
                fontSize: 'clamp(0.7rem, 0.78vw, 0.82rem)',
                letterSpacing: '0.28em',
                color: 'rgba(245,241,232,0.55)',
                margin: 0,
              }}
            >
              Customs · Sur commande
            </motion.p>

            <motion.h2
              {...fadeUp}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
              style={{
                fontFamily: FONT_SERIF,
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(3rem, 6vw, 6rem)',
                lineHeight: 1.02,
                letterSpacing: '-0.02em',
                color: CREAM,
                margin: 0,
              }}
            >
              <span className="block">Une œuvre pour vous,</span>
              <span className="relative block">
                à votre histoire.
                {/* Mini drip pink discret sous "histoire." */}
                <motion.svg
                  aria-hidden
                  className="pointer-events-none absolute"
                  style={{
                    right: 'clamp(0.5rem, 2vw, 2rem)',
                    top: '88%',
                    height: 'clamp(1.5rem, 3vw, 2.75rem)',
                    width: '6px',
                    overflow: 'visible',
                    transformOrigin: 'top center',
                  }}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1, scaleY: 1 }
                      : { opacity: 0, scaleY: 0 }
                  }
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.7, delay: 0.7, ease: [0.55, 0.085, 0.68, 0.53] }}
                  viewBox="0 0 6 40"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3,0 C3,18 2.6,28 3,36 Q3,40 3.4,36 C3.4,28 3,18 3,0 Z"
                    fill={SPRAY_PINK}
                  />
                  <circle cx="3" cy="38" r="1.8" fill={SPRAY_PINK} />
                </motion.svg>
              </span>
            </motion.h2>

            <motion.p
              {...fadeUp}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: FONT_BODY,
                fontSize: 'clamp(0.95rem, 1.05vw, 1.125rem)',
                lineHeight: 1.65,
                color: 'rgba(245,241,232,0.78)',
                maxWidth: '34rem',
                margin: 0,
              }}
            >
              De l&rsquo;esquisse à la signature, en moyenne 4 à 8 semaines.
              Trois sessions de revue. Format libre — toile, mur, planche,
              sneaker, tatouage cuir.
            </motion.p>

            {/* CTA primary — DripButton glow pink */}
            <motion.div
              {...fadeUp}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-2 self-start"
            >
              <DripButton href="/atelier/commission" variant="primary" glow="pink" size="md">
                Démarrer un projet
              </DripButton>
            </motion.div>

            <motion.p
              {...fadeUp}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mt-1"
              style={{
                fontFamily: FONT_BODY,
                fontSize: 'clamp(0.78rem, 0.85vw, 0.9rem)',
                fontWeight: 600,
                lineHeight: 1.5,
                color: 'rgba(245,241,232,0.55)',
                margin: 0,
              }}
            >
              Tarif à partir de 800&nbsp;€. Devis gratuit sous 48&nbsp;h.
            </motion.p>
          </div>

          {/* ───────── Colonne droite : mosaïque customs ───────── */}
          <div
            className="relative grid grid-cols-2 gap-[clamp(0.75rem,1.6vw,1.5rem)]"
            aria-label="Customs déjà réalisés"
          >
            {CUSTOMS.map((item, idx) => (
              <CustomThumb
                key={item.id}
                item={item}
                index={idx}
                prefersReducedMotion={Boolean(prefersReducedMotion)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
 *  CustomThumb — placeholder éditorial avec mini drip décoratif
 *  Layout asymétrique : item 0 span 2 lignes (gauche), 1 et 2 empilés
 * ═══════════════════════════════════════════════════════════════════ */
function CustomThumb({
  item,
  index,
  prefersReducedMotion,
}: {
  item: CustomItem;
  index: number;
  prefersReducedMotion: boolean;
}) {
  const isFeature = index === 0;

  return (
    <motion.figure
      className={isFeature ? 'row-span-2' : ''}
      initial={
        prefersReducedMotion
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: 0.95 }
      }
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{
        duration: 0.7,
        delay: 0.2 + index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ margin: 0 }}
    >
      {/* Photo placeholder — aspect 4/5 */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: isFeature ? '4 / 5' : '4 / 3',
          backgroundColor: CREAM,
          borderRadius: '4px',
        }}
      >
        {/* Mini drip décoratif coloré à la couleur d'accent */}
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 125"
          preserveAspectRatio="none"
        >
          {/* Base diagonal subtle */}
          <path
            d="M 0 0 L 100 0 L 100 50 L 0 90 Z"
            fill="rgba(10,10,10,0.04)"
          />
          {/* Drip principal centré */}
          <path
            d={
              isFeature
                ? 'M 50 8 C 50 32 49 50 50 62 Q 50 70 51 62 C 51 50 50 32 50 8 Z'
                : 'M 30 10 C 30 28 29 38 30 46 Q 30 52 31 46 C 31 38 30 28 30 10 Z'
            }
            fill={item.accent}
            opacity="0.85"
          />
          <circle
            cx={isFeature ? 50.5 : 30.5}
            cy={isFeature ? 65 : 49}
            r={isFeature ? 1.6 : 1.3}
            fill={item.accent}
          />
          {/* Drip secondaire offset */}
          <path
            d={
              isFeature
                ? 'M 72 14 C 72 26 71 36 72 42 Q 72 46 73 42 C 73 36 72 26 72 14 Z'
                : 'M 65 18 C 65 30 64 38 65 44 Q 65 48 66 44 C 66 38 65 30 65 18 Z'
            }
            fill={INK}
            opacity="0.55"
          />
        </svg>

        {/* Numéro custom — coin bas-gauche */}
        <span
          className="absolute"
          style={{
            bottom: 'clamp(0.6rem, 1vw, 1rem)',
            left: 'clamp(0.6rem, 1vw, 1rem)',
            fontFamily: FONT_BODY,
            fontSize: 'clamp(0.65rem, 0.7vw, 0.75rem)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            fontWeight: 600,
            color: 'rgba(10,10,10,0.55)',
          }}
        >
          Custom #{item.id}
        </span>
      </div>

      {/* Légende — Inter petite cream/600 */}
      <figcaption
        className="mt-3 flex flex-col gap-1"
        style={{
          fontFamily: FONT_BODY,
          color: 'rgba(245,241,232,0.78)',
        }}
      >
        <span
          style={{
            fontFamily: FONT_SERIF,
            fontStyle: 'italic',
            fontSize: 'clamp(0.95rem, 1vw, 1.1rem)',
            color: CREAM,
            lineHeight: 1.25,
          }}
        >
          {item.title}
        </span>
        <span
          style={{
            fontSize: 'clamp(0.72rem, 0.78vw, 0.82rem)',
            letterSpacing: '0.06em',
            color: 'rgba(245,241,232,0.55)',
          }}
        >
          {item.client} &middot; {item.format}
        </span>
      </figcaption>
    </motion.figure>
  );
}
