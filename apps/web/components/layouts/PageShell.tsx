import type { ReactNode } from 'react';
import { TopNav } from '@/components/nav/TopNav';
import { LiveDropAnnouncer } from '@/components/nav/LiveDropAnnouncer';
import { FooterUnivers } from '@/components/scenes/FooterUnivers';
import { getLiveDrop } from '@/lib/content/drops';

/**
 * Shell réutilisé par toutes les pages sauf homepage.
 * Inclut announce bar (si drop live) + nav sticky + footer complet.
 * Propage hasLiveDrop à TopNav pour afficher le badge pulsant si un drop est live.
 */
export function PageShell({ children }: { children: ReactNode }) {
  const hasLiveDrop = Boolean(getLiveDrop());
  return (
    <>
      <LiveDropAnnouncer />
      <TopNav hasLiveDrop={hasLiveDrop} />
      <main className="relative min-h-[60vh] pt-20">{children}</main>
      <FooterUnivers />
    </>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div
      className={`flex flex-col gap-6 ${align === 'center' ? 'items-center text-center' : 'items-start'}`}
    >
      {eyebrow && (
        <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-blood)]">
          {eyebrow}
        </p>
      )}
      <h1
        className="font-[var(--font-display)] font-[500] leading-[0.92] tracking-[-0.035em] text-[var(--color-cream)] text-balance"
        style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          className={`max-w-2xl font-[var(--font-body)] text-base text-[var(--color-cream-600)] md:text-lg ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
