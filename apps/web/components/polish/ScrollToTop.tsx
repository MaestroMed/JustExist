'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

/**
 * Scroll top sur changement de pathname — scroll natif + Lenis si dispo.
 * Ignore les changements de hash (on veut que /drops#live scrolle à l'ancre).
 */
export function ScrollToTop() {
  const pathname = usePathname();
  const prev = useRef<string>(pathname);

  useEffect(() => {
    if (prev.current === pathname) return;
    prev.current = pathname;
    // Lenis instance if running
    const lenis = (window as unknown as { __lenis?: { scrollTo: (v: number, o?: unknown) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [pathname]);

  return null;
}
