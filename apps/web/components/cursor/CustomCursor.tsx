'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

type CursorVariant = 'default' | 'link' | 'image' | 'buy';

/**
 * Curseur custom — cercle crème damping 0.1, grossit sur liens/boutons/images.
 * Désactivé sur touch / prefers-reduced-motion.
 */
export function CustomCursor() {
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [label, setLabel] = useState<string>('');
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const x = useSpring(mouseX, { stiffness: 500, damping: 50, mass: 0.5 });
  const y = useSpring(mouseY, { stiffness: 500, damping: 50, mass: 0.5 });

  useEffect(() => {
    const isFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(isFine && !isReduced);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive =
        target.closest('a, button, [role="button"], [data-cursor]') as HTMLElement | null;
      if (!interactive) {
        setVariant('default');
        setLabel('');
        return;
      }
      const hint = interactive.getAttribute('data-cursor');
      const text = interactive.getAttribute('data-cursor-label');
      if (hint === 'buy') {
        setVariant('buy');
        setLabel(text ?? 'Acheter');
      } else if (hint === 'image') {
        setVariant('image');
        setLabel(text ?? 'Voir');
      } else {
        setVariant('link');
        setLabel(text ?? '');
      }
    };

    const onLeave = () => {
      setVisible(false);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onEnter, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onEnter);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled, mouseX, mouseY, visible]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[var(--z-cursor)] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      style={{ x, y }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full bg-[var(--color-cream)] text-[var(--color-ink)]"
        animate={{
          width: variant === 'default' ? 10 : variant === 'buy' ? 72 : 56,
          height: variant === 'default' ? 10 : variant === 'buy' ? 72 : 56,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 40 }}
      >
        {variant !== 'default' && label && (
          <span className="font-[var(--font-display)] text-xs font-medium tracking-wide">
            {label}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
