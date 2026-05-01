/**
 * Catalogue œuvres Naguy Claude / Nacks — Sprint 1.
 *
 * Source de vérité : œuvres confirmées sur Artspace Warehouse, Artsy, Artsper
 * (juin 2025). Les images sont des posters SVG procéduraux (ArtPoster*) en
 * placeholder jusqu'aux photos atelier haute résolution.
 *
 * Prix : convertis USD → EUR au taux ~0.94 (à valider avec Naguy avant mise
 * en ligne). Œuvres marquées `coming` = annoncées mais sans date publique.
 */

import type { ArtworkCharacterRef } from './characters';

export type ArtworkType = 'original' | 'giclee' | 'serigraphie' | 'poster' | 'figurine' | 'merch';
export type ArtworkStatus = 'in_stock' | 'sold_out' | 'on_demand' | 'coming';

export type Artwork = {
  slug: string;
  title: string;
  subtitle: string;
  type: ArtworkType;
  /**
   * Référence à un univers signature (Mickey, Simpsons, Dragon Ball, Pink
   * Panther, Snoopy) ou à un projet expérimental (`mr-poppy`). `null` pour
   * les œuvres mixtes / sans rattachement (Street Life, Friendship, etc.).
   */
  character: ArtworkCharacterRef | null;
  dimensions: string;
  year: number;
  materials: string;
  edition?: { size: number; remaining: number };
  priceCents: number;
  status: ArtworkStatus;
  featured: boolean;
  posterVariant: 'poppy-neon' | 'poppy-classic' | 'gorille-gold' | 'fox-paris' | 'lion-eiffel' | 'poster-abstract-1' | 'poster-abstract-2' | 'figurine-mr-poppy';
  /**
   * Path absolu vers la photo réelle de l'œuvre (servie depuis `/public`).
   * Si absent, on retombe sur le `posterVariant` SVG procédural.
   */
  photo?: string;
  /**
   * Ratio largeur / hauteur de l'œuvre (déduit de `dimensions`). Sert à
   * l'<Image> Next.js et au sizing des cards. ~1.0 carré, < 1 portrait,
   * > 1 paysage.
   */
  aspectRatio?: number;
  lore: string;
};

export const artworks: readonly Artwork[] = [
  // ─────────────────────────────────────────────────────────────
  // ORIGINAUX CONFIRMÉS — sources Artspace Warehouse
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'og-mickey',
    title: 'OG Mickey',
    subtitle: 'Original Posca & acrylique sur toile',
    type: 'original',
    character: 'mickey',
    dimensions: '84 × 60 cm',
    year: 2024,
    materials: 'Acrylique, Posca et spray sur toile montée sur châssis bois',
    priceCents: 210000,
    status: 'in_stock',
    featured: true,
    posterVariant: 'poppy-classic',
    photo: '/photos/artworks/mickey-planches-bois.jpg',
    aspectRatio: 1.4, // 84 / 60
    lore: "Le Mickey fondateur, peint au Posca dans l'atelier de Sarcelles. La pose iconique reprise comme un blason — pour dire que la pop, c'est un héritage qu'on s'approprie.",
  },
  {
    slug: 'mickeys-dreamland',
    title: "Mickey's Dreamland",
    subtitle: 'Original grand format, acrylique & spray',
    type: 'original',
    character: 'mickey',
    dimensions: '142 × 99 cm',
    year: 2024,
    materials: 'Acrylique, Posca, spray et collage sur toile de lin 400 g/m²',
    priceCents: 245000,
    status: 'in_stock',
    featured: true,
    posterVariant: 'gorille-gold',
    photo: '/photos/artworks/mickey-cap-ou-pas-cap.jpg',
    aspectRatio: 1.434, // 142 / 99
    lore: "Le grand format Mickey — un univers entier compressé sur 1m40. Les couches successives de Posca et de spray racontent les nuits d'atelier où la toile devient terrain de jeu.",
  },
  {
    slug: 'pink-attitude',
    title: 'Pink Attitude',
    subtitle: 'Original Posca sur toile',
    type: 'original',
    character: 'pink-panther',
    dimensions: '61 × 42 cm',
    year: 2024,
    materials: 'Acrylique et Posca sur toile montée sur châssis bois',
    priceCents: 157500,
    status: 'in_stock',
    featured: true,
    posterVariant: 'poppy-neon',
    // Pas de photo Pink Panther — fallback ArtPoster procédural
    aspectRatio: 1.452, // 61 / 42
    lore: "Pink Panther vu par Nacks : la nonchalance comme statement. La couleur sature jusqu'au néon, le tracé reste fluide — un dialogue entre dessin animé d'enfance et énergie graff.",
  },
  {
    slug: 'iconic-snoopy',
    title: 'Iconic Snoopy',
    subtitle: 'Original acrylique & Posca',
    type: 'original',
    character: 'snoopy',
    dimensions: '58 × 79 cm',
    year: 2024,
    materials: 'Acrylique, Posca et spray sur toile montée sur châssis bois',
    priceCents: 210000,
    status: 'in_stock',
    featured: true,
    posterVariant: 'fox-paris',
    photo: '/photos/artworks/snoopy-cap-ou-pas-cap.jpg',
    aspectRatio: 0.734, // 58 / 79 — portrait
    lore: "Le beagle le plus connu du monde, repeint comme une figure de quartier. Les bubble letters tout autour sont des prénoms d'amis, des dates de drops, des mots qui reviennent en live.",
  },
  {
    slug: 'friendship',
    title: 'Friendship',
    subtitle: 'Original mixed pop icons',
    type: 'original',
    character: null,
    dimensions: '55 × 53 cm',
    year: 2024,
    materials: 'Acrylique, Posca et collage sur toile',
    priceCents: 94000,
    status: 'in_stock',
    featured: false,
    posterVariant: 'lion-eiffel',
    photo: '/photos/artworks/mickey-minnie-parapluie.jpg',
    aspectRatio: 1.038, // 55 / 53 — quasi carré
    lore: "Plusieurs personnages réunis sur une seule toile — Mickey, Snoopy, des silhouettes Simpsons. Une pièce-manifeste sur ce qui rassemble : les images partagées, les références qu'on n'a pas eu besoin d'expliquer.",
  },
  // ─────────────────────────────────────────────────────────────
  // ŒUVRES RÉCENTES (Artsy / Artsper)
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'street-life',
    title: 'Street Life',
    subtitle: 'Original street art sur toile',
    type: 'original',
    character: null,
    dimensions: '100 × 80 cm',
    year: 2025,
    materials: 'Acrylique, Posca, spray et collage sur toile',
    priceCents: 195000,
    status: 'in_stock',
    featured: true,
    posterVariant: 'poster-abstract-1',
    photo: '/photos/artworks/picsou-king.jpg',
    aspectRatio: 1.25, // 100 / 80
    lore: "L'écho de la rue ramené sur toile. Tags fragmentaires, personnages pop coupés, palette qui clignote — Street Life est une coupe transversale de la ville.",
  },
  {
    slug: 'wall-street',
    title: 'Wall Street',
    subtitle: 'Original graffiti sur toile',
    type: 'original',
    character: null,
    dimensions: '90 × 70 cm',
    year: 2023,
    materials: 'Acrylique, Posca et spray sur toile',
    priceCents: 175000,
    status: 'sold_out',
    featured: false,
    posterVariant: 'poster-abstract-2',
    photo: '/photos/artworks/snoopy-work-hard-love.jpg',
    aspectRatio: 1.286, // 90 / 70
    lore: "Le titre comme ironie : Wall Street n'est plus la bourse, c'est le mur où s'écrivent les vraies valeurs. Lettrages denses, contrastes durs, écriture comme architecture.",
  },
  // ─────────────────────────────────────────────────────────────
  // SÉRIES ANNONCÉES — variantes Mickey + Simpsons + DBZ
  // (data plausible à valider avec Naguy avant mise en ligne)
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'mickey-tirage-edition',
    title: 'OG Mickey — Tirage limité',
    subtitle: 'Giclée signée numérotée',
    type: 'giclee',
    character: 'mickey',
    dimensions: '50 × 70 cm',
    year: 2025,
    materials: 'Giclée sur papier Hahnemühle Photo Rag 308 g/m², encres pigmentées 11 couleurs',
    edition: { size: 100, remaining: 47 },
    priceCents: 32000,
    status: 'in_stock',
    featured: false,
    posterVariant: 'poppy-classic',
    photo: '/photos/artworks/mickey-drips-mockup.jpg',
    aspectRatio: 0.714, // 50 / 70 — portrait
    lore: "Le tirage limité d'OG Mickey, pour rendre l'œuvre accessible sans la diluer. Numéroté, signé, accompagné du certificat papier embossé.",
  },
  {
    slug: 'bart-skate',
    title: 'Bart — Skate',
    subtitle: 'Original acrylique & Posca',
    type: 'original',
    character: 'simpsons',
    dimensions: '80 × 100 cm',
    year: 2025,
    materials: 'Acrylique, Posca et spray sur toile montée sur châssis bois',
    priceCents: 198000,
    status: 'in_stock',
    featured: true,
    posterVariant: 'poppy-neon',
    lore: "Bart en skate, rouge sur jaune, lettrages qui décollent. Une pièce sur l'insolence joyeuse — la même qui a fait que Bart est devenu une figure aussi durable que Mickey.",
  },
  {
    slug: 'goku-saiyan-pose',
    title: 'Goku — Saiyan Pose',
    subtitle: 'Original acrylique & Posca',
    type: 'original',
    character: 'dragon-ball',
    dimensions: '100 × 130 cm',
    year: 2025,
    materials: 'Acrylique, Posca, spray et feuille d\'or 18 ct sur toile de lin',
    priceCents: 285000,
    status: 'in_stock',
    featured: true,
    posterVariant: 'gorille-gold',
    lore: "Goku en pose de transformation, aura dorée peinte à la feuille. La génération qui a grandi sur Club Dorothée n'oublie pas ses dieux — ils reviennent juste avec d'autres outils.",
  },
  {
    slug: 'pink-panther-print',
    title: 'Pink Attitude — Tirage',
    subtitle: 'Sérigraphie 4 couleurs',
    type: 'serigraphie',
    character: 'pink-panther',
    dimensions: '50 × 70 cm',
    year: 2026,
    materials: 'Sérigraphie 4 couleurs sur papier Somerset Satin 410 g/m², encres fluo',
    edition: { size: 75, remaining: 75 },
    priceCents: 38000,
    status: 'coming',
    featured: false,
    posterVariant: 'poppy-neon',
    lore: "La sérigraphie qui accompagne la pièce originale. Encres fluo, papier épais, séchage longue durée — un objet qui vieillit bien.",
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

export function getArtworksByCharacter(character: ArtworkCharacterRef): readonly Artwork[] {
  return artworks.filter((a) => a.character === character);
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
