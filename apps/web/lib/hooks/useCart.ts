'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { getArtwork, type Artwork } from '@/lib/content/artworks';

const KEY = 'nacks:cart';
const EVENT = 'nacks:cart-change';

export type CartLine = {
  handle: string;
  qty: number;
};

export type CartItem = {
  handle: string;
  qty: number;
  artwork: Artwork;
};

type CartShape = { items: CartLine[] };

function readStore(): CartShape {
  if (typeof window === 'undefined') return { items: [] };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed === 'object' &&
      Array.isArray(parsed.items)
    ) {
      const cleaned = parsed.items
        .filter(
          (it: unknown): it is CartLine =>
            typeof it === 'object' &&
            it !== null &&
            typeof (it as CartLine).handle === 'string' &&
            typeof (it as CartLine).qty === 'number',
        )
        .map((it: CartLine) => ({
          handle: it.handle,
          qty: Math.max(1, Math.min(99, Math.floor(it.qty))),
        }));
      return { items: cleaned };
    }
    return { items: [] };
  } catch {
    return { items: [] };
  }
}

function writeStore(cart: CartShape): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent(EVENT));
}

/**
 * Hydrate les lignes du panier (handle → CartItem complet) en gardant
 * uniquement les artworks qui existent encore dans le catalogue.
 */
function hydrate(lines: CartLine[]): CartItem[] {
  const out: CartItem[] = [];
  for (const line of lines) {
    const artwork = getArtwork(line.handle);
    if (!artwork) continue;
    out.push({ handle: line.handle, qty: line.qty, artwork });
  }
  return out;
}

/**
 * Cart store — persiste localStorage `nacks:cart`,
 * synchronise tous les composants via CustomEvent `nacks:cart-change`.
 *
 * Format storage : `{ items: [{ handle, qty }] }`
 *
 * Expose :
 * - items : CartItem[] hydratés (avec artwork)
 * - subtotal : somme des prix × qté en cents
 * - count : nombre total d'articles (sum qty)
 * - addItem / updateQty / removeItem / clear
 * - hydrated : true après le mount client (évite mismatch SSR)
 */
export function useCart() {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLines(readStore().items);
    setHydrated(true);
    const onChange = () => setLines(readStore().items);
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setLines(readStore().items);
    };
    window.addEventListener(EVENT, onChange);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const items = useMemo<CartItem[]>(() => hydrate(lines), [lines]);

  const subtotal = useMemo(
    () => items.reduce((acc, it) => acc + it.artwork.priceCents * it.qty, 0),
    [items],
  );

  const count = useMemo(
    () => items.reduce((acc, it) => acc + it.qty, 0),
    [items],
  );

  const addItem = useCallback((handle: string, qty: number = 1) => {
    const cart = readStore();
    const existing = cart.items.find((it) => it.handle === handle);
    if (existing) {
      existing.qty = Math.min(99, existing.qty + qty);
    } else {
      cart.items.push({ handle, qty: Math.max(1, Math.min(99, qty)) });
    }
    writeStore(cart);
  }, []);

  const updateQty = useCallback((handle: string, qty: number) => {
    const cart = readStore();
    if (qty <= 0) {
      cart.items = cart.items.filter((it) => it.handle !== handle);
    } else {
      const target = cart.items.find((it) => it.handle === handle);
      if (target) {
        target.qty = Math.max(1, Math.min(99, Math.floor(qty)));
      }
    }
    writeStore(cart);
  }, []);

  const removeItem = useCallback((handle: string) => {
    const cart = readStore();
    cart.items = cart.items.filter((it) => it.handle !== handle);
    writeStore(cart);
  }, []);

  const clear = useCallback(() => {
    writeStore({ items: [] });
  }, []);

  return {
    items,
    lines,
    subtotal,
    count,
    addItem,
    updateQty,
    removeItem,
    clear,
    hydrated,
  };
}
