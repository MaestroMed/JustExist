'use client';

import { motion } from 'motion/react';
import { useCountdown } from '@/lib/hooks/useCountdown';

type Props = {
  target: Date | string | number;
  size?: 'md' | 'xl';
  label?: string;
};

/**
 * Countdown digital pulsant chaque seconde — JetBrains Mono, tabulaire.
 */
export function Countdown({ target, size = 'xl', label }: Props) {
  const { days, hours, minutes, seconds, isPast } = useCountdown(target);

  if (isPast) {
    return (
      <div className="font-[var(--font-mono)] text-sm uppercase tracking-[0.3em] text-[var(--color-blood)]">
        Drop terminé
      </div>
    );
  }

  const pad = (n: number) => String(n).padStart(2, '0');
  const segments = [
    { label: 'jours', value: pad(days) },
    { label: 'h', value: pad(hours) },
    { label: 'm', value: pad(minutes) },
    { label: 's', value: pad(seconds) },
  ];

  const cellSize = size === 'xl' ? 'text-[clamp(3rem,8vw,6rem)]' : 'text-3xl';
  const labelSize = size === 'xl' ? 'text-[10px]' : 'text-[9px]';

  return (
    <div className="flex flex-col items-center gap-3">
      {label && (
        <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-cream-600)]">
          {label}
        </span>
      )}
      <div className="flex items-baseline gap-3 md:gap-4">
        {segments.map((seg, i) => (
          <div key={seg.label} className="flex items-baseline gap-3 md:gap-4">
            <div className="flex flex-col items-center gap-1">
              <motion.span
                key={seg.value}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                className={`${cellSize} font-[var(--font-mono)] font-[500] tabular-nums leading-[0.9] text-[var(--color-cream)]`}
              >
                {seg.value}
              </motion.span>
              <span
                className={`${labelSize} font-[var(--font-mono)] uppercase tracking-[0.25em] text-[var(--color-cream-600)]`}
              >
                {seg.label}
              </span>
            </div>
            {i < segments.length - 1 && (
              <span className={`${cellSize} font-[var(--font-mono)] leading-[0.9] text-[var(--color-cream-200)]`}>
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
