'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useWishlist } from '@/lib/hooks/useWishlist';
import { formatPrice } from '@/lib/content/artworks';
import { ArtPoster } from '@/components/art/ArtPoster';

/**
 * CompteDashboardClient — espace utilisateur (Sprint 1, sans auth).
 *
 * Shell visuel : preview wishlist (4 mini-cards) + sections placeholder
 * (commandes, certificats, adresses) qui annoncent les features Sprint 6.
 *
 * Reçoit la liste des œuvres sérialisée depuis le server component pour
 * éviter de re-charger / re-tailler artworks côté client.
 *
 * DA cream/ink, Playfair italic display, Inter body.
 * Animations whileInView fade-up stagger, prefers-reduced-motion respecté.
 */

const INK = 'var(--color-ink, #0a0a0a)';
const CREAM = 'var(--color-cream, #f5f1e8)';
const PAPER = '#fafafa';

const FONT_SERIF = "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = "var(--font-body, Inter, system-ui, sans-serif)";

type ArtworkLite = {
  slug: string;
  title: string;
  posterVariant:
    | 'poppy-neon'
    | 'poppy-classic'
    | 'gorille-gold'
    | 'fox-paris'
    | 'lion-eiffel'
    | 'poster-abstract-1'
    | 'poster-abstract-2'
    | 'figurine-mr-poppy';
  priceCents: number;
  status: 'in_stock' | 'sold_out' | 'on_demand' | 'coming';
};

type Props = {
  artworks: readonly ArtworkLite[];
};

export function CompteDashboardClient({ artworks }: Props) {
  const { slugs, hydrated } = useWishlist();
  const reduced = useReducedMotion();

  // Hydrate les 4 premiers slugs wishlist en œuvres complètes
  const wishlistPreview = useMemo<ArtworkLite[]>(() => {
    if (!hydrated) return [];
    const map = new Map(artworks.map((a) => [a.slug, a]));
    return slugs
      .map((slug) => map.get(slug))
      .filter((a): a is ArtworkLite => Boolean(a))
      .slice(0, 4);
  }, [slugs, artworks, hydrated]);

  const wishlistCount = hydrated ? slugs.length : 0;

  // Anim helpers
  const sectionInit = reduced ? false : { opacity: 0, y: 24 };
  const sectionAnim = reduced ? undefined : { opacity: 1, y: 0 };
  const sectionTransition = { duration: 0.7, ease: [0.19, 1, 0.22, 1] as const };

  return (
    <div className="flex flex-col gap-[clamp(3rem,6vh,4.5rem)]">
      {/* ─────────── SECTION 1 — Wishlist preview ─────────── */}
      <motion.section
        aria-labelledby="compte-wishlist-title"
        initial={sectionInit}
        whileInView={sectionAnim}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={sectionTransition}
        className="flex flex-col gap-[clamp(1.25rem,2.4vh,1.75rem)]"
      >
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2
            id="compte-wishlist-title"
            style={{
              fontFamily: FONT_SERIF,
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: INK,
              margin: 0,
            }}
          >
            Vos coups de cœur.
          </h2>
          {hydrated && wishlistCount > 0 && (
            <div className="flex items-baseline gap-4">
              <span
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: '0.78rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(10,10,10,0.55)',
                }}
              >
                {wishlistCount} œuvre{wishlistCount > 1 ? 's' : ''}
              </span>
              <Link
                href="/compte/wishlist"
                data-cursor="link"
                data-cursor-label="Wishlist"
                style={{
                  fontFamily: FONT_SERIF,
                  fontStyle: 'italic',
                  fontSize: '1rem',
                  color: INK,
                  borderBottom: '1px solid rgba(10,10,10,0.35)',
                  paddingBottom: '2px',
                  whiteSpace: 'nowrap',
                }}
              >
                Voir tout&nbsp;→
              </Link>
            </div>
          )}
        </div>

        {hydrated && wishlistPreview.length > 0 ? (
          <div className="grid grid-cols-2 gap-[clamp(0.75rem,1.5vw,1.25rem)] sm:grid-cols-4">
            {wishlistPreview.map((art, i) => (
              <WishlistMiniCard key={art.slug} artwork={art} index={i} reduced={!!reduced} />
            ))}
          </div>
        ) : (
          <EmptyCard
            title="Aucune œuvre enregistrée."
            cta={{ label: 'Voir les œuvres', href: '/oeuvres' }}
          />
        )}
      </motion.section>

      {/* ─────────── SECTION 2 — Commandes (placeholder) ─────────── */}
      <motion.section
        aria-labelledby="compte-orders-title"
        initial={sectionInit}
        whileInView={sectionAnim}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ ...sectionTransition, delay: reduced ? 0 : 0.05 }}
        className="flex flex-col gap-[clamp(1.25rem,2.4vh,1.75rem)]"
      >
        <h2
          id="compte-orders-title"
          style={{
            fontFamily: FONT_SERIF,
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: INK,
            margin: 0,
          }}
        >
          Vos commandes.
        </h2>

        <PlaceholderCard
          eyebrow="Coming soon"
          title="Suivi de commandes en préparation."
          subtitle="Sprint 6 : connexion email + accès aux factures et certificats d'authenticité."
        />
      </motion.section>

      {/* ─────────── SECTION 3 — Certificats (placeholder) ─────────── */}
      <motion.section
        aria-labelledby="compte-certs-title"
        initial={sectionInit}
        whileInView={sectionAnim}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ ...sectionTransition, delay: reduced ? 0 : 0.1 }}
        className="flex flex-col gap-[clamp(1.25rem,2.4vh,1.75rem)]"
      >
        <h2
          id="compte-certs-title"
          style={{
            fontFamily: FONT_SERIF,
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: INK,
            margin: 0,
          }}
        >
          Certificats d&apos;authenticité.
        </h2>

        <PlaceholderCard
          title="Tous vos certificats numérotés et signés numériquement."
          subtitle="Disponibles dès la première commande."
        />
      </motion.section>

      {/* ─────────── SECTION 4 — Adresses (placeholder) ─────────── */}
      <motion.section
        aria-labelledby="compte-addresses-title"
        initial={sectionInit}
        whileInView={sectionAnim}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ ...sectionTransition, delay: reduced ? 0 : 0.15 }}
        className="flex flex-col gap-[clamp(1.25rem,2.4vh,1.75rem)]"
      >
        <h2
          id="compte-addresses-title"
          style={{
            fontFamily: FONT_SERIF,
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: INK,
            margin: 0,
          }}
        >
          Adresses de livraison.
        </h2>

        <PlaceholderCard title="Configurées au moment du checkout." />
      </motion.section>

      {/* ─────────── Footer subtle — déconnexion factice ─────────── */}
      <motion.div
        initial={sectionInit}
        whileInView={sectionAnim}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ ...sectionTransition, delay: reduced ? 0 : 0.2 }}
        className="flex justify-end pt-[clamp(0.5rem,1vh,1rem)]"
      >
        <button
          type="button"
          aria-label="Se déconnecter (indisponible — auth Sprint 6)"
          disabled
          data-cursor="link"
          style={{
            fontFamily: FONT_BODY,
            fontSize: '0.78rem',
            letterSpacing: '0.04em',
            color: 'rgba(10,10,10,0.6)',
            background: 'transparent',
            border: 'none',
            padding: 0,
            cursor: 'not-allowed',
            transition: 'color 220ms ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = INK;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color =
              'rgba(10,10,10,0.6)';
          }}
        >
          Se déconnecter
        </button>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  Sous-composants                                                */
/* ─────────────────────────────────────────────────────────────── */

function WishlistMiniCard({
  artwork,
  index,
  reduced,
}: {
  artwork: ArtworkLite;
  index: number;
  reduced: boolean;
}) {
  const { slug, title, posterVariant, priceCents, status } = artwork;
  const soldOut = status === 'sold_out';
  const coming = status === 'coming';

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{
        duration: 0.55,
        delay: reduced ? 0 : index * 0.06,
        ease: [0.19, 1, 0.22, 1],
      }}
    >
      <Link
        href={`/oeuvres/${slug}`}
        data-cursor="image"
        data-cursor-label={soldOut ? 'Épuisé' : 'Voir'}
        className="group block"
      >
        <div
          className="relative w-full overflow-hidden"
          style={{
            aspectRatio: '4 / 5',
            backgroundColor: INK,
          }}
        >
          <div
            className="absolute inset-0 transition-transform duration-700"
            style={{
              transitionTimingFunction: 'cubic-bezier(0.19,1,0.22,1)',
            }}
          >
            <ArtPoster variant={posterVariant} label={title} />
          </div>

          {/* hover scale via CSS group */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              boxShadow:
                'inset 0 0 0 1px rgba(245,241,232,0.18), inset 0 0 60px rgba(230,57,70,0.08)',
            }}
          />

          {(soldOut || coming) && (
            <span
              className="absolute left-2 top-2"
              style={{
                fontFamily: FONT_BODY,
                fontSize: '0.6rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                background: soldOut
                  ? 'var(--color-blood, #e63946)'
                  : CREAM,
                color: soldOut ? CREAM : INK,
                padding: '0.25rem 0.55rem',
                borderRadius: '999px',
              }}
            >
              {soldOut ? 'Épuisé' : 'Bientôt'}
            </span>
          )}
        </div>

        <div className="mt-2 flex items-start justify-between gap-2">
          <h3
            className="min-w-0 flex-1 truncate"
            style={{
              fontFamily: FONT_SERIF,
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(0.92rem, 1vw, 1.05rem)',
              lineHeight: 1.2,
              color: INK,
              margin: 0,
            }}
          >
            {title}
          </h3>
          <span
            style={{
              fontFamily: FONT_BODY,
              fontSize: '0.78rem',
              fontVariantNumeric: 'tabular-nums',
              color: coming ? 'rgba(10,10,10,0.45)' : INK,
              flexShrink: 0,
            }}
          >
            {coming ? '—' : formatPrice(priceCents)}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function EmptyCard({
  title,
  cta,
}: {
  title: string;
  cta: { label: string; href: string };
}) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 text-center"
      style={{
        backgroundColor: PAPER,
        border: '1px solid rgba(10,10,10,0.08)',
        padding: 'clamp(2.5rem, 5vh, 3.5rem) clamp(1.5rem, 3vw, 2rem)',
        borderRadius: '2px',
      }}
    >
      <p
        style={{
          fontFamily: FONT_SERIF,
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 'clamp(1.15rem, 1.6vw, 1.4rem)',
          lineHeight: 1.3,
          color: INK,
          margin: 0,
        }}
      >
        {title}
      </p>
      <Link
        href={cta.href}
        data-cursor="link"
        data-cursor-label={cta.label}
        style={{
          fontFamily: FONT_SERIF,
          fontStyle: 'italic',
          fontSize: '1rem',
          color: INK,
          borderBottom: '1px solid rgba(10,10,10,0.35)',
          paddingBottom: '2px',
        }}
      >
        {cta.label}&nbsp;→
      </Link>
    </div>
  );
}

function PlaceholderCard({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div
      className="flex flex-col gap-3"
      style={{
        backgroundColor: PAPER,
        border: '1px solid rgba(10,10,10,0.08)',
        padding: 'clamp(1.5rem, 3vh, 2.25rem) clamp(1.5rem, 3vw, 2rem)',
        borderRadius: '2px',
      }}
    >
      {eyebrow && (
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: '0.7rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(10,10,10,0.55)',
            margin: 0,
          }}
        >
          {eyebrow}
        </p>
      )}
      <p
        style={{
          fontFamily: FONT_SERIF,
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 'clamp(1.1rem, 1.4vw, 1.35rem)',
          lineHeight: 1.35,
          color: INK,
          margin: 0,
          maxWidth: '52ch',
        }}
      >
        {title}
      </p>
      {subtitle && (
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 'clamp(0.88rem, 1vw, 0.98rem)',
            lineHeight: 1.55,
            color: 'rgba(10,10,10,0.7)',
            margin: 0,
            maxWidth: '52ch',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
