'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Container } from '@nacks/ui';
import { characters } from '@/lib/content/characters';
import { CharacterPortrait } from '@/components/art/CharacterPortrait';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * SCÈNE 5 — L'Univers (scrollytelling horizontal pinned).
 * La section pin pendant que les personnages défilent horizontalement.
 * Les fonds transitionnent couleur à couleur (Poppy bleu → Gorille or → Renard crème → Lion jaune).
 */
export function UniversHorizontal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !trackRef.current) return;
      const track = trackRef.current;
      const panels = gsap.utils.toArray<HTMLElement>('.universe-panel', track);

      const scrollTween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth) + 'px',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => '+=' + (track.scrollWidth - window.innerWidth),
          invalidateOnRefresh: true,
        },
      });

      // Révèle chaque panel quand il atteint le centre
      panels.forEach((panel) => {
        const reveals = panel.querySelectorAll<HTMLElement>('[data-reveal]');
        gsap.fromTo(
          reveals,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: 'left center',
              end: 'right center',
              toggleActions: 'play reverse play reverse',
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--color-ink)] text-[var(--color-cream)]"
      style={{ height: '100vh' }}
      aria-label="Univers des personnages"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-8 z-10 -translate-x-1/2 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.3em] text-[var(--color-cream-600)]"
      >
        Univers · 4 personnages
      </div>

      <div
        ref={trackRef}
        className="flex h-full"
        style={{ width: `${characters.length * 100}vw`, willChange: 'transform' }}
      >
        {characters.map((c, i) => (
          <UniversePanel
            key={c.slug}
            slug={c.slug}
            name={c.name}
            tagline={c.tagline}
            phrase={c.phrase}
            primaryColor={c.primaryColor}
            accentColor={c.accentColor}
            index={i + 1}
            total={characters.length}
          />
        ))}
      </div>
    </section>
  );
}

function UniversePanel({
  slug,
  name,
  tagline,
  phrase,
  primaryColor,
  accentColor,
  index,
  total,
}: {
  slug: 'mr-poppy' | 'gorille-de-rome' | 'renard-de-paris' | 'lion-d-eiffel';
  name: string;
  tagline: string;
  phrase: string;
  primaryColor: string;
  accentColor: string;
  index: number;
  total: number;
}) {
  return (
    <div
      className="universe-panel relative flex h-full flex-shrink-0 items-center"
      style={{ width: '100vw', backgroundColor: primaryColor }}
    >
      <Container size="full" className="relative z-10 grid h-full items-center gap-10 md:grid-cols-12">
        <div
          data-reveal
          className="z-10 col-span-12 flex flex-col gap-6 md:col-span-5"
        >
          <div className="flex items-center gap-4 font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] opacity-80">
            <span className="tabular-nums">{String(index).padStart(2, '0')}</span>
            <span className="h-px flex-1 bg-current opacity-40" />
            <span className="tabular-nums opacity-60">{String(total).padStart(2, '0')}</span>
          </div>
          <p
            className="font-[var(--font-display)] text-sm uppercase tracking-[0.25em]"
            style={{ color: accentColor }}
          >
            {tagline}
          </p>
          <h3
            className="font-[var(--font-display)] font-[500] leading-[0.92] tracking-[-0.04em]"
            style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', color: 'var(--color-cream)' }}
          >
            {name}
          </h3>
          <p
            className="max-w-md font-[var(--font-body)] text-lg italic opacity-90"
            style={{ color: 'var(--color-cream)' }}
          >
            « {phrase} »
          </p>
          <Link
            href={`/univers/${slug}`}
            className="mt-4 inline-flex w-fit items-center gap-3 border border-current px-6 py-3 font-[var(--font-display)] text-sm uppercase tracking-[0.2em] transition-all hover:bg-[var(--color-cream)] hover:text-[var(--color-ink)]"
            style={{ color: 'var(--color-cream)' }}
            data-cursor="link"
          >
            Entrer dans son univers
            <span>→</span>
          </Link>
        </div>

        <div className="col-span-12 flex items-center justify-center md:col-span-7">
          <div
            data-reveal
            className="relative aspect-square w-full max-w-[min(70vh,600px)]"
          >
            <CharacterPortrait character={slug} className="h-full w-full" />
          </div>
        </div>
      </Container>
    </div>
  );
}
