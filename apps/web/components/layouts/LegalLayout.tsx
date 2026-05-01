import type { ReactNode } from 'react';
import Link from 'next/link';
import { Container } from '@nacks/ui';
import { PageShell } from './PageShell';

/* ────────── Pages légales : structure commune ──────────
 * Sidebar sticky (desktop) / accordéon top (mobile),
 * titre serif italic XXL, eyebrow Inter, date mono.
 * Article max-w-prose Inter 1.7 line-height pour readability. */

type LegalNavItem = {
  href: string;
  label: string;
};

const LEGAL_NAV: LegalNavItem[] = [
  { href: '/legal/cgv', label: 'Conditions générales de vente' },
  { href: '/legal/confidentialite', label: 'Politique de confidentialité' },
  { href: '/legal/mentions', label: 'Mentions légales' },
  { href: '/legal/retours', label: 'Livraison & retours' },
];

type Props = {
  /** Titre principal serif italic. */
  title: string;
  /** Sous-titre Inter ink/70 (optionnel). */
  subtitle?: string;
  /** ISO date ex: "2026-04-01". */
  lastUpdate: string;
  /** Pathname courant (pour highlight). Optionnel — fallback détection contains. */
  currentHref?: string;
  children: ReactNode;
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d);
}

export function LegalLayout({
  title,
  subtitle,
  lastUpdate,
  currentHref,
  children,
}: Props) {
  return (
    <PageShell>
      <div className="bg-[var(--color-cream)] text-[var(--color-ink)]">
        <Container size="full" className="py-20 md:py-28">
          {/* ──────── Header ──────── */}
          <header className="mx-auto max-w-[var(--container-wide)]">
            <p className="font-[var(--font-body)] text-xs uppercase tracking-[0.32em] text-[var(--color-ink-600)]">
              Informations légales
            </p>
            <h1
              className="mt-5 font-[var(--font-serif)] italic font-[400] leading-[0.96] tracking-[-0.015em] text-[var(--color-ink)] text-balance"
              style={{ fontSize: 'clamp(2.75rem, 6vw, 5.5rem)' }}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                className="mt-6 max-w-2xl font-[var(--font-body)] leading-[1.55] text-[rgba(10,10,10,0.7)]"
                style={{ fontSize: 'clamp(1.05rem, 1.1vw, 1.25rem)' }}
              >
                {subtitle}
              </p>
            )}
            <p className="mt-6 font-[var(--font-mono)] text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-ink-400)]">
              Mise à jour le {formatDate(lastUpdate)}
            </p>
          </header>

          {/* ──────── Body : sidebar + article ──────── */}
          <div className="mx-auto mt-16 grid max-w-[var(--container-wide)] grid-cols-1 gap-12 md:mt-20 md:grid-cols-[220px_minmax(0,1fr)] md:gap-16 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-20">
            {/* Sidebar */}
            <aside className="md:sticky md:top-28 md:self-start">
              <p className="font-[var(--font-mono)] text-[0.7rem] uppercase tracking-[0.25em] text-[var(--color-ink-400)]">
                Sommaire
              </p>
              <nav className="mt-5">
                <ul className="flex flex-col gap-3 border-t border-[var(--color-ink-100)] pt-5 md:gap-4">
                  {LEGAL_NAV.map((item) => {
                    const isActive = currentHref
                      ? currentHref === item.href
                      : false;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={isActive ? 'page' : undefined}
                          className={[
                            'inline-block font-[var(--font-body)] text-sm leading-snug transition-colors',
                            isActive
                              ? 'text-[var(--color-ink)] underline underline-offset-[6px] decoration-1 decoration-[var(--color-ink)]'
                              : 'text-[rgba(10,10,10,0.6)] hover:text-[var(--color-ink)]',
                          ].join(' ')}
                          data-cursor="link"
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>

            {/* Article */}
            <article className="legal-prose w-full max-w-[var(--container-content)] font-[var(--font-body)] text-[var(--color-ink)]">
              {children}
            </article>
          </div>

          {/* ──────── Footer rappel contact ──────── */}
          <div className="mx-auto mt-24 max-w-[var(--container-wide)] border-t border-[var(--color-ink-100)] pt-10 md:mt-32">
            <p className="font-[var(--font-body)] text-sm leading-relaxed text-[rgba(10,10,10,0.7)]">
              Une question, une demande de précision, un doute&nbsp;?{' '}
              <a
                href="mailto:contact@nacksgalerie.com"
                className="text-[var(--color-ink)] underline underline-offset-4 decoration-[rgba(10,10,10,0.4)] transition-colors hover:decoration-[var(--color-ink)]"
                data-cursor="link"
              >
                contact@nacksgalerie.com
              </a>
              .
            </p>
          </div>
        </Container>
      </div>

      {/* Styles article — typographie premium readable */}
      <style>{`
        .legal-prose {
          font-size: 1rem;
          line-height: 1.75;
          color: rgba(10, 10, 10, 0.85);
        }
        .legal-prose > * + * { margin-top: 1rem; }
        .legal-prose p { margin-bottom: 1rem; }
        .legal-prose strong { color: var(--color-ink); font-weight: 600; }
        .legal-prose em { font-style: italic; }
        .legal-prose a {
          color: var(--color-ink);
          text-decoration: underline;
          text-underline-offset: 4px;
          text-decoration-color: rgba(10, 10, 10, 0.3);
          transition: text-decoration-color 200ms ease;
        }
        .legal-prose a:hover {
          text-decoration-color: var(--color-ink);
        }
        .legal-prose h2 {
          font-family: var(--font-serif);
          font-style: italic;
          font-weight: 400;
          font-size: 1.75rem;
          line-height: 1.2;
          letter-spacing: -0.01em;
          color: var(--color-ink);
          margin-top: 3rem;
          margin-bottom: 1rem;
        }
        .legal-prose h2:first-child { margin-top: 0; }
        .legal-prose h3 {
          font-family: var(--font-serif);
          font-style: italic;
          font-weight: 400;
          font-size: 1.25rem;
          line-height: 1.3;
          color: var(--color-ink);
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }
        .legal-prose ul, .legal-prose ol {
          margin: 0 0 1rem 1.25rem;
          padding: 0;
        }
        .legal-prose ul { list-style: disc; }
        .legal-prose ol { list-style: decimal; }
        .legal-prose li {
          margin-bottom: 0.5rem;
          padding-left: 0.25rem;
        }
        .legal-prose li::marker { color: rgba(10, 10, 10, 0.4); }
        .legal-prose blockquote {
          border-left: 2px solid var(--color-ink);
          padding-left: 1.25rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: rgba(10, 10, 10, 0.75);
        }
        .legal-prose hr {
          border: 0;
          border-top: 1px solid var(--color-ink-100);
          margin: 2.5rem 0;
        }
        .legal-prose table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          font-size: 0.875rem;
        }
        .legal-prose th, .legal-prose td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid var(--color-ink-100);
          text-align: left;
        }
        .legal-prose th {
          font-family: var(--font-body);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-size: 0.7rem;
          color: rgba(10, 10, 10, 0.7);
          border-bottom-color: var(--color-ink-200);
        }
        .legal-prose code {
          font-family: var(--font-mono);
          font-size: 0.85em;
          background: var(--color-ink-50);
          padding: 0.1rem 0.35rem;
          border-radius: 3px;
        }
        .legal-prose section + section {
          margin-top: 2.5rem;
        }
        .legal-prose section[id] {
          scroll-margin-top: 7rem;
        }
      `}</style>
    </PageShell>
  );
}

/** Section helper — encapsule h2 + body + ancre id pour deep-linking footer. */
export function LegalSection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
