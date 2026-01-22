import * as THREE from "three";
import { useRef, useMemo, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  Vector3, 
  Quaternion, 
  MeshStandardMaterial, 
  Group, 
  Color 
} from "three";

if (typeof window !== "undefined") {
  (window as any).THREE = THREE;
}
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Sparkles } from "@react-three/drei";
import { useMobileDetection, shouldDisable3D } from "@/hooks/useMobileDetection";

function HUDGrid() {
  return (
    <group position={[0, 0, -10]}>
      <gridHelper args={[100, 50, "#00C8FF", "#00C8FF"]} rotation={[Math.PI / 2, 0, 0]} transparent opacity={0.05} />
      <Sparkles count={50} scale={20} size={1} speed={0.2} color="#00C8FF" opacity={0.2} />
    </group>
  );
}

function ScanningLines() {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = (Math.sin(state.clock.getElapsedTime() * 0.5) * 10);
    }
  });

  return (
    <group ref={ref}>
      <mesh position={[0, 0, -5]}>
        <boxGeometry args={[30, 0.01, 0.01]} />
        <meshBasicMaterial color="#00FF95" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

function CyberDragon() {
  const { mouse, viewport } = useThree();
  const segments = 40; // High detail for cinematic dragon
  const segmentRefs = useRef<Group[]>([]);
  const headRef = useRef<Group>(null);
  const leftWingRef = useRef<Group>(null);
  const rightWingRef = useRef<Group>(null);
  
  const positions = useMemo(() => Array.from({ length: segments }, () => new Vector3()), []);
  const rotations = useMemo(() => Array.from({ length: segments }, () => new Quaternion()), []);

  // Cinematic Materials
  const armorMaterial = useMemo(() => new MeshStandardMaterial({
    color: "#050505",
    metalness: 1.0,
    roughness: 0.1,
  }), []);

  const accentMaterial = useMemo(() => new MeshStandardMaterial({
    color: "#00C8FF",
    emissive: "#00C8FF",
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.9,
  }), []);

  const wingMaterial = useMemo(() => new MeshStandardMaterial({
    color: "#00C8FF",
    emissive: "#00C8FF",
    emissiveIntensity: 0.4,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide
  }), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Position dragon relative to viewport
    const targetX = (mouse.x * viewport.width) / 2 + (viewport.width * 0.1);
    const targetY = (mouse.y * viewport.height) / 2;
    
    if (headRef.current) {
      // Smooth tracking
      headRef.current.position.x += (targetX - headRef.current.position.x) * 0.07;
      headRef.current.position.y += (targetY - headRef.current.position.y) * 0.07;
      headRef.current.position.z = Math.sin(time * 0.3) * 3;
      
      // Look EXACTLY at mouse
      const mouse3D = new Vector3(targetX, targetY, 10);
      headRef.current.lookAt(mouse3D);
      
      // Add subtle mecha-head tilt
      headRef.current.rotation.z += Math.sin(time * 1.5) * 0.05;
    }

    // Wing flapping animation
    if (leftWingRef.current && rightWingRef.current) {
      const flap = Math.sin(time * 4) * 0.8;
      leftWingRef.current.rotation.y = flap;
      rightWingRef.current.rotation.y = -flap;
    }

    // Trailing body segments
    positions[0].copy(headRef.current?.position || new Vector3());
    rotations[0].copy(headRef.current?.quaternion || new Quaternion());

    for (let i = 1; i < segments; i++) {
      const seg = segmentRefs.current[i];
      if (!seg) continue;
      
      const prevPos = positions[i - 1];
      const distance = 0.5;
      
      const dir = new Vector3().subVectors(prevPos, positions[i]).normalize();
      positions[i].copy(prevPos).sub(dir.multiplyScalar(distance));
      rotations[i].slerp(rotations[i - 1], 0.12);
      
      seg.position.copy(positions[i]);
      seg.quaternion.copy(rotations[i]);
      
      // Undulation
      seg.position.y += Math.sin(time * 2 + i * 0.3) * 0.12;
      seg.position.x += Math.cos(time * 1 + i * 0.2) * 0.08;
      
      // Tapering
      const scale = Math.max(0.05, (1 - i / segments) * 1.3);
      seg.scale.setScalar(scale);
    }
  });

  return (
    <group>
      {/* Cinematic Dragon Head */}
      <group ref={headRef}>
        {/* Skull */}
        <mesh>
          <boxGeometry args={[0.9, 0.7, 1.2]} />
          <primitive object={armorMaterial} attach="material" />
        </mesh>
        {/* Snout */}
        <mesh position={[0, -0.1, 1.1]}>
          <boxGeometry args={[0.6, 0.5, 1.4]} />
          <primitive object={armorMaterial} attach="material" />
        </mesh>
        {/* Glowing Eyes */}
        <mesh position={[0.35, 0.2, 0.5]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshBasicMaterial color="#00FF95" />
        </mesh>
        <mesh position={[-0.35, 0.2, 0.5]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshBasicMaterial color="#00FF95" />
        </mesh>
        {/* Horns */}
        <mesh position={[0.4, 0.6, -0.3]} rotation={[-0.4, 0, 0.4]}>
          <coneGeometry args={[0.15, 1.2, 4]} />
          <primitive object={accentMaterial} attach="material" />
        </mesh>
        <mesh position={[-0.4, 0.6, -0.3]} rotation={[-0.4, 0, -0.4]}>
          <coneGeometry args={[0.15, 1.2, 4]} />
          <primitive object={accentMaterial} attach="material" />
        </mesh>

        {/* Cinematic Wings */}
        <group position={[0, 0, -0.5]}>
          <group ref={leftWingRef} position={[0.5, 0, 0]}>
            <mesh position={[2, 0, -0.5]} rotation={[0, 0, 0.1]}>
              <boxGeometry args={[4, 0.02, 3]} />
              <primitive object={wingMaterial} attach="material" />
            </mesh>
            {/* Wing Ribs */}
            <mesh position={[2, 0.1, -0.5]}>
              <boxGeometry args={[4, 0.1, 0.1]} />
              <primitive object={accentMaterial} attach="material" />
            </mesh>
          </group>
          <group ref={rightWingRef} position={[-0.5, 0, 0]}>
            <mesh position={[-2, 0, -0.5]} rotation={[0, 0, -0.1]}>
              <boxGeometry args={[4, 0.02, 3]} />
              <primitive object={wingMaterial} attach="material" />
            </mesh>
            {/* Wing Ribs */}
            <mesh position={[-2, 0.1, -0.5]}>
              <boxGeometry args={[4, 0.1, 0.1]} />
              <primitive object={accentMaterial} attach="material" />
            </mesh>
          </group>
        </group>
      </group>

      {/* Armored Body Segments */}
      {Array.from({ length: segments }).map((_, i) => (
        <group key={i} ref={(el) => (segmentRefs.current[i] = el!)}>
          {/* Main Segment Sphere */}
          <mesh>
            <sphereGeometry args={[0.8, 8, 8]} />
            <primitive object={armorMaterial} attach="material" />
          </mesh>
          {/* Spinal Spikes */}
          <mesh position={[0, 0.6, 0]} rotation={[Math.PI / 4, 0, 0]}>
            <coneGeometry args={[0.2, 0.8, 4]} />
            <primitive object={accentMaterial} attach="material" />
          </mesh>
          {/* Glow Rings */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.85, 0.02, 8, 32]} />
            <primitive object={accentMaterial} attach="material" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function Dragon3D() {
  const capabilities = useMobileDetection();
  const disable3D = shouldDisable3D(capabilities);

  if (disable3D) {
    return (
      <div 
        aria-hidden="true" 
        className="pointer-events-none fixed inset-0 z-0 bg-background/50"
        style={{
          backgroundImage: `
            radial-gradient(circle at 2px 2px, rgba(0, 200, 255, 0.05) 1px, transparent 0),
            linear-gradient(to bottom, rgba(10, 15, 31, 0.4), rgba(10, 15, 31, 0.6))
          `,
          backgroundSize: '32px 32px, 100% 100%'
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        {/* Cinematic Lighting */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00C8FF" />
        <spotLight 
          position={[-10, 20, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={2} 
          color="#00FF95"
          castShadow 
        />
        <rectAreaLight
          width={20}
          height={20}
          intensity={0.5}
          position={[0, 0, -5]}
          color="#00C8FF"
        />

        <fog attach="fog" args={["#0a0f1f", 10, 25]} />

        <Suspense fallback={null}>
          <HUDGrid />
          <ScanningLines />
          <CyberDragon />
        </Suspense>
      </Canvas>
    </div>
  );
}
