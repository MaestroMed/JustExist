'use client';

import dynamic from 'next/dynamic';

export const ShaderBackgroundClient = dynamic(
  () => import('./ShaderBackground').then((m) => m.ShaderBackground),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(30,64,175,0.15), transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(230,57,70,0.1), transparent 50%)',
        }}
      />
    ),
  },
);
