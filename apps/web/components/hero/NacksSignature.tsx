'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'motion/react';
import { PoppyClickable } from '@/components/easter/PoppyClickable';
import { CyclingTagline } from './CyclingTagline';

const LETTERS = ['N', 'A', 'C', 'K', 'S'] as const;

/**
 * Signature NACKS v2 — lettres typographiques massives avec :
 *  - Entrée blur + clip-path stagger 110 ms
 *  - Sur hover du wordmark, chaque lettre se penche vers le curseur (parallax fin)
 *  - Trait signature SVG qui se dessine (pathLength)
 *  - Point rouge après S = zone easter egg Poppy
 *  - Cycling tagline sous le wordmark
 */
export function NacksSignature() {
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const mouseX = useMotionValue(0);

  function onMove(e: React.MouseEvent<HTMLHeadingElement>) {
    if (!wordmarkRef.current) return;
    const rect = wordmarkRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5); // -0.5 → 0.5
  }
  function onLeave() {
    mouseX.set(0);
  }

  return (
    <div className="relative flex flex-col items-center gap-6 md:gap-8">
      {/* Marqueur top + easter egg Poppy */}
      <PoppyClickable>
        <motion.span
          className="block h-[6px] w-[6px] rounded-full bg-[var(--color-blood)]"
          aria-hidden="true"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
        />
      </PoppyClickable>

      {/* Wordmark */}
      <h1
        ref={wordmarkRef}
        aria-label="NACKS"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="flex select-none items-baseline justify-center font-[var(--font-display)] font-[600] text-[var(--color-cream)]"
        style={{
          fontSize: 'clamp(5rem, 14vw, 14rem)',
          letterSpacing: '-0.045em',
          lineHeight: 0.88,
        }}
      >
        {LETTERS.map((letter, index) => (
          <HeroLetter key={letter} letter={letter} index={index} total={LETTERS.length} mouseX={mouseX} />
        ))}
        {/* Point rouge signature après le S */}
        <motion.span
          aria-hidden="true"
          className="ml-2 inline-block h-[0.12em] w-[0.12em] translate-y-[-0.15em] rounded-full bg-[var(--color-blood)]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
        />
      </h1>

      {/* Trait signature SVG rouge */}
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

      {/* Cycling tagline */}
      <div className="mt-2 w-full max-w-xl">
        <CyclingTagline />
      </div>
    </div>
  );
}

function HeroLetter({
  letter,
  index,
  total,
  mouseX,
}: {
  letter: string;
  index: number;
  total: number;
  mouseX: MotionValue<number>;
}) {
  // Chaque lettre a une position relative dans le wordmark ;
  // sa rotation/skew suit la distance à la souris, atténuée par un spring.
  const relativePos = (index + 0.5) / total - 0.5; // -0.5 à 0.5
  const diff = useTransform(mouseX, (x) => x - relativePos);
  const rotate = useSpring(useTransform(diff, [-0.5, 0.5], [-6, 6]), {
    stiffness: 200,
    damping: 20,
  });
  const skewY = useSpring(useTransform(diff, [-0.5, 0.5], [3, -3]), {
    stiffness: 200,
    damping: 25,
  });

  return (
    <motion.span
      aria-hidden="true"
      className="inline-block"
      style={{
        willChange: 'transform, clip-path, opacity, filter',
        rotate,
        skewY,
        transformOrigin: 'bottom center',
      }}
      initial={{
        clipPath: 'inset(0 100% 0 0)',
        y: '14%',
        opacity: 0,
        filter: 'blur(14px)',
      }}
      animate={{
        clipPath: 'inset(0 0% 0 0)',
        y: '0%',
        opacity: 1,
        filter: 'blur(0px)',
      }}
      transition={{
        delay: 0.4 + index * 0.11,
        duration: 0.95,
        ease: [0.19, 1, 0.22, 1],
        filter: { duration: 0.8 },
      }}
    >
      {letter}
    </motion.span>
  );
}
