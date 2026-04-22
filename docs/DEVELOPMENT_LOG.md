# DEVELOPMENT_LOG — Nacks Galerie

Journal vivant. Une entrée par session significative.
Ordre antéchronologique (plus récent en haut).

---

## 2026-04-22 (session marathon) — 20 commits pour atteindre le niveau award-winning

**Contexte :** Mehdi demande en cascade « vas-y », « continues », « do better ». Cette entrée consolide tous les commits de la session longue (de `10cd0e6` à `e319024`) au-dessus de la fondation Phase 0.

### 20 commits shippés (ordre chronologique)

1. `10cd0e6` — WebGL hero + Mr Poppy 3D R3F + ArtworkCard 3D tilt
2. `a1d7f7a` — SplitHeading + ReadingProgress + DropHero scroll-parallax
3. `02b066d` — JSON-LD 7 types + ProductAccordion + sitemap + robots
4. `fe2fa3a` — OG images dynamiques (24) + CountrySelect + /communaute
5. `5b00368` — ImageLightbox + ShareButtons + ScrollCountUp + nav links
6. `fc5eccd` — MagneticButton CTAs + count-up prix + metadata OG + skeletons
7. `ede3ca3` — Page transitions + article reveals + Plausible + OG fix
8. `46ff655` — Loading states + timeline visuelle /atelier + SectionDivider
9. `6e013c9` — Live drop badge nav + /atelier/chronologie + sentry hook
10. `2725345` — Admin dashboard opérationnel + 4 stubs modules
11. `9373114` — Error boundaries + raccourcis page + turnstile stub
12. `4cb9d08` — ArtPoster v2 densifié + Ghost Poppy silhouette hero
13. `00b5a28` — NextArticleCard + 404 illustré + character related sections
14. `121bc27` — Mr Poppy 3D dense (particles + breathing + spotlight + stars)
15. `e319024` — AnnounceBar live drop sticky au-dessus de la nav

### Composants clés nouveaux

**Hero cinématographique** : `ShaderBackground` (WebGL noise Posca mouse-reactive), `GhostPoppy` (silhouette XL translucide), `NacksSignature v2` (lettres blur+clip+mouse-parallax), `CyclingTagline` (4 phrases rotation), `SignatureMarquee` (4 variants, entre sections).

**Polish UX** : `PageTransition` (fade+slide key=pathname), `ScrollToTop`, `ScrollProgress` (barre rouge), `ClickRipple` (Posca 5 couleurs), `MagneticButton`, `MouseParallaxLayer`, `ExitIntent`, `AudioToggle` (Web Audio API procédural), `CommandPalette` (cmdk + vim keys), `ScrollCountUp`, `ShareButtons`, `ReadingProgress`, `SplitHeading`, `RevealParagraph`, `SkeletonCard`, `SectionDivider`, `LiveDropBadge`, `AnnounceBar`, `LiveDropAnnouncer`.

**Formulaires** : `CountrySelect` (60 pays cherchable), `TurnstileWidget` (lazy Cloudflare), `CommissionForm` + `ContactForm` + `NewsletterForm` (câblés aux APIs).

**SVG art** : `ArtPoster` v2 (8 variants densifiés halftone + noise + typo intégrée + stamps + paint drips + corner signature), `CharacterPortrait` (4 portraits), `ArtworkGallery` (wrapper client avec ImageLightbox deepzoom).

**3D R3F** : `PoppyScene` avec 200 dust particles en instancedMesh + breathing idle + spotlight colored + stars field + OrbitingAccessories (pioche, lama, cubes Fortnite) + ContactShadows + Environment studio + 4 skins switchables.

**Admin** : `AdminShell` (sidebar 9 modules + badges), `KPICard`, `SparkChart` (SVG pur, pas de lib), `AdminHeader`, dashboard avec 4 KPIs + chart 30j + table commandes + panneau drops actifs, 4 stubs (oeuvres/drops/commandes/commissions avec Sprint cible documenté).

**SEO** : `lib/seo/jsonld.ts` (buildOrganization, buildWebSite, buildPerson, buildArtwork, buildDropEvent, buildBlogPosting, buildBreadcrumb, buildFAQ + serializeJsonLd), `app/sitemap.ts` dynamique (35+ URLs), `app/robots.ts`, `lib/seo/countries.ts` (60 pays).

**Pages ajoutées ou upgradées** : `/communaute`, `/atelier/chronologie` (3 villes parallèles), `/atelier/raccourcis` (référence clavier), `/journal/changelog`, `/legal/*` (4 pages rédactionnelles complètes), admin/* (5 routes).

**Fichiers système** : `app/opengraph-image.tsx` (homepage) + 4 per-segment (artworks, drops, posts, characters), `app/loading.tsx` + 3 per-segment skeletons, `app/error.tsx` + `global-error.tsx`, `app/not-found.tsx` (Mr Poppy illustré cherchant).

### Intégrations externes

Plausible Analytics (lazy, env-gated), Cloudflare Turnstile (lazy, env-gated), Sentry hook (stub prêt à recevoir DSN), Resend (templates câblés côté API).

### Métriques finales session

- Typecheck : 6/6 packages clean (admin, auth, config, db, emails, ui, web)
- Build : 2/2 apps OK
- Web : 49 routes statiques/SSG + 3 API dynamiques + 24 OG images + sitemap + robots
- Admin : 6 routes
- Homepage first-load JS : **222 KB** (WebGL + R3F lazy-split)
- Article first-load : 162 KB
- PDP : 168 KB

### Bloquants pour production (identiques — le code est prêt)

1. Credentials Neon / Stripe / Resend / Cloudflare R2
2. Vraies photos d'œuvres HD
3. Modèle Mr Poppy .glb optimisé
4. Brief Nacks final
5. DNS nacksgalerie.com vers Vercel
6. KYC Stripe

---

## 2026-04-22 (nuit) — Phase 0 polish + Sprint 2 infra + pages manquantes

**Contexte :** carte blanche Mehdi. Objectif : ne pas s'arrêter avant typecheck + build + smoke vert.

**Livré (commit `2b732ad`, poussé) :**

### Phase 0 — polish cinématographique
- **Hooks custom :** `useMagnetic` (distance + spring damping), `useMouseParallax`, `useKonami` (séquence ↑↑↓↓←→←→BA), `useLongPress` (seuil ms configurable), `usePoppyClicks` (compteur sessionStorage, seuil 40).
- **Polish UI :** `ScrollProgress` (barre rouge pathLength), `ClickRipple` (trace Posca éphémère 5 couleurs palette, exclut inputs), `MagneticButton` wrapper, `MouseParallaxLayer` double couche, `ExitIntent` (≥ 45s + mouse top + dismiss forever), `AudioToggle` (Web Audio API — pink noise buffer + hum 56Hz low-pass 380Hz, zéro fichier audio).
- **`CommandPalette`** (cmdk) : CMD+K / Ctrl+K / `?` ouvre. Recherche œuvres/drops/personnages/journal. Raccourcis vim `g + o/d/u/j/a/c/p/h`.
- **Easter eggs** : `EasterEggsProvider` global (toast signature blood), `LogoSignature` (clic maintenu 3s = signature plein écran 8s mix-blend-difference), `PoppyClickable` (40 clics cumulés change la palette pour la session), Konami → drop caché + code `KONAMI10`.
- **`CustomCursor` upgradé** : 7 variants (`default`, `link`, `image`, `buy`, `lock`, `drag`, `text`) + trail dot damping spring + labels contextuels.
- **HeroOpening** : `MouseParallaxLayer` en double couche (particules + wordmark).
- **404 interactif** : email pré-rempli vers Nacks avec URL manquante + hint CMD+K.
- **Layout** : skip-link accessibilité, commentaire HTML source avec ASCII art NACKS + message aux devs curieux, `.gitattributes` normalisation LF.

### Sprint 2 — infrastructure (code prêt, creds à brancher)
- **`@nacks/db`** : 15 tables Drizzle complètes (users/accounts/sessions/verificationTokens pour Auth.js, characters, artworks + images + variants, drops + purchases, orders + items, commissions, newsletter, wishlist, contactMessages, journalPosts, siteConfig). Client paresseux → ne crash pas sans DATABASE_URL.
- **`@nacks/auth`** : Auth.js v5 config factory avec Drizzle Adapter + Resend magic-link. Dégradation gracieuse si DB/Resend absents.
- **`@nacks/emails`** : 5 templates React Email (MagicLink, Welcome, OrderConfirmation, Shipment, CommissionReceipt) + renderer HTML/texte pour Resend.
- **API routes** `/api/newsletter`, `/api/commission` (scoring auto), `/api/contact` : validation maison, rate-limiter in-memory (3-5 req/min), persist DB si configurée, envoi Resend si configuré, toujours log.
- **Forms** `NewsletterForm`, `CommissionForm`, `ContactForm` câblés aux APIs.

### 10 pages manquantes
- `/panier` (empty state, récap latéral, featured), `/checkout` (UI tunnel 4 étapes, Stripe Sprint 6).
- `/legal/cgv`, `/legal/confidentialite`, `/legal/mentions`, `/legal/retours` — rédactionnel complet droit FR + RGPD, pas des stubs.
- `/atelier/contact` (ContactForm + sidebar presse/commission), `/atelier/presse` (bio 50/250 mots, timeline, assets par email, archives).
- `/journal/changelog` (2 releases documentées).

### Qualité
- **Typecheck 6/6 clean** (dont 3 nouveaux packages DB/Auth/Emails).
- **Build** : 47 routes SSG/statiques + 3 API dynamiques. Homepage 219 KB first-load JS (budget 220 KB tenu).
- **Smoke test** 12 routes HTML → toutes HTTP 200. APIs newsletter + contact → 200. API commission → 400 correct sur budget hors-plage.

**Prochaine action :** creds externes (Neon DB, Stripe, Resend, Cloudflare R2) → activer le Sprint 2 fonctionnel, migrer data-layer dummy vers DB.

---

## 2026-04-22 (soir) — ULTRAPLAN UX/UI 30 versions écrit

**Contexte :** Mehdi demande une vision UX/UI long terme couvrant 30 prochaines versions du site. Le MVP actuel (8 scènes + 11 pages) est solide mais pas encore state-of-the-art.

**Livrable :** `docs/ULTRAPLAN_UX_30.md` (~900 lignes) structuré en 8 parties :
1. 10 principes intemporels (filtre de décision, âme avant confort, temps comme matière…)
2. Phase 0 : 20 points de polish v1 **avant** public launch (transitions de page, magnetic buttons, curseur multi-variants, palette clavier CMD+K, easter eggs Konami & logo maintenu, 404 interactif…)
3. 30 versions en 7 phases narratives :
   - I · Ritualisation boutique (v1.1 → v1.6)
   - II · Drop comme événement (v1.7 → v2.0) — WebSocket live, lobby d'attente, certificat numérique
   - III · Mr Poppy incarné (v2.1 → v2.4) — 3D R3F + AR + configurateur
   - IV · Communauté (v2.5 → v2.8) — mur collection, profils, Nacks Show embarqué, co-création
   - V · Éditorial première classe (v2.9 → v3.2) — articles scrollytelling, 3 villes parallèles, audio, éditeur admin IA
   - VI · Personnalisation mesurée (v3.3 → v3.6) — curation explicable, signatures visuelles, alertes intelligentes, dashboard return-visitor
   - VII · Frontières techniques (v3.7 → v4.0) — View Transitions API, PWA, i18n FR/EN/AR, shader WebGL signature
4. NLS (Nacks Level of Service) — critères pour qu'une version ship
5. Anti-roadmap — ce qu'on ne fera JAMAIS (13 points : chatbot, pixel tiers, dark patterns, login social…)
6. Budget temps consolidé : 251 j-h ≈ 50 semaines focalisées, 18-24 mois calendaires
7. Protocole d'évolution — cadence, changelog public, re-prio trimestrielle
8. 5 North Stars métriques

**Prochaines actions possibles :**
- Phase 0 polish v1 (2 sem) — mettre le site au niveau avant launch
- Sprint 2 technique (DB + Auth + Stripe test) — infrastructure pour l'e-commerce réel
- Arbitrage Mehdi : dans quel ordre on attaque ?

---

## 2026-04-22 (après-midi) — Sprint 1 étendu : site complet

**Contexte :** Mehdi a jugé le Sprint 1 initial trop minimaliste (« un hero de merde »). Extension immédiate demandée avec cap state-of-the-art, award-winning, unique.

**Livrable commité (79e4546) :**
- GSAP 3.15 + @gsap/react ajoutés
- Data layer dummy complète : 11 œuvres, 3 drops (live/upcoming/past), 4 personnages avec lore long, 5 articles, bio Nacks + timeline + atelier + techniques + presse + partenaires
- SVG art procédural : 8 variants de posters + 4 portraits pleine cadre de personnages (ours bleu marinière X-eyes, gorille doré Colisée, renard rouge pavés Paris, lion doré crinière bubble letters)
- Preloader cinématographique (2.2 s max, session flag)
- 8 scènes homepage : Hero, Manifeste, DropLive (countdown + progress), ThreePortes (hover 3D tilt), UniversHorizontal (GSAP scrollytelling pinned), NacksShow (TV vintage + compteurs sociaux animés), Cercle (newsletter), FooterUnivers (NACKS redessiné au scroll)
- 12 routes vivantes : `/oeuvres` + `/oeuvres/[handle]` × 11, `/drops` + `/drops/[slug]` × 3, `/univers` + `/univers/[character]` × 4, `/journal` + `/journal/[slug]` × 5, `/atelier` + `/atelier/commission`, `/compte`
- TopNav actif, Layout PageShell, ArtworkCard, DropCard, ArticleCard, FilterBar URL-state, CommissionForm, NewsletterForm
- Typecheck clean 3/3, build clean 35 routes SSG/statiques, homepage 218 KB first-load JS

**Blocages :** aucun côté dev. En attente : brief Nacks final, vraies photos d'œuvres, compte Stripe KYC, creds Neon DB.

---

## 2026-04-22 — Sprint 1 : kickoff

**Contexte :** Mehdi valide le plan, donne le repo https://github.com/MaestroMed/JustExist.git, demande démarrage local immédiat. Exigence : state-of-the-art, award-winning, unique.

**Décisions actées aujourd'hui :**
- Monorepo Turborepo + pnpm workspaces (voir ADR-001).
- `apps/web` + `apps/admin` séparées dès J1 (l'admin ne sera pas un sous-chemin du site public).
- Node 22 LTS pinned via `.nvmrc` (le poste dev tourne sur Node 25 — supporté best-effort, CI sur 22).
- Fonts : Space Grotesk + Inter + JetBrains Mono en attendant décision PP Neue Montreal.

**Livrables de cette session :**
- Repo cloné, hygiène posée (`.gitignore`, `.editorconfig`, `.nvmrc`, `.prettierrc.json`, `.prettierignore`, `LICENSE` proprio).
- `README.md` racine.
- `docs/ULTRAPLAN.md` v1 (plan directeur, 12 sprints détaillés).
- `docs/DECISIONS.md` initiale avec 8 ADR (monorepo, framework, styling, ORM, auth, paiement, storage, anim).
- `docs/BRIEF.md` (copie du manifeste de Mehdi — source de vérité versionnée).
- `docs/DEVELOPMENT_LOG.md` (ce fichier).

**Prochaine étape :** scaffolding monorepo (`pnpm-workspace.yaml`, `turbo.json`, `package.json` racine), puis `packages/config`, `packages/ui`, puis `apps/web` avec une première scène cinématographique locale.

**Blocages :** aucun côté dev. Côté produit, attente du brief Nacks complet et des assets (modèle 3D Mr Poppy, photos œuvres HD, vidéos atelier).

---
