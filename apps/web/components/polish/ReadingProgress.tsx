'use client';

import { motion, useScroll, useSpring } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

type Props = {
  targetSelector?: string;
};

/**
 * Barre de progression lecture — rouge, bottom-fixed, animated scroll.
 * Utilisée sur articles journal + pages détail lourdes.
 */
export function ReadingProgress({ targetSelector = 'article' }: Props) {
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const el = document.querySelector<HTMLElement>(targetSelector);
    if (el) {
      ref.current = el;
      setReady(true);
    }
  }, [targetSelector]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 90%', 'end 50%'] });
  const width = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  if (!ready) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed bottom-0 left-0 right-0 z-[var(--z-sticky)] h-[3px] origin-left bg-[var(--color-blood)]"
      style={{ scaleX: width }}
    />
  );
}
