'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

type Props = {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  format?: (n: number) => string;
  decimals?: number;
};

/**
 * Chiffre qui compte de 0 → target quand il entre dans le viewport.
 * Easing out-quart. Respecte prefers-reduced-motion.
 */
export function ScrollCountUp({
  target,
  duration = 1800,
  prefix = '',
  suffix = '',
  className,
  format,
  decimals = 0,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(target);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, reduce]);

  const display = format
    ? format(value)
    : value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0');

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
