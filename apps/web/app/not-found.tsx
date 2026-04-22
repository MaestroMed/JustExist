'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from '@nacks/ui';

const LOST_LINES = [
  "Il n'y a rien ici.",
  'Pas encore, en tout cas.',
  "Si tu pensais que ça existait, peut-être que c'est à venir.",
];

export default function NotFound() {
  const [path, setPath] = useState<string>('');
  const pathname = usePathname();

  useEffect(() => {
    setPath(typeof window !== 'undefined' ? window.location.pathname : pathname);
  }, [pathname]);

  const mailBody = encodeURIComponent(
    `Salut Nacks,\n\nJ'ai tapé l'URL suivante et elle n'existe pas :\n${path || '(inconnue)'}\n\nJe pensais trouver…\n\n`,
  );

  return (
    <main className="grain relative flex min-h-[100svh] items-center bg-[var(--color-ink)] text-[var(--color-cream)]">
      {/* Halo rouge subtil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(230,57,70,0.08), transparent 60%)',
        }}
      />
      <Container size="content" className="relative z-10 flex flex-col items-center gap-8 text-center">
        <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-blood)]">
          Erreur 404 · page introuvable
        </p>
        <h1
          className="font-[var(--font-display)] font-[500] leading-[0.9] tracking-[-0.035em]"
          style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
        >
          Cette toile
          <br />
          <span className="text-[var(--color-blood)]">n'existe pas.</span>
        </h1>
        <div className="flex max-w-xl flex-col gap-2 font-[var(--font-body)] text-base text-[var(--color-cream-600)]">
          {LOST_LINES.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        {path && (
          <p className="rounded border border-[var(--color-cream-100)] bg-[var(--color-cream-100)]/20 px-4 py-2 font-[var(--font-mono)] text-xs tracking-[0.05em] text-[var(--color-cream-600)]">
            <span className="text-[var(--color-cream-400)]">URL demandée : </span>
            <span className="text-[var(--color-cream)]">{path}</span>
          </p>
        )}

        <div className="mt-4 flex flex-col gap-3 md:flex-row md:gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-[var(--color-cream)] px-8 py-3 font-[var(--font-display)] text-sm uppercase tracking-[0.2em] transition-colors hover:bg-[var(--color-cream)] hover:text-[var(--color-ink)]"
            data-cursor="link"
            data-cursor-label="Maison"
          >
            Retourner dans le monde
          </Link>
          <a
            href={`mailto:contact@nacksgalerie.com?subject=URL%20introuvable&body=${mailBody}`}
            className="inline-flex items-center justify-center gap-2 border border-[var(--color-blood)] bg-[var(--color-blood)] px-8 py-3 font-[var(--font-display)] text-sm uppercase tracking-[0.2em] text-[var(--color-cream)] transition-opacity hover:opacity-90"
            data-cursor="link"
            data-cursor-label="Écrire"
          >
            Demander à Nacks
          </a>
        </div>

        <p className="mt-8 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.25em] text-[var(--color-cream-400)]">
          Appuie sur <kbd className="rounded border border-[var(--color-cream-200)] px-1.5 py-0.5">⌘ K</kbd> pour chercher
        </p>
      </Container>
    </main>
  );
}
