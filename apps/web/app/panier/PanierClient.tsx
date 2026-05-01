'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArtPoster } from '@/components/art/ArtPoster';
import { DripButton } from '@/components/ui/DripButton';
import { useCart, type CartItem } from '@/lib/hooks/useCart';
import { formatPrice } from '@/lib/content/artworks';

const INK = 'var(--color-ink, #0a0a0a)';
const PAPER = '#fafafa';

const FONT_SERIF = "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = "var(--font-body, Inter, system-ui, sans-serif)";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/**
 * Page panier complète — Hermès / Apple Store premium.
 * Background cream, layout 2 colonnes desktop (items + récap sticky).
 *
 * Hydraté via useCart (localStorage `nacks:cart`).
 * - Pendant hydration : skeleton subtle pulse.
 * - Si vide : card centered avec CTAs (oeuvres + commission).
 * - Si non-vide : liste items animée + récap sticky avec total.
 *
 * prefers-reduced-motion : durées 0 (instant).
 */
export function PanierClient() {
  const { items, subtotal, count, removeItem, updateQty, clear, hydrated } =
    useCart();

  const empty = hydrated && items.length === 0;

  return (
    <section
      style={{
        backgroundColor: 'var(--color-cream, #f5f1e8)',
        minHeight: '60vh',
        paddingBlock: 'clamp(3rem, 6vw, 5rem)',
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          marginInline: 'auto',
          paddingInline: 'clamp(1.25rem, 4vw, 3rem)',
        }}
      >
        {/* Header */}
        <header className="flex flex-col gap-3" style={{ marginBottom: 'clamp(2rem, 4vw, 3.5rem)' }}>
          <span
            style={{
              fontFamily: FONT_BODY,
              fontSize: '0.72rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'rgba(10,10,10,0.55)',
            }}
          >
            Votre panier
          </span>
          <h1
            style={{
              fontFamily: FONT_SERIF,
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(2.5rem, 6vw, 4.75rem)',
              lineHeight: 0.98,
              letterSpacing: '-0.02em',
              color: INK,
              margin: 0,
            }}
          >
            {empty ? 'Aucune œuvre encore.' : 'Votre sélection.'}
          </h1>
          {hydrated && !empty && (
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: '0.95rem',
                color: 'rgba(10,10,10,0.6)',
                margin: 0,
                marginTop: '0.5rem',
              }}
            >
              {count} {count > 1 ? 'œuvres' : 'œuvre'} en attente de validation.
            </p>
          )}
        </header>

        {/* Body */}
        {!hydrated ? (
          <SkeletonGrid />
        ) : empty ? (
          <EmptyState />
        ) : (
          <div
            className="grid gap-12 lg:grid-cols-[1.5fr_1fr]"
            style={{ alignItems: 'start' }}
          >
            <ItemsColumn
              items={items}
              onRemove={removeItem}
              onUpdate={updateQty}
            />
            <RecapColumn
              subtotal={subtotal}
              onClear={clear}
              itemCount={count}
            />
          </div>
        )}
      </div>

      <style>{`
        @keyframes panier-pulse {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 0.85; }
        }
        @media (prefers-reduced-motion: reduce) {
          .panier-skeleton {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// Skeleton (during hydration)
// ============================================================

function SkeletonGrid() {
  return (
    <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]" style={{ alignItems: 'start' }}>
      <div className="flex flex-col">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="panier-skeleton"
            style={{
              display: 'flex',
              gap: '1.5rem',
              paddingBlock: '1.75rem',
              borderBottom: '1px solid rgba(10,10,10,0.08)',
              animation: 'panier-pulse 1.6s ease-in-out infinite',
              animationDelay: `${i * 0.15}s`,
            }}
          >
            <div
              style={{
                flex: '0 0 auto',
                width: 'clamp(96px, 12vw, 128px)',
                aspectRatio: '4 / 5',
                backgroundColor: 'rgba(10,10,10,0.06)',
                borderRadius: 2,
              }}
            />
            <div className="flex flex-1 flex-col gap-3" style={{ paddingBlock: '0.5rem' }}>
              <div style={{ width: '40%', height: 12, backgroundColor: 'rgba(10,10,10,0.06)', borderRadius: 2 }} />
              <div style={{ width: '70%', height: 22, backgroundColor: 'rgba(10,10,10,0.08)', borderRadius: 2 }} />
              <div style={{ width: '30%', height: 14, backgroundColor: 'rgba(10,10,10,0.05)', borderRadius: 2 }} />
            </div>
          </div>
        ))}
      </div>
      <div
        className="panier-skeleton"
        style={{
          backgroundColor: PAPER,
          border: '1px solid rgba(10,10,10,0.08)',
          padding: 'clamp(1.5rem, 2.5vw, 2.25rem)',
          borderRadius: 4,
          minHeight: 280,
          animation: 'panier-pulse 1.6s ease-in-out infinite',
        }}
      />
    </div>
  );
}

// ============================================================
// Empty state
// ============================================================

function EmptyState() {
  return (
    <div
      style={{
        backgroundColor: PAPER,
        border: '1px solid rgba(10,10,10,0.08)',
        borderRadius: 4,
        padding: 'clamp(2.5rem, 5vw, 4.5rem)',
        maxWidth: 720,
        marginInline: 'auto',
        textAlign: 'center',
      }}
    >
      <svg
        aria-hidden
        width="64"
        height="64"
        viewBox="0 0 72 72"
        fill="none"
        style={{ color: 'rgba(10,10,10,0.22)', marginBottom: '1.75rem', display: 'inline-block' }}
      >
        <path d="M16 22h40l-4 36H20L16 22z" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M26 22v-6a10 10 0 0 1 20 0v6" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M22 36h28M22 44h28" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
      </svg>
      <p
        style={{
          fontFamily: FONT_SERIF,
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
          color: INK,
          margin: 0,
          lineHeight: 1.15,
        }}
      >
        Votre panier est vide.
      </p>
      <p
        style={{
          fontFamily: FONT_BODY,
          fontSize: '0.95rem',
          lineHeight: 1.55,
          color: 'rgba(10,10,10,0.6)',
          margin: '0.85rem auto 0',
          maxWidth: '32rem',
        }}
      >
        Commencez par découvrir les œuvres.
      </p>
      <div
        className="flex flex-wrap items-center justify-center"
        style={{ marginTop: '2.25rem', gap: 'clamp(0.7rem,1.3vw,1.2rem)' }}
      >
        <DripButton href="/oeuvres" variant="primary" glow="pink" size="md">
          Voir les œuvres
        </DripButton>
        <DripButton href="/atelier/commission" variant="secondary" size="md">
          Demander un custom
        </DripButton>
      </div>
    </div>
  );
}

// ============================================================
// Items column (left)
// ============================================================

function ItemsColumn({
  items,
  onRemove,
  onUpdate,
}: {
  items: CartItem[];
  onRemove: (handle: string) => void;
  onUpdate: (handle: string, qty: number) => void;
}) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      <AnimatePresence initial={true} mode="popLayout">
        {items.map((item, index) => (
          <motion.li
            key={item.handle}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              x: 40,
              height: 0,
              marginTop: 0,
              marginBottom: 0,
              paddingTop: 0,
              paddingBottom: 0,
              borderBottomWidth: 0,
            }}
            transition={{
              duration: 0.4,
              delay: index * 0.06,
              ease: EASE_OUT,
            }}
            style={{
              borderBottom: '1px solid rgba(10,10,10,0.08)',
              overflow: 'hidden',
            }}
          >
            <PanierItem item={item} onRemove={onRemove} onUpdate={onUpdate} />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}

function PanierItem({
  item,
  onRemove,
  onUpdate,
}: {
  item: CartItem;
  onRemove: (handle: string) => void;
  onUpdate: (handle: string, qty: number) => void;
}) {
  const { handle, qty, artwork } = item;
  const unique = artwork.type === 'original';
  const lineTotal = artwork.priceCents * qty;

  return (
    <article
      className="flex flex-col gap-5 sm:flex-row sm:gap-6"
      style={{ paddingBlock: 'clamp(1.5rem, 2.5vw, 2rem)' }}
    >
      {/* Image */}
      <Link
        href={`/oeuvres/${handle}`}
        data-cursor="image"
        style={{
          flex: '0 0 auto',
          width: 'clamp(112px, 14vw, 144px)',
          aspectRatio: '4 / 5',
          overflow: 'hidden',
          backgroundColor: INK,
          borderRadius: 2,
          display: 'block',
        }}
      >
        <ArtPoster variant={artwork.posterVariant} label={artwork.title} />
      </Link>

      {/* Info center */}
      <div className="flex flex-1 flex-col gap-2" style={{ minWidth: 0 }}>
        <span
          style={{
            fontFamily: FONT_BODY,
            fontSize: '0.7rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(10,10,10,0.55)',
          }}
        >
          {typeLabel(artwork.type)}
          {artwork.edition ? ` · Édition ${artwork.edition.size}` : ''}
        </span>
        <Link
          href={`/oeuvres/${handle}`}
          data-cursor="link"
          className="panier-item-title"
          style={{
            fontFamily: FONT_SERIF,
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(1.15rem, 1.6vw, 1.4rem)',
            lineHeight: 1.18,
            color: INK,
            textDecoration: 'none',
            letterSpacing: '-0.01em',
          }}
        >
          {artwork.title}
        </Link>
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: '0.82rem',
            color: 'rgba(10,10,10,0.6)',
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          {artwork.dimensions} · {artwork.year}
        </p>
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: '0.95rem',
            fontWeight: 500,
            color: INK,
            margin: '0.35rem 0 0',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {formatPrice(artwork.priceCents)}
        </p>
      </div>

      {/* Actions right */}
      <div
        className="flex flex-row items-end justify-between gap-3 sm:flex-col sm:items-end sm:justify-between"
        style={{ flexShrink: 0 }}
      >
        <div className="flex flex-col items-end gap-3">
          {unique ? (
            <span
              style={{
                fontFamily: FONT_BODY,
                fontSize: '0.7rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(10,10,10,0.55)',
              }}
            >
              Pièce unique
            </span>
          ) : (
            <QtySelector
              qty={qty}
              onDec={() => onUpdate(handle, qty - 1)}
              onInc={() => onUpdate(handle, qty + 1)}
            />
          )}
          <motion.span
            key={lineTotal}
            initial={{ opacity: 0.5, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              fontFamily: FONT_SERIF,
              fontStyle: 'italic',
              fontSize: '1.15rem',
              color: INK,
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '-0.005em',
            }}
          >
            {formatPrice(lineTotal)}
          </motion.span>
        </div>
        <button
          type="button"
          onClick={() => onRemove(handle)}
          data-cursor="link"
          data-no-ripple=""
          className="panier-remove-btn"
          aria-label={`Retirer ${artwork.title} du panier`}
          style={{
            fontFamily: FONT_BODY,
            fontSize: '0.72rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(10,10,10,0.6)',
            backgroundColor: 'transparent',
            border: '1px solid rgba(10,10,10,0.18)',
            borderRadius: 9999,
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            transition: 'border-color 220ms ease, color 220ms ease, background-color 220ms ease',
          }}
        >
          Retirer
        </button>
      </div>

      <style>{`
        .panier-item-title:hover {
          color: var(--color-blood, #e63946);
        }
        .panier-remove-btn:hover {
          color: var(--color-blood, #e63946);
          border-color: var(--color-blood, #e63946);
        }
        @media (prefers-reduced-motion: reduce) {
          .panier-item-title,
          .panier-remove-btn {
            transition: none !important;
          }
        }
      `}</style>
    </article>
  );
}

function QtySelector({
  qty,
  onDec,
  onInc,
}: {
  qty: number;
  onDec: () => void;
  onInc: () => void;
}) {
  return (
    <div
      className="inline-flex items-center"
      style={{
        border: '1px solid rgba(10,10,10,0.18)',
        borderRadius: 9999,
        height: 36,
      }}
    >
      <button
        type="button"
        onClick={onDec}
        aria-label="Diminuer la quantité"
        disabled={qty <= 1}
        data-cursor="link"
        data-no-ripple=""
        style={{
          width: 36,
          height: 36,
          background: 'transparent',
          border: 'none',
          cursor: qty <= 1 ? 'not-allowed' : 'pointer',
          opacity: qty <= 1 ? 0.35 : 1,
          color: INK,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: FONT_BODY,
          fontSize: '1rem',
        }}
      >
        −
      </button>
      <span
        style={{
          minWidth: 28,
          textAlign: 'center',
          fontFamily: FONT_BODY,
          fontSize: '0.9rem',
          fontVariantNumeric: 'tabular-nums',
          color: INK,
        }}
      >
        {qty}
      </span>
      <button
        type="button"
        onClick={onInc}
        aria-label="Augmenter la quantité"
        disabled={qty >= 99}
        data-cursor="link"
        data-no-ripple=""
        style={{
          width: 36,
          height: 36,
          background: 'transparent',
          border: 'none',
          cursor: qty >= 99 ? 'not-allowed' : 'pointer',
          opacity: qty >= 99 ? 0.35 : 1,
          color: INK,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: FONT_BODY,
          fontSize: '1rem',
        }}
      >
        +
      </button>
    </div>
  );
}

// ============================================================
// Recap column (right, sticky)
// ============================================================

function RecapColumn({
  subtotal,
  onClear,
  itemCount,
}: {
  subtotal: number;
  onClear: () => void;
  itemCount: number;
}) {
  const [confirming, setConfirming] = useState(false);

  const handleClear = () => {
    if (confirming) {
      onClear();
      setConfirming(false);
    } else {
      setConfirming(true);
      window.setTimeout(() => setConfirming(false), 4000);
    }
  };

  return (
    <aside
      style={{
        position: 'sticky',
        top: '6rem',
        backgroundColor: PAPER,
        border: '1px solid rgba(10,10,10,0.08)',
        borderRadius: 4,
        padding: 'clamp(1.75rem, 2.5vw, 2.5rem)',
      }}
    >
      <h2
        style={{
          fontFamily: FONT_SERIF,
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: '1.25rem',
          color: INK,
          margin: 0,
          marginBottom: '1.5rem',
          letterSpacing: '-0.01em',
        }}
      >
        Récapitulatif
      </h2>

      <div className="flex flex-col gap-4">
        <div className="flex items-baseline justify-between">
          <span
            style={{
              fontFamily: FONT_BODY,
              fontSize: '0.85rem',
              color: 'rgba(10,10,10,0.65)',
            }}
          >
            Sous-total ({itemCount} {itemCount > 1 ? 'articles' : 'article'})
          </span>
          <span
            style={{
              fontFamily: FONT_BODY,
              fontSize: '0.95rem',
              fontWeight: 500,
              color: INK,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {formatPrice(subtotal)}
          </span>
        </div>
        <div className="flex items-baseline justify-between">
          <span
            style={{
              fontFamily: FONT_BODY,
              fontSize: '0.85rem',
              color: 'rgba(10,10,10,0.65)',
            }}
          >
            Livraison
          </span>
          <span
            style={{
              fontFamily: FONT_BODY,
              fontSize: '0.82rem',
              color: 'rgba(10,10,10,0.5)',
              fontStyle: 'italic',
            }}
          >
            Calculée au checkout
          </span>
        </div>
      </div>

      <div
        style={{
          marginTop: '1.5rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(10,10,10,0.08)',
        }}
        className="flex items-baseline justify-between"
      >
        <span
          style={{
            fontFamily: FONT_BODY,
            fontSize: '0.78rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(10,10,10,0.7)',
          }}
        >
          Total
        </span>
        <motion.span
          key={subtotal}
          initial={{ opacity: 0.5, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            fontFamily: FONT_SERIF,
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(1.6rem, 2.5vw, 2rem)',
            color: INK,
            letterSpacing: '-0.015em',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {formatPrice(subtotal)}
        </motion.span>
      </div>

      <div style={{ marginTop: '1.75rem' }}>
        <DripButton
          href="/checkout"
          variant="primary"
          glow="pink"
          size="md"
          fullWidth
        >
          Aller au checkout
        </DripButton>
      </div>

      <p
        style={{
          fontFamily: FONT_BODY,
          fontSize: '0.72rem',
          color: 'rgba(10,10,10,0.5)',
          margin: '1.25rem 0 0',
          lineHeight: 1.5,
          textAlign: 'center',
        }}
      >
        Certificat d&apos;authenticité inclus · 14 jours pour changer d&apos;avis
      </p>

      <button
        type="button"
        onClick={handleClear}
        data-cursor="link"
        data-no-ripple=""
        className="panier-clear-btn"
        style={{
          display: 'block',
          width: '100%',
          marginTop: '1.25rem',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontFamily: FONT_BODY,
          fontSize: '0.78rem',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: confirming ? 'var(--color-blood, #e63946)' : 'rgba(10,10,10,0.55)',
          textAlign: 'center',
          padding: '0.5rem',
          transition: 'color 220ms ease',
        }}
      >
        {confirming ? 'Confirmer · vider le panier' : 'Vider le panier'}
      </button>

      <style>{`
        .panier-clear-btn:hover {
          color: ${INK};
        }
        @media (prefers-reduced-motion: reduce) {
          .panier-clear-btn {
            transition: none !important;
          }
        }
      `}</style>
    </aside>
  );
}

// ============================================================
// Helpers
// ============================================================

function typeLabel(t: string): string {
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
    default:
      return t;
  }
}
