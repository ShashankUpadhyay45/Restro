import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles, Center } from '@react-three/drei';
import * as THREE from 'three';

// Rotating Luxury Plate with metallic rim
function BanquetPlate({ role }) {
  const plateRef = useRef();

  useFrame((state, delta) => {
    if (plateRef.current) {
      plateRef.current.rotation.y += delta * 0.4;
      plateRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.12;
    }
  });

  const primaryColor = useMemo(() => {
    if (role === 'owner') return '#a855f7'; // Royal Purple
    if (role === 'staff') return '#10b981'; // Emerald
    return '#f97316'; // Saffron Ember
  }, [role]);

  return (
    <group ref={plateRef} position={[0, -0.6, 0]}>
      {/* Outer Ceramic Charger Plate */}
      <mesh receiveShadow castShadow>
        <cylinderGeometry args={[2.4, 2.0, 0.15, 64]} />
        <meshStandardMaterial
          color="#181a20"
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>

      {/* Gold/Ember Filigree Rim Ring */}
      <mesh position={[0, 0.08, 0]}>
        <torusGeometry args={[2.3, 0.06, 16, 64]} />
        <meshStandardMaterial
          color={primaryColor}
          emissive={primaryColor}
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Inner Gourmet Glaze Bowl */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[1.7, 1.4, 0.12, 48]} />
        <meshStandardMaterial
          color="#0d0f14"
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>

      {/* Saffron Sizzle Center Orb (Representing Culinary Essence) */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        <mesh position={[0, 0.5, 0]}>
          <dodecahedronGeometry args={[0.55, 1]} />
          <MeshDistortMaterial
            color={primaryColor}
            emissive={primaryColor}
            emissiveIntensity={0.5}
            distort={0.4}
            speed={2.5}
            roughness={0.2}
            metalness={0.4}
          />
        </mesh>
      </Float>
    </group>
  );
}

// Floating Spices (Star Anise, Cloves, Cardamom Pods)
function FloatingSpices() {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Star Anise proxies */}
      <Float speed={1.5} rotationIntensity={2} floatIntensity={2} position={[-2.8, 1.2, -1]}>
        <mesh>
          <octahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial color="#854d0e" roughness={0.6} metalness={0.2} />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={2.5} floatIntensity={1.8} position={[2.6, 1.5, -1.2]}>
        <mesh>
          <octahedronGeometry args={[0.25, 0]} />
          <meshStandardMaterial color="#c2410c" roughness={0.5} metalness={0.3} />
        </mesh>
      </Float>

      {/* Cinnamon Quills / Cloves */}
      <Float speed={1.8} rotationIntensity={1.5} floatIntensity={2.2} position={[-2.2, -1.5, 0.5]}>
        <mesh rotation={[0.4, 0.8, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.9, 12]} />
          <meshStandardMaterial color="#78350f" roughness={0.7} />
        </mesh>
      </Float>

      <Float speed={2.2} rotationIntensity={3} floatIntensity={1.5} position={[2.4, -1.2, 0.8]}>
        <mesh rotation={[0.9, 0.2, 0.4]}>
          <cylinderGeometry args={[0.08, 0.08, 0.8, 12]} />
          <meshStandardMaterial color="#9a3412" roughness={0.7} />
        </mesh>
      </Float>

      {/* Cardamom Pods */}
      <Float speed={1.2} rotationIntensity={1.8} floatIntensity={1.6} position={[-1.5, 2.2, -0.5]}>
        <mesh>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial color="#4d7c0f" roughness={0.6} />
        </mesh>
      </Float>

      <Float speed={1.7} rotationIntensity={2} floatIntensity={2.1} position={[1.8, 2.1, -0.2]}>
        <mesh>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#65a30d" roughness={0.6} />
        </mesh>
      </Float>
    </group>
  );
}

// Camera parallax with subtle mouse tracking
function ParallaxCamera() {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.mouse.x * 0.8, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, (state.mouse.y * 0.5) + 0.3, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function LoginScene3D({ role = 'customer' }) {
  const accentLight = useMemo(() => {
    if (role === 'owner') return '#c084fc';
    if (role === 'staff') return '#34d399';
    return '#fb923c';
  }, [role]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.4, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
        <pointLight position={[-4, 3, 2]} intensity={2.5} color={accentLight} />
        <pointLight position={[4, -2, -1]} intensity={1.5} color="#ea580c" />
        <spotLight position={[0, 6, 2]} angle={0.4} penumbra={1} intensity={2} color="#fef08a" />

        <ParallaxCamera />

        <Center>
          <BanquetPlate role={role} />
          <FloatingSpices />
        </Center>

        {/* Floating Ember Sparkles & Rising Steam */}
        <Sparkles
          count={60}
          scale={[7, 7, 7]}
          size={3.5}
          speed={0.6}
          opacity={0.7}
          color={accentLight}
        />
        <Sparkles
          count={35}
          scale={[5, 6, 4]}
          size={2}
          speed={0.3}
          opacity={0.4}
          color="#fef3c7"
        />
      </Canvas>
    </div>
  );
}
