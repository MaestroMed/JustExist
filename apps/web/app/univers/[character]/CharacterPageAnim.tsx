'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { motion } from 'motion/react';

/**
 * Wrapper client générique pour fade-up scroll-into-view.
 * Stagger via index * 0.1s. prefers-reduced-motion : final state immédiat.
 */
export function FadeUp({
  index = 0,
  className,
  children,
  y = 24,
  duration = 0.7,
  as = 'div',
}: {
  index?: number;
  className?: string;
  children: ReactNode;
  y?: number;
  duration?: number;
  as?: 'div' | 'li' | 'section' | 'article';
}) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag =
    as === 'li'
      ? motion.li
      : as === 'section'
        ? motion.section
        : as === 'article'
          ? motion.article
          : motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{
        duration,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1,
      }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Stat number count-up. Lightweight, dep-free.
 * prefers-reduced-motion : final state immédiat.
 */
export function StatCountUp({
  value,
  duration = 1.2,
  className,
  style,
}: {
  value: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [display, setDisplay] = useState(value);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
  }, []);

  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      return;
    }
    setDisplay(0);
    let raf = 0;
    let started = 0;
    const start = (ts: number) => {
      if (!started) started = ts;
      const elapsed = (ts - started) / 1000;
      const t = Math.min(1, elapsed / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(start);
    };
    raf = requestAnimationFrame(start);
    return () => cancelAnimationFrame(raf);
  }, [value, duration, reduced]);

  return (
    <span className={className} style={style}>
      {display}
    </span>
  );
}
