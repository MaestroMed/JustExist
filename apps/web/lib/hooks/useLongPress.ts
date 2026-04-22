'use client';

import { useCallback, useRef } from 'react';

/**
 * Détecte un clic maintenu > threshold ms.
 * Usage : <button {...useLongPress(onUnlock, 3000)}>...</button>
 */
export function useLongPress(onFire: () => void, thresholdMs = 3000) {
  const timerRef = useRef<number | null>(null);

  const start = useCallback(() => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      onFire();
      timerRef.current = null;
    }, thresholdMs);
  }, [onFire, thresholdMs]);

  const cancel = useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  return {
    onMouseDown: start,
    onTouchStart: start,
    onMouseUp: cancel,
    onMouseLeave: cancel,
    onTouchEnd: cancel,
    onTouchCancel: cancel,
  };
}
