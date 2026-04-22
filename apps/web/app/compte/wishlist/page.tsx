'use client';

import Link from 'next/link';
import { Container } from '@nacks/ui';
import { PageShell, PageHeader } from '@/components/layouts/PageShell';
import { ArtworkCard } from '@/components/shop/ArtworkCard';
import { useWishlist } from '@/lib/hooks/useWishlist';
import { artworks } from '@/lib/content/artworks';

export default function WishlistPage() {
  const { slugs, clear, count, hydrated } = useWishlist();
  const items = artworks.filter((a) => slugs.includes(a.slug));

  return (
    <PageShell>
      <Container size="full" className="py-20 md:py-24">
        <PageHeader
          eyebrow={hydrated ? `${count} œuvre${count > 1 ? 's' : ''} dans ta wishlist` : 'Ta wishlist'}
          title="Ta wishlist."
          subtitle="Les œuvres que tu gardes sous le coude. Stockées en local dans ton navigateur — pas de serveur, pas de compte requis."
        />

        {!hydrated ? (
          <div className="mt-20 flex h-[40vh] items-center justify-center">
            <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-cream-600)]">
              Chargement…
            </span>
          </div>
        ) : items.length === 0 ? (
          <section className="mt-20 flex flex-col items-start gap-8 rounded-sm border border-[var(--color-cream-100)] p-10 md:p-16">
            <svg
              aria-hidden="true"
              width="72"
              height="72"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-[var(--color-cream-400)]"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <div>
              <h2
                className="font-[var(--font-display)] font-[500] leading-[1] tracking-[-0.02em] text-[var(--color-cream)]"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
              >
                Rien encore.
              </h2>
              <p className="mt-4 max-w-md font-[var(--font-body)] text-base text-[var(--color-cream-600)]">
                Clic sur le petit cœur d'une œuvre pour la garder ici. Aucun compte nécessaire — c'est
                sauvegardé dans ton navigateur. Tu peux la retrouver à chaque visite.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:flex-row">
              <Link
                href="/oeuvres"
                className="inline-flex items-center gap-2 bg-[var(--color-cream)] px-6 py-3 font-[var(--font-display)] text-sm uppercase tracking-[0.2em] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-blood)] hover:text-[var(--color-cream)]"
                data-cursor="link"
              >
                Explorer la galerie →
              </Link>
              <Link
                href="/drops"
                className="inline-flex items-center gap-2 border border-[var(--color-cream)] px-6 py-3 font-[var(--font-display)] text-sm uppercase tracking-[0.2em] text-[var(--color-cream)] transition-colors hover:bg-[var(--color-cream)] hover:text-[var(--color-ink)]"
                data-cursor="link"
              >
                Voir les drops →
              </Link>
            </div>
          </section>
        ) : (
          <>
            <div className="mt-12 flex items-center justify-between border-b border-[var(--color-cream-100)] pb-4">
              <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.25em] text-[var(--color-cream-600)]">
                {items.length} œuvre{items.length > 1 ? 's' : ''}
              </span>
              <button
                type="button"
                onClick={clear}
                className="font-[var(--font-mono)] text-xs uppercase tracking-[0.25em] text-[var(--color-cream-600)] transition-colors hover:text-[var(--color-blood)]"
                data-cursor="link"
                data-no-ripple=""
              >
                Vider la wishlist
              </button>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((a) => (
                <ArtworkCard key={a.slug} artwork={a} />
              ))}
            </div>
          </>
        )}
      </Container>
    </PageShell>
  );
}
