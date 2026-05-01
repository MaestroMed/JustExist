import type { Metadata } from 'next';
import { PageShell } from '@/components/layouts/PageShell';
import { CommunauteClient } from './CommunauteClient';

export const metadata: Metadata = {
  title: 'La communauté — Nacks Galerie',
  description:
    "Une communauté autour de l'œuvre. Collectionneurs, fans, journalistes, autres artistes — voici ce qui les rassemble.",
  openGraph: {
    title: 'La communauté — Nacks Galerie',
    description:
      "Une communauté autour de l'œuvre. Collectionneurs, fans, journalistes, autres artistes — voici ce qui les rassemble.",
  },
};

export default function CommunautePage() {
  return (
    <PageShell>
      <CommunauteClient />
    </PageShell>
  );
}
