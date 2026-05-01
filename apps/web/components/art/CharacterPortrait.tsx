/**
 * Portraits pleine surface des univers — placeholders typographiques sobres.
 *
 * Important : on NE reproduit PAS les logos / silhouettes officielles
 * (Mickey, Bart, Goku, Pink Panther, Snoopy) tant que les vraies photos
 * d'œuvres Nacks ne sont pas en ligne. Tant que c'est procédural, on reste
 * neutre — fond cream, accent serif italic + bandes verticales colorées
 * dérivées du `primaryColor` de l'univers. Cette compo sert juste à
 * remplir le cadre 3:4 dans la grille jusqu'à intégration des photos atelier.
 */

import {
  getCharacterOrProject,
  type ArtworkCharacterRef,
} from '@/lib/content/characters';

type Props = {
  character: ArtworkCharacterRef;
  className?: string;
};

const PAPER = '#FAFAFA';
const INK = '#0A0A0A';
const CREAM = '#F5F1E8';

export function CharacterPortrait({ character, className }: Props) {
  const data = getCharacterOrProject(character);
  const accent = data?.primaryColor ?? '#E63946';
  const secondary = data?.accentColor ?? '#FFD43B';
  const name = data?.name ?? character;

  return (
    <div className={className} role="img" aria-label={`Univers — ${name}`}>
      <svg
        viewBox="0 0 600 800"
        preserveAspectRatio="xMidYMid slice"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <defs>
          <pattern
            id={`portrait-grain-${character}`}
            x="0"
            y="0"
            width="6"
            height="6"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="3" cy="3" r="0.5" fill={INK} fillOpacity="0.06" />
          </pattern>
          <linearGradient
            id={`portrait-glow-${character}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0" stopColor={accent} stopOpacity="0.18" />
            <stop offset="1" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Paper background */}
        <rect width="600" height="800" fill={PAPER} />

        {/* Soft top glow accent */}
        <rect
          width="600"
          height="800"
          fill={`url(#portrait-glow-${character})`}
        />

        {/* Two vertical color bands (subtle) */}
        <rect x="60" y="120" width="14" height="560" fill={accent} opacity="0.85" />
        <rect x="526" y="220" width="6" height="380" fill={secondary} opacity="0.8" />

        {/* Eyebrow line */}
        <text
          x="100"
          y="160"
          fill={INK}
          fillOpacity="0.55"
          fontFamily="ui-monospace, Menlo, monospace"
          fontSize="14"
          letterSpacing="4"
        >
          UNIVERS NACKS
        </text>

        {/* Big name in serif italic, broken on two lines if needed */}
        <NameDisplay name={name} />

        {/* Tagline strip */}
        {data?.tagline ? (
          <text
            x="100"
            y="700"
            fill={INK}
            fillOpacity="0.6"
            fontFamily="'Playfair Display', Georgia, serif"
            fontStyle="italic"
            fontSize="22"
          >
            {truncate(data.tagline, 38)}
          </text>
        ) : null}

        {/* Year badge bottom-right */}
        {data?.introducedAt ? (
          <text
            x="500"
            y="700"
            textAnchor="end"
            fill={INK}
            fillOpacity="0.45"
            fontFamily="ui-monospace, Menlo, monospace"
            fontSize="14"
            letterSpacing="3"
          >
            {`DEPUIS ${data.introducedAt}`}
          </text>
        ) : null}

        {/* Grain overlay */}
        <rect
          width="600"
          height="800"
          fill={`url(#portrait-grain-${character})`}
        />

        {/* Bottom hairline */}
        <rect x="60" y="740" width="480" height="1" fill={INK} fillOpacity="0.18" />

        {/* Small Nacks mark bottom-left */}
        <text
          x="60"
          y="770"
          fill={INK}
          fillOpacity="0.4"
          fontFamily="ui-monospace, Menlo, monospace"
          fontSize="11"
          letterSpacing="3"
        >
          NACKS
        </text>

        {/* Cream wash mark at top-right corner for texture */}
        <rect x="450" y="80" width="80" height="80" fill={CREAM} opacity="0.5" />
      </svg>
    </div>
  );
}

function NameDisplay({ name }: { name: string }) {
  // Split name on "&" or just leave it, render large serif italic.
  // Long names get scaled down via fontSize stepping.
  const fontSize = name.length > 14 ? 70 : name.length > 10 ? 92 : 112;
  return (
    <text
      x="100"
      y="430"
      fill={INK}
      fontFamily="'Playfair Display', Georgia, serif"
      fontStyle="italic"
      fontSize={fontSize}
      fontWeight="400"
      letterSpacing="-2"
    >
      {name}
    </text>
  );
}

function truncate(s: string, n: number): string {
  return s.length <= n ? s : s.slice(0, n - 1) + '…';
}
