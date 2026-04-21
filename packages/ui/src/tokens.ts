/**
 * Design tokens — exposés en TypeScript pour usage programmatique
 * (GSAP colors, Three.js materials, canvas, etc.).
 * Valeurs miroir de packages/config/styles/theme.css.
 * Source de vérité : le CSS. Ce fichier en est la projection TS.
 */

export const colors = {
  ink: '#0A0A0A',
  cream: '#F5F1E8',
  blood: '#E63946',
  bubble: '#FFD43B',
  acid: '#4ADE80',
  poppy: '#1E40AF',
  pop: '#EC4899',
  luxe: '#D4A056',
  fortnite: '#7C3AED',
  cyan: '#06B6D4',
} as const;

export type ColorToken = keyof typeof colors;

export const fonts = {
  display: "'Space Grotesk', ui-sans-serif, system-ui, -apple-system, sans-serif",
  body: "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, monospace",
} as const;

export const easing = {
  outExpo: [0.16, 1, 0.3, 1] as [number, number, number, number],
  inOutExpo: [0.87, 0, 0.13, 1] as [number, number, number, number],
  outCubic: [0.33, 1, 0.68, 1] as [number, number, number, number],
  nacks: [0.19, 1, 0.22, 1] as [number, number, number, number],
} as const;

export const duration = {
  fast: 0.15,
  base: 0.3,
  slow: 0.6,
  cinematic: 1.2,
} as const;

export const z = {
  below: -1,
  base: 0,
  raised: 10,
  dropdown: 100,
  sticky: 200,
  overlay: 500,
  modal: 1000,
  cursor: 9999,
} as const;
