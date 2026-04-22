import type { ReactNode } from 'react';
import Link from 'next/link';
import { Container } from '@nacks/ui';
import { PageShell } from './PageShell';

type Props = {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  children: ReactNode;
  neighbors?: { href: string; label: string }[];
};

export function LegalLayout({ eyebrow, title, lastUpdated, children, neighbors = [] }: Props) {
  return (
    <PageShell>
      <Container size="content" className="py-20 md:py-24">
        <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-blood)]">
          {eyebrow}
        </p>
        <h1
          className="mt-4 font-[var(--font-display)] font-[500] leading-[0.95] tracking-[-0.03em] text-[var(--color-cream)]"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
        >
          {title}
        </h1>
        <p className="mt-4 font-[var(--font-mono)] text-xs uppercase tracking-[0.25em] text-[var(--color-cream-600)]">
          Dernière mise à jour : {lastUpdated}
        </p>

        <div
          className="mt-14 flex flex-col gap-6 font-[var(--font-body)] text-[var(--color-cream)]"
          style={{ fontSize: 'clamp(1rem, 1.1vw, 1.125rem)', lineHeight: 1.7 }}
        >
          {children}
        </div>

        {neighbors.length > 0 && (
          <nav className="mt-20 flex flex-wrap gap-4 border-t border-[var(--color-cream-100)] pt-8">
            {neighbors.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="font-[var(--font-mono)] text-xs uppercase tracking-[0.25em] text-[var(--color-cream-600)] transition-colors hover:text-[var(--color-cream)]"
                data-cursor="link"
              >
                → {n.label}
              </Link>
            ))}
          </nav>
        )}
      </Container>
    </PageShell>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4 border-t border-[var(--color-cream-100)] pt-8">
      <h2 className="font-[var(--font-display)] text-2xl font-[500] tracking-[-0.015em] text-[var(--color-cream)]">
        {title}
      </h2>
      {children}
    </section>
  );
}
