'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const SESSION_KEY = 'nacks:preloader-seen';

/**
 * Preloader cinématographique — signature NACKS qui se dessine en trait Posca.
 * 2,2 s max. Session flag : ne s'affiche qu'à la première visite.
 * Respecte prefers-reduced-motion (bypass direct).
 */
export function Preloader() {
  const [show, setShow] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const seen = sessionStorage.getItem(SESSION_KEY);
    if (reduced || seen) return;
    setShow(true);
    const t = window.setTimeout(() => {
      setShow(false);
      sessionStorage.setItem(SESSION_KEY, '1');
    }, 2100);
    return () => window.clearTimeout(t);
  }, []);

  if (!hydrated) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9000] flex items-center justify-center bg-[var(--color-ink)]"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.87, 0, 0.13, 1] } }}
        >
          <svg
            viewBox="0 0 900 200"
            className="w-[min(75vw,760px)]"
            fill="none"
          >
            {'NACKS'.split('').map((letter, i) => (
              <motion.text
                key={i}
                x={100 + i * 160}
                y={130}
                fill="#F5F1E8"
                stroke="#F5F1E8"
                strokeWidth="1"
                fontFamily="Space Grotesk, sans-serif"
                fontWeight={700}
                fontSize={160}
                textAnchor="middle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.15 + i * 0.09,
                  duration: 0.5,
                  ease: [0.19, 1, 0.22, 1],
                }}
              >
                {letter}
              </motion.text>
            ))}
            {/* Trait signature rouge sous le wordmark */}
            <motion.path
              d="M 130 165 Q 220 150, 310 165 T 490 165 T 670 165 T 790 160"
              stroke="#E63946"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.9, duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
            />
            {/* Point signature */}
            <motion.circle
              cx="800"
              cy="160"
              r="6"
              fill="#E63946"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.75, duration: 0.25 }}
            />
          </svg>
          {/* Progress line */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-[var(--color-blood)]"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.1, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
