'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';

type Props = {
  items: { id: string; label: string; render: () => ReactNode }[];
  trigger: (open: (index: number) => void) => ReactNode;
};

/**
 * Lightbox plein écran pour images d'une œuvre.
 * Items : tableau de renderers (on passe des composants React qui rendent l'image).
 * Navigation clavier : ← → Esc.
 * Zoom : clic sur l'image fait scale(2) avec position follow-mouse.
 */
export function ImageLightbox({ items, trigger }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  const open = (i: number) => {
    setOpenIndex(i);
    setZoomed(false);
  };
  const close = () => {
    setOpenIndex(null);
    setZoomed(false);
  };
  const prev = () => {
    if (openIndex === null) return;
    setOpenIndex((openIndex - 1 + items.length) % items.length);
    setZoomed(false);
  };
  const next = () => {
    if (openIndex === null) return;
    setOpenIndex((openIndex + 1) % items.length);
    setZoomed(false);
  };

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', onKey);
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
    };
  }, [openIndex]);

  const current = openIndex !== null ? items[openIndex] : null;

  return (
    <>
      {trigger(open)}
      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center bg-[var(--color-ink)]/95 backdrop-blur-md"
            onClick={close}
          >
            {/* Close */}
            <button
              type="button"
              onClick={close}
              aria-label="Fermer"
              className="absolute right-6 top-6 z-10 rounded-full border border-[var(--color-cream-200)] px-4 py-2 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.3em] text-[var(--color-cream)] transition-colors hover:bg-[var(--color-cream)] hover:text-[var(--color-ink)]"
              data-cursor="link"
              data-no-ripple=""
            >
              Fermer · Esc
            </button>

            {/* Counter */}
            <div className="absolute left-6 top-6 font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-cream-600)]">
              {openIndex! + 1} / {items.length}
            </div>

            {/* Prev */}
            {items.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Précédent"
                className="absolute left-6 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[var(--color-cream-200)] p-4 text-[var(--color-cream)] transition-colors hover:bg-[var(--color-cream)] hover:text-[var(--color-ink)]"
                data-cursor="link"
                data-no-ripple=""
              >
                ←
              </button>
            )}

            {/* Next */}
            {items.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Suivant"
                className="absolute right-6 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[var(--color-cream-200)] p-4 text-[var(--color-cream)] transition-colors hover:bg-[var(--color-cream)] hover:text-[var(--color-ink)]"
                data-cursor="link"
                data-no-ripple=""
              >
                →
              </button>
            )}

            {/* Image */}
            <motion.div
              key={current.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              className="relative aspect-[4/5] w-[min(85vh,92vw)] max-w-[680px] overflow-hidden shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
              onClick={(e) => {
                e.stopPropagation();
                setZoomed((z) => !z);
              }}
              onMouseMove={(e) => {
                if (!zoomed) return;
                const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
                setMouse({
                  x: ((e.clientX - r.left) / r.width) * 100,
                  y: ((e.clientY - r.top) / r.height) * 100,
                });
              }}
              style={{ cursor: zoomed ? 'zoom-out' : 'zoom-in' }}
            >
              <motion.div
                className="h-full w-full"
                animate={{
                  scale: zoomed ? 2 : 1,
                }}
                transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
                style={{
                  transformOrigin: `${mouse.x}% ${mouse.y}%`,
                }}
              >
                {current.render()}
              </motion.div>
            </motion.div>

            {/* Label */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-cream-600)]">
              {current.label}
              <span className="ml-3 opacity-60">·</span>
              <span className="ml-3 opacity-60">clic pour zoomer · ← → pour naviguer</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
