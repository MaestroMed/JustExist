import type { Metadata, Viewport } from 'next';
import { fontClassNames } from '@/lib/fonts';
import { buildOrganization, buildWebSite, serializeJsonLd } from '@/lib/seo/jsonld';
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
  other: {
    'x-ua-compatible': 'IE=edge',
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

/*
 * ============================================================
 *   N A C K S · Built with soul.
 *   Site custom full-stack, pas un template.
 *   Code, design, data, assets — tout appartient à Nacks.
 *   Tu lis ce commentaire → tu es curieux.se.
 *   On pourrait probablement s'entendre : contact@nacksgalerie.com
 * ============================================================
 */

const HTML_PROLOGUE = `
  ███╗   ██╗ █████╗  ██████╗██╗  ██╗███████╗
  ████╗  ██║██╔══██╗██╔════╝██║ ██╔╝██╔════╝
  ██╔██╗ ██║███████║██║     █████╔╝ ███████╗
  ██║╚██╗██║██╔══██║██║     ██╔═██╗ ╚════██║
  ██║ ╚████║██║  ██║╚██████╗██║  ██╗███████║
  ╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝
  Ship with soul. Ship with code. Ship in custody.
  You're reading the source. Nice.
  contact@nacksgalerie.com
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={fontClassNames} suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line react/no-danger */}
        <script
          dangerouslySetInnerHTML={{
            __html: `/*\n${HTML_PROLOGUE}\n*/`,
          }}
        />
        {/* JSON-LD Organization + WebSite */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd([buildOrganization(), buildWebSite()]),
          }}
        />
      </head>
      <body>
        {/* Skip link — accessibilité clavier */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:rounded focus:bg-[var(--color-blood)] focus:px-4 focus:py-2 focus:font-[var(--font-mono)] focus:text-xs focus:uppercase focus:tracking-[0.25em] focus:text-[var(--color-cream)]"
        >
          Aller au contenu principal
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
