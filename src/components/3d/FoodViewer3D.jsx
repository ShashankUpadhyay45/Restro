import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles, MeshDistortMaterial } from '@react-three/drei';

function DishPresentation({ isVeg, spiceLevel }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.25;
    }
  });

  const coreColor = isVeg ? '#84cc16' : '#ea580c';
  const spiceGlow = spiceLevel === 'hot' || spiceLevel === 'extra-hot' ? '#ef4444' : '#f59e0b';

  return (
    <group ref={meshRef} position={[0, -0.3, 0]}>
      {/* Matte Black Charcoal Ceramic Presentation Dish */}
      <mesh receiveShadow castShadow>
        <cylinderGeometry args={[2.0, 1.6, 0.2, 48]} />
        <meshStandardMaterial
          color="#16181d"
          metalness={0.6}
          roughness={0.25}
        />
      </mesh>

      {/* Gold Rim */}
      <mesh position={[0, 0.1, 0]}>
        <torusGeometry args={[1.9, 0.04, 16, 48]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Inner Dish Glaze */}
      <mesh position={[0, 0.11, 0]}>
        <cylinderGeometry args={[1.5, 1.2, 0.08, 36]} />
        <meshStandardMaterial color="#0c0e12" roughness={0.4} />
      </mesh>

      {/* Culinary Core Embellishment */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[0, 0.45, 0]}>
          <dodecahedronGeometry args={[0.55, 1]} />
          <MeshDistortMaterial
            color={coreColor}
            emissive={spiceGlow}
            emissiveIntensity={0.6}
            distort={0.35}
            speed={2}
            roughness={0.25}
          />
        </mesh>
      </Float>

      {/* Garnish Flakes */}
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5} position={[0.7, 0.5, 0.4]}>
        <mesh>
          <tetrahedronGeometry args={[0.12, 0]} />
          <meshStandardMaterial color="#22c55e" roughness={0.5} />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={2.5} floatIntensity={1.2} position={[-0.6, 0.55, -0.3]}>
        <mesh>
          <tetrahedronGeometry args={[0.1, 0]} />
          <meshStandardMaterial color="#f43f5e" roughness={0.5} />
        </mesh>
      </Float>
    </group>
  );
}

export default function FoodViewer3D({ isVeg = true, spiceLevel = 'medium' }) {
  return (
    <div className="w-full h-72 md:h-80 relative rounded-2xl overflow-hidden bg-gradient-to-b from-zinc-900/60 to-black/80 border border-white/10 cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 1.4, 3.8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 3]} intensity={1.5} />
        <pointLight position={[-3, 2, 2]} intensity={1.8} color="#f97316" />
        <pointLight position={[3, 1, -2]} intensity={1.2} color="#fbbf24" />

        <DishPresentation isVeg={isVeg} spiceLevel={spiceLevel} />

        <Sparkles
          count={25}
          scale={[4, 3, 4]}
          size={2.5}
          speed={0.4}
          opacity={0.5}
          color="#f97316"
        />

        <OrbitControls
          enableZoom={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>

      <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] text-zinc-300 pointer-events-none flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        360° Interactive Dish Preview
      </div>
    </div>
  );
}
