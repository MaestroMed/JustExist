/**
 * Journal — articles éditoriaux.
 * Dummy Sprint 1, éditeur riche viendra au Sprint 9.
 */

export type JournalCategory = 'behind-the-scenes' | 'drop-story' | 'interview' | 'guide' | 'essai' | 'news';

export type JournalPost = {
  slug: string;
  title: string;
  subtitle: string;
  category: JournalCategory;
  publishedAt: Date;
  readingTime: number; // minutes
  excerpt: string;
  body: string[]; // paragraphes
  coverVariant: 'poppy-neon' | 'poppy-classic' | 'gorille-gold' | 'fox-paris' | 'lion-eiffel' | 'poster-abstract-1' | 'poster-abstract-2';
  featured: boolean;
};

export const journalPosts: readonly JournalPost[] = [
  {
    slug: 'le-jour-ou-jai-arrete-davoir-peur',
    title: "Le jour où j'ai arrêté d'avoir peur",
    subtitle: 'Une nuit en 2022, dans une chambre partagée à Sarcelles.',
    category: 'essai',
    publishedAt: new Date('2026-04-02'),
    readingTime: 6,
    excerpt:
      "J'ai longtemps attendu que quelqu'un vienne me dire que j'avais le droit. Personne n'est jamais venu. J'ai commencé quand même.",
    body: [
      "J'ai longtemps attendu que quelqu'un vienne me dire que j'avais le droit. Personne n'est jamais venu.",
      "En 2022, je partageais une chambre avec mon frère. J'avais un carnet, trois Posca, une bombe dont je me servais à peine. Je regardais les comptes des autres artistes toute la journée en me disant qu'eux avaient un truc que je n'avais pas.",
      "Une nuit, j'ai commencé à peindre sur un bout de toile trouvé dans une poubelle. Pas parce que j'avais trouvé le courage. Parce que j'étais fatigué d'attendre.",
      "C'est la seule leçon que je transmets quand on me pose la question. Tu ne trouveras pas le courage. Tu trouveras la fatigue d'attendre. Et ça suffit.",
    ],
    coverVariant: 'poster-abstract-1',
    featured: true,
  },
  {
    slug: 'comment-mr-poppy-est-ne',
    title: 'Comment Mr Poppy est né',
    subtitle: "Un lundi soir à Deauville, un carnet ouvert, la mer en face.",
    category: 'behind-the-scenes',
    publishedAt: new Date('2026-03-18'),
    readingTime: 4,
    excerpt:
      "Je cherchais un personnage qui ne parlerait jamais mais que tout le monde comprendrait. L'ours s'est imposé parce que l'ours, c'est l'enfance.",
    body: [
      "Je cherchais un personnage qui ne parlerait jamais mais que tout le monde comprendrait.",
      "L'ours s'est imposé parce que l'ours, c'est l'enfance. Le X dans les yeux, c'est Kaws qui me l'a appris — mais je l'ai gardé parce que c'est vrai : à vingt ans, on peut avoir tout vu.",
      "La marinière est venue ensuite. Je voulais qu'il ait quelque chose de français, mais pas le cliché tour Eiffel. La marinière, c'est l'eau, c'est le large, c'est le départ.",
      "La pioche MP, c'est plus récent. Je regardais mon petit cousin jouer à Fortnite et je me suis dit : voilà, c'est ça que je dois peindre. Pas ce que j'aurais aimé voir jeune. Ce qu'il voit, lui, aujourd'hui.",
    ],
    coverVariant: 'poppy-classic',
    featured: true,
  },
  {
    slug: 'dans-latelier-acrylique-posca-cafe',
    title: 'Dans l\'atelier : acrylique, Posca, et café',
    subtitle: 'Ce qu\'il y a vraiment sur ma table, par ordre d\'importance.',
    category: 'behind-the-scenes',
    publishedAt: new Date('2026-02-28'),
    readingTime: 3,
    excerpt:
      "Les Posca sont les plus importants. Tout le monde pense que c'est l'acrylique, mais non.",
    body: [
      "Les Posca sont les plus importants. Tout le monde pense que c'est l'acrylique, mais non.",
      "Les Posca font les contours, les bubble letters, les détails finaux. Sans eux, une toile reste floue, inachevée. Avec eux, elle parle.",
      "J'en ai cent vingt. Classés par famille de couleur. Le noir 3M pour les traits principaux. Le 1M pour les détails. Les métalliques pour les reflets, surtout sur le Gorille.",
      "Ensuite vient l'acrylique. Liquitex Heavy Body, toujours. Puis la bombe pour les fonds. Le café, c'est pour moi.",
    ],
    coverVariant: 'poppy-neon',
    featured: false,
  },
  {
    slug: 'pourquoi-jai-dit-non-a-shopify',
    title: "Pourquoi j'ai dit non à Shopify",
    subtitle: 'Et pourquoi ce site est entièrement à moi.',
    category: 'essai',
    publishedAt: new Date('2026-04-22'),
    readingTime: 7,
    excerpt:
      "Shopify voulait 29€ par mois et 2% sur chaque vente. Ça paraît peu. Sur 700k€ de chiffre d'affaires, ça fait 14 000€ par an.",
    body: [
      "Shopify voulait 29€ par mois et 2% sur chaque vente. Ça paraît peu.",
      "Sur 700 000€ de chiffre d'affaires, ça fait 14 000€ par an. 35 000€ à un million d'euros.",
      "Mais ce n'est pas le prix qui m'a fait dire non. C'est le fait que mon site aurait porté leur nom quelque part. C'est le fait que mes clients auraient été leurs clients. C'est le fait que si demain ils décident de fermer mon compte — ça arrive, ça arrive vraiment — je perdais tout.",
      "J'ai préféré payer plus cher au début et moins cher à la fin. Mais surtout, posséder. Le code, les données, les histoires, les visages.",
      "Ce site est à moi. Ce n'est pas un détail.",
    ],
    coverVariant: 'gorille-gold',
    featured: true,
  },
  {
    slug: 'los-angeles-2024-premiere-expo-us',
    title: 'Los Angeles, 2024 : première expo US',
    subtitle: 'Artspace Warehouse Gallery. 40 œuvres. 48 heures.',
    category: 'drop-story',
    publishedAt: new Date('2026-01-12'),
    readingTime: 5,
    excerpt:
      "Je suis arrivé à LAX avec un sac à dos, une boîte de Posca et aucune idée de ce qui m'attendait. 48 heures plus tard, tout était vendu.",
    body: [
      "Je suis arrivé à LAX avec un sac à dos, une boîte de Posca et aucune idée de ce qui m'attendait.",
      "Artspace Warehouse Gallery m'avait contacté sur Instagram six mois plus tôt. Une directrice nommée Rebecca. Un espace à Culver City. Une date : 6 avril 2024.",
      "J'ai peint dix nouvelles toiles sur place les trois jours qui ont précédé. J'avais peur du décalage horaire, peur de la lumière, peur que la peinture sèche trop vite.",
      "Vernissage à 18h. À 20h, cinq toiles vendues. À 23h, tout partait. 48 heures plus tard, la galerie était vide.",
      "Le lendemain, j'ai marché sur la plage de Venice en me disant que ma vie avait changé sans prévenir.",
    ],
    coverVariant: 'lion-eiffel',
    featured: false,
  },
] as const;

export function getPost(slug: string): JournalPost | undefined {
  return journalPosts.find((p) => p.slug === slug);
}

export function getFeaturedPosts(limit = 3): readonly JournalPost[] {
  return journalPosts.filter((p) => p.featured).slice(0, limit);
}
