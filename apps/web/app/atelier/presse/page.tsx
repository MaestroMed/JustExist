import type { Metadata } from 'next';
import { PresseClient } from './PresseClient';

export const metadata: Metadata = {
  title: 'Presse · Media Kit — Nacks Galerie',
  description:
    "Kit presse Nacks Galerie. Photos HD, biographie, dossier de presse, logos. Naguy 'Nacks' Claude est ouvert aux interviews, captations atelier, sujets éditoriaux.",
  openGraph: {
    title: 'Presse — Nacks Galerie',
    description:
      "Kit presse Nacks Galerie. Naguy Claude est ouvert aux interviews, captations atelier, sujets éditoriaux. Délais courts acceptés.",
  },
};

export default function PressePage() {
  return <PresseClient />;
}
