/**
 * Catalogue œuvres — dummy Sprint 1, source de vérité passera en DB au Sprint 2.
 * Les images sont des posters SVG procéduraux (composants ArtPoster*) jusqu'aux vraies photos.
 */

import type { CharacterSlug } from './characters';

export type ArtworkType = 'original' | 'giclee' | 'serigraphie' | 'poster' | 'figurine' | 'merch';
export type ArtworkStatus = 'in_stock' | 'sold_out' | 'on_demand' | 'coming';

export type Artwork = {
  slug: string;
  title: string;
  subtitle: string;
  type: ArtworkType;
  character: CharacterSlug | null;
  dimensions: string;
  year: number;
  materials: string;
  edition?: { size: number; remaining: number };
  priceCents: number;
  status: ArtworkStatus;
  featured: boolean;
  posterVariant: 'poppy-neon' | 'poppy-classic' | 'gorille-gold' | 'fox-paris' | 'lion-eiffel' | 'poster-abstract-1' | 'poster-abstract-2' | 'figurine-mr-poppy';
  lore: string;
};

export const artworks: readonly Artwork[] = [
  {
    slug: 'mr-poppy-neon-night',
    title: 'Mr Poppy — Neon Night',
    subtitle: 'Sérigraphie 5 couleurs, papier Somerset 410g',
    type: 'serigraphie',
    character: 'mr-poppy',
    dimensions: '70 × 100 cm',
    year: 2026,
    materials: 'Sérigraphie 5 couleurs sur papier Somerset Satin 410 g/m², encres pigmentaires',
    edition: { size: 100, remaining: 23 },
    priceCents: 45000,
    status: 'in_stock',
    featured: true,
    posterVariant: 'poppy-neon',
    lore: "La version nocturne de Mr Poppy. Peinte un soir après un Nacks Show particulièrement intense, quand la lumière de l'atelier ne laisse que l'essentiel.",
  },
  {
    slug: 'mr-poppy-classic',
    title: 'Mr Poppy — Origine',
    subtitle: 'Giclée signée numérotée',
    type: 'giclee',
    character: 'mr-poppy',
    dimensions: '50 × 70 cm',
    year: 2025,
    materials: 'Giclée sur papier Hahnemühle Photo Rag 308 g/m², encres pigmentées 11 couleurs',
    edition: { size: 150, remaining: 41 },
    priceCents: 28000,
    status: 'in_stock',
    featured: true,
    posterVariant: 'poppy-classic',
    lore: "Le portrait fondateur. La première apparition publique de Mr Poppy, avec la marinière et la pioche.",
  },
  {
    slug: 'gorille-colosseum',
    title: 'Gorille de Rome — Colosseum',
    subtitle: 'Original acrylique & Posca',
    type: 'original',
    character: 'gorille-de-rome',
    dimensions: '120 × 160 cm',
    year: 2025,
    materials: 'Acrylique, Posca, aérosol sur toile de lin 400 g/m²',
    priceCents: 280000,
    status: 'in_stock',
    featured: true,
    posterVariant: 'gorille-gold',
    lore: "Le plus grand gorille peint à ce jour. Le Colisée derrière lui est peint au Posca fin, pierre par pierre.",
  },
  {
    slug: 'renard-pavés',
    title: 'Renard de Paris — Pavés',
    subtitle: 'Original acrylique',
    type: 'original',
    character: 'renard-de-paris',
    dimensions: '90 × 120 cm',
    year: 2025,
    materials: 'Acrylique et Posca sur toile, pavés peints en perspective à la main',
    priceCents: 180000,
    status: 'in_stock',
    featured: false,
    posterVariant: 'fox-paris',
    lore: "Le renard en pleine course sur les pavés du Marais, queue en panache. Une nuit, un passage.",
  },
  {
    slug: 'lion-eiffel-gold',
    title: 'Lion d\'Eiffel — Gold',
    subtitle: 'Original acrylique & feuille d\'or',
    type: 'original',
    character: 'lion-d-eiffel',
    dimensions: '100 × 150 cm',
    year: 2025,
    materials: 'Acrylique, Posca, feuille d\'or 18 ct sur toile',
    priceCents: 320000,
    status: 'sold_out',
    featured: true,
    posterVariant: 'lion-eiffel',
    lore: "La crinière est un chant. Chaque bubble letter est un prénom entendu en live.",
  },
  {
    slug: 'poppy-giclée-studio',
    title: 'Poppy — Studio Session',
    subtitle: 'Giclée signée numérotée',
    type: 'giclee',
    character: 'mr-poppy',
    dimensions: '40 × 50 cm',
    year: 2026,
    materials: 'Giclée sur papier Hahnemühle 308 g/m²',
    edition: { size: 200, remaining: 142 },
    priceCents: 19000,
    status: 'in_stock',
    featured: false,
    posterVariant: 'poppy-classic',
    lore: "Version atelier — plus intime, plus brute. Édition pour ceux qui suivent depuis le début.",
  },
  {
    slug: 'figurine-mr-poppy-classic',
    title: 'Figurine Mr Poppy — Classique',
    subtitle: 'Résine peinte main, 18 cm',
    type: 'figurine',
    character: 'mr-poppy',
    dimensions: '18 cm',
    year: 2026,
    materials: 'Résine époxy, peinture acrylique main, vernis UV',
    edition: { size: 300, remaining: 87 },
    priceCents: 22000,
    status: 'in_stock',
    featured: true,
    posterVariant: 'figurine-mr-poppy',
    lore: "Le premier Mr Poppy physique. Peint main, numéroté, signé au Posca sous la semelle.",
  },
  {
    slug: 'poster-brut-blood',
    title: 'Brut — Blood Red',
    subtitle: 'Poster open edition',
    type: 'poster',
    character: null,
    dimensions: '50 × 70 cm',
    year: 2026,
    materials: 'Impression offset, papier couché 200 g/m²',
    priceCents: 4500,
    status: 'in_stock',
    featured: false,
    posterVariant: 'poster-abstract-1',
    lore: "Une bombe, un mot, un rouge. Poster à accrocher sans réfléchir.",
  },
  {
    slug: 'poster-sarcelles-95',
    title: 'Sarcelles 95 — Poster',
    subtitle: 'Poster open edition',
    type: 'poster',
    character: null,
    dimensions: '50 × 70 cm',
    year: 2026,
    materials: 'Impression offset, papier couché 200 g/m²',
    priceCents: 3500,
    status: 'in_stock',
    featured: false,
    posterVariant: 'poster-abstract-2',
    lore: "Hommage à la ville. En capitales, en graffiti, en bubble. Gratuit presque.",
  },
  {
    slug: 'gorille-luxe-print',
    title: 'Gorille — Luxe Print',
    subtitle: 'Sérigraphie 3 couleurs + vernis',
    type: 'serigraphie',
    character: 'gorille-de-rome',
    dimensions: '60 × 80 cm',
    year: 2025,
    materials: 'Sérigraphie 3 couleurs avec vernis sérigraphique, papier Somerset 300 g/m²',
    edition: { size: 75, remaining: 0 },
    priceCents: 68000,
    status: 'sold_out',
    featured: false,
    posterVariant: 'gorille-gold',
    lore: "Sold-out en 9 minutes lors du drop du 14 février 2025. Le vernis sérigraphique ne se perçoit qu'à contre-jour.",
  },
  {
    slug: 'poppy-lama-collab',
    title: 'Poppy & Llama — Collab Edition',
    subtitle: 'Giclée signée numérotée',
    type: 'giclee',
    character: 'mr-poppy',
    dimensions: '70 × 100 cm',
    year: 2026,
    materials: 'Giclée sur papier Hahnemühle 308 g/m²',
    edition: { size: 120, remaining: 120 },
    priceCents: 32000,
    status: 'coming',
    featured: true,
    posterVariant: 'poppy-neon',
    lore: "Le prochain drop — Poppy accompagné du lama Fortnite grandeur nature. Date à venir.",
  },
] as const;

export function getArtwork(slug: string): Artwork | undefined {
  return artworks.find((a) => a.slug === slug);
}

export function getFeaturedArtworks(limit = 6): readonly Artwork[] {
  return artworks.filter((a) => a.featured).slice(0, limit);
}

export function getArtworksByType(type: ArtworkType): readonly Artwork[] {
  return artworks.filter((a) => a.type === type);
}

export function getArtworksByCharacter(character: CharacterSlug): readonly Artwork[] {
  return artworks.filter((a) => a.character === character);
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
