'use client';

import { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

type Skin = 'classique' | 'neon' | 'golden' | 'street';

const SKINS: Record<Skin, { body: string; belly: string; stripes: string; eyes: string; accent: string; label: string }> = {
  classique: {
    body: '#1E40AF',
    belly: '#F5F1E8',
    stripes: '#F5F1E8',
    eyes: '#E63946',
    accent: '#FFD43B',
    label: 'Classique',
  },
  neon: {
    body: '#0F0F2D',
    belly: '#EC4899',
    stripes: '#06B6D4',
    eyes: '#FFD43B',
    accent: '#7C3AED',
    label: 'Neon Night',
  },
  golden: {
    body: '#D4A056',
    belly: '#0A0A0A',
    stripes: '#0A0A0A',
    eyes: '#E63946',
    accent: '#FFD43B',
    label: 'Golden',
  },
  street: {
    body: '#2a2a2a',
    belly: '#F5F1E8',
    stripes: '#F5F1E8',
    eyes: '#E63946',
    accent: '#4ADE80',
    label: 'Street OG',
  },
};

/**
 * Mr Poppy 3D — composite de primitives Three.js.
 * Assez simple pour tenir en < 5ms / frame, assez riche pour dire « lui ».
 * Skins switchables. OrbitControls actifs. Shadow ground.
 */
export function PoppyScene() {
  const [skin, setSkin] = useState<Skin>('classique');
  const palette = SKINS[skin];

  return (
    <div className="relative h-[min(70vh,600px)] w-full overflow-hidden rounded-sm">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0.6, 3.2], fov: 38 }}
        gl={{ antialias: true, preserveDrawingBuffer: false }}
      >
        <color attach="background" args={['#0A0A0A']} />
        <fog attach="fog" args={['#0A0A0A', 4, 9]} />

        <ambientLight intensity={0.3} />
        <directionalLight
          position={[4, 6, 4]}
          intensity={2.4}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-left={-2.5}
          shadow-camera-right={2.5}
          shadow-camera-top={2.5}
          shadow-camera-bottom={-2.5}
          color="#ffffff"
        />
        <directionalLight position={[-4, 3, -2]} intensity={0.6} color={palette.accent} />
        {/* Spotlight dramatique */}
        <spotLight
          position={[0, 5.5, 2]}
          angle={Math.PI / 5}
          penumbra={0.7}
          intensity={1.4}
          color={palette.accent}
          castShadow
        />

        <Suspense fallback={null}>
          <Environment preset="studio" />
          <Stars
            radius={12}
            depth={25}
            count={800}
            factor={1.8}
            saturation={0}
            fade
            speed={0.2}
          />
          <DustParticles color={palette.accent} count={200} />
          <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.25}>
            <Poppy palette={palette} />
          </Float>
          <OrbitingAccessories palette={palette} />
          <ContactShadows
            position={[0, -0.9, 0]}
            opacity={0.65}
            blur={2.4}
            scale={6}
            far={1.4}
            color="#000000"
          />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2 + 0.1}
          rotateSpeed={0.4}
        />
      </Canvas>

      {/* Skin switcher en overlay */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full border border-[var(--color-cream-100)] bg-[var(--color-ink)]/80 p-1.5 backdrop-blur-md">
        {(Object.keys(SKINS) as Skin[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setSkin(key)}
            aria-pressed={key === skin}
            className={`rounded-full px-4 py-1.5 font-[var(--font-mono)] text-[10px] uppercase tracking-[0.2em] transition-colors ${
              key === skin
                ? 'bg-[var(--color-cream)] text-[var(--color-ink)]'
                : 'text-[var(--color-cream-600)] hover:text-[var(--color-cream)]'
            }`}
            data-cursor="link"
            data-cursor-label={SKINS[key].label}
          >
            {SKINS[key].label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Poppy({ palette }: { palette: (typeof SKINS)[Skin] }) {
  const group = useRef<THREE.Group>(null);
  const breathGroup = useRef<THREE.Group>(null);

  useFrame(({ clock, mouse }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    // Mouse-tracking rotation
    group.current.rotation.y = mouse.x * 0.3 + Math.sin(t * 0.3) * 0.05;
    group.current.rotation.x = -mouse.y * 0.18;
    // Breathing idle animation
    if (breathGroup.current) {
      const breath = 1 + Math.sin(t * 1.4) * 0.012;
      breathGroup.current.scale.y = breath;
      breathGroup.current.position.y = Math.sin(t * 0.5) * 0.02;
    }
  });

  return (
    <group ref={group} position={[0, -0.15, 0]}>
      <group ref={breathGroup}>
      {/* Tête */}
      <mesh castShadow position={[0, 0.25, 0]}>
        <sphereGeometry args={[0.7, 64, 64]} />
        <meshStandardMaterial color={palette.body} roughness={0.55} metalness={0.05} />
      </mesh>

      {/* Oreilles */}
      <Ear position={[-0.55, 0.75, 0]} rotation={[0, 0, 0.3]} color={palette.body} belly={palette.belly} />
      <Ear position={[0.55, 0.75, 0]} rotation={[0, 0, -0.3]} color={palette.body} belly={palette.belly} />

      {/* Museau */}
      <mesh castShadow position={[0, 0.1, 0.58]} scale={[0.45, 0.35, 0.35]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={palette.belly} roughness={0.9} />
      </mesh>

      {/* Nez */}
      <mesh position={[0, 0.18, 0.82]} scale={[0.12, 0.09, 0.09]}>
        <sphereGeometry args={[1, 20, 20]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.3} />
      </mesh>

      {/* X yeux */}
      <XEye position={[-0.24, 0.4, 0.6]} color={palette.eyes} />
      <XEye position={[0.24, 0.4, 0.6]} color={palette.eyes} />

      {/* Corps avec marinière */}
      <mesh castShadow position={[0, -0.7, 0]} scale={[0.8, 0.75, 0.7]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color={palette.body} roughness={0.6} metalness={0.05} />
      </mesh>
      <MarinièreStripes color={palette.stripes} />
      </group>
    </group>
  );
}

function DustParticles({ color, count }: { color: string; count: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      base: new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.3) * 5,
        (Math.random() - 0.5) * 8,
      ),
      phase: Math.random() * Math.PI * 2,
      speed: 0.3 + Math.random() * 0.5,
      amp: 0.1 + Math.random() * 0.3,
      size: 0.012 + Math.random() * 0.02,
      key: i,
    }));
  }, [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    seeds.forEach((seed, i) => {
      dummy.position.copy(seed.base);
      dummy.position.y += Math.sin(t * seed.speed + seed.phase) * seed.amp;
      dummy.position.x += Math.cos(t * seed.speed * 0.7 + seed.phase) * seed.amp * 0.5;
      dummy.rotation.set(t * 0.2 + seed.phase, t * 0.15 + seed.phase, 0);
      dummy.scale.setScalar(seed.size);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        transparent
        opacity={0.65}
      />
    </instancedMesh>
  );
}

function Ear({
  position,
  rotation,
  color,
  belly,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  belly: string;
}) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.55} />
      </mesh>
      <mesh position={[0, 0, 0.1]}>
        <sphereGeometry args={[0.17, 24, 24]} />
        <meshStandardMaterial color={belly} roughness={0.9} />
      </mesh>
    </group>
  );
}

function XEye({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <group position={position}>
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.22, 0.04, 0.04]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} roughness={0.3} />
      </mesh>
      <mesh rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.22, 0.04, 0.04]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} roughness={0.3} />
      </mesh>
    </group>
  );
}

function MarinièreStripes({ color }: { color: string }) {
  const stripes = [0.35, 0.15, -0.05, -0.25, -0.45];
  return (
    <>
      {stripes.map((y, i) => (
        <mesh key={i} position={[0, y - 0.7, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[0.81, 0.81, 1]}>
          <torusGeometry args={[1 * Math.cos(Math.asin(Math.abs((y + 0.2) / 0.8))), 0.03, 16, 64]} />
          <meshStandardMaterial color={color} roughness={0.8} />
        </mesh>
      ))}
    </>
  );
}

function OrbitingAccessories({ palette }: { palette: (typeof SKINS)[Skin] }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.getElapsedTime() * 0.35;
  });
  return (
    <group ref={group} position={[0, -0.1, 0]}>
      {/* Pioche MP */}
      <Float speed={2} rotationIntensity={0.8} floatIntensity={0.3}>
        <group position={[1.5, 0.2, 0.2]} rotation={[0, -0.4, 0.25]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.8, 12]} />
            <meshStandardMaterial color={palette.accent} roughness={0.4} metalness={0.3} />
          </mesh>
          <mesh castShadow position={[0, 0.45, 0]} rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[0.4, 0.15, 0.15]} />
            <meshStandardMaterial color="#FFD43B" roughness={0.3} metalness={0.5} />
          </mesh>
          <mesh position={[0, 0.45, 0]} rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[0.42, 0.04, 0.16]} />
            <meshStandardMaterial color="#EC4899" />
          </mesh>
        </group>
      </Float>

      {/* Lama mini */}
      <Float speed={1.6} rotationIntensity={0.5} floatIntensity={0.4}>
        <group position={[-1.4, 0.3, 0.3]} scale={0.4}>
          <mesh castShadow position={[0, 0.3, 0]}>
            <sphereGeometry args={[0.45, 24, 24]} />
            <meshStandardMaterial color="#F5F1E8" roughness={0.75} />
          </mesh>
          <mesh castShadow position={[0, 0.9, 0.1]} scale={[0.35, 0.55, 0.35]}>
            <sphereGeometry args={[0.4, 24, 24]} />
            <meshStandardMaterial color="#F5F1E8" roughness={0.75} />
          </mesh>
          <mesh position={[-0.1, 1.25, 0.2]} rotation={[0.3, 0, 0]} scale={[0.1, 0.3, 0.1]}>
            <sphereGeometry args={[1, 12, 12]} />
            <meshStandardMaterial color="#F5F1E8" roughness={0.75} />
          </mesh>
          <mesh position={[0.1, 1.25, 0.2]} rotation={[0.3, 0, 0]} scale={[0.1, 0.3, 0.1]}>
            <sphereGeometry args={[1, 12, 12]} />
            <meshStandardMaterial color="#F5F1E8" roughness={0.75} />
          </mesh>
        </group>
      </Float>

      {/* Cubes Fortnite flottants */}
      {[0, 1, 2, 3].map((i) => {
        const a = (i / 4) * Math.PI * 2;
        return (
          <Float key={i} speed={1 + i * 0.2} rotationIntensity={1.2} floatIntensity={0.5}>
            <mesh position={[Math.cos(a) * 2.2, 0.8 + Math.sin(i) * 0.3, Math.sin(a) * 2.2]} scale={0.15}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? palette.accent : palette.eyes}
                emissive={i % 2 === 0 ? palette.accent : palette.eyes}
                emissiveIntensity={0.2}
                roughness={0.3}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}
