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

/**
 * Charge une font Google Fonts en ArrayBuffer pour `next/og`.
 * Renvoie `null` si le fetch échoue (l'OG fallback alors sur la font système).
 *
 * On utilise l'API v1 (`/css?...`) qui sert du TTF par défaut.
 * `satori` (engine de next/og) ne supporte pas WOFF2, ce que sert l'API v2.
 *
 * @param family   Nom de la famille avec espaces : "Space Grotesk", "Playfair Display"…
 * @param variant  Variant string v1 : "400", "700", "500italic", "700italic", "regular"…
 */
export async function loadGoogleFont(
  family: string,
  variant = 'regular',
): Promise<ArrayBuffer | null> {
  try {
    const cssUrl = `https://fonts.googleapis.com/css?family=${family.replace(/ /g, '+')}:${variant}`;
    const cssResp = await fetch(cssUrl);
    if (!cssResp.ok) return null;
    const css = await cssResp.text();
    const fontUrl = css.match(/src:\s*url\((https?:\/\/[^)]+)\)/)?.[1];
    if (!fontUrl) return null;
    const fontResp = await fetch(fontUrl);
    if (!fontResp.ok) return null;
    return await fontResp.arrayBuffer();
  } catch {
    return null;
  }
}
