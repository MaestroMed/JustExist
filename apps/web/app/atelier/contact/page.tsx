import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/layouts/PageShell';
import { ContactFormBespoke } from './ContactFormBespoke';

export const metadata: Metadata = {
  title: 'Contact — Naguy "Nacks" Claude',
  description:
    "Écrivez à Nacks — presse, collaboration, achat, simple message. L'atelier répond personnellement sous 48h ouvrées.",
};

const INK = 'var(--color-ink, #0a0a0a)';
const CREAM = 'var(--color-cream, #f5f1e8)';
const PAPER = 'var(--color-paint-white, #fafafa)';

const FONT_SERIF = "var(--font-serif, 'Playfair Display', Georgia, serif)";
const FONT_BODY = "var(--font-body, Inter, system-ui, sans-serif)";

/* ───────── Sub-pages référencées ───────── */
const QUICK_LINKS: ReadonlyArray<{
  href: string;
  eyebrow: string;
  title: string;
  body: string;
}> = [
  {
    href: '/atelier/commission',
    eyebrow: 'Sur commande',
    title: 'Commission custom',
    body: 'Pour une œuvre sur mesure, le formulaire dédié a un workflow optimisé.',
  },
  {
    href: '/atelier/presse',
    eyebrow: 'Médias',
    title: 'Press kit',
    body: 'Communiqués, photos HD, biographie et expositions à télécharger.',
  },
];

export default function ContactPage() {
  return (
    <PageShell>
      {/* ═════════ Section 1 — Header (cream) ═════════ */}
      <section
        aria-label="Contact — atelier Nacks"
        className="relative w-full overflow-hidden"
        style={{
          backgroundColor: CREAM,
          color: INK,
          paddingBlock: 'clamp(5rem, 12vh, 10rem)',
        }}
      >
        <div
          className="relative mx-auto"
          style={{
            maxWidth: 'var(--container-max, 1440px)',
            paddingInline: 'clamp(1.5rem, 4vw, 5rem)',
          }}
        >
          <p
            className="uppercase"
            style={{
              fontFamily: FONT_BODY,
              fontSize: 'clamp(0.7rem, 0.78vw, 0.82rem)',
              letterSpacing: '0.28em',
              color: 'rgba(10,10,10,0.55)',
              margin: 0,
            }}
          >
            Atelier &middot; Contact
          </p>

          <h1
            className="mt-[clamp(1.5rem,3vh,2.5rem)] text-balance"
            style={{
              fontFamily: FONT_SERIF,
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              lineHeight: 0.96,
              letterSpacing: '-0.025em',
              color: INK,
              margin: 0,
              maxWidth: '20ch',
            }}
          >
            Une question ?
            <br />
            Écrivez-nous.
          </h1>

          <p
            className="mt-[clamp(1.5rem,3vh,2.5rem)]"
            style={{
              fontFamily: FONT_BODY,
              fontSize: 'clamp(1rem, 1.15vw, 1.25rem)',
              lineHeight: 1.6,
              color: 'rgba(10,10,10,0.7)',
              maxWidth: '40rem',
              margin: 0,
            }}
          >
            Pour les achats d&apos;œuvres, demandes presse, collaborations et
            invitations. Naguy lit personnellement chaque message — réponse
            sous 48&nbsp;h ouvrées.
          </p>
        </div>
      </section>

      {/* ═════════ Section 2 — Coordonnées + Form (split, cream) ═════════ */}
      <section
        aria-label="Coordonnées et formulaire"
        className="relative w-full"
        style={{
          backgroundColor: CREAM,
          color: INK,
          paddingBlock: 'clamp(4rem, 8vh, 8rem)',
          borderTop: '1px solid rgba(10,10,10,0.08)',
        }}
      >
        <div
          className="relative mx-auto"
          style={{
            maxWidth: 'var(--container-max, 1440px)',
            paddingInline: 'clamp(1.5rem, 4vw, 5rem)',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-[clamp(2.5rem,6vw,5rem)]">
            {/* ───── Colonne gauche — Cards coordonnées ───── */}
            <aside className="flex flex-col gap-[clamp(1.5rem,3vh,2rem)] lg:sticky lg:top-28 lg:self-start">
              {/* Card 1 — Coordonnées générales */}
              <div
                style={{
                  backgroundColor: PAPER,
                  padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                  borderRadius: '4px',
                  boxShadow:
                    '0 1px 1px rgba(0,0,0,0.06), 0 18px 40px -22px rgba(10,10,10,0.18)',
                }}
              >
                <p
                  className="uppercase"
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 'clamp(0.65rem, 0.72vw, 0.75rem)',
                    letterSpacing: '0.28em',
                    color: 'rgba(10,10,10,0.55)',
                    margin: 0,
                  }}
                >
                  Atelier
                </p>

                <p
                  className="mt-3"
                  style={{
                    fontFamily: FONT_SERIF,
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: 'clamp(1.5rem, 2vw, 1.85rem)',
                    lineHeight: 1.05,
                    color: INK,
                    margin: 0,
                  }}
                >
                  Sarcelles, Val-d&apos;Oise.
                </p>

                <p
                  className="mt-2"
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 'clamp(0.9rem, 0.95vw, 1rem)',
                    lineHeight: 1.55,
                    color: 'rgba(10,10,10,0.65)',
                    margin: 0,
                  }}
                >
                  Studio partagé avec La Voix Off. Visites sur rendez-vous
                  uniquement, du mardi au vendredi.
                  <br />
                  Adresse communiquée à la confirmation.
                </p>

                <hr
                  className="my-[clamp(1.25rem,2.5vh,1.75rem)]"
                  style={{
                    border: 0,
                    borderTop: '1px solid rgba(10,10,10,0.08)',
                  }}
                />

                <ul
                  className="flex flex-col gap-3"
                  style={{ listStyle: 'none', padding: 0, margin: 0 }}
                >
                  <li>
                    <span
                      className="block uppercase"
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: 'clamp(0.62rem, 0.7vw, 0.72rem)',
                        letterSpacing: '0.22em',
                        color: 'rgba(10,10,10,0.5)',
                      }}
                    >
                      Email
                    </span>
                    <a
                      href="mailto:contact@nacksgalerie.com"
                      data-cursor="link"
                      className="mt-1 inline-block transition-opacity hover:opacity-70"
                      style={{
                        fontFamily: FONT_SERIF,
                        fontStyle: 'italic',
                        fontSize: 'clamp(1rem, 1.1vw, 1.15rem)',
                        color: INK,
                      }}
                    >
                      contact@nacksgalerie.com
                    </a>
                  </li>
                  <li>
                    <span
                      className="block uppercase"
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: 'clamp(0.62rem, 0.7vw, 0.72rem)',
                        letterSpacing: '0.22em',
                        color: 'rgba(10,10,10,0.5)',
                      }}
                    >
                      Instagram
                    </span>
                    <a
                      href="https://www.instagram.com/nacksgalerie"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="link"
                      className="mt-1 inline-block transition-opacity hover:opacity-70"
                      style={{
                        fontFamily: FONT_SERIF,
                        fontStyle: 'italic',
                        fontSize: 'clamp(1rem, 1.1vw, 1.15rem)',
                        color: INK,
                      }}
                    >
                      @nacksgalerie
                    </a>
                  </li>
                  <li>
                    <span
                      className="block uppercase"
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: 'clamp(0.62rem, 0.7vw, 0.72rem)',
                        letterSpacing: '0.22em',
                        color: 'rgba(10,10,10,0.5)',
                      }}
                    >
                      Délai de réponse
                    </span>
                    <span
                      className="mt-1 block"
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: 'clamp(0.92rem, 1vw, 1.05rem)',
                        lineHeight: 1.5,
                        color: 'rgba(10,10,10,0.78)',
                      }}
                    >
                      Sous 48&nbsp;h ouvrées.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Card 2 — Presse / Médias */}
              <div
                style={{
                  backgroundColor: PAPER,
                  padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                  borderRadius: '4px',
                  boxShadow:
                    '0 1px 1px rgba(0,0,0,0.06), 0 18px 40px -22px rgba(10,10,10,0.18)',
                }}
              >
                <p
                  className="uppercase"
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 'clamp(0.65rem, 0.72vw, 0.75rem)',
                    letterSpacing: '0.28em',
                    color: 'rgba(10,10,10,0.55)',
                    margin: 0,
                  }}
                >
                  Presse &middot; Médias
                </p>

                <p
                  className="mt-3"
                  style={{
                    fontFamily: FONT_SERIF,
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: 'clamp(1.5rem, 2vw, 1.85rem)',
                    lineHeight: 1.05,
                    color: INK,
                    margin: 0,
                  }}
                >
                  Pour la presse.
                </p>

                <p
                  className="mt-3"
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 'clamp(0.9rem, 0.95vw, 1rem)',
                    lineHeight: 1.55,
                    color: 'rgba(10,10,10,0.65)',
                    margin: 0,
                  }}
                >
                  Demandes interview, reportage, photo HD&nbsp;: une adresse
                  dédiée pour traiter en priorité.
                </p>

                <a
                  href="mailto:presse@nacksgalerie.com"
                  data-cursor="link"
                  className="mt-4 inline-block transition-opacity hover:opacity-70"
                  style={{
                    fontFamily: FONT_SERIF,
                    fontStyle: 'italic',
                    fontSize: 'clamp(1rem, 1.1vw, 1.15rem)',
                    color: INK,
                  }}
                >
                  presse@nacksgalerie.com
                </a>

                <Link
                  href="/atelier/presse"
                  data-cursor="link"
                  className="mt-5 inline-flex items-center gap-2 transition-opacity hover:opacity-70"
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 'clamp(0.78rem, 0.85vw, 0.9rem)',
                    fontWeight: 600,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: INK,
                    borderBottom: '1px solid rgba(10,10,10,0.25)',
                    paddingBottom: '2px',
                  }}
                >
                  Voir le press kit
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </aside>

            {/* ───── Colonne droite — Form ───── */}
            <ContactFormBespoke />
          </div>
        </div>
      </section>

      {/* ═════════ Section 3 — Quick links (ink) ═════════ */}
      <section
        aria-label="Autres voies d'accès"
        className="relative w-full overflow-hidden"
        style={{
          backgroundColor: INK,
          color: CREAM,
          paddingBlock: 'clamp(5rem, 10vh, 9rem)',
        }}
      >
        <div
          className="relative mx-auto"
          style={{
            maxWidth: 'var(--container-max, 1440px)',
            paddingInline: 'clamp(1.5rem, 4vw, 5rem)',
          }}
        >
          <p
            className="uppercase"
            style={{
              fontFamily: FONT_BODY,
              fontSize: 'clamp(0.7rem, 0.78vw, 0.82rem)',
              letterSpacing: '0.28em',
              color: 'rgba(245,241,232,0.55)',
              margin: 0,
            }}
          >
            Autres voies
          </p>

          <h2
            className="mt-[clamp(1rem,2vh,1.75rem)]"
            style={{
              fontFamily: FONT_SERIF,
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(2.25rem, 5vw, 4rem)',
              lineHeight: 1,
              letterSpacing: '-0.025em',
              color: CREAM,
              margin: 0,
            }}
          >
            Pour aller plus vite.
          </h2>

          <ul
            className="mt-[clamp(2.5rem,5vh,4rem)] grid grid-cols-1 sm:grid-cols-2 gap-[clamp(0.75rem,1.6vw,1.5rem)]"
            style={{ listStyle: 'none', padding: 0, margin: 0 }}
          >
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group relative flex flex-col justify-between gap-[clamp(2rem,4vh,3rem)] transition-colors"
                  data-cursor="link"
                  style={{
                    padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                    backgroundColor: 'transparent',
                    border: '1px solid rgba(245,241,232,0.12)',
                    borderRadius: '4px',
                    minHeight: 'clamp(11rem, 16vh, 14rem)',
                  }}
                >
                  <div className="flex flex-col gap-[clamp(0.5rem,1vh,0.75rem)]">
                    <span
                      className="uppercase"
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: 'clamp(0.65rem, 0.72vw, 0.75rem)',
                        letterSpacing: '0.22em',
                        color: 'rgba(245,241,232,0.45)',
                      }}
                    >
                      {link.eyebrow}
                    </span>
                    <span
                      style={{
                        fontFamily: FONT_SERIF,
                        fontStyle: 'italic',
                        fontWeight: 400,
                        fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
                        lineHeight: 1.05,
                        letterSpacing: '-0.02em',
                        color: CREAM,
                      }}
                    >
                      {link.title}
                    </span>
                    <span
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: 'clamp(0.88rem, 0.95vw, 1rem)',
                        lineHeight: 1.55,
                        color: 'rgba(245,241,232,0.62)',
                        maxWidth: '28rem',
                      }}
                    >
                      {link.body}
                    </span>
                  </div>
                  <span
                    className="uppercase transition-transform group-hover:translate-x-2"
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: 'clamp(0.7rem, 0.78vw, 0.82rem)',
                      letterSpacing: '0.25em',
                      color: 'rgba(245,241,232,0.55)',
                    }}
                  >
                    Voir &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
