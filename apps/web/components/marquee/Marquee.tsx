'use client';

import { type ReactNode } from 'react';
import { motion } from 'motion/react';

type Props = {
  children: ReactNode;
  speed?: number; // pixels / seconde
  reverse?: boolean;
  className?: string;
};

/**
 * Défilement horizontal infini léger — CSS-only via motion.
 * Utilisé pour le ruban "partenaires", "expositions", "voices".
 */
export function Marquee({ children, speed = 40, reverse = false, className }: Props) {
  return (
    <div className={`overflow-hidden ${className ?? ''}`}>
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{
          duration: 1200 / speed,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        <div className="flex flex-shrink-0 items-center gap-12">{children}</div>
        <div aria-hidden="true" className="flex flex-shrink-0 items-center gap-12">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
