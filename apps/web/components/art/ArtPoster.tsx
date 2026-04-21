/**
 * Posters procéduraux — compositions SVG signatures Nacks.
 * Utilisés comme placeholders jusqu'aux vraies photos d'œuvres.
 * Chaque variant porte une identité couleur + typo forte.
 */

import type { ReactNode } from 'react';

type PosterVariant =
  | 'poppy-neon'
  | 'poppy-classic'
  | 'gorille-gold'
  | 'fox-paris'
  | 'lion-eiffel'
  | 'poster-abstract-1'
  | 'poster-abstract-2'
  | 'figurine-mr-poppy';

type Props = {
  variant: PosterVariant;
  className?: string;
  label?: string;
};

export function ArtPoster({ variant, className, label }: Props) {
  return (
    <div
      role="img"
      aria-label={label ?? `Œuvre Nacks — ${variant}`}
      className={className}
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      <svg
        viewBox="0 0 400 520"
        preserveAspectRatio="xMidYMid slice"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        {variants[variant]()}
      </svg>
    </div>
  );
}

// ============================================================
// PRIMITIVES — petits glyphs réutilisables
// ============================================================

function BearHead({ x = 200, y = 260, size = 130, body = '#1E40AF', marinière = true }: {
  x?: number; y?: number; size?: number; body?: string; marinière?: boolean;
}) {
  const ear = size * 0.42;
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* Oreilles */}
      <circle cx={-size * 0.58} cy={-size * 0.7} r={ear} fill={body} />
      <circle cx={size * 0.58} cy={-size * 0.7} r={ear} fill={body} />
      <circle cx={-size * 0.58} cy={-size * 0.7} r={ear * 0.5} fill="#F5F1E8" opacity={0.6} />
      <circle cx={size * 0.58} cy={-size * 0.7} r={ear * 0.5} fill="#F5F1E8" opacity={0.6} />
      {/* Tête */}
      <circle cx={0} cy={0} r={size} fill={body} />
      {/* Museau */}
      <ellipse cx={0} cy={size * 0.3} rx={size * 0.45} ry={size * 0.3} fill="#F5F1E8" />
      {/* Nez */}
      <ellipse cx={0} cy={size * 0.15} rx={size * 0.12} ry={size * 0.08} fill="#0A0A0A" />
      {/* X yeux */}
      <g stroke="#E63946" strokeWidth={size * 0.08} strokeLinecap="round">
        <line x1={-size * 0.45} y1={-size * 0.3} x2={-size * 0.2} y2={-size * 0.05} />
        <line x1={-size * 0.2} y1={-size * 0.3} x2={-size * 0.45} y2={-size * 0.05} />
        <line x1={size * 0.2} y1={-size * 0.3} x2={size * 0.45} y2={-size * 0.05} />
        <line x1={size * 0.45} y1={-size * 0.3} x2={size * 0.2} y2={-size * 0.05} />
      </g>
      {/* Marinière indice (épaule) */}
      {marinière && (
        <g>
          <rect x={-size * 1.2} y={size * 0.95} width={size * 2.4} height={size * 0.1} fill="#F5F1E8" />
          <rect x={-size * 1.2} y={size * 1.08} width={size * 2.4} height={size * 0.08} fill="#F5F1E8" />
          <rect x={-size * 1.2} y={size * 1.2} width={size * 2.4} height={size * 0.07} fill="#F5F1E8" />
        </g>
      )}
    </g>
  );
}

function GorillaHead({ x = 200, y = 280, size = 120, color = '#D4A056' }: {
  x?: number; y?: number; size?: number; color?: string;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* Silhouette massive */}
      <path
        d={`M ${-size} 0 Q ${-size} ${-size * 1.1}, 0 ${-size * 1.2} Q ${size} ${-size * 1.1}, ${size} 0 Q ${size} ${size * 0.3}, ${size * 0.6} ${size * 0.5} L ${-size * 0.6} ${size * 0.5} Q ${-size} ${size * 0.3}, ${-size} 0 Z`}
        fill={color}
      />
      {/* Front plat */}
      <ellipse cx={0} cy={-size * 0.3} rx={size * 0.7} ry={size * 0.35} fill="#F5F1E8" opacity={0.18} />
      {/* Yeux */}
      <circle cx={-size * 0.32} cy={-size * 0.18} r={size * 0.09} fill="#0A0A0A" />
      <circle cx={size * 0.32} cy={-size * 0.18} r={size * 0.09} fill="#0A0A0A" />
      {/* Museau */}
      <ellipse cx={0} cy={size * 0.18} rx={size * 0.55} ry={size * 0.3} fill="#0A0A0A" opacity={0.85} />
      {/* Narines */}
      <ellipse cx={-size * 0.14} cy={size * 0.1} rx={size * 0.05} ry={size * 0.04} fill={color} />
      <ellipse cx={size * 0.14} cy={size * 0.1} rx={size * 0.05} ry={size * 0.04} fill={color} />
    </g>
  );
}

function FoxHead({ x = 200, y = 300, size = 110, color = '#E63946' }: {
  x?: number; y?: number; size?: number; color?: string;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* Oreilles pointues */}
      <polygon points={`${-size * 0.85},${-size * 0.2} ${-size * 0.65},${-size * 1.15} ${-size * 0.25},${-size * 0.4}`} fill={color} />
      <polygon points={`${size * 0.85},${-size * 0.2} ${size * 0.65},${-size * 1.15} ${size * 0.25},${-size * 0.4}`} fill={color} />
      <polygon points={`${-size * 0.7},${-size * 0.3} ${-size * 0.58},${-size * 0.85} ${-size * 0.35},${-size * 0.45}`} fill="#F5F1E8" opacity={0.5} />
      <polygon points={`${size * 0.7},${-size * 0.3} ${size * 0.58},${-size * 0.85} ${size * 0.35},${-size * 0.45}`} fill="#F5F1E8" opacity={0.5} />
      {/* Tête triangulaire */}
      <path
        d={`M ${-size * 0.9} ${-size * 0.2} Q ${-size * 0.5} ${size * 0.2}, 0 ${size * 0.9} Q ${size * 0.5} ${size * 0.2}, ${size * 0.9} ${-size * 0.2} Q ${size * 0.6} ${-size * 0.5}, 0 ${-size * 0.5} Q ${-size * 0.6} ${-size * 0.5}, ${-size * 0.9} ${-size * 0.2} Z`}
        fill={color}
      />
      {/* Museau blanc */}
      <path
        d={`M 0 ${size * 0.9} Q ${-size * 0.22} ${size * 0.35}, 0 ${size * 0.1} Q ${size * 0.22} ${size * 0.35}, 0 ${size * 0.9} Z`}
        fill="#F5F1E8"
      />
      {/* Nez */}
      <ellipse cx={0} cy={size * 0.12} rx={size * 0.1} ry={size * 0.08} fill="#0A0A0A" />
      {/* Yeux en amande */}
      <ellipse cx={-size * 0.3} cy={-size * 0.15} rx={size * 0.08} ry={size * 0.13} fill="#0A0A0A" transform={`rotate(-20 ${-size * 0.3} ${-size * 0.15})`} />
      <ellipse cx={size * 0.3} cy={-size * 0.15} rx={size * 0.08} ry={size * 0.13} fill="#0A0A0A" transform={`rotate(20 ${size * 0.3} ${-size * 0.15})`} />
    </g>
  );
}

function LionHead({ x = 200, y = 280, size = 115, color = '#FFD43B' }: {
  x?: number; y?: number; size?: number; color?: string;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* Crinière éclatée — cercles en couronne */}
      {[...Array(12).keys()].map((i) => {
        const angle = (i / 12) * Math.PI * 2;
        const r = size * 1.25;
        const cx = Math.cos(angle) * r;
        const cy = Math.sin(angle) * r;
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={size * 0.32}
            fill={i % 2 === 0 ? color : '#D4A056'}
          />
        );
      })}
      {/* Tête */}
      <circle cx={0} cy={0} r={size} fill={color} />
      {/* Museau */}
      <ellipse cx={0} cy={size * 0.25} rx={size * 0.5} ry={size * 0.3} fill="#F5F1E8" opacity={0.9} />
      {/* Nez */}
      <path d={`M ${-size * 0.1} ${size * 0.12} L ${size * 0.1} ${size * 0.12} L 0 ${size * 0.25} Z`} fill="#0A0A0A" />
      {/* Yeux */}
      <circle cx={-size * 0.28} cy={-size * 0.15} r={size * 0.08} fill="#0A0A0A" />
      <circle cx={size * 0.28} cy={-size * 0.15} r={size * 0.08} fill="#0A0A0A" />
    </g>
  );
}

function Grain() {
  return (
    <>
      <defs>
        <filter id="grain-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" />
          <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.2 0" />
        </filter>
      </defs>
      <rect width="400" height="520" filter="url(#grain-filter)" opacity={0.12} />
    </>
  );
}

// ============================================================
// VARIANTS
// ============================================================

const variants: Record<PosterVariant, () => ReactNode> = {
  'poppy-neon': () => (
    <>
      <defs>
        <linearGradient id="neon-bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#1E40AF" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      <rect width="400" height="520" fill="url(#neon-bg)" />
      {/* Cercles lumineux aérosol */}
      <circle cx="80" cy="100" r="40" fill="#FFD43B" opacity={0.25} />
      <circle cx="340" cy="440" r="60" fill="#06B6D4" opacity={0.25} />
      <BearHead body="#1E40AF" />
      {/* Bubble tag */}
      <g transform="translate(200 430)">
        <rect x={-88} y={-22} width={176} height={44} rx={22} fill="#FFD43B" />
        <text x="0" y="6" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight={700} fontSize={22} fill="#0A0A0A" letterSpacing="0.05em">
          MR POPPY
        </text>
      </g>
      <text x="200" y="490" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize={10} fill="#F5F1E8" opacity={0.7}>
        NEON NIGHT — ÉDITION 100
      </text>
      <Grain />
    </>
  ),

  'poppy-classic': () => (
    <>
      <rect width="400" height="520" fill="#F5F1E8" />
      {/* Posca doodles */}
      <g stroke="#1E40AF" strokeWidth="2" fill="none" opacity={0.4}>
        <path d="M 30 60 Q 70 30, 120 60 T 200 50" />
        <circle cx="340" cy="90" r="12" />
        <path d="M 320 440 L 360 480" strokeWidth="3" />
        <path d="M 20 460 Q 60 440, 100 470" />
      </g>
      <BearHead body="#1E40AF" />
      <text x="200" y="440" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight={700} fontSize={36} fill="#0A0A0A" letterSpacing="-0.03em">
        MR POPPY
      </text>
      <text x="200" y="470" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight={400} fontSize={14} fill="#0A0A0A" opacity={0.6} letterSpacing="0.1em">
        ORIGINE — 2025
      </text>
      <Grain />
    </>
  ),

  'gorille-gold': () => (
    <>
      <rect width="400" height="520" fill="#0A0A0A" />
      {/* Pattern monogramme */}
      <g opacity={0.08} fill="#D4A056" fontFamily="Space Grotesk, sans-serif" fontWeight={700} fontSize={18}>
        {[...Array(14).keys()].map((i) =>
          [...Array(10).keys()].map((j) => (
            <text key={`${i}-${j}`} x={i * 32 + (j % 2) * 16} y={j * 52 + 30}>
              NC
            </text>
          ))
        )}
      </g>
      {/* Colisée arches simplifiées */}
      <g transform="translate(200 380)" stroke="#D4A056" strokeWidth="3" fill="none" opacity={0.35}>
        {[-2, -1, 0, 1, 2].map((i) => (
          <path key={i} d={`M ${i * 60 - 30} 0 Q ${i * 60} -40, ${i * 60 + 30} 0 L ${i * 60 + 30} 60 L ${i * 60 - 30} 60 Z`} />
        ))}
      </g>
      <GorillaHead color="#D4A056" />
      <g transform="translate(200 465)">
        <rect x={-105} y={-18} width={210} height={36} fill="#E63946" />
        <text x="0" y="6" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight={700} fontSize={20} fill="#F5F1E8" letterSpacing="0.1em">
          GORILLE DE ROME
        </text>
      </g>
      <Grain />
    </>
  ),

  'fox-paris': () => (
    <>
      <rect width="400" height="520" fill="#F5F1E8" />
      {/* Silhouettes buildings Paris */}
      <g fill="#1E40AF" opacity={0.25}>
        <rect x="20" y="150" width="40" height="130" />
        <polygon points="60,150 80,120 100,150" />
        <rect x="100" y="170" width="50" height="110" />
        <rect x="150" y="130" width="60" height="150" />
        <rect x="210" y="160" width="40" height="120" />
        <rect x="250" y="140" width="50" height="140" />
        <polygon points="300,140 320,100 340,140" />
        <rect x="340" y="160" width="40" height="120" />
      </g>
      {/* Pavés diamants */}
      <g fill="#0A0A0A" opacity={0.15}>
        {[...Array(20).keys()].map((i) =>
          [...Array(4).keys()].map((j) => (
            <rect
              key={`${i}-${j}`}
              x={i * 24 + (j % 2) * 12}
              y={400 + j * 20}
              width="10"
              height="10"
              transform={`rotate(45 ${i * 24 + (j % 2) * 12 + 5} ${400 + j * 20 + 5})`}
            />
          ))
        )}
      </g>
      <FoxHead />
      <text x="200" y="500" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight={700} fontSize={20} fill="#0A0A0A" letterSpacing="0.1em">
        RENARD DE PARIS
      </text>
      <Grain />
    </>
  ),

  'lion-eiffel': () => (
    <>
      <rect width="400" height="520" fill="#FFD43B" />
      {/* Eiffel silhouette */}
      <g transform="translate(200 380)" stroke="#0A0A0A" strokeWidth="2" fill="none" opacity={0.35}>
        <path d="M -60 100 L -20 -150 L 20 -150 L 60 100 Z" />
        <line x1="-40" y1="0" x2="40" y2="0" />
        <line x1="-30" y1="-50" x2="30" y2="-50" />
      </g>
      <LionHead color="#D4A056" />
      <g transform="translate(200 470)">
        <rect x={-100} y={-22} width={200} height={44} rx={22} fill="#E63946" />
        <text x="0" y="7" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight={700} fontSize={22} fill="#F5F1E8" letterSpacing="0.08em">
          LION D'EIFFEL
        </text>
      </g>
      <Grain />
    </>
  ),

  'poster-abstract-1': () => (
    <>
      <rect width="400" height="520" fill="#F5F1E8" />
      {/* Splatter */}
      <g fill="#E63946">
        <circle cx="60" cy="100" r="8" />
        <circle cx="90" cy="90" r="3" />
        <circle cx="340" cy="130" r="5" />
        <circle cx="330" cy="160" r="2" />
        <circle cx="70" cy="430" r="12" />
      </g>
      <text x="200" y="240" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight={700} fontSize={170} fill="#E63946" letterSpacing="-0.05em">
        BRUT
      </text>
      <line x1="50" y1="280" x2="350" y2="280" stroke="#0A0A0A" strokeWidth="4" />
      <text x="200" y="330" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize={14} fill="#0A0A0A" letterSpacing="0.3em">
        POSTER OPEN EDITION
      </text>
      <text x="200" y="360" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize={12} fill="#0A0A0A" opacity={0.6} letterSpacing="0.2em">
        NACKS · MMXXVI
      </text>
      {/* Bombe aérosol */}
      <g transform="translate(200 430)">
        <rect x={-30} y={0} width={60} height={50} fill="#0A0A0A" />
        <rect x={-20} y={-15} width={40} height={15} fill="#0A0A0A" />
        <circle cx={0} cy={-20} r={6} fill="#E63946" />
      </g>
      <Grain />
    </>
  ),

  'poster-abstract-2': () => (
    <>
      <rect width="400" height="520" fill="#0A0A0A" />
      {/* Splatter jaune */}
      <g fill="#FFD43B" opacity={0.7}>
        <circle cx="80" cy="80" r="18" />
        <circle cx="130" cy="60" r="4" />
        <circle cx="340" cy="450" r="16" />
        <circle cx="300" cy="480" r="4" />
      </g>
      {/* Bubble letters SARCELLES */}
      <text x="200" y="220" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight={700} fontSize={64} fill="#FFD43B" letterSpacing="-0.03em" stroke="#E63946" strokeWidth="2">
        SARCELLES
      </text>
      <text x="200" y="310" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight={700} fontSize={160} fill="#FFD43B" letterSpacing="-0.05em" stroke="#E63946" strokeWidth="3">
        95
      </text>
      <text x="200" y="410" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize={12} fill="#F5F1E8" letterSpacing="0.3em">
        VAL D&apos;OISE · NACKS
      </text>
      <text x="200" y="445" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize={10} fill="#F5F1E8" opacity={0.5} letterSpacing="0.2em">
        OPEN EDITION · 2026
      </text>
      <Grain />
    </>
  ),

  'figurine-mr-poppy': () => (
    <>
      <defs>
        <radialGradient id="fig-bg" cx="0.5" cy="0.4" r="0.7">
          <stop offset="0" stopColor="#1E40AF" stopOpacity={0.3} />
          <stop offset="1" stopColor="#0A0A0A" />
        </radialGradient>
        <radialGradient id="fig-shadow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#000" stopOpacity={0.5} />
          <stop offset="1" stopColor="#000" stopOpacity={0} />
        </radialGradient>
      </defs>
      <rect width="400" height="520" fill="url(#fig-bg)" />
      {/* Plateau rotatif */}
      <ellipse cx="200" cy="450" rx="130" ry="18" fill="#F5F1E8" opacity={0.15} />
      <ellipse cx="200" cy="455" rx="110" ry="12" fill="url(#fig-shadow)" />
      <BearHead x={200} y={260} size={100} body="#1E40AF" />
      {/* Corps figurine (petit rectangle arrondi sous la tête) */}
      <rect x="140" y="340" width="120" height="100" rx="16" fill="#1E40AF" />
      <rect x="140" y="345" width="120" height="12" fill="#F5F1E8" />
      <rect x="140" y="365" width="120" height="10" fill="#F5F1E8" />
      <rect x="140" y="382" width="120" height="8" fill="#F5F1E8" />
      <text x="200" y="495" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize={10} fill="#F5F1E8" opacity={0.7} letterSpacing="0.25em">
        FIGURINE · ÉDITION 300
      </text>
      <Grain />
    </>
  ),
};
