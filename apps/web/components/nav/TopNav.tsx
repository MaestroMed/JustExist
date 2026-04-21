'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useMotionTemplate, useScroll, useTransform } from 'motion/react';
import { Container } from '@nacks/ui';

const NAV_LINKS = [
  { label: 'Œuvres', href: '/oeuvres' },
  { label: 'Drops', href: '/drops' },
  { label: 'Univers', href: '/univers' },
  { label: 'Journal', href: '/journal' },
  { label: 'Atelier', href: '/atelier' },
] as const;

/**
 * Navigation sticky — transparente au top, tint ink-80 au scroll.
 */
export function TopNav() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.85]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.1]);
  const bgColor = useMotionTemplate`rgba(10, 10, 10, ${bgOpacity})`;
  const borderColor = useMotionTemplate`1px solid rgba(245, 241, 232, ${borderOpacity})`;
  const pathname = usePathname();

  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-[var(--z-sticky)] backdrop-blur-[6px]"
      style={{ backgroundColor: bgColor, borderBottom: borderColor }}
    >
      <Container size="full" as="nav" className="flex items-center justify-between py-5">
        <Link
          href="/"
          className="font-[var(--font-display)] text-lg font-[600] tracking-[-0.02em] text-[var(--color-cream)] transition-opacity hover:opacity-70"
          data-cursor="link"
        >
          NACKS
        </Link>

        <ul className="hidden items-center gap-7 font-[var(--font-display)] text-xs uppercase tracking-[0.2em] text-[var(--color-cream-600)] md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group relative transition-colors hover:text-[var(--color-cream)]"
                  data-cursor="link"
                >
                  <span className={isActive ? 'text-[var(--color-cream)]' : ''}>{link.label}</span>
                  <span
                    className={`absolute -bottom-1 left-0 h-[1px] bg-[var(--color-blood)] transition-[width] duration-[var(--duration-base)] ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-4 font-[var(--font-mono)] text-xs">
          <Link
            href="/compte"
            className="hidden text-[var(--color-cream-600)] transition-colors hover:text-[var(--color-cream)] md:block"
            data-cursor="link"
          >
            Compte
          </Link>
          <button
            type="button"
            aria-label="Panier"
            className="flex items-center gap-2 text-[var(--color-cream)] transition-opacity hover:opacity-70"
            data-cursor="link"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M3 6h18l-2 13H5L3 6z" />
              <path d="M8 6V4a4 4 0 1 1 8 0v2" />
            </svg>
            <span className="tabular-nums">0</span>
          </button>
        </div>
      </Container>
    </motion.header>
  );
}
