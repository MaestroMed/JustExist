import type { Metadata } from 'next';
import { Container } from '@nacks/ui';
import { PageShell, PageHeader } from '@/components/layouts/PageShell';
import { FilterBar } from '@/components/shop/FilterBar';
import { ArtworkCard } from '@/components/shop/ArtworkCard';
import { artworks, type Artwork } from '@/lib/content/artworks';

export const metadata: Metadata = {
  title: 'Œuvres',
  description:
    'Originaux peints main, éditions limitées, sérigraphies, figurines Mr Poppy, posters — la galerie complète de Nacks.',
};

type SearchParams = Promise<{ type?: string; sort?: string; character?: string }>;

export default async function OeuvresPage({ searchParams }: { searchParams: SearchParams }) {
  const { type, sort, character } = await searchParams;

  let items: Artwork[] = [...artworks];

  if (type && type !== 'all') {
    items = items.filter((a) => a.type === type);
  }
  if (character) {
    items = items.filter((a) => a.character === character);
  }

  if (sort === 'price-asc') items.sort((a, b) => a.priceCents - b.priceCents);
  else if (sort === 'price-desc') items.sort((a, b) => b.priceCents - a.priceCents);
  else items.sort((a, b) => b.year - a.year);

  return (
    <PageShell>
      <Container size="full" className="py-20 md:py-24">
        <PageHeader
          eyebrow={`${items.length} œuvres · sélection ${sort === 'new' || !sort ? 'récente' : 'triée'}`}
          title="Œuvres"
          subtitle="Originaux, éditions, figurines. Chaque pièce est signée au Posca, livrée avec certificat."
        />

        <div className="mt-12">
          <FilterBar />
        </div>

        {items.length === 0 ? (
          <div className="mt-24 flex flex-col items-center gap-4 py-20 text-center">
            <p className="font-[var(--font-display)] text-2xl text-[var(--color-cream)]">
              Aucune œuvre dans cette catégorie pour l'instant.
            </p>
            <p className="font-[var(--font-body)] text-sm text-[var(--color-cream-600)]">
              Reviens bientôt — le prochain drop arrive.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((a, i) => (
              <ArtworkCard key={a.slug} artwork={a} priority={i < 3} />
            ))}
          </div>
        )}
      </Container>
    </PageShell>
  );
}
