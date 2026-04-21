import type { Metadata, Viewport } from 'next';
import { fontClassNames } from '@/lib/fonts';
import { Providers } from './providers';
import './globals.css';

const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? 'Nacks Galerie';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s — ${siteName}`,
  },
  description:
    "Le royaume numérique de Naguy « Nacks » Claude — artiste peintre, originaux, drops, éditions limitées.",
  applicationName: siteName,
  authors: [{ name: 'Naguy Claude (Nacks)' }],
  creator: 'Naguy Claude',
  keywords: [
    'Nacks',
    'Naguy Claude',
    'art',
    'street art',
    'peinture',
    'Mr Poppy',
    'Sarcelles',
    'galerie',
    'drop',
    'original',
    'édition limitée',
  ],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteUrl,
    title: siteName,
    description:
      "Le royaume numérique de Naguy « Nacks » Claude. Originaux, drops, éditions, univers.",
    siteName,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description:
      "Le royaume numérique de Naguy « Nacks » Claude. Originaux, drops, éditions, univers.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={fontClassNames} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
