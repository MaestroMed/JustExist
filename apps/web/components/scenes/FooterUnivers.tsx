import Link from 'next/link';
import { Container } from '@nacks/ui';
import { SOCIAL_LINKS, PARTNER_GALLERIES } from '@/lib/content/social';

/**
 * SCÈNE 8 — FooterUnivers (DA pivot premium minimaliste).
 *
 * Footer corporate galerie : 4 colonnes carrées, brand row top, social row,
 * legal row bottom. Inspirations Hermès / Stripe / Aesop.
 *
 * Tokens : --color-ink (#0a0a0a) background dominant, --color-cream texte.
 * Typo : Inter (var(--font-body)) pour items, Permanent Marker UNIQUEMENT
 * sur le wordmark "NACKS GALERIE" en top.
 *
 * Server component — aucune interactivité, transitions CSS hover only,
 * prefers-reduced-motion respecté de fait (rien à animer).
 *
 * Routes vérifiées dans apps/web/app/. Fallbacks documentés :
 *   - Manifeste : pas de page dédiée → ancre /#scene-manifeste
 *   - Certificats : pas de page dédiée → /legal/mentions#certificats
 *   - Livraison : mutualisée avec Retours sur /legal/retours
 */

type ColLink = { href: string; label: string };
type Col = { title: string; links: ColLink[] };

const COLUMNS: Col[] = [
  {
    title: 'Galerie',
    links: [
      { href: '/oeuvres', label: 'Œuvres' },
      { href: '/univers', label: 'Séries' },
      { href: '/atelier/commission', label: 'Customs' },
      { href: '/drops', label: 'Drops live' },
    ],
  },
  {
    title: 'Atelier',
    links: [
      { href: '/atelier', label: 'À propos' },
      { href: '/#scene-manifeste', label: 'Manifeste' },
      { href: '/atelier/chronologie', label: 'Expositions' },
      { href: '/journal', label: 'Journal' },
      { href: '/atelier/presse', label: 'Presse' },
    ],
  },
  {
    title: 'Boutique',
    links: [
      { href: '/panier', label: 'Panier' },
      { href: '/compte/wishlist', label: 'Wishlist' },
      { href: '/compte', label: 'Compte' },
      { href: '/legal/retours', label: 'Livraison' },
      { href: '/legal/retours', label: 'Retours' },
    ],
  },
  {
    title: 'Légal',
    links: [
      { href: '/legal/cgv', label: 'CGV' },
      { href: '/legal/confidentialite', label: 'Confidentialité' },
      { href: '/legal/mentions', label: 'Mentions' },
      { href: '/legal/mentions#certificats', label: 'Certificats' },
    ],
  },
];

type SocialIconName = 'instagram' | 'tiktok' | 'youtube' | 'facebook' | 'linkedin';

const SOCIALS: { href: string; label: string; icon: SocialIconName }[] = [
  { href: SOCIAL_LINKS.instagram, label: 'Instagram', icon: 'instagram' },
  { href: SOCIAL_LINKS.tiktok, label: 'TikTok', icon: 'tiktok' },
  { href: SOCIAL_LINKS.youtube, label: 'YouTube', icon: 'youtube' },
  { href: SOCIAL_LINKS.facebook, label: 'Facebook', icon: 'facebook' },
  { href: SOCIAL_LINKS.linkedin, label: 'LinkedIn', icon: 'linkedin' },
];

const FONT_GRAFFITI = "var(--font-graffiti, 'Permanent Marker', system-ui, sans-serif)";
const FONT_BODY = "var(--font-body, Inter, system-ui, sans-serif)";

export function FooterUnivers() {
  return (
    <footer
      className="relative w-full bg-[var(--color-ink)] text-[var(--color-cream)]"
      style={{
        paddingTop: 'clamp(4rem, 8vh, 6rem)',
        paddingBottom: 'clamp(2rem, 4vh, 3rem)',
        fontFamily: FONT_BODY,
      }}
      aria-label="Pied de page du site"
    >
      <Container size="wide">
        {/* ═══════ Top brand row ═══════ */}
        <div
          className="flex flex-wrap items-end justify-between gap-6 border-b border-[var(--color-cream-100)]"
          style={{ paddingBottom: 'clamp(2rem, 4vh, 3rem)' }}
        >
          <Link
            href="/"
            className="leading-none transition-opacity hover:opacity-80"
            style={{
              fontFamily: FONT_GRAFFITI,
              fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
              letterSpacing: '0.01em',
              color: 'var(--color-cream)',
            }}
            aria-label="NACKS GALERIE — retour à l'accueil"
          >
            NACKS GALERIE
          </Link>

          <div
            className="flex items-center gap-6"
            style={{ fontSize: '0.8125rem' }}
          >
            <span
              className="uppercase tracking-[0.18em] text-[var(--color-cream-600)]"
              aria-label="Langue actuelle"
            >
              Français
            </span>
          </div>
        </div>

        {/* ═══════ 4 colonnes ═══════ */}
        <div
          className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4"
          style={{
            paddingBlock: 'clamp(2.5rem, 6vh, 4rem)',
          }}
        >
          {COLUMNS.map((col) => (
            <FooterColumn key={col.title} col={col} />
          ))}
        </div>

        {/* ═══════ Social row ═══════ */}
        <div
          className="flex flex-wrap items-center gap-6 border-t border-[var(--color-cream-100)] md:gap-10"
          style={{ paddingBlock: 'clamp(1.5rem, 3vh, 2rem)' }}
        >
          <p
            className="uppercase tracking-[0.2em] text-[var(--color-cream-600)]"
            style={{ fontSize: '0.75rem' }}
          >
            Suivez l’atelier
          </p>
          <div className="flex items-center gap-5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-[var(--color-cream-600)] transition-all duration-200 hover:scale-105 hover:text-[var(--color-cream)]"
                style={{ display: 'inline-flex' }}
              >
                <SocialIcon name={s.icon} />
              </a>
            ))}
          </div>
        </div>

        {/* ═══════ Galeries partenaires — "Aussi disponible sur" ═══════ */}
        <div
          className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[var(--color-cream-100)] md:gap-x-10"
          style={{ paddingBlock: 'clamp(1.5rem, 3vh, 2rem)' }}
        >
          <p
            className="uppercase tracking-[0.2em] text-[var(--color-cream-600)]"
            style={{ fontSize: '0.75rem' }}
          >
            Aussi disponible sur
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 md:gap-x-7">
            {PARTNER_GALLERIES.map((gallery) => (
              <li key={gallery.key}>
                <a
                  href={gallery.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="uppercase text-[var(--color-cream-600)] transition-colors duration-200 hover:text-[var(--color-cream)]"
                  style={{
                    fontSize: '0.7rem',
                    letterSpacing: '0.18em',
                    fontWeight: 500,
                  }}
                >
                  {gallery.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ═══════ Legal row ═══════ */}
        <div
          className="flex flex-col gap-3 border-t border-[var(--color-cream-100)] text-[var(--color-cream-400)] md:flex-row md:items-center md:justify-between"
          style={{
            paddingTop: 'clamp(1.25rem, 2.5vh, 1.75rem)',
            fontSize: '0.75rem',
          }}
        >
          <p>
            &copy; 2026 NACKS GALERIE — Naguy Claude
            <span className="mx-2 opacity-60">·</span>
            Atelier de Paris
          </p>
          <p>
            Galerie officielle
            <span className="mx-2 opacity-60">·</span>
            Livraison France &amp; international
            <span className="mx-2 opacity-60">·</span>
            Certificats d&rsquo;authenticité
          </p>
        </div>
      </Container>
    </footer>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Footer colonne — header uppercase + items Inter
 * ────────────────────────────────────────────────────────────────── */
function FooterColumn({ col }: { col: Col }) {
  return (
    <div className="flex flex-col gap-4">
      <h4
        className="uppercase tracking-[0.18em] text-[var(--color-cream-600)]"
        style={{
          fontSize: '0.75rem',
          fontWeight: 500,
        }}
      >
        {col.title}
      </h4>
      <ul className="flex flex-col gap-2.5">
        {col.links.map((l) => (
          <li key={`${col.title}-${l.label}`}>
            <Link
              href={l.href}
              className="footer-link inline-block text-[var(--color-cream)] transition-colors duration-200 hover:text-[var(--color-cream)]"
              style={{
                fontSize: '0.9rem',
                lineHeight: 1.4,
              }}
            >
              <span
                className="border-b border-transparent transition-[border-color] duration-200 hover:border-[var(--color-cream)]"
                style={{ paddingBottom: '1px' }}
              >
                {l.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Social icons — 24×24, stroke currentColor, hover via parent
 * ────────────────────────────────────────────────────────────────── */
function SocialIcon({ name }: { name: SocialIconName }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    role: 'presentation' as const,
  };

  if (name === 'instagram') {
    return (
      <svg {...common}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (name === 'tiktok') {
    return (
      <svg {...common}>
        <path d="M14 4v9.5a3.5 3.5 0 1 1-3.5-3.5" />
        <path d="M14 4c0 2.5 2 4.5 4.5 4.5" />
      </svg>
    );
  }

  if (name === 'facebook') {
    return (
      <svg {...common}>
        <path d="M14 7.5h2.5V4.25h-2.5C12.07 4.25 10.5 5.82 10.5 7.75v2H8.5v3.25h2v6.75h3v-6.75h2.25l.5-3.25H13.5v-1.5c0-.41.34-.75.5-.75z" />
      </svg>
    );
  }

  if (name === 'linkedin') {
    return (
      <svg {...common}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="7.5" y1="10" x2="7.5" y2="17" />
        <circle cx="7.5" cy="7" r="0.7" fill="currentColor" stroke="none" />
        <path d="M11 17v-7M11 12.5c0-1.4 1-2.5 2.5-2.5s2.5 1.1 2.5 2.5V17" />
      </svg>
    );
  }

  // youtube
  return (
    <svg {...common}>
      <rect x="2.5" y="6" width="19" height="12" rx="3" />
      <path d="M10.5 9.5l4 2.5-4 2.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}
