'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useAccessibility } from '@/contexts/AccessibilityContext';

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const { preferences } = useAccessibility();

  // Generate random points in sphere
  const particlesCount = 1500;
  const positions = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 2000;
    positions[i + 1] = (Math.random() - 0.5) * 2000;
    positions[i + 2] = (Math.random() - 0.5) * 2000;
  }

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x += 0.0001;
      pointsRef.current.rotation.y += 0.0002;

      // Reduce animation if user prefers
      if (preferences.reduceAnimations) {
        pointsRef.current.rotation.x *= 0.5;
        pointsRef.current.rotation.y *= 0.5;
      }
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#facc15"
        size={3}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

function AnimatedGradientPlane() {
  const planeRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (planeRef.current) {
      // Subtle rotation for visual interest
      planeRef.current.rotation.z += 0.0001;
    }
  });

  return (
    <mesh ref={planeRef} position={[0, 0, -500]} scale={[2000, 2000, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        color="#000000"
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

export function AnimatedBackground() {
  const { preferences } = useAccessibility();

  return (
    <div className="fixed inset-0 -z-10" style={{ 
      background: `linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2d2620 100%)`,
      opacity: preferences.brightnessLevel / 100,
    }}>
      <Canvas
        camera={{ position: [0, 0, 100], fov: 75 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <AnimatedGradientPlane />
        {!preferences.reduceAnimations && <ParticleField />}
      </Canvas>
    </div>
  );
}
