import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';

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

export const fontClassNames = [
  fontDisplay.variable,
  fontBody.variable,
  fontMono.variable,
].join(' ');
