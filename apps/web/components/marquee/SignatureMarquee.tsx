'use client';

import { motion } from 'motion/react';

type Props = {
  reverse?: boolean;
  speed?: number; // sec / cycle
  variant?: 'cream' | 'blood' | 'bubble' | 'outline';
  dense?: boolean;
};

const TOKENS = [
  'NACKS GALERIE',
  '✦',
  'ORIGINAL',
  '·',
  'ÉDITION LIMITÉE',
  '·',
  'MR POPPY',
  '✦',
  'SARCELLES 95',
  '·',
  'POSCA · ACRYLIQUE · AÉROSOL',
  '✦',
  'DROPS MARDI',
  '·',
  'DEPUIS 2022',
  '✦',
  'PARIS — LOS ANGELES',
];

/**
 * Bande défilante signature — mix de mots, ponctuations et glyphes.
 * Entre les sections. Accent d'univers. Respecte prefers-reduced-motion.
 */
export function SignatureMarquee({
  reverse = false,
  speed = 40,
  variant = 'cream',
  dense = false,
}: Props) {
  const bg =
    variant === 'blood'
      ? 'bg-[var(--color-blood)] text-[var(--color-cream)] border-y border-[var(--color-blood)]'
      : variant === 'bubble'
        ? 'bg-[var(--color-bubble)] text-[var(--color-ink)] border-y border-[var(--color-bubble)]'
        : variant === 'outline'
          ? 'bg-transparent text-[var(--color-cream)] border-y border-[var(--color-cream-100)]'
          : 'bg-[var(--color-cream)] text-[var(--color-ink)] border-y border-[var(--color-cream)]';

  const sizing = dense
    ? 'py-2 text-[clamp(0.85rem,1.2vw,1rem)]'
    : 'py-5 text-[clamp(1.25rem,2.4vw,2.25rem)]';

  return (
    <div className={`relative w-full overflow-hidden ${bg} ${sizing}`}>
      <motion.div
        className="flex whitespace-nowrap font-[var(--font-display)] font-[500] tracking-[-0.01em]"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
        aria-hidden="true"
      >
        <MarqueeBlock />
        <MarqueeBlock />
      </motion.div>
      <span className="sr-only">NACKS GALERIE — Sarcelles — Paris — Los Angeles — depuis 2022.</span>
    </div>
  );
}

function MarqueeBlock() {
  return (
    <div className="flex flex-shrink-0 items-center gap-10 px-10">
      {TOKENS.map((token, i) => (
        <span
          key={i}
          className={
            token === '✦' || token === '·'
              ? 'opacity-60'
              : 'hover:text-[var(--color-blood)] transition-colors'
          }
        >
          {token}
        </span>
      ))}
    </div>
  );
}
