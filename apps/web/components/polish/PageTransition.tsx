'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { type ReactNode } from 'react';

/**
 * Transition d'entrée de page — fade + slide up 16px.
 * Se déclenche sur chaque changement de pathname via `key={pathname}`.
 * Respecte prefers-reduced-motion (disable transition).
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
    >
      {children}
    </motion.div>
  );
}
