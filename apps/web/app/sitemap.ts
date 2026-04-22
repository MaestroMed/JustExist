import type { MetadataRoute } from 'next';
import { artworks } from '@/lib/content/artworks';
import { drops } from '@/lib/content/drops';
import { characters } from '@/lib/content/characters';
import { journalPosts } from '@/lib/content/journal';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nacksgalerie.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/oeuvres`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/drops`, lastModified: now, changeFrequency: 'hourly', priority: 0.9 },
    { url: `${SITE_URL}/univers`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/journal`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/atelier`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/atelier/commission`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/atelier/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/atelier/presse`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/compte`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/panier`, lastModified: now, changeFrequency: 'never', priority: 0.2 },
    { url: `${SITE_URL}/journal/changelog`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${SITE_URL}/legal/cgv`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/legal/confidentialite`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/legal/mentions`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/legal/retours`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const artworkEntries: MetadataRoute.Sitemap = artworks.map((a) => ({
    url: `${SITE_URL}/oeuvres/${a.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const dropEntries: MetadataRoute.Sitemap = drops.map((d) => ({
    url: `${SITE_URL}/drops/${d.slug}`,
    lastModified: now,
    changeFrequency: d.status === 'live' ? 'hourly' : 'weekly',
    priority: d.status === 'live' ? 1 : 0.7,
  }));

  const characterEntries: MetadataRoute.Sitemap = characters.map((c) => ({
    url: `${SITE_URL}/univers/${c.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const postEntries: MetadataRoute.Sitemap = journalPosts.map((p) => ({
    url: `${SITE_URL}/journal/${p.slug}`,
    lastModified: p.publishedAt,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    ...staticEntries,
    ...artworkEntries,
    ...dropEntries,
    ...characterEntries,
    ...postEntries,
  ];
}
