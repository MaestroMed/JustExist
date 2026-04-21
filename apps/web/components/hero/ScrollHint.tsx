'use client';

import { motion } from 'motion/react';

/**
 * Indicateur de scroll discret — petit cercle crème pulsant + légende.
 */
export function ScrollHint() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 md:bottom-10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.6, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
    >
      <motion.span
        className="block h-[40px] w-px bg-[var(--color-cream-400)]"
        animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: 'top' }}
      />
      <span className="font-[var(--font-display)] text-[0.7rem] uppercase tracking-[0.25em] text-[var(--color-cream-600)]">
        Descendre dans le monde
      </span>
    </motion.div>
  );
}
