'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

type CursorVariant = 'default' | 'link' | 'image' | 'buy' | 'lock' | 'drag' | 'text';

/**
 * Curseur custom — cream en mix-blend-difference, grossit au contexte.
 * Variants lus sur [data-cursor] :
 *   default · link · image · buy · lock · drag · text
 * Label surchargeable via [data-cursor-label].
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

  // Trail dot (plus lent, décalé)
  const trailX = useSpring(mouseX, { stiffness: 150, damping: 25, mass: 1.2 });
  const trailY = useSpring(mouseY, { stiffness: 150, damping: 25, mass: 1.2 });

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
      const interactive = target.closest(
        'a, button, [role="button"], [data-cursor], input, textarea, select',
      ) as HTMLElement | null;
      if (!interactive) {
        setVariant('default');
        setLabel('');
        return;
      }
      // Text inputs = text cursor
      if (
        interactive.tagName === 'INPUT' ||
        interactive.tagName === 'TEXTAREA' ||
        interactive.tagName === 'SELECT'
      ) {
        setVariant('text');
        setLabel('');
        return;
      }
      const hint = interactive.getAttribute('data-cursor') as CursorVariant | null;
      const customLabel = interactive.getAttribute('data-cursor-label');
      const kind: CursorVariant = hint && isCursorVariant(hint) ? hint : 'link';
      setVariant(kind);
      setLabel(
        customLabel ??
          {
            default: '',
            link: '',
            image: 'Voir',
            buy: 'Acheter',
            lock: 'Verrouillé',
            drag: 'Glisser',
            text: '',
          }[kind],
      );
    };

    const onLeave = () => setVisible(false);

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

  const sizeMap: Record<CursorVariant, number> = {
    default: 10,
    link: 48,
    image: 64,
    buy: 80,
    lock: 56,
    drag: 56,
    text: 4,
  };
  const bgMap: Record<CursorVariant, string> = {
    default: 'var(--color-cream)',
    link: 'var(--color-cream)',
    image: 'var(--color-cream)',
    buy: 'var(--color-blood)',
    lock: 'var(--color-ink-400)',
    drag: 'var(--color-bubble)',
    text: 'var(--color-cream)',
  };
  const textMap: Record<CursorVariant, string> = {
    default: 'var(--color-ink)',
    link: 'var(--color-ink)',
    image: 'var(--color-ink)',
    buy: 'var(--color-cream)',
    lock: 'var(--color-cream)',
    drag: 'var(--color-ink)',
    text: 'var(--color-ink)',
  };

  return (
    <>
      {/* Trail dot — visible seulement en mode default, se cache aux interactions */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[var(--z-cursor)] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ x: trailX, y: trailY }}
      >
        <motion.span
          className="block rounded-full bg-[var(--color-cream)]"
          animate={{
            width: variant === 'default' ? 30 : 0,
            height: variant === 'default' ? 30 : 0,
            opacity: visible && variant === 'default' ? 0.2 : 0,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      </motion.div>

      {/* Main cursor */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[var(--z-cursor)] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ x, y }}
      >
        <motion.div
          className="flex items-center justify-center rounded-full"
          animate={{
            width: sizeMap[variant],
            height: sizeMap[variant],
            backgroundColor: bgMap[variant],
            opacity: visible ? 1 : 0,
            rotateZ: variant === 'text' ? 90 : 0,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
          style={{
            width: 10,
            height: 10,
          }}
        >
          {label && variant !== 'default' && variant !== 'text' && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="whitespace-nowrap font-[var(--font-display)] text-xs font-medium tracking-wide"
              style={{ color: textMap[variant] }}
            >
              {label}
            </motion.span>
          )}
          {variant === 'lock' && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}

function isCursorVariant(v: string): v is CursorVariant {
  return ['default', 'link', 'image', 'buy', 'lock', 'drag', 'text'].includes(v);
}
