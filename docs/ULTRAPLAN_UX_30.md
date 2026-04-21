# ULTRAPLAN UX/UI — 30 versions pour un site éternel

**Version :** 1.0
**Date :** 2026-04-22
**Auteur :** Claude Code, sous direction de Mehdi (Kairos)
**Statut :** canon — complémentaire à `docs/ULTRAPLAN.md` (le plan *technique*). Ce document-ci est le plan *émotionnel & expérientiel*.

---

## Préambule — pourquoi 30 versions

Un site-univers n'est pas livré, il est **habité au fil du temps**. Chaque version majeure est une nouvelle phrase dans le même poème — jamais une rupture, jamais une régression. Les 30 versions qui suivent ne sont pas une checklist : ce sont des **tableaux** d'une exposition qui ne ferme jamais.

Le filtre de décision reste inchangé :

> *Est-ce que c'est ce que Nacks aurait peint lui-même, s'il savait coder ?*

Si la réponse est oui pour **v1.0** et pour **v4.0**, on a réussi.

---

## Partie I — Les 10 principes intemporels

Ces principes ne bougent jamais. Toute décision UX/UI, à toute version, doit pouvoir les citer.

### 1. L'âme avant le confort
Une décision audacieuse qui parle vaut mieux qu'une décision safe qui plaît. Si un visiteur trouve le site « bizarre » au premier passage mais en parle à trois amis dans la semaine, on a gagné.

### 2. Le temps comme matière
Ralentir est un choix délibéré. Pas de *skip intro*. Pas de *raccourci*. Quand une animation prend 1,2 s, c'est parce que 0,4 s aurait tué la tension.

### 3. Le geste plutôt que le clic
Privilégier les interactions qui rappellent une intention physique (*toucher, balayer, tirer, dessiner*) aux clics purement fonctionnels. Chaque CTA doit pouvoir être ressenti.

### 4. Une main de Nacks toujours visible
Chaque écran contient au moins **un indice** de sa présence physique : signature, trait au Posca, voix off, graffiti, ombre d'une bombe, grain papier, imperfection assumée.

### 5. La rareté comme rituel
Ce qui est rare apparaît lentement, de façon **cérémonielle**. Un drop ne pop-up pas, il se découvre. Un Mr Poppy figurine s'approche, elle ne s'affiche pas.

### 6. Le silence comme respect
On n'inflige aucun son sans consentement explicite. Jamais de vidéo autoplay avec audio. Jamais de notification sonore par défaut. Mais **quand** l'audio est activé, il doit être cinématographique.

### 7. L'accessibilité sans compromis
WCAG 2.2 **AAA** comme horizon (pas AA comme case à cocher). Tout ce qui bouge doit avoir son équivalent immobile. Tout ce qui se voit doit pouvoir s'écouter. Le clavier est un vrai citoyen, pas un fallback.

### 8. La performance comme éthique
Servir un site lourd à quelqu'un en 3G, c'est l'exclure. LCP < 2,0 s sur mobile 4G simulé ou on ne merge pas. Chaque KB compte, chaque requête se justifie.

### 9. Le mouvement cinématographique, jamais marketing
La direction artistique est celle d'un court-métrage, pas d'une landing page. Pas de « bounce », de « pulse agressif », de flash, de confettis gratuits. Les animations servent la narration, pas la conversion.

### 10. Zéro friction, sauf pendant le rituel
Tout doit être fluide — **sauf** l'achat d'un drop, qui doit être ressenti. Le countdown, l'attente, l'assignation du numéro d'édition, la confirmation : chaque seconde est construite.

---

## Partie II — Phase 0 · Polish v1 (avant public launch)

Le site actuel est un **MVP solide**. Il n'est pas encore *state of the art*. Les 20 raffinements ci-dessous le font passer de « bon » à « inoubliable » **sans ajouter une seule feature business**. Tous sont faisables en **2 semaines focalisées** avant le launch public.

Classés par impact émotionnel, pas technique.

### 0.1 — Transitions de page cinématographiques
Chaque navigation inter-pages = overlay noir + signature NACKS flash rouge + wipe d'entrée. 500 ms max, skippable si `prefers-reduced-motion`.
**Lib :** `View Transitions API` natif + Motion `LayoutGroup`.

### 0.2 — Éléments partagés (image → hero détail)
L'image d'une œuvre dans la grille *vole* vers sa position hero sur la page détail (GSAP Flip, déjà dans notre arsenal).
**Pourquoi :** on supprime la sensation de « page chargée » au profit de « je suis entré ».

### 0.3 — Curseur multi-variants contextuels
- `default` : disque cream 8 px
- `link` : 48 px + label
- `image` : 56 px + libellé "Voir" (cream)
- `buy` : 72 px, rouge, libellé "Acheter"
- `lock` : quand hover sur un drop VIP-only non débloqué
- `drag` : quand un élément est glissable

### 0.4 — Magnetic buttons sur les CTA majeurs
Les boutons "Entrer dans le drop", "Ajouter au panier", "J'entre dans le cercle" attirent le curseur à 40 px de distance (spring 300/30). Sensation tactile haptique sans haptique réel.

### 0.5 — Scroll progress signature
Un trait rouge fin (2 px) qui se dessine en haut de viewport au fur et à mesure du scroll, épaisseur variable selon la vitesse. Remplace la barre de progression classique.

### 0.6 — Grain animé (vs. grain statique actuel)
La texture grain se régénère à 1-2 FPS (pas 60, on n'est pas un jeu). Sensation de papier vivant.

### 0.7 — Ripples au clic, style Posca
Chaque clic laisse une trace temporaire (inline SVG 300 ms) qui évoque un coup de Posca qui s'évapore. Subtle, jamais gênant.

### 0.8 — Preloader avec progress réelle
Au lieu d'un timer aveugle, mesurer `document.fonts.ready` + fetch critique. Se finit quand c'est prêt, sort instantanément.

### 0.9 — Parallax souris sur le hero
Le fond du hero (particules aérosol + vignette) suit imperceptiblement le curseur, max 3° de rotation. Tilt subtil.

### 0.10 — Audio toggle atelier
Bouton discret coin haut-droit (icône casque). Si activé, loop 6 s d'ambiance atelier (bombe aérosol, Posca qui gratte, conversation étouffée). 15 dB de moins que le système. Désactivé par défaut.

### 0.11 — Palette clavier `?`
Command palette en CMD+K : recherche œuvre, drop, article, personnage. Navigation 100 % clavier. Inspiration : Linear, Raycast.

### 0.12 — Raccourcis vim-style
- `g` puis `o` = /oeuvres
- `g` puis `d` = /drops
- `g` puis `u` = /univers
- `g` puis `j` = /journal
- `g` puis `a` = /atelier
- `/` = focus palette
- `?` = affiche la liste des raccourcis

### 0.13 — Easter egg Konami
`↑ ↑ ↓ ↓ ← → ← → B A` → débloque un drop caché (`/drops/secret-`) avec un code promo -10 % à usage unique.

### 0.14 — Easter egg logo
Clic maintenu 3 s sur le logo NACKS → démarre une animation de Nacks qui dessine sa signature en temps réel par-dessus l'écran, 8 s, mix-blend-mode difference.

### 0.15 — Easter egg 40 clics sur Mr Poppy
40 clics cumulés sur Mr Poppy (sur la homepage ou la page univers) = sa palette de couleurs change au hasard pour la session.

### 0.16 — Breadcrumbs narratifs
Pas "Œuvres > Mr Poppy > Neon Night" mais :
> *« Tu es dans la galerie · Série Mr Poppy · Neon Night »*
Rédaction littéraire, pas structurelle.

### 0.17 — Newsletter exit-intent **désactivable forever**
Pas de popup aveugle au chargement. Le prompt n'apparaît qu'après 45 s de présence + mouvement de souris vers le haut (sortie). Un clic sur « non merci » l'éteint **définitivement** (localStorage persistant).

### 0.18 — 404 interactif
Au lieu de la page statique actuelle : un bouton *"Demander à Nacks où est cette page"* qui ouvre un `mailto:` pré-rempli avec la route manquante. Transforme l'erreur en contact.

### 0.19 — Credits ASCII dans le HTML
Dans les commentaires du `<head>` de chaque page, un ASCII art du logo NACKS + un message pour les développeurs curieux :
```html
<!-- Built with soul. You want to work with us? contact@nacksgalerie.com -->
```

### 0.20 — Focus management strict
Tous les éléments focusables ont un `focus-visible` rouge 2 px offset 3 px. Ordre de tab logique. Skip links cachés visuellement mais accessibles clavier. Tests VoiceOver sur Safari, NVDA sur Firefox Windows.

**Durée Phase 0 : 10 à 14 jours-homme focalisés.** À faire **avant** le public launch. Rien ne part en prod sans ça.

---

## Partie III — Les 30 versions · Roadmap cinématographique

Chaque version a :
- **Un thème émotionnel** (1 ligne)
- **2 à 3 livrables clés**
- **Une référence inspirante** (à ne pas copier, à étudier)
- **Une mesure de succès** (on sait qu'on a gagné quand…)
- **Une durée estimée** (jours-homme focalisés)

---

### PHASE I — RITUALISATION DE LA BOUTIQUE (v1.1 → v1.6)

> **Promesse :** acheter une œuvre doit avoir la même gravité que d'entrer dans une galerie physique.

#### v1.1 — « Les vraies photos »
**Thème :** remplacer le simulacre par l'original.
- Photos HD réelles des 15 premières œuvres (3000 px min.), scan galerie ou atelier
- Lightbox deepzoom type OpenSeadragon (zoom niveau matière)
- 3 vues par œuvre minimum : complète, détail signature, contexte accroché
**Inspi :** avantarte.com, le zoom sur [pacegallery.com](https://www.pacegallery.com)
**Succès :** temps moyen sur page détail > 60 s.
**Durée :** 5 j-h (+ temps photo externe).

#### v1.2 — « Dans ton intérieur »
**Thème :** projeter l'œuvre chez l'acheteur avant l'achat.
- Mockups 5 murs-types (salon moderne, chambre, bureau industriel, couloir, cuisine)
- Slider *"compare la taille à un humain / une porte / une table"*
- Export PNG shareable WhatsApp
**Inspi :** IKEA Place, Tylko
**Succès :** taux d'ajout au panier +15 %.
**Durée :** 5 j-h.

#### v1.3 — « Le mur de désirs »
**Thème :** la wishlist devient un moodboard personnel.
- Grille masonry style Pinterest, réorganisable en drag
- Alertes email quand une œuvre sauvegardée re-disponible / drop associé
- Partageable en lien (`/collectionneur/[handle]/mur`)
**Inspi :** are.na, cosmos.so
**Succès :** 25 % des visiteurs récurrents ont un mur actif.
**Durée :** 6 j-h.

#### v1.4 — « Le checkout-rituel »
**Thème :** payer doit être la plus belle page du site.
- Multistep pinned : le poster de l'œuvre reste à gauche à chaque étape (identification → adresse → livraison → paiement)
- Zoom progressif sur l'œuvre à chaque validation d'étape
- Payment Element Stripe stylé Nacks (accent rouge, Mono, noir)
- Apple Pay / Google Pay / SEPA natifs, aucun rebond
**Inspi :** Glossier checkout, Polaroid originals
**Succès :** taux d'abandon panier < 30 %.
**Durée :** 7 j-h.

#### v1.5 — « Bienvenue dans la collection »
**Thème :** la confirmation n'est pas une facture, c'est une intronisation.
- Page plein écran avec confettis Posca qui tombent (SVG animés)
- Message manuscrit qui se dessine : *"Bienvenue Alex. Tu as maintenant un Mr Poppy numéroté 42/100. Je l'emballe demain matin."*
- Photo immédiate de l'œuvre ratachée à la commande (photo prise pendant le drop)
- Section "tu fais partie d'une famille" — 4 autres collectionneurs du même personnage (anonymisés si opt-out)
**Inspi :** Kith post-checkout, Glossier thank you
**Succès :** NPS post-achat > 70.
**Durée :** 4 j-h.

#### v1.6 — « La série des 5 emails »
**Thème :** transformer la livraison en série narrative.
- Email 1 (instant) : confirmation avec 1 photo live de Nacks qui signe
- Email 2 (J+3) : *"Ton œuvre sort de l'atelier"* + photo de l'emballage
- Email 3 (J+expedition) : tracking embed + photo du colis qui part
- Email 4 (J+delivery+2) : *"Elle est arrivée chez toi ?"* + formulaire photo pour le Mur
- Email 5 (J+30) : *"30 jours ensemble"* + invitation à partager
**Outil :** React Email + Resend, templates versionnés
**Succès :** taux d'ouverture > 65 %, 30 % des clients partagent une photo.
**Durée :** 6 j-h.

**→ Durée Phase I : ~33 jours-homme (≈ 6,5 semaines)**

---

### PHASE II — LE DROP COMME ÉVÉNEMENT (v1.7 → v2.0)

> **Promesse :** un drop doit ressembler à un match en direct — tension, foule, résultat.

#### v1.7 — « Le live-counter WebSocket »
**Thème :** on passe du polling 8 s au temps réel.
- Pusher Channels ou Ably pour la synchronisation temps réel
- Animation à chaque vente : un petit point cream qui apparaît dans la grille des vendus
- Défilement *"Alex, 19h42, n°42/100 · Yasmine, 19h42, n°43/100"* (anonymisable)
**Succès :** zéro double-booking, latence < 300 ms.
**Durée :** 6 j-h.

#### v1.8 — « Le lobby d'attente »
**Thème :** si plus de demande que de stock → dignité dans l'attente.
- Avant le drop, un écran d'attente avec countdown synchronisé
- À l'ouverture, file d'attente FIFO serveur
- Animation cinematic : *"Tu es n°42 sur 847 · temps d'attente estimé 1 min 40"*
- Musique d'ambiance atelier en option
- Pas de rafraîchissements frustrants, pas de 500 serveur
**Inspi :** Nike SNKRS, Supreme, Hermès drops VIP
**Succès :** zéro crash serveur pendant le drop du Poppy Neon Night.
**Durée :** 8 j-h.

#### v1.9 — « L'historique du drop »
**Thème :** le drop ne s'efface pas, il entre au musée.
- Page post-drop `/drops/[slug]/archive` : *"100 personnes ont acquis cette édition"*
- Carte du monde Mapbox avec 1 point / acheteur (anonymisé au pays)
- Stats : durée totale du drop, plus rapide achat, répartition géo
- Citations de 5 acheteurs (collectées post-achat)
**Inspi :** Patek Philippe archive, Moncler drops
**Succès :** 20 % des visiteurs récurrents consultent au moins un historique.
**Durée :** 6 j-h.

#### v2.0 — « Le certificat numérique »
**Thème :** chaque œuvre a sa provenance cryptographique, sans tomber dans la hype NFT.
- Certificat signé en DB (ECDSA) + PDF téléchargeable
- Page publique `/certificat/[tokenId]` — preuve de provenance, historique de propriétaires (avec consentement)
- Option activable par Nacks : mint NFT Polygon/Base via une passerelle (gratuit pour l'acheteur)
- Pure trace de propriété, jamais trading, jamais spéculatif
**Inspi :** Moncler Genius, Rolex Certified
**Succès :** 50 % des acheteurs d'originaux réclament leur certificat.
**Durée :** 10 j-h.

**→ Durée Phase II : ~30 jours-homme (≈ 6 semaines)**

---

### PHASE III — MR POPPY INCARNÉ (v2.1 → v2.4)

> **Promesse :** le personnage n'est plus un dessin, c'est un compagnon.

#### v2.1 — « Mr Poppy en 3D temps réel »
**Thème :** Nacks donne corps à la mascotte.
- Import .glb optimisé < 5 MB (DRACO + KTX2 textures)
- React Three Fiber + drei OrbitControls + environnement HDRI atelier
- Sur homepage hero : Poppy au centre, follow curseur, rotation sur hover
- Sur /univers/mr-poppy : contrôle total, 4 skins (Classique, Neon Night, Golden, Street OG) avec transitions entre matériaux
- Fallback image statique si `prefers-reduced-motion` ou GPU faible
**Inspi :** kawsone.com, KAWS:HOLIDAY AR, obeygiant.com
**Succès :** temps moyen sur hero > 12 s (vs. 5 s actuel).
**Durée :** 10 j-h (hors modélisation 3D).

#### v2.2 — « Le configurateur figurine »
**Thème :** tu fabriques ta propre figurine.
- Choix : skin, pose (debout, assis, en train de peindre), accessoire (pioche / lama / carnet)
- Prix dynamique affiché en temps réel
- Prévisualisation 3D live à chaque changement
- CTA *"Commander ma figurine"* → devis automatique, 4 à 6 semaines production
**Inspi :** Nike By You, MiniMe
**Succès :** 5 % des visiteurs de la page lancent un configurateur, 30 % convertissent.
**Durée :** 12 j-h.

#### v2.3 — « Mr Poppy chez toi (AR) »
**Thème :** la réalité augmentée comme preuve d'objet.
- `<model-viewer>` Google + WebXR pour Android
- Bouton *"Voir chez moi"* sur chaque fiche figurine
- Scan de la pièce, placement, ajustement, capture photo partageable
- Partage direct Instagram, watermark discret "nacksgalerie.com/ar/[id]"
**Inspi :** Apple AR Quick Look, IKEA Place, Wayfair
**Succès :** 8 % des mobiles utilisent la fonction, 40 % des captures sont partagées.
**Durée :** 8 j-h.

#### v2.4 — « Le jeu de cache-cache »
**Thème :** gamification invisible.
- Tous les jours, Mr Poppy se cache sur une page différente du site
- Si un visiteur le trouve (clic dans un endroit inattendu — une marge, un angle), unlock code promo -5 % sur le prochain drop
- Le code ne s'affiche pas, il s'envoie par email (pour inciter à créer un compte)
- Jamais indiqué explicitement dans le menu — découverte uniquement
**Inspi :** Zelda collectibles, Nintendo easter eggs
**Succès :** 3 % des visiteurs trouvent Poppy en une session.
**Durée :** 5 j-h.

**→ Durée Phase III : ~35 jours-homme (≈ 7 semaines)**

---

### PHASE IV — LE SITE VIT, LA COMMUNAUTÉ APPARAÎT (v2.5 → v2.8)

> **Promesse :** le collectionneur devient ambassadeur, le site devient lieu.

#### v2.5 — « Le Mur de la collection »
**Thème :** les œuvres vivent là où elles sont accrochées.
- Page `/communaute/mur` : grille masonry des photos des œuvres chez leurs propriétaires
- Upload en 2 clics post-achat (opt-in strict)
- Chaque photo : nom, ville, numéro d'édition, témoignage optionnel
- Curation par Nacks — il choisit les 80 plus marquantes, le reste est archive
**Inspi :** Supreme community gallery, The Hundreds
**Succès :** 30 % des collectionneurs partagent une photo dans les 60 jours.
**Durée :** 8 j-h.

#### v2.6 — « Les profils publics »
**Thème :** exister dans l'univers Nacks au-delà de ses achats.
- `/collectionneur/[handle]` : œuvres possédées, badges, ancienneté, ville
- Un collectionneur peut *suivre* un autre (timeline minimaliste)
- Opt-in strict, privacy par défaut, 3 niveaux de visibilité (privé / amis / public)
- Pas de feed algorithmique, pas de likes, pas de commentaires — juste présence
**Inspi :** are.na profiles, Glass.photo
**Succès :** 20 % des collectionneurs activent leur profil public.
**Durée :** 10 j-h.

#### v2.7 — « Nacks Show embarqué »
**Thème :** le live TikTok entre dans le site.
- Embed sécurisé des lives TikTok et YouTube en cours
- Archive cherchable (`/nacks-show/[episode-number]`) avec transcript
- Timeline interactive : timecode → œuvre mentionnée → lien direct boutique
- Commentaires asynchrones par épisode (modérés, opt-in)
**Inspi :** Twitch VODs, Apple Music Radio archive
**Succès :** 15 % des visiteurs regardent ≥ 1 épisode complet dans l'archive.
**Durée :** 8 j-h.

#### v2.8 — « La co-création »
**Thème :** la communauté oriente sans décider.
- Sondage mensuel : *"Quel personnage pour le prochain drop ?"*, *"Format préféré pour la sérigraphie ?"*
- Résultats live visibles
- Pas de vote anonyme : chaque réponse liée à un compte (limite les bots)
- Les résultats sont consultatifs, Nacks décide à la fin
**Inspi :** Kickstarter stretch goals, A24 polls
**Succès :** 40 % des users connectés participent au sondage du mois.
**Durée :** 4 j-h.

**→ Durée Phase IV : ~30 jours-homme (≈ 6 semaines)**

---

### PHASE V — ÉDITORIAL DE PREMIÈRE CLASSE (v2.9 → v3.2)

> **Promesse :** le journal est une destination — on y vient **pour lui**, pas en collatéral.

#### v2.9 — « Les articles-expériences »
**Thème :** certains articles méritent d'être vécus, pas lus.
- Template *"long-form"* dédié (en plus du template standard)
- Scroll-triggered : pinning, parallax, reveal, images qui s'animent à l'approche
- Exemple de format : *"L'histoire d'une toile"* — scroll qui fait progresser la peinture image par image, du croquis à la signature
- Outil admin pour créer ces articles : blocs modulaires (hero, pinned image, parallax text, timelapse, quote)
**Inspi :** NYT *The Displaced*, Polygon cover stories, Bloomberg Big Take
**Succès :** temps moyen sur article long-form > 6 min.
**Durée :** 12 j-h.

#### v3.0 — « Les trois villes »
**Thème :** la vie de Nacks en 3 fils parallèles synchronisés.
- Page `/atelier/chronologie` : 3 timelines verticales (Sarcelles · Paris · LA)
- Scroll synchronisé entre les 3 — tu avances dans Sarcelles, les deux autres suivent en date
- Chaque événement : photo + audio 30 s (voix de Nacks) + texte
- Transition entre villes en swipe horizontal sur mobile
**Inspi :** Pitchfork *The Greatest Music Videos*, Spotify Wrapped
**Succès :** temps moyen sur page > 4 min, 60 % atterrissent sur les trois villes.
**Durée :** 8 j-h.

#### v3.1 — « Nacks en audio »
**Thème :** le site parle.
- `/journal/audio` : archives Nacks Show format long (1 h+), lives réarchivés
- Player custom waveform (BBC/NPR style)
- Chapitres cliquables (auto-générés via Whisper + revus par Nacks)
- Transcript complet synchronisé, cherchable
**Inspi :** Whisper Transformer, The Daily NYT, Radio France
**Succès :** 15 % des visiteurs écoutent ≥ 10 min d'audio.
**Durée :** 8 j-h.

#### v3.2 — « L'éditeur admin assisté »
**Thème :** Nacks écrit plus, Mehdi intervient moins.
- Dashboard admin : éditeur Tiptap enrichi
- Assistant IA (Claude Opus via API) en side-panel : suggère titres, corrige syntaxe, propose structure
- Workflow : brouillon → suggestions IA → validation humaine → publication
- L'IA ne publie jamais seule, elle propose toujours
**Inspi :** Notion AI, Ghost Editor, Lex.page
**Succès :** temps moyen de rédaction d'un article divisé par 2 sans perte de qualité.
**Durée :** 10 j-h.

**→ Durée Phase V : ~38 jours-homme (≈ 7,5 semaines)**

---

### PHASE VI — PERSONNALISATION MESURÉE (v3.3 → v3.6)

> **Promesse :** le site reconnaît que tu reviens, sans jamais te traquer.

#### v3.3 — « Pour toi, pas pour l'algo »
**Thème :** curation explicable.
- Page `/pour-toi` pour users connectés
- Algorithme léger (first-party uniquement) : wishlist + vues + achats
- Chaque recommandation est **expliquée** : *"Parce que tu as aimé Mr Poppy Neon Night → voici Poppy & Llama Collab"*
- Possibilité de désactiver toute recommandation en 1 clic
- Aucune intégration Meta/Google, aucun pixel tiers
**Inspi :** Spotify *Discover Weekly* (mais pas la dark pattern), Criterion Channel
**Succès :** 40 % des users connectés visitent /pour-toi, taux de conversion +20 %.
**Durée :** 8 j-h.

#### v3.4 — « Les signatures visuelles »
**Thème :** ton Nacks à toi.
- 4 thèmes sélectionnables : *Cream Artist* (cream+ink, default), *Poppy Night* (bleu nuit+rouge), *Sarcelles Brut* (jaune+noir), *Eiffel Gold* (doré+sombre)
- Affecte : palette de la nav, curseur, preloader, ambiance hero
- Toujours dans l'identité Nacks, jamais "fun" générique
- Stocké côté user pref + fallback cookie anonyme
**Inspi :** Figma theme switch, macOS accent colors
**Succès :** 30 % des users connectés choisissent un thème non-default.
**Durée :** 6 j-h.

#### v3.5 — « Alertes intelligentes »
**Thème :** être prévenu au bon moment, pas tout le temps.
- Web Push (natives browser) activable après 3 visites (pas au premier visit)
- SMS pour VIP uniquement (opt-in strict, via Twilio)
- Choix du canal par type d'alerte : drops / newsletter hebdo / stock wishlist
- *"Par quel canal veux-tu que je te prévienne ?"* — Nacks parle à la première personne
**Inspi :** Linear notifications, Slack quiet hours
**Succès :** 50 % des VIPs activent au moins une alerte, < 5 % désabonnement / mois.
**Durée :** 8 j-h.

#### v3.6 — « Chez toi » (landing return-visitor)
**Thème :** pour un user connecté, la homepage est personnalisée.
- Remplace le hero par un *"Re-bonjour Alex"* si connecté
- Résumé 30 s : nouveautés depuis ta dernière visite + drops à venir dans ta wishlist + messages Nacks
- Lien vers `/` classique toujours accessible (pour revoir le hero canonique)
- Scroll continue vers la homepage universelle
**Inspi :** Netflix *"Pick up where you left off"*, Spotify home
**Succès :** 70 % des users connectés cliquent dans leur résumé.
**Durée :** 8 j-h.

**→ Durée Phase VI : ~30 jours-homme (≈ 6 semaines)**

---

### PHASE VII — FRONTIÈRES TECHNIQUES ET GLOBALES (v3.7 → v4.0)

> **Promesse :** le site se projette dans l'ailleurs et dans le futur.

#### v3.7 — « View Transitions API cross-page »
**Thème :** la navigation devient native comme une app.
- Chrome/Edge natif `document.startViewTransition`, polyfill Safari
- Éléments partagés entre pages animés nativement (grille → détail, character card → character page)
- SPA-feel sans sacrifier le SSR
**Inspi :** Apple.com product pages, astro-transitions
**Succès :** temps perçu de transition < 200 ms.
**Durée :** 6 j-h.

#### v3.8 — « PWA complète »
**Thème :** le site devient installable, offline-first.
- Manifest, service worker, install prompt (non-intrusif)
- Cache offline des 20 œuvres vues + journaux ouverts + nav
- Web Push natif sur mobile (déjà fait v3.5)
- *"Add to home screen"* proposé après 3 visites + 1 achat
**Inspi :** Twitter Lite, Starbucks PWA
**Succès :** 10 % des users récurrents installent, taux de retour +25 %.
**Durée :** 8 j-h.

#### v3.9 — « Les trois langues »
**Thème :** expansion Los Angeles + Casablanca.
- FR (source), EN (LA), AR (Casablanca — RTL intégral)
- next-intl, routing `/`, `/en`, `/ar`
- Traduction humaine uniquement (pas d'IA aveugle sur l'éditorial)
- Nacks valide chaque phrase pour EN/AR, quitte à ne pas tout traduire
- Contenu sensible (lore personnages) potentiellement adapté, pas traduit littéralement
**Inspi :** The Guardian multi-lang, Aljazeera
**Succès :** 20 % du trafic en EN d'ici 6 mois post-launch, premier acheteur AR.
**Durée :** 14 j-h.

#### v4.0 — « Le fond vivant »
**Thème :** la homepage devient une œuvre d'art générative signée par son créateur.
- Shader WebGL procédural en fond de hero
- Base : voronoi + simplex noise, palette Nacks, seed unique par visiteur
- Chaque visiteur voit un arrière-plan unique — *"Ton Nacks"*
- Signable : l'image générée est exportable en PNG, shareable, optionnellement mintable comme NFT d'adhésion
- Fallback image statique si WebGL non dispo ou `prefers-reduced-motion`
**Inspi :** cosmos.so, active-theory.com, Tim Rodenbröker shader work
**Succès :** taux de partage social depuis homepage x3, *Awwwards Site of the Day*.
**Durée :** 15 j-h.

**→ Durée Phase VII : ~43 jours-homme (≈ 8,5 semaines)**

---

## Partie IV — Le NLS (Nacks Level of Service)

Chaque version ne ship pas sans **cocher tous les niveaux** :

### Performance
- LCP < 2,0 s sur 4G mobile simulé (Lighthouse CI)
- INP < 100 ms (interactions ≥ 5e percentile)
- CLS < 0,05
- Bundle JS initial < 220 KB gzipped sur la route la plus lourde

### Accessibilité
- WCAG 2.2 **AA** strict, AAA comme cible
- Audit axe-core en CI
- Tests manuels : VoiceOver (Safari macOS + iOS), NVDA (Firefox Windows), clavier complet
- Zéro contenu visible caché au screen reader (aria-hidden discipliné)

### Esthétique
- Review bipartite : Nacks + Mehdi
- Filtre systématique : *« Est-ce Nacks ? Est-ce que ça aurait pu être peint sur un mur à Sarcelles ? »*
- Si le résultat ressemble à un template Tailwind UI → refonte
- Si le résultat ressemble à un site concurrent → refonte

### Data
- KPI annoncé dans l'ultraplan ≥ objectif mesuré 30 jours post-ship
- Si raté : post-mortem écrit dans `docs/POSTMORTEMS/vX.Y.md`

### Anti-régression
- Toutes les versions précédentes restent fonctionnelles (tests E2E Playwright sur 10 parcours critiques)
- Aucune page passée ne se casse silencieusement

---

## Partie V — Ce qu'on ne fera jamais (anti-roadmap)

Ces choses ne verront **aucune** version du site. Écrites noir sur blanc pour éviter les demandes opportunistes.

- **Chatbot d'aide client** — rompt l'identité, introduit un intermédiaire froid.
- **Popup exit-intent agressif** — violation du consentement. Les 1 sorties valent plus que les 2 emails gagnés.
- **Tracking cross-site tiers** (Facebook Pixel, Google Analytics UA, Hotjar) — Plausible uniquement.
- **Gamification marketing** — pas de points de fidélité, pas de niveaux, pas de badges déconnectés des achats.
- **Dark patterns de rareté** — *"2 personnes regardent cette œuvre"* = mensonge et désactivé.
- **Notifications d'engagement forcé** — pas de *"reviens !"* en push quand l'utilisateur est inactif.
- **Autoplay vidéo avec son** — jamais, sous aucune condition.
- **Interstitiels publicitaires** — le site ne vend qu'au nom de Nacks.
- **Thème clair par défaut** — l'univers est nocturne. Option secondaire à terme, jamais default.
- **Optimisation SEO agressive** — pas de keyword stuffing, pas de fausse structure pour Google. Le site se suffit à lui-même, le SEO suit.
- **Retargeting email abandon panier** — le respect du visiteur passe avant le 3 % de conversion en plus.
- **Cookies publicitaires** — aucun. Le bandeau de consentement peut rester minimal.
- **Login social (Google, Facebook, Apple)** — le magic link est plus respectueux, plus sûr, plus simple.

---

## Partie VI — Budget temps consolidé

| Phase                          | Durée (j-h) | Semaines focalisées |
|--------------------------------|-------------|---------------------|
| 0 · Polish v1                  | 12          | 2                   |
| I · Ritualisation boutique     | 33          | 6,5                 |
| II · Drop comme événement      | 30          | 6                   |
| III · Mr Poppy incarné         | 35          | 7                   |
| IV · Site vit, communauté      | 30          | 6                   |
| V · Éditorial première classe  | 38          | 7,5                 |
| VI · Personnalisation mesurée  | 30          | 6                   |
| VII · Frontières techniques    | 43          | 8,5                 |
| **Total**                      | **251 j-h** | **~50 semaines**    |

Avec parallélisation, temps produit (research, design iterations, tests), feedback communauté, vraie vie : compter **18 à 24 mois** pour atteindre v4.0 complet. Phase 0 à III en 6 mois post-launch. Phase IV à VII selon traction et priorités business.

---

## Partie VII — Protocole d'évolution

- **Cadence de release :** 1 version mineure (vX.Y) toutes les 2-3 semaines en moyenne.
- **Changelog public :** `/journal/changelog` — chaque release expliquée en langage humain.
- **Feedback continu :** un lien discret `contact@nacksgalerie.com` en pied de page — les retours utilisateurs rééquilibrent le plan.
- **Re-priorisation trimestrielle :** le plan est vivant. Chaque trimestre, review avec Nacks + Mehdi — l'ordre peut changer, certaines versions peuvent mourir, d'autres naître.
- **Ce document** est mis à jour à chaque re-priorisation. L'historique est conservé dans `git log docs/ULTRAPLAN_UX_30.md`.

---

## Partie VIII — Les 5 North Stars

Les 5 métriques qui disent si on est **vraiment** sur la bonne trajectoire, quelle que soit la version :

1. **Temps moyen de première session > 4 min 30** — le site retient.
2. **Taux de retour 7 jours > 35 %** — le site manque aux gens.
3. **NPS post-achat > 70** — l'expérience d'acquisition est inoubliable.
4. **Part des visiteurs qui partagent une URL du site dans un message à un proche > 2 %** — le site est *digne d'être montré*.
5. **Awwwards Site of the Day à v4.0** — validation externe que le travail est de niveau mondial.

---

*Chaque version du site est une nouvelle phrase dans le même poème.*
*On ne publie pas, on murmure. On n'optimise pas, on polit.*
*On n'ajoute pas, on révèle ce qui était déjà là.*

— Mehdi & Claude Code, pour Nacks, pour l'Alliance.
