import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const ParticleField = () => {
  const ref = useRef();
  const positions = (() => {
    const count = 700;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.2 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  })();
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.04;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#34d399" transparent opacity={0.65} sizeAttenuation />
    </points>
  );
};

const CyberCore = () => {
  const group = useRef();
  const wire = useRef();
  const inner = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    wire.current.rotation.y += delta * 0.22;
    wire.current.rotation.x += delta * 0.08;
    inner.current.rotation.y -= delta * 0.35;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, mouse.current.y * 0.35, 0.05);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mouse.current.x * 0.5, 0.05);
    group.current.position.y = Math.sin(t * 0.8) * 0.18;
  });

  const isDesktop = viewport.width > 9;
  return (
    <group
      ref={group}
      position={[isDesktop ? viewport.width * 0.26 : 0, 0, 0]}
      scale={isDesktop ? 1 : 0.62}
    >
      <mesh ref={wire}>
        <icosahedronGeometry args={[2.3, 1]} />
        <meshBasicMaterial color="#10b981" wireframe transparent opacity={0.5} />
      </mesh>
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.05, 0]} />
        <meshStandardMaterial color="#0d111a" emissive="#10b981" emissiveIntensity={0.85} flatShading />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[3.1, 0.012, 8, 90]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.5} />
      </mesh>
      <ParticleField />
    </group>
  );
};

export const HeroCanvas = () => (
  <div className="absolute inset-0 z-0" data-testid="hero-3d-canvas" aria-hidden="true">
    <Canvas camera={{ position: [0, 0, 7.5], fov: 50 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[6, 6, 6]} intensity={32} color="#10b981" />
      <pointLight position={[-6, -4, -4]} intensity={14} color="#06b6d4" />
      <CyberCore />
    </Canvas>
  </div>
);
