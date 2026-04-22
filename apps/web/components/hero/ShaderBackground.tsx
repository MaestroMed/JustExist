'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, extend, type ThreeElement } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Background WebGL — noise field en Posca, mouse reactive.
 * Full viewport, derrière le contenu, mix-blend-screen.
 * Performant : 1 shader material + 1 plane, pas de framebuffer.
 */

const NacksShader = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0.5, 0.5),
    uResolution: new THREE.Vector2(1, 1),
    uColorInk: new THREE.Color('#0A0A0A'),
    uColorA: new THREE.Color('#1E40AF'),
    uColorB: new THREE.Color('#E63946'),
    uColorC: new THREE.Color('#FFD43B'),
    uIntensity: 0.9,
  },
  /* vertex */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /* fragment */ `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    uniform vec3 uColorInk;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform vec3 uColorC;
    uniform float uIntensity;
    varying vec2 vUv;

    // 2D Simplex noise (Ashima / Ian McEwan)
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865, 0.366025403, -0.577350269, 0.024390243);
      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m; m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291 - 0.85373472 * (a0*a0 + h*h);
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      for (int i = 0; i < 5; i++) {
        v += a * snoise(p);
        p = p * 2.0 + vec2(100.0);
        a *= 0.5;
      }
      return v;
    }

    void main() {
      vec2 uv = vUv;
      vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
      vec2 p = (uv - 0.5) * aspect;

      // Mouse warp — déformation subtile vers le curseur
      vec2 mouse = (uMouse - 0.5) * aspect;
      float dist = length(p - mouse);
      float warp = exp(-dist * 2.0) * 0.15;
      p += normalize(mouse - p) * warp;

      float t = uTime * 0.08;

      // Two noise fields — one slow flowy, one smaller broken
      float n1 = fbm(p * 1.1 + vec2(t, -t * 0.7));
      float n2 = fbm(p * 3.2 - vec2(t * 0.5, t));

      float field = n1 * 0.6 + n2 * 0.4;
      field = smoothstep(-0.4, 0.6, field);

      // Map to 3-color palette through ink
      vec3 col = uColorInk;
      col = mix(col, uColorA, smoothstep(0.2, 0.6, field) * 0.35);
      col = mix(col, uColorB, smoothstep(0.55, 0.85, field) * 0.25);
      col = mix(col, uColorC, smoothstep(0.75, 0.95, field) * 0.12);

      // Vignette
      float vig = smoothstep(1.2, 0.35, length(uv - 0.5));
      col *= 0.55 + vig * 0.45;

      // Grain ponctuel
      float grain = snoise(uv * uResolution * 1.2) * 0.04;
      col += grain;

      gl_FragColor = vec4(col * uIntensity, 1.0);
    }
  `,
);

extend({ NacksShader });

// Typage ambient pour JSX <nacksShader />
declare module '@react-three/fiber' {
  interface ThreeElements {
    nacksShader: ThreeElement<typeof NacksShader>;
  }
}

function ShaderPlane({ reduceMotion }: { reduceMotion: boolean }) {
  const matRef = useRef<THREE.ShaderMaterial | null>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((state, delta) => {
    const mat = matRef.current as unknown as {
      uTime: { value: number };
      uMouse: { value: THREE.Vector2 };
      uResolution: { value: THREE.Vector2 };
    } | null;
    if (!mat) return;
    if (!reduceMotion) mat.uTime.value += delta;
    mat.uMouse.value.x += (mouse.current.x - mat.uMouse.value.x) * 0.05;
    mat.uMouse.value.y += (mouse.current.y - mat.uMouse.value.y) * 0.05;
    const { size } = state;
    mat.uResolution.value.set(size.width * (state.viewport.dpr ?? 1), size.height * (state.viewport.dpr ?? 1));
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <nacksShader ref={matRef} />
    </mesh>
  );
}

export function ShaderBackground({ className }: { className?: string }) {
  const reduceMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  return (
    <div className={`pointer-events-none absolute inset-0 ${className ?? ''}`} aria-hidden="true">
      <Canvas
        orthographic
        camera={{ zoom: 1, position: [0, 0, 1] }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: 'low-power' }}
      >
        <ShaderPlane reduceMotion={reduceMotion} />
      </Canvas>
    </div>
  );
}
