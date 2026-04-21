/**
 * Les personnages de l'univers Nacks.
 * Chacun a un code couleur signature, une phrase, et un lore.
 */

export type CharacterSlug = 'mr-poppy' | 'gorille-de-rome' | 'renard-de-paris' | 'lion-d-eiffel';

export type Character = {
  slug: CharacterSlug;
  name: string;
  tagline: string;
  phrase: string;
  primaryColor: string;
  accentColor: string;
  signature: string[]; // accessoires / détails visuels
  lore: string[]; // paragraphes
  drops: number;
  artworks: number;
  introducedAt: number; // année
};

export const characters: readonly Character[] = [
  {
    slug: 'mr-poppy',
    name: 'Mr Poppy',
    tagline: "L'ours qui a vu le monde",
    phrase: "Il ne dit rien. Il a déjà tout compris.",
    primaryColor: '#1E40AF', // poppy blue
    accentColor: '#FFD43B',
    signature: ['Marinière bleue et blanche', 'X rouges dans les yeux', 'Pioche MP multicolore', 'Lama Fortnite'],
    lore: [
      "Mr Poppy est né un lundi soir, dans une marge de carnet, pendant que je regardais la mer à Deauville.",
      "Je cherchais un personnage qui ne parlerait jamais mais que tout le monde comprendrait. Un ours, parce que l'ours c'est l'enfance. Un X dans les yeux, parce qu'on peut avoir tout vu à vingt ans.",
      "Sa marinière, c'est pour la France qu'on me raconte. Sa pioche, c'est pour la France que je vis — celle des gamins Fortnite qui collectionnent les skins. Entre les deux, il y a lui.",
      "Quand je le peins, il me regarde. Toujours. Il sait ce que je vais faire avant moi.",
    ],
    drops: 7,
    artworks: 34,
    introducedAt: 2024,
  },
  {
    slug: 'gorille-de-rome',
    name: 'Gorille de Rome',
    tagline: 'Celui qui porte le luxe sur ses épaules',
    phrase: 'Le marbre et le béton. Même matière.',
    primaryColor: '#D4A056',
    accentColor: '#0A0A0A',
    signature: ['Monogrammes LV détournés', 'Fond Colisée peint au Posca', 'Pelage en hachures graffiti', 'Or 18 carats imaginaire'],
    lore: [
      "Le Gorille, c'est mon premier vrai personnage. Celui qui m'a fait basculer du mural à la toile.",
      "Je voulais peindre le luxe comme je le ressens à Sarcelles : quelque chose de massif, de physique, qu'on admire de loin mais qu'on ne touche jamais.",
      "Le Colisée derrière lui, c'est le temps. Le monogramme dessus, c'est nous, aujourd'hui. Le gorille au milieu, c'est la vérité : la puissance, c'est du vivant, pas un sigle.",
    ],
    drops: 4,
    artworks: 19,
    introducedAt: 2023,
  },
  {
    slug: 'renard-de-paris',
    name: 'Renard de Paris',
    tagline: 'Celui qui court sur les pavés',
    phrase: "Il connaît les raccourcis que tu ne prendras jamais.",
    primaryColor: '#E63946',
    accentColor: '#F5F1E8',
    signature: ['Queue en panache orange vif', 'Pavés parisiens en perspective', 'Regard en biais, toujours', 'Moleskine noir sous la patte'],
    lore: [
      "Le renard, c'est moi. Celui qui se faufile. Celui qui a commencé par des chemins qu'on ne lui avait pas dit de prendre.",
      "Paris est un labyrinthe pour qui vient d'ailleurs. Je l'ai traversé de nuit, en métro, en scooter, à pied — jamais par la grande porte.",
      "Il y a toujours un Moleskine sous sa patte. Parce que les renards écrivent aussi.",
    ],
    drops: 2,
    artworks: 11,
    introducedAt: 2024,
  },
  {
    slug: 'lion-d-eiffel',
    name: 'Lion d\'Eiffel',
    tagline: 'Celui qui garde la tour',
    phrase: "On ne demande pas la permission au gardien.",
    primaryColor: '#FFD43B',
    accentColor: '#E63946',
    signature: ['Crinière bubble letters', 'Tour Eiffel stylisée derrière', 'Posture frontale, hiératique', 'Couronne implicite dessinée au Posca'],
    lore: [
      "Le Lion est arrivé en dernier. Il fallait qu'un personnage soit au-dessus, qu'il regarde Paris sans descendre.",
      "Sa crinière est faite de bubble letters — mes initiales, des noms de fans, des mots qui reviennent dans mes lives.",
      "Il est doré parce qu'on m'a toujours dit qu'il fallait l'être pour exister. Je l'ai fait à ma manière, avec du Posca jaune.",
    ],
    drops: 1,
    artworks: 6,
    introducedAt: 2025,
  },
] as const;

export function getCharacter(slug: CharacterSlug): Character | undefined {
  return characters.find((c) => c.slug === slug);
}
