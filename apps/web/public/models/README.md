# Modèles 3D locaux

Les fichiers `.glb` / `.gltf` de ce dossier sont **ignorés par git** (voir
`.gitignore` racine) parce qu'ils dépassent les 50 MB que GitHub tolère.

## Fichiers attendus localement pour le dev

- `mr-poppy.glb` — modèle de Mr Poppy officiel (84 MB brut). Il est chargé par
  `apps/web/components/universe/PoppyScene.tsx` sur `/univers/mr-poppy`.

## Stratégie production

Ces fichiers doivent être servis depuis **Cloudflare R2** via le CDN public
`https://cdn.nacksgalerie.com/models/...`. L'URL est configurable via la
variable d'environnement `NEXT_PUBLIC_POPPY_MODEL_URL`.

Au premier déploiement :

1. Optimiser le .glb avec `gltf-transform optimize` (cible < 5 MB) :
   - DRACO geometry compression
   - KTX2 texture compression (BasisU)
   - Meshopt pour les animations
2. Uploader dans le bucket R2 `nacks-assets` sous le préfixe `models/`
3. Configurer `cdn.nacksgalerie.com` pour servir `nacks-assets` avec
   `Cache-Control: public, max-age=31536000, immutable`
4. Poser `NEXT_PUBLIC_POPPY_MODEL_URL=https://cdn.nacksgalerie.com/models/mr-poppy.glb`
   dans Vercel project env vars.

En dev, `public/models/mr-poppy.glb` suffit. Le composant tombe en fallback
sur ce chemin quand l'env var n'est pas définie.
