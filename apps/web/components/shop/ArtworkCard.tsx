'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react';
import type { Artwork } from '@/lib/content/artworks';
import { formatPrice } from '@/lib/content/artworks';
import { ArtPoster } from '@/components/art/ArtPoster';

export function ArtworkCard({ artwork, priority = false }: { artwork: Artwork; priority?: boolean }) {
  const { slug, title, type, priceCents, edition, status, posterVariant } = artwork;
  const soldOut = status === 'sold_out';
  const coming = status === 'coming';

  const ref = useRef<HTMLAnchorElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 200,
    damping: 22,
  });

  const glossX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
  const glossY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);
  const glossBg = useMotionTemplate`radial-gradient(circle at ${glossX}% ${glossY}%, rgba(245,241,232,0.25), transparent 45%)`;

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
      style={{ perspective: 1000 }}
    >
      <Link
        ref={ref}
        href={`/oeuvres/${slug}`}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative block"
        data-cursor="image"
        data-cursor-label={soldOut ? 'Épuisé' : 'Voir'}
      >
        <motion.div
          className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-ink)] [transform-style:preserve-3d]"
          style={{ rotateX, rotateY }}
        >
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: priority ? 1.05 : 1.07 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <ArtPoster variant={posterVariant} label={title} />
          </motion.div>

          {/* Glossy overlay qui suit le curseur */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: glossBg }}
          />

          {/* Bord lumineux */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              boxShadow:
                'inset 0 0 0 1px rgba(245,241,232,0.2), inset 0 0 80px rgba(230,57,70,0.1)',
            }}
          />

          {/* Badges overlay */}
          <div className="absolute left-3 top-3 flex flex-col gap-2" style={{ transform: 'translateZ(40px)' }}>
            {coming && (
              <span className="rounded-full bg-[var(--color-cream)] px-3 py-1 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink)]">
                Bientôt
              </span>
            )}
            {soldOut && (
              <span className="rounded-full bg-[var(--color-blood)] px-3 py-1 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-cream)]">
                Épuisé
              </span>
            )}
            {edition && !soldOut && !coming && (
              <span className="rounded-full bg-[var(--color-ink)]/80 px-3 py-1 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-cream)] backdrop-blur">
                {edition.remaining}/{edition.size}
              </span>
            )}
          </div>

          {/* Type label */}
          <div className="absolute right-3 top-3" style={{ transform: 'translateZ(40px)' }}>
            <span className="rounded-full bg-[var(--color-ink)]/60 px-3 py-1 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-cream)] backdrop-blur">
              {typeLabel(type)}
            </span>
          </div>

          {/* Flèche entrant par la droite au hover */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ transform: 'translateZ(20px)' }}
          >
            <span className="flex items-center gap-2 rounded-full bg-[var(--color-cream)] px-4 py-2 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.25em] text-[var(--color-ink)]">
              Voir <span>→</span>
            </span>
          </div>
        </motion.div>

        <div className="mt-4 flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-[var(--font-display)] text-lg font-[500] tracking-[-0.02em] text-[var(--color-cream)] transition-colors group-hover:text-[var(--color-blood)]">
              {title}
            </h3>
            <p className="mt-1 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-cream-400)]">
              {artwork.dimensions} · {artwork.year}
            </p>
          </div>
          <div className="text-right">
            {coming ? (
              <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--color-cream-600)]">
                —
              </span>
            ) : (
              <span className="font-[var(--font-mono)] text-base font-[500] tabular-nums text-[var(--color-cream)]">
                {formatPrice(priceCents)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function typeLabel(t: Artwork['type']): string {
  switch (t) {
    case 'original':
      return 'Original';
    case 'giclee':
      return 'Giclée';
    case 'serigraphie':
      return 'Sérigraphie';
    case 'poster':
      return 'Poster';
    case 'figurine':
      return 'Figurine';
    case 'merch':
      return 'Merch';
  }
}
