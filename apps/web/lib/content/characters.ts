/**
 * Univers culturels que Nacks revisite — réinterprétations d'icônes pop culture.
 *
 * Le travail de Nacks dialogue avec les figures pop qui ont façonné la culture
 * visuelle contemporaine : Mickey (Disney), la famille Simpson, l'univers
 * Dragon Ball, la Panthère Rose, Snoopy & les Peanuts. Chaque univers est
 * un vocabulaire qu'il s'approprie au Posca, à l'aérosol, à l'acrylique —
 * fair use d'art transformatif, aucune licence officielle revendiquée.
 *
 * Mr Poppy, le personnage qu'il a CRÉÉ, est traité à part comme projet
 * expérimental personnel (cf. `EXPERIMENTAL_PROJECTS` plus bas).
 */

/** Univers pop culture revisités — slugs canoniques. */
export type CharacterSlug =
  | 'mickey'
  | 'simpsons'
  | 'dragon-ball'
  | 'pink-panther'
  | 'snoopy';

/**
 * Slugs d'univers + projets expérimentaux. Utilisé par `Artwork.character`
 * pour permettre à une œuvre de pointer vers un univers signature OU vers
 * un projet expérimental (Mr Poppy).
 */
export type ArtworkCharacterRef = CharacterSlug | ExperimentalProjectSlug;

export type Character = {
  slug: CharacterSlug;
  name: string;
  tagline: string;
  phrase: string;
  primaryColor: string;
  accentColor: string;
  signature: string[]; // détails visuels / vocabulaire
  lore: string[]; // paragraphes
  drops: number;
  artworks: number;
  introducedAt: number; // année
};

export const characters: readonly Character[] = [
  {
    slug: 'mickey',
    name: 'Mickey & co',
    tagline: "L'icône qui a élevé une génération",
    phrase: "On grandit avec, on peint avec, on s'en libère avec.",
    primaryColor: '#E63946', // rouge classique
    accentColor: '#FFD43B',
    signature: [
      'Silhouette en oreilles rondes',
      'Gants blancs détournés au Posca',
      'Aérosol rouge & jaune saturé',
      'Halftone dots façon comics 60s',
    ],
    lore: [
      "Mickey, c'est la première image. Celle qu'on voit avant même de savoir lire. Je le repeins parce qu'il a déjà tout traversé : la nostalgie, la pub, le mépris, le revival. Il survit à tout, comme un mythe.",
      "Quand je le fais à la bombe sur un mur, je ne raconte pas Disney. Je raconte une enfance française devant la télé du salon, un goûter, une cassette qu'on rembobinait. C'est ma matière, pas leur copyright.",
      "Le geste compte plus que la silhouette. Un trait au Posca, une coulure, une oreille un peu cassée — et l'icône redevient un dessin de gamin.",
    ],
    drops: 3,
    artworks: 14,
    introducedAt: 2022,
  },
  {
    slug: 'simpsons',
    name: 'Simpsons',
    tagline: 'La famille jaune sur le mur d\'à côté',
    phrase: 'Le canapé, la télé, la critique sociale qui passe en douce.',
    primaryColor: '#FFD43B', // jaune Simpsons
    accentColor: '#1E40AF',
    signature: [
      'Jaune saturé pleine surface',
      'Yeux écarquillés tracés au feutre noir',
      'Bart en spray sur béton',
      'Compositions canapé / télé recyclées',
    ],
    lore: [
      "Les Simpsons, c'est la première satire qu'on m'a montrée. Avant que je sache ce que ça voulait dire, je riais déjà avec eux. Plus tard, j'ai compris qu'ils étaient féroces sous le jaune.",
      "Je peins Bart, Homer, Lisa parce qu'ils sont le miroir de la classe moyenne — la mienne, celle d'à côté, celle qu'on caricature à la télé. Sur la toile, je pousse leur jaune jusqu'à ce qu'il devienne lumineux, presque saint.",
      "C'est de la pop culture cuite trois fois. Ils ont déjà été dessinés, mémés, recyclés. Je les peins pour ce qu'ils restent : une famille qui se débrouille avec ce qu'elle a.",
    ],
    drops: 2,
    artworks: 11,
    introducedAt: 2022,
  },
  {
    slug: 'dragon-ball',
    name: 'Dragon Ball',
    tagline: 'Les super-saiyens et l\'arène intérieure',
    phrase: "Le combat, c'est aussi un genre pictural.",
    primaryColor: '#1E40AF', // bleu Goku gi
    accentColor: '#FF6B35', // orange flamme
    signature: [
      'Cheveux dorés en bubble letters',
      'Aura aérosol jaune & blanc',
      'Silhouettes de combat en ombre projetée',
      'Inscriptions kanji détournées',
    ],
    lore: [
      "Dragon Ball, c'est le shōnen de la cour de récré. On se mettait Goku contre Vegeta avant même de savoir ce qu'était une transformation. C'est resté en moi comme un rythme — celui des mangas qu'on lisait planche après planche.",
      "Je peins les super-saiyens parce qu'ils sont devenus une grammaire du dépassement. Crinière dorée, aura, cri qui devient lumière. C'est de la peinture déjà, juste en image animée.",
      "Sur la toile, je rallonge le moment juste avant le coup. La pose, l'aura, la concentration. Pas l'explosion — ce qui la précède.",
    ],
    drops: 2,
    artworks: 9,
    introducedAt: 2023,
  },
  {
    slug: 'pink-panther',
    name: 'Pink Panther',
    tagline: 'Le félin rose qui marche au ralenti',
    phrase: "L'élégance, c'est aussi un mouvement.",
    primaryColor: '#EC4899', // rose Panther
    accentColor: '#0A0A0A',
    signature: [
      'Rose flashy en aplat',
      'Silhouette féline tracée d\'un seul geste',
      'Cigarette vintage stylisée',
      'Compositions cinématographiques 70s',
    ],
    lore: [
      "La Panthère Rose, c'est la première fois que j'ai vu un personnage marcher comme un acteur. Pas un héros — un type cool qui glisse, qui regarde, qui repart. C'est plus jazz que cartoon.",
      "Le rose, on me l'a longtemps interdit comme couleur de mec. Quand je le repose pleine surface dans une toile, c'est aussi une manière de reprendre quelque chose qu'on m'avait dit de laisser de côté.",
      "Sa démarche, je la peins comme un pas de danse. C'est presque toujours une silhouette — parce qu'elle suffit à faire la classe.",
    ],
    drops: 1,
    artworks: 7,
    introducedAt: 2024,
  },
  {
    slug: 'snoopy',
    name: 'Snoopy & Peanuts',
    tagline: 'Le gang qui pense fort en silence',
    phrase: 'Une niche rouge, une bulle vide, un ciel énorme.',
    primaryColor: '#0A0A0A',
    accentColor: '#E63946',
    signature: [
      'Niche rouge en aplat dense',
      'Trait fin POSCA sur fond cream',
      'Bulles vides ou remplies de mots',
      'Ciel large laissé en respiration',
    ],
    lore: [
      "Peanuts, c'est ma leçon de douceur. Charles Schulz dessinait des enfants tristes sans jamais les écraser. Snoopy, c'est l'imagination qui sauve — la niche rouge devient avion de chasse, le ciel devient histoire.",
      "Je peins Snoopy pour la pause. Quand le reste du travail est trop bruyant, lui me ramène à un trait simple, à un fond vide, à une bulle qu'on remplit après.",
      "Le gang derrière — Charlie, Lucy, Linus — ils sont le chœur. Un seul Snoopy au centre suffit pour que tout le monde existe.",
    ],
    drops: 1,
    artworks: 6,
    introducedAt: 2024,
  },
] as const;

export function getCharacter(slug: CharacterSlug): Character | undefined {
  return characters.find((c) => c.slug === slug);
}

/* ============================================================
 *  EXPERIMENTAL PROJECTS — création originale de Nacks, distincte
 *  des univers pop culture qu'il revisite. Affiché comme tel sur la
 *  page /univers (encart bas de page, hors grille principale).
 * ============================================================ */

export type ExperimentalProjectSlug = 'mr-poppy';

export type ExperimentalProject = {
  slug: ExperimentalProjectSlug;
  name: string;
  tagline: string;
  phrase: string;
  primaryColor: string;
  accentColor: string;
  signature: string[];
  lore: string[];
  drops: number;
  artworks: number;
  introducedAt: number;
};

export const EXPERIMENTAL_PROJECTS: readonly ExperimentalProject[] = [
  {
    slug: 'mr-poppy',
    name: 'Mr Poppy',
    tagline: "Personnage original — projet expérimental",
    phrase: "Il ne dit rien. Il a déjà tout compris.",
    primaryColor: '#1E40AF',
    accentColor: '#FFD43B',
    signature: [
      'Marinière bleue et blanche',
      'X rouges dans les yeux',
      'Pioche multicolore',
      'Création originale Nacks',
    ],
    lore: [
      "Mr Poppy n'est pas une icône revisitée — c'est un personnage que j'ai dessiné de zéro, dans la marge d'un carnet à Deauville. Un ours muet, deux X dans les yeux, une marinière.",
      "C'est un projet expérimental. Je ne le présente pas au même endroit que mon corpus pop culture parce qu'il ne joue pas le même jeu : ici, je ne réinterprète personne. C'est juste lui et moi.",
      "Quelques drops, quelques toiles, et beaucoup d'essais qui ne sortent jamais de l'atelier. Si vous le croisez, c'est qu'il avait quelque chose à dire ce jour-là.",
    ],
    drops: 4,
    artworks: 12,
    introducedAt: 2024,
  },
] as const;

export function getExperimentalProject(
  slug: ExperimentalProjectSlug,
): ExperimentalProject | undefined {
  return EXPERIMENTAL_PROJECTS.find((p) => p.slug === slug);
}

const EXPERIMENTAL_SLUGS: readonly ExperimentalProjectSlug[] =
  EXPERIMENTAL_PROJECTS.map((p) => p.slug);

/** True si le slug fait référence à un projet expérimental (pas un univers signature). */
export function isExperimentalProject(
  slug: ArtworkCharacterRef,
): slug is ExperimentalProjectSlug {
  return (EXPERIMENTAL_SLUGS as readonly string[]).includes(slug);
}

/**
 * Lookup combiné : retourne un `Character` ou un `ExperimentalProject`
 * selon le slug. Utilisé par les pages qui n'ont besoin que de la card
 * info commune (nom, tagline, primaryColor, etc.).
 */
export function getCharacterOrProject(
  slug: ArtworkCharacterRef,
): Character | ExperimentalProject | undefined {
  return (
    characters.find((c) => c.slug === slug) ??
    EXPERIMENTAL_PROJECTS.find((p) => p.slug === slug)
  );
}
