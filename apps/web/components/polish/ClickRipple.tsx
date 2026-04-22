'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion } from 'motion/react';

type Ripple = { id: number; x: number; y: number; color: string };

const COLORS = [
  'var(--color-blood)',
  'var(--color-bubble)',
  'var(--color-acid)',
  'var(--color-pop)',
  'var(--color-cyan)',
];

/**
 * Provider global : chaque clic sur le document dépose une trace éphémère
 * de Posca qui s'évapore. Couleurs aléatoires dans la palette Nacks.
 */
export function ClickRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    let id = 0;
    const onClick = (e: MouseEvent) => {
      // Ignore clics sur éléments où un ripple dérange (input, textarea).
      const target = e.target as HTMLElement | null;
      if (target?.closest('input, textarea, [data-no-ripple]')) return;
      const color = COLORS[id % COLORS.length] ?? COLORS[0]!;
      const ripple: Ripple = { id: id++, x: e.clientX, y: e.clientY, color };
      setRipples((r) => [...r, ripple]);
      window.setTimeout(() => {
        setRipples((r) => r.filter((x) => x.id !== ripple.id));
      }, 700);
    };
    document.addEventListener('click', onClick, { capture: true, passive: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[var(--z-overlay)] overflow-hidden"
    >
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            style={
              {
                left: r.x,
                top: r.y,
                backgroundColor: r.color,
                width: 18,
                height: 18,
                marginLeft: -9,
                marginTop: -9,
                mixBlendMode: 'screen',
              } as CSSProperties
            }
            className="absolute rounded-full blur-[1px]"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
