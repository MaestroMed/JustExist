# DEVELOPMENT_LOG — Nacks Galerie

Journal vivant. Une entrée par session significative.
Ordre antéchronologique (plus récent en haut).

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
