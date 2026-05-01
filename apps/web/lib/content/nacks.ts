/**
 * Nacks — données canoniques de l'artiste.
 *
 * VRAIES infos, sourcées du web et confirmées par Naguy :
 * - Le Parisien, AirZen Radio, POSCA officiel × 3, Imagine for Margo,
 *   Artsy, Artspace Warehouse, World Today News, ArtMajeur.
 * - Prix Révélation Beaux-Arts 2018 (CONFIRMÉ).
 * - Photos atelier fournies par Naguy (2025).
 *
 * Source unique de vérité pour textes bio + médias + JSON-LD SEO.
 */

import { SOCIAL_LINKS, SOCIAL_HANDLES } from './social';

export const nacks = {
  // ─────────── Identité ───────────
  name: 'Naguy Claude',
  alias: 'Nacks',
  age: 32, // Source: bio Insta photo `naguy-naruto-bio.jpg`
  yearsPainting: 10, // "Artiste peintre depuis 10 ans" — bio Insta
  birthplace: 'Sarcelles, Val-d\'Oise',
  base: 'Sarcelles, Val-d\'Oise',
  nationality: 'française',

  tagline: 'Pop Art × Street Art. POSCA, spray, acrylique. De Sarcelles aux galeries.',
  description:
    "Naguy Claude alias Nacks. Artiste peintre français autodidacte, basé à Sarcelles. " +
    "Mélange Pop Art et Street Art en couches épaisses : POSCA, spray, acrylique, collage, stencil, dripping. " +
    "Sujets de prédilection : Mickey, Snoopy, Picsou, Pink Panther, Goku, super-héros — tous repris en mots, en cœurs, en Love et en Just Exist. " +
    "Prix Révélation Beaux-Arts 2018. Représenté chez Artspace Warehouse Los Angeles depuis 2020. " +
    "Studio partagé avec La Voix Off, sa partenaire. Format signature des lives TikTok : fresques où chaque viewer écrit son prénom.",

  // ─────────── Photo principale (pour JSON-LD + headers) ───────────
  portraitImage: '/photos/portrait/naguy-bureau-poscas.jpg',

  // ─────────── Bio (paragraphes pour Manifesto + atelier) ───────────
  bio: [
    "Je m'appelle Naguy. Sarcelles, Val-d'Oise. La passion m'est tombée dessus à dix ans, en vacances au Maroc, en regardant un peintre travailler. À seize ans, je faisais ma première exposition. Sous le pseudonyme Nacks.",
    "Avant de quitter mon job de technicien son et lumière pour l'art à temps plein, j'avais déjà passé des années à apprendre seul. Aérosol, brush, POSCA, dripping, collage, stencil — tout y passe. \"Je suis autodidacte et c'est très compliqué de se faire un nom quand on n'y connaît rien.\"",
    "En 2018, le Prix Révélation Beaux-Arts. Depuis 2020, Artspace Warehouse Los Angeles me représente. Je peins Mickey, Snoopy, Picsou, Goku, Pink Panther — la pop culture américaine repassée à la couleur du quartier.",
    "Sur les toiles, je glisse les mots qui comptent : Love. Just Exist. Work Hard. Cap ou pas cap. À l'atelier, je partage tout avec La Voix Off. Sur TikTok, chaque soir, vous me donnez vos prénoms et je les écris dans la prochaine fresque. C'est ça la galerie, en fait. Vous dedans.",
  ],

  // ─────────── Citations (pour pull-quotes + presse) ───────────
  quotes: [
    "Je suis autodidacte et c'est très compliqué de se faire un nom quand on n'y connaît rien.",
    "À tous ceux qui sont confrontés à des échecs : sachez qu'il faut persévérer et trouver la solution, la bonne formule.",
    "En créant cette fresque, je veux encourager les gens à prendre conscience de l'importance de la recherche contre le cancer pédiatrique.",
  ],

  // ─────────── Manifeste (slogans) ───────────
  manifesto: [
    'Just Exist.',
    'Love.',
    'Work Hard.',
    "De la rue. À votre mur.",
  ],

  // ─────────── Social (re-export depuis social.ts pour back-compat) ───────────
  social: {
    tiktok: { handle: SOCIAL_HANDLES.tiktok, url: SOCIAL_LINKS.tiktok, followers: 450_000 },
    instagram: { handle: SOCIAL_HANDLES.instagram, url: SOCIAL_LINKS.instagram, followers: 40_000 },
    youtube: { handle: SOCIAL_HANDLES.youtube, url: SOCIAL_LINKS.youtube, followers: null },
    facebook: { handle: SOCIAL_HANDLES.facebook, url: SOCIAL_LINKS.facebook, followers: null },
    linkedin: { handle: SOCIAL_HANDLES.linkedin, url: SOCIAL_LINKS.linkedin, followers: null },
  },

  // ─────────── Galeries partenaires (online + physique) ───────────
  galleries: [
    { name: 'Artspace Warehouse', city: 'Los Angeles', country: 'US', since: 2020, url: SOCIAL_LINKS.artspaceWarehouse },
    { name: 'Casart Urban Gallery', city: 'Casablanca', country: 'MA', since: 2021, url: null },
    { name: 'Galerie Vénus', city: 'Paris', country: 'FR', since: 2020, url: null },
    { name: 'Design by Jaler', city: 'Paris', country: 'FR', since: 2020, url: null },
    { name: "Hôtel Barrière Le Fouquet's — Legacy Store", city: 'Paris', country: 'FR', since: 2020, url: null },
    { name: 'Paname Art Café', city: 'Paris', country: 'FR', since: 2020, url: null },
    { name: 'ArtLife Gallery', city: 'Saint-Raphaël', country: 'FR', since: 2020, url: null },
    { name: 'Truffaut', city: 'Paris', country: 'FR', since: 2019, url: null },
  ],

  // ─────────── Online sales / portfolios ───────────
  sales: [
    { name: 'Artsy', url: SOCIAL_LINKS.artsy },
    { name: 'Artsper', url: SOCIAL_LINKS.artsper },
    { name: 'ArtMajeur', url: SOCIAL_LINKS.artmajeur },
    { name: '1stDibs', url: SOCIAL_LINKS.firstDibs },
  ],

  // ─────────── Awards / récompenses ───────────
  awards: [
    {
      year: 2018,
      title: 'Prix Révélation Beaux-Arts',
      detail: "Reconnaissance institutionnelle qui ouvre les portes des galeries parisiennes et internationales.",
    },
  ],

  // ─────────── Timeline réelle ───────────
  timeline: [
    { year: '~10 ans', label: 'Le déclic, au Maroc', detail: "En vacances en famille, je vois un peintre travailler. Je décide que je veux faire ça." },
    { year: '16 ans', label: 'Première expo', detail: "Sous le pseudonyme Nacks. Je n'ai aucune formation officielle. Tout est appris sur le tas." },
    { year: 'Avant 2018', label: 'Technicien son et lumière', detail: "Je peins en parallèle. Puis je décide de tout quitter pour l'art. Pas de filet." },
    { year: 2018, label: 'Prix Révélation Beaux-Arts', detail: "La reconnaissance qui ouvre les galeries." },
    { year: 2019, label: 'Solo Truffaut', detail: 'Première exposition solo à Paris.' },
    { year: 2020, label: 'Trois solos parisiens · début Artspace LA', detail: "Paname Art Café, Legacy Store du Fouquet's, premières ventes via Artspace Warehouse Los Angeles. Représentation continue depuis." },
    { year: 2021, label: 'Casablanca · Casart Urban Gallery', detail: 'Première expo à l\'étranger après LA.' },
    { year: 'Juin 2022', label: 'Lancement Nacks Show sur TikTok', detail: "Avec La Voix Off. Format des fresques où les viewers écrivent leur prénom." },
    { year: 2023, label: 'Foire de Paris × Imagine for Margo', detail: "Fresque Mickey en POSCA pour l'association cancer pédiatrique. Jury du 1er concours Street Art Foire de Paris. Cap des 500 000 abonnés." },
    { year: 2024, label: 'Group shows Artspace Warehouse', detail: "« Top Throwback Character Art » et « Gentle Graffiti », Los Angeles." },
    { year: 2025, label: 'Street Life sur Artsy', detail: 'Nouvelle pièce mise en vente sur la plateforme.' },
    { year: 2026, label: 'Lancement nacksgalerie.com', detail: "La galerie en ligne officielle. Plus d'intermédiaire entre les œuvres et vous." },
  ],

  // ─────────── Atelier ───────────
  atelier: {
    city: 'Sarcelles',
    department: '95 Val-d\'Oise',
    sharedWith: 'La Voix Off',
    inspiration: 'Mr Brainwash (Banksy doc, Exit Through the Gift Shop, 2010)',
    mood: [
      "Des POSCA par dizaines, classés par couleur sur le bureau.",
      "Des bombes aérosols alignées comme une bibliothèque.",
      "Une toile en cours, jamais loin d'un café froid.",
      "Une caméra prête pour le live TikTok du soir.",
      "Les prénoms des viewers écrits partout, sur les bords de toile.",
    ],
    techniques: [
      { name: 'POSCA', detail: 'Pour les contours, les bubble letters, les portraits faits de mots.' },
      { name: 'Acrylique', detail: 'Pour les fonds pop, les couches saturées.' },
      { name: 'Aérosol', detail: 'Pour les drips, les halos, la matière brute.' },
      { name: 'Stencil', detail: 'Quand l\'icône doit rester nette malgré le fond chaotique.' },
      { name: 'Collage / dripping', detail: 'Pour les couches éditoriales et les coulures signature.' },
    ],
  },

  // ─────────── Sujets / motifs récurrents ───────────
  recurringSubjects: [
    { name: 'Mickey Mouse', context: 'Disney — version mots, pop ou N&B' },
    { name: 'Snoopy', context: 'Peanuts — Work Hard, Love, Cap ou pas cap' },
    { name: 'Picsou', context: 'Disney — King, billets, planches bois' },
    { name: 'Pink Panther', context: 'Pink Attitude' },
    { name: 'Goku · Dragon Ball Z', context: 'Saiyan en mots, en couleurs primaires' },
    { name: 'Marvel · DC heroes', context: 'Spider-Man, Batman, autres icônes' },
    { name: 'Bart Simpson', context: 'Skate, attitude' },
    { name: 'Jessica Rabbit', context: 'Glamour Pop' },
  ],

  // ─────────── Phrases iconiques (mots qui reviennent dans les œuvres) ───────────
  iconicWords: ['Love', 'Just Exist', 'Work Hard', 'Cap ou pas cap', 'King', 'Never Give Up'],

  // ─────────── Partenaires officiels ───────────
  partners: [
    { name: 'POSCA', role: 'Partenaire officiel · marqueurs', url: 'https://www.posca.com/fr/communities/street-art/' },
    { name: 'Foire de Paris', role: 'Jury 1er concours Street Art (2023)', url: null },
    { name: 'Imagine for Margo', role: 'Association soutenue · cancer pédiatrique', url: 'https://imagineformargo.org/foire-de-paris-lartiste-nacks-se-mobilise-pour-lassociation-imagine-for-margo-qui-lutte-contre-le-cancer-des-enfants/' },
  ],

  // ─────────── Press réelles (URLs vérifiées) ───────────
  press: [
    {
      title: "Nacks, l'artiste aux 500 000 abonnés sur TikTok peint pour les enfants malades à la Foire de Paris",
      outlet: 'Le Parisien',
      year: 2023,
      date: '2023-04-25',
      url: 'https://www.leparisien.fr/val-d-oise-95/nacks-lartiste-aux-500-000-abonnes-sur-tiktok-peint-pour-les-enfants-malades-a-la-foire-de-paris-25-04-2023-WHGZPRJRTVGZ5LFD3SZ7WE5QF4.php',
    },
    {
      title: "Paris : Nacks, l'artiste peintre aux 500 000 abonnés sur les réseaux",
      outlet: 'AirZen Radio',
      year: 2023,
      url: 'https://www.airzen.fr/paris-nacks-lartiste-peintre-aux-500-000-abonnes-sur-les-reseaux/',
    },
    {
      title: "Nacks & La Voix Off pour une fresque interactive à la Foire de Paris",
      outlet: 'POSCA',
      year: 2023,
      url: 'https://www.posca.com/fr/communities/street-art/nacks-la-voix-off-fresque-foire-de-paris-2023/',
    },
    {
      title: "POSCA & Nacks à la Foire de Paris : la fresque « Partage »",
      outlet: 'POSCA',
      year: 2023,
      url: 'https://www.posca.com/fr/communities/street-art/posca-nacks-a-la-foire-de-paris-posca-2023/',
    },
    {
      title: "NACKS, La Voix Off & TikTok — fresques de prénoms",
      outlet: 'POSCA',
      year: 2023,
      url: 'https://www.posca.com/fr/communities/life-custom-fr/nacks-la-voix-off-les-prenoms-tiktok2/',
    },
    {
      title: "Foire de Paris : l'artiste NACKS se mobilise pour Imagine for Margo",
      outlet: 'Imagine for Margo',
      year: 2023,
      url: 'https://imagineformargo.org/foire-de-paris-lartiste-nacks-se-mobilise-pour-lassociation-imagine-for-margo-qui-lutte-contre-le-cancer-des-enfants/',
    },
    {
      title: "Teal: Nacks' paintings and graffiti are popular",
      outlet: 'World Today News',
      year: 2023,
      url: 'https://www.world-today-news.com/teal-nacks-paintings-and-graffiti-are-popular/',
    },
    {
      title: "Naguy Claude — profile",
      outlet: 'Artspace Warehouse',
      year: 2024,
      url: SOCIAL_LINKS.artspaceWarehouse,
    },
    {
      title: "Naguy Claude — Biography & Works",
      outlet: 'Artsy',
      year: 2025,
      url: SOCIAL_LINKS.artsy,
    },
  ],
} as const;
