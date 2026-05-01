'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

/**
 * HERO CANONIQUE NACKS GALERIE — v6
 *
 * Background = photo /hero/wall.png (mur peint avec X + tags + splashes
 * + headline "L'ART DE LA RUE. À VOTRE MUR." + brass plaque tous bake-in).
 * Plus de SVG fresque ni de headline overlay (doublon).
 *
 * Overlays restants : card NACKS GALERIE + 2 CTAs + AtelierMarker
 * + BottomStrip + h1 sr-only pour SEO/a11y.
 */

const INK = '#0a0a0a';
const PAPER = '#fafafa';

const FONT_SERIF = "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = "var(--font-body, Inter, system-ui, sans-serif)";

export function HeroOpening() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const root = ref.current;
      const reduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const fadeIns = root.querySelectorAll<HTMLElement>('[data-fade]');

      if (reduced) {
        gsap.set(fadeIns, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(fadeIns, { opacity: 0, y: 24 });
      gsap.timeline({ defaults: { ease: 'power3.out' } }).to(
        fadeIns,
        { opacity: 1, y: 0, duration: 0.75, stagger: 0.12 },
        0.4,
      );
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="main-content"
      className="relative w-full overflow-hidden"
      style={{ minHeight: '100svh', backgroundColor: '#e8e2d4' }}
    >
      {/* Headline en sr-only pour SEO/a11y (le headline visuel est dans l'image) */}
      <h1 className="sr-only">L’art de la rue. À votre mur.</h1>

      {/* Image background full-bleed */}
      <Image
        src="/hero/wall.png"
        alt="Mur peint signé Nacks — fresque graffiti, X noir avec drips, splashes fluo, tags NACKS et headline L'art de la rue, à votre mur"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ zIndex: 0 }}
      />

      {/* DESKTOP : overlays */}
      <div className="hidden lg:block">
        {/* Card + CTAs dans la zone vide entre headline peinte et brass plaque */}
        <div
          className="absolute z-10 flex flex-col"
          style={{
            right: 'clamp(2rem, 5vw, 7rem)',
            top: '46%',
            width: 'clamp(20rem, 30vw, 36rem)',
            gap: 'clamp(1rem, 2vh, 1.5rem)',
          }}
        >
          <Card />
          <CTAs />
        </div>

        <AtelierMarker />
      </div>

      {/* MOBILE : stack vertical sous l'image */}
      <div
        className="relative z-10 flex flex-col gap-6 lg:hidden"
        style={{
          paddingTop: 'clamp(40rem, 90vh, 60rem)', // pousse le contenu sous l'image
          paddingBottom: '4rem',
          paddingLeft: '1.25rem',
          paddingRight: '1.25rem',
        }}
      >
        <Card />
        <CTAs />
      </div>

      <BottomStrip />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
 *  Card — NACKS GALERIE — Œuvres originales...
 * ═══════════════════════════════════════════════════════════════════ */
function Card() {
  return (
    <div
      data-fade
      style={{
        backgroundColor: PAPER,
        color: INK,
        padding: 'clamp(0.95rem,2vh,1.4rem) clamp(1.25rem,2.2vw,2rem)',
        boxShadow:
          '0 1px 1px rgba(0,0,0,0.08), 0 14px 32px -14px rgba(0,0,0,0.32), inset 0 0 0 1px rgba(0,0,0,0.06)',
        borderRadius: '2px',
      }}
    >
      <p
        style={{
          fontFamily: FONT_SERIF,
          fontStyle: 'italic',
          fontSize: 'clamp(0.95rem,1.05vw,1.15rem)',
          lineHeight: 1.5,
          margin: 0,
        }}
      >
        <span style={{ fontWeight: 600, fontStyle: 'normal' }}>NACKS GALERIE</span> —
        Œuvres originales, customs sur commande, reproductions limitées.
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
 *  CTAs — pill noire blob + pill outline
 * ═══════════════════════════════════════════════════════════════════ */
function CTAs() {
  return (
    <div
      data-fade
      className="flex flex-wrap items-center"
      style={{ gap: 'clamp(0.7rem,1.3vw,1.2rem)' }}
    >
      <a
        href="/oeuvres"
        className="group relative inline-flex items-center transition-transform hover:scale-[1.02]"
        style={{
          fontFamily: FONT_SERIF,
          fontStyle: 'italic',
          fontSize: 'clamp(0.95rem,1.05vw,1.15rem)',
          color: PAPER,
          backgroundColor: INK,
          padding: 'clamp(0.85rem,1.6vh,1.15rem) clamp(1.6rem,2.6vw,2.2rem)',
          borderRadius: '999px',
        }}
      >
        <span className="relative z-10">Voir les œuvres&nbsp;→</span>
        {/* Drips sous le bouton noir */}
        <svg
          aria-hidden
          className="pointer-events-none absolute left-0 right-0"
          style={{ top: '88%', height: '32px', overflow: 'visible' }}
          viewBox="0 0 200 40"
          preserveAspectRatio="none"
        >
          {[28, 60, 95, 130, 165, 185].map((cx, i) => {
            const len = 14 + ((i * 6) % 20);
            return (
              <g key={i} transform={`translate(${cx},0)`}>
                <path
                  d={`M-1.4,0 C-1.6,${len * 0.4} -1.8,${len * 0.7} -1,${len * 0.9} Q0,${len} 1,${len * 0.9} C1.8,${len * 0.7} 1.6,${len * 0.4} 1.4,0 Z`}
                  fill={INK}
                />
                <circle cx="0" cy={len} r="1.7" fill={INK} />
              </g>
            );
          })}
        </svg>
      </a>

      <a
        href="/atelier/commission"
        className="relative inline-flex items-center transition-colors hover:bg-black hover:text-white"
        style={{
          fontFamily: FONT_SERIF,
          fontStyle: 'italic',
          fontSize: 'clamp(0.95rem,1.05vw,1.15rem)',
          color: INK,
          backgroundColor: PAPER,
          padding: 'clamp(0.85rem,1.6vh,1.15rem) clamp(1.6rem,2.6vw,2.2rem)',
          borderRadius: '999px',
          boxShadow: 'inset 0 0 0 1.5px rgba(0,0,0,0.85)',
        }}
      >
        Demander un custom&nbsp;→
      </a>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
 *  AtelierMarker — bas-gauche desktop
 * ═══════════════════════════════════════════════════════════════════ */
function AtelierMarker() {
  return (
    <div
      data-fade
      className="absolute z-10"
      style={{
        left: 'clamp(2rem, 4vw, 5rem)',
        bottom: 'clamp(5rem, 9vh, 7rem)',
        color: 'rgba(255,255,255,0.95)',
        fontFamily: FONT_BODY,
        fontSize: 'clamp(0.7rem,0.85vw,0.85rem)',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        textShadow: '0 1px 3px rgba(0,0,0,0.7)',
      }}
    >
      <div>Atelier de Paris · 2026</div>
      <svg
        aria-hidden
        width="14"
        height="22"
        viewBox="0 0 14 22"
        className="mt-2"
        style={{ stroke: 'rgba(255,255,255,0.95)', fill: 'none', strokeWidth: 1.4, strokeLinecap: 'round' }}
      >
        <line x1="7" y1="2" x2="7" y2="20" />
        <polyline points="2,15 7,20 12,15" />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
 *  BottomStrip — full-width hero bottom
 * ═══════════════════════════════════════════════════════════════════ */
function BottomStrip() {
  return (
    <div
      data-fade
      className="absolute bottom-0 left-0 right-0 z-10 flex flex-wrap items-center justify-between"
      style={{
        padding: 'clamp(1rem,1.8vh,1.4rem) clamp(1.5rem,3vw,3rem)',
        color: 'rgba(255,255,255,0.95)',
        fontFamily: FONT_BODY,
        fontSize: 'clamp(0.65rem,0.78vw,0.8rem)',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        gap: '1rem',
        textShadow: '0 1px 3px rgba(0,0,0,0.7)',
      }}
    >
      <div>
        <span style={{ marginRight: '1.5rem' }}>Instagram @nacks</span>
        <span style={{ marginRight: '1.5rem' }}>· Tiktok 500K</span>
        <span>· Posca &amp; spray</span>
      </div>
      <div className="hidden md:block">
        <span style={{ marginRight: '1.5rem' }}>Galerie officielle</span>
        <span style={{ marginRight: '1.5rem' }}>· Livraison France &amp; international</span>
        <span>· Certificats d&rsquo;authenticit&eacute;</span>
      </div>
    </div>
  );
}
