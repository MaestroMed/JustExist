import { forwardRef, type ElementType, type HTMLAttributes } from 'react';
import { cn } from '../lib/cn';

type Variant = 'display' | 'heading' | 'subheading' | 'body' | 'caption' | 'mono';
type Size = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl';

type Props = HTMLAttributes<HTMLElement> & {
  variant?: Variant;
  size?: Size;
  as?: ElementType;
  balance?: boolean;
  muted?: boolean;
};

const variantMap: Record<Variant, string> = {
  display: "font-[var(--font-display)] tracking-[-0.02em] font-[500] leading-[1.02]",
  heading: "font-[var(--font-display)] tracking-[-0.01em] font-[500] leading-[1.08]",
  subheading: "font-[var(--font-display)] font-[400] leading-[1.3]",
  body: "font-[var(--font-body)] font-[400] leading-[1.55]",
  caption: "font-[var(--font-body)] font-[400] leading-[1.4] tracking-wide uppercase",
  mono: "font-[var(--font-mono)] font-[400] tracking-[-0.01em]",
};

const sizeMap: Record<Size, string> = {
  xs: 'text-[var(--text-xs)]',
  sm: 'text-[var(--text-sm)]',
  base: 'text-[var(--text-base)]',
  lg: 'text-[var(--text-lg)]',
  xl: 'text-[var(--text-xl)]',
  '2xl': 'text-[var(--text-2xl)]',
  '3xl': 'text-[var(--text-3xl)]',
  '4xl': 'text-[var(--text-4xl)]',
  '5xl': 'text-[var(--text-5xl)]',
  '6xl': 'text-[var(--text-6xl)]',
  '7xl': 'text-[var(--text-7xl)]',
  '8xl': 'text-[var(--text-8xl)]',
};

export const Typography = forwardRef<HTMLElement, Props>(function Typography(
  {
    variant = 'body',
    size = 'base',
    as,
    balance = false,
    muted = false,
    className,
    children,
    ...rest
  },
  ref,
) {
  const Tag: ElementType = as ?? defaultTag(variant);
  return (
    <Tag
      ref={ref as never}
      className={cn(
        variantMap[variant],
        sizeMap[size],
        balance && 'text-balance',
        muted && 'opacity-60',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
});

function defaultTag(variant: Variant): ElementType {
  switch (variant) {
    case 'display':
      return 'h1';
    case 'heading':
      return 'h2';
    case 'subheading':
      return 'h3';
    case 'caption':
      return 'span';
    case 'mono':
      return 'span';
    default:
      return 'p';
  }
}
