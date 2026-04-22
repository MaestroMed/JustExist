'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

const STORAGE_KEY = 'nacks:audio-pref';

/**
 * Toggle ambiance atelier — Web Audio API, pink noise + low hum + sporadic tick.
 * 100 % procédural, aucun fichier audio requis.
 * Se souvient de la préférence (localStorage).
 * Désactivé par défaut — jamais de son imposé.
 */
export function AudioToggle() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ gain: GainNode; stop: () => void } | null>(null);

  // Restaure la préférence au premier mount (sans démarrer automatiquement : autoplay bloqué)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const pref = localStorage.getItem(STORAGE_KEY);
    if (pref === '1') setOn(false); // on attendra un clic user pour démarrer réellement
  }, []);

  useEffect(() => {
    if (!on) {
      if (nodesRef.current) {
        nodesRef.current.stop();
        nodesRef.current = null;
      }
      if (ctxRef.current) {
        ctxRef.current.close().catch(() => {});
        ctxRef.current = null;
      }
      return;
    }

    const AudioCtx =
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext ??
      window.AudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    ctxRef.current = ctx;

    // Master gain
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    master.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 1.2);

    // Pink noise via AudioWorklet-less approach : buffer-based
    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.969 * b2 + white * 0.153852;
      b3 = 0.8665 * b3 + white * 0.3104856;
      b4 = 0.55 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.016898;
      const out = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      b6 = white * 0.115926;
      data[i] = out * 0.11;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // Low-pass filter : rend le bruit feutré, comme un ventilateur d'atelier
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 380;
    filter.Q.value = 0.7;

    // Hum grave — un bourdon d'atelier
    const hum = ctx.createOscillator();
    hum.type = 'sine';
    hum.frequency.value = 56;
    const humGain = ctx.createGain();
    humGain.gain.value = 0.04;

    noise.connect(filter);
    filter.connect(master);
    hum.connect(humGain);
    humGain.connect(master);

    noise.start();
    hum.start();

    nodesRef.current = {
      gain: master,
      stop: () => {
        const t = ctx.currentTime;
        master.gain.linearRampToValueAtTime(0, t + 0.6);
        setTimeout(() => {
          try {
            noise.stop();
            hum.stop();
          } catch {
            // ignore already-stopped
          }
        }, 700);
      },
    };
  }, [on]);

  function toggle() {
    const next = !on;
    setOn(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, next ? '1' : '0');
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? 'Couper ambiance atelier' : 'Activer ambiance atelier'}
      data-cursor="link"
      data-cursor-label={on ? 'Silence' : 'Atelier'}
      className="fixed bottom-6 right-6 z-[var(--z-sticky)] flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-cream-100)] bg-[var(--color-ink)]/80 text-[var(--color-cream)] backdrop-blur-md transition-all hover:border-[var(--color-cream)] hover:scale-105 md:bottom-10 md:right-10"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        {on ? (
          <>
            <path d="M12 4L7 9H3v6h4l5 5V4z" fill="currentColor" />
            <motion.path
              d="M16 8c2 1.5 2 6.5 0 8"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            <motion.path
              d="M19 5c3.5 3 3.5 11 0 14"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.8, delay: 0.3, repeat: Infinity }}
            />
          </>
        ) : (
          <>
            <path d="M12 4L7 9H3v6h4l5 5V4z" fill="currentColor" />
            <line x1="17" y1="8" x2="23" y2="14" />
            <line x1="23" y1="8" x2="17" y2="14" />
          </>
        )}
      </svg>
    </button>
  );
}
