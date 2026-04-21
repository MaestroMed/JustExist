# ULTRAPLAN — Nacks Galerie

**Version :** 1.0
**Date :** 22 avril 2026
**Auteur :** Claude Code, sous direction de Mehdi (Kairos)
**Statut :** actif, mis à jour à chaque sprint

> Ce document est le **plan directeur** du projet.
> Il traduit le manifeste (`docs/BRIEF.md`) en décisions techniques concrètes et en séquencement exécutable.
> Quand un conflit surgit entre l'ULTRAPLAN et le BRIEF, le BRIEF gagne.
> Quand une décision nouvelle est prise, elle est actée dans `docs/DECISIONS.md` et reflétée ici.

---

## 0. Le filtre de décision (rappel)

> *Est-ce que c'est ce que Nacks aurait peint lui-même, s'il savait coder ?*

Si oui → on le fait.
Si non → on cherche autre chose.

Appliqué à :
- toute bibliothèque (préférer la plus discrète, la plus propre, la plus « dans l'esprit »)
- tout composant visuel (fidélité à l'identité street-art luxe, jamais générique)
- toute UX (pas de pattern Amazon, pas de dark pattern, pas de spam)
- tout compromis technique (jamais au détriment de l'âme)

---

## 1. Cap : ce qu'on construit

Un **site-univers** où :

1. L'arrivée est cinématographique, pas marchande.
2. La circulation est une traversée, pas une navigation.
3. L'achat est un rituel, pas une transaction.
4. Le visiteur ressent Nacks plus qu'il ne lit « Shop Now ».

Trois moteurs business nourrissent l'univers :
- **Œuvres en stock** (originaux, reprographies, posters, merch, figurines)
- **Drops événementiels** (éditions limitées, rareté, rituel)
- **Commandes personnalisées** (candidature filtrée, premium)

Et un moteur relationnel :
- **La newsletter du mardi** — actif le plus précieux, à protéger comme l'atelier.

---

## 2. Architecture globale

### 2.1 Monorepo Turborepo + pnpm workspaces

```
apps/
├── web/          nacksgalerie.com — site public, Next.js 15
└── admin/        admin.nacksgalerie.com — dashboard, Next.js 15

packages/
├── db/           schéma Postgres, migrations Drizzle, client typé
├── auth/         Auth.js v5 config partagée
├── ui/           design system React (Button, Typography, tokens, icons)
├── emails/       templates React Email (welcome, drop alert, receipt…)
└── config/       tsconfig base, eslint preset, tailwind preset, prettier

docs/
├── ULTRAPLAN.md       (ce fichier)
├── DEVELOPMENT_LOG.md
├── DECISIONS.md
└── BRIEF.md           (manifeste signé par Mehdi — source de vérité)
```

**Pourquoi monorepo :** admin et web partagent DB, auth, UI, emails, tokens. Un repo, un langage, un typage bout-en-bout. Déploiements Vercel indépendants.

### 2.2 Environnements

| Env        | Branche   | Host                        | DB (Neon branch) | Stripe |
| ---------- | --------- | --------------------------- | ---------------- | ------ |
| Local      | any       | localhost:3000 / :3001      | `dev`            | test   |
| Preview    | any PR    | `*-preview.vercel.app`      | `dev` (ou PR)    | test   |
| Staging    | `develop` | `nacks-staging.vercel.app`  | `staging`        | test   |
| Production | `main`    | `nacksgalerie.com`          | `main`           | live   |

### 2.3 Branching model (simplifié)

- `main` → prod, protégé, reviews obligatoires
- `develop` → staging
- `feat/<slug>` → PR vers `develop`
- `fix/<slug>` → PR vers `develop` (ou `main` en hotfix)
- Tag `vX.Y.Z` à chaque release prod

### 2.4 CI/CD (GitHub Actions → Vercel)

Pipeline par PR :
1. Install (pnpm cache)
2. `pnpm lint`
3. `pnpm typecheck`
4. `pnpm test` (Vitest quand pertinent)
5. `pnpm build` (Turbo cache)
6. Vercel preview deploy automatique

Pipeline `develop` : idem + migration DB staging (Drizzle).
Pipeline `main` : idem + migration DB prod (gated by approval).

---

## 3. Stack technique — décisions actées

Chaque choix est documenté en ADR (`docs/DECISIONS.md`). Résumé :

| Domaine           | Choix                              | ADR |
| ----------------- | ---------------------------------- | --- |
| Structure         | Turborepo + pnpm workspaces        | 001 |
| Framework         | Next.js 15 App Router, TS strict   | 002 |
| Styling           | Tailwind 4 + CSS vars + `@theme`   | 003 |
| ORM               | Drizzle (vs Prisma)                | 004 |
| Auth              | Auth.js v5 magic link via Resend   | 005 |
| Paiement          | Stripe Payment Intents embed       | 006 |
| Storage           | Cloudflare R2 (vs S3/AWS)          | 007 |
| Animations        | GSAP + Lenis + Motion + R3F        | 008 |

### 3.1 Versions cibles (figées pour V1)

- Node 22 LTS (`.nvmrc`)
- pnpm 9
- Next.js ^15.0
- React ^19.0
- TypeScript ^5.6
- Tailwind ^4.0
- Drizzle ORM ^0.36
- Auth.js ^5.0
- Stripe ^17
- Resend ^4
- GSAP ^3.13
- Lenis ^1.1
- Motion ^11 (ex-Framer Motion)
- Three ^0.170 + R3F ^9 + drei ^9.120

*Note : Node 25 est installé en dev — supporté en best-effort.
CI et prod tournent sur Node 22 LTS.*

---

## 4. Schéma DB — V1

Tables initiales (couvrent ~85 % du brief) :

```
users                 id, email, name, role, created_at, last_login_at, is_vip
sessions              (Auth.js)
verification_tokens   (Auth.js magic links)
accounts              (Auth.js — pour providers futurs)

artworks              id, slug, title, description, lore, year, type,
                      character, dimensions, materials, price_cents,
                      stock, status, featured, created_at, updated_at
artwork_images        id, artwork_id, url, alt, order, is_primary
artwork_variants      id, artwork_id, sku, name, price_cents, stock

drops                 id, slug, title, artwork_id, type, edition_size,
                      price_cents, currency, opens_at, closes_at,
                      vip_opens_at, status, cover_image_url, lore,
                      video_url, created_at, updated_at
drop_purchases        id, drop_id, user_id, edition_number,
                      stripe_payment_intent_id, status, shipping_address,
                      purchased_at

orders                id, user_id, total_cents, currency, status,
                      stripe_payment_intent_id, shipping_address,
                      billing_address, shipping_method, tracking_number,
                      created_at, updated_at
order_items           id, order_id, artwork_id, variant_id, drop_id,
                      quantity, unit_price_cents, edition_number

commissions           id, user_id (nullable), name, email, phone,
                      occasion, budget_band, dimensions, brief,
                      references, deadline, source, status, score,
                      created_at, answered_at

newsletter_subscribers id, email, name, status, source,
                       subscribed_at, unsubscribed_at

wishlist_items        id, user_id, artwork_id, created_at

journal_posts         id, slug, title, excerpt, body, cover_image_url,
                      author, category, tags, published_at, status,
                      seo_title, seo_description, og_image

characters            id, slug, name, lore, primary_color,
                      model_3d_url, illustrations (jsonb)

site_config           key, value, updated_at  (singleton-style)
```

Conventions :
- tout en `snake_case` côté DB, `camelCase` côté TS.
- UUIDv7 partout (`gen_random_uuid()` + PG 17).
- timestamps `timestamptz`.
- jamais de soft-delete sauf nécessité.
- index sur `slug`, `status`, `opens_at`, `user_id` systématique.

Migrations : Drizzle Kit `push` en dev, `generate` + `migrate` en staging/prod.

---

## 5. Phasage exécutable

Chaque phase produit un livrable **visible** et **testable**.
Durée = jours-homme effectifs (pas calendaires).

### Sprint 1 — Fondations (en cours, ~9 j-h)

**Objectif :** une app qui tourne en local et sur Vercel, DB prête, auth fonctionnelle, scène d'ouverture impressionnante.

- [x] Repo cloné, hygiène (`.gitignore`, license, editorconfig, prettier)
- [x] Docs fondatrices : ULTRAPLAN, DEVELOPMENT_LOG, DECISIONS, BRIEF
- [ ] Monorepo Turborepo + pnpm workspaces
- [ ] `packages/config` (tsconfig, eslint, tailwind preset)
- [ ] `packages/ui` (design tokens + Button, Container, Typography)
- [ ] `apps/web` Next.js 15 + TS strict + Tailwind 4
- [ ] `apps/admin` scaffold minimal
- [ ] Scène d'ouverture locale : NACKS SVG draw + Lenis + curseur custom + dark canvas
- [ ] `pnpm dev` clean, `pnpm build` clean
- [ ] Commit + push

**Démo Sprint 1 :** http://localhost:3000 montre un écran noir, signature NACKS qui se dessine, curseur custom, scroll fluide, une section manifeste, un footer placeholder. Aucune scène complète, aucun achat. C'est volontaire — on pose la colonne vertébrale.

### Sprint 2 — Base de données + Auth + Stripe scaffold (~8 j-h)

- `packages/db` avec schéma complet (voir §4)
- Neon branches `dev` + `staging` créées, `DATABASE_URL` câblée
- Drizzle Kit : scripts `db:push`, `db:studio`, `db:generate`, `db:migrate`
- Seed de données démo (5 œuvres, 1 drop, 3 characters, 2 articles)
- `packages/auth` : Auth.js v5 magic link via Resend
- Page `/login` minimaliste + middleware session + `/compte` protégée test
- `packages/emails` : templates base (welcome, magic link)
- Stripe compte test, webhooks dev via `stripe listen`, route `/api/stripe/webhook` signée
- Setup Cloudflare R2 bucket + SDK upload test

**Démo Sprint 2 :** login par email marche bout-en-bout, `/compte` affiche les infos user, admin-only route `/admin` renvoie 403 si non-admin.

### Sprint 3 — Homepage scènes 1 à 4 (~10 j-h)

- Scène 1 (Hero) : Mr Poppy 3D plein cadre, curseur parallax, NACKS SVG draw in
- Scène 2 (Manifeste) : GSAP SplitText line reveal
- Scène 3 (Drop en cours) : données réelles depuis DB, countdown pulsant, CTA conditionnel
- Scène 4 (Trois portes) : grille + Flip transitions vers pages collections

**Démo Sprint 3 :** homepage moitié haute finalisée, premier « wow ». Partage équipe.

### Sprint 4 — Homepage scènes 5 à 8 + navigation sticky (~8 j-h)

- Scène 5 (Univers — scrollytelling horizontal pinned)
- Scène 6 (Nacks Show — player TV vintage SVG)
- Scène 7 (Cercle — form newsletter inline)
- Scène 8 (Footer-univers)
- Navigation sticky avec transitions
- Page transitions fade overlay

**Démo Sprint 4 :** homepage complète, jouable sur mobile et desktop, Core Web Vitals > 90.

### Sprint 5 — Shop : catalogue + page œuvre + panier (~10 j-h)

- Page `/oeuvres` : grille + filtres sticky + tri + pagination
- Page `/oeuvres/[handle]` : gallery HD + colonne sticky + Flip arrival
- Lightbox deepzoom (OpenSeadragon) sur images HD
- Zustand store panier (persist localStorage)
- Panier sidebar slide-in + page `/panier`

**Démo Sprint 5 :** on peut naviguer dans les œuvres, ajouter au panier, voir le panier. Checkout pas encore.

### Sprint 6 — Checkout custom + tunnel paiement (~8 j-h)

- Checkout multi-étapes `/checkout` (identification / adresse / livraison / paiement / confirmation)
- Stripe Elements embed (carte + Apple Pay + Google Pay + SEPA)
- Auto-complétion d'adresse FR (API adresse.data.gouv.fr)
- Règles frais de livraison (zones, tarifs) dans `site_config`
- Webhook Stripe → création `orders` + `order_items`
- Emails transactionnels (confirmation, expédition)

**Démo Sprint 6 :** achat complet bout-en-bout en mode test Stripe.

### Sprint 7 — Drops module (~8 j-h)

- CRUD admin drops
- Page `/drops` liste + états (live / upcoming / past)
- Page `/drops/[slug]` : cover + countdown + lore + vidéo + CTA achat
- Logique edition numbers assignés par paiement Stripe validé
- VIP access 24 h avant (role check en middleware)
- Live sold counter (polling 8 s)
- Cloudflare Turnstile anti-bot + rate limit 3/5min
- Emails drop alerts J-7 / J-1 / J0 / post-drop

**Démo Sprint 7 :** un drop complet simulé de bout en bout, CA test généré.

### Sprint 8 — Compte client + Univers des personnages (~8 j-h)

- `/compte` : mes œuvres, wishlist, drops VIP, paramètres
- `/univers` : grille interactive personnages
- `/univers/mr-poppy` : hero 3D, switch skins, lore, galerie, drops passés
- Pages gabarit pour autres personnages

**Démo Sprint 8 :** visiteur connecté vit l'univers Nacks.

### Sprint 9 — Journal + Atelier (~8 j-h)

- Éditeur articles Tiptap dans admin
- `/journal` + `/journal/[slug]`
- `/atelier` : bio, vidéo atelier, technique, équipe, presse, contact
- `/atelier/commission` : formulaire candidature avec scoring auto

**Démo Sprint 9 :** écosystème éditorial fonctionnel.

### Sprint 10 — Admin dashboard (~10 j-h)

- `/admin` layout (sidebar, header, auth role gate)
- Tableau de bord KPIs (CA, commandes, visiteurs, conversion, drops actifs)
- Modules CRUD : œuvres, drops, commandes, commissions, clients, journal, newsletter, paramètres
- Composer newsletter segmenté + envoi Resend

**Démo Sprint 10 :** Nacks et La Voix Off peuvent opérer la boutique sans toucher à du code.

### Sprint 11 — Performance + accessibilité + SEO (~6 j-h)

- Core Web Vitals > 90 mobile 4G simulé
- Audit Lighthouse / PageSpeed / WebPageTest
- A11y audit (axe, VoiceOver, NVDA)
- Schema.org (Product, VisualArtwork, Person, Organization, BreadcrumbList)
- Sitemap + robots + canonical + OG images via `@vercel/og`
- Security headers (CSP strict, HSTS, X-Frame-Options, Permissions-Policy)

### Sprint 12 — Launch (~4 j-h)

- DNS `nacksgalerie.com` → Vercel via Cloudflare
- Migration 301 anciennes URLs
- Stripe mode live + KYC validé
- Soft launch VIP (50-100 personnes test)
- Surveillance 7 j (Sentry, Plausible, Vercel Analytics, NPS)
- Public launch + campagne TikTok coordonnée

**Total : ~98 j-h ≈ 18 semaines calendaires** (confirme l'estimation du brief).

Un MVP 8 semaines coupe les sprints 8, 9, une partie du 10, et reporte V2 : homepage + shop + drops + checkout + compte client + admin minimal.

---

## 6. Risques & parades

| Risque                                                  | Parade                                                                 |
| ------------------------------------------------------- | ---------------------------------------------------------------------- |
| Assets (modèle 3D, photos HD) en retard                 | Placeholders ambitieux, scène alternative CSS/SVG pure jusqu'à la livraison |
| Premier drop scrapé par des bots                        | Turnstile + rate limit + slot réservation 15 min + audit post-mortem   |
| Stripe KYC bloqué                                       | Créer le compte en parallèle du dev dès J0, ne pas attendre le launch  |
| Performance dégradée par GSAP + R3F + Lenis             | Code-split agressif, dynamic import, `prefers-reduced-motion` strict   |
| Dérive visuelle vers « template propre »                | Filtre de décision systématique, review design hebdo avec Nacks        |
| DB migration cassée en prod                             | Migrations Drizzle generate + review + rollback script + staging dry-run|
| Dépendance à un fournisseur (Neon, Resend, R2)          | Exports réguliers, code portable, ADR documentant les alternatives     |
| Node 25 en dev crée des incompatibilités                | `.nvmrc` 22, CI sur 22, warning doc si divergence                      |

---

## 7. Variables d'environnement (référence)

Chaque app a son `.env.local`. Modèle dans `.env.example`.

```bash
# Database (shared via packages/db)
DATABASE_URL="postgresql://..."
DATABASE_URL_POOLED="postgresql://..."

# Auth (shared via packages/auth)
AUTH_SECRET="..."
AUTH_URL="https://nacksgalerie.com"

# Stripe
STRIPE_PUBLIC_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Resend
RESEND_API_KEY="re_..."
RESEND_FROM_EMAIL="contact@nacksgalerie.com"

# Cloudflare R2
R2_ACCOUNT_ID="..."
R2_ACCESS_KEY_ID="..."
R2_SECRET_ACCESS_KEY="..."
R2_BUCKET_NAME="nacks-assets"
R2_PUBLIC_URL="https://cdn.nacksgalerie.com"

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY="..."
TURNSTILE_SECRET_KEY="..."

# Plausible
NEXT_PUBLIC_PLAUSIBLE_DOMAIN="nacksgalerie.com"

# Sentry
SENTRY_DSN="..."
SENTRY_AUTH_TOKEN="..."

# Site
NEXT_PUBLIC_SITE_URL="https://nacksgalerie.com"
NEXT_PUBLIC_SITE_NAME="Nacks Galerie"
```

---

## 8. Protocole de mise à jour

- Ce document est mis à jour **à la fin de chaque sprint**.
- Une nouvelle décision d'architecture → ADR dans `docs/DECISIONS.md` + reflet ici.
- Un changement de scope → mise à jour du phasage §5 + DEVELOPMENT_LOG entry.
- Une dérive vs le BRIEF → escalade immédiate à Mehdi.

---

*Le site n'est pas un site. C'est le royaume.*
