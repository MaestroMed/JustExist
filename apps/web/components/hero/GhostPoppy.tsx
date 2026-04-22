'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useEffect } from 'react';

/**
 * Silhouette Mr Poppy en arrière-plan du hero — translucide, énorme,
 * suit le curseur avec un damping fort (mouvement cinéma).
 * Respecte prefers-reduced-motion (static si reduce).
 */
export function GhostPoppy() {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 40, damping: 40, mass: 1.2 });
  const y = useSpring(rawY, { stiffness: 40, damping: 40, mass: 1.2 });
  const tx = useTransform(x, [-0.5, 0.5], [-40, 40]);
  const ty = useTransform(y, [-0.5, 0.5], [-25, 25]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX / window.innerWidth - 0.5);
      rawY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [rawX, rawY]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
      style={{
        x: tx,
        y: ty,
        width: 'min(85vh, 92vw)',
        height: 'min(85vh, 92vw)',
        zIndex: 1,
      }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2.2, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
    >
      <svg
        viewBox="0 0 800 800"
        className="h-full w-full"
        style={{ filter: 'blur(0.3px)' }}
      >
        <defs>
          <radialGradient id="ghost-poppy-grad" cx="0.5" cy="0.45" r="0.55">
            <stop offset="0" stopColor="#F5F1E8" stopOpacity="0.08" />
            <stop offset="0.55" stopColor="#F5F1E8" stopOpacity="0.04" />
            <stop offset="1" stopColor="#F5F1E8" stopOpacity="0" />
          </radialGradient>
          <filter id="ghost-soft">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
        </defs>

        {/* Halo diffus */}
        <circle cx="400" cy="360" r="360" fill="url(#ghost-poppy-grad)" />

        {/* Oreilles */}
        <g fill="#F5F1E8" fillOpacity="0.07" filter="url(#ghost-soft)">
          <circle cx="235" cy="165" r="85" />
          <circle cx="565" cy="165" r="85" />
        </g>

        {/* Tête */}
        <circle cx="400" cy="360" r="200" fill="#F5F1E8" fillOpacity="0.08" filter="url(#ghost-soft)" />

        {/* X yeux — rouge translucide */}
        <g stroke="#E63946" strokeWidth="12" strokeLinecap="round" strokeOpacity="0.25">
          <line x1="310" y1="300" x2="370" y2="360" />
          <line x1="370" y1="300" x2="310" y2="360" />
          <line x1="430" y1="300" x2="490" y2="360" />
          <line x1="490" y1="300" x2="430" y2="360" />
        </g>

        {/* Nez */}
        <ellipse cx="400" cy="400" rx="22" ry="14" fill="#F5F1E8" fillOpacity="0.12" />

        {/* Museau */}
        <ellipse cx="400" cy="430" rx="90" ry="60" fill="#F5F1E8" fillOpacity="0.05" filter="url(#ghost-soft)" />

        {/* Marinière lines diffuses */}
        <g stroke="#F5F1E8" strokeWidth="2" strokeOpacity="0.05">
          <line x1="150" y1="605" x2="650" y2="605" />
          <line x1="165" y1="625" x2="635" y2="625" />
          <line x1="180" y1="645" x2="620" y2="645" />
          <line x1="195" y1="665" x2="605" y2="665" />
        </g>
      </svg>
    </motion.div>
  );
}
