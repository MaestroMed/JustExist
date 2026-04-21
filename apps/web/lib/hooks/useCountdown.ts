'use client';

import { useEffect, useState } from 'react';

export type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number; // ms
  isPast: boolean;
};

export function useCountdown(target: Date | string | number): Countdown {
  const targetMs = typeof target === 'number' ? target : new Date(target).getTime();
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const total = Math.max(0, targetMs - now);
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / 1000 / 60 / 60) % 24);
  const days = Math.floor(total / 1000 / 60 / 60 / 24);
  return { days, hours, minutes, seconds, total, isPast: total === 0 };
}

export function formatCountdown(c: Countdown): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  if (c.days > 0) return `${c.days}j ${pad(c.hours)}h ${pad(c.minutes)}m ${pad(c.seconds)}s`;
  return `${pad(c.hours)}:${pad(c.minutes)}:${pad(c.seconds)}`;
}
