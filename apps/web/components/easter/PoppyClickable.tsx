'use client';

import { useRef, type ReactNode } from 'react';
import { usePoppyClicks } from '@/lib/hooks/usePoppyClicks';
import { fireEasterEgg } from './EasterEggsProvider';

const PALETTE = ['poppy', 'bubble', 'acid', 'pop', 'cyan', 'luxe', 'fortnite', 'blood'] as const;

/**
 * Wrap une zone cliquable "Mr Poppy". 40 clics cumulés dans la session
 * remplacent la palette de couleurs racine pour la session.
 */
export function PoppyClickable({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { tap, count, threshold } = usePoppyClicks(() => {
    const color = PALETTE[Math.floor(Math.random() * PALETTE.length)] ?? 'blood';
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty(
        '--color-blood',
        getComputedStyle(document.documentElement).getPropertyValue(`--color-${color}`),
      );
    }
    fireEasterEgg({
      title: 'Tu as réveillé Mr Poppy',
      body: `40 caresses et il change de couleur. Sa palette signature devient ${color}.`,
    });
  });

  return (
    <div
      ref={containerRef}
      onClick={tap}
      data-poppy-clicks={count}
      data-poppy-threshold={threshold}
      style={{ cursor: 'pointer' }}
    >
      {children}
    </div>
  );
}
