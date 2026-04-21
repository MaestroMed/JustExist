# DEVELOPMENT_LOG — Nacks Galerie

Journal vivant. Une entrée par session significative.
Ordre antéchronologique (plus récent en haut).

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
