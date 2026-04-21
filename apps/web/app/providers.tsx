'use client';

import { type ReactNode } from 'react';
import { SmoothScroll } from '@/components/scroll/SmoothScroll';
import { CustomCursor } from '@/components/cursor/CustomCursor';
import { Preloader } from '@/components/preloader/Preloader';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <Preloader />
      <SmoothScroll>
        <CustomCursor />
        {children}
      </SmoothScroll>
    </>
  );
}
