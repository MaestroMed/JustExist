'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Container } from '@nacks/ui';
import { ArtPoster } from '@/components/art/ArtPoster';

const PORTES = [
  {
    key: 'originaux',
    label: 'Œuvres uniques',
    phrase: "Peintures à l'acrylique, Posca, aérosol. Une par client. Jamais réimprimée.",
    href: '/oeuvres?type=original',
    poster: 'gorille-gold' as const,
    accent: '#D4A056',
  },
  {
    key: 'editions',
    label: 'Éditions limitées',
    phrase: 'Reprographies et sérigraphies signées, numérotées. La rareté à prix accessible.',
    href: '/oeuvres?type=serigraphie',
    poster: 'poppy-neon' as const,
    accent: '#1E40AF',
  },
  {
    key: 'figurines',
    label: 'Figurines Mr Poppy',
    phrase: 'Sculptures en résine, éditions courtes. La mascotte en chair et os.',
    href: '/oeuvres?type=figurine',
    poster: 'figurine-mr-poppy' as const,
    accent: '#FFD43B',
  },
] as const;

/**
 * SCÈNE 4 — Les Trois Portes.
 * Trois blocs massifs avec hover 3D tilt (parallax perspective).
 * Chaque porte mène à une collection filtrée.
 */
export function ThreePortes() {
  return (
    <section className="relative bg-[var(--color-cream)] py-[var(--spacing-section)] text-[var(--color-ink)]">
      <Container size="full">
        <div className="flex flex-col items-start gap-6 pb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-ink-600)]">
              Trois portes
            </p>
            <h2
              className="mt-4 font-[var(--font-display)] font-[500] leading-[0.92] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
            >
              Par où tu entres.
            </h2>
          </div>
          <p className="max-w-md font-[var(--font-body)] text-sm text-[var(--color-ink-600)] md:text-base">
            Il y a trois façons de vivre avec mon travail. L'unique, la rare, ou la tangible. À toi de choisir par où tu commences.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {PORTES.map(({ key, ...porte }) => (
            <Porte key={key} {...porte} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function Porte({ label, phrase, href, poster, accent }: {
  label: string; phrase: string; href: string; poster: 'gorille-gold' | 'poppy-neon' | 'figurine-mr-poppy'; accent: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 });

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative block overflow-hidden rounded-sm"
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1200 }}
      data-cursor="image"
      data-cursor-label="Entrer"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-ink)]">
        <motion.div
          className="absolute inset-0"
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
          <ArtPoster variant={poster} label={label} />
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/70 to-transparent p-6 pt-16">
          <div className="flex items-baseline justify-between gap-4 text-[var(--color-cream)]">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: accent }}
              aria-hidden="true"
            />
            <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.3em] text-[var(--color-cream-600)]">
              Entrer →
            </span>
          </div>
          <h3
            className="mt-3 font-[var(--font-display)] font-[500] leading-[1.05] tracking-[-0.02em] text-[var(--color-cream)]"
            style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}
          >
            {label}
          </h3>
          <p className="mt-2 font-[var(--font-body)] text-sm leading-[1.5] text-[var(--color-cream-600)]">
            {phrase}
          </p>
        </div>
      </div>
    </motion.a>
  );
}
