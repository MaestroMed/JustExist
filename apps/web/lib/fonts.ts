import {
  Space_Grotesk,
  Inter,
  JetBrains_Mono,
  Permanent_Marker,
  Caveat,
  Playfair_Display,
} from 'next/font/google';

export const fontDisplay = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display-raw',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body-raw',
  display: 'swap',
});

export const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-raw',
  weight: ['400', '500', '600'],
  display: 'swap',
});

/* ────────── Graffiti / street art typographies ────────── */
export const fontGraffiti = Permanent_Marker({
  subsets: ['latin'],
  variable: '--font-graffiti',
  weight: '400',
  display: 'swap',
});

export const fontTag = Caveat({
  subsets: ['latin'],
  variable: '--font-tag',
  display: 'swap',
});

export const fontSerif = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  style: ['italic', 'normal'],
});

export const fontClassNames = [
  fontDisplay.variable,
  fontBody.variable,
  fontMono.variable,
  fontGraffiti.variable,
  fontTag.variable,
  fontSerif.variable,
].join(' ');
