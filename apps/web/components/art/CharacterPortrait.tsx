/**
 * Portraits plein cadre des personnages — SVG riches, signatures fortes.
 * Utilisés sur homepage Scène 5 (Univers) et pages /univers/[slug].
 */

import type { CharacterSlug } from '@/lib/content/characters';

type Props = {
  character: CharacterSlug;
  className?: string;
};

export function CharacterPortrait({ character, className }: Props) {
  return (
    <div className={className} role="img" aria-label={`Portrait — ${character}`}>
      <svg
        viewBox="0 0 800 800"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        {renderCharacter(character)}
      </svg>
    </div>
  );
}

function renderCharacter(slug: CharacterSlug) {
  switch (slug) {
    case 'mr-poppy':
      return <MrPoppyFull />;
    case 'gorille-de-rome':
      return <GorilleFull />;
    case 'renard-de-paris':
      return <RenardFull />;
    case 'lion-d-eiffel':
      return <LionFull />;
  }
}

function MrPoppyFull() {
  const cx = 400;
  const cy = 360;
  const size = 200;
  return (
    <>
      <defs>
        <radialGradient id="mrp-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFD43B" stopOpacity="0.3" />
          <stop offset="1" stopColor="#FFD43B" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Halo */}
      <circle cx={cx} cy={cy} r={size * 1.9} fill="url(#mrp-glow)" />
      {/* Oreilles */}
      <circle cx={cx - size * 0.58} cy={cy - size * 0.72} r={size * 0.42} fill="#1E40AF" />
      <circle cx={cx + size * 0.58} cy={cy - size * 0.72} r={size * 0.42} fill="#1E40AF" />
      <circle cx={cx - size * 0.58} cy={cy - size * 0.72} r={size * 0.22} fill="#F5F1E8" opacity={0.65} />
      <circle cx={cx + size * 0.58} cy={cy - size * 0.72} r={size * 0.22} fill="#F5F1E8" opacity={0.65} />
      {/* Tête */}
      <circle cx={cx} cy={cy} r={size} fill="#1E40AF" />
      {/* Museau */}
      <ellipse cx={cx} cy={cy + size * 0.3} rx={size * 0.48} ry={size * 0.32} fill="#F5F1E8" />
      {/* Nez */}
      <ellipse cx={cx} cy={cy + size * 0.15} rx={size * 0.12} ry={size * 0.08} fill="#0A0A0A" />
      {/* X yeux */}
      <g stroke="#E63946" strokeWidth={size * 0.08} strokeLinecap="round">
        <line x1={cx - size * 0.45} y1={cy - size * 0.3} x2={cx - size * 0.2} y2={cy - size * 0.05} />
        <line x1={cx - size * 0.2} y1={cy - size * 0.3} x2={cx - size * 0.45} y2={cy - size * 0.05} />
        <line x1={cx + size * 0.2} y1={cy - size * 0.3} x2={cx + size * 0.45} y2={cy - size * 0.05} />
        <line x1={cx + size * 0.45} y1={cy - size * 0.3} x2={cx + size * 0.2} y2={cy - size * 0.05} />
      </g>
      {/* Corps avec marinière */}
      <path
        d={`M ${cx - size * 1.2} ${cy + size * 1.0} Q ${cx - size * 1.2} ${cy + size * 2.5}, ${cx} ${cy + size * 2.8} Q ${cx + size * 1.2} ${cy + size * 2.5}, ${cx + size * 1.2} ${cy + size * 1.0} Z`}
        fill="#1E40AF"
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x={cx - size * 1.2}
          y={cy + size * 1.15 + i * size * 0.22}
          width={size * 2.4}
          height={size * 0.1}
          fill="#F5F1E8"
        />
      ))}
      {/* Pioche MP à droite */}
      <g transform={`translate(${cx + size * 1.2} ${cy + size * 0.6}) rotate(-25)`}>
        <rect x="-6" y="-120" width="12" height="200" fill="#7C3AED" />
        <path d="M -40 -120 L 40 -120 L 60 -150 L 20 -160 L -20 -160 L -60 -150 Z" fill="#FFD43B" />
        <path d="M -40 -120 L 40 -120 L 40 -135 L -40 -135 Z" fill="#EC4899" />
      </g>
    </>
  );
}

function GorilleFull() {
  const cx = 400;
  const cy = 400;
  const size = 220;
  return (
    <>
      {/* Colisée en fond */}
      <g transform={`translate(${cx} ${cy + size * 2})`} stroke="#D4A056" strokeWidth="4" fill="none" opacity={0.3}>
        {[-3, -2, -1, 0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(${i * 100} 0)`}>
            <path d="M -30 0 Q 0 -60, 30 0 L 30 120 L -30 120 Z" />
          </g>
        ))}
      </g>
      {/* Pattern monogramme "NC" en arrière-plan */}
      <g opacity={0.1} fill="#D4A056" fontFamily="Space Grotesk, sans-serif" fontWeight={700} fontSize={30}>
        {[...Array(10).keys()].map((i) =>
          [...Array(10).keys()].map((j) => (
            <text key={`${i}-${j}`} x={i * 80 + (j % 2) * 40} y={j * 80 + 30}>
              NC
            </text>
          ))
        )}
      </g>
      {/* Silhouette gorille massive */}
      <path
        d={`M ${cx - size * 1.4} ${cy} Q ${cx - size * 1.4} ${cy - size * 1.2}, ${cx - size * 0.6} ${cy - size * 1.4} Q ${cx} ${cy - size * 1.6}, ${cx + size * 0.6} ${cy - size * 1.4} Q ${cx + size * 1.4} ${cy - size * 1.2}, ${cx + size * 1.4} ${cy} Q ${cx + size * 1.4} ${cy + size * 1.5}, ${cx + size * 0.9} ${cy + size * 2.2} L ${cx - size * 0.9} ${cy + size * 2.2} Q ${cx - size * 1.4} ${cy + size * 1.5}, ${cx - size * 1.4} ${cy} Z`}
        fill="#D4A056"
      />
      {/* Poitrine pattern */}
      <ellipse cx={cx} cy={cy + size * 1.2} rx={size * 0.8} ry={size * 0.7} fill="#0A0A0A" opacity={0.3} />
      {/* Visage */}
      <ellipse cx={cx} cy={cy - size * 0.5} rx={size * 0.9} ry={size * 0.7} fill="#F5F1E8" opacity={0.15} />
      {/* Yeux */}
      <circle cx={cx - size * 0.3} cy={cy - size * 0.55} r={size * 0.1} fill="#0A0A0A" />
      <circle cx={cx + size * 0.3} cy={cy - size * 0.55} r={size * 0.1} fill="#0A0A0A" />
      <circle cx={cx - size * 0.3} cy={cy - size * 0.55} r={size * 0.03} fill="#F5F1E8" />
      <circle cx={cx + size * 0.3} cy={cy - size * 0.55} r={size * 0.03} fill="#F5F1E8" />
      {/* Museau */}
      <ellipse cx={cx} cy={cy - size * 0.18} rx={size * 0.6} ry={size * 0.35} fill="#0A0A0A" opacity={0.9} />
      <ellipse cx={cx - size * 0.14} cy={cy - size * 0.25} rx={size * 0.05} ry={size * 0.04} fill="#D4A056" />
      <ellipse cx={cx + size * 0.14} cy={cy - size * 0.25} rx={size * 0.05} ry={size * 0.04} fill="#D4A056" />
    </>
  );
}

function RenardFull() {
  const cx = 400;
  const cy = 380;
  const size = 200;
  return (
    <>
      {/* Pavés au sol */}
      <g fill="#0A0A0A" opacity={0.2}>
        {[...Array(25).keys()].map((i) =>
          [...Array(5).keys()].map((j) => (
            <rect
              key={`${i}-${j}`}
              x={i * 40 + (j % 2) * 20}
              y={620 + j * 32}
              width="14"
              height="14"
              transform={`rotate(45 ${i * 40 + (j % 2) * 20 + 7} ${620 + j * 32 + 7})`}
            />
          ))
        )}
      </g>
      {/* Silhouette buildings Paris floue */}
      <g fill="#1E40AF" opacity={0.15}>
        <rect x="60" y="200" width="60" height="220" />
        <polygon points="120,200 150,140 180,200" />
        <rect x="180" y="240" width="80" height="180" />
        <rect x="260" y="180" width="100" height="240" />
        <rect x="360" y="220" width="70" height="200" />
        <rect x="430" y="200" width="80" height="220" />
        <polygon points="510,200 540,140 570,200" />
        <rect x="570" y="230" width="80" height="190" />
        <rect x="650" y="200" width="100" height="220" />
      </g>
      {/* Oreilles */}
      <polygon points={`${cx - size * 0.85},${cy - size * 0.2} ${cx - size * 0.65},${cy - size * 1.15} ${cx - size * 0.25},${cy - size * 0.4}`} fill="#E63946" />
      <polygon points={`${cx + size * 0.85},${cy - size * 0.2} ${cx + size * 0.65},${cy - size * 1.15} ${cx + size * 0.25},${cy - size * 0.4}`} fill="#E63946" />
      <polygon points={`${cx - size * 0.7},${cy - size * 0.3} ${cx - size * 0.58},${cy - size * 0.85} ${cx - size * 0.35},${cy - size * 0.45}`} fill="#F5F1E8" opacity={0.5} />
      <polygon points={`${cx + size * 0.7},${cy - size * 0.3} ${cx + size * 0.58},${cy - size * 0.85} ${cx + size * 0.35},${cy - size * 0.45}`} fill="#F5F1E8" opacity={0.5} />
      {/* Tête */}
      <path
        d={`M ${cx - size * 0.9} ${cy - size * 0.2} Q ${cx - size * 0.5} ${cy + size * 0.2}, ${cx} ${cy + size * 0.9} Q ${cx + size * 0.5} ${cy + size * 0.2}, ${cx + size * 0.9} ${cy - size * 0.2} Q ${cx + size * 0.6} ${cy - size * 0.5}, ${cx} ${cy - size * 0.5} Q ${cx - size * 0.6} ${cy - size * 0.5}, ${cx - size * 0.9} ${cy - size * 0.2} Z`}
        fill="#E63946"
      />
      {/* Museau */}
      <path d={`M ${cx} ${cy + size * 0.9} Q ${cx - size * 0.22} ${cy + size * 0.35}, ${cx} ${cy + size * 0.1} Q ${cx + size * 0.22} ${cy + size * 0.35}, ${cx} ${cy + size * 0.9} Z`} fill="#F5F1E8" />
      <ellipse cx={cx} cy={cy + size * 0.12} rx={size * 0.1} ry={size * 0.08} fill="#0A0A0A" />
      {/* Yeux */}
      <ellipse cx={cx - size * 0.3} cy={cy - size * 0.15} rx={size * 0.08} ry={size * 0.13} fill="#0A0A0A" transform={`rotate(-20 ${cx - size * 0.3} ${cy - size * 0.15})`} />
      <ellipse cx={cx + size * 0.3} cy={cy - size * 0.15} rx={size * 0.08} ry={size * 0.13} fill="#0A0A0A" transform={`rotate(20 ${cx + size * 0.3} ${cy - size * 0.15})`} />
      {/* Queue panache */}
      <path
        d={`M ${cx + size * 0.7} ${cy + size * 0.3} Q ${cx + size * 1.5} ${cy}, ${cx + size * 1.6} ${cy + size * 0.8}`}
        stroke="#E63946"
        strokeWidth={size * 0.35}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d={`M ${cx + size * 1.45} ${cy + size * 0.5} Q ${cx + size * 1.6} ${cy + size * 0.6}, ${cx + size * 1.6} ${cy + size * 0.85}`}
        stroke="#F5F1E8"
        strokeWidth={size * 0.12}
        strokeLinecap="round"
        fill="none"
      />
    </>
  );
}

function LionFull() {
  const cx = 400;
  const cy = 400;
  const size = 180;
  return (
    <>
      {/* Tour Eiffel background */}
      <g transform={`translate(${cx} ${cy + size * 2.5})`} stroke="#0A0A0A" strokeWidth="4" fill="none" opacity={0.22}>
        <path d={`M ${-size * 0.5} 0 L ${-size * 0.12} ${-size * 2.4} L ${size * 0.12} ${-size * 2.4} L ${size * 0.5} 0 Z`} />
        <line x1={-size * 0.3} y1={-size * 0.5} x2={size * 0.3} y2={-size * 0.5} />
        <line x1={-size * 0.2} y1={-size * 1.4} x2={size * 0.2} y2={-size * 1.4} />
      </g>
      {/* Crinière — cercles en couronne */}
      {[...Array(16).keys()].map((i) => {
        const angle = (i / 16) * Math.PI * 2;
        const r = size * 1.35;
        const cxMane = cx + Math.cos(angle) * r;
        const cyMane = cy + Math.sin(angle) * r;
        return (
          <circle
            key={i}
            cx={cxMane}
            cy={cyMane}
            r={size * 0.33}
            fill={i % 3 === 0 ? '#E63946' : i % 2 === 0 ? '#FFD43B' : '#D4A056'}
          />
        );
      })}
      {/* Bubble letters dans la crinière */}
      <g fontFamily="Space Grotesk, sans-serif" fontWeight={700} fontSize={28} fill="#0A0A0A" opacity={0.6}>
        <text x={cx - size * 1.8} y={cy - size * 0.5}>N</text>
        <text x={cx + size * 1.6} y={cy - size * 0.5}>C</text>
        <text x={cx - size * 1.5} y={cy + size * 1.4}>K</text>
        <text x={cx + size * 1.3} y={cy + size * 1.4}>S</text>
      </g>
      {/* Tête */}
      <circle cx={cx} cy={cy} r={size} fill="#D4A056" />
      {/* Museau */}
      <ellipse cx={cx} cy={cy + size * 0.3} rx={size * 0.55} ry={size * 0.32} fill="#F5F1E8" opacity={0.9} />
      {/* Nez triangle */}
      <path d={`M ${cx - size * 0.12} ${cy + size * 0.12} L ${cx + size * 0.12} ${cy + size * 0.12} L ${cx} ${cy + size * 0.3} Z`} fill="#0A0A0A" />
      <line x1={cx} y1={cy + size * 0.3} x2={cx} y2={cy + size * 0.5} stroke="#0A0A0A" strokeWidth="3" />
      {/* Yeux */}
      <circle cx={cx - size * 0.28} cy={cy - size * 0.15} r={size * 0.08} fill="#0A0A0A" />
      <circle cx={cx + size * 0.28} cy={cy - size * 0.15} r={size * 0.08} fill="#0A0A0A" />
      <circle cx={cx - size * 0.28} cy={cy - size * 0.18} r={size * 0.025} fill="#F5F1E8" />
      <circle cx={cx + size * 0.28} cy={cy - size * 0.18} r={size * 0.025} fill="#F5F1E8" />
    </>
  );
}
