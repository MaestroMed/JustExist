'use client';

import { motion } from 'motion/react';
import { useMemo } from 'react';

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  driftX: number;
  driftY: number;
};

const PALETTE = [
  'var(--color-blood)',
  'var(--color-bubble)',
  'var(--color-acid)',
  'var(--color-pop)',
  'var(--color-cyan)',
  'var(--color-cream)',
];

function seed(i: number): Particle {
  const rng = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };
  return {
    id: i,
    x: rng(i * 7.3) * 100,
    y: rng(i * 13.1) * 100,
    size: 2 + rng(i * 19.7) * 4,
    color: PALETTE[i % PALETTE.length] ?? 'var(--color-cream)',
    delay: rng(i * 3.1) * 4,
    duration: 8 + rng(i * 5.7) * 6,
    driftX: (rng(i * 11.3) - 0.5) * 60,
    driftY: (rng(i * 17.9) - 0.5) * 60,
  };
}

/**
 * Petits points flottants type résidu d'aérosol.
 * Deterministic pseudo-random → pas de hydration mismatch.
 */
export function FloatingParticles({ count = 14 }: { count?: number }) {
  const particles = useMemo(() => Array.from({ length: count }, (_, i) => seed(i + 1)), [count]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full blur-[0.5px]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            opacity: 0.4,
          }}
          animate={{
            x: [0, p.driftX, 0],
            y: [0, p.driftY, 0],
            opacity: [0.25, 0.6, 0.25],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
