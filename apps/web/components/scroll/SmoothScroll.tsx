'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import Lenis from 'lenis';

/**
 * Smooth scroll global — Lenis.
 * Désactivé si prefers-reduced-motion OU touch-only.
 * Expose l'instance via window.__lenis pour les triggers externes.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const shouldReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

    if (shouldReduce) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: hasCoarsePointer ? 1.2 : 1,
      wheelMultiplier: 1,
      lerp: 0.1,
    });

    lenisRef.current = lenis;
    // biome-ignore lint/suspicious/noExplicitAny: debug handle
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
