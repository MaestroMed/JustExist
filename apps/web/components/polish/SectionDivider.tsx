'use client';

import { motion } from 'motion/react';

type Props = {
  label?: string;
  accent?: 'blood' | 'bubble' | 'acid' | 'cyan' | 'luxe';
  className?: string;
};

const ACCENT: Record<NonNullable<Props['accent']>, string> = {
  blood: 'var(--color-blood)',
  bubble: 'var(--color-bubble)',
  acid: 'var(--color-acid)',
  cyan: 'var(--color-cyan)',
  luxe: 'var(--color-luxe)',
};

/**
 * Séparateur éditorial entre sections — trait + petit dot + label optionnel.
 * Se dessine au scroll-in-view, sert de respiration entre scènes denses.
 */
export function SectionDivider({ label, accent = 'blood', className = '' }: Props) {
  const color = ACCENT[accent];
  return (
    <div
      className={`relative flex items-center justify-center gap-4 py-10 md:py-14 ${className}`}
      aria-hidden="true"
    >
      <motion.span
        className="h-px origin-right"
        style={{ backgroundColor: color, width: 'min(30vw, 220px)' }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '0px 0px -20% 0px' }}
        transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
      />
      <motion.span
        className="block h-2 w-2 rounded-full"
        style={{ backgroundColor: color }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '0px 0px -20% 0px' }}
        transition={{ duration: 0.5, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
      />
      {label && (
        <motion.span
          className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.35em] text-[var(--color-cream-600)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {label}
        </motion.span>
      )}
      <motion.span
        className="block h-2 w-2 rounded-full"
        style={{ backgroundColor: color }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '0px 0px -20% 0px' }}
        transition={{ duration: 0.5, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
      />
      <motion.span
        className="h-px origin-left"
        style={{ backgroundColor: color, width: 'min(30vw, 220px)' }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '0px 0px -20% 0px' }}
        transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
      />
    </div>
  );
}
