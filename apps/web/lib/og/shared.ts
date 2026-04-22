/**
 * Tokens + helpers partagés pour les OG images dynamiques (next/og).
 * Attention : next/og accepte un sous-ensemble de CSS. Tout passe en inline styles.
 */

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_ALT = 'Nacks Galerie — le royaume numérique de Naguy Claude.';
export const OG_CONTENT_TYPE = 'image/png' as const;

export const OG_COLORS = {
  ink: '#0A0A0A',
  cream: '#F5F1E8',
  blood: '#E63946',
  bubble: '#FFD43B',
  poppy: '#1E40AF',
  luxe: '#D4A056',
  pop: '#EC4899',
  cyan: '#06B6D4',
  acid: '#4ADE80',
  muted: 'rgba(245, 241, 232, 0.55)',
} as const;

export function priceText(cents: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
