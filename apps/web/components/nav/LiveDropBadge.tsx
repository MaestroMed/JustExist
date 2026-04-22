'use client';

import { motion } from 'motion/react';

/**
 * Badge pulsant rouge indiquant qu'un drop est en direct.
 * Placé à côté du label "Drops" dans la nav.
 */
export function LiveDropBadge() {
  return (
    <motion.span
      aria-hidden="true"
      className="absolute -right-3 -top-1 flex h-[6px] w-[6px]"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-blood)] opacity-60" />
      <span className="relative inline-flex h-full w-full rounded-full bg-[var(--color-blood)]" />
    </motion.span>
  );
}
