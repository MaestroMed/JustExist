'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const PHRASES = [
  'Peintre · Sarcelles — Paris — Los Angeles',
  'Acrylique, Posca, aérosol.',
  'Originaux, éditions, figurines.',
  "Pas d'intermédiaire. Pas de plateforme.",
  'Le royaume numérique de Naguy Claude.',
] as const;

/**
 * Petit tagline sous le wordmark — cycle lentement entre plusieurs phrases.
 * Pause de 3.5s, crossfade 0.6s.
 */
export function CyclingTagline() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % PHRASES.length);
    }, 3800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative h-[2.4em] w-full overflow-hidden text-center">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          className="absolute inset-x-0 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.35em] text-[var(--color-cream-600)] md:text-xs"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
          {PHRASES[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
