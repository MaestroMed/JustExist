'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Container } from '@nacks/ui';
import { useCounter, formatCompact } from '@/lib/hooks/useCounter';
import { nacks } from '@/lib/content/nacks';

/**
 * SCÈNE 6 — Le Nacks Show.
 * Cadre TV vintage SVG, contenu player placeholder (pas de vidéo Sprint 1),
 * promesse à droite + compteurs live (animés au scroll in view).
 */
export function NacksShow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section
      ref={ref}
      className="relative bg-[var(--color-cream)] py-[var(--spacing-section)] text-[var(--color-ink)]"
    >
      <Container size="full">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* TV vintage frame */}
          <div className="relative mx-auto w-full max-w-[600px]">
            <VintageTV>
              {/* Contenu player : placeholder Nacks Show */}
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[var(--color-ink)]">
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(circle at 30% 30%, rgba(230,57,70,0.3), transparent 40%), radial-gradient(circle at 70% 60%, rgba(30,64,175,0.3), transparent 40%)',
                  }}
                  animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                  transition={{ duration: 15, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
                />
                {/* Scanlines */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-30"
                  style={{
                    background:
                      'repeating-linear-gradient(0deg, rgba(0,0,0,0) 0, rgba(0,0,0,0) 2px, rgba(0,0,0,0.25) 2px, rgba(0,0,0,0.25) 3px)',
                  }}
                />
                <div className="relative z-10 flex flex-col items-center gap-4 px-8 text-center text-[var(--color-cream)]">
                  <motion.span
                    className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-blood)]"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    ● En direct
                  </motion.span>
                  <p
                    className="font-[var(--font-display)] font-[500] leading-[1] tracking-[-0.02em]"
                    style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
                  >
                    Nacks Show #473
                  </p>
                  <p className="font-[var(--font-body)] text-sm text-[var(--color-cream-600)]">
                    Un mardi soir dans l'atelier, avec La Voix Off.
                  </p>
                  <span className="font-[var(--font-mono)] text-xs text-[var(--color-cream-400)]">
                    [ lecture bientôt ]
                  </span>
                </div>
              </div>
            </VintageTV>
          </div>

          {/* Promesse + compteurs */}
          <div className="flex flex-col gap-10">
            <div>
              <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-ink-600)]">
                Chaque soir
              </p>
              <h2
                className="mt-4 font-[var(--font-display)] font-[500] leading-[0.95] tracking-[-0.03em] text-balance"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
              >
                Des centaines de prénoms sur un mur. Rejoins-les.
              </h2>
              <p className="mt-6 max-w-xl font-[var(--font-body)] text-base text-[var(--color-ink-600)]">
                Le Nacks Show, c'est un rendez-vous quotidien avec ma communauté. Chaque soir, un nouveau prénom
                écrit au Posca. Chaque soir, une œuvre qui prend forme. Tu peux regarder, participer, rejoindre.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 border-t border-[var(--color-ink-100)] pt-10">
              <SocialCounter
                target={nacks.social.tiktok.followers}
                label="TikTok"
                handle={nacks.social.tiktok.handle}
                url={nacks.social.tiktok.url}
                inView={inView}
              />
              <SocialCounter
                target={nacks.social.instagram.followers}
                label="Instagram"
                handle={nacks.social.instagram.handle}
                url={nacks.social.instagram.url}
                inView={inView}
              />
              <SocialCounter
                target={nacks.social.youtube.followers}
                label="YouTube"
                handle={nacks.social.youtube.handle}
                url={nacks.social.youtube.url}
                inView={inView}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function VintageTV({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative aspect-[5/4] w-full">
      {/* Cadre TV */}
      <svg
        viewBox="0 0 500 400"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="tv-shell" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#2a2a2a" />
            <stop offset="1" stopColor="#0A0A0A" />
          </linearGradient>
        </defs>
        {/* Corps TV */}
        <rect x="10" y="10" width="480" height="340" rx="20" fill="url(#tv-shell)" />
        {/* Écran */}
        <rect x="40" y="40" width="420" height="280" rx="14" fill="#000" />
        {/* Pieds */}
        <rect x="100" y="350" width="30" height="30" fill="#2a2a2a" />
        <rect x="370" y="350" width="30" height="30" fill="#2a2a2a" />
        {/* Bouton */}
        <circle cx="450" cy="335" r="5" fill="#E63946" />
      </svg>
      {/* Contenu écran */}
      <div
        className="absolute overflow-hidden rounded-[14px]"
        style={{ left: '8%', top: '10%', right: '8%', bottom: '20%' }}
      >
        {children}
      </div>
    </div>
  );
}

function SocialCounter({
  target,
  label,
  handle,
  url,
  inView,
}: {
  target: number;
  label: string;
  handle: string;
  url: string;
  inView: boolean;
}) {
  const { ref, value } = useCounter(inView ? target : 0);
  return (
    <a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={url}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col gap-1 transition-opacity hover:opacity-80"
      data-cursor="link"
      data-cursor-label="Suivre"
    >
      <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.3em] text-[var(--color-ink-600)]">
        {label}
      </span>
      <span className="font-[var(--font-display)] text-3xl font-[500] tabular-nums tracking-[-0.02em] md:text-4xl">
        {formatCompact(value)}
      </span>
      <span className="font-[var(--font-mono)] text-xs text-[var(--color-ink-600)]">
        {handle}
      </span>
    </a>
  );
}
