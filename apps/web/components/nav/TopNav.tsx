'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { openCartDrawer } from '@/components/shop/CartDrawer';

/**
 * TopNav NACKS GALERIE — version simple, fidèle à la capture.
 * Logo gauche, 5 liens fluo au milieu, panier droite. Pas d'easter egg,
 * pas de drips SVG overlay sur les liens (le Permanent Marker fait déjà
 * tout le boulot graffiti). Mobile = burger + overlay full-screen.
 */

type TopNavProps = {
  hasLiveDrop?: boolean;
  cartCount?: number;
};

const NAV_LINKS = [
  { label: 'Œuvres', href: '/oeuvres', color: 'var(--color-spray-pink, #ff1493)' },
  { label: 'Séries', href: '/drops', color: 'var(--color-spray-yellow, #fae100)' },
  { label: 'Custom', href: '/atelier/commission', color: 'var(--color-spray-blue, #0044ff)' },
  { label: 'Expositions', href: '/atelier/presse', color: 'var(--color-spray-green, #1ddc6f)' },
  { label: 'Atelier', href: '/atelier', color: 'var(--color-paint-white, #fafafa)' },
] as const;

const FONT_GRAFFITI = "var(--font-graffiti, 'Permanent Marker', cursive)";
const CREAM = 'var(--color-paint-white, #fafafa)';

export function TopNav({ cartCount = 0 }: TopNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  const handleCartClick = () => {
    setMobileOpen(false);
    openCartDrawer();
  };

  return (
    <>
      <header
        className="fixed left-0 right-0 top-0 z-50"
        style={{ pointerEvents: 'none' }}
      >
        <nav
          className="flex w-full items-center justify-between"
          style={{
            padding: 'clamp(1rem, 2vh, 1.6rem) clamp(1.5rem, 3vw, 3rem)',
            pointerEvents: 'auto',
          }}
        >
          {/* LOGO */}
          <Link
            href="/"
            className="select-none whitespace-nowrap leading-none"
            style={{
              fontFamily: FONT_GRAFFITI,
              color: CREAM,
              fontSize: 'clamp(1.3rem, 1.5vw, 1.9rem)',
              letterSpacing: '0.02em',
              textShadow: '0 2px 0 rgba(0,0,0,0.35)',
            }}
          >
            NACKS GALERIE
          </Link>

          {/* NAV DESKTOP */}
          <ul
            className="hidden items-center md:flex"
            style={{ gap: 'clamp(1rem, 2.2vw, 2.4rem)' }}
          >
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="select-none whitespace-nowrap uppercase leading-none transition-transform hover:scale-[1.06]"
                  style={{
                    fontFamily: FONT_GRAFFITI,
                    color: link.color,
                    fontSize: 'clamp(0.95rem, 1.1vw, 1.25rem)',
                    letterSpacing: '0.04em',
                    textShadow: '0 1px 0 rgba(0,0,0,0.35)',
                    display: 'inline-block',
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CART + BURGER */}
          <div className="flex items-center" style={{ gap: '1rem' }}>
            <button
              type="button"
              onClick={handleCartClick}
              aria-label="Ouvrir le panier"
              className="select-none whitespace-nowrap leading-none transition-transform hover:scale-[1.06]"
              style={{
                fontFamily: FONT_GRAFFITI,
                color: CREAM,
                fontSize: 'clamp(0.95rem, 1.1vw, 1.25rem)',
                letterSpacing: '0.04em',
                textShadow: '0 1px 0 rgba(0,0,0,0.35)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              Panier ({cartCount})
            </button>

            {/* Burger mobile */}
            <button
              type="button"
              className="md:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0.25rem 0.5rem',
                color: CREAM,
              }}
            >
              <svg width="28" height="22" viewBox="0 0 28 22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                {mobileOpen ? (
                  <>
                    <line x1="4" y1="4" x2="24" y2="20" />
                    <line x1="24" y1="4" x2="4" y2="20" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="4" x2="25" y2="4" />
                    <line x1="3" y1="11" x2="25" y2="11" />
                    <line x1="3" y1="18" x2="25" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden"
          style={{
            background: 'rgba(10,10,10,0.96)',
            gap: '2rem',
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="uppercase"
              style={{
                fontFamily: FONT_GRAFFITI,
                color: link.color,
                fontSize: '2.5rem',
                letterSpacing: '0.04em',
                textShadow: '0 2px 0 rgba(0,0,0,0.5)',
              }}
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={handleCartClick}
            className="uppercase"
            style={{
              fontFamily: FONT_GRAFFITI,
              color: CREAM,
              fontSize: '2.5rem',
              letterSpacing: '0.04em',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              textShadow: '0 2px 0 rgba(0,0,0,0.5)',
            }}
          >
            Panier ({cartCount})
          </button>
        </div>
      )}
    </>
  );
}
