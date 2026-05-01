'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * MANIFESTO — DA editorial premium 2028.
 *
 * Refonte from scratch : section "À propos" qui présente Naguy 'Nacks' Claude.
 * Inspiration David Zwirner / Hauser & Wirth pages About + Hermès / Aesop retail.
 * Calme, posé, espace négatif généreux, zéro urgence/drop/marketing.
 *
 * Layout split asymétrique : 40% titre serif italic + signature, 60% manifeste.
 * Background cream, ink sur cream, mots-clés italic font-bold (Sarcelles, JUST EXIST).
 * 1 mini drip décoratif sous "rue.", 1 micro tag NACKS coin de page.
 *
 * Animations : fade-up titre → stagger lignes → signature finale.
 * prefers-reduced-motion respecté (final state immédiat).
 */

const INK = 'var(--color-ink, #0a0a0a)';
const CREAM = 'var(--color-cream, #f5f1e8)';
const PAPER = 'var(--color-paint-white, #fafafa)';

const FONT_SERIF =
  "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = "var(--font-body, Inter, system-ui, sans-serif)";
const FONT_TAG = "var(--font-tag, 'Caveat', 'Permanent Marker', cursive)";
const FONT_GRAFFITI =
  "var(--font-graffiti, 'Permanent Marker', system-ui, sans-serif)";

/**
 * Texte canonique du manifeste — 4 paragraphes.
 * Vraie histoire Naguy 'Nacks' Claude :
 *  (1) Sarcelles + Maroc + Posca origin story
 *  (2) reconversion technicien son/lumière + autodidacte + 16 ans
 *  (3) Mr Brainwash + Prix Révélation Beaux-Arts 2018
 *  (4) JUST EXIST + LOVE — culture pop comme territoire
 */
const PARAGRAPHS = [
  {
    body:
      "Né et élevé à Sarcelles, Val-d'Oise. La passion arrive vers dix ans, en vacances familiales au Maroc, devant un peintre qui travaille en silence. Un déclic. De retour, c'est le Posca avant le pinceau, le carnet avant la toile — apprendre la couleur sur ce qui voulait bien la recevoir.",
    emphasis: ['Sarcelles'],
  },
  {
    body:
      "Ancien technicien son et lumière, j'ai quitté ce métier pour peindre à temps plein. Première exposition à seize ans, sous le pseudo Nacks. Autodidacte — c'est très compliqué de se faire un nom quand on n'y connaît rien. On apprend en faisant, en ratant, en recommençant.",
    emphasis: ['autodidacte'],
  },
  {
    body:
      "Le déclic d'image, c'est Mr Brainwash dans le documentaire de Banksy : la culture pop comme matière première, le geste sans permission. En 2018, Prix Révélation des Beaux-Arts. La galerie n'a pas remplacé le mur — elle l'a suivi. Acrylique, spray, Posca, collage, stencil, dripping : tout sert le sujet.",
    emphasis: ['Mr Brainwash', 'Prix Révélation'],
  },
  {
    body:
      "Mickey, Snoopy, Goku, Pink Panther, les héros Marvel — la culture pop comme territoire commun. Deux mots reviennent toujours : LOVE et JUST EXIST. Si une œuvre te parle, c'est qu'elle a déjà fait sa part du chemin.",
    emphasis: ['LOVE', 'JUST EXIST'],
  },
];

export function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const root = sectionRef.current;
      const reduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const eyebrow = root.querySelector<HTMLElement>('[data-mf-eyebrow]');
      const titleLines = gsap.utils.toArray<HTMLElement>(
        '[data-mf-title-line]',
        root,
      );
      const drip = root.querySelector<SVGElement>('[data-mf-drip]');
      const portrait = root.querySelector<HTMLElement>('[data-mf-portrait]');
      const paragraphs = gsap.utils.toArray<HTMLElement>(
        '[data-mf-para]',
        root,
      );
      const signature = root.querySelector<HTMLElement>('[data-mf-sig]');
      const tag = root.querySelector<HTMLElement>('[data-mf-tag]');

      const all = [eyebrow, ...titleLines, drip, portrait, ...paragraphs, signature, tag]
        .filter(Boolean) as gsap.TweenTarget[];

      if (reduced) {
        gsap.set(all, { opacity: 1, y: 0 });
        return;
      }

      gsap.set([eyebrow, ...titleLines, ...paragraphs, signature], {
        opacity: 0,
        y: 24,
      });
      if (portrait) gsap.set(portrait, { opacity: 0, y: 32 });
      if (drip) gsap.set(drip, { opacity: 0, scaleY: 0, transformOrigin: 'top center' });
      if (tag) gsap.set(tag, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top 70%',
          once: true,
        },
        defaults: { ease: 'power3.out' },
      });

      if (eyebrow) tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.6 }, 0);

      tl.to(
        titleLines,
        { opacity: 1, y: 0, duration: 0.85, stagger: 0.12 },
        0.1,
      );

      if (drip) {
        tl.to(
          drip,
          { opacity: 1, scaleY: 1, duration: 0.7, ease: 'power2.in' },
          0.7,
        );
      }

      if (portrait) {
        tl.to(
          portrait,
          { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' },
          0.45,
        );
      }

      tl.to(
        paragraphs,
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
        0.5,
      );

      if (signature) {
        tl.to(
          signature,
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          1.1,
        );
      }

      if (tag) {
        tl.to(tag, { opacity: 0.6, duration: 0.6 }, 1.3);
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-label="À propos de Naguy 'Nacks' Claude"
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: CREAM,
        color: INK,
        paddingBlock: 'clamp(5rem, 10vh, 10rem)',
      }}
    >
      {/* Micro tag NACKS — coin haut droit, ultra discret */}
      <span
        data-mf-tag
        aria-hidden
        className="pointer-events-none absolute select-none"
        style={{
          top: 'clamp(1.5rem, 3vh, 2.5rem)',
          right: 'clamp(1.5rem, 4vw, 5rem)',
          fontFamily: FONT_GRAFFITI,
          fontSize: 'clamp(0.85rem, 1vw, 1rem)',
          letterSpacing: '0.18em',
          color: INK,
          opacity: 0.6,
          transform: 'rotate(-4deg)',
        }}
      >
        NACKS
      </span>

      {/* Container content */}
      <div
        className="relative mx-auto"
        style={{
          maxWidth: 'var(--container-max, 1440px)',
          paddingInline: 'clamp(1.5rem, 4vw, 5rem)',
        }}
      >
        {/* Grid asymétrique 40 / 60 (desktop) — stack mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-[clamp(2.5rem,6vw,6rem)]">
          {/* ───────── Colonne gauche : titre + signature ───────── */}
          <div className="flex flex-col justify-between gap-[clamp(3rem,8vh,6rem)]">
            <div className="flex flex-col gap-[clamp(1.5rem,3vh,2.5rem)]">
              <p
                data-mf-eyebrow
                className="uppercase"
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 'clamp(0.7rem, 0.78vw, 0.82rem)',
                  letterSpacing: '0.28em',
                  color: 'rgba(10,10,10,0.55)',
                  margin: 0,
                }}
              >
                À propos · L&apos;artiste
              </p>

              <h2
                className="relative"
                style={{
                  fontFamily: FONT_SERIF,
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 'clamp(2.75rem, 6vw, 5rem)',
                  lineHeight: 1.02,
                  letterSpacing: '-0.02em',
                  color: INK,
                  margin: 0,
                }}
              >
                <span data-mf-title-line className="block relative">
                  De la rue.
                  {/* Mini drip noir sous "rue." */}
                  <svg
                    data-mf-drip
                    aria-hidden
                    className="pointer-events-none absolute"
                    style={{
                      left: 'clamp(5rem, 9vw, 9rem)',
                      top: '92%',
                      height: 'clamp(1.5rem, 3vw, 2.5rem)',
                      width: '6px',
                      overflow: 'visible',
                    }}
                    viewBox="0 0 6 40"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M3,0 C3,18 2.6,28 3,36 Q3,40 3.4,36 C3.4,28 3,18 3,0 Z"
                      fill={INK}
                    />
                    <circle cx="3" cy="38" r="1.6" fill={INK} />
                  </svg>
                </span>
                <span data-mf-title-line className="block">
                  À la galerie.
                </span>
              </h2>
            </div>

            {/* Signature manuscrite */}
            <div data-mf-sig className="flex flex-col gap-2">
              <span
                style={{
                  fontFamily: FONT_TAG,
                  fontSize: 'clamp(1.6rem, 2.4vw, 2.2rem)',
                  fontWeight: 600,
                  color: INK,
                  lineHeight: 1,
                  letterSpacing: '-0.01em',
                }}
              >
                — Naguy &lsquo;Nacks&rsquo; Claude
              </span>
              <span
                className="uppercase"
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 'clamp(0.7rem, 0.78vw, 0.82rem)',
                  letterSpacing: '0.22em',
                  color: 'rgba(10,10,10,0.55)',
                }}
              >
                Atelier · Sarcelles
              </span>
            </div>
          </div>

          {/* ───────── Colonne droite : manifeste éditorial ───────── */}
          <div
            className="flex flex-col gap-[clamp(1.25rem,2.5vh,2rem)]"
            style={{
              maxWidth: '38rem',
            }}
          >
            {PARAGRAPHS.map((p, i) => (
              <p
                key={i}
                data-mf-para
                style={{
                  fontFamily: FONT_SERIF,
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: 'clamp(1.05rem, 1.35vw, 1.4rem)',
                  lineHeight: 1.55,
                  color: INK,
                  margin: 0,
                  textWrap: 'pretty',
                }}
              >
                {renderEmphasis(p.body, p.emphasis)}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Editorial breakout — vraie photo atelier, full-width contenu */}
      <figure
        data-mf-portrait
        className="relative mx-auto mt-[clamp(4rem,8vh,7rem)]"
        style={{
          maxWidth: 'var(--container-max, 1440px)',
          paddingInline: 'clamp(1.5rem, 4vw, 5rem)',
          margin: 'clamp(4rem,8vh,7rem) auto 0',
        }}
      >
        <div
          className="relative w-full overflow-hidden"
          style={{
            aspectRatio: '16 / 9',
            backgroundColor: PAPER,
            borderRadius: '4px',
            boxShadow:
              '0 1px 1px rgba(0,0,0,0.06), 0 24px 60px -28px rgba(10,10,10,0.22)',
          }}
        >
          <Image
            src="/photos/portrait/naguy-bureau-poscas.jpg"
            alt="Naguy 'Nacks' Claude à son bureau d'atelier, sourire posé, POSCAs étalés devant lui, l'œuvre Mickey en mots en arrière-plan"
            fill
            sizes="(min-width: 1440px) 1280px, (min-width: 1024px) 92vw, 100vw"
            className="object-cover"
            loading="lazy"
          />
        </div>
        <figcaption
          className="mt-4 italic"
          style={{
            fontFamily: FONT_SERIF,
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(0.85rem, 0.95vw, 1rem)',
            lineHeight: 1.5,
            color: 'rgba(10,10,10,0.55)',
            textAlign: 'center',
          }}
        >
          Naguy &lsquo;Nacks&rsquo; Claude — atelier de Sarcelles, 2025.
        </figcaption>
      </figure>

      {/* Filet horizontal bas — séparateur éditorial discret */}
      <div
        aria-hidden
        className="mx-auto mt-[clamp(4rem,8vh,7rem)]"
        style={{
          maxWidth: 'var(--container-max, 1440px)',
          paddingInline: 'clamp(1.5rem, 4vw, 5rem)',
        }}
      >
        <div style={{ height: '1px', backgroundColor: 'rgba(10,10,10,0.08)' }} />
      </div>
    </section>
  );
}

/**
 * Wrap les mots emphasis (Sarcelles, autodidacte, Mr Brainwash, JUST EXIST…)
 * en italic bold ink. Pas de blob coloré, pas de highlight — juste de la typo.
 */
function renderEmphasis(body: string, emphasis: string[]) {
  if (emphasis.length === 0) return body;

  // Construit une regex qui matche n'importe quel mot-clé d'emphase, en préservant
  // l'ordre du texte (split + reconstruction).
  const pattern = new RegExp(
    `(${emphasis.map(escapeRegExp).join('|')})`,
    'g',
  );
  const parts = body.split(pattern);
  return parts.map((part, idx) => {
    if (emphasis.includes(part)) {
      return (
        <em
          key={idx}
          style={{
            fontStyle: 'italic',
            fontWeight: 700,
            color: INK,
          }}
        >
          {part}
        </em>
      );
    }
    return <span key={idx}>{part}</span>;
  });
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
