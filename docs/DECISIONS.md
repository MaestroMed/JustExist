# DECISIONS — Architecture Decision Records

Chaque décision non triviale est tracée ici. Format court, daté, signé.
Si une décision est renversée, on garde l'ADR original et on ajoute un nouvel ADR `Status: superseded by ADR-NNN`.

---

## ADR-001 — Monorepo Turborepo + pnpm workspaces

**Date :** 2026-04-22
**Status :** accepted
**Context :** Le projet contient au moins deux applications (site public, dashboard admin) qui partageront la DB, l'auth, les emails, le design system. Un single-repo mal structuré mènerait à de la duplication ; deux repos mènerait à de la désynchronisation des types.
**Decision :** Monorepo orchestré par Turborepo 2, avec pnpm workspaces. `apps/*` pour les applications déployables, `packages/*` pour les libs partagées.
**Consequences :**
- Pour : typage partagé strict, build cache, déploiements indépendants, migration V2 (app mobile, app Nacks show) triviale.
- Contre : complexité initiale (Turborepo pipelines, workspace protocol), débutants du projet doivent apprendre.
**Alternatives :** Nx (trop lourd pour le périmètre), Rush (peu d'écosystème Next.js), single app avec route groups (bloque la séparation admin).

---

## ADR-002 — Next.js 15 App Router, React 19, TypeScript strict

**Date :** 2026-04-22
**Status :** accepted
**Context :** On veut du SSR/RSC, des Server Actions pour le tunnel paiement, du SEO natif, du streaming, et une écosphère mature.
**Decision :** Next.js 15 App Router (pas Pages Router), React 19, TypeScript `strict: true` + `noUncheckedIndexedAccess: true`.
**Consequences :**
- Pour : écosystème #1 front en 2026, Vercel deploy en 1 clic, RSC réduit le JS envoyé au client, Server Actions simplifient le tunnel paiement.
- Contre : App Router encore en évolution rapide (breaking changes mineurs à chaque minor), cache RSC à apprivoiser.
**Alternatives :** Remix (bon mais écosystème plus petit), SvelteKit (trop disruptif pour l'équipe), Astro (pas taillé pour de l'e-commerce interactif complet).

---

## ADR-003 — Tailwind CSS 4 + CSS variables + `@theme`

**Date :** 2026-04-22
**Status :** accepted
**Context :** On veut un design system cohérent, des tokens manipulables dynamiquement (dark mode potentiel, variantes univers par personnage), et zéro CSS mort en prod.
**Decision :** Tailwind 4 (postcss), design tokens déclarés en CSS vars via `@theme` dans `globals.css`. Palette Nacks exposée comme tokens Tailwind.
**Consequences :**
- Pour : purge ultra-rapide (Oxide engine), syntaxe `@theme` moderne, CSS vars = thémabilité runtime.
- Contre : Tailwind 4 encore jeune côté plugins communautaires, quelques outils (Prettier plugin) en rattrapage.
**Alternatives :** Vanilla Extract (bon mais verbeux), Panda CSS (prometteur mais plus petit), CSS Modules (trop manuel).

---

## ADR-004 — Drizzle ORM (plutôt que Prisma)

**Date :** 2026-04-22
**Status :** accepted
**Context :** On a besoin d'un ORM TypeScript pour Postgres, avec migrations, un studio, et des performances edge-compatibles.
**Decision :** Drizzle ORM + Drizzle Kit.
**Consequences :**
- Pour : plus rapide que Prisma (pas d'engine Rust à bundler), typage SQL-like proche, edge-runtime compatible (important pour certaines routes), bundle plus petit.
- Contre : moins de magie (moins de hand-holding), communauté plus petite que Prisma, moins d'exemples StackOverflow.
**Alternatives :** Prisma (lourd en edge), Kysely (trop bas niveau pour notre vitesse), raw SQL via `postgres-js` (pas de migrations nativement).

---

## ADR-005 — Auth.js v5 magic link via Resend

**Date :** 2026-04-22
**Status :** accepted
**Context :** On veut une auth sans mot de passe (moins de friction, moins de surface d'attaque), avec sessions DB, RBAC simple (user / vip / admin), et intégration email propre.
**Decision :** Auth.js v5 (ex-NextAuth) avec adapter Drizzle, provider Email (magic link) via Resend SMTP/API.
**Consequences :**
- Pour : standard communautaire, sessions DB robustes, magic link UX friction-zero, facile d'ajouter Google/Apple plus tard.
- Contre : v5 encore beta sur certains points (breaking changes mineurs à surveiller), docs en retard par rapport au code.
**Alternatives :** Clerk (service externe, lock-in, coût par user), Lucia (bon mais plus manuel), rolling custom (non, jamais sur de l'auth).

---

## ADR-006 — Stripe Payment Intents embed (pas Checkout hosted)

**Date :** 2026-04-22
**Status :** accepted
**Context :** Le brief est clair : le tunnel paiement doit être « notre UX à nous », pas une redirect vers une page Stripe générique. On veut que l'identité Nacks se prolonge jusqu'au bout.
**Decision :** Stripe Elements + Payment Intents API, embed dans un checkout custom multi-étapes.
**Consequences :**
- Pour : UX 100 % contrôlée, plus de confiance côté client (pas de redirect), Apple Pay / Google Pay / SEPA natifs, design identique au reste du site.
- Contre : PCI SAQ A-EP (plus de surface réglementaire que Checkout hosted SAQ A), plus de code à écrire, plus de cas d'erreur à gérer.
**Alternatives :** Stripe Checkout hosted (UX dégradée), PayPal (frais élevés, UX médiocre), Lemonway/Stancer (made-in-France mais moins mature).

---

## ADR-007 — Cloudflare R2 pour le storage

**Date :** 2026-04-22
**Status :** accepted
**Context :** On stocke beaucoup d'images HD (œuvres 3000×3000), des vidéos, des .glb 3D. Coût et egress sont les postes critiques à long terme.
**Decision :** Cloudflare R2, API S3-compatible, bucket `nacks-assets`, URL publique `cdn.nacksgalerie.com` via custom domain.
**Consequences :**
- Pour : zéro frais egress (vs ~0,09 $/GB chez AWS S3), 0,015 $/GB stocké, 10 GB gratuits, CDN Cloudflare automatique en amont.
- Contre : lock-in relatif (migration vers S3 possible mais pas triviale), moins d'outillage que S3.
**Alternatives :** S3 (coûteux sur egress), Backblaze B2 (bon mais moins intégré CDN), Vercel Blob (trop cher au-delà de 100 GB).

---

## ADR-008 — Stack animation : GSAP + Lenis + Motion + React Three Fiber

**Date :** 2026-04-22
**Status :** accepted
**Context :** Le site est un site-univers. Les animations ne sont pas un extra — elles SONT l'identité. On a besoin de : scroll fluide, SplitText/DrawSVG/ScrollTrigger/Flip, micro-interactions React-native, et 3D temps réel.
**Decision :**
- **GSAP 3** (+ plugins payants : SplitText, DrawSVG, Flip, ScrollTrigger) pour les orchestrations complexes, timelines, révélations cinématographiques.
- **Lenis** pour le smooth scroll global (désactivé si `prefers-reduced-motion`).
- **Motion** (ex-Framer Motion) pour les transitions React-natives (pages, panier slide-in, hover).
- **Three.js + R3F + drei** pour Mr Poppy 3D interactif et ambiances 3D ponctuelles.
**Consequences :**
- Pour : on a l'arsenal complet pour atteindre Awwwards-grade. GSAP + Lenis + R3F est LA stack 2025-2026 des studios primés (Locomotive, Immersive Garden, Hello Monday).
- Contre : bundle lourd si mal code-splité, licence GSAP Club (150 $/an) requise pour SplitText/DrawSVG/Flip.
**Alternatives :** Motion seul (insuffisant pour scroll orchestré), AOS (daté), GSAP sans Lenis (scroll natif insuffisant), Theatre.js (overkill).

---
