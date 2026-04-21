import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@nacks/ui';
import { PageShell, PageHeader } from '@/components/layouts/PageShell';
import { CharacterPortrait } from '@/components/art/CharacterPortrait';
import { characters } from '@/lib/content/characters';

export const metadata: Metadata = {
  title: 'Univers',
  description:
    "Mr Poppy, le Gorille de Rome, le Renard de Paris, le Lion d'Eiffel — les personnages de l'univers Nacks.",
};

export default function UniversPage() {
  return (
    <PageShell>
      <Container size="full" className="py-20 md:py-24">
        <PageHeader
          eyebrow={`${characters.length} personnages`}
          title="L'univers"
          subtitle="Chaque personnage est un fragment. Ensemble, ils racontent la même histoire : d'où je viens, ce que je vois, ce que je peins."
        />

        <div className="mt-20 grid gap-8 md:grid-cols-2">
          {characters.map((c, i) => (
            <Link
              key={c.slug}
              href={`/univers/${c.slug}`}
              className="group relative block overflow-hidden rounded-sm"
              style={{ backgroundColor: c.primaryColor }}
              data-cursor="image"
              data-cursor-label="Entrer"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <div className="absolute inset-0 transition-transform duration-[var(--duration-slow)] ease-[var(--ease-nacks)] group-hover:scale-[1.04]">
                  <CharacterPortrait character={c.slug} className="h-full w-full" />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-8 pt-24">
                  <div className="flex items-center gap-3 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.3em] text-[var(--color-cream)] opacity-80">
                    <span className="tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                    <span className="h-px w-10 bg-current" />
                    <span>{c.introducedAt}</span>
                  </div>
                  <h2
                    className="mt-3 font-[var(--font-display)] font-[500] leading-[0.95] tracking-[-0.03em] text-[var(--color-cream)]"
                    style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
                  >
                    {c.name}
                  </h2>
                  <p className="mt-3 font-[var(--font-body)] italic text-[var(--color-cream)] opacity-90">
                    « {c.phrase} »
                  </p>
                  <div className="mt-6 flex items-center gap-4 font-[var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--color-cream)] opacity-80">
                    <span>{c.drops} drops</span>
                    <span>·</span>
                    <span>{c.artworks} œuvres</span>
                    <span className="ml-auto transition-transform duration-[var(--duration-base)] group-hover:translate-x-2">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </PageShell>
  );
}
