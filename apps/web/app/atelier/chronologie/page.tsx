import type { Metadata } from 'next';
import { Container } from '@nacks/ui';
import { PageShell, PageHeader } from '@/components/layouts/PageShell';

export const metadata: Metadata = {
  title: 'Chronologie — Sarcelles · Paris · Los Angeles',
  description:
    'Trois fils parallèles : Sarcelles, Paris et Los Angeles. Les moments qui ont compté dans chaque ville, dans l\'ordre, côte à côte.',
  openGraph: {
    title: 'Chronologie — Nacks Galerie',
    description:
      'Trois fils parallèles : Sarcelles, Paris et Los Angeles. Les moments qui ont compté dans chaque ville, dans l\'ordre, côte à côte.',
  },
};

type CityEvent = { year: number; label: string; detail: string };
type City = { name: string; color: string; accent: string; events: CityEvent[] };

const CITIES: readonly City[] = [
  {
    name: 'Sarcelles',
    color: '#1E40AF',
    accent: '#FFD43B',
    events: [
      { year: 2022, label: "Premiers coups de Posca", detail: "Les murs du 95 comme carnet d'essai." },
      { year: 2023, label: "Nacks Show épisode 1", detail: "Lancement du live quotidien depuis l'atelier." },
      { year: 2024, label: "L'atelier s'agrandit", detail: "Passage d'une chambre à un studio de 40 m²." },
      { year: 2025, label: "Exposition collective Sarcelles", detail: "Avec 4 autres artistes du 95, à la médiathèque." },
      { year: 2026, label: "Retour aux origines", detail: "Projet mural grand format sur un pignon de la cité." },
    ],
  },
  {
    name: 'Paris',
    color: '#E63946',
    accent: '#F5F1E8',
    events: [
      { year: 2023, label: "Première vente privée", detail: "Appartement du Marais, 3 originaux partent le soir même." },
      { year: 2024, label: "Partenariat Posca", detail: "Nomination comme artiste ambassadeur de la marque." },
      { year: 2025, label: "Foire de Paris", detail: "Stand dédié, 6 grands formats exposés pendant 10 jours." },
      { year: 2025, label: "Solo show Rue du Faubourg", detail: "Première exposition en galerie dans le 10ᵉ arrondissement." },
      { year: 2026, label: "Lancement nacksgalerie.com", detail: "Le royaume numérique s'ouvre au monde." },
    ],
  },
  {
    name: 'Los Angeles',
    color: '#D4A056',
    accent: '#0A0A0A',
    events: [
      { year: 2024, label: "Premier contact Artspace", detail: "Rebecca envoie un DM Instagram un dimanche soir." },
      { year: 2024, label: "Exposition Culver City", detail: "40 œuvres vendues en 48 heures au vernissage." },
      { year: 2025, label: "Collaboration studio LA", detail: "Résidence de 3 semaines avec trois peintres locaux." },
      { year: 2025, label: "Foire West Hollywood", detail: "Showcase Mr Poppy auprès des collectionneurs californiens." },
      { year: 2026, label: "Second solo show LA", detail: "Prévu en octobre, dates à confirmer." },
    ],
  },
];

export default function ChronologiePage() {
  return (
    <PageShell>
      <Container size="full" className="py-20 md:py-24">
        <PageHeader
          eyebrow="Trois villes, un même fil"
          title="Chronologie."
          subtitle="Sarcelles, Paris, Los Angeles. Trois villes qui se parlent, jamais au même moment mais toujours sur la même phrase. Lis-les en parallèle, dans l'ordre des années."
        />

        <div className="mt-20 grid gap-10 md:grid-cols-3">
          {CITIES.map((city) => (
            <section
              key={city.name}
              className="relative flex flex-col gap-6 rounded-sm border border-[var(--color-cream-100)] p-6 md:p-8"
              style={{ backgroundColor: `${city.color}12` }}
            >
              <header className="flex items-baseline justify-between gap-4 border-b border-[var(--color-cream-100)] pb-4">
                <h2
                  className="font-[var(--font-display)] font-[500] leading-[1] tracking-[-0.02em] text-[var(--color-cream)]"
                  style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}
                >
                  {city.name}
                </h2>
                <span
                  aria-hidden="true"
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: city.color }}
                />
              </header>

              <ol className="relative flex flex-col gap-7">
                <span
                  aria-hidden="true"
                  className="absolute left-2 top-0 h-full w-px"
                  style={{ backgroundColor: `${city.color}80` }}
                />
                {city.events.map((event) => (
                  <li key={`${city.name}-${event.year}-${event.label}`} className="relative pl-10">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-[6px] h-5 w-5 rounded-full border border-[var(--color-cream)] bg-[var(--color-ink)]"
                    >
                      <span
                        className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                        style={{ backgroundColor: city.color }}
                      />
                    </span>
                    <div className="flex flex-col gap-1">
                      <span
                        className="font-[var(--font-mono)] text-xl font-[500] tabular-nums"
                        style={{ color: city.accent }}
                      >
                        {event.year}
                      </span>
                      <p className="font-[var(--font-display)] text-base font-[500] text-[var(--color-cream)]">
                        {event.label}
                      </p>
                      <p className="font-[var(--font-body)] text-sm text-[var(--color-cream-600)]">
                        {event.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>

        <aside className="mt-20 flex flex-col gap-4 rounded-sm border border-[var(--color-cream-100)] bg-[var(--color-ink)] p-8 md:p-12">
          <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--color-blood)]">
            Note de l'auteur
          </p>
          <p className="font-[var(--font-body)] text-base leading-[1.7] text-[var(--color-cream)] md:text-lg">
            Cette page est un prototype du format « trois villes parallèles » prévu pour la v3.0
            du site. À terme, chaque événement aura sa photo, son audio (extrait vocal de Nacks
            qui raconte), et scroll synchronisé entre colonnes. En attendant : la matière est là.
          </p>
        </aside>
      </Container>
    </PageShell>
  );
}
