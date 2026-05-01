'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

/**
 * COMMUNAUTÉ — DA premium 2026.
 *
 * Quatre sections :
 *   1. Header cream — eyebrow + titre serif italic XXL + sous-titre.
 *   2. Repères ink — 4 stats grand format (count-up Motion).
 *   3. Témoignages cream — 3 cards quotes serif italic.
 *   4. Rejoignez cream — CTA primary newsletter + secondary Instagram.
 *   + footer sociales monospace cream/60.
 *
 * Tokens stricts : --color-ink, --color-cream, jamais --color-blood.
 * Spray pink en accent unique sur l'eyebrow Cercle, conformément à la
 * règle "spray colors max 1".
 *
 * Animations Motion fade-up + count-up stats. prefers-reduced-motion
 * respecté (final state immédiat, pas de count-up).
 */

const INK = 'var(--color-ink, #0a0a0a)';
const CREAM = 'var(--color-cream, #f5f1e8)';
const SPRAY = 'var(--color-spray-pink, #ff1f8f)';

const FONT_SERIF = "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = "var(--font-body, Inter, system-ui, sans-serif)";
const FONT_MONO =
  "var(--font-mono, 'JetBrains Mono', ui-monospace, Menlo, monospace)";

const EASE_OUT = [0.22, 0.61, 0.36, 1] as const;

export function CommunauteClient() {
  return (
    <>
      <Header />
      <Stats />
      <Testimonials />
      <Join />
      <SocialFooter />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
 *  1. HEADER — cream
 * ═══════════════════════════════════════════════════════════════════ */
function Header() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' });
  const prefersReduced = useReducedMotion() ?? false;
  const visible = inView || prefersReduced;
  const animate = !prefersReduced;

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: CREAM,
        color: INK,
        paddingBlock: 'clamp(5rem, 10vh, 9rem)',
      }}
    >
      <div
        className="mx-auto"
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
            color: SPRAY,
            margin: 0,
          }}
        >
          La communauté · Le Cercle
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
            fontSize: 'clamp(2.75rem, 7vw, 6rem)',
            lineHeight: 0.98,
            letterSpacing: '-0.025em',
            color: INK,
            margin: 0,
            textWrap: 'balance',
            maxWidth: '18ch',
          }}
        >
          Une communauté autour de l&rsquo;œuvre.
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
          Collectionneurs, fans, journalistes, autres artistes — voici ce qui
          les rassemble. Un point de rencontre lent, qui suit le rythme de
          l&rsquo;atelier, pas celui des réseaux.
        </motion.p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
 *  2. STATS — ink (alternance), 4 chiffres count-up
 * ═══════════════════════════════════════════════════════════════════ */
type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

const STATS: Stat[] = [
  { value: 824, suffix: 'K', label: 'Suiveurs Instagram' },
  { value: 510, suffix: 'K', label: 'Abonnés TikTok' },
  { value: 18, suffix: 'K', label: 'Newsletter Cercle' },
  { value: 1240, label: 'Collectionneurs' },
];

function Stats() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px -10% 0px' });
  const prefersReduced = useReducedMotion() ?? false;
  const visible = inView || prefersReduced;
  const animate = !prefersReduced;

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: INK,
        color: CREAM,
        paddingBlock: 'clamp(5rem, 10vh, 9rem)',
      }}
    >
      <div
        className="mx-auto"
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
            color: 'rgba(245,241,232,0.55)',
            margin: 0,
          }}
        >
          Les repères
        </motion.p>

        <motion.h2
          initial={animate ? { opacity: 0, y: 18 } : false}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.85, delay: 0.1, ease: EASE_OUT }}
          className="mt-6"
          style={{
            fontFamily: FONT_SERIF,
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(2rem, 4vw, 3.25rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: CREAM,
            margin: 0,
            maxWidth: '24ch',
          }}
        >
          Ce que la communauté pèse, en chiffres simples.
        </motion.h2>

        <ul className="mt-[clamp(3rem,6vh,5rem)] grid gap-[clamp(2rem,4vw,3rem)] sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} visible={visible} animate={animate} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function StatCard({
  stat,
  index,
  visible,
  animate,
}: {
  stat: Stat;
  index: number;
  visible: boolean;
  animate: boolean;
}) {
  const value = useCountUp(stat.value, visible, animate);

  return (
    <motion.li
      initial={animate ? { opacity: 0, y: 18 } : false}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.7, delay: 0.2 + index * 0.08, ease: EASE_OUT }}
      className="flex flex-col gap-3"
      style={{
        borderTop: '1px solid rgba(245,241,232,0.16)',
        paddingTop: 'clamp(1.25rem, 2vh, 1.75rem)',
      }}
    >
      <span
        style={{
          fontFamily: FONT_SERIF,
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 'clamp(2.75rem, 5.5vw, 4.5rem)',
          lineHeight: 1,
          letterSpacing: '-0.025em',
          color: CREAM,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value.toLocaleString('fr-FR')}
        {stat.suffix ? (
          <span style={{ fontStyle: 'normal', fontFamily: FONT_BODY, fontSize: '0.45em', fontWeight: 500, marginLeft: '0.15em', letterSpacing: '0.04em' }}>
            {stat.suffix}
          </span>
        ) : null}
      </span>
      <span
        className="uppercase"
        style={{
          fontFamily: FONT_BODY,
          fontSize: 'clamp(0.72rem, 0.82vw, 0.85rem)',
          letterSpacing: '0.22em',
          color: 'rgba(245,241,232,0.65)',
        }}
      >
        {stat.label}
      </span>
    </motion.li>
  );
}

/**
 * Hook count-up minimaliste, requestAnimationFrame, pas de lib externe.
 * Si reduced motion, retourne directement la valeur finale.
 */
function useCountUp(target: number, start: boolean, animate: boolean) {
  const [value, setValue] = useState(animate ? 0 : target);

  useEffect(() => {
    if (!start) return;
    if (!animate) {
      setValue(target);
      return;
    }
    const duration = 1400;
    const startedAt = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - startedAt;
      const progress = Math.min(1, elapsed / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, animate, target]);

  return value;
}

/* ═══════════════════════════════════════════════════════════════════
 *  3. TESTIMONIALS — cream, 3 cards
 * ═══════════════════════════════════════════════════════════════════ */
type Testimonial = {
  name: string;
  role: string;
  quote: string;
  initials: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Camille R.',
    role: 'Collectionneuse · Lyon',
    initials: 'CR',
    quote:
      "J'ai accroché la pièce dans le couloir. Tous les matins, elle me rappelle pourquoi je suis passée du côté qui peint plutôt que du côté qui regarde.",
  },
  {
    name: 'Léon Maréchal',
    role: 'Journaliste · Beaux-Arts Magazine',
    initials: 'LM',
    quote:
      "Ce qui distingue Nacks, c'est la fidélité au geste premier. Le cadre n'a rien aseptisé. La rue est encore dedans, lisible au premier coup d'œil.",
  },
  {
    name: 'Yasmine D.',
    role: "Artiste · Atelier Belleville",
    initials: 'YD',
    quote:
      "On se croise au détour d'un mur. Lui sait pourquoi il peint, et il le rend visible. Cette communauté ne donne pas de leçons, elle invite à faire pareil.",
  },
];

function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' });
  const prefersReduced = useReducedMotion() ?? false;
  const visible = inView || prefersReduced;
  const animate = !prefersReduced;

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: CREAM,
        color: INK,
        paddingBlock: 'clamp(5rem, 10vh, 9rem)',
      }}
    >
      <div
        className="mx-auto"
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
          Ce qu&rsquo;ils en disent
        </motion.p>

        <motion.h2
          initial={animate ? { opacity: 0, y: 18 } : false}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.85, delay: 0.1, ease: EASE_OUT }}
          className="mt-6"
          style={{
            fontFamily: FONT_SERIF,
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(2rem, 4vw, 3.25rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: INK,
            margin: 0,
            maxWidth: '22ch',
          }}
        >
          Trois voix parmi celles qui suivent le mur.
        </motion.h2>

        <ul className="mt-[clamp(3rem,6vh,5rem)] grid gap-[clamp(1.5rem,3vw,2.5rem)] md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i} visible={visible} animate={animate} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  index,
  visible,
  animate,
}: {
  testimonial: Testimonial;
  index: number;
  visible: boolean;
  animate: boolean;
}) {
  return (
    <motion.li
      initial={animate ? { opacity: 0, y: 22 } : false}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
      transition={{ duration: 0.7, delay: 0.2 + index * 0.1, ease: EASE_OUT }}
      className="flex flex-col gap-6"
      style={{
        backgroundColor: 'rgba(10,10,10,0.03)',
        border: '1px solid rgba(10,10,10,0.08)',
        borderRadius: '4px',
        padding: 'clamp(1.5rem, 2.5vw, 2.25rem)',
      }}
    >
      <svg
        aria-hidden
        width="28"
        height="22"
        viewBox="0 0 28 22"
        fill="none"
        style={{ color: SPRAY }}
      >
        <path
          d="M0 22V13.5C0 6.04 4.39 0.84 11.55 0L12 4.32C8.91 4.94 6.78 7.4 6.6 11.16H11.55V22H0ZM16.45 22V13.5C16.45 6.04 20.84 0.84 28 0L28.45 4.32C25.36 4.94 23.23 7.4 23.05 11.16H28V22H16.45Z"
          fill="currentColor"
        />
      </svg>

      <p
        style={{
          fontFamily: FONT_SERIF,
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 'clamp(1.05rem, 1.25vw, 1.25rem)',
          lineHeight: 1.5,
          color: INK,
          margin: 0,
          textWrap: 'pretty',
        }}
      >
        &laquo;&nbsp;{testimonial.quote}&nbsp;&raquo;
      </p>

      <div className="mt-auto flex items-center gap-3">
        <Avatar initials={testimonial.initials} />
        <div className="flex flex-col">
          <span
            style={{
              fontFamily: FONT_BODY,
              fontSize: 'clamp(0.85rem, 0.95vw, 0.95rem)',
              fontWeight: 500,
              color: INK,
            }}
          >
            {testimonial.name}
          </span>
          <span
            className="uppercase"
            style={{
              fontFamily: FONT_BODY,
              fontSize: 'clamp(0.65rem, 0.72vw, 0.72rem)',
              letterSpacing: '0.18em',
              color: 'rgba(10,10,10,0.55)',
            }}
          >
            {testimonial.role}
          </span>
        </div>
      </div>
    </motion.li>
  );
}

function Avatar({ initials }: { initials: string }) {
  return (
    <span
      aria-hidden
      className="inline-flex shrink-0 items-center justify-center"
      style={{
        width: '2.5rem',
        height: '2.5rem',
        borderRadius: '999px',
        border: '1px solid rgba(10,10,10,0.16)',
        backgroundColor: 'transparent',
        fontFamily: FONT_BODY,
        fontSize: '0.7rem',
        fontWeight: 600,
        letterSpacing: '0.12em',
        color: INK,
      }}
    >
      {initials}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════
 *  4. JOIN — cream, CTAs primaire + secondaire
 * ═══════════════════════════════════════════════════════════════════ */
function Join() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' });
  const prefersReduced = useReducedMotion() ?? false;
  const visible = inView || prefersReduced;
  const animate = !prefersReduced;

  return (
    <section
      ref={ref}
      id="rejoindre"
      style={{
        backgroundColor: CREAM,
        color: INK,
        paddingBlock: 'clamp(5rem, 10vh, 9rem)',
        borderTop: '1px solid rgba(10,10,10,0.08)',
      }}
    >
      <div
        className="mx-auto flex flex-col items-start gap-[clamp(2rem,4vh,3rem)]"
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
          Rejoindre
        </motion.p>

        <motion.h2
          initial={animate ? { opacity: 0, y: 18 } : false}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.85, delay: 0.1, ease: EASE_OUT }}
          style={{
            fontFamily: FONT_SERIF,
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(2.25rem, 5vw, 4rem)',
            lineHeight: 1,
            letterSpacing: '-0.025em',
            color: INK,
            margin: 0,
            maxWidth: '20ch',
          }}
        >
          Un point d&rsquo;entrée, deux portes.
        </motion.h2>

        <motion.p
          initial={animate ? { opacity: 0, y: 12 } : false}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT }}
          style={{
            fontFamily: FONT_BODY,
            fontSize: 'clamp(1rem, 1.05vw, 1.1rem)',
            lineHeight: 1.6,
            color: 'rgba(10,10,10,0.7)',
            margin: 0,
            maxWidth: '52ch',
          }}
        >
          La newsletter mensuelle pour suivre l&rsquo;atelier au calme,
          l&rsquo;Instagram pour voir les pièces en train de se faire. Aucune
          obligation, désinscription en un clic.
        </motion.p>

        <motion.div
          initial={animate ? { opacity: 0, y: 12 } : false}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT }}
          className="flex flex-wrap items-center gap-[clamp(0.75rem,1.5vw,1.25rem)]"
        >
          <Link
            href="/#scene-newsletter"
            data-cursor="link"
            data-cursor-label="Rejoindre"
            className="group relative inline-flex items-center transition-transform hover:-translate-y-px"
            style={{
              fontFamily: FONT_SERIF,
              fontStyle: 'italic',
              fontSize: 'clamp(0.95rem, 1.05vw, 1.1rem)',
              color: CREAM,
              backgroundColor: INK,
              padding: 'clamp(0.95rem, 1.6vh, 1.15rem) clamp(1.6rem, 2.4vw, 2rem)',
              borderRadius: '999px',
            }}
          >
            <span>Newsletter mensuelle&nbsp;→</span>
          </Link>

          <a
            href="https://instagram.com/nacks"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="inline-flex items-center transition-colors hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)]"
            style={{
              fontFamily: FONT_SERIF,
              fontStyle: 'italic',
              fontSize: 'clamp(0.95rem, 1.05vw, 1.1rem)',
              color: INK,
              backgroundColor: 'transparent',
              padding: 'clamp(0.95rem, 1.6vh, 1.15rem) clamp(1.6rem, 2.4vw, 2rem)',
              borderRadius: '999px',
              boxShadow: 'inset 0 0 0 1.5px rgba(10,10,10,0.85)',
            }}
          >
            Suivre sur Instagram&nbsp;→
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
 *  Social footer — strip ink minimal, mono cream/60
 * ═══════════════════════════════════════════════════════════════════ */
const SOCIALS: { label: string; href: string; handle: string }[] = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/nacks',
    handle: '@nacks',
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com/@nacks',
    handle: '@nacks',
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@nacks',
    handle: '/@nacks',
  },
];

function SocialFooter() {
  return (
    <section
      style={{
        backgroundColor: INK,
        color: CREAM,
        paddingBlock: 'clamp(3rem, 6vh, 5rem)',
      }}
    >
      <div
        className="mx-auto flex flex-wrap items-center justify-between gap-6"
        style={{
          maxWidth: 'var(--container-wide, 1200px)',
          paddingInline: 'clamp(1.5rem, 4vw, 5rem)',
        }}
      >
        <p
          className="uppercase"
          style={{
            fontFamily: FONT_MONO,
            fontSize: 'clamp(0.7rem, 0.78vw, 0.78rem)',
            letterSpacing: '0.18em',
            color: 'rgba(245,241,232,0.6)',
            margin: 0,
          }}
        >
          Présent ailleurs
        </p>
        <ul className="flex flex-wrap items-center gap-6">
          {SOCIALS.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="inline-flex items-center gap-2 transition-colors hover:text-[var(--color-cream)]"
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 'clamp(0.7rem, 0.78vw, 0.78rem)',
                  letterSpacing: '0.04em',
                  color: 'rgba(245,241,232,0.6)',
                }}
              >
                <span className="uppercase tracking-[0.18em]">{social.label}</span>
                <span aria-hidden style={{ opacity: 0.4 }}>·</span>
                <span>{social.handle}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
