/**
 * Drops — éditions événementielles.
 * Sprint 1 : data dummy, avec un drop `live` dont le countdown est calculé en relatif.
 */

import type { CharacterSlug } from './characters';

export type DropStatus = 'live' | 'upcoming' | 'sold_out' | 'past';

export type Drop = {
  slug: string;
  title: string;
  subtitle: string;
  artworkSlug: string;
  character: CharacterSlug | null;
  type: 'serigraphie' | 'giclee' | 'figurine' | 'original';
  editionSize: number;
  sold: number;
  priceCents: number;
  opensAt: Date;
  closesAt: Date | null;
  vipOpensAt: Date;
  status: DropStatus;
  posterVariant: 'poppy-neon' | 'poppy-classic' | 'gorille-gold' | 'fox-paris' | 'lion-eiffel' | 'figurine-mr-poppy';
  lore: string;
  spec: { label: string; value: string }[];
};

// Helper : pour rendre le site vivant en dev, on calcule les dates en relatif.
function daysFromNow(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
}
function hoursFromNow(hours: number): Date {
  const d = new Date();
  d.setHours(d.getHours() + hours);
  return d;
}

export const drops: readonly Drop[] = [
  {
    slug: 'poppy-neon-night',
    title: 'Poppy — Neon Night',
    subtitle: 'Sérigraphie 5 couleurs, édition limitée 100 exemplaires',
    artworkSlug: 'mr-poppy-neon-night',
    character: 'mr-poppy',
    type: 'serigraphie',
    editionSize: 100,
    sold: 77,
    priceCents: 45000,
    opensAt: hoursFromNow(-18),
    closesAt: null, // ferme au sold-out
    vipOpensAt: hoursFromNow(-42),
    status: 'live',
    posterVariant: 'poppy-neon',
    lore: "Peinte un lundi soir, tirée le mardi à l'atelier sérigraphie de Pantin, signée au Posca rouge. 100 exemplaires, un par personne. Quand c'est fini, c'est fini.",
    spec: [
      { label: 'Technique', value: 'Sérigraphie 5 couleurs' },
      { label: 'Papier', value: 'Somerset Satin 410 g/m²' },
      { label: 'Dimensions', value: '70 × 100 cm' },
      { label: 'Signature', value: 'Au Posca rouge, recto' },
      { label: 'Numérotation', value: 'Au Posca noir, verso' },
      { label: 'Certificat', value: 'COA papier avec embossage sec' },
      { label: 'Expédition', value: 'Tube renforcé, sous 7 jours ouvrés' },
    ],
  },
  {
    slug: 'poppy-lama-collab',
    title: 'Poppy & Lama — Collab',
    subtitle: 'Giclée signée, édition 120 exemplaires',
    artworkSlug: 'poppy-lama-collab',
    character: 'mr-poppy',
    type: 'giclee',
    editionSize: 120,
    sold: 0,
    priceCents: 32000,
    opensAt: daysFromNow(9),
    closesAt: daysFromNow(12),
    vipOpensAt: daysFromNow(8),
    status: 'upcoming',
    posterVariant: 'poppy-neon',
    lore: "Mr Poppy rencontre son lama Fortnite. Un pastiche, un hommage, un coup de bombe. Pour la première fois, deux personnages sur la même toile.",
    spec: [
      { label: 'Technique', value: 'Giclée 11 couleurs' },
      { label: 'Papier', value: 'Hahnemühle Photo Rag 308 g/m²' },
      { label: 'Dimensions', value: '70 × 100 cm' },
      { label: 'Signature', value: 'Au Posca rouge' },
      { label: 'Numérotation', value: 'Au crayon graphite' },
      { label: 'Certificat', value: 'COA papier numéroté' },
    ],
  },
  {
    slug: 'lion-eiffel-gold',
    title: 'Lion d\'Eiffel — Gold',
    subtitle: 'Drop original unique, vendu le 3 mars 2026',
    artworkSlug: 'lion-eiffel-gold',
    character: 'lion-d-eiffel',
    type: 'original',
    editionSize: 1,
    sold: 1,
    priceCents: 320000,
    opensAt: new Date('2026-03-03T20:00:00Z'),
    closesAt: new Date('2026-03-03T20:02:15Z'),
    vipOpensAt: new Date('2026-03-02T20:00:00Z'),
    status: 'past',
    posterVariant: 'lion-eiffel',
    lore: "Pièce unique 100 × 150 cm, acrylique + feuille d'or 18 carats. Vendue en 2 min 15 à un collectionneur anonyme. Le prochain Lion sera différent.",
    spec: [
      { label: 'Technique', value: 'Acrylique, Posca, feuille d\'or' },
      { label: 'Support', value: 'Toile lin 400 g/m²' },
      { label: 'Dimensions', value: '100 × 150 cm' },
      { label: 'Signature', value: 'Au dos, encre indélébile' },
      { label: 'Certificat', value: 'COA papier + enregistrement Artsy' },
    ],
  },
] as const;

export function getLiveDrop(): Drop | undefined {
  return drops.find((d) => d.status === 'live');
}

export function getUpcomingDrop(): Drop | undefined {
  return drops.find((d) => d.status === 'upcoming');
}

export function getPastDrops(): readonly Drop[] {
  return drops.filter((d) => d.status === 'past' || d.status === 'sold_out');
}

export function getDrop(slug: string): Drop | undefined {
  return drops.find((d) => d.slug === slug);
}

/** Alias clean pour la nouvelle DA "Séries" (Phase 3). */
export function getAllDrops(): readonly Drop[] {
  return drops;
}

/** Alias clean pour la nouvelle DA "Séries" (Phase 3). */
export function getDropBySlug(slug: string): Drop | undefined {
  return getDrop(slug);
}
