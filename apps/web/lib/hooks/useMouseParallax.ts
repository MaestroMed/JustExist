'use client';

import { useEffect } from 'react';
import { useMotionValue, useSpring, type MotionValue } from 'motion/react';

/**
 * Mouse parallax — suit la souris avec un damping fort.
 * Retourne des MotionValues x (-1 → 1) et y (-1 → 1) normalisés à la fenêtre.
 */
export function useMouseParallax(damping = 60): {
  x: MotionValue<number>;
  y: MotionValue<number>;
} {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 50, damping, mass: 0.8 });
  const y = useSpring(rawY, { stiffness: 50, damping, mass: 0.8 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX / window.innerWidth - 0.5);
      rawY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [rawX, rawY]);

  return { x, y };
}
