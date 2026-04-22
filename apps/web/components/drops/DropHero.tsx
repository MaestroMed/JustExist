'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArtPoster } from '@/components/art/ArtPoster';

type Props = {
  title: string;
  variant:
    | 'poppy-neon'
    | 'poppy-classic'
    | 'gorille-gold'
    | 'fox-paris'
    | 'lion-eiffel'
    | 'figurine-mr-poppy';
};

/**
 * Hero de page drop — parallax scroll-scrubbed.
 * L'image zoom out + assombrit au scroll, le titre flotte par-dessus.
 */
export function DropHero({ title, variant }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const yImg = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.7, 0.2]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] w-full overflow-hidden bg-[var(--color-ink)]"
      aria-label={title}
    >
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ scale, y: yImg, opacity }}
      >
        <ArtPoster variant={variant} label={title} />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-ink)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-transparent to-[var(--color-ink)]/30" />
    </section>
  );
}
