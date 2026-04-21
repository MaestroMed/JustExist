'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { Container } from '@nacks/ui';

const NAV_LINKS = [
  { label: 'Œuvres', href: '/oeuvres' },
  { label: 'Drops', href: '/drops' },
  { label: 'Univers', href: '/univers' },
  { label: 'Journal', href: '/journal' },
  { label: 'Atelier', href: '/atelier' },
] as const;

/**
 * Navigation sticky top — transparente au top, tint ink-80 au scroll.
 * Liens NAV désactivés en Sprint 1 (les pages cibles n'existent pas encore).
 */
export function TopNav() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.85]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.08]);

  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-[var(--z-sticky)] backdrop-blur-[6px]"
      style={{
        backgroundColor: useTransform(bgOpacity, (o) => `rgba(10, 10, 10, ${o})`),
        borderBottom: useTransform(
          borderOpacity,
          (o) => `1px solid rgba(245, 241, 232, ${o})`,
        ),
      }}
    >
      <Container size="full" as="nav" className="flex items-center justify-between py-5">
        <motion.a
          href="/"
          className="font-[var(--font-display)] text-lg font-[600] tracking-[-0.02em] text-[var(--color-cream)]"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          data-cursor="link"
        >
          NACKS
        </motion.a>

        <motion.ul
          className="hidden gap-8 font-[var(--font-display)] text-xs uppercase tracking-[0.2em] text-[var(--color-cream-600)] md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.5 }}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <span
                aria-disabled="true"
                className="cursor-not-allowed opacity-60 transition-opacity hover:text-[var(--color-cream)] hover:opacity-100"
                title="Bientôt"
              >
                {link.label}
              </span>
            </li>
          ))}
        </motion.ul>

        <motion.div
          className="font-[var(--font-mono)] text-xs text-[var(--color-cream-600)]"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.5 }}
        >
          <span aria-hidden="true" className="hidden md:inline">
            [ sprint 1 — preview ]
          </span>
        </motion.div>
      </Container>
    </motion.header>
  );
}
