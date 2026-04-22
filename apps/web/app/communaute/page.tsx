import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@nacks/ui';
import { PageShell, PageHeader } from '@/components/layouts/PageShell';

export const metadata: Metadata = {
  title: 'Communauté',
  description:
    "Le mur des collectionneurs Nacks — les œuvres vivent là où elles sont accrochées.",
  openGraph: {
    title: 'Communauté — Nacks Galerie',
    description:
      "Le mur des collectionneurs Nacks — les œuvres vivent là où elles sont accrochées.",
  },
};

export default function CommunautePage() {
  return (
    <PageShell>
      <Container size="full" className="py-20 md:py-24">
        <PageHeader
          eyebrow="Le cercle des collectionneurs"
          title="Le mur."
          subtitle="Une œuvre ne finit pas dans un carton d'emballage. Elle vit là où on l'accroche. Ici, ce sont les photos envoyées par celles et ceux qui partagent leur mur avec moi."
        />

        <section className="mt-20 flex flex-col items-center gap-10 rounded-sm border border-[var(--color-cream-100)] bg-[var(--color-ink)] p-16 text-center">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[var(--color-cream-400)]">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>

          <div className="flex flex-col gap-4">
            <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-blood)]">
              Bientôt
            </p>
            <h2
              className="font-[var(--font-display)] font-[500] leading-[1] tracking-[-0.025em] text-[var(--color-cream)]"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
            >
              Le premier mur s'ouvre à la livraison<br />du drop Poppy Neon Night.
            </h2>
            <p className="mx-auto max-w-xl font-[var(--font-body)] text-[var(--color-cream-600)]">
              Chaque collectionneur reçoit, deux jours après livraison, un email pour partager une
              photo de son œuvre accrochée. Les envois sont curés à la main par Nacks. Opt-in strict,
              privacy par défaut, aucune participation rendue obligatoire.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <Link
              href="/drops"
              className="inline-flex items-center gap-2 bg-[var(--color-cream)] px-6 py-3 font-[var(--font-display)] text-sm uppercase tracking-[0.2em] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-blood)] hover:text-[var(--color-cream)]"
              data-cursor="link"
            >
              Voir les drops →
            </Link>
            <Link
              href="/#cercle"
              className="inline-flex items-center gap-2 border border-[var(--color-cream)] px-6 py-3 font-[var(--font-display)] text-sm uppercase tracking-[0.2em] text-[var(--color-cream)] transition-colors hover:bg-[var(--color-cream)] hover:text-[var(--color-ink)]"
              data-cursor="link"
            >
              Rejoindre le cercle →
            </Link>
          </div>
        </section>

        <section className="mt-24 grid gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-3 border-t border-[var(--color-cream-100)] pt-6">
            <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-blood)]">
              Règle n°1
            </p>
            <p className="font-[var(--font-body)] text-sm text-[var(--color-cream)]">
              Nacks curate à la main. Tout n'apparaît pas sur le mur — mais rien n'est publié sans
              consentement explicite du collectionneur.
            </p>
          </div>
          <div className="flex flex-col gap-3 border-t border-[var(--color-cream-100)] pt-6">
            <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-blood)]">
              Règle n°2
            </p>
            <p className="font-[var(--font-body)] text-sm text-[var(--color-cream)]">
              Le prénom et la ville apparaissent par défaut, anonymisés sur simple demande. Le numéro
              d'édition est affiché pour les pièces numérotées.
            </p>
          </div>
          <div className="flex flex-col gap-3 border-t border-[var(--color-cream-100)] pt-6">
            <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-blood)]">
              Règle n°3
            </p>
            <p className="font-[var(--font-body)] text-sm text-[var(--color-cream)]">
              Aucune célébrité, aucun nom-dropping. Les collectionneurs célèbres sont traités comme
              les autres, c'est le seul endroit où l'égalité compte vraiment.
            </p>
          </div>
        </section>
      </Container>
    </PageShell>
  );
}
