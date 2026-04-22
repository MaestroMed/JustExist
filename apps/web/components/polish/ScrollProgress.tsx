'use client';

import { motion, useScroll, useSpring } from 'motion/react';

/**
 * Trait rouge 2 px en haut d'écran qui se dessine au scroll.
 * Damping pour éviter la nervosité.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[var(--z-modal)] h-[2px] origin-left bg-[var(--color-blood)]"
      style={{ scaleX }}
    />
  );
}
