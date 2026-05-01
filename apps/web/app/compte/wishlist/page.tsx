'use client';

import Link from 'next/link';
import { useMemo, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Container } from '@nacks/ui';
import { PageShell } from '@/components/layouts/PageShell';
import { ArtPoster } from '@/components/art/ArtPoster';
import { DripButton } from '@/components/ui/DripButton';
import { useWishlist } from '@/lib/hooks/useWishlist';
import { artworks, formatPrice, type Artwork } from '@/lib/content/artworks';

/**
 * /compte/wishlist — Liste des œuvres "coup de cœur" sauvegardées localement.
 *
 * Sprint 1 : pas d'auth, pas de sync serveur. Wishlist persistée localStorage
 * via useWishlist(). DA cream premium (refonte 2028) — alternance cream/ink,
 * Playfair italic XXL, Inter body, soft shadows, photo-first.
 *
 * Pattern visual : ArtworkCard inspirée de NacksShow (image 4/5, titre serif italic,
 * prix Inter tabular-nums). Bouton "Retirer" (X) discret apparaît au hover de la card.
 *
 * Animations : Motion whileInView fade-up + stagger ; prefers-reduced-motion
 * désactive l'animation d'entrée. Hydratation = skeleton 4 cards plutôt que
 * texte "chargement".
 */

const INK = 'var(--color-ink, #0a0a0a)';
const CREAM = 'var(--color-cream, #f5f1e8)';
const PAPER = '#fafafa';
const BLOOD = 'var(--color-blood, #e63946)';

const FONT_SERIF = "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = "var(--font-body, Inter, system-ui, sans-serif)";

export default function WishlistPage() {
  const { slugs, count, hydrated, clear, toggle } = useWishlist();

  // Filtre stable : on garde l'ordre du catalogue (cohérent entre re-renders).
  const items = useMemo<Artwork[]>(
    () => artworks.filter((a) => slugs.includes(a.slug)),
    [slugs],
  );

  const isEmpty = hydrated && items.length === 0;

  return (
    <PageShell>
      <section
        aria-label="Wishlist"
        className="relative"
        style={{
          backgroundColor: CREAM,
          color: INK,
          paddingBlock: 'clamp(5rem, 10vh, 9rem)',
        }}
      >
        <Container size="full">
          {/* ─── Header ─── */}
          <header className="grid gap-[clamp(1.5rem,3vh,2.25rem)] md:grid-cols-[1fr_auto] md:items-end">
            <div className="flex flex-col gap-[clamp(1rem,2vh,1.5rem)]">
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: '0.72rem',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: 'rgba(10,10,10,0.55)',
                  margin: 0,
                }}
              >
                Compte / Wishlist
              </p>

              <h1
                style={{
                  fontFamily: FONT_SERIF,
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 'clamp(3rem, 8vw, 6.5rem)',
                  lineHeight: 0.96,
                  letterSpacing: '-0.025em',
                  color: INK,
                  margin: 0,
                }}
              >
                Vos coups de c&oelig;ur.
              </h1>

              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 'clamp(1rem, 1.1vw, 1.15rem)',
                  lineHeight: 1.55,
                  color: 'rgba(10,10,10,0.7)',
                  maxWidth: '52ch',
                  margin: 0,
                }}
              >
                Stock&eacute;e localement dans ton navigateur &mdash; pas de serveur,
                pas de compte. Vide si tu changes d&apos;appareil.
              </p>
            </div>

            {/* Right rail : count + clear */}
            <div className="flex flex-col items-start gap-3 md:items-end">
              <span
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: '0.78rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(10,10,10,0.5)',
                  fontVariantNumeric: 'tabular-nums',
                }}
                aria-live="polite"
              >
                {hydrated
                  ? `${count} œuvre${count > 1 ? 's' : ''}`
                  : '—'}
              </span>

              {hydrated && count > 0 && (
                <button
                  type="button"
                  onClick={clear}
                  data-cursor="link"
                  data-cursor-label="Vider"
                  data-no-ripple=""
                  className="wl-clear-btn group inline-flex items-center gap-2 whitespace-nowrap"
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: '0.82rem',
                    letterSpacing: '0.04em',
                    color: INK,
                    border: '1px solid rgba(10,10,10,0.35)',
                    borderRadius: '999px',
                    padding: '0.55rem 1.15rem',
                    background: 'transparent',
                    cursor: 'pointer',
                    transition:
                      'background-color 280ms ease, color 280ms ease, border-color 280ms ease',
                  }}
                >
                  Vider la wishlist
                </button>
              )}
            </div>
          </header>

          {/* ─── États ─── */}
          <div className="mt-[clamp(3rem,6vh,4.5rem)]">
            {!hydrated ? (
              <SkeletonGrid />
            ) : isEmpty ? (
              <EmptyState />
            ) : (
              <ItemsGrid items={items} onRemove={toggle} />
            )}
          </div>
        </Container>

        {/* Hover state du bouton clear (scoped) */}
        <style>{`
          .wl-clear-btn:hover {
            background-color: ${INK};
            color: ${CREAM};
            border-color: ${INK};
          }
        `}</style>
      </section>
    </PageShell>
  );
}

/* ============================================================
 *  Skeleton — pendant l'hydratation localStorage
 * ============================================================ */
function SkeletonGrid() {
  return (
    <div
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      style={{ gap: 'clamp(1rem, 2.5vw, 2rem)' }}
      aria-busy="true"
      aria-label="Chargement de la wishlist"
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex flex-col">
          <div
            className="wl-skel relative overflow-hidden"
            style={{
              aspectRatio: '4 / 5',
              backgroundColor: PAPER,
              border: '1px solid rgba(10,10,10,0.06)',
            }}
          />
          <div
            className="wl-skel mt-4"
            style={{
              height: '0.95rem',
              width: '70%',
              backgroundColor: 'rgba(10,10,10,0.06)',
            }}
          />
          <div
            className="wl-skel mt-2"
            style={{
              height: '0.7rem',
              width: '40%',
              backgroundColor: 'rgba(10,10,10,0.05)',
            }}
          />
        </div>
      ))}
      <style>{`
        .wl-skel {
          position: relative;
        }
        .wl-skel::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,255,255,0.45) 50%,
            transparent 100%
          );
          transform: translateX(-100%);
          animation: wl-shimmer 1.6s ease-in-out infinite;
        }
        @keyframes wl-shimmer {
          to { transform: translateX(100%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .wl-skel::after { animation: none; opacity: 0.4; transform: none; }
        }
      `}</style>
    </div>
  );
}

/* ============================================================
 *  Empty state — invitation cream
 * ============================================================ */
function EmptyState() {
  return (
    <section
      role="status"
      className="mx-auto flex max-w-[640px] flex-col items-center gap-6 text-center"
      style={{
        backgroundColor: PAPER,
        border: '1px solid rgba(10,10,10,0.08)',
        padding: 'clamp(2.5rem, 6vh, 4rem) clamp(1.5rem, 4vw, 3rem)',
        borderRadius: '2px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
      }}
    >
      <svg
        aria-hidden="true"
        width="56"
        height="56"
        viewBox="0 0 24 24"
        fill="none"
        stroke={INK}
        strokeOpacity="0.35"
        strokeWidth="1"
        style={{ flexShrink: 0 }}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>

      <div className="flex flex-col gap-3">
        <h2
          style={{
            fontFamily: FONT_SERIF,
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.015em',
            color: INK,
            margin: 0,
          }}
        >
          Aucune &oelig;uvre encore.
        </h2>
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 'clamp(0.95rem, 1vw, 1.05rem)',
            lineHeight: 1.6,
            color: 'rgba(10,10,10,0.65)',
            margin: 0,
          }}
        >
          Cliquez sur le c&oelig;ur pr&egrave;s d&apos;une &oelig;uvre pour la
          garder ici.
        </p>
      </div>

      <div style={{ marginTop: 'clamp(0.5rem, 1vh, 0.75rem)' }}>
        <DripButton href="/oeuvres" variant="primary" glow="pink" size="md">
          Voir les œuvres
        </DripButton>
      </div>
    </section>
  );
}

/* ============================================================
 *  Items grid — animations stagger + hover remove
 * ============================================================ */
function ItemsGrid({
  items,
  onRemove,
}: {
  items: Artwork[];
  onRemove: (slug: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      style={{ gap: 'clamp(1rem, 2.5vw, 2rem)' }}
    >
      {items.map((art, i) => (
        <motion.div
          key={art.slug}
          initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={
            reduced || inView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 20 }
          }
          transition={{
            duration: 0.6,
            delay: reduced ? 0 : i * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <WishlistArtworkCard art={art} onRemove={onRemove} />
        </motion.div>
      ))}
    </div>
  );
}

/* ============================================================
 *  WishlistArtworkCard — pattern NacksShow + bouton retirer
 * ============================================================ */
function WishlistArtworkCard({
  art,
  onRemove,
}: {
  art: Artwork;
  onRemove: (slug: string) => void;
}) {
  const isSoldOut = art.status === 'sold_out';
  const isComing = art.status === 'coming';
  const priceLabel = formatPrice(art.priceCents);

  const seriesLabel = (() => {
    if (art.edition) return `Édition de ${art.edition.size}`;
    if (art.type === 'original') return 'Pièce unique';
    if (art.type === 'poster') return 'Open edition';
    if (art.type === 'figurine') return 'Édition limitée';
    return art.subtitle;
  })();

  return (
    <div className="wl-card group relative">
      <Link
        href={`/oeuvres/${art.slug}`}
        data-cursor="link"
        data-cursor-label="Voir"
        className="block"
        aria-label={`${art.title} — ${priceLabel}`}
        style={{ color: INK, textDecoration: 'none' }}
      >
        {/* ── Image ── */}
        <div
          className="wl-card-media relative overflow-hidden"
          style={{
            aspectRatio: '4 / 5',
            backgroundColor: PAPER,
            border: '1px solid rgba(10,10,10,0.08)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            transition:
              'box-shadow 480ms cubic-bezier(0.22,1,0.36,1), transform 480ms cubic-bezier(0.22,1,0.36,1)',
            willChange: 'transform, box-shadow',
          }}
        >
          <div className="wl-card-img absolute inset-0">
            <ArtPoster
              variant={art.posterVariant}
              label={art.title}
              className="absolute inset-0"
            />
          </div>

          {/* Status badge */}
          {(isSoldOut || isComing) && (
            <div
              className="absolute z-10"
              style={{
                top: '0.75rem',
                left: '0.75rem',
                padding: '0.32rem 0.6rem',
                fontFamily: FONT_BODY,
                fontSize: '0.62rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: isSoldOut ? 'rgba(10,10,10,0.7)' : PAPER,
                backgroundColor: isSoldOut
                  ? 'rgba(250,250,250,0.92)'
                  : 'rgba(10,10,10,0.85)',
                border: isSoldOut ? '1px solid rgba(10,10,10,0.12)' : 'none',
                backdropFilter: 'blur(4px)',
              }}
            >
              {isSoldOut ? 'Vendue' : 'À venir'}
            </div>
          )}
        </div>

        {/* ── Info ── */}
        <div
          className="flex items-start justify-between gap-3"
          style={{ marginTop: 'clamp(0.85rem, 1.4vh, 1.1rem)' }}
        >
          <div className="min-w-0 flex-1">
            <h3
              style={{
                fontFamily: FONT_SERIF,
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(1rem, 1.15vw, 1.2rem)',
                lineHeight: 1.25,
                color: INK,
                margin: 0,
              }}
            >
              {art.title}
            </h3>
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: '0.78rem',
                lineHeight: 1.4,
                color: 'rgba(10,10,10,0.55)',
                marginTop: '0.25rem',
                letterSpacing: '0.01em',
              }}
            >
              {seriesLabel}
            </p>
          </div>
          <span
            style={{
              fontFamily: FONT_BODY,
              fontSize: 'clamp(0.9rem, 1vw, 1rem)',
              color: INK,
              whiteSpace: 'nowrap',
              fontVariantNumeric: 'tabular-nums',
              paddingTop: '0.15rem',
            }}
          >
            {priceLabel}
          </span>
        </div>
      </Link>

      {/* ── Bouton retirer (X), top-right, hover only ── */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onRemove(art.slug);
        }}
        aria-label={`Retirer ${art.title} de la wishlist`}
        data-cursor="link"
        data-cursor-label="Retirer"
        data-no-ripple=""
        className="wl-card-remove absolute"
        style={{
          top: '0.75rem',
          right: '0.75rem',
          width: '2rem',
          height: '2rem',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '999px',
          backgroundColor: PAPER,
          border: '1px solid rgba(10,10,10,0.12)',
          color: INK,
          cursor: 'pointer',
          opacity: 0,
          transform: 'translateY(-4px)',
          transition:
            'opacity 240ms ease, transform 240ms ease, background-color 200ms ease, color 200ms ease, border-color 200ms ease',
          backdropFilter: 'blur(4px)',
          zIndex: 20,
        }}
      >
        <svg
          aria-hidden="true"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          <path d="M2 2 L10 10 M10 2 L2 10" />
        </svg>
      </button>

      <style>{`
        .wl-card-img {
          transition: transform 720ms cubic-bezier(0.22,1,0.36,1);
          will-change: transform;
        }
        .wl-card:hover .wl-card-media {
          box-shadow: 0 18px 38px -16px rgba(10,10,10,0.22), 0 2px 6px rgba(10,10,10,0.06);
          transform: translateY(-2px);
        }
        .wl-card:hover .wl-card-img {
          transform: scale(1.018);
        }
        .wl-card:hover .wl-card-remove,
        .wl-card-remove:focus-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .wl-card-remove:hover {
          background-color: ${INK};
          color: ${CREAM};
          border-color: ${INK};
        }
        .wl-card-remove:focus-visible {
          outline: 2px solid ${BLOOD};
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          .wl-card:hover .wl-card-img,
          .wl-card:hover .wl-card-media { transform: none; }
        }
        @media (hover: none) {
          .wl-card-remove { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
}
