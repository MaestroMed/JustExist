'use client';

import { motion } from 'motion/react';
import { useWishlist } from '@/lib/hooks/useWishlist';

type Props = {
  slug: string;
  label?: string;
  className?: string;
};

/**
 * Bouton cœur wishlist — toggle l'œuvre dans la wishlist localStorage.
 * Animation scale + fill quand on ajoute.
 */
export function WishlistButton({ slug, label = "Ajouter à la wishlist", className = '' }: Props) {
  const { has, toggle, hydrated } = useWishlist();
  const active = hydrated && has(slug);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      aria-pressed={active}
      aria-label={active ? `Retirer de la wishlist` : label}
      className={`group relative flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-cream-200)] bg-[var(--color-ink)]/60 text-[var(--color-cream)] backdrop-blur transition-colors hover:border-[var(--color-blood)] ${className}`}
      data-cursor="link"
      data-cursor-label={active ? 'Retirer' : 'Ajouter'}
      data-no-ripple=""
    >
      <motion.svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={active ? 'var(--color-blood)' : 'none'}
        stroke={active ? 'var(--color-blood)' : 'currentColor'}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        animate={{ scale: active ? [1, 1.25, 1] : 1 }}
        transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </motion.svg>
    </button>
  );
}
