'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useInView } from 'motion/react';

/**
 * Wrapper client pour stagger des ArtworkCards en grille.
 * Motion whileInView : opacity 0→1 + y 20→0, stagger 0.08s.
 * prefers-reduced-motion : final state immédiat (pas d'anim entrée).
 *
 * Le shell parent (NacksShow) reste server. Cards passées via children,
 * chaque enfant direct est wrappé dans un motion.div animé.
 */
export function NacksShowAnim({ children }: { children: ReactNode[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      style={{ gap: 'clamp(1rem, 2.5vw, 2rem)' }}
    >
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={
            reduced || inView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 20 }
          }
          transition={{
            duration: 0.6,
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
