/** Tokens partagés entre emails — même palette que le site. */
export const EMAIL_TOKENS = {
  colors: {
    ink: '#0A0A0A',
    cream: '#F5F1E8',
    blood: '#E63946',
    subtle: '#9a958c',
  },
  fonts: {
    display:
      '"Space Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
  },
} as const;

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nacksgalerie.com';
