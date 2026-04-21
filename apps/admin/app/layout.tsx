import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const fontDisplay = Space_Grotesk({ subsets: ['latin'], variable: '--font-display-raw' });
const fontBody = Inter({ subsets: ['latin'], variable: '--font-body-raw' });
const fontMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono-raw' });

export const metadata: Metadata = {
  title: 'Admin — Nacks Galerie',
  description: 'Dashboard interne — Nacks Galerie.',
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  colorScheme: 'dark',
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
