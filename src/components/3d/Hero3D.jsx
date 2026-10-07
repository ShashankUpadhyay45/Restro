import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles } from '@react-three/drei';

function InteractiveHandi() {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.22;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.15, 0]} scale={[0.78, 0.78, 0.78]}>
      {/* 1. Bulbous Terracotta Clay Handi Body */}
      <mesh position={[0, -0.05, 0]} scale={[1.18, 0.92, 1.18]} castShadow receiveShadow>
        <sphereGeometry args={[1.0, 36, 28, 0, Math.PI * 2, 0, Math.PI * 0.82]} />
        <meshStandardMaterial
          color="#9a3412"
          roughness={0.7}
          metalness={0.12}
        />
      </mesh>

      {/* Handi Neck */}
      <mesh position={[0, 0.44, 0]}>
        <cylinderGeometry args={[0.82, 0.96, 0.3, 36]} />
        <meshStandardMaterial color="#832d10" roughness={0.72} metalness={0.15} />
      </mesh>

      {/* Handi Flared Clay Rim */}
      <mesh position={[0, 0.59, 0]}>
        <torusGeometry args={[0.84, 0.075, 16, 48]} />
        <meshStandardMaterial color="#7c2d12" roughness={0.7} metalness={0.18} />
      </mesh>

      {/* 2. Sealed Dum Dough Ring (Atta Parda Seal) */}
      <mesh position={[0, 0.65, 0]}>
        <torusGeometry args={[0.8, 0.07, 14, 48]} />
        <meshStandardMaterial color="#fef3c7" roughness={0.92} />
      </mesh>

      {/* 3. Polished Royal Brass Dome Lid */}
      <mesh position={[0, 0.63, 0]}>
        <sphereGeometry args={[0.78, 36, 22, 0, Math.PI * 2, 0, Math.PI * 0.44]} />
        <meshStandardMaterial
          color="#f59e0b"
          metalness={0.88}
          roughness={0.22}
        />
      </mesh>

      {/* Ornate Brass Finial Handle on Top */}
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.05, 0.08, 0.18, 16]} />
        <meshStandardMaterial color="#d97706" metalness={0.92} roughness={0.18} />
      </mesh>
      <mesh position={[0, 1.23, 0]}>
        <sphereGeometry args={[0.13, 20, 20]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.95} roughness={0.12} />
      </mesh>

      {/* 4. Side Brass Hanging Rings (Kada Handles) */}
      <group position={[-1.12, 0.15, 0]} rotation={[0, 0, Math.PI / 2]}>
        <mesh>
          <torusGeometry args={[0.18, 0.038, 12, 28]} />
          <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
      <group position={[1.12, 0.15, 0]} rotation={[0, 0, Math.PI / 2]}>
        <mesh>
          <torusGeometry args={[0.18, 0.038, 12, 28]} />
          <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* 5. Glowing Charcoal Sigri / Hearth Base */}
      <mesh position={[0, -0.78, 0]}>
        <cylinderGeometry args={[1.3, 1.35, 0.18, 36]} />
        <meshStandardMaterial
          color="#18181b"
          roughness={0.6}
          metalness={0.4}
        />
      </mesh>

      {/* Glowing Hot Ember Ring */}
      <mesh position={[0, -0.72, 0]}>
        <torusGeometry args={[1.15, 0.07, 14, 36]} />
        <meshStandardMaterial
          color="#f97316"
          emissive="#f97316"
          emissiveIntensity={3.2}
          roughness={0.2}
        />
      </mesh>

      {/* Inner Hearth Charcoal Glow Disc */}
      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[1.05, 1.05, 0.04, 32]} />
        <meshStandardMaterial
          color="#ea580c"
          emissive="#ea580c"
          emissiveIntensity={2.2}
        />
      </mesh>

      {/* 6. Floating Aromatic Spices */}
      {/* Star Anise */}
      <Float speed={2} rotationIntensity={2} floatIntensity={1.5} position={[1.5, 0.5, 0.4]}>
        <mesh>
          <octahedronGeometry args={[0.18, 0]} />
          <meshStandardMaterial color="#854d0e" roughness={0.6} metalness={0.2} />
        </mesh>
      </Float>

      {/* Green Cardamom Pod */}
      <Float speed={1.8} rotationIntensity={1.5} floatIntensity={2} position={[-1.45, 0.4, -0.4]}>
        <mesh scale={[0.8, 1.3, 0.8]}>
          <sphereGeometry args={[0.13, 16, 16]} />
          <meshStandardMaterial color="#65a30d" roughness={0.7} />
        </mesh>
      </Float>

      {/* Cinnamon Quill Stick */}
      <Float speed={2.2} rotationIntensity={2.5} floatIntensity={1.8} position={[1.2, -0.3, 0.9]}>
        <mesh rotation={[0.4, 0.6, 0.3]}>
          <cylinderGeometry args={[0.05, 0.05, 0.55, 12]} />
          <meshStandardMaterial color="#78350f" roughness={0.7} />
        </mesh>
      </Float>

      {/* Kashmiri Red Chili */}
      <Float speed={1.6} rotationIntensity={2} floatIntensity={1.4} position={[-1.15, -0.3, 1.0]}>
        <mesh rotation={[-0.3, 0.4, 0.8]}>
          <coneGeometry args={[0.08, 0.38, 12]} />
          <meshStandardMaterial color="#dc2626" roughness={0.45} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0.5, 3.8], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[4, 6, 4]} intensity={2.2} />
        <pointLight position={[-3, 2, 2]} intensity={3.5} color="#f97316" />
        <pointLight position={[3, 1, -2]} intensity={2.5} color="#fbbf24" />
        <pointLight position={[0, -2, 1]} intensity={2.8} color="#ea580c" />
        <spotLight position={[0, 5, 3]} angle={0.5} intensity={3.2} color="#fffbeb" />

        <Suspense fallback={null}>
          <InteractiveHandi />

          {/* Floating Ember Sparkles */}
          <Sparkles
            count={45}
            scale={[4, 3.5, 4]}
            size={3.2}
            speed={0.6}
            opacity={0.8}
            color="#f97316"
          />
          <Sparkles
            count={20}
            scale={[3, 3, 3]}
            size={2.0}
            speed={0.4}
            opacity={0.5}
            color="#fbbf24"
          />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.8}
          maxPolarAngle={Math.PI / 2 + 0.15}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>

      {/* Interactive Helper Pill */}
      <div className="absolute bottom-4 inset-x-0 mx-auto w-max px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs text-zinc-300 pointer-events-none flex items-center gap-2 shadow-xl">
        <span className="w-2 h-2 rounded-full bg-ember-500 animate-ping"></span>
        <span className="font-medium text-[11px]">360° Interactive Handi • Drag or Rotate</span>
      </div>
    </div>
  );
}
