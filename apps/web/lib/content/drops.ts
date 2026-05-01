/**
 * Drops — éditions événementielles.
 * Sprint 1 : data dummy, avec un drop `live` dont le countdown est calculé en relatif.
 */

import type { ArtworkCharacterRef } from './characters';

export type DropStatus = 'live' | 'upcoming' | 'sold_out' | 'past';

export type Drop = {
  slug: string;
  title: string;
  subtitle: string;
  artworkSlug: string;
  character: ArtworkCharacterRef | null;
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
    slug: 'mickey-tirage-edition',
    title: 'OG Mickey — Tirage limité',
    subtitle: 'Giclée signée numérotée, édition 100 exemplaires',
    artworkSlug: 'mickey-tirage-edition',
    character: 'mickey',
    type: 'giclee',
    editionSize: 100,
    sold: 53,
    priceCents: 32000,
    opensAt: hoursFromNow(-18),
    closesAt: null, // ferme au sold-out
    vipOpensAt: hoursFromNow(-42),
    status: 'live',
    posterVariant: 'poppy-classic',
    lore: "Le tirage limité d'OG Mickey, pour rendre l'œuvre fondatrice accessible sans la diluer. Numéroté à la main, signé au Posca rouge, accompagné d'un certificat embossé.",
    spec: [
      { label: 'Technique', value: 'Giclée 11 couleurs' },
      { label: 'Papier', value: 'Hahnemühle Photo Rag 308 g/m²' },
      { label: 'Dimensions', value: '50 × 70 cm' },
      { label: 'Signature', value: 'Au Posca rouge, recto' },
      { label: 'Numérotation', value: 'Au crayon graphite, verso' },
      { label: 'Certificat', value: 'COA papier avec embossage sec' },
      { label: 'Expédition', value: 'Tube renforcé, sous 7 jours ouvrés' },
    ],
  },
  {
    slug: 'pink-panther-print',
    title: 'Pink Attitude — Tirage',
    subtitle: 'Sérigraphie 4 couleurs fluo, édition 75 exemplaires',
    artworkSlug: 'pink-panther-print',
    character: 'pink-panther',
    type: 'serigraphie',
    editionSize: 75,
    sold: 0,
    priceCents: 38000,
    opensAt: daysFromNow(9),
    closesAt: daysFromNow(12),
    vipOpensAt: daysFromNow(8),
    status: 'upcoming',
    posterVariant: 'poppy-neon',
    lore: "La sérigraphie Pink Panther — encres fluo posées en quatre passes successives. Une édition courte pour ceux qui veulent du rose qui ne fane pas.",
    spec: [
      { label: 'Technique', value: 'Sérigraphie 4 couleurs fluo' },
      { label: 'Papier', value: 'Somerset Satin 410 g/m²' },
      { label: 'Dimensions', value: '50 × 70 cm' },
      { label: 'Signature', value: 'Au Posca, recto' },
      { label: 'Numérotation', value: 'Au crayon graphite' },
      { label: 'Certificat', value: 'COA papier numéroté' },
    ],
  },
  {
    slug: 'goku-saiyan-pose-drop',
    title: 'Goku — Saiyan Pose',
    subtitle: 'Drop original unique, feuille d\'or 18 ct',
    artworkSlug: 'goku-saiyan-pose',
    character: 'dragon-ball',
    type: 'original',
    editionSize: 1,
    sold: 1,
    priceCents: 285000,
    opensAt: new Date('2026-03-03T20:00:00Z'),
    closesAt: new Date('2026-03-03T20:02:15Z'),
    vipOpensAt: new Date('2026-03-02T20:00:00Z'),
    status: 'past',
    posterVariant: 'gorille-gold',
    lore: "Pièce unique 100 × 130 cm — Goku en pose de transformation, aura peinte à la feuille d'or 18 carats. Vendue en 2 min 15 à un collectionneur anonyme.",
    spec: [
      { label: 'Technique', value: 'Acrylique, Posca, feuille d\'or' },
      { label: 'Support', value: 'Toile lin 400 g/m²' },
      { label: 'Dimensions', value: '100 × 130 cm' },
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
