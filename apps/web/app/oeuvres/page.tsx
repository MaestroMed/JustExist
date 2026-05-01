import type { Metadata } from 'next';
import { PageShell } from '@/components/layouts/PageShell';
import { OeuvresCatalogClient } from '@/components/shop/OeuvresCatalogClient';
import { artworks } from '@/lib/content/artworks';

export const metadata: Metadata = {
  title: 'Œuvres disponibles',
  description:
    'Catalogue complet Nacks Galerie. Originaux peints main, customs, tirages limités. Toutes les œuvres certifiées et numérotées.',
};

/**
 * /oeuvres — catalogue filtrable.
 *
 * Server component : metadata + récupération des œuvres.
 * UI interactive (filters / sort / grid) déléguée à OeuvresCatalogClient.
 */
export default function OeuvresPage() {
  return (
    <PageShell>
      <OeuvresCatalogClient artworks={artworks} />
    </PageShell>
  );
}
