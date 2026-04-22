/**
 * Posters procéduraux v2 — compositions SVG signatures Nacks, denses.
 * Halftone dots + noise + paper grain + typo intégrée + paint drips.
 * Restent un placeholder jusqu'aux vraies photos, mais chaque variant
 * a maintenant assez de matière pour vendre l'âme.
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
        <PosterDefs />
        {variants[variant]()}
        <PaperGrainOverlay />
        <CornerSignature />
      </svg>
    </div>
  );
}

// ============================================================
// SHARED DEFS — patterns, filters, gradients réutilisables
// ============================================================

function PosterDefs() {
  return (
    <defs>
      {/* Noise pour grain papier */}
      <filter id="p-grain" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.25 0" />
      </filter>

      {/* Noise saturé — pour textures couleur */}
      <filter id="p-noise-saturated" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="1" />
        <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.4 0" />
      </filter>

      {/* Halftone dot patterns */}
      <pattern id="p-halftone-sm" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
        <circle cx="5" cy="5" r="1.8" fill="#0A0A0A" fillOpacity="0.5" />
      </pattern>
      <pattern id="p-halftone-cream" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
        <circle cx="7" cy="7" r="2.2" fill="#F5F1E8" fillOpacity="0.35" />
      </pattern>
      <pattern id="p-halftone-blood" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
        <circle cx="6" cy="6" r="2" fill="#E63946" fillOpacity="0.5" />
      </pattern>

      {/* Pavés pattern */}
      <pattern id="p-pave" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect x="2" y="2" width="20" height="20" fill="none" stroke="#0A0A0A" strokeWidth="1" strokeOpacity="0.2" />
      </pattern>

      {/* LV-style monogram pattern */}
      <pattern id="p-monogram" x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
        <text x="8" y="22" fontFamily="Space Grotesk, sans-serif" fontWeight={700} fontSize={18} fill="#D4A056" fillOpacity="0.18">NC</text>
        <circle cx="42" cy="14" r="2.5" fill="#D4A056" fillOpacity="0.25" />
        <text x="28" y="50" fontFamily="Space Grotesk, sans-serif" fontWeight={700} fontSize={14} fill="#D4A056" fillOpacity="0.12">★</text>
      </pattern>

      {/* Gradients neon */}
      <linearGradient id="g-neon" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="#1E40AF" />
        <stop offset="0.55" stopColor="#7C3AED" />
        <stop offset="1" stopColor="#EC4899" />
      </linearGradient>
      <radialGradient id="g-spotlight" cx="50%" cy="35%" r="60%">
        <stop offset="0" stopColor="#FFD43B" stopOpacity="0.5" />
        <stop offset="1" stopColor="#FFD43B" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="g-stage" cx="50%" cy="100%" r="70%">
        <stop offset="0" stopColor="#1E40AF" stopOpacity="0.4" />
        <stop offset="1" stopColor="#0A0A0A" stopOpacity="0" />
      </radialGradient>

      {/* Torn-paper edge (clip-path zigzag bottom) */}
      <clipPath id="p-torn-bottom">
        <polygon points="0,0 400,0 400,490 380,510 360,495 340,510 320,490 300,505 280,492 260,508 240,495 220,510 200,492 180,505 160,495 140,510 120,492 100,508 80,495 60,510 40,495 20,508 0,492" />
      </clipPath>
    </defs>
  );
}

function PaperGrainOverlay() {
  return (
    <rect width="400" height="520" filter="url(#p-grain)" opacity={0.12} />
  );
}

function CornerSignature() {
  return (
    <g transform="translate(364 498)">
      <circle cx={0} cy={0} r={12} fill="#E63946" />
      <text
        x="0"
        y="4"
        textAnchor="middle"
        fontFamily="Space Grotesk, sans-serif"
        fontWeight={700}
        fontSize={12}
        fill="#F5F1E8"
        letterSpacing="-0.02em"
      >
        N
      </text>
    </g>
  );
}

function PaintDrip({ x, y, color, height = 60, width = 8 }: {
  x: number; y: number; color: string; height?: number; width?: number;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-width / 2} y={0} width={width} height={height} fill={color} />
      <ellipse cx={0} cy={height} rx={width * 0.8} ry={width * 1.2} fill={color} />
    </g>
  );
}

function Stamp({ x, y, text, color = '#E63946', rotation = -8, size = 1 }: {
  x: number; y: number; text: string; color?: string; rotation?: number; size?: number;
}) {
  const baseW = 110 * size;
  const baseH = 32 * size;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotation})`} opacity={0.85}>
      <rect x={-baseW / 2} y={-baseH / 2} width={baseW} height={baseH} rx={2} fill="none" stroke={color} strokeWidth={2} />
      <rect x={-baseW / 2 + 4} y={-baseH / 2 + 4} width={baseW - 8} height={baseH - 8} rx={1} fill="none" stroke={color} strokeWidth={1} />
      <text
        x="0"
        y={2 * size}
        textAnchor="middle"
        fontFamily="Space Grotesk, sans-serif"
        fontWeight={700}
        fontSize={12 * size}
        fill={color}
        letterSpacing="0.15em"
      >
        {text}
      </text>
    </g>
  );
}

// ============================================================
// PRIMITIVES PERSONNAGES (inchangés mais légèrement enrichis)
// ============================================================

function BearHead({ x = 200, y = 260, size = 130, body = '#1E40AF' }: {
  x?: number; y?: number; size?: number; body?: string;
}) {
  const ear = size * 0.42;
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx={-size * 0.58} cy={-size * 0.7} r={ear} fill={body} />
      <circle cx={size * 0.58} cy={-size * 0.7} r={ear} fill={body} />
      <circle cx={-size * 0.58} cy={-size * 0.7} r={ear * 0.5} fill="#F5F1E8" opacity={0.6} />
      <circle cx={size * 0.58} cy={-size * 0.7} r={ear * 0.5} fill="#F5F1E8" opacity={0.6} />
      <circle cx={0} cy={0} r={size} fill={body} />
      {/* Highlight sur tête */}
      <ellipse cx={-size * 0.32} cy={-size * 0.42} rx={size * 0.22} ry={size * 0.14} fill="#F5F1E8" opacity={0.15} />
      <ellipse cx={0} cy={size * 0.3} rx={size * 0.45} ry={size * 0.3} fill="#F5F1E8" />
      <ellipse cx={0} cy={size * 0.15} rx={size * 0.12} ry={size * 0.08} fill="#0A0A0A" />
      <g stroke="#E63946" strokeWidth={size * 0.08} strokeLinecap="round">
        <line x1={-size * 0.45} y1={-size * 0.3} x2={-size * 0.2} y2={-size * 0.05} />
        <line x1={-size * 0.2} y1={-size * 0.3} x2={-size * 0.45} y2={-size * 0.05} />
        <line x1={size * 0.2} y1={-size * 0.3} x2={size * 0.45} y2={-size * 0.05} />
        <line x1={size * 0.45} y1={-size * 0.3} x2={size * 0.2} y2={-size * 0.05} />
      </g>
      <g>
        <rect x={-size * 1.2} y={size * 0.95} width={size * 2.4} height={size * 0.1} fill="#F5F1E8" />
        <rect x={-size * 1.2} y={size * 1.08} width={size * 2.4} height={size * 0.08} fill="#F5F1E8" />
        <rect x={-size * 1.2} y={size * 1.2} width={size * 2.4} height={size * 0.07} fill="#F5F1E8" />
      </g>
    </g>
  );
}

function GorillaHead({ x = 200, y = 280, size = 120, color = '#D4A056' }: {
  x?: number; y?: number; size?: number; color?: string;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d={`M ${-size} 0 Q ${-size} ${-size * 1.1}, 0 ${-size * 1.2} Q ${size} ${-size * 1.1}, ${size} 0 Q ${size} ${size * 0.3}, ${size * 0.6} ${size * 0.5} L ${-size * 0.6} ${size * 0.5} Q ${-size} ${size * 0.3}, ${-size} 0 Z`}
        fill={color}
      />
      <ellipse cx={0} cy={-size * 0.3} rx={size * 0.7} ry={size * 0.35} fill="#F5F1E8" opacity={0.18} />
      <circle cx={-size * 0.32} cy={-size * 0.18} r={size * 0.09} fill="#0A0A0A" />
      <circle cx={size * 0.32} cy={-size * 0.18} r={size * 0.09} fill="#0A0A0A" />
      <ellipse cx={0} cy={size * 0.18} rx={size * 0.55} ry={size * 0.3} fill="#0A0A0A" opacity={0.85} />
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
      <polygon points={`${-size * 0.85},${-size * 0.2} ${-size * 0.65},${-size * 1.15} ${-size * 0.25},${-size * 0.4}`} fill={color} />
      <polygon points={`${size * 0.85},${-size * 0.2} ${size * 0.65},${-size * 1.15} ${size * 0.25},${-size * 0.4}`} fill={color} />
      <polygon points={`${-size * 0.7},${-size * 0.3} ${-size * 0.58},${-size * 0.85} ${-size * 0.35},${-size * 0.45}`} fill="#F5F1E8" opacity={0.5} />
      <polygon points={`${size * 0.7},${-size * 0.3} ${size * 0.58},${-size * 0.85} ${size * 0.35},${-size * 0.45}`} fill="#F5F1E8" opacity={0.5} />
      <path
        d={`M ${-size * 0.9} ${-size * 0.2} Q ${-size * 0.5} ${size * 0.2}, 0 ${size * 0.9} Q ${size * 0.5} ${size * 0.2}, ${size * 0.9} ${-size * 0.2} Q ${size * 0.6} ${-size * 0.5}, 0 ${-size * 0.5} Q ${-size * 0.6} ${-size * 0.5}, ${-size * 0.9} ${-size * 0.2} Z`}
        fill={color}
      />
      <path
        d={`M 0 ${size * 0.9} Q ${-size * 0.22} ${size * 0.35}, 0 ${size * 0.1} Q ${size * 0.22} ${size * 0.35}, 0 ${size * 0.9} Z`}
        fill="#F5F1E8"
      />
      <ellipse cx={0} cy={size * 0.12} rx={size * 0.1} ry={size * 0.08} fill="#0A0A0A" />
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
      {[...Array(12).keys()].map((i) => {
        const angle = (i / 12) * Math.PI * 2;
        const r = size * 1.25;
        const cx = Math.cos(angle) * r;
        const cy = Math.sin(angle) * r;
        return (
          <circle key={i} cx={cx} cy={cy} r={size * 0.32} fill={i % 2 === 0 ? color : '#D4A056'} />
        );
      })}
      <circle cx={0} cy={0} r={size} fill={color} />
      {/* Highlight doré */}
      <ellipse cx={-size * 0.3} cy={-size * 0.38} rx={size * 0.2} ry={size * 0.1} fill="#F5F1E8" opacity={0.2} />
      <ellipse cx={0} cy={size * 0.25} rx={size * 0.5} ry={size * 0.3} fill="#F5F1E8" opacity={0.9} />
      <path d={`M ${-size * 0.1} ${size * 0.12} L ${size * 0.1} ${size * 0.12} L 0 ${size * 0.25} Z`} fill="#0A0A0A" />
      <circle cx={-size * 0.28} cy={-size * 0.15} r={size * 0.08} fill="#0A0A0A" />
      <circle cx={size * 0.28} cy={-size * 0.15} r={size * 0.08} fill="#0A0A0A" />
    </g>
  );
}

function SplatterBurst({ x, y, color, size = 1 }: { x: number; y: number; color: string; size?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx="0" cy="0" r={14 * size} fill={color} />
      <circle cx={18 * size} cy={-4 * size} r={3 * size} fill={color} />
      <circle cx={22 * size} cy={8 * size} r={2 * size} fill={color} />
      <circle cx={-14 * size} cy={10 * size} r={2.5 * size} fill={color} />
      <circle cx={-20 * size} cy={-8 * size} r={1.5 * size} fill={color} />
      <circle cx={10 * size} cy={-18 * size} r={3 * size} fill={color} />
      <circle cx={-6 * size} cy={-22 * size} r={2 * size} fill={color} />
      <ellipse cx={28 * size} cy={16 * size} rx={4 * size} ry={1.5 * size} fill={color} transform={`rotate(30 ${28 * size} ${16 * size})`} />
    </g>
  );
}

// ============================================================
// VARIANTS — compositions denses
// ============================================================

const variants: Record<PosterVariant, () => ReactNode> = {
  'poppy-neon': () => (
    <>
      <rect width="400" height="520" fill="url(#g-neon)" />
      {/* Halftone cream sur moitié haute */}
      <rect width="400" height="300" fill="url(#p-halftone-cream)" opacity={0.7} />
      {/* Cercles lumineux aérosol */}
      <circle cx="80" cy="100" r="50" fill="#FFD43B" opacity={0.3} />
      <circle cx="340" cy="440" r="70" fill="#06B6D4" opacity={0.3} />
      <SplatterBurst x={60} y={420} color="#FFD43B" size={0.6} />
      <SplatterBurst x={350} y={80} color="#EC4899" size={0.5} />
      {/* Brush stroke signature en arrière */}
      <path d="M 40 260 Q 200 200, 360 280" stroke="#F5F1E8" strokeWidth="3" fill="none" opacity={0.25} strokeLinecap="round" />
      <BearHead body="#1E40AF" />
      {/* Monogramme NC au dessus */}
      <text x="36" y="48" fontFamily="Space Grotesk, sans-serif" fontWeight={700} fontSize={16} fill="#F5F1E8" opacity={0.5} letterSpacing="0.2em">NC</text>
      <text x="364" y="48" fontFamily="JetBrains Mono, monospace" fontSize={10} fill="#F5F1E8" opacity={0.7} textAnchor="end">MMXXVI</text>
      {/* Bubble tag */}
      <g transform="translate(200 440)">
        <rect x={-94} y={-24} width={188} height={48} rx={24} fill="#FFD43B" />
        <rect x={-92} y={-22} width={184} height={44} rx={22} fill="none" stroke="#0A0A0A" strokeWidth={1.5} />
        <text x="0" y="6" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight={700} fontSize={22} fill="#0A0A0A" letterSpacing="0.05em">
          MR POPPY
        </text>
      </g>
      <text x="200" y="478" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize={9} fill="#F5F1E8" opacity={0.75} letterSpacing="0.25em">
        NEON NIGHT
      </text>
      <Stamp x={330} y={120} text="DROP" color="#FFD43B" size={0.85} rotation={-14} />
      <PaintDrip x={88} y={100} color="#FFD43B" height={30} width={5} />
    </>
  ),

  'poppy-classic': () => (
    <>
      <rect width="400" height="520" fill="#F5F1E8" />
      {/* Halftone subtil */}
      <rect width="400" height="520" fill="url(#p-halftone-sm)" opacity={0.25} />
      {/* Grand carré neutre derrière ours */}
      <rect x="60" y="100" width="280" height="280" fill="#FFFFFF" opacity={0.4} />
      <rect x="60" y="100" width="280" height="280" fill="none" stroke="#0A0A0A" strokeWidth={1} opacity={0.15} />
      {/* Posca doodles */}
      <g stroke="#1E40AF" strokeWidth="2" fill="none" opacity={0.45}>
        <path d="M 30 60 Q 70 30, 120 60 T 200 50" />
        <circle cx="340" cy="90" r="14" />
        <path d="M 320 440 L 360 480" strokeWidth="3" />
        <path d="M 20 460 Q 60 440, 100 470" />
        <path d="M 365 260 L 385 260" strokeWidth={3} />
        <path d="M 375 250 L 375 270" strokeWidth={3} />
      </g>
      <BearHead body="#1E40AF" />
      {/* Titre + édition */}
      <text x="200" y="424" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight={700} fontSize={36} fill="#0A0A0A" letterSpacing="-0.03em">
        MR POPPY
      </text>
      <text x="200" y="448" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight={400} fontSize={12} fill="#0A0A0A" opacity={0.65} letterSpacing="0.25em">
        ORIGINE · 2025
      </text>
      {/* Ligne signée */}
      <line x1="120" y1="470" x2="280" y2="470" stroke="#0A0A0A" strokeWidth={1} />
      <text x="200" y="490" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize={10} fill="#0A0A0A" opacity={0.6} letterSpacing="0.15em">
        N° ___ / 150 · SIGNÉ POSCA
      </text>
      <Stamp x={50} y={50} text="ORIGINAL" color="#E63946" size={0.65} rotation={-12} />
      <PaintDrip x={340} y={100} color="#1E40AF" height={36} width={4} />
    </>
  ),

  'gorille-gold': () => (
    <>
      <rect width="400" height="520" fill="#0A0A0A" />
      {/* Pattern monogramme */}
      <rect width="400" height="520" fill="url(#p-monogram)" />
      {/* Halftone accent */}
      <rect width="400" height="260" fill="url(#p-halftone-cream)" opacity={0.25} />
      {/* Colisée arches */}
      <g transform="translate(200 360)" stroke="#D4A056" strokeWidth="3" fill="none" opacity={0.4}>
        {[-2, -1, 0, 1, 2].map((i) => (
          <path key={i} d={`M ${i * 60 - 30} 0 Q ${i * 60} -40, ${i * 60 + 30} 0 L ${i * 60 + 30} 80 L ${i * 60 - 30} 80 Z`} />
        ))}
      </g>
      <SplatterBurst x={50} y={80} color="#D4A056" size={0.5} />
      <SplatterBurst x={360} y={440} color="#E63946" size={0.45} />
      <GorillaHead color="#D4A056" />
      {/* Title with inline stamp */}
      <g transform="translate(200 460)">
        <rect x={-110} y={-20} width={220} height={40} fill="#E63946" />
        <rect x={-108} y={-18} width={216} height={36} fill="none" stroke="#F5F1E8" strokeWidth={1} opacity={0.4} />
        <text x="0" y="6" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight={700} fontSize={20} fill="#F5F1E8" letterSpacing="0.08em">
          GORILLE DE ROME
        </text>
      </g>
      <text x="200" y="495" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize={9} fill="#D4A056" opacity={0.7} letterSpacing="0.3em">
        NACKS · 2025 · PIÈCE UNIQUE
      </text>
      <Stamp x={60} y={40} text="NC · 2025" color="#D4A056" size={0.55} rotation={-6} />
      <PaintDrip x={360} y={40} color="#D4A056" height={22} width={3} />
    </>
  ),

  'fox-paris': () => (
    <>
      <rect width="400" height="520" fill="#F5F1E8" />
      {/* Paris silhouette */}
      <g fill="#1E40AF" opacity={0.3}>
        <rect x="20" y="150" width="40" height="130" />
        <polygon points="60,150 80,120 100,150" />
        <rect x="100" y="170" width="50" height="110" />
        <rect x="150" y="130" width="60" height="150" />
        <rect x="210" y="160" width="40" height="120" />
        <rect x="250" y="140" width="50" height="140" />
        <polygon points="300,140 320,100 340,140" />
        <rect x="340" y="160" width="40" height="120" />
      </g>
      {/* Ciel halftone */}
      <rect width="400" height="120" fill="url(#p-halftone-blood)" opacity={0.12} />
      {/* Pavés */}
      <rect x="0" y="380" width="400" height="140" fill="url(#p-pave)" opacity={0.35} />
      <SplatterBurst x={50} y={440} color="#E63946" size={0.55} />
      <FoxHead />
      {/* Tag location */}
      <g transform="translate(200 470)">
        <rect x={-110} y={-18} width={220} height={36} fill="#0A0A0A" />
        <text x="0" y="6" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight={700} fontSize={18} fill="#F5F1E8" letterSpacing="0.1em">
          RENARD DE PARIS
        </text>
      </g>
      <text x="200" y="500" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize={9} fill="#0A0A0A" opacity={0.6} letterSpacing="0.3em">
        PANACHE · RUE DE RIVOLI · 2025
      </text>
      {/* Monogramme corner */}
      <text x="36" y="48" fontFamily="Space Grotesk, sans-serif" fontWeight={700} fontSize={16} fill="#0A0A0A" opacity={0.4} letterSpacing="0.25em">NC</text>
      <Stamp x={340} y={60} text="SPRINT" color="#E63946" size={0.5} rotation={12} />
    </>
  ),

  'lion-eiffel': () => (
    <>
      <rect width="400" height="520" fill="#FFD43B" />
      <rect width="400" height="520" fill="url(#p-halftone-blood)" opacity={0.15} />
      {/* Eiffel silhouette */}
      <g transform="translate(200 380)" stroke="#0A0A0A" strokeWidth="2" fill="none" opacity={0.4}>
        <path d="M -70 110 L -22 -170 L 22 -170 L 70 110 Z" />
        <line x1="-42" y1="0" x2="42" y2="0" strokeWidth={2} />
        <line x1="-30" y1="-60" x2="30" y2="-60" strokeWidth={2} />
        <line x1="-20" y1="-120" x2="20" y2="-120" strokeWidth={2} />
      </g>
      <SplatterBurst x={60} y={110} color="#E63946" size={0.5} />
      <SplatterBurst x={360} y={100} color="#D4A056" size={0.45} />
      <LionHead color="#D4A056" />
      {/* Bubble lettering */}
      <g transform="translate(200 480)">
        <rect x={-110} y={-24} width={220} height={48} rx={24} fill="#E63946" />
        <rect x={-108} y={-22} width={216} height={44} rx={22} fill="none" stroke="#FFD43B" strokeWidth={1.5} opacity={0.7} />
        <text x="0" y="7" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight={700} fontSize={22} fill="#F5F1E8" letterSpacing="0.08em">
          LION D'EIFFEL
        </text>
      </g>
      <Stamp x={55} y={50} text="PARIS" color="#0A0A0A" size={0.6} rotation={-10} />
      <PaintDrip x={335} y={55} color="#E63946" height={40} width={4} />
    </>
  ),

  'poster-abstract-1': () => (
    <>
      <rect width="400" height="520" fill="#F5F1E8" />
      <rect width="400" height="520" fill="url(#p-halftone-sm)" opacity={0.2} />
      {/* Big splatters */}
      <SplatterBurst x={70} y={100} color="#E63946" size={1.2} />
      <SplatterBurst x={330} y={130} color="#E63946" size={0.4} />
      <SplatterBurst x={60} y={430} color="#E63946" size={0.7} />
      <SplatterBurst x={360} y={460} color="#0A0A0A" size={0.35} />
      <text x="200" y="240" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight={700} fontSize={180} fill="#E63946" letterSpacing="-0.05em">
        BRUT
      </text>
      <line x1="50" y1="280" x2="350" y2="280" stroke="#0A0A0A" strokeWidth={4} />
      <text x="200" y="330" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize={14} fill="#0A0A0A" letterSpacing="0.3em">
        POSTER OPEN EDITION
      </text>
      <text x="200" y="360" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize={11} fill="#0A0A0A" opacity={0.6} letterSpacing="0.2em">
        NACKS · MMXXVI · TIRAGE ILLIMITÉ
      </text>
      {/* Bombe aérosol */}
      <g transform="translate(200 430)">
        <rect x={-32} y={0} width={64} height={55} fill="#0A0A0A" />
        <rect x={-22} y={-18} width={44} height={18} fill="#0A0A0A" />
        <rect x={-16} y={0} width={6} height={55} fill="#E63946" opacity={0.6} />
        <circle cx={0} cy={-26} r={7} fill="#E63946" />
        <text x="0" y="28" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontSize={9} fontWeight={700} fill="#F5F1E8" letterSpacing="0.1em">
          POSCA
        </text>
      </g>
      <Stamp x={52} y={50} text="EDITION OUVERTE" color="#E63946" size={0.55} rotation={-4} />
      <PaintDrip x={200} y={240} color="#E63946" height={20} width={3} />
    </>
  ),

  'poster-abstract-2': () => (
    <>
      <rect width="400" height="520" fill="#0A0A0A" />
      <rect width="400" height="520" fill="url(#p-halftone-cream)" opacity={0.18} />
      <SplatterBurst x={70} y={90} color="#FFD43B" size={0.9} />
      <SplatterBurst x={345} y={460} color="#FFD43B" size={0.7} />
      <SplatterBurst x={340} y={100} color="#E63946" size={0.5} />
      {/* Bubble letters SARCELLES */}
      <text x="200" y="220" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight={700} fontSize={62} fill="#FFD43B" letterSpacing="-0.03em" stroke="#E63946" strokeWidth={2}>
        SARCELLES
      </text>
      {/* 95 big */}
      <text x="200" y="350" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight={700} fontSize={190} fill="#FFD43B" letterSpacing="-0.05em" stroke="#E63946" strokeWidth={3}>
        95
      </text>
      <text x="200" y="410" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize={12} fill="#F5F1E8" letterSpacing="0.3em">
        VAL D&apos;OISE · NACKS
      </text>
      <text x="200" y="444" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize={10} fill="#F5F1E8" opacity={0.5} letterSpacing="0.25em">
        OPEN EDITION · 2026
      </text>
      <Stamp x={60} y={50} text="FIERTÉ 95" color="#FFD43B" size={0.6} rotation={-8} />
      <PaintDrip x={202} y={375} color="#E63946" height={30} width={5} />
    </>
  ),

  'figurine-mr-poppy': () => (
    <>
      <rect width="400" height="520" fill="#0A0A0A" />
      {/* Spotlight depuis au-dessus */}
      <rect width="400" height="520" fill="url(#g-spotlight)" />
      <rect width="400" height="520" fill="url(#g-stage)" />
      {/* Plateau rotatif */}
      <ellipse cx="200" cy="440" rx="140" ry="20" fill="#F5F1E8" opacity={0.08} />
      <ellipse cx="200" cy="446" rx="120" ry="14" fill="#F5F1E8" opacity={0.15} />
      <ellipse cx="200" cy="450" rx="100" ry="10" fill="#000" opacity={0.55} />
      {/* Poppy — plus petit pour avoir le corps */}
      <BearHead x={200} y={260} size={95} body="#1E40AF" />
      {/* Corps figurine */}
      <rect x="145" y="340" width="110" height="95" rx="18" fill="#1E40AF" />
      <rect x="145" y="344" width="110" height="13" fill="#F5F1E8" />
      <rect x="145" y="363" width="110" height="10" fill="#F5F1E8" />
      <rect x="145" y="379" width="110" height="8" fill="#F5F1E8" />
      {/* Halftone subtil sur background */}
      <rect width="400" height="520" fill="url(#p-halftone-cream)" opacity={0.06} />
      {/* Étiquette figurine */}
      <g transform="translate(200 478)">
        <rect x={-110} y={-14} width={220} height={28} fill="none" stroke="#F5F1E8" strokeWidth={1} opacity={0.4} />
        <text x="0" y="5" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize={11} fill="#F5F1E8" opacity={0.8} letterSpacing="0.25em">
          FIGURINE · ÉDITION 300
        </text>
      </g>
      <text x="200" y="508" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize={9} fill="#F5F1E8" opacity={0.5} letterSpacing="0.25em">
        RÉSINE · PEINT MAIN · 18 CM
      </text>
      <Stamp x={60} y={50} text="3D" color="#E63946" size={0.55} rotation={-10} />
    </>
  ),
};
