import type { Metadata } from 'next';
import { LegalLayout, LegalSection } from '@/components/layouts/LegalLayout';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Comment Nacks Galerie traite tes données personnelles.',
  robots: { index: true, follow: true },
};

export default function ConfidentialitePage() {
  return (
    <LegalLayout
      eyebrow="Données personnelles"
      title="Confidentialité"
      lastUpdated="22 avril 2026"
      neighbors={[
        { href: '/legal/cgv', label: 'CGV' },
        { href: '/legal/mentions', label: 'Mentions légales' },
        { href: '/legal/retours', label: 'Retours' },
      ]}
    >
      <p>
        Ce site est construit pour <strong>respecter tes données</strong>. Il n'y a aucun pixel
        Meta, aucun Google Analytics UA, aucun tracker tiers. La seule mesure d'audience utilisée
        est <a href="https://plausible.io/data-policy" className="underline" rel="noreferrer">Plausible Analytics</a>,
        qui n'installe pas de cookies et n'identifie personne individuellement.
      </p>

      <LegalSection title="Données collectées">
        <p>
          <strong>Quand tu t'inscris à la newsletter :</strong> email (obligatoire), prénom (facultatif),
          source (page qui a déclenché l'inscription).
        </p>
        <p>
          <strong>Quand tu crées un compte :</strong> email, nom, historique de commandes et d'édition.
        </p>
        <p>
          <strong>Quand tu passes commande :</strong> adresse de livraison et facturation, téléphone
          (facultatif), numéro Stripe (chez Stripe, pas chez nous).
        </p>
        <p>
          <strong>Quand tu soumets une commission :</strong> coordonnées + brief + références (fichiers
          éventuels). Supprimés 6 mois après refus, conservés 5 ans après acceptation.
        </p>
      </LegalSection>

      <LegalSection title="Finalité des traitements">
        <ul className="ml-5 list-disc space-y-2 text-[var(--color-cream-600)]">
          <li>Te livrer tes commandes et t'informer de leur statut.</li>
          <li>Te prévenir des drops et nouveautés si tu t'es inscrit à la newsletter.</li>
          <li>Gérer la relation client (questions, SAV, échanges).</li>
          <li>Respecter nos obligations légales (compta, fiscalité).</li>
        </ul>
      </LegalSection>

      <LegalSection title="Durée de conservation">
        <p>
          Comptes actifs : tant que le compte existe.<br />
          Comptes inactifs 3 ans : suppression sauf obligation légale.<br />
          Factures : 10 ans (obligation fiscale).<br />
          Newsletter : jusqu'à désinscription (1 clic, lien en pied de chaque email).
        </p>
      </LegalSection>

      <LegalSection title="Sous-traitants">
        <p>
          Hébergement : Vercel (US, Data Processing Addendum EU). Base de données : Neon (EU/US
          au choix, configuré sur région EU). Email : Resend (US, DPA). Paiement : Stripe (EU/US).
          Storage : Cloudflare R2 (EU). Analytics : Plausible (EU, Allemagne).
        </p>
        <p>
          Aucune de ces sociétés ne revend tes données. Chacune est liée par un Data Processing Agreement.
        </p>
      </LegalSection>

      <LegalSection title="Tes droits">
        <p>
          Tu peux à tout moment demander : <strong>accès, rectification, suppression, portabilité,
          opposition, limitation</strong>. Il suffit d'écrire à{' '}
          <a href="mailto:contact@nacksgalerie.com" className="underline">contact@nacksgalerie.com</a>.
          Réponse sous 30 jours maximum.
        </p>
        <p>
          Tu peux aussi introduire une réclamation auprès de la{' '}
          <a href="https://www.cnil.fr" className="underline" rel="noreferrer">CNIL</a>.
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          Strictement le minimum : un cookie de session (connexion) et un cookie de préférence
          (thème, audio, exit-intent). Aucun cookie publicitaire, aucun cookie tiers non nécessaire.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
