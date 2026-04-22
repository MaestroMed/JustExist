'use client';

import { forwardRef, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { useMagnetic } from '@/lib/hooks/useMagnetic';

type Props = {
  children: ReactNode;
  as?: 'button' | 'a' | 'div';
  href?: string;
  className?: string;
  strength?: number;
  radius?: number;
  onClick?: () => void;
  [key: `data-${string}`]: string | undefined;
};

/**
 * Wrapper qui applique un effet magnétique à ses enfants.
 * Réservé aux CTA majeurs — pas tous les boutons.
 */
export const MagneticButton = forwardRef<HTMLDivElement, Props>(function MagneticButton(
  { children, className, strength = 0.3, radius = 60, ...rest },
  _externalRef,
) {
  const { ref, x, y } = useMagnetic<HTMLDivElement>({ strength, radius });

  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: 'inline-block' }}
      className={className}
      {...rest}
    >
      <motion.div style={{ x: x.get() * 0.3, y: y.get() * 0.3 }}>
        {children}
      </motion.div>
    </motion.div>
  );
});
