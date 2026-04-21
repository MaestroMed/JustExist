import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';

type Variant = 'primary' | 'ghost' | 'outline' | 'blood';
type Size = 'sm' | 'md' | 'lg';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

const baseStyles =
  'inline-flex items-center justify-center gap-2 font-[var(--font-display)] font-[500] ' +
  'tracking-[-0.01em] transition-[background-color,color,border-color,transform] ' +
  'duration-[var(--duration-base)] ease-[var(--ease-nacks)] ' +
  'disabled:cursor-not-allowed disabled:opacity-50 ' +
  'active:scale-[0.98] select-none';

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-[var(--color-cream)] text-[var(--color-ink)] hover:bg-[var(--color-bubble)] ' +
    'hover:text-[var(--color-ink)]',
  ghost:
    'bg-transparent text-[var(--color-cream)] hover:bg-[var(--color-cream-100)] ' +
    'border border-transparent',
  outline:
    'bg-transparent text-[var(--color-cream)] border border-[var(--color-cream)] ' +
    'hover:bg-[var(--color-cream)] hover:text-[var(--color-ink)]',
  blood:
    'bg-[var(--color-blood)] text-[var(--color-cream)] hover:brightness-110 ' +
    'shadow-[var(--shadow-glow-blood)]',
};

const sizeStyles: Record<Size, string> = {
  sm: 'text-sm px-4 py-2 rounded-[var(--radius-md)]',
  md: 'text-base px-6 py-3 rounded-[var(--radius-md)]',
  lg: 'text-lg px-8 py-4 rounded-[var(--radius-md)]',
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  {
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    disabled,
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...rest}
    >
      {isLoading ? (
        <span
          aria-hidden="true"
          className="inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
});
