import type { Metadata } from 'next';
import { LegalLayout, LegalSection } from '@/components/layouts/LegalLayout';

export const metadata: Metadata = {
  title: 'Retours & remboursements',
  description: 'Politique de retours de Nacks Galerie.',
  robots: { index: true, follow: true },
};

export default function RetoursPage() {
  return (
    <LegalLayout
      eyebrow="Retours & remboursements"
      title="Si elle ne te plaît pas."
      lastUpdated="22 avril 2026"
      neighbors={[
        { href: '/legal/cgv', label: 'CGV' },
        { href: '/legal/confidentialite', label: 'Confidentialité' },
        { href: '/legal/mentions', label: 'Mentions légales' },
      ]}
    >
      <p>
        Je veux que chaque acheteur vive avec son œuvre comme avec un ami de longue date. Si ce n'est
        pas le cas, voilà comment on règle ça sans friction.
      </p>

      <LegalSection title="Délai de rétractation · 14 jours">
        <p>
          À compter de la réception, tu as <strong>14 jours</strong> pour te rétracter. Tu n'as pas à
          te justifier. Tu écris à{' '}
          <a href="mailto:contact@nacksgalerie.com" className="underline">contact@nacksgalerie.com</a>{' '}
          avec le numéro de commande. Je te confirme sous 24&nbsp;h.
        </p>
      </LegalSection>

      <LegalSection title="Conditions de retour">
        <p>
          L'œuvre doit être renvoyée <strong>dans son emballage d'origine</strong>, en parfait état,
          avec son certificat d'authenticité. Tube renforcé pour les tirages, caisse bois pour les
          grands formats.
        </p>
        <p>
          Frais de retour à la charge de l'acheteur sauf défaut visible ou erreur de préparation.
          Assurance obligatoire à hauteur de la valeur déclarée.
        </p>
      </LegalSection>

      <LegalSection title="Remboursement">
        <p>
          Remboursement intégral (hors frais de port aller) sous <strong>10&nbsp;jours</strong> après
          réception et inspection. Via Stripe, sur la même carte que l'achat.
        </p>
      </LegalSection>

      <LegalSection title="Exceptions">
        <p>
          Les <strong>commandes personnalisées</strong> (section Commission) ne bénéficient pas du droit
          de rétractation — ce sont des pièces uniques créées pour toi. Je te pose toutes les questions
          en amont justement pour qu'il n'y ait pas de mauvaise surprise à la livraison.
        </p>
      </LegalSection>

      <LegalSection title="Œuvre endommagée à la livraison">
        <p>
          Prends <strong>3 photos</strong> de l'emballage abîmé + 3 de l'œuvre avant d'ouvrir. Envoie-les
          moi. Je gère le remplacement ou le remboursement avec le transporteur. Tu n'as rien à avancer.
        </p>
      </LegalSection>

      <LegalSection title="Revente & marché secondaire">
        <p>
          Tu es libre de revendre l'œuvre. Je maintiens un registre de provenance numérique sur la page
          certificat. Préviens-moi si tu veux que le nouveau propriétaire soit enregistré — c'est gratuit.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
