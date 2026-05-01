'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import type { ChangelogEntry } from './page';

/**
 * CHANGELOG — DA premium 2026.
 *
 * Liste verticale d'entrées version. Ton geek-design transparent,
 * inspiré Linear / Vercel changelog mais avec la typo Nacks (Playfair
 * italic en display, Inter en body, JetBrains Mono en eyebrow date).
 *
 * Background cream, encres ink. Une accent ink/8 pour les séparateurs,
 * jamais blood. Pas de marquee, pas de tokens orphelins. Spray accent
 * unique sur les badges catégorie.
 *
 * Animations Motion fade-up entrée par entrée, en stagger au scroll.
 * prefers-reduced-motion respecté (final state immédiat).
 */

const INK = 'var(--color-ink, #0a0a0a)';
const CREAM = 'var(--color-cream, #f5f1e8)';
const SPRAY = 'var(--color-spray-pink, #ff1f8f)';

const FONT_SERIF = "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = "var(--font-body, Inter, system-ui, sans-serif)";
const FONT_MONO =
  "var(--font-mono, 'JetBrains Mono', ui-monospace, Menlo, monospace)";

const EASE_OUT = [0.22, 0.61, 0.36, 1] as const;

type Props = {
  entries: ChangelogEntry[];
};

export function ChangelogClient({ entries }: Props) {
  return (
    <div
      style={{
        backgroundColor: CREAM,
        color: INK,
        paddingBlock: 'clamp(5rem, 10vh, 9rem)',
      }}
    >
      <Header />
      <List entries={entries} />
      <Footer />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
 *  Header — eyebrow + titre serif italic XXL + sous-titre
 * ═══════════════════════════════════════════════════════════════════ */
function Header() {
  const prefersReduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' });
  const visible = inView || prefersReduced;
  const animate = !prefersReduced;

  return (
    <header
      ref={ref}
      className="relative mx-auto"
      style={{
        maxWidth: 'var(--container-wide, 1200px)',
        paddingInline: 'clamp(1.5rem, 4vw, 5rem)',
      }}
    >
      <motion.p
        initial={animate ? { opacity: 0, y: 8 } : false}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.55, ease: EASE_OUT }}
        className="uppercase"
        style={{
          fontFamily: FONT_BODY,
          fontSize: 'clamp(0.7rem, 0.78vw, 0.82rem)',
          letterSpacing: '0.28em',
          color: 'rgba(10,10,10,0.55)',
          margin: 0,
        }}
      >
        Journal · Changelog
      </motion.p>

      <motion.h1
        initial={animate ? { opacity: 0, y: 18 } : false}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.85, delay: 0.1, ease: EASE_OUT }}
        className="mt-6"
        style={{
          fontFamily: FONT_SERIF,
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 'clamp(3rem, 8vw, 7rem)',
          lineHeight: 0.95,
          letterSpacing: '-0.025em',
          color: INK,
          margin: 0,
        }}
      >
        Changelog.
      </motion.h1>

      <motion.p
        initial={animate ? { opacity: 0, y: 14 } : false}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        transition={{ duration: 0.7, delay: 0.25, ease: EASE_OUT }}
        className="mt-8"
        style={{
          fontFamily: FONT_BODY,
          fontSize: 'clamp(1rem, 1.1vw, 1.15rem)',
          lineHeight: 1.55,
          color: 'rgba(10,10,10,0.7)',
          margin: 0,
          maxWidth: '52ch',
        }}
      >
        Ce qui change sur la galerie. Mises à jour produit, nouveautés,
        corrections — chaque version documentée à la main.
      </motion.p>

      <div
        aria-hidden
        className="mt-[clamp(3rem,6vh,5rem)]"
        style={{ height: '1px', backgroundColor: 'rgba(10,10,10,0.12)' }}
      />
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════════════
 *  List — entrées en pile verticale, stagger au scroll
 * ═══════════════════════════════════════════════════════════════════ */
function List({ entries }: { entries: ChangelogEntry[] }) {
  return (
    <div
      className="relative mx-auto"
      style={{
        maxWidth: 'var(--container-wide, 1200px)',
        paddingInline: 'clamp(1.5rem, 4vw, 5rem)',
      }}
    >
      <ol className="flex flex-col">
        {entries.map((entry, index) => (
          <Entry key={entry.date + (entry.version ?? '')} entry={entry} index={index} />
        ))}
      </ol>
    </div>
  );
}

function Entry({ entry, index }: { entry: ChangelogEntry; index: number }) {
  const prefersReduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' });
  const visible = inView || prefersReduced;
  const animate = !prefersReduced;

  const formattedDate = new Date(entry.date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <motion.li
      ref={ref}
      initial={animate ? { opacity: 0, y: 28 } : false}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.7, delay: 0.05, ease: EASE_OUT }}
      className="grid gap-[clamp(1.5rem,3vw,3rem)] py-[clamp(2.5rem,5vh,4rem)] lg:grid-cols-[14rem_1fr]"
      style={{
        borderBottom:
          index === 0 ? 'none' : '1px solid rgba(10,10,10,0.08)',
        borderTop: index === 0 ? 'none' : undefined,
      }}
    >
      {/* Colonne gauche : date + version (sticky façon col-marge éditoriale) */}
      <div className="flex flex-col gap-3">
        <time
          dateTime={entry.date}
          className="uppercase"
          style={{
            fontFamily: FONT_MONO,
            fontSize: 'clamp(0.72rem, 0.8vw, 0.82rem)',
            letterSpacing: '0.18em',
            color: 'rgba(10,10,10,0.55)',
          }}
        >
          {formattedDate}
        </time>
        {entry.version ? (
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: 'clamp(0.95rem, 1.1vw, 1.1rem)',
              fontWeight: 500,
              letterSpacing: '0.04em',
              color: INK,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            v{entry.version}
          </span>
        ) : null}
      </div>

      {/* Colonne droite : titre + body + badges */}
      <div className="flex flex-col gap-[clamp(1rem,2vh,1.5rem)]">
        <h2
          style={{
            fontFamily: FONT_SERIF,
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(1.4rem, 2vw, 1.85rem)',
            lineHeight: 1.15,
            letterSpacing: '-0.015em',
            color: INK,
            margin: 0,
            textWrap: 'balance',
          }}
        >
          {entry.title}
        </h2>

        <div className="flex flex-col gap-[clamp(0.65rem,1.2vh,0.95rem)]">
          {entry.body.map((paragraph, i) => (
            <p
              key={i}
              style={{
                fontFamily: FONT_BODY,
                fontSize: 'clamp(0.95rem, 1.05vw, 1.05rem)',
                lineHeight: 1.65,
                color: 'rgba(10,10,10,0.78)',
                margin: 0,
                textWrap: 'pretty',
                maxWidth: '64ch',
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          {entry.categories.map((category) => (
            <Badge key={category} category={category} />
          ))}
        </div>
      </div>
    </motion.li>
  );
}

/* ═══════════════════════════════════════════════════════════════════
 *  Badge — pill catégorie, ink outline + spray accent pour Nouveau
 * ═══════════════════════════════════════════════════════════════════ */
function Badge({ category }: { category: 'Nouveau' | 'Amélioration' | 'Correctif' }) {
  const isNew = category === 'Nouveau';
  return (
    <span
      className="inline-flex items-center uppercase"
      style={{
        fontFamily: FONT_BODY,
        fontSize: 'clamp(0.65rem, 0.72vw, 0.72rem)',
        fontWeight: 500,
        letterSpacing: '0.18em',
        padding: '0.4rem 0.85rem',
        borderRadius: '999px',
        border: isNew
          ? `1px solid ${SPRAY}`
          : '1px solid rgba(10,10,10,0.25)',
        color: isNew ? SPRAY : INK,
        backgroundColor: 'transparent',
      }}
    >
      {category}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════
 *  Footer — note discrète bas de page
 * ═══════════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <div
      className="relative mx-auto mt-[clamp(4rem,8vh,7rem)]"
      style={{
        maxWidth: 'var(--container-wide, 1200px)',
        paddingInline: 'clamp(1.5rem, 4vw, 5rem)',
      }}
    >
      <div
        aria-hidden
        className="mb-[clamp(2rem,4vh,3rem)]"
        style={{ height: '1px', backgroundColor: 'rgba(10,10,10,0.12)' }}
      />
      <p
        style={{
          fontFamily: FONT_MONO,
          fontSize: 'clamp(0.72rem, 0.78vw, 0.78rem)',
          letterSpacing: '0.04em',
          color: 'rgba(10,10,10,0.55)',
          margin: 0,
        }}
      >
        Pour recevoir chaque release dans votre boîte mail, abonnez-vous à
        la newsletter Cercle depuis la page d&rsquo;accueil.
      </p>
    </div>
  );
}
