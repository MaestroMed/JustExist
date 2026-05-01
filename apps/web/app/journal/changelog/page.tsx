import type { Metadata } from 'next';
import { PageShell } from '@/components/layouts/PageShell';
import { ChangelogClient } from './ChangelogClient';

export const metadata: Metadata = {
  title: 'Changelog — Nacks Galerie',
  description:
    'Ce qui change sur la galerie. Mises à jour produit, nouveautés, corrections — version après version.',
  openGraph: {
    title: 'Changelog — Nacks Galerie',
    description:
      'Ce qui change sur la galerie. Mises à jour produit, nouveautés, corrections.',
  },
};

type Category = 'Nouveau' | 'Amélioration' | 'Correctif';

export type ChangelogEntry = {
  date: string; // ISO YYYY-MM-DD
  version?: string;
  title: string;
  body: string[];
  categories: Category[];
};

const ENTRIES: ChangelogEntry[] = [
  {
    date: '2026-05-01',
    version: '1.0.0',
    title: 'Refonte complète — direction artistique galerie premium.',
    body: [
      "La galerie passe d'une mécanique e-commerce classique à une expérience éditoriale. Hero canonique sur fresque peinte, alternance cream/ink, typographie serif italic Playfair en display, Inter en lecture. Le geste premier — la rue — devient lisible dès la première seconde.",
      "Les huit scènes de la home ont été ré-écrites sur ce socle : ouverture, manifeste, univers horizontal, customs, journal, newsletter Cercle. Chaque scène est désormais peinte au pixel près, avec ses propres anims Motion / GSAP, et respecte prefers-reduced-motion.",
      "Les pages secondaires — œuvres, univers, atelier, drops, journal, légales — ont été ré-alignées sur les mêmes tokens et le même rythme cream/ink. Plus de tokens orphelins, plus de marquees, plus de palette colorée hors spray accent.",
      'Côté boutique : panier slide-in, wishlist localStorage persistante, cart drawer ouvrable depuis la nav. Performance LCP et a11y vérifiées sur toutes les pages publiques.',
    ],
    categories: ['Nouveau', 'Amélioration'],
  },
  {
    date: '2026-04-15',
    version: '0.9.0',
    title: "Pages atelier, commission et journal en niveau premium.",
    body: [
      "L'atelier a sa propre page racine : portrait de Naguy 'Nacks' Claude, atelier de Paris, méthode, signature. Les pages chronologie / presse / contact ont été remontées au niveau du reste.",
      'Le formulaire de commission (custom sur commande) a été repensé : briefing en quatre étapes, éclats de marqueur en marge, validation en temps réel, accusé de réception serif italic. Les fichiers de référence sont uploadés en streaming, jamais stockés sur le client.',
      "Le journal devient une vraie colonne éditoriale. Les articles sont typographiés à l'écart d'une revue : grandes capitales, lettrines, citations en blockquote serif italic, images bord à bord, sommaire ancré.",
    ],
    categories: ['Nouveau', 'Amélioration'],
  },
  {
    date: '2026-04-01',
    version: '0.5.0',
    title: 'Lancement initial nacksgalerie.com.',
    body: [
      "Première version publique du site. Catalogue d'œuvres, univers (séries), drops calendrier, panier, paiement Stripe, certificats d'authenticité numérotés.",
      "Mise en place du compte client, de la wishlist, et de la newsletter Cercle. Mentions légales, CGV, CGU, politique de confidentialité, cookies — toutes en RGPD strict.",
      "Le site est mis en ligne avec un trafic de pré-lancement piloté depuis Instagram et TikTok. Première vague de collectionneurs servie sans incident en moins de 72 heures.",
    ],
    categories: ['Nouveau'],
  },
  {
    date: '2026-03-18',
    version: '0.3.0',
    title: 'Stabilisation moteur de paiement et anti-fraude.',
    body: [
      "Migration vers Stripe Payment Element en mode automatic_payment_methods. Apple Pay, Google Pay, Klarna et virement SEPA disponibles selon le marché.",
      'Ajout du 3DS systématique sur les commandes au-dessus de 800 €. Anti-fraude radar custom rules sur device fingerprint + adresse facturation / livraison.',
      "Webhooks idempotents avec signature vérifiée. Reprise automatique en cas d'échec réseau, sans double charge.",
    ],
    categories: ['Amélioration', 'Correctif'],
  },
  {
    date: '2026-02-22',
    version: '0.2.0',
    title: 'Préparation du catalogue inaugural.',
    body: [
      "Première import en bulk de la collection — quatre-vingt-douze œuvres, photographies haute définition, fiches techniques rédigées à la main, certificats numérotés.",
      "Filtres univers (Bubble, Acid, Poppy, Pop, Luxe, Fortnite, Cyan), tri par taille, support, année. Recherche plein texte sur titre, série, technique.",
      "Outil interne admin pour ré-attribuer rapidement une œuvre à un nouvel univers ou la marquer comme réservée.",
    ],
    categories: ['Nouveau'],
  },
  {
    date: '2026-01-10',
    version: '0.1.0',
    title: "Fondations techniques — monorepo, design tokens, premier hero.",
    body: [
      'Mise en place du monorepo Turborepo + pnpm. Packages @nacks/ui (Button, Container, Typography), @nacks/config (tokens, eslint, tsconfig), apps/web sur Next.js 15 et apps/admin scaffold.',
      "Première version du design system : palette cream/ink, typographies Playfair Display + Inter + JetBrains Mono, tokens fluides clamp() sur l'échelle de tailles.",
      "Première scène hero : NACKS révélé lettre par lettre, signature SVG dessinée, particules aérosol. Smooth scroll Lenis, curseur custom contextuel, navigation sticky.",
    ],
    categories: ['Nouveau'],
  },
];

export default function ChangelogPage() {
  return (
    <PageShell>
      <ChangelogClient entries={ENTRIES} />
    </PageShell>
  );
}
