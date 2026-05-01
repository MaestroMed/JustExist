'use client';

import Link from 'next/link';
import { useState, useRef, type CSSProperties, type ReactNode, type MouseEvent } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';

/**
 * DripButton — CTA premium NACKS Galerie
 *
 * Glassmorphism (backdrop-filter blur+saturate), lift + glow fluo au hover,
 * drips SVG qui s'allongent, ripple paint splash au click, scale feedback active.
 * prefers-reduced-motion respecté (dégrade en transitions colors-only).
 *
 * 3 variants : primary (dark glass + drips), secondary (light glass outline),
 * ghost (no bg).
 *
 * Usage :
 *   <DripButton href="/oeuvres" variant="primary" glow="pink">
 *     Voir les œuvres
 *   </DripButton>
 */

type Variant = 'primary' | 'secondary' | 'ghost';
type Glow = 'pink' | 'yellow' | 'blue' | 'green' | 'cream' | 'none';
type Size = 'sm' | 'md' | 'lg';

type CommonProps = {
  variant?: Variant;
  glow?: Glow;
  size?: Size;
  drips?: boolean;
  arrow?: boolean;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
};

type LinkProps = CommonProps & {
  href: string;
  onClick?: never;
  type?: never;
  disabled?: never;
};

type ButtonProps = CommonProps & {
  href?: never;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

type Props = LinkProps | ButtonProps;

const GLOW_COLORS: Record<Exclude<Glow, 'none'>, string> = {
  pink: 'rgba(255, 31, 143, 0.45)',
  yellow: 'rgba(250, 225, 0, 0.5)',
  blue: 'rgba(0, 68, 255, 0.45)',
  green: 'rgba(29, 220, 111, 0.5)',
  cream: 'rgba(245, 241, 232, 0.55)',
};

const SIZE_PADDINGS: Record<Size, string> = {
  sm: 'clamp(0.6rem, 1vh, 0.8rem) clamp(1rem, 2vw, 1.4rem)',
  md: 'clamp(0.85rem, 1.6vh, 1.15rem) clamp(1.6rem, 2.6vw, 2.2rem)',
  lg: 'clamp(1.05rem, 2vh, 1.4rem) clamp(2rem, 3.2vw, 2.8rem)',
};

const SIZE_FONTS: Record<Size, string> = {
  sm: 'clamp(0.85rem, 0.95vw, 1rem)',
  md: 'clamp(0.95rem, 1.05vw, 1.15rem)',
  lg: 'clamp(1.05rem, 1.2vw, 1.3rem)',
};

const FONT_SERIF = "var(--font-serif, 'Playfair Display', Georgia, serif)";

export function DripButton(props: Props) {
  const {
    variant = 'primary',
    glow = 'none',
    size = 'md',
    drips: showDrips = variant === 'primary',
    arrow = true,
    fullWidth = false,
    className,
    children,
  } = props;

  const prefersReduced = useReducedMotion();
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const rippleId = useRef(0);

  const triggerRipple = (e: MouseEvent<HTMLElement>) => {
    if (prefersReduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = ++rippleId.current;
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 800);
  };

  /* ─────────── Variant base styles ─────────── */
  const baseColor = variant === 'primary' ? '#fafafa' : '#0a0a0a';
  const dripColor = variant === 'primary' ? '#0a0a0a' : '#0a0a0a';

  const variantStyle: CSSProperties = {
    primary: {
      background: hover
        ? 'rgba(10, 10, 10, 0.74)'
        : 'rgba(10, 10, 10, 0.86)',
      backdropFilter: 'blur(16px) saturate(140%)',
      WebkitBackdropFilter: 'blur(16px) saturate(140%)',
      color: '#fafafa',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      boxShadow: hover
        ? glow !== 'none'
          ? `0 14px 36px -10px ${GLOW_COLORS[glow]}, 0 6px 14px -4px rgba(0,0,0,0.45)`
          : '0 14px 36px -10px rgba(0,0,0,0.55), 0 6px 14px -4px rgba(0,0,0,0.35)'
        : '0 8px 24px -12px rgba(0,0,0,0.5), 0 2px 6px -2px rgba(0,0,0,0.25)',
    },
    secondary: {
      background: hover
        ? 'rgba(10, 10, 10, 0.92)'
        : 'rgba(255, 255, 255, 0.68)',
      backdropFilter: 'blur(14px) saturate(140%)',
      WebkitBackdropFilter: 'blur(14px) saturate(140%)',
      color: hover ? '#fafafa' : '#0a0a0a',
      border: '1.5px solid rgba(10, 10, 10, 0.85)',
      boxShadow: hover
        ? '0 12px 30px -10px rgba(0,0,0,0.4), 0 4px 12px -4px rgba(0,0,0,0.2)'
        : '0 4px 14px -8px rgba(0,0,0,0.18)',
    },
    ghost: {
      background: hover ? 'rgba(10, 10, 10, 0.06)' : 'transparent',
      color: '#0a0a0a',
      border: 'none',
      boxShadow: 'none',
    },
  }[variant] as CSSProperties;

  /* ─────────── Lift transform (with reduced-motion fallback) ─────────── */
  const transform = prefersReduced
    ? undefined
    : pressed
      ? 'translateY(0px) scale(0.97)'
      : hover
        ? 'translateY(-2px)'
        : 'translateY(0)';

  /* ─────────── Common rendered content ─────────── */
  const Inner = (
    <>
      {/* Background sparkle hint top-right (only primary, only hover) */}
      <AnimatePresence>
        {hover && variant === 'primary' && glow !== 'none' && !prefersReduced && (
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
            aria-hidden
            style={{
              position: 'absolute',
              top: 6,
              right: 8,
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: GLOW_COLORS[glow as Exclude<Glow, 'none'>] ?? 'rgba(255,255,255,0.5)',
              filter: 'blur(0.4px)',
              boxShadow: `0 0 8px ${GLOW_COLORS[glow as Exclude<Glow, 'none'>] ?? 'rgba(255,255,255,0.6)'}`,
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {/* Click ripples */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          borderRadius: 'inherit',
          pointerEvents: 'none',
        }}
      >
        <AnimatePresence>
          {ripples.map((r) => (
            <motion.span
              key={r.id}
              initial={{ scale: 0, opacity: 0.55 }}
              animate={{ scale: 18, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                left: r.x - 12,
                top: r.y - 12,
                width: 24,
                height: 24,
                borderRadius: '50%',
                background:
                  variant === 'primary'
                    ? 'rgba(255, 255, 255, 0.32)'
                    : 'rgba(10, 10, 10, 0.18)',
                pointerEvents: 'none',
              }}
            />
          ))}
        </AnimatePresence>
      </span>

      {/* Label + arrow */}
      <span
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5em',
          fontFamily: FONT_SERIF,
          fontStyle: 'italic',
          fontSize: SIZE_FONTS[size],
          letterSpacing: '0.005em',
          lineHeight: 1,
        }}
      >
        {children}
        {arrow && (
          <motion.span
            aria-hidden
            initial={false}
            animate={{
              x: prefersReduced ? 0 : hover ? 4 : 0,
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'inline-block', transform: 'translateZ(0)' }}
          >
            →
          </motion.span>
        )}
      </span>

      {/* Drips SVG (primary only by default) */}
      {showDrips && (
        <svg
          aria-hidden
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '88%',
            height: '36px',
            overflow: 'visible',
            pointerEvents: 'none',
          }}
          viewBox="0 0 200 40"
          preserveAspectRatio="none"
        >
          {[24, 56, 88, 124, 160, 184].map((cx, i) => {
            const baseLen = 12 + ((i * 5) % 16);
            return (
              <motion.g
                key={i}
                initial={false}
                animate={{
                  scaleY: prefersReduced ? 1 : hover ? 1.45 : 1,
                  opacity: hover ? 1 : 0.92,
                }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                  delay: prefersReduced ? 0 : i * 0.025,
                }}
                style={{ transformOrigin: `${cx}px 0px` }}
              >
                <path
                  d={`M${cx - 1.4},0 C${cx - 1.6},${baseLen * 0.4} ${cx - 1.8},${baseLen * 0.7} ${cx - 1},${baseLen * 0.9} Q${cx},${baseLen} ${cx + 1},${baseLen * 0.9} C${cx + 1.8},${baseLen * 0.7} ${cx + 1.6},${baseLen * 0.4} ${cx + 1.4},0 Z`}
                  fill={dripColor}
                />
                <circle cx={cx} cy={baseLen} r="1.7" fill={dripColor} />
              </motion.g>
            );
          })}
        </svg>
      )}
    </>
  );

  /* ─────────── Common DOM props ─────────── */
  const sharedDOMProps = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPressed(false);
    },
    onFocus: () => setHover(true),
    onBlur: () => {
      setHover(false);
      setPressed(false);
    },
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
    onTouchStart: () => setPressed(true),
    onTouchEnd: () => setPressed(false),
    style: {
      position: 'relative' as const,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: SIZE_PADDINGS[size],
      borderRadius: '999px',
      cursor: 'pointer',
      userSelect: 'none' as const,
      whiteSpace: 'nowrap' as const,
      width: fullWidth ? '100%' : 'auto',
      transform,
      transition: prefersReduced
        ? 'background 240ms ease, color 240ms ease, box-shadow 240ms ease, border-color 240ms ease'
        : 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1), background 320ms ease, color 320ms ease, box-shadow 360ms cubic-bezier(0.22, 1, 0.36, 1), border-color 320ms ease',
      ...variantStyle,
    } satisfies CSSProperties,
    className,
    'data-cursor': 'link' as const,
  };

  if ('href' in props && props.href) {
    return (
      <Link
        href={props.href}
        {...sharedDOMProps}
        onClick={triggerRipple}
      >
        {Inner}
      </Link>
    );
  }

  return (
    <button
      type={(props as ButtonProps).type ?? 'button'}
      disabled={(props as ButtonProps).disabled}
      onClick={(e) => {
        triggerRipple(e);
        (props as ButtonProps).onClick?.();
      }}
      {...sharedDOMProps}
      style={{
        ...sharedDOMProps.style,
        opacity: (props as ButtonProps).disabled ? 0.5 : 1,
        cursor: (props as ButtonProps).disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {Inner}
    </button>
  );
}
