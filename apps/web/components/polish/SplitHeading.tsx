'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';
import type { ElementType } from 'react';

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
  mode?: 'words' | 'chars' | 'lines';
  stagger?: number;
  delay?: number;
  blur?: boolean;
  once?: boolean;
};

/**
 * Heading révélé mot-par-mot (ou char-par-char) à l'entrée du viewport.
 * Utilise Motion, pas de GSAP SplitText à charger. Respecte prefers-reduced-motion.
 */
export function SplitHeading({
  text,
  as: Tag = 'h2',
  className,
  style,
  mode = 'words',
  stagger = 0.05,
  delay = 0,
  blur = true,
  once = true,
}: Props) {
  const reduce = useReducedMotion();

  const parts =
    mode === 'chars'
      ? [...text].map((c, i) => ({ c, key: i }))
      : mode === 'lines'
        ? text.split('\n').map((l, i) => ({ c: l, key: i }))
        : text.split(' ').map((w, i, arr) => ({ c: w + (i < arr.length - 1 ? '\u00A0' : ''), key: i }));

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : stagger,
        delayChildren: delay,
      },
    },
  };

  const item: Variants = {
    hidden: reduce
      ? { opacity: 0 }
      : { y: '120%', opacity: 0, filter: blur ? 'blur(10px)' : 'none' },
    visible: {
      y: '0%',
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        y: { duration: 0.9, ease: [0.19, 1, 0.22, 1] },
        opacity: { duration: 0.6, ease: [0.19, 1, 0.22, 1] },
        filter: { duration: 0.8, ease: [0.19, 1, 0.22, 1] },
      },
    },
  };

  const content = (
    <motion.span
      className="inline-block"
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-10% 0px -10% 0px' }}
      variants={container}
      aria-label={text}
    >
      {parts.map(({ c, key }) => (
        <span key={key} className="inline-block overflow-hidden align-top">
          <motion.span
            className="inline-block"
            style={{ willChange: 'transform, opacity, filter' }}
            variants={item}
          >
            {c === '\n' ? <br /> : c}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = Tag as any;
  return (
    <Component className={className} style={style} aria-label={text}>
      {content}
    </Component>
  );
}
