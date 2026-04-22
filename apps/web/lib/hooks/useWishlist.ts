'use client';

import { useCallback, useEffect, useState } from 'react';

const KEY = 'nacks:wishlist';
const EVENT = 'nacks:wishlist-change';

function readStore(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return new Set();
    return new Set(arr.filter((x) => typeof x === 'string'));
  } catch {
    return new Set();
  }
}

function writeStore(set: Set<string>): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify([...set]));
  window.dispatchEvent(new CustomEvent(EVENT));
}

/**
 * Wishlist persistante localStorage, synchronisée entre composants
 * via CustomEvent 'nacks:wishlist-change'.
 */
export function useWishlist() {
  const [slugs, setSlugs] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSlugs(readStore());
    setHydrated(true);
    const onChange = () => setSlugs(readStore());
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setSlugs(readStore());
    };
    window.addEventListener(EVENT, onChange);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const toggle = useCallback((slug: string) => {
    const next = new Set(readStore());
    if (next.has(slug)) next.delete(slug);
    else next.add(slug);
    writeStore(next);
    setSlugs(next);
  }, []);

  const has = useCallback((slug: string) => slugs.has(slug), [slugs]);

  const clear = useCallback(() => {
    writeStore(new Set());
    setSlugs(new Set());
  }, []);

  return { slugs: [...slugs], has, toggle, clear, count: slugs.size, hydrated };
}
