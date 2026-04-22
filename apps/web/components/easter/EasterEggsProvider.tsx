'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useKonami } from '@/lib/hooks/useKonami';

const KONAMI_STORAGE_KEY = 'nacks:konami-unlocked';

type Toast = { title: string; body: string; code?: string };

/**
 * Provider easter eggs niveau page :
 * - détecte le Konami code → unlock drop caché + toast
 * - écoute window 'nacks:easter-egg' pour les autres (Poppy 40-clicks, logo long-press)
 */
export function EasterEggsProvider() {
  const [toast, setToast] = useState<Toast | null>(null);

  useKonami(() => {
    if (typeof window === 'undefined') return;
    if (localStorage.getItem(KONAMI_STORAGE_KEY) === '1') return;
    localStorage.setItem(KONAMI_STORAGE_KEY, '1');
    showToast({
      title: 'Drop caché débloqué',
      body: "Un code promo -10 % vient d'être activé sur ta prochaine commande.",
      code: 'KONAMI10',
    });
  });

  function showToast(next: Toast, ttl = 6000) {
    setToast(next);
    window.setTimeout(() => setToast((current) => (current === next ? null : current)), ttl);
  }

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<Toast>).detail;
      if (detail) showToast(detail);
    };
    window.addEventListener('nacks:easter-egg', handler);
    return () => window.removeEventListener('nacks:easter-egg', handler);
  }, []);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          className="fixed left-1/2 top-24 z-[var(--z-modal)] w-[min(90vw,480px)] -translate-x-1/2 rounded-sm border border-[var(--color-blood)] bg-[var(--color-ink)] p-6 text-[var(--color-cream)] shadow-[0_30px_80px_-30px_rgba(230,57,70,0.6)]"
        >
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.3em] text-[var(--color-blood)]">
            ● Easter egg débloqué
          </p>
          <h3 className="mt-3 font-[var(--font-display)] text-2xl font-[500]">{toast.title}</h3>
          <p className="mt-2 font-[var(--font-body)] text-sm text-[var(--color-cream-600)]">
            {toast.body}
          </p>
          {toast.code && (
            <p className="mt-4 rounded border border-[var(--color-cream-100)] bg-[var(--color-cream-100)]/20 px-4 py-2 font-[var(--font-mono)] text-sm text-[var(--color-cream)]">
              Code : <span className="text-[var(--color-bubble)]">{toast.code}</span>
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Déclenche un toast easter egg depuis n'importe où dans l'app. */
export function fireEasterEgg(toast: Toast) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<Toast>('nacks:easter-egg', { detail: toast }));
}
