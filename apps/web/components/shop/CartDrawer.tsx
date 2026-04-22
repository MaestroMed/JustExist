'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const EVENT = 'nacks:open-cart';

export function openCartDrawer() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(EVENT));
}

/**
 * Drawer panier slide-in depuis la droite.
 * S'ouvre via window.dispatchEvent('nacks:open-cart').
 * Close : clic backdrop, touche Esc, ou bouton ×.
 * Sprint 1 : empty state (pas encore de cart store). Sprint 6 : état
 * plein avec items, quantité, sous-total, CTA checkout.
 */
export function CartDrawer() {
  const [open, setOpen] = useState(false);

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
            className="fixed inset-0 z-[var(--z-modal)] bg-[var(--color-ink)]/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
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
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="fixed bottom-0 right-0 top-0 z-[var(--z-modal)] flex w-[min(440px,100vw)] flex-col bg-[var(--color-ink)] shadow-[0_0_80px_-20px_rgba(0,0,0,0.9)]"
          >
            <header className="flex items-center justify-between border-b border-[var(--color-cream-100)] px-6 py-5">
              <div className="flex flex-col gap-1">
                <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.3em] text-[var(--color-cream-600)]">
                  Panier · 0 article
                </span>
                <h2
                  id="cart-drawer-title"
                  className="font-[var(--font-display)] text-2xl font-[500] text-[var(--color-cream)]"
                >
                  Ton panier
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer le panier"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-cream-200)] text-[var(--color-cream)] transition-colors hover:bg-[var(--color-cream)] hover:text-[var(--color-ink)]"
                data-cursor="link"
                data-no-ripple=""
              >
                ×
              </button>
            </header>

            {/* Empty state */}
            <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
              <svg
                aria-hidden="true"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-[var(--color-cream-400)]"
              >
                <path d="M3 6h18l-2 13H5L3 6z" />
                <path d="M8 6V4a4 4 0 1 1 8 0v2" />
              </svg>
              <div className="flex flex-col gap-3">
                <p className="font-[var(--font-display)] text-xl font-[500] text-[var(--color-cream)]">
                  Ton panier attend.
                </p>
                <p className="max-w-xs font-[var(--font-body)] text-sm text-[var(--color-cream-600)]">
                  Les œuvres que tu ajoutes au panier apparaissent ici. Paiement sécurisé Stripe au Sprint 6.
                </p>
              </div>
              <Link
                href="/oeuvres"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 bg-[var(--color-cream)] px-6 py-3 font-[var(--font-display)] text-sm uppercase tracking-[0.2em] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-blood)] hover:text-[var(--color-cream)]"
                data-cursor="link"
              >
                Explorer →
              </Link>
            </div>

            <footer className="border-t border-[var(--color-cream-100)] px-6 py-5">
              <Link
                href="/panier"
                onClick={() => setOpen(false)}
                className="block text-center font-[var(--font-mono)] text-[10px] uppercase tracking-[0.25em] text-[var(--color-cream-600)] transition-colors hover:text-[var(--color-cream)]"
                data-cursor="link"
              >
                Voir la page panier complète →
              </Link>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
