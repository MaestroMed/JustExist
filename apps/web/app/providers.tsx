'use client';

import { type ReactNode } from 'react';
import { SmoothScroll } from '@/components/scroll/SmoothScroll';
import { CustomCursor } from '@/components/cursor/CustomCursor';
import { Preloader } from '@/components/preloader/Preloader';
import { ScrollProgress } from '@/components/polish/ScrollProgress';
import { ClickRipple } from '@/components/polish/ClickRipple';
import { ExitIntent } from '@/components/polish/ExitIntent';
import { AudioToggle } from '@/components/polish/AudioToggle';
import { CommandPalette } from '@/components/command/CommandPalette';
import { EasterEggsProvider } from '@/components/easter/EasterEggsProvider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <EasterEggsProvider />
      <CommandPalette />
      <ExitIntent />
      <AudioToggle />
      <SmoothScroll>
        <CustomCursor />
        <ClickRipple />
        {children}
      </SmoothScroll>
    </>
  );
}
