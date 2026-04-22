'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Container } from '@nacks/ui';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

/**
 * Error boundary — page 500 stylisée, même DA que le 404.
 * Envoie l'erreur en console (+ Sentry quand câblé).
 */
export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error('[nacks] route error:', error);
  }, [error]);

  return (
    <main className="grain relative flex min-h-[100svh] items-center bg-[var(--color-ink)] text-[var(--color-cream)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(230,57,70,0.12), transparent 60%)',
        }}
      />

      <Container size="content" className="relative z-10 flex flex-col items-center gap-8 text-center">
        <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-blood)]">
          Erreur 500 · quelque chose s'est cassé
        </p>
        <h1
          className="font-[var(--font-display)] font-[500] leading-[0.9] tracking-[-0.035em]"
          style={{ fontSize: 'clamp(2.5rem, 9vw, 7rem)' }}
        >
          La peinture<br />
          <span className="text-[var(--color-blood)]">n'a pas tenu.</span>
        </h1>
        <p className="max-w-xl font-[var(--font-body)] text-base text-[var(--color-cream-600)]">
          Une erreur inattendue s'est produite. Rien d'irréversible. Essaie de recharger — si ça continue,
          écris-moi, je veux savoir.
        </p>

        {error.digest && (
          <p className="rounded border border-[var(--color-cream-100)] bg-[var(--color-cream-100)]/10 px-4 py-2 font-[var(--font-mono)] text-[10px] tracking-[0.05em] text-[var(--color-cream-600)]">
            Référence :{' '}
            <span className="text-[var(--color-cream)]">{error.digest}</span>
          </p>
        )}

        <div className="mt-4 flex flex-col gap-3 md:flex-row md:gap-4">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 bg-[var(--color-cream)] px-8 py-3 font-[var(--font-display)] text-sm uppercase tracking-[0.2em] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-blood)] hover:text-[var(--color-cream)]"
            data-cursor="link"
            data-cursor-label="Retenter"
          >
            Retenter
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-[var(--color-cream)] px-8 py-3 font-[var(--font-display)] text-sm uppercase tracking-[0.2em] text-[var(--color-cream)] transition-colors hover:bg-[var(--color-cream)] hover:text-[var(--color-ink)]"
            data-cursor="link"
          >
            Retourner à l'accueil
          </Link>
          <a
            href={`mailto:contact@nacksgalerie.com?subject=${encodeURIComponent('Erreur 500 — ' + (error.digest ?? ''))}&body=${encodeURIComponent("Salut Nacks,\n\nJ'ai eu une erreur 500.\n" + (error.digest ? `Référence : ${error.digest}\n` : '') + "\n")}`}
            className="inline-flex items-center justify-center gap-2 font-[var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--color-cream-600)] transition-colors hover:text-[var(--color-cream)]"
            data-cursor="link"
          >
            Prévenir Nacks →
          </a>
        </div>
      </Container>
    </main>
  );
}
