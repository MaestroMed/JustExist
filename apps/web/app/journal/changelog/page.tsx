import type { Metadata } from 'next';
import { Container } from '@nacks/ui';
import { PageShell, PageHeader } from '@/components/layouts/PageShell';

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'Ce qui change sur le site, version après version.',
};

const RELEASES = [
  {
    version: '0.2.0',
    date: '2026-04-22',
    title: 'Site complet + polish cinématographique',
    notes: [
      'Ajout des 11 pages principales (boutique, drops, univers, journal, atelier, compte…).',
      'Preloader NACKS qui se dessine, 2,2 s, session flag.',
      'Curseur custom 7 variants contextuels (Acheter, Voir, Verrouillé, Glisser…).',
      'Scroll progress bar rouge en haut, magnetic buttons sur CTA majeurs.',
      'Parallax souris sur la scène d\'ouverture.',
      'Palette clavier CMD+K + vim g+o / g+d / g+u / g+j / g+a.',
      'Ambiance audio atelier activable (Web Audio API, pink noise + low hum).',
      'Easter eggs : Konami code, signature logo au clic maintenu 3 s, 40 clics sur Mr Poppy.',
      'Exit-intent newsletter désactivable définitivement en un clic.',
      '404 interactif : email pré-rempli à Nacks avec l\'URL manquante.',
    ],
  },
  {
    version: '0.1.0',
    date: '2026-04-22',
    title: 'Fondations Sprint 1',
    notes: [
      'Monorepo Turborepo + pnpm workspaces.',
      '@nacks/config (design tokens, reset, eslint, tsconfig), @nacks/ui (Button, Container, Typography).',
      'Next.js 15 + TypeScript strict + Tailwind 4 + fonts self-hosted.',
      'Première scène hero : NACKS révélé lettre-par-lettre + signature SVG dessinée + particules aérosol.',
      'Smooth scroll Lenis, curseur custom, nav sticky.',
      'apps/admin scaffold sur :3001.',
      'CI GitHub Actions (lint + typecheck + build).',
    ],
  },
] as const;

export default function ChangelogPage() {
  return (
    <PageShell>
      <Container size="content" className="py-20 md:py-24">
        <PageHeader
          eyebrow="Journal du site"
          title="Changelog"
          subtitle="Chaque version du site, documentée. Une phrase par changement. On ne cache rien."
        />

        <div className="mt-20 flex flex-col gap-14">
          {RELEASES.map((r) => (
            <article key={r.version} className="flex flex-col gap-6 border-t border-[var(--color-cream-100)] pt-10">
              <header className="flex flex-wrap items-baseline gap-4">
                <span className="font-[var(--font-mono)] text-3xl font-[500] tabular-nums text-[var(--color-blood)]">
                  v{r.version}
                </span>
                <time className="font-[var(--font-mono)] text-xs uppercase tracking-[0.25em] text-[var(--color-cream-600)]">
                  {new Date(r.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                </time>
              </header>
              <h2
                className="font-[var(--font-display)] font-[500] leading-[1.05] tracking-[-0.02em] text-[var(--color-cream)]"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
              >
                {r.title}
              </h2>
              <ul className="flex flex-col gap-3 font-[var(--font-body)] text-base leading-[1.6] text-[var(--color-cream)]">
                {r.notes.map((note, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-[0.7em] h-1 w-3 flex-shrink-0 bg-[var(--color-blood)]" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="mt-20 font-[var(--font-mono)] text-xs text-[var(--color-cream-400)]">
          Abonne-toi à la newsletter pour recevoir chaque release dans ta boîte mail.
        </p>
      </Container>
    </PageShell>
  );
}
