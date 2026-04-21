import Link from 'next/link';
import type { Drop } from '@/lib/content/drops';
import { formatPrice } from '@/lib/content/artworks';
import { ArtPoster } from '@/components/art/ArtPoster';

export function DropCard({ drop }: { drop: Drop }) {
  const isLive = drop.status === 'live';
  const isPast = drop.status === 'past' || drop.status === 'sold_out';
  const remaining = drop.editionSize - drop.sold;

  return (
    <Link
      href={`/drops/${drop.slug}`}
      className="group relative block overflow-hidden rounded-sm"
      data-cursor="image"
      data-cursor-label="Voir"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-ink)]">
        <div className="absolute inset-0 transition-transform duration-[var(--duration-slow)] ease-[var(--ease-nacks)] group-hover:scale-[1.04]">
          <ArtPoster variant={drop.posterVariant} label={drop.title} />
        </div>

        {/* Status tag */}
        <div className="absolute left-4 top-4">
          {isLive && (
            <span className="flex items-center gap-2 rounded-full bg-[var(--color-blood)] px-4 py-1.5 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.25em] text-[var(--color-cream)]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-cream)]" />
              En direct
            </span>
          )}
          {drop.status === 'upcoming' && (
            <span className="rounded-full bg-[var(--color-cream)] px-4 py-1.5 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.25em] text-[var(--color-ink)]">
              À venir
            </span>
          )}
          {isPast && (
            <span className="rounded-full bg-[var(--color-ink)]/80 px-4 py-1.5 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.25em] text-[var(--color-cream-600)] backdrop-blur">
              Archivé
            </span>
          )}
        </div>

        {/* Overlay info */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/80 to-transparent p-6 pt-20">
          <h3 className="font-[var(--font-display)] text-2xl font-[500] tracking-[-0.02em] text-[var(--color-cream)] md:text-3xl">
            {drop.title}
          </h3>
          <div className="mt-3 flex items-center justify-between font-[var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--color-cream-600)]">
            <span>{formatPrice(drop.priceCents)}</span>
            <span>
              {isPast ? 'Sold out' : `${remaining}/${drop.editionSize} restants`}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
