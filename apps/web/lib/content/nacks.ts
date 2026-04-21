/**
 * Nacks — données de l'artiste.
 * Source temporaire avant Sprint 2 (DB).
 */

export const nacks = {
  name: 'Naguy Claude',
  alias: 'NACKS',
  birthplace: 'Sarcelles, Val-d\'Oise',
  base: 'Sarcelles & Paris',
  agency: 'Artspace Warehouse Gallery (Los Angeles)',

  tagline: 'Le royaume numérique de Naguy « Nacks » Claude.',

  bio: [
    "Je suis de Sarcelles. J'ai commencé sur les murs avec une bombe et une idée.",
    "Mes premières toiles, je les ai peintes dans une chambre partagée, avec l'envie de prouver qu'un gamin de banlieue pouvait raconter le luxe autrement.",
    "Aujourd'hui je partage mon travail avec plus d'un demi-million de personnes chaque semaine, en direct, depuis mon atelier.",
    "Je peins des ours, des gorilles, des renards, des lions. Je peins des émotions que je n'arrive pas à dire autrement.",
    "Ce site est à moi. Le code, les données, les œuvres, les histoires — tout est sous ma main.",
    "Si une de mes œuvres te parle, c'est que tu m'as compris.",
  ],

  manifesto: [
    'Je suis de Sarcelles.',
    "J'ai commencé sur les murs.",
    'Puis devant une caméra.',
    'Puis dans des galeries.',
    "Je peins les émotions que je n'arrive pas à dire.",
    "Si une de mes œuvres te parle, c'est que tu m'as compris.",
  ],

  social: {
    tiktok: { handle: '@nacksgalerie', url: 'https://www.tiktok.com/@nacksgalerie', followers: 512000 },
    instagram: { handle: '@nacksgalerie', url: 'https://www.instagram.com/nacksgalerie', followers: 37200 },
    youtube: { handle: '@nacksgalerie', url: 'https://www.youtube.com/@nacksgalerie', followers: 24500 },
  },

  timeline: [
    { year: 2022, label: 'Premier drop confidentiel', detail: "10 originaux vendus à la communauté Discord." },
    { year: 2023, label: 'Nacks Show en live quotidien', detail: 'Avec La Voix Off, un nouveau prénom écrit chaque soir sur le mur.' },
    { year: 2024, label: "Exposition Los Angeles", detail: 'Artspace Warehouse Gallery — sold-out en 48 h.' },
    { year: 2025, label: 'Foire de Paris + partenariat Posca', detail: 'Première présence institutionnelle. Les marques suivent.' },
    { year: 2026, label: 'Lancement nacksgalerie.com', detail: 'Le royaume numérique est ouvert. Plus d\'intermédiaire.' },
  ],

  atelier: {
    city: 'Sarcelles',
    department: '95 Val-d\'Oise',
    mood: [
      "Tubes d'acrylique alignés comme une palette militaire.",
      "Des Posca par dizaines, classés par teinte.",
      "Une bombe aérosol qui siffle en début de session.",
      "Un carnet Moleskine plein de croquis, souvent oubliés ouverts.",
      "Un haut-parleur, du rap français, du jazz tard dans la nuit.",
      "Toujours un exemplaire invendu contre le mur, pour ne pas oublier.",
    ],
    techniques: [
      { name: 'Acrylique', detail: 'Couches épaisses, coups de couteau, séchage rapide pour superposer les plans.' },
      { name: 'Posca', detail: 'Pour les contours, les bubble letters, les monogrammes précis.' },
      { name: 'Aérosol', detail: 'Pour les backgrounds, les dégradés atmosphériques, la respiration.' },
      { name: 'Support', detail: 'Toile lin 400g/m², parfois bois, plus rarement métal.' },
    ],
  },

  partners: [
    { name: 'Posca', role: 'Partenaire officiel', logo: null },
    { name: 'Foire de Paris', role: 'Exposant 2025', logo: null },
    { name: 'Imagine for Margo', role: 'Association soutenue', logo: null },
    { name: 'Artspace Warehouse', role: 'Galerie représentante US', logo: null },
  ],

  press: [
    { title: "Nacks, le peintre qui transforme TikTok en galerie", outlet: 'Le Monde Magazine', year: 2025 },
    { title: "Naguy Claude, la rage douce d'un enfant de Sarcelles", outlet: 'Numéro art', year: 2025 },
    { title: "Comment Nacks a vendu 100 toiles en direct sur TikTok", outlet: 'Les Échos', year: 2024 },
    { title: "Street-art : la génération Poppy", outlet: 'Konbini', year: 2024 },
  ],
} as const;
