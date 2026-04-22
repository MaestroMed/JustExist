'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

type TimelineItem = {
  year: number;
  label: string;
  detail: string;
};

type Props = {
  items: readonly TimelineItem[];
};

/**
 * Timeline visuelle verticale avec ligne continue + nodes numérotés.
 * Chaque item se révèle à l'entrée viewport.
 */
export function TimelineVisual({ items }: Props) {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px -20% 0px' });

  return (
    <ol ref={ref} className="relative flex flex-col gap-12 pl-8 md:pl-14">
      {/* Continuous line */}
      <motion.div
        aria-hidden="true"
        className="absolute left-[9px] top-0 w-px origin-top bg-[var(--color-cream-200)] md:left-[15px]"
        initial={{ scaleY: 0, height: 0 }}
        animate={inView ? { scaleY: 1, height: '100%' } : {}}
        transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
      />

      {items.map((item, i) => (
        <motion.li
          key={item.year}
          className="relative flex flex-col gap-3"
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 + i * 0.15, ease: [0.19, 1, 0.22, 1] }}
        >
          {/* Node */}
          <motion.div
            aria-hidden="true"
            className="absolute -left-8 top-2 flex h-5 w-5 items-center justify-center rounded-full border border-[var(--color-cream)] bg-[var(--color-ink)] md:-left-[52px] md:h-7 md:w-7"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.15, ease: [0.19, 1, 0.22, 1] }}
          >
            <span className="block h-2 w-2 rounded-full bg-[var(--color-blood)]" />
          </motion.div>

          <div className="flex items-baseline gap-6">
            <span
              className="font-[var(--font-mono)] tabular-nums text-[var(--color-blood)]"
              style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', fontWeight: 500, letterSpacing: '-0.02em' }}
            >
              {item.year}
            </span>
            <span className="h-px flex-1 bg-[var(--color-cream-100)]" />
          </div>
          <p className="font-[var(--font-display)] text-xl font-[500] tracking-[-0.01em] text-[var(--color-cream)] md:text-2xl">
            {item.label}
          </p>
          <p className="max-w-2xl font-[var(--font-body)] text-base text-[var(--color-cream-600)]">
            {item.detail}
          </p>
        </motion.li>
      ))}
    </ol>
  );
}
