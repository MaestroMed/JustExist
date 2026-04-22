import Link from 'next/link';
import { Container } from '@nacks/ui';
import { ArtPoster } from '@/components/art/ArtPoster';
import { Countdown } from '@/components/drops/Countdown';
import { MagneticButton } from '@/components/polish/MagneticButton';
import { ScrollCountUp } from '@/components/polish/ScrollCountUp';
import { getLiveDrop, getUpcomingDrop } from '@/lib/content/drops';
import { formatPrice } from '@/lib/content/artworks';

/**
 * SCÈNE 3 — Le Drop en cours.
 * Bifurque : live → countdown + achat ; upcoming → teaser + waitlist.
 */
export function DropLive() {
  const live = getLiveDrop();
  const upcoming = getUpcomingDrop();
  const drop = live ?? upcoming;
  if (!drop) return null;

  const isLive = drop.status === 'live';
  const remaining = drop.editionSize - drop.sold;
  const percent = (drop.sold / drop.editionSize) * 100;

  return (
    <section className="relative overflow-hidden bg-[var(--color-ink)] py-[var(--spacing-section)] text-[var(--color-cream)]">
      <Container size="full">
        <div className="flex flex-col items-center gap-4 pb-16 text-center">
          <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-blood)]">
            {isLive ? '● Drop en direct' : 'Prochain drop'}
          </span>
          <h2
            className="font-[var(--font-display)] font-[500] leading-[0.95] tracking-[-0.03em] text-balance"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            {drop.title}
          </h2>
          <p className="max-w-xl font-[var(--font-body)] text-sm text-[var(--color-cream-600)] md:text-base">
            {drop.subtitle}
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Cover */}
          <div className="relative mx-auto w-full max-w-[520px] overflow-hidden rounded-sm shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)]">
            <ArtPoster variant={drop.posterVariant} label={drop.title} />
            {/* Edition badge */}
            <div className="absolute left-4 top-4 rounded-full bg-[var(--color-ink)]/80 px-4 py-1.5 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-cream)] backdrop-blur">
              édition {drop.editionSize}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-10">
            {isLive ? (
              <Countdown target={drop.closesAt ?? new Date(Date.now() + 48 * 3600 * 1000)} label="Fin du drop" />
            ) : (
              <Countdown target={drop.opensAt} label="Ouverture dans" />
            )}

            <div className="flex flex-col gap-3">
              <div className="flex items-baseline justify-between font-[var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--color-cream-600)]">
                <span>{drop.sold} / {drop.editionSize} vendus</span>
                <span>{remaining} restants</span>
              </div>
              <div className="h-[2px] overflow-hidden rounded-full bg-[var(--color-cream-100)]">
                <div
                  className="h-full bg-[var(--color-blood)] transition-[width] duration-[var(--duration-slow)]"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>

            <div className="flex items-baseline justify-between gap-4 border-y border-[var(--color-cream-100)] py-6">
              <span className="font-[var(--font-display)] text-sm uppercase tracking-[0.2em] text-[var(--color-cream-600)]">
                Prix
              </span>
              <ScrollCountUp
                target={drop.priceCents / 100}
                suffix=" €"
                decimals={0}
                className="font-[var(--font-mono)] text-3xl font-[500] tabular-nums text-[var(--color-cream)] md:text-4xl"
              />
            </div>

            <MagneticButton strength={0.35} radius={70} className="self-start">
              <Link
                href={`/drops/${drop.slug}`}
                className="group inline-flex items-center justify-between border border-[var(--color-cream)] bg-[var(--color-cream)] px-8 py-5 font-[var(--font-display)] text-sm font-[500] uppercase tracking-[0.2em] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-blood)] hover:text-[var(--color-cream)]"
                data-cursor="buy"
                data-cursor-label={isLive ? 'Entrer' : 'Voir'}
              >
                <span>{isLive ? 'Entrer dans le drop' : 'Rejoindre la liste'}</span>
                <span className="ml-4 translate-x-0 transition-transform duration-[var(--duration-base)] group-hover:translate-x-2">
                  →
                </span>
              </Link>
            </MagneticButton>

            {isLive && (
              <p className="font-[var(--font-body)] text-xs text-[var(--color-cream-400)]">
                1 exemplaire maximum par personne. Édition numérotée, signée au Posca, livrée sous 7 jours ouvrés.
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
