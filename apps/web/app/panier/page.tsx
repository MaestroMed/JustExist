import type { Metadata } from 'next';
import { PageShell } from '@/components/layouts/PageShell';
import { PanierClient } from './PanierClient';

export function generateMetadata(): Metadata {
  return {
    title: 'Panier — Nacks Galerie',
    description:
      'Vos œuvres en attente de validation. Paiement sécurisé Stripe, certificats inclus, livraison sous 5-7 jours.',
    robots: { index: false, follow: false },
    openGraph: {
      title: 'Panier — Nacks Galerie',
      description: 'Vos œuvres en attente de validation.',
      type: 'website',
    },
  };
}

export default function PanierPage() {
  return (
    <PageShell>
      <PanierClient />
    </PageShell>
  );
}
