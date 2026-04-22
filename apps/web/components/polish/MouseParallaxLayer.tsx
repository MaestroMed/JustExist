'use client';

import { type ReactNode } from 'react';
import { motion, useTransform } from 'motion/react';
import { useMouseParallax } from '@/lib/hooks/useMouseParallax';

type Props = {
  children: ReactNode;
  intensity?: number; // px max de déplacement
  className?: string;
};

/**
 * Enveloppe qui fait suivre doucement la souris à son contenu.
 * Utilisé sur le Hero pour donner la sensation que l'univers respire.
 */
export function MouseParallaxLayer({ children, intensity = 20, className }: Props) {
  const { x, y } = useMouseParallax();
  const tx = useTransform(x, [-0.5, 0.5], [-intensity, intensity]);
  const ty = useTransform(y, [-0.5, 0.5], [-intensity, intensity]);

  return (
    <motion.div
      className={className}
      style={{ x: tx, y: ty, willChange: 'transform' }}
    >
      {children}
    </motion.div>
  );
}
