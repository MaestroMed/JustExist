'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { ArtPoster } from '@/components/art/ArtPoster';

const PAPER = '#fafafa';

type Variant =
  | 'poppy-neon'
  | 'poppy-classic'
  | 'gorille-gold'
  | 'fox-paris'
  | 'lion-eiffel'
  | 'poster-abstract-1'
  | 'poster-abstract-2'
  | 'figurine-mr-poppy';

type Props = {
  variant: Variant;
  title: string;
};

/**
 * Galerie produit — DA premium gallery (Zwirner / Hermès).
 * Image principale grande, thumbnails sous, fade transition au switch,
 * subtle hover scale. Background paper pour mettre l'œuvre en valeur.
 */
export function PDPGallery({ variant, title }: Props) {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const views = [
    { id: 'full', label: 'Vue complète', suffix: '' },
    { id: 'detail', label: 'Détail', suffix: ' — détail' },
    { id: 'context', label: 'Accroché', suffix: ' — contexte' },
    { id: 'signature', label: 'Signature', suffix: ' — signature' },
  ] as const;

  const current = views[active] ?? views[0];

  return (
    <div
      ref={ref}
      className="flex flex-col"
      style={{ gap: 'clamp(1rem, 1.6vh, 1.5rem)' }}
    >
      {/* ── Image principale ── */}
      <motion.div
        initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
        animate={
          reduced || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }
        }
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="pdp-media relative overflow-hidden"
        style={{
          aspectRatio: '4 / 5',
          backgroundColor: PAPER,
          border: '1px solid rgba(10,10,10,0.06)',
          boxShadow:
            '0 1px 2px rgba(10,10,10,0.04), 0 30px 60px -40px rgba(10,10,10,0.18)',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="pdp-media-inner absolute inset-0"
          >
            <ArtPoster
              variant={variant}
              label={`${title}${current.suffix}`}
              className="absolute inset-0"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ── Thumbnails ── */}
      <motion.div
        initial={reduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
        animate={
          reduced || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
        }
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-4"
        style={{ gap: 'clamp(0.5rem, 1vw, 0.75rem)' }}
      >
        {views.map((v, i) => {
          const isActive = i === active;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Voir ${v.label}`}
              aria-pressed={isActive}
              className="pdp-thumb relative overflow-hidden"
              data-cursor="image"
              data-cursor-label={v.label}
              style={{
                aspectRatio: '1 / 1',
                backgroundColor: PAPER,
                border: isActive
                  ? '1px solid rgba(10,10,10,0.85)'
                  : '1px solid rgba(10,10,10,0.08)',
                opacity: isActive ? 1 : 0.62,
                transition:
                  'opacity 320ms ease, border-color 320ms ease',
                cursor: 'pointer',
              }}
            >
              <ArtPoster
                variant={variant}
                label={`${title} — ${v.label}`}
                className="absolute inset-0"
              />
            </button>
          );
        })}
      </motion.div>

      <style>{`
        .pdp-thumb:hover {
          opacity: 1 !important;
          border-color: rgba(10,10,10,0.4) !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .pdp-media-inner { transition: none !important; }
        }
      `}</style>
    </div>
  );
}
