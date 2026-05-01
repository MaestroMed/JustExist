/**
 * Helpers JSON-LD pour injecter du Schema.org dans les pages.
 * Pattern : appeler une fonction `buildXxx()` qui retourne un objet
 * sérialisable → <script type="application/ld+json">.
 */

import type { Artwork } from '@/lib/content/artworks';
import type { Drop } from '@/lib/content/drops';
import type {
  Character,
  ExperimentalProject,
} from '@/lib/content/characters';
import type { JournalPost } from '@/lib/content/journal';
import { nacks } from '@/lib/content/nacks';
import { SOCIAL_LINKS } from '@/lib/content/social';

// Tous les profils externes — pour sameAs[] complet sur Person + Organization.
const ALL_SAME_AS: readonly string[] = [
  SOCIAL_LINKS.instagram,
  SOCIAL_LINKS.tiktok,
  SOCIAL_LINKS.youtube,
  SOCIAL_LINKS.facebook,
  SOCIAL_LINKS.linkedin,
  SOCIAL_LINKS.artsy,
  SOCIAL_LINKS.artsper,
  SOCIAL_LINKS.artmajeur,
  SOCIAL_LINKS.artspaceWarehouse,
  SOCIAL_LINKS.firstDibs,
];

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nacksgalerie.com';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? 'Nacks Galerie';

type JsonLd = Record<string, unknown>;

// ─────────── Organization / WebSite ───────────

export function buildOrganization(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    founder: { '@type': 'Person', name: nacks.name, alternateName: nacks.alias },
    foundingDate: '2022',
    foundingLocation: { '@type': 'Place', name: nacks.birthplace },
    sameAs: ALL_SAME_AS,
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@nacksgalerie.com',
      contactType: 'customer service',
      areaServed: 'FR',
      availableLanguage: ['fr', 'en'],
    },
  };
}

/**
 * ArtGallery Schema — Nacks Galerie comme galerie d'art en ligne.
 * Plus spécifique que Organization pour SEO local + rich snippets art.
 */
export function buildArtGallery(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ArtGallery',
    '@id': `${SITE_URL}/#artgallery`,
    name: SITE_NAME,
    alternateName: 'NACKS GALERIE',
    description:
      "Galerie en ligne officielle de Naguy Claude alias Nacks. Œuvres originales, customs sur commande, reproductions limitées. Pop Art × Street Art.",
    url: SITE_URL,
    image: `${SITE_URL}${nacks.portraitImage}`,
    logo: `${SITE_URL}/icon.svg`,
    founder: { '@id': `${SITE_URL}/atelier#person` },
    artist: { '@id': `${SITE_URL}/atelier#person` },
    foundingDate: '2022',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sarcelles',
      addressRegion: "Val-d'Oise",
      addressCountry: 'FR',
    },
    sameAs: ALL_SAME_AS,
  };
}

export function buildWebSite(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: 'fr-FR',
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/oeuvres?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function buildPerson(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/atelier#person`,
    name: nacks.name,
    alternateName: nacks.alias,
    givenName: 'Naguy',
    familyName: 'Claude',
    url: `${SITE_URL}/atelier`,
    image: `${SITE_URL}${nacks.portraitImage}`,
    jobTitle: 'Artiste peintre',
    description: nacks.description,
    nationality: { '@type': 'Country', name: 'France' },
    birthPlace: { '@type': 'Place', name: nacks.birthplace },
    workLocation: [
      { '@type': 'Place', name: 'Sarcelles, France' },
      { '@type': 'Place', name: 'Paris, France' },
      { '@type': 'Place', name: 'Los Angeles, United States' },
      { '@type': 'Place', name: 'Casablanca, Morocco' },
    ],
    award: nacks.awards.map((a) => `${a.title} (${a.year})`),
    knowsAbout: [
      'Pop Art',
      'Street Art',
      'POSCA',
      'Graffiti',
      'Aerosol',
      'Acrylic painting',
      'Stencil',
      'Mickey Mouse',
      'Snoopy',
      'Pop culture',
    ],
    worksFor: { '@id': `${SITE_URL}/#artgallery` },
    sameAs: ALL_SAME_AS,
  };
}

// ─────────── BreadcrumbList ───────────

export function buildBreadcrumb(items: { name: string; href: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

// ─────────── VisualArtwork / Product ───────────

export function buildArtwork(
  artwork: Artwork,
  character?: Character | ExperimentalProject | null,
): JsonLd[] {
  const id = `${SITE_URL}/oeuvres/${artwork.slug}#artwork`;
  const availability =
    artwork.status === 'in_stock'
      ? 'https://schema.org/InStock'
      : artwork.status === 'sold_out'
        ? 'https://schema.org/SoldOut'
        : artwork.status === 'coming'
          ? 'https://schema.org/PreOrder'
          : 'https://schema.org/LimitedAvailability';

  const visual: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    '@id': id,
    name: artwork.title,
    description: artwork.lore,
    creator: { '@id': `${SITE_URL}/atelier#person` },
    dateCreated: String(artwork.year),
    artform: 'Painting',
    artMedium: artwork.materials,
    artworkSurface: artwork.materials,
    width: parseDimension(artwork.dimensions, 0),
    height: parseDimension(artwork.dimensions, 1),
    url: `${SITE_URL}/oeuvres/${artwork.slug}`,
    image: `${SITE_URL}/oeuvres/${artwork.slug}/opengraph-image`,
    ...(character ? { about: character.name } : {}),
  };

  const product: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${SITE_URL}/oeuvres/${artwork.slug}#product`,
    name: artwork.title,
    description: artwork.subtitle,
    brand: { '@id': `${SITE_URL}/#organization` },
    category: typeCategory(artwork.type),
    sku: artwork.slug,
    image: [`${SITE_URL}/oeuvres/${artwork.slug}/opengraph-image`],
    offers: {
      '@type': 'Offer',
      price: (artwork.priceCents / 100).toFixed(2),
      priceCurrency: 'EUR',
      availability,
      url: `${SITE_URL}/oeuvres/${artwork.slug}`,
      seller: { '@id': `${SITE_URL}/#organization` },
    },
    ...(artwork.edition
      ? {
          additionalProperty: [
            {
              '@type': 'PropertyValue',
              name: 'edition',
              value: `${artwork.edition.size} exemplaires`,
            },
            {
              '@type': 'PropertyValue',
              name: 'edition_remaining',
              value: artwork.edition.remaining,
            },
          ],
        }
      : {}),
  };

  return [visual, product];
}

// ─────────── Drop (Event) ───────────

export function buildDropEvent(drop: Drop, artwork?: Artwork): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    '@id': `${SITE_URL}/drops/${drop.slug}#event`,
    name: drop.title,
    description: drop.lore,
    startDate: drop.opensAt.toISOString(),
    endDate: drop.closesAt?.toISOString() ?? undefined,
    eventStatus:
      drop.status === 'live'
        ? 'https://schema.org/EventScheduled'
        : drop.status === 'past' || drop.status === 'sold_out'
          ? 'https://schema.org/EventMovedOnline'
          : 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    location: {
      '@type': 'VirtualLocation',
      url: `${SITE_URL}/drops/${drop.slug}`,
    },
    organizer: { '@id': `${SITE_URL}/#organization` },
    offers: {
      '@type': 'Offer',
      price: (drop.priceCents / 100).toFixed(2),
      priceCurrency: 'EUR',
      availability:
        drop.status === 'live'
          ? 'https://schema.org/InStock'
          : drop.status === 'upcoming'
            ? 'https://schema.org/PreOrder'
            : 'https://schema.org/SoldOut',
      url: `${SITE_URL}/drops/${drop.slug}`,
      validFrom: drop.opensAt.toISOString(),
    },
    ...(artwork ? { workPerformed: { '@id': `${SITE_URL}/oeuvres/${artwork.slug}#artwork` } } : {}),
  };
}

// ─────────── BlogPosting ───────────

export function buildBlogPosting(post: JournalPost): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${SITE_URL}/journal/${post.slug}#post`,
    headline: post.title,
    description: post.excerpt,
    articleBody: post.body.join('\n\n'),
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.publishedAt.toISOString(),
    author: { '@id': `${SITE_URL}/atelier#person` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/journal/${post.slug}`,
    },
    image: `${SITE_URL}/journal/${post.slug}/opengraph-image`,
    url: `${SITE_URL}/journal/${post.slug}`,
    timeRequired: `PT${post.readingTime}M`,
    inLanguage: 'fr-FR',
  };
}

// ─────────── FAQPage ───────────

export function buildFAQ(faqs: { question: string; answer: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };
}

// ─────────── Helpers ───────────

function parseDimension(dimensions: string, axis: 0 | 1): { '@type': string; value: number; unitCode: string } | undefined {
  const match = dimensions.match(/(\d+(?:\.\d+)?)\s*[×xX*]\s*(\d+(?:\.\d+)?)/);
  if (!match) return undefined;
  const valueRaw = axis === 0 ? match[1] : match[2];
  if (!valueRaw) return undefined;
  const value = parseFloat(valueRaw);
  if (Number.isNaN(value)) return undefined;
  return { '@type': 'QuantitativeValue', value, unitCode: 'CMT' };
}

function typeCategory(t: Artwork['type']): string {
  switch (t) {
    case 'original':
      return 'Original painting';
    case 'giclee':
      return 'Giclée print';
    case 'serigraphie':
      return 'Silkscreen print';
    case 'poster':
      return 'Poster';
    case 'figurine':
      return 'Sculpture';
    case 'merch':
      return 'Apparel';
  }
}

// ─────────── Serializer helper ───────────

/**
 * Sérialise un ou plusieurs objets JSON-LD pour dangerouslySetInnerHTML.
 * Usage : <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd([...]) }} />
 */
export function serializeJsonLd(data: JsonLd | JsonLd[]): string {
  const payload = Array.isArray(data) ? data : [data];
  return JSON.stringify(payload);
}
