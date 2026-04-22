'use client';

import { useRef, useCallback, useEffect } from 'react';
import { useMotionValue, useSpring, type MotionValue } from 'motion/react';

/**
 * Magnetic hook — l'élément attire le curseur dans un rayon.
 * Retourne (ref, x, y) — x/y sont des MotionValue à binder sur `style`.
 * Désactivé automatiquement sur touch ou prefers-reduced-motion.
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>({
  strength = 0.35,
  radius = 80,
}: {
  strength?: number;
  radius?: number;
} = {}): {
  ref: React.RefObject<T | null>;
  x: MotionValue<number>;
  y: MotionValue<number>;
} {
  const ref = useRef<T | null>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 300, damping: 20, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 300, damping: 20, mass: 0.4 });

  const onMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < rect.width / 2 + radius) {
        rawX.set(dx * strength);
        rawY.set(dy * strength);
      } else {
        rawX.set(0);
        rawY.set(0);
      }
    },
    [rawX, rawY, strength, radius],
  );

  const onLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFine || reduced) return;
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, [onMove, onLeave]);

  return { ref, x, y };
}
