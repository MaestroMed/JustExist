# Nacks Galerie

> *Le royaume numérique de Naguy "Nacks" Claude.*
> *Ship with soul. Ship with code. Ship in custody.*

Site-univers full-stack, 100 % custom, propriété intégrale de l'artiste.
Aucun intermédiaire, aucune plateforme, aucun template.

---

## Monorepo layout

```
apps/
├── web/          nacksgalerie.com (public)
└── admin/        admin.nacksgalerie.com (privé)

packages/
├── db/           Schéma PostgreSQL + Drizzle
├── auth/         Auth.js v5 shared
├── ui/           Design system partagé
├── emails/       React Email templates
└── config/       tsconfig, eslint, tailwind, prettier partagés

docs/
├── ULTRAPLAN.md       Le plan directeur
├── DEVELOPMENT_LOG.md Le journal vivant
├── DECISIONS.md       Les ADR (Architecture Decision Records)
└── BRIEF.md           Le manifeste fondateur (source de vérité)
```

## Stack

| Couche            | Outil                                          |
| ----------------- | ---------------------------------------------- |
| Framework         | Next.js 15 (App Router, RSC)                   |
| Langage           | TypeScript strict                              |
| Styling           | Tailwind CSS 4 + CSS variables                 |
| Animations        | GSAP 3 + Lenis + Motion                        |
| 3D                | Three.js + React Three Fiber + drei            |
| State             | Zustand + TanStack Query                       |
| DB                | PostgreSQL (Neon) + Drizzle ORM                |
| Auth              | Auth.js v5 (magic links)                       |
| Paiement          | Stripe Payment Intents (embed, pas redirect)   |
| Email             | Resend + React Email                           |
| Assets            | Cloudflare R2                                  |
| Hosting           | Vercel                                         |
| Analytics         | Plausible + Vercel Web Vitals                  |
| Monitoring        | Sentry                                         |
| Build orchestration | Turborepo + pnpm workspaces                   |

## Prérequis

- Node **22+** (`.nvmrc` pinned to 22)
- pnpm **9+**
- git **2.4+**

## Démarrer en local

```bash
pnpm install
pnpm dev
```

Par défaut :
- `apps/web` → http://localhost:3000
- `apps/admin` → http://localhost:3001 (quand scaffoldé)

## Commandes

```bash
pnpm dev           # lance toutes les apps en parallèle via Turborepo
pnpm build         # build toutes les apps
pnpm lint          # lint l'intégralité du monorepo
pnpm typecheck     # TS check
pnpm format        # Prettier write
pnpm clean         # vide .next / dist / .turbo
```

## Environnement

Copie `.env.example` en `.env.local` (par app) et remplis les secrets.
Voir `docs/ULTRAPLAN.md` section « Variables d'environnement » pour la liste exhaustive.

## Propriété & licence

Code, design, data, assets — tout appartient à **Naguy Claude (SASU Nacks Galerie)**.
Voir `LICENSE`. Aucune réutilisation, redistribution ou exploitation sans accord écrit.

## Contact technique

Mehdi (Kairos) — architecte & dev lead.
Pour toute question, passer par les canaux établis. Jamais de blocage > 48 h.
