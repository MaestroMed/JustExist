'use client';

import dynamic from 'next/dynamic';

/**
 * PoppyScene dynamic-imported sans SSR.
 * R3F + three ne tournent que côté client (WebGL absent en Node).
 */
export const PoppySceneClient = dynamic(
  () => import('./PoppyScene').then((m) => m.PoppyScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[min(70vh,600px)] w-full items-center justify-center bg-[var(--color-ink)] text-[var(--color-cream-600)]">
        <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em]">
          Chargement de Mr Poppy…
        </span>
      </div>
    ),
  },
);
