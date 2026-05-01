/**
 * SOCIAL_LINKS — URLs réelles confirmées par Naguy Claude (Nacks).
 *
 * Source unique de vérité pour tous les liens externes (footer, communauté,
 * hero strip, nav…). Ne JAMAIS hardcoder une URL sociale ailleurs : importer
 * depuis ici pour garantir cohérence.
 *
 * Stats reportées (Apr 2025) :
 *   - Instagram : ~40 000 abonnés
 *   - TikTok    : ~450 000 abonnés (chiffre AirZen 2023, croissance depuis)
 *   - Total réseaux sociaux cumulé : ~500 000 abonnés
 *
 * Galeries partenaires confirmées : Artsy, Artsper, ArtMajeur,
 * Artspace Warehouse, 1stDibs.
 */

export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/nacks_galerie/',
  tiktok: 'https://www.tiktok.com/@nacksgalerie',
  youtube: 'https://www.youtube.com/channel/UCL2QpE1x2RabNu2LoHew9-Q',
  facebook: 'https://www.facebook.com/NacksGalerie/',
  linkedin: 'https://fr.linkedin.com/in/naguy-claude-nacks',
  artsy: 'https://www.artsy.net/artist/naguy-claude',
  artsper: 'https://www.artsper.com/fr/artistes-contemporains/france/54134/nacks',
  artmajeur: 'https://www.artmajeur.com/nacks',
  artspaceWarehouse: 'https://www.artspacewarehouse.com/en/artist-naguy-claude',
  firstDibs: 'https://www.1stdibs.com/creators/naguy-claude/art/paintings/',
} as const;

export const SOCIAL_HANDLES = {
  instagram: '@nacks_galerie',
  tiktok: '@nacksgalerie',
  youtube: '/@nacksgalerie',
  facebook: '/NacksGalerie',
  linkedin: '/in/naguy-claude-nacks',
} as const;

export const PARTNER_GALLERIES = [
  { key: 'artsy', label: 'Artsy', href: SOCIAL_LINKS.artsy },
  { key: 'artsper', label: 'Artsper', href: SOCIAL_LINKS.artsper },
  { key: 'artmajeur', label: 'ArtMajeur', href: SOCIAL_LINKS.artmajeur },
  { key: 'artspaceWarehouse', label: 'Artspace Warehouse', href: SOCIAL_LINKS.artspaceWarehouse },
  { key: 'firstDibs', label: '1stDibs', href: SOCIAL_LINKS.firstDibs },
] as const;
