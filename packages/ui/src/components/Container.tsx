import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../lib/cn';

type ContainerSize = 'content' | 'wide' | 'full';

type Props = HTMLAttributes<HTMLDivElement> & {
  size?: ContainerSize;
  as?: 'div' | 'section' | 'article' | 'main' | 'header' | 'footer' | 'nav' | 'aside';
};

const sizeMap: Record<ContainerSize, string> = {
  content: 'max-w-[var(--container-content)]',
  wide: 'max-w-[var(--container-wide)]',
  full: 'max-w-[var(--container-max)]',
};

export const Container = forwardRef<HTMLDivElement, Props>(function Container(
  { size = 'full', as: Tag = 'div', className, children, ...rest },
  ref,
) {
  return (
    <Tag
      ref={ref as never}
      className={cn('mx-auto w-full px-6 md:px-10 lg:px-14', sizeMap[size], className)}
      {...rest}
    >
      {children}
    </Tag>
  );
});
