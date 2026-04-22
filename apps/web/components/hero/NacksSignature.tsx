'use client';

import { motion } from 'motion/react';
import { PoppyClickable } from '@/components/easter/PoppyClickable';

const LETTERS = ['N', 'A', 'C', 'K', 'S'] as const;

/**
 * Signature NACKS — révélation letter-by-letter avec clip-path wipe.
 * Sous le wordmark, un trait rouge signature se dessine en SVG (pathLength).
 * Le point rouge central est la zone cliquable easter egg Mr Poppy.
 */
export function NacksSignature() {
  return (
    <div className="relative flex flex-col items-center gap-6 md:gap-8">
      {/* Petit marqueur au-dessus — signe de présence + easter egg Poppy */}
      <PoppyClickable>
        <motion.span
          className="block h-[6px] w-[6px] rounded-full bg-[var(--color-blood)]"
          aria-hidden="true"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
        />
      </PoppyClickable>

      {/* Le wordmark NACKS */}
      <h1
        aria-label="NACKS"
        className="flex select-none items-baseline justify-center font-[var(--font-display)] font-[600] text-[var(--color-cream)]"
        style={{
          fontSize: 'clamp(5rem, 14vw, 14rem)',
          letterSpacing: '-0.045em',
          lineHeight: 0.88,
        }}
      >
        {LETTERS.map((letter, index) => (
          <motion.span
            key={`${letter}-${index}`}
            aria-hidden="true"
            className="inline-block"
            style={{ willChange: 'clip-path, transform, opacity' }}
            initial={{
              clipPath: 'inset(0 100% 0 0)',
              y: '10%',
              opacity: 0,
            }}
            animate={{
              clipPath: 'inset(0 0% 0 0)',
              y: '0%',
              opacity: 1,
            }}
            transition={{
              delay: 0.4 + index * 0.11,
              duration: 0.9,
              ease: [0.19, 1, 0.22, 1],
            }}
          >
            {letter}
          </motion.span>
        ))}
        <motion.span
          aria-hidden="true"
          className="ml-2 inline-block h-[0.12em] w-[0.12em] translate-y-[-0.15em] rounded-full bg-[var(--color-blood)]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
        />
      </h1>

      {/* Trait signature dessiné en SVG sous le wordmark */}
      <svg
        aria-hidden="true"
        viewBox="0 0 600 30"
        className="h-[18px] w-[min(60vw,520px)]"
        fill="none"
        strokeLinecap="round"
      >
        <motion.path
          d="M 10 18 C 60 6, 110 28, 160 12 S 260 26, 310 14 S 410 28, 460 12 S 560 26, 590 16"
          stroke="var(--color-blood)"
          strokeWidth="3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            delay: 1.4,
            duration: 1.2,
            ease: [0.19, 1, 0.22, 1],
            opacity: { duration: 0.2 },
          }}
        />
      </svg>
    </div>
  );
}
