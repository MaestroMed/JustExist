'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { NewsletterForm } from '@/components/forms/NewsletterForm';

const DISMISSED_KEY = 'nacks:exit-intent-dismissed';
const MIN_TIME_MS = 45_000;

/**
 * Exit-intent doux.
 * Conditions cumulées :
 *   - user a passé ≥ 45s sur le site
 *   - souris sort par le haut de l'écran
 *   - pas dismiss auparavant (localStorage persistant)
 * Un clic sur "non merci" désactive FOREVER.
 */
export function ExitIntent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (localStorage.getItem(DISMISSED_KEY) === '1') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const startedAt = Date.now();
    let fired = false;

    const onLeave = (e: MouseEvent) => {
      if (fired) return;
      if (e.clientY > 8) return; // sortie vers le haut uniquement
      if (Date.now() - startedAt < MIN_TIME_MS) return;
      fired = true;
      setOpen(true);
    };

    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => document.documentElement.removeEventListener('mouseleave', onLeave);
  }, []);

  function close(forever = false) {
    setOpen(false);
    if (forever && typeof window !== 'undefined') {
      localStorage.setItem(DISMISSED_KEY, '1');
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-intent-title"
          className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center bg-[var(--color-ink)]/85 p-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => close(false)}
        >
          <motion.div
            role="document"
            className="relative w-full max-w-xl border border-[var(--color-cream-100)] bg-[var(--color-ink)] p-10 text-[var(--color-cream)]"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Fermer"
              onClick={() => close(false)}
              className="absolute right-4 top-4 font-[var(--font-mono)] text-xs uppercase tracking-[0.25em] text-[var(--color-cream-600)] transition-colors hover:text-[var(--color-cream)]"
              data-cursor="link"
            >
              ×
            </button>

            <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-blood)]">
              Avant de partir
            </p>
            <h2
              id="exit-intent-title"
              className="mt-4 font-[var(--font-display)] font-[500] leading-[1] tracking-[-0.025em]"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
            >
              Une dernière chose.
            </h2>
            <p className="mt-4 font-[var(--font-body)] text-[var(--color-cream-600)]">
              Laisse-moi ton email — je t'envoie un mardi sur deux ce qui sort de l'atelier. Les drops en avant-première. Rien de plus.
            </p>

            <div className="mt-8">
              <NewsletterForm variant="inline" label="ton@email.com" />
            </div>

            <button
              type="button"
              onClick={() => close(true)}
              className="mt-8 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.3em] text-[var(--color-cream-400)] underline-offset-4 hover:text-[var(--color-cream)] hover:underline"
              data-cursor="link"
              data-no-ripple=""
            >
              Non merci — ne me le redemande pas
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
