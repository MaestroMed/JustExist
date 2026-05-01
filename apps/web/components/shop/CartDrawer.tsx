'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArtPoster } from '@/components/art/ArtPoster';
import { useCart } from '@/lib/hooks/useCart';
import { formatPrice } from '@/lib/content/artworks';

const EVENT = 'nacks:open-cart';

const INK = 'var(--color-ink, #0a0a0a)';
const CREAM = 'var(--color-cream, #f5f1e8)';
const PAPER = '#fafafa';

const FONT_SERIF = "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = "var(--font-body, Inter, system-ui, sans-serif)";

/**
 * Préservée pour TopNav + PDPActions.
 * Dispatch un CustomEvent qui ouvre le drawer.
 */
export function openCartDrawer() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(EVENT));
}

/**
 * Drawer panier slide-in droite (translateX 100% → 0%).
 * Largeur full mobile, 460px desktop. Background paper #fafafa, shadow gauche fort.
 * Hydraté via useCart (lit localStorage `nacks:cart` + écoute `nacks:cart-change`).
 *
 * Animations :
 * - Drawer 0.4s ease-out (slide-in)
 * - Backdrop fade-in 0.3s
 * - Items stagger 0.05s appear
 * - Remove : exit slide-out + opacity
 *
 * prefers-reduced-motion : durée 0 (instant).
 */
export function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { items, subtotal, count, removeItem, updateQty, hydrated } =
    useCart();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onOpen = () => setOpen(true);
    window.addEventListener(EVENT, onOpen);
    return () => window.removeEventListener(EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);
  const empty = hydrated && items.length === 0;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[var(--z-modal)] bg-black/30 backdrop-blur-[2px]"
            onClick={close}
            aria-hidden="true"
          />
          {/* Drawer */}
          <motion.aside
            key="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-title"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 right-0 top-0 z-[var(--z-modal)] flex w-full flex-col md:w-[460px]"
            style={{
              backgroundColor: PAPER,
              boxShadow: '-30px 0 80px -20px rgba(0,0,0,0.35)',
            }}
          >
            {/* Header */}
            <header
              className="flex items-center justify-between border-b px-6 py-5"
              style={{ borderColor: 'rgba(10,10,10,0.08)' }}
            >
              <div className="flex flex-col gap-1">
                <span
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: '0.7rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'rgba(10,10,10,0.55)',
                  }}
                >
                  {hydrated ? `${count} ${count > 1 ? 'œuvres' : 'œuvre'}` : '—'}
                </span>
                <h2
                  id="cart-drawer-title"
                  style={{
                    fontFamily: FONT_SERIF,
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: 'clamp(1.5rem, 2vw, 1.75rem)',
                    lineHeight: 1.05,
                    color: INK,
                    margin: 0,
                  }}
                >
                  Votre panier
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Fermer le panier"
                data-cursor="link"
                data-no-ripple=""
                className="cart-drawer-close"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 9999,
                  border: '1px solid rgba(10,10,10,0.18)',
                  background: 'transparent',
                  color: INK,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition:
                    'background-color 240ms ease, color 240ms ease, border-color 240ms ease',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                  <path
                    d="M2 2L12 12M12 2L2 12"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </header>

            {/* Body */}
            {empty ? (
              <EmptyState onClose={close} />
            ) : !hydrated ? (
              <div className="flex flex-1 items-center justify-center px-6">
                <span
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: '0.85rem',
                    color: 'rgba(10,10,10,0.45)',
                  }}
                >
                  Chargement…
                </span>
              </div>
            ) : (
              <ItemsList
                items={items}
                onClose={close}
                onRemove={removeItem}
                onUpdate={updateQty}
              />
            )}

            {/* Footer */}
            {!empty && hydrated && items.length > 0 && (
              <footer
                className="flex flex-col gap-3 border-t px-6 py-5"
                style={{ borderColor: 'rgba(10,10,10,0.08)' }}
              >
                <div className="flex items-baseline justify-between">
                  <span
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: '0.78rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'rgba(10,10,10,0.55)',
                    }}
                  >
                    Sous-total
                  </span>
                  <span
                    style={{
                      fontFamily: FONT_SERIF,
                      fontStyle: 'italic',
                      fontWeight: 400,
                      fontSize: 'clamp(1.5rem, 2vw, 1.85rem)',
                      color: INK,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: '0.72rem',
                    color: 'rgba(10,10,10,0.5)',
                    margin: 0,
                  }}
                >
                  Frais de port calculés à la prochaine étape.
                </p>
                <Link
                  href="/checkout"
                  onClick={close}
                  className="cart-drawer-cta"
                  data-cursor="buy"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    backgroundColor: INK,
                    color: CREAM,
                    fontFamily: FONT_SERIF,
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: '1rem',
                    padding: '0.95rem 1.5rem',
                    borderRadius: 9999,
                    textDecoration: 'none',
                    border: '1px solid transparent',
                    transition:
                      'background-color 280ms ease, color 280ms ease, border-color 280ms ease',
                  }}
                >
                  Passer commande
                  <span aria-hidden style={{ display: 'inline-block' }}>
                    →
                  </span>
                </Link>
                <Link
                  href="/panier"
                  onClick={close}
                  data-cursor="link"
                  style={{
                    textAlign: 'center',
                    fontFamily: FONT_BODY,
                    fontSize: '0.78rem',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: 'rgba(10,10,10,0.55)',
                    textDecoration: 'none',
                    transition: 'color 240ms ease',
                  }}
                  className="cart-drawer-secondary"
                >
                  Voir le panier complet →
                </Link>
              </footer>
            )}

            <style>{`
              .cart-drawer-close:hover {
                background-color: ${INK};
                color: ${CREAM};
                border-color: ${INK};
              }
              .cart-drawer-cta:hover {
                background-color: ${CREAM};
                color: ${INK};
                border-color: ${INK};
              }
              .cart-drawer-secondary:hover {
                color: ${INK};
              }
              @media (prefers-reduced-motion: reduce) {
                .cart-drawer-close,
                .cart-drawer-cta,
                .cart-drawer-secondary {
                  transition: none !important;
                }
              }
            `}</style>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// ============================================================
// Empty state
// ============================================================

function EmptyState({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-7 px-6 text-center">
      <svg
        aria-hidden
        width="72"
        height="72"
        viewBox="0 0 72 72"
        fill="none"
        style={{ color: 'rgba(10,10,10,0.25)' }}
      >
        <path
          d="M16 22h40l-4 36H20L16 22z"
          stroke="currentColor"
          strokeWidth="1.4"
          fill="none"
        />
        <path
          d="M26 22v-6a10 10 0 0 1 20 0v6"
          stroke="currentColor"
          strokeWidth="1.4"
          fill="none"
        />
        <path
          d="M22 36h28M22 44h28"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 4"
        />
      </svg>
      <div className="flex flex-col gap-3">
        <p
          style={{
            fontFamily: FONT_SERIF,
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(1.4rem, 2vw, 1.65rem)',
            color: INK,
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          Votre panier est vide.
        </p>
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: '0.9rem',
            lineHeight: 1.55,
            color: 'rgba(10,10,10,0.6)',
            margin: 0,
            maxWidth: '22rem',
          }}
        >
          Découvrez les œuvres disponibles ou demandez un custom.
        </p>
      </div>
      <div className="flex flex-col items-stretch gap-3 sm:flex-row">
        <Link
          href="/oeuvres"
          onClick={onClose}
          data-cursor="link"
          className="cart-empty-cta-primary"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            backgroundColor: INK,
            color: CREAM,
            fontFamily: FONT_SERIF,
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: '0.95rem',
            padding: '0.85rem 1.6rem',
            borderRadius: 9999,
            textDecoration: 'none',
            border: '1px solid transparent',
            transition: 'background-color 280ms ease, color 280ms ease, border-color 280ms ease',
          }}
        >
          Voir les œuvres →
        </Link>
        <Link
          href="/atelier/commission"
          onClick={onClose}
          data-cursor="link"
          className="cart-empty-cta-secondary"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            backgroundColor: 'transparent',
            color: INK,
            fontFamily: FONT_SERIF,
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: '0.95rem',
            padding: '0.85rem 1.6rem',
            borderRadius: 9999,
            textDecoration: 'none',
            border: '1px solid rgba(10,10,10,0.85)',
            transition: 'background-color 280ms ease, color 280ms ease',
          }}
        >
          Demander un custom →
        </Link>
      </div>
      <style>{`
        .cart-empty-cta-primary:hover {
          background-color: ${CREAM};
          color: ${INK};
          border-color: ${INK};
        }
        .cart-empty-cta-secondary:hover {
          background-color: ${INK};
          color: ${CREAM};
        }
      `}</style>
    </div>
  );
}

// ============================================================
// Items list
// ============================================================

function ItemsList({
  items,
  onClose,
  onRemove,
  onUpdate,
}: {
  items: ReturnType<typeof useCart>['items'];
  onClose: () => void;
  onRemove: (handle: string) => void;
  onUpdate: (handle: string, qty: number) => void;
}) {
  return (
    <ul
      className="flex flex-1 flex-col overflow-y-auto"
      style={{ padding: 0, margin: 0, listStyle: 'none' }}
    >
      <AnimatePresence initial={false}>
        {items.map((item, index) => (
          <motion.li
            key={item.handle}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60, height: 0, marginTop: 0, marginBottom: 0 }}
            transition={{
              duration: 0.32,
              delay: index * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              borderBottom: '1px solid rgba(10,10,10,0.08)',
            }}
          >
            <DrawerItem
              item={item}
              onClose={onClose}
              onRemove={onRemove}
              onUpdate={onUpdate}
            />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}

function DrawerItem({
  item,
  onClose,
  onRemove,
  onUpdate,
}: {
  item: ReturnType<typeof useCart>['items'][number];
  onClose: () => void;
  onRemove: (handle: string) => void;
  onUpdate: (handle: string, qty: number) => void;
}) {
  const { handle, qty, artwork } = item;
  const unique = artwork.type === 'original';
  const lineTotal = artwork.priceCents * qty;

  return (
    <div className="flex gap-4 px-6 py-5">
      <Link
        href={`/oeuvres/${handle}`}
        onClick={onClose}
        data-cursor="image"
        style={{
          flex: '0 0 auto',
          width: 80,
          height: 100,
          overflow: 'hidden',
          backgroundColor: INK,
          borderRadius: 2,
        }}
      >
        <ArtPoster variant={artwork.posterVariant} label={artwork.title} />
      </Link>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <Link
            href={`/oeuvres/${handle}`}
            onClick={onClose}
            data-cursor="link"
            className="cart-drawer-title-link"
            style={{
              fontFamily: FONT_SERIF,
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: '1.05rem',
              lineHeight: 1.2,
              color: INK,
              textDecoration: 'none',
              flex: 1,
              minWidth: 0,
            }}
          >
            {artwork.title}
          </Link>
          <button
            type="button"
            onClick={() => onRemove(handle)}
            aria-label={`Retirer ${artwork.title} du panier`}
            data-cursor="link"
            data-no-ripple=""
            className="cart-drawer-remove"
            style={{
              flex: '0 0 auto',
              width: 24,
              height: 24,
              borderRadius: 9999,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(10,10,10,0.5)',
              transition: 'color 200ms ease, background-color 200ms ease',
            }}
          >
            <svg width="11" height="11" viewBox="0 0 14 14" aria-hidden>
              <path
                d="M2 2L12 12M12 2L2 12"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: '0.72rem',
            letterSpacing: '0.05em',
            color: 'rgba(10,10,10,0.55)',
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {artwork.dimensions} · {typeShort(artwork.type)}
        </p>
        <div className="mt-1 flex items-end justify-between gap-3">
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
            transition={{ duration: 0.25 }}
            style={{
              fontFamily: FONT_BODY,
              fontSize: '0.95rem',
              fontWeight: 500,
              color: INK,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {formatPrice(lineTotal)}
          </motion.span>
        </div>
      </div>
      <style>{`
        .cart-drawer-title-link:hover {
          color: var(--color-blood, #e63946);
        }
        .cart-drawer-remove:hover {
          color: var(--color-blood, #e63946);
          background-color: rgba(10,10,10,0.04);
        }
      `}</style>
    </div>
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
        height: 30,
      }}
    >
      <button
        type="button"
        onClick={onDec}
        aria-label="Diminuer la quantité"
        disabled={qty <= 1}
        data-cursor="link"
        data-no-ripple=""
        className="cart-qty-btn"
        style={{
          width: 30,
          height: 30,
          background: 'transparent',
          border: 'none',
          cursor: qty <= 1 ? 'not-allowed' : 'pointer',
          opacity: qty <= 1 ? 0.35 : 1,
          color: INK,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: FONT_BODY,
          fontSize: '0.95rem',
        }}
      >
        −
      </button>
      <span
        style={{
          minWidth: 24,
          textAlign: 'center',
          fontFamily: FONT_BODY,
          fontSize: '0.85rem',
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
        className="cart-qty-btn"
        style={{
          width: 30,
          height: 30,
          background: 'transparent',
          border: 'none',
          cursor: qty >= 99 ? 'not-allowed' : 'pointer',
          opacity: qty >= 99 ? 0.35 : 1,
          color: INK,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: FONT_BODY,
          fontSize: '0.95rem',
        }}
      >
        +
      </button>
    </div>
  );
}

function typeShort(t: string): string {
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
