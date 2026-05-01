import type { Metadata } from 'next';
import { ChronologieClient } from './ChronologieClient';

export const metadata: Metadata = {
  title: 'Chronologie — Nacks Galerie',
  description:
    "L'arc de l'œuvre. De 2018 à 2026 — prix, expositions, séries, jalons. Chronologie détaillée de la carrière de Naguy 'Nacks' Claude.",
  openGraph: {
    title: "Chronologie — L'arc de l'œuvre",
    description:
      "De 2018 à 2026 — prix, expositions, séries, jalons. Chronologie détaillée de la carrière de Naguy Claude.",
  },
};

export default function ChronologiePage() {
  return <ChronologieClient />;
}
