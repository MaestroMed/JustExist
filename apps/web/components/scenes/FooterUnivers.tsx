'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Container } from '@nacks/ui';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { nacks } from '@/lib/content/nacks';

/**
 * SCÈNE 8 — Footer-Univers.
 * Grande signature NACKS qui se redessine au scroll in view + colonnes + crédit.
 */
export function FooterUnivers() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden border-t border-[var(--color-cream-100)] bg-[var(--color-ink)] pt-[var(--spacing-section)] pb-12 text-[var(--color-cream)]"
    >
      {/* Grande signature NACKS au centre (redessinée) */}
      <div className="pointer-events-none flex justify-center pb-16">
        <svg
          viewBox="0 0 900 220"
          className="w-[min(85vw,1100px)] opacity-95"
        >
          {'NACKS'.split('').map((letter, i) => (
            <motion.text
              key={i}
              x={90 + i * 175}
              y={170}
              fill="#F5F1E8"
              fontFamily="Space Grotesk, sans-serif"
              fontWeight={600}
              fontSize={200}
              textAnchor="middle"
              initial={{ y: 240, opacity: 0 }}
              animate={inView ? { y: 170, opacity: 1 } : {}}
              transition={{
                delay: i * 0.1,
                duration: 1,
                ease: [0.19, 1, 0.22, 1],
              }}
              style={{ letterSpacing: '-0.06em' }}
            >
              {letter}
            </motion.text>
          ))}
          <motion.path
            d="M 120 205 Q 240 195, 370 205 T 610 205 T 810 200"
            stroke="#E63946"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ delay: 0.7, duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          />
        </svg>
      </div>

      <Container size="full">
        <div className="grid gap-10 border-t border-[var(--color-cream-100)] pt-16 md:grid-cols-4 md:gap-8">
          <FooterColumn title="Explorer" links={[
            { href: '/oeuvres', label: 'Œuvres' },
            { href: '/drops', label: 'Drops' },
            { href: '/univers', label: 'Univers' },
            { href: '/journal', label: 'Journal' },
            { href: '/atelier', label: 'Atelier' },
            { href: '/communaute', label: 'Communauté' },
          ]} />
          <FooterColumn title="Compte" links={[
            { href: '/compte', label: 'Se connecter' },
            { href: '/compte/commandes', label: 'Mes commandes' },
            { href: '/atelier/commission', label: 'Commande personnalisée' },
            { href: '/atelier/contact', label: 'Contact' },
            { href: '/atelier/presse', label: 'Kit presse' },
          ]} />
          <FooterColumn title="Réseaux" links={[
            { href: nacks.social.tiktok.url, label: 'TikTok', external: true },
            { href: nacks.social.instagram.url, label: 'Instagram', external: true },
            { href: nacks.social.youtube.url, label: 'YouTube', external: true },
          ]} />
          <div className="flex flex-col gap-4">
            <h4 className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-cream-600)]">
              Le cercle
            </h4>
            <p className="font-[var(--font-body)] text-sm text-[var(--color-cream-600)]">
              Chaque mardi, une lettre courte.
            </p>
            <NewsletterForm variant="compact" label="Ton email" />
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-[var(--color-cream-100)] pt-8 font-[var(--font-mono)] text-xs text-[var(--color-cream-400)] md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-4">
            <Link href="/legal/cgv" className="hover:text-[var(--color-cream)]" data-cursor="link">CGV</Link>
            <Link href="/legal/confidentialite" className="hover:text-[var(--color-cream)]" data-cursor="link">Confidentialité</Link>
            <Link href="/legal/mentions" className="hover:text-[var(--color-cream)]" data-cursor="link">Mentions</Link>
            <Link href="/legal/retours" className="hover:text-[var(--color-cream)]" data-cursor="link">Retours</Link>
          </div>
          <div className="flex flex-col items-start gap-1 md:items-end">
            <p>Fait avec soin à Sarcelles et Paris. Depuis 2022.</p>
            <p>© 2026 Nacks Galerie — tous droits réservés.</p>
          </div>
        </div>

        <p className="mt-6 text-center font-[var(--font-mono)] text-[10px] text-[var(--color-cream-400)]/70">
          Si tu as scrollé jusqu'ici, laisse-moi un mot : <a href="mailto:contact@nacksgalerie.com" className="underline hover:text-[var(--color-cream)]">contact@nacksgalerie.com</a>
        </p>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string; external?: boolean }[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-cream-600)]">
        {title}
      </h4>
      <ul className="flex flex-col gap-2 font-[var(--font-body)] text-sm">
        {links.map((l) => (
          <li key={l.href}>
            {l.external ? (
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="text-[var(--color-cream)] transition-opacity hover:opacity-60"
                data-cursor="link"
              >
                {l.label} <span className="ml-1 text-[var(--color-cream-400)]">↗</span>
              </a>
            ) : (
              <Link
                href={l.href}
                className="text-[var(--color-cream)] transition-opacity hover:opacity-60"
                data-cursor="link"
              >
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
