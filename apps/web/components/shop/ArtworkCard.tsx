'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import type { Artwork } from '@/lib/content/artworks';
import { formatPrice } from '@/lib/content/artworks';
import { ArtPoster } from '@/components/art/ArtPoster';

export function ArtworkCard({ artwork, priority = false }: { artwork: Artwork; priority?: boolean }) {
  const { slug, title, type, priceCents, edition, status, posterVariant } = artwork;
  const soldOut = status === 'sold_out';
  const coming = status === 'coming';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
    >
      <Link
        href={`/oeuvres/${slug}`}
        className="group block"
        data-cursor="image"
        data-cursor-label={soldOut ? 'Épuisé' : 'Voir'}
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-ink)]">
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: priority ? 1.04 : 1.06 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <ArtPoster variant={posterVariant} label={title} />
          </motion.div>

          {/* Badges overlay */}
          <div className="absolute left-3 top-3 flex flex-col gap-2">
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
          <div className="absolute right-3 top-3">
            <span className="rounded-full bg-[var(--color-ink)]/60 px-3 py-1 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-cream)] backdrop-blur">
              {typeLabel(type)}
            </span>
          </div>
        </div>

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
