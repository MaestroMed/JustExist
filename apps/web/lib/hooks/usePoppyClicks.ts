'use client';

import { useCallback, useEffect, useState } from 'react';

const KEY = 'nacks:poppy-clicks';
const THRESHOLD = 40;

/**
 * Compteur cumulé de clics sur Mr Poppy (persistant sessionStorage).
 * Passé 40, déclenche onUnlock et reset.
 */
export function usePoppyClicks(onUnlock: () => void) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = Number(sessionStorage.getItem(KEY) ?? '0');
    setCount(Number.isFinite(stored) ? stored : 0);
  }, []);

  const tap = useCallback(() => {
    setCount((prev) => {
      const next = prev + 1;
      if (typeof window !== 'undefined') sessionStorage.setItem(KEY, String(next));
      if (next >= THRESHOLD) {
        if (typeof window !== 'undefined') sessionStorage.setItem(KEY, '0');
        onUnlock();
        return 0;
      }
      return next;
    });
  }, [onUnlock]);

  return { count, tap, threshold: THRESHOLD };
}
