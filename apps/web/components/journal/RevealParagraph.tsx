'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  index?: number;
};

/**
 * Paragraphe révélé au scroll — blur + y depuis 20px.
 * Rend une cadence de lecture cinématographique sur les articles.
 */
export function RevealParagraph({ children, className, delay = 0, index = 0 }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.p
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      transition={{
        duration: 0.8,
        delay: delay + index * 0.05,
        ease: [0.19, 1, 0.22, 1],
      }}
      className={className}
    >
      {children}
    </motion.p>
  );
}
