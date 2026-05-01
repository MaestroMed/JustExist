import type { Metadata } from 'next';
import { PageShell } from '@/components/layouts/PageShell';
import { CheckoutClient } from './CheckoutClient';

export const metadata: Metadata = {
  title: 'Finaliser la commande — Nacks Galerie',
  description:
    'Paiement sécurisé Nacks Galerie. Adresse, livraison, paiement Stripe. Certificat d’authenticité inclus.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Finaliser la commande — Nacks Galerie',
    description: 'Paiement sécurisé Nacks Galerie.',
    type: 'website',
  },
};

export default function CheckoutPage() {
  return (
    <PageShell>
      <CheckoutClient />
    </PageShell>
  );
}
