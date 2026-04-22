'use client';

import { useEffect, useRef } from 'react';

const SEQUENCE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

export function useKonami(onUnlock: () => void) {
  const indexRef = useRef(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const expected = SEQUENCE[indexRef.current];
      if (!expected) return;
      const got = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (got === expected) {
        indexRef.current++;
        if (indexRef.current === SEQUENCE.length) {
          indexRef.current = 0;
          onUnlock();
        }
      } else {
        indexRef.current = 0;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onUnlock]);
}
