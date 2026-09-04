"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Sphere, Torus, Points, PointMaterial, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { scrollState } from "./store";

function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

export function NeonEnvironment({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreMaterialRef = useRef<any>(null);
  const ringsRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const { camera } = useThree();

  const particleCount = 100;
  
  // Static particle positions for the orbit
  const particles = useMemo(() => {
    const temp = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 2.5 + Math.random() * 2; // Orbit radius
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      temp[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      temp[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      temp[i * 3 + 2] = r * Math.cos(phi);
    }
    return temp;
  }, [particleCount]);

  useFrame((state) => {
    if (!groupRef.current || !coreMaterialRef.current || !ringsRef.current || !pointsRef.current) return;

    const t = state.clock.elapsedTime;
    const p = scrollState.progress; // 0.0 to 1.0

    // Mouse parallax
    const mouseX = (scrollState.mouseX * Math.PI) / 15;
    const mouseY = (scrollState.mouseY * Math.PI) / 15;

    // --- Base Orb State ---
    let targetX = 0;
    let targetY = 0;
    let targetScale = 1;
    let ringSpeed = 1;
    let coreDistort = 0.2;
    let ringTiltX = 0;
    let ringTiltY = 0;

    // --- Cinematic Scrolling Logic ---
    if (p < 0.2) {
      // 1. HERO (0.0 - 0.2): Right side, calm
      const local = p / 0.2;
      targetX = 4;
      targetY = 0;
      targetScale = 1;
      ringSpeed = 1;
      coreDistort = 0.2;
      ringTiltX = lerp(0, Math.PI / 4, local);
    } else if (p < 0.4) {
      // 2. ABOUT (0.2 - 0.4): Upper Center/Left, rings tilt, slightly larger
      const local = (p - 0.2) / 0.2;
      targetX = lerp(4, -3, local);
      targetY = lerp(0, 1.5, local);
      targetScale = lerp(1, 1.2, local);
      ringSpeed = lerp(1, 1.5, local);
      coreDistort = lerp(0.2, 0.4, local);
      ringTiltX = lerp(Math.PI / 4, Math.PI / 2, local);
      ringTiltY = lerp(0, -Math.PI / 6, local);
    } else if (p < 0.6) {
      // 3. SKILLS (0.4 - 0.6): Right side, active ring rotation
      const local = (p - 0.4) / 0.2;
      targetX = lerp(-3, 4, local);
      targetY = lerp(1.5, -1, local);
      targetScale = lerp(1.2, 1.1, local);
      ringSpeed = lerp(1.5, 3, local); // Active rings
      coreDistort = 0.3;
      ringTiltX = lerp(Math.PI / 2, Math.PI / 6, local);
      ringTiltY = lerp(-Math.PI / 6, Math.PI / 4, local);
    } else if (p < 0.8) {
      // 4. PROJECTS (0.6 - 0.8): Left/Center, active particles
      const local = (p - 0.6) / 0.2;
      targetX = lerp(4, -2, local);
      targetY = lerp(-1, 0, local);
      targetScale = lerp(1.1, 1.3, local);
      ringSpeed = lerp(3, 1, local);
      coreDistort = lerp(0.3, 0.5, local);
      ringTiltX = lerp(Math.PI / 6, Math.PI / 3, local);
      ringTiltY = lerp(Math.PI / 4, 0, local);
    } else if (p < 0.9) {
      // 5. EXPERIENCE (0.8 - 0.9): Right side, rings elongate/tilt
      const local = (p - 0.8) / 0.1;
      targetX = lerp(-2, 3, local);
      targetY = lerp(0, 1, local);
      targetScale = lerp(1.3, 1, local);
      ringSpeed = lerp(1, 2, local);
      coreDistort = 0.2;
      ringTiltX = lerp(Math.PI / 3, Math.PI / 2, local);
      ringTiltY = lerp(0, Math.PI / 2, local);
    } else {
      // 6. CONTACT (0.9 - 1.0): Center, shrink to core
      const local = (p - 0.9) / 0.1;
      targetX = lerp(3, 0, local);
      targetY = lerp(1, 0, local);
      targetScale = lerp(1, 0.8, local);
      ringSpeed = lerp(2, 0.5, local);
      coreDistort = lerp(0.2, 0.1, local);
      ringTiltX = lerp(Math.PI / 2, 0, local);
      ringTiltY = lerp(Math.PI / 2, 0, local);
    }

    // Smooth position and scale interpolation
    groupRef.current.position.x = lerp(groupRef.current.position.x, targetX + mouseX, 0.05);
    groupRef.current.position.y = lerp(groupRef.current.position.y, targetY + mouseY, 0.05);
    groupRef.current.scale.setScalar(lerp(groupRef.current.scale.x, targetScale, 0.05));

    // Core pulsing rotation
    groupRef.current.rotation.y = t * 0.2;
    groupRef.current.rotation.x = t * 0.1;

    coreMaterialRef.current.distort = lerp(coreMaterialRef.current.distort, coreDistort, 0.05);

    // Rings independent rotation and tilt
    ringsRef.current.rotation.x = lerp(ringsRef.current.rotation.x, ringTiltX, 0.05);
    ringsRef.current.rotation.y = lerp(ringsRef.current.rotation.y, ringTiltY, 0.05);

    ringsRef.current.children.forEach((ring, i) => {
      // Each ring rotates at slightly different speeds on different axes
      ring.rotation.x = t * 0.5 * ringSpeed * (i % 2 === 0 ? 1 : -1);
      ring.rotation.y = t * 0.3 * ringSpeed * (i % 3 === 0 ? 1 : -1);
      ring.rotation.z = t * 0.4 * ringSpeed;
    });

    // Particle orbit rotation
    pointsRef.current.rotation.y = t * 0.1 * ringSpeed;
    pointsRef.current.rotation.x = t * 0.05;
  });

  return (
    <group ref={groupRef}>
      {/* 1. Energy Core */}
      {/* Optimized geometry from 64x64 to 32x32 for better performance */}
      <Sphere args={[1.5, 32, 32]}>
        <MeshDistortMaterial
          ref={coreMaterialRef}
          color={color}
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.8}
          roughness={0.2}
          speed={2}
        />
      </Sphere>

      {/* 2. Internal Wireframe */}
      <Sphere args={[1.52, 32, 32]}>
        <meshBasicMaterial color={color} wireframe transparent opacity={0.15} />
      </Sphere>

      {/* 3. Orbital Rings */}
      <group ref={ringsRef}>
        {/* Optimized geometry: reduced radial and tubular segments */}
        <Torus args={[2.2, 0.02, 8, 64]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color={color} transparent opacity={0.6} />
        </Torus>
        <Torus args={[2.8, 0.015, 8, 64]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <meshBasicMaterial color={color} transparent opacity={0.4} />
        </Torus>
        <Torus args={[3.4, 0.01, 8, 64]} rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
          <meshBasicMaterial color={color} transparent opacity={0.2} />
        </Torus>
      </group>

      {/* 4. Lightweight Particles */}
      <Points ref={pointsRef} positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}
