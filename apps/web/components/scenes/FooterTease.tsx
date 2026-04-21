import { Container } from '@nacks/ui';

/**
 * Footer Sprint 1 — placeholder tenant sa place jusqu'aux scènes 5-8.
 * Sobre, crédite l'atelier, donne un email.
 */
export function FooterTease() {
  return (
    <footer className="relative border-t border-[var(--color-cream-100)] bg-[var(--color-ink)] py-16 text-[var(--color-cream-600)]">
      <Container size="wide">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-[var(--font-display)] text-xl font-[500] text-[var(--color-cream)]">
              Nacks Galerie
            </p>
            <p className="mt-2 font-[var(--font-body)] text-sm">
              Fait avec soin à Sarcelles et Paris. Depuis 2022.
            </p>
          </div>
          <div className="flex flex-col gap-2 font-[var(--font-mono)] text-xs md:items-end">
            <a
              href="mailto:contact@nacksgalerie.com"
              className="transition-colors hover:text-[var(--color-cream)]"
              data-cursor="link"
            >
              contact@nacksgalerie.com
            </a>
            <span className="text-[var(--color-cream-400)]">
              © 2026 — Tous droits réservés.
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
