'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Container } from '@nacks/ui';

const LINES = [
  'Je suis de Sarcelles.',
  "J'ai commencé sur les murs.",
  'Puis devant une caméra.',
  'Puis dans des galeries.',
  "Je peins les émotions que je n'arrive pas à dire.",
  "Si une de mes œuvres te parle, c'est que tu m'as compris.",
];

/**
 * SCÈNE 2 — Le Manifeste.
 * Chaque ligne révélée ligne par ligne (clip-path wipe), pas char-par-char
 * pour éviter tout break vertical. Simple et robuste.
 */
export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px -20% 0px' });

  return (
    <section
      ref={ref}
      className="relative flex min-h-[80vh] items-center bg-[var(--color-ink)] py-[var(--spacing-section)] text-[var(--color-cream)]"
    >
      <Container size="wide">
        <div className="flex flex-col gap-[0.3em] font-[var(--font-display)] font-[500] leading-[1.05] tracking-[-0.025em]">
          {LINES.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.p
                className="text-[clamp(1.75rem,5vw,4.5rem)] text-balance text-[var(--color-cream)]"
                initial={{ y: '100%', opacity: 0, filter: 'blur(10px)' }}
                animate={
                  inView
                    ? { y: '0%', opacity: 1, filter: 'blur(0px)' }
                    : { y: '100%', opacity: 0, filter: 'blur(10px)' }
                }
                transition={{
                  duration: 0.9,
                  delay: 0.15 + i * 0.12,
                  ease: [0.19, 1, 0.22, 1],
                }}
              >
                {line}
              </motion.p>
            </div>
          ))}
          <motion.p
            className="mt-[1.2em] font-[var(--font-mono)] text-[var(--color-blood)]"
            style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', letterSpacing: '0.02em' }}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ delay: 0.15 + LINES.length * 0.12 + 0.4, duration: 0.6 }}
          >
            — Nacks
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
