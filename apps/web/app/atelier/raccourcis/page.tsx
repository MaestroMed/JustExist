import type { Metadata } from 'next';
import { RaccourcisClient } from './RaccourcisClient';

export const metadata: Metadata = {
  title: 'Raccourcis — Nacks Galerie',
  description:
    "Les petits raccourcis de l'atelier. Touches clavier, liens utiles, easter eggs. Pour les curieux qui lisent le code.",
  openGraph: {
    title: "Raccourcis — Les petits secrets de l'atelier",
    description:
      "Touches clavier, liens utiles, easter eggs. Pour les curieux qui lisent le code.",
  },
};

export default function RaccourcisPage() {
  return <RaccourcisClient />;
}
