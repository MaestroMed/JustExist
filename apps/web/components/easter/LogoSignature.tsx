'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useLongPress } from '@/lib/hooks/useLongPress';
import { fireEasterEgg } from './EasterEggsProvider';

/**
 * Wraps le logo NACKS en nav :
 * - clic normal → /
 * - clic maintenu 3s → déclenche une animation signature plein écran pendant 8s + toast
 */
export function LogoSignature({ children }: { children: React.ReactNode }) {
  const [showSig, setShowSig] = useState(false);

  const handlers = useLongPress(() => {
    setShowSig(true);
    fireEasterEgg({
      title: 'Signature secrète activée',
      body: "J'ai signé ta session. Garde-la en souvenir.",
    });
    window.setTimeout(() => setShowSig(false), 8000);
  }, 3000);

  return (
    <>
      <span {...handlers} style={{ display: 'inline-block' }}>
        {children}
      </span>
      <AnimatePresence>
        {showSig && (
          <motion.div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[var(--z-modal)] flex items-center justify-center mix-blend-difference"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            transition={{ duration: 0.3 }}
          >
            <svg viewBox="0 0 1200 400" className="w-[90vw] max-w-[1000px]" fill="none">
              <motion.path
                d="M 80 280 C 120 100, 240 260, 280 200 S 400 100, 500 240 T 700 180 Q 800 120, 900 260 T 1100 200 Q 1150 180, 1150 150"
                stroke="#F5F1E8"
                strokeWidth="8"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 5, ease: [0.19, 1, 0.22, 1] }}
              />
              <motion.circle
                cx={1155}
                cy={148}
                r={10}
                fill="#F5F1E8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 5.2, duration: 0.4 }}
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
