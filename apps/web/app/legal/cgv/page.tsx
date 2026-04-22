import type { Metadata } from 'next';
import { LegalLayout, LegalSection } from '@/components/layouts/LegalLayout';

export const metadata: Metadata = {
  title: 'Conditions générales de vente',
  description: 'CGV de Nacks Galerie.',
  robots: { index: true, follow: true },
};

export default function CGVPage() {
  return (
    <LegalLayout
      eyebrow="Conditions générales de vente"
      title="CGV"
      lastUpdated="22 avril 2026"
      neighbors={[
        { href: '/legal/mentions', label: 'Mentions légales' },
        { href: '/legal/confidentialite', label: 'Confidentialité' },
        { href: '/legal/retours', label: 'Retours' },
      ]}
    >
      <p>
        Les présentes conditions s'appliquent à toute commande passée sur le site
        <strong> nacksgalerie.com</strong>, exploité par la structure de Naguy Claude (« Nacks »),
        artiste peintre indépendant établi à Sarcelles (95).
      </p>

      <LegalSection title="1 · Objet">
        <p>
          Les présentes CGV régissent la vente d'œuvres originales, d'éditions limitées
          (sérigraphies, giclées), de figurines, de posters et de commandes personnalisées
          réalisées par Nacks.
        </p>
      </LegalSection>

      <LegalSection title="2 · Commande & prix">
        <p>
          Les prix affichés sont TTC en euros (EUR), frais de port en sus selon la zone et le poids.
          La commande est ferme dès paiement validé par Stripe. Un accusé de réception est envoyé par email.
        </p>
        <p>
          Pour les <strong>drops</strong> : un exemplaire maximum par personne, assignation du numéro
          d'édition par ordre de paiement confirmé. Les commandes non payées dans les 15 minutes sont
          libérées.
        </p>
      </LegalSection>

      <LegalSection title="3 · Paiement">
        <p>
          Paiements sécurisés via Stripe (cartes bancaires, Apple Pay, Google Pay, SEPA au-dessus de
          500&nbsp;€). Aucune donnée bancaire n'est stockée sur les serveurs de Nacks Galerie.
        </p>
      </LegalSection>

      <LegalSection title="4 · Livraison">
        <p>
          France métropolitaine : Colissimo Suivi (3 à 7 jours ouvrés).
          International : UPS ou DHL selon la destination (5 à 12 jours ouvrés).
          Retrait en atelier possible à Sarcelles sur rendez-vous (gratuit).
        </p>
        <p>
          Les œuvres sont soigneusement emballées (tube renforcé pour les tirages, caisse bois pour les
          originaux {'>'} 80&nbsp;cm). Assurance comprise jusqu'à la valeur déclarée.
        </p>
      </LegalSection>

      <LegalSection title="5 · Droit de rétractation">
        <p>
          Conformément au Code de la consommation, tu disposes de <strong>14 jours</strong> à compter
          de la réception pour te rétracter sans avoir à motiver ta décision. L'œuvre doit être
          renvoyée dans son emballage d'origine, en parfait état.
        </p>
        <p>
          <strong>Exception :</strong> les œuvres sur commande personnalisée (sections « Commission »)
          ne bénéficient pas du droit de rétractation, conformément à l'article L221-28 3°.
        </p>
      </LegalSection>

      <LegalSection title="6 · Garanties & authenticité">
        <p>
          Chaque œuvre est accompagnée d'un certificat d'authenticité signé par l'artiste.
          Les originaux sont garantis pièces uniques. Les éditions limitées sont numérotées et
          leur tirage est figé — aucune réimpression ne sera effectuée.
        </p>
      </LegalSection>

      <LegalSection title="7 · Propriété intellectuelle">
        <p>
          L'acheteur devient propriétaire de l'œuvre physique mais ne détient aucun droit de
          reproduction, exposition publique commerciale ou diffusion. Les droits d'auteur restent
          intégralement la propriété de Naguy Claude.
        </p>
      </LegalSection>

      <LegalSection title="8 · Litiges">
        <p>
          Droit applicable : français. En cas de litige, médiation préalable conseillée via le site
          de la médiation de la consommation. À défaut, juridiction du ressort du tribunal de
          Pontoise (95).
        </p>
      </LegalSection>

      <LegalSection title="9 · Contact">
        <p>
          Toute question : <a href="mailto:contact@nacksgalerie.com" className="underline">contact@nacksgalerie.com</a>.
          Réponse sous 72&nbsp;h ouvrées.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
