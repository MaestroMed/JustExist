'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
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
    <main className="grain relative flex min-h-[100svh] items-center overflow-hidden bg-[var(--color-ink)] text-[var(--color-cream)]">
      {/* Halo rouge subtil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(230,57,70,0.1), transparent 60%)',
        }}
      />

      {/* Mr Poppy cherchant — silhouette translucide */}
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 400 400"
        className="pointer-events-none absolute -right-20 -bottom-20 h-[min(70vh,520px)] w-[min(70vh,520px)] opacity-[0.08] md:right-10 md:bottom-10"
        initial={{ opacity: 0, x: 100, rotate: -10 }}
        animate={{ opacity: 0.08, x: 0, rotate: 0 }}
        transition={{ duration: 1.6, ease: [0.19, 1, 0.22, 1] }}
      >
        {/* Oreilles */}
        <circle cx="125" cy="95" r="45" fill="#F5F1E8" />
        <circle cx="275" cy="95" r="45" fill="#F5F1E8" />
        {/* Tête */}
        <circle cx="200" cy="170" r="110" fill="#F5F1E8" />
        {/* Museau */}
        <ellipse cx="200" cy="200" rx="55" ry="35" fill="#0A0A0A" opacity={0.3} />
        {/* Nez */}
        <ellipse cx="200" cy="185" rx="12" ry="8" fill="#0A0A0A" />
        {/* X yeux — perdus, regardent de travers */}
        <g stroke="#E63946" strokeWidth="9" strokeLinecap="round" strokeOpacity="0.8">
          <line x1="145" y1="135" x2="175" y2="165" />
          <line x1="175" y1="135" x2="145" y2="165" />
          <line x1="225" y1="135" x2="255" y2="165" />
          <line x1="255" y1="135" x2="225" y2="165" />
        </g>
        {/* Loupe dans la patte */}
        <g transform="translate(310 240)">
          <circle cx="0" cy="0" r="32" fill="none" stroke="#F5F1E8" strokeWidth="8" />
          <line x1="22" y1="22" x2="48" y2="48" stroke="#F5F1E8" strokeWidth="8" strokeLinecap="round" />
        </g>
        {/* Point d'interrogation flottant */}
        <motion.text
          x="280"
          y="100"
          fontFamily="Space Grotesk, sans-serif"
          fontWeight={700}
          fontSize="60"
          fill="#E63946"
          opacity={0.6}
          animate={{ y: [100, 90, 100] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          ?
        </motion.text>
      </motion.svg>

      <Container size="content" className="relative z-10 flex flex-col items-center gap-8 text-center">
        <motion.p
          className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-blood)]"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Erreur 404 · page introuvable
        </motion.p>
        <motion.h1
          className="font-[var(--font-display)] font-[500] leading-[0.9] tracking-[-0.035em]"
          style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
        >
          Cette toile
          <br />
          <span className="text-[var(--color-blood)]">n'existe pas.</span>
        </motion.h1>
        <motion.div
          className="flex max-w-xl flex-col gap-2 font-[var(--font-body)] text-base text-[var(--color-cream-600)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {LOST_LINES.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
          <p className="mt-2 text-sm italic opacity-80">
            Mr Poppy cherche la page avec sa loupe. Il trouve pas.
          </p>
        </motion.div>

        {path && (
          <motion.p
            className="rounded border border-[var(--color-cream-100)] bg-[var(--color-cream-100)]/20 px-4 py-2 font-[var(--font-mono)] text-xs tracking-[0.05em] text-[var(--color-cream-600)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <span className="text-[var(--color-cream-400)]">URL demandée : </span>
            <span className="text-[var(--color-cream)]">{path}</span>
          </motion.p>
        )}

        <motion.div
          className="mt-4 flex flex-col gap-3 md:flex-row md:gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
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
        </motion.div>

        <motion.p
          className="mt-8 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.25em] text-[var(--color-cream-400)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          Appuie sur{' '}
          <kbd className="rounded border border-[var(--color-cream-200)] px-1.5 py-0.5">⌘ K</kbd>{' '}
          pour chercher
        </motion.p>
      </Container>
    </main>
  );
}
