'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useInView } from 'motion/react';

/**
 * Wrapper client pour stagger des SeriesCards en grille 1/2/3 cols.
 * Motion whileInView : opacity 0→1 + y 24→0, stagger 0.08s.
 * prefers-reduced-motion : final state immédiat (pas d'anim entrée).
 */
export function DropsListAnim({ children }: { children: ReactNode[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      style={{ gap: 'clamp(1.25rem, 2.8vw, 2.25rem)' }}
    >
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          animate={
            reduced || inView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 24 }
          }
          transition={{
            duration: 0.7,
            delay: reduced ? 0 : i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
