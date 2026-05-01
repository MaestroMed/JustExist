'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useWishlist } from '@/lib/hooks/useWishlist';
import { openCartDrawer } from './CartDrawer';

const INK = 'var(--color-ink, #0a0a0a)';
const CREAM = 'var(--color-cream, #f5f1e8)';

const FONT_SERIF = "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = "var(--font-body, Inter, system-ui, sans-serif)";

const CART_KEY = 'nacks:cart';

type Status = 'in_stock' | 'sold_out' | 'on_demand' | 'coming';

type Props = {
  slug: string;
  title: string;
  status: Status;
};

type CartShape = { items: { handle: string; qty: number }[] };

function readCart(): CartShape {
  if (typeof window === 'undefined') return { items: [] };
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.items)) return parsed;
    return { items: [] };
  } catch {
    return { items: [] };
  }
}

function writeCart(cart: CartShape): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent('nacks:cart-change'));
}

/**
 * Actions PDP — Add to cart + wishlist + retours.
 * Add to cart : localStorage `nacks:cart` simple, déclenche openCartDrawer().
 * Wishlist : réutilise useWishlist (heart toggle).
 * Sold out / coming : masque le CTA principal, message contextuel.
 */
export function PDPActions({ slug, title, status }: Props) {
  const { has, toggle, hydrated } = useWishlist();
  const [confirm, setConfirm] = useState<null | string>(null);
  const wished = hydrated && has(slug);

  const soldOut = status === 'sold_out';
  const coming = status === 'coming';

  const onAdd = useCallback(() => {
    const cart = readCart();
    const existing = cart.items.find((it) => it.handle === slug);
    if (existing) {
      existing.qty = Math.min(99, existing.qty + 1);
    } else {
      cart.items.push({ handle: slug, qty: 1 });
    }
    writeCart(cart);

    setConfirm(`Ajouté · ${title}`);
    setTimeout(() => setConfirm(null), 2200);

    // Petit délai pour laisser le toast apparaître avant le drawer
    setTimeout(() => openCartDrawer(), 280);
  }, [slug, title]);

  return (
    <div className="flex flex-col" style={{ gap: 'clamp(1rem, 1.6vh, 1.25rem)' }}>
      {/* ── Status badge ── */}
      <StatusBadge status={status} />

      {/* ── CTAs ── */}
      {!soldOut && !coming && (
        <div className="flex items-stretch" style={{ gap: '0.75rem' }}>
          <button
            type="button"
            onClick={onAdd}
            className="pdp-cta-primary group relative flex flex-1 items-center justify-center"
            data-cursor="buy"
            data-cursor-label="Ajouter"
            style={{
              fontFamily: FONT_SERIF,
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(1rem, 1.05vw, 1.1rem)',
              color: CREAM,
              backgroundColor: INK,
              padding: 'clamp(1rem, 1.6vh, 1.15rem) clamp(1.5rem, 2.5vw, 2rem)',
              borderRadius: '9999px',
              border: '1px solid transparent',
              cursor: 'pointer',
              transition:
                'background-color 320ms ease, color 320ms ease, border-color 320ms ease, transform 320ms cubic-bezier(0.22,1,0.36,1)',
              willChange: 'transform',
            }}
          >
            <span>Ajouter au panier</span>
            <span
              aria-hidden
              style={{
                marginLeft: '0.6rem',
                transition: 'transform 320ms cubic-bezier(0.22,1,0.36,1)',
                display: 'inline-block',
              }}
              className="pdp-cta-arrow"
            >
              →
            </span>
          </button>

          <WishlistHeart
            slug={slug}
            title={title}
            wished={wished}
            onToggle={() => toggle(slug)}
          />
        </div>
      )}

      {coming && (
        <div
          className="pdp-status-card"
          style={{
            border: '1px solid rgba(10,10,10,0.12)',
            padding: 'clamp(1.25rem, 2vh, 1.5rem)',
            backgroundColor: 'rgba(10,10,10,0.03)',
          }}
        >
          <p
            style={{
              fontFamily: FONT_SERIF,
              fontStyle: 'italic',
              fontSize: 'clamp(1.1rem, 1.3vw, 1.3rem)',
              color: INK,
              margin: 0,
            }}
          >
            Drop à venir.
          </p>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: '0.9rem',
              lineHeight: 1.55,
              color: 'rgba(10,10,10,0.65)',
              margin: '0.5rem 0 0',
            }}
          >
            Date de mise en vente annoncée dans la prochaine newsletter.
          </p>
        </div>
      )}

      {soldOut && (
        <div
          className="pdp-status-card"
          style={{
            border: '1px solid rgba(10,10,10,0.12)',
            padding: 'clamp(1.25rem, 2vh, 1.5rem)',
            backgroundColor: 'rgba(10,10,10,0.03)',
          }}
        >
          <p
            style={{
              fontFamily: FONT_SERIF,
              fontStyle: 'italic',
              fontSize: 'clamp(1.1rem, 1.3vw, 1.3rem)',
              color: INK,
              margin: 0,
            }}
          >
            Pièce vendue.
          </p>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: '0.9rem',
              lineHeight: 1.55,
              color: 'rgba(10,10,10,0.65)',
              margin: '0.5rem 0 0',
            }}
          >
            Rejoins le cercle pour être prévenu des prochains drops similaires.
          </p>
        </div>
      )}

      {/* ── CTA secondaire — toujours présent ── */}
      <a
        href="mailto:contact@nacksgalerie.com?subject=Demande%20de%20photos%20supplémentaires"
        className="pdp-cta-secondary group inline-flex items-center justify-center"
        data-cursor="link"
        style={{
          fontFamily: FONT_SERIF,
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 'clamp(0.95rem, 1vw, 1.05rem)',
          color: INK,
          backgroundColor: 'transparent',
          padding: 'clamp(0.85rem, 1.4vh, 1rem) clamp(1.5rem, 2.5vw, 2rem)',
          borderRadius: '9999px',
          border: '1px solid rgba(10,10,10,0.85)',
          textDecoration: 'none',
          cursor: 'pointer',
          transition: 'background-color 280ms ease, color 280ms ease',
        }}
      >
        Demander des photos supplémentaires
      </a>

      {/* ── Mention livraison ── */}
      <p
        style={{
          fontFamily: FONT_BODY,
          fontSize: '0.78rem',
          lineHeight: 1.55,
          color: 'rgba(10,10,10,0.55)',
          margin: 0,
          marginTop: 'clamp(0.25rem, 0.5vh, 0.5rem)',
        }}
      >
        Livraison France 35&nbsp;€ · International sur devis · Retours 14 jours
      </p>

      {/* ── Toast de confirmation ── */}
      <AnimatePresence>
        {confirm && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              top: 'clamp(5rem, 10vh, 7rem)',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 800,
              backgroundColor: INK,
              color: CREAM,
              padding: '0.85rem 1.4rem',
              borderRadius: '9999px',
              fontFamily: FONT_BODY,
              fontSize: '0.85rem',
              letterSpacing: '0.02em',
              boxShadow: '0 20px 50px -20px rgba(0,0,0,0.4)',
              pointerEvents: 'none',
            }}
          >
            {confirm}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .pdp-cta-primary:hover {
          background-color: ${CREAM} !important;
          color: ${INK} !important;
          border-color: ${INK} !important;
        }
        .pdp-cta-primary:hover .pdp-cta-arrow {
          transform: translateX(4px);
        }
        .pdp-cta-secondary:hover {
          background-color: ${INK} !important;
          color: ${CREAM} !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .pdp-cta-primary,
          .pdp-cta-arrow,
          .pdp-cta-secondary {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const map: Record<
    Status,
    { label: string; bg: string; color: string; dot: string }
  > = {
    in_stock: {
      label: 'Disponible',
      bg: 'rgba(74,222,128,0.10)',
      color: '#1a6b3a',
      dot: '#22c55e',
    },
    on_demand: {
      label: 'Sur demande',
      bg: 'rgba(212,160,86,0.12)',
      color: '#7a4f1a',
      dot: '#d4a056',
    },
    sold_out: {
      label: 'Vendue',
      bg: 'rgba(10,10,10,0.06)',
      color: 'rgba(10,10,10,0.55)',
      dot: 'rgba(10,10,10,0.45)',
    },
    coming: {
      label: 'Réservée — drop à venir',
      bg: 'rgba(212,160,86,0.12)',
      color: '#7a4f1a',
      dot: '#d4a056',
    },
  };
  const cfg = map[status];

  return (
    <div
      className="inline-flex items-center self-start"
      style={{
        gap: '0.5rem',
        padding: '0.4rem 0.75rem',
        borderRadius: '9999px',
        backgroundColor: cfg.bg,
        fontFamily: FONT_BODY,
        fontSize: '0.72rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: cfg.color,
      }}
    >
      <span
        aria-hidden
        style={{
          display: 'inline-block',
          width: 7,
          height: 7,
          borderRadius: '50%',
          backgroundColor: cfg.dot,
        }}
      />
      <span>{cfg.label}</span>
    </div>
  );
}

function WishlistHeart({
  slug,
  title,
  wished,
  onToggle,
}: {
  slug: string;
  title: string;
  wished: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={wished}
      aria-label={
        wished
          ? `Retirer ${title} de la wishlist`
          : `Ajouter ${title} à la wishlist`
      }
      data-cursor="link"
      data-cursor-label={wished ? 'Retirer' : 'Wishlist'}
      data-no-ripple=""
      className="pdp-heart"
      style={{
        flex: '0 0 auto',
        width: 'clamp(3rem, 5vw, 3.5rem)',
        aspectRatio: '1 / 1',
        borderRadius: '9999px',
        border: '1px solid rgba(10,10,10,0.85)',
        backgroundColor: 'transparent',
        color: INK,
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition:
          'background-color 280ms ease, color 280ms ease, border-color 280ms ease',
      }}
    >
      <motion.svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill={wished ? 'var(--color-blood)' : 'none'}
        stroke={wished ? 'var(--color-blood)' : 'currentColor'}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        animate={{ scale: wished ? [1, 1.25, 1] : 1 }}
        transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </motion.svg>
      <style>{`
        .pdp-heart:hover {
          background-color: ${INK};
          color: ${CREAM};
        }
      `}</style>
    </button>
  );
}
