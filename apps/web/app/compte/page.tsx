import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@nacks/ui';
import { PageShell } from '@/components/layouts/PageShell';
import { artworks } from '@/lib/content/artworks';
import { CompteDashboardClient } from '@/components/compte/CompteDashboardClient';

export const metadata: Metadata = {
  title: 'Compte — Nacks Galerie',
  description:
    "Votre espace pour suivre vos commandes, gérer votre wishlist et conserver vos certificats d'authenticité.",
};

const INK = 'var(--color-ink, #0a0a0a)';
const CREAM = 'var(--color-cream, #f5f1e8)';
const PAPER = '#fafafa';
const BLOOD = 'var(--color-blood, #e63946)';

const FONT_SERIF = "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = "var(--font-body, Inter, system-ui, sans-serif)";

/**
 * /compte — Dashboard utilisateur.
 *
 * Sprint 1 : pas d'auth réelle. Shell visuel élégant qui annonce les features
 * à venir (commandes, certificats, adresses) + accès direct à la wishlist
 * (qui marche déjà via localStorage).
 *
 * DA cream/ink, Playfair italic XXL, Inter body. Wrap PageShell.
 * Server component pour metadata ; CompteDashboardClient s'occupe des infos
 * dynamiques (count wishlist + œuvres récemment likées).
 */
export default function ComptePage() {
  // Sérialisation minimale des œuvres pour le client component (pour le panneau "récents")
  const artworksLite = artworks.map((a) => ({
    slug: a.slug,
    title: a.title,
    posterVariant: a.posterVariant,
    priceCents: a.priceCents,
    status: a.status,
  }));

  return (
    <PageShell>
      <section
        aria-label="Tableau de bord du compte"
        className="relative"
        style={{
          backgroundColor: CREAM,
          color: INK,
          paddingBlock: 'clamp(5rem, 10vh, 9rem)',
        }}
      >
        <Container size="content">
          {/* ─── Header ─── */}
          <header className="flex flex-col gap-[clamp(1.25rem,2.4vh,1.75rem)]">
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: '0.72rem',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'rgba(10,10,10,0.55)',
              }}
            >
              Compte
            </p>

            <h1
              style={{
                fontFamily: FONT_SERIF,
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(3rem, 8vw, 6.5rem)',
                lineHeight: 0.96,
                letterSpacing: '-0.025em',
                color: INK,
                margin: 0,
              }}
            >
              Bienvenue.
            </h1>

            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 'clamp(1rem, 1.1vw, 1.15rem)',
                lineHeight: 1.55,
                color: 'rgba(10,10,10,0.7)',
                maxWidth: '46ch',
                margin: 0,
              }}
            >
              Votre espace pour suivre vos commandes, gérer votre wishlist et
              conserver vos certificats d&apos;authenticité.
            </p>
          </header>

          {/* ─── Notice "auth bientôt" ─── */}
          <aside
            className="mt-[clamp(2.5rem,5vh,3.5rem)] flex items-start gap-4"
            style={{
              backgroundColor: PAPER,
              border: '1px solid rgba(10,10,10,0.08)',
              padding: 'clamp(1.25rem, 2.4vh, 1.75rem) clamp(1.5rem, 3vw, 2rem)',
              borderRadius: '2px',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                display: 'inline-flex',
                marginTop: '0.15rem',
                width: '0.55rem',
                height: '0.55rem',
                borderRadius: '50%',
                backgroundColor: BLOOD,
                flexShrink: 0,
              }}
            />
            <div className="flex flex-col gap-1">
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: '0.7rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'rgba(10,10,10,0.55)',
                }}
              >
                Authentification — bientôt
              </p>
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 'clamp(0.92rem, 1vw, 1rem)',
                  lineHeight: 1.55,
                  color: 'rgba(10,10,10,0.78)',
                  margin: 0,
                }}
              >
                L&apos;authentification arrive bientôt. En attendant, votre wishlist
                est sauvegardée localement dans ce navigateur.
              </p>
            </div>
          </aside>

          {/* ─── Cards sections compte (client : count wishlist) ─── */}
          <div className="mt-[clamp(3rem,6vh,4.5rem)]">
            <CompteDashboardClient artworks={artworksLite} />
          </div>

          {/* ─── Footer note ─── */}
          <footer
            className="mt-[clamp(3rem,6vh,4rem)] border-t pt-[clamp(1.5rem,3vh,2rem)]"
            style={{ borderColor: 'rgba(10,10,10,0.1)' }}
          >
            <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: '0.78rem',
                  lineHeight: 1.5,
                  color: 'rgba(10,10,10,0.55)',
                  margin: 0,
                  maxWidth: '52ch',
                }}
              >
                Pour toute question sur une commande ou un certificat, écrivez-nous —
                nous répondons sous 48h.
              </p>
              <Link
                href="/contact"
                data-cursor="link"
                data-cursor-label="Contact"
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
                Nous contacter&nbsp;→
              </Link>
            </div>
          </footer>
        </Container>
      </section>
    </PageShell>
  );
}
