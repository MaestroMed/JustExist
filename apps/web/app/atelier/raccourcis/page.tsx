import type { Metadata } from 'next';
import { Container } from '@nacks/ui';
import { PageShell, PageHeader } from '@/components/layouts/PageShell';

export const metadata: Metadata = {
  title: 'Raccourcis clavier',
  description: 'Tous les raccourcis clavier et easter eggs du site Nacks Galerie.',
};

type Shortcut = { keys: string[]; label: string; section: string };

const SHORTCUTS: Shortcut[] = [
  { section: 'Navigation', keys: ['⌘', 'K'], label: 'Ouvrir la palette de commandes' },
  { section: 'Navigation', keys: ['Ctrl', 'K'], label: 'Ouvrir la palette (Windows / Linux)' },
  { section: 'Navigation', keys: ['?'], label: 'Ouvrir la palette de commandes' },
  { section: 'Navigation', keys: ['g', 'h'], label: 'Aller à l\'accueil' },
  { section: 'Navigation', keys: ['g', 'o'], label: 'Aller aux œuvres' },
  { section: 'Navigation', keys: ['g', 'd'], label: 'Aller aux drops' },
  { section: 'Navigation', keys: ['g', 'u'], label: 'Aller dans l\'univers' },
  { section: 'Navigation', keys: ['g', 'j'], label: 'Aller au journal' },
  { section: 'Navigation', keys: ['g', 'a'], label: 'Aller à l\'atelier' },
  { section: 'Navigation', keys: ['g', 'c'], label: 'Aller au compte' },
  { section: 'Navigation', keys: ['g', 'p'], label: 'Aller au panier' },

  { section: 'Lightbox (page œuvre)', keys: ['←'], label: 'Image précédente' },
  { section: 'Lightbox (page œuvre)', keys: ['→'], label: 'Image suivante' },
  { section: 'Lightbox (page œuvre)', keys: ['Esc'], label: 'Fermer la lightbox' },
  { section: 'Lightbox (page œuvre)', keys: ['Clic'], label: 'Zoomer / dézoomer ×2' },

  { section: 'Easter eggs', keys: ['↑', '↑', '↓', '↓', '←', '→', '←', '→', 'B', 'A'], label: 'Code Konami → débloque un drop caché + code -10 %' },
  { section: 'Easter eggs', keys: ['Clic maintenu 3s sur NACKS'], label: 'Signature plein écran pendant 8 secondes' },
  { section: 'Easter eggs', keys: ['40 clics sur Mr Poppy'], label: 'Change la palette couleur pour la session' },

  { section: 'Accessibilité', keys: ['Tab', '(focus link)'], label: 'Skip link "Aller au contenu principal"' },
];

export default function RaccourcisPage() {
  const sections = Array.from(new Set(SHORTCUTS.map((s) => s.section)));

  return (
    <PageShell>
      <Container size="wide" className="py-20 md:py-24">
        <PageHeader
          eyebrow="Pour les curieux"
          title="Raccourcis clavier."
          subtitle="Le site est entièrement navigable au clavier. Voilà les touches qui te feront gagner du temps, plus quelques secrets. Accessible aussi en tapant ? n'importe où."
        />

        <div className="mt-16 flex flex-col gap-16">
          {sections.map((section) => (
            <section key={section} className="flex flex-col gap-6">
              <h2 className="font-[var(--font-mono)] text-xs uppercase tracking-[0.35em] text-[var(--color-blood)]">
                {section}
              </h2>
              <ul className="flex flex-col divide-y divide-[var(--color-cream-100)]">
                {SHORTCUTS.filter((s) => s.section === section).map((shortcut, i) => (
                  <li
                    key={`${section}-${i}`}
                    className="flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between md:gap-6"
                  >
                    <div className="flex flex-wrap items-center gap-1.5">
                      {shortcut.keys.map((key, j) => (
                        <span key={j} className="flex items-center gap-1.5">
                          <kbd className="inline-flex min-w-[2.25rem] items-center justify-center rounded border border-[var(--color-cream-200)] bg-[var(--color-cream-100)]/10 px-2 py-1 font-[var(--font-mono)] text-xs text-[var(--color-cream)]">
                            {key}
                          </kbd>
                          {j < shortcut.keys.length - 1 && shortcut.keys.length > 1 && shortcut.keys[j + 1] && shortcut.keys[j + 1]!.length === 1 && (
                            <span className="font-[var(--font-mono)] text-[10px] text-[var(--color-cream-400)]">+</span>
                          )}
                        </span>
                      ))}
                    </div>
                    <p className="font-[var(--font-body)] text-sm text-[var(--color-cream-600)] md:max-w-md md:text-right">
                      {shortcut.label}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <aside className="mt-16 flex flex-col gap-4 rounded-sm border border-[var(--color-cream-100)] p-8">
          <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-cream-600)]">
            Philosophie
          </p>
          <p className="font-[var(--font-body)] text-base text-[var(--color-cream)]">
            Chaque raccourci a été ajouté parce qu'il rend l'expérience plus nette, pas pour faire geek.
            Les easter eggs existent pour les curieux qui lisent le code — ils n'ajoutent rien à l'utilité,
            tout à l'affection.
          </p>
        </aside>
      </Container>
    </PageShell>
  );
}
