import { useRef, useMemo, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
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
  const ref = useRef<THREE.Group>(null);
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
  const segments = 24;
  const segmentRefs = useRef<THREE.Group[]>([]);
  const headRef = useRef<THREE.Group>(null);
  
  const positions = useMemo(() => Array.from({ length: segments }, () => new THREE.Vector3()), []);
  const rotations = useMemo(() => Array.from({ length: segments }, () => new THREE.Quaternion()), []);

  // Professional Materials
  const armorMaterial = new THREE.MeshStandardMaterial({
    color: "#1a1a1a",
    metalness: 0.9,
    roughness: 0.1,
    emissive: "#000000",
  });

  const accentMaterial = new THREE.MeshStandardMaterial({
    color: "#00C8FF",
    emissive: "#00C8FF",
    emissiveIntensity: 0.2,
    transparent: true,
    opacity: 0.8,
  });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Position dragon to the right side of the screen
    const targetX = (mouse.x * viewport.width) / 2 + (viewport.width * 0.25);
    const targetY = (mouse.y * viewport.height) / 2;
    
    if (headRef.current) {
      // Smooth head movement
      headRef.current.position.x += (targetX - headRef.current.position.x) * 0.05;
      headRef.current.position.y += (targetY - headRef.current.position.y) * 0.05;
      headRef.current.position.z = Math.sin(time * 0.5) * 1;
      
      // Look at mouse direction
      const lookTarget = new THREE.Vector3(targetX + 5, targetY, 0);
      headRef.current.lookAt(lookTarget);
      
      // Idle "breathing" rotation
      headRef.current.rotation.z += Math.sin(time) * 0.002;
    }

    // Trailing body segments
    positions[0].copy(headRef.current?.position || new THREE.Vector3());
    rotations[0].copy(headRef.current?.quaternion || new THREE.Quaternion());

    for (let i = 1; i < segments; i++) {
      const seg = segmentRefs.current[i];
      if (!seg) continue;
      
      const prevPos = positions[i - 1];
      const prevRot = rotations[i - 1];
      
      // Lerp position for smooth trailing
      positions[i].lerp(prevPos, 0.15);
      // Slower rotation trailing
      rotations[i].slerp(prevRot, 0.1);
      
      seg.position.copy(positions[i]);
      seg.quaternion.copy(rotations[i]);
      
      // Subtle idle undulation
      seg.position.y += Math.sin(time * 1.5 + i * 0.4) * 0.05;
      
      // Tapering scale
      const s = Math.max(0.1, (1 - i / segments) * 1.2);
      seg.scale.setScalar(s);
    }
  });

  return (
    <group>
      {/* Head - Sharp, Mecha Style */}
      <group ref={headRef}>
        <mesh rotation={[0, -Math.PI / 2, 0]}>
          <coneGeometry args={[0.5, 1.5, 4]} />
          <primitive object={armorMaterial} attach="material" />
        </mesh>
        {/* Jaw/Chin Plate */}
        <mesh position={[0, -0.3, 0.2]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.4, 0.2, 0.8]} />
          <primitive object={armorMaterial} attach="material" />
        </mesh>
        {/* Cyber Eyes - Subtle Neon */}
        <mesh position={[0.4, 0.2, 0.3]}>
          <boxGeometry args={[0.1, 0.05, 0.2]} />
          <meshBasicMaterial color="#00FF95" />
        </mesh>
        <mesh position={[0.4, 0.2, -0.3]}>
          <boxGeometry args={[0.1, 0.05, 0.2]} />
          <meshBasicMaterial color="#00FF95" />
        </mesh>
        {/* Horns/Sensors */}
        <mesh position={[-0.2, 0.5, 0.3]} rotation={[0, 0, 0.5]}>
          <boxGeometry args={[0.05, 0.8, 0.05]} />
          <primitive object={accentMaterial} attach="material" />
        </mesh>
        <mesh position={[-0.2, 0.5, -0.3]} rotation={[0, 0, 0.5]}>
          <boxGeometry args={[0.05, 0.8, 0.05]} />
          <primitive object={accentMaterial} attach="material" />
        </mesh>
      </group>

      {/* Body Segments - Armored Plates */}
      {Array.from({ length: segments }).map((_, i) => (
        <group key={i} ref={(el) => (segmentRefs.current[i] = el!)}>
          {/* Main Segment Plate */}
          <mesh rotation={[0, Math.PI / 4, 0]}>
            <octahedronGeometry args={[0.8]} />
            <primitive object={armorMaterial} attach="material" />
          </mesh>
          {/* Accent Ring/Spine */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.6, 0.02, 8, 24]} />
            <primitive object={accentMaterial} attach="material" />
          </mesh>
          {/* Side Fins/Armor for upper body */}
          {i < 12 && (
            <group>
              <mesh position={[0, 0, 0.8]} rotation={[0.5, 0, 0]}>
                <boxGeometry args={[0.4, 0.1, 1.2]} />
                <primitive object={armorMaterial} attach="material" />
              </mesh>
              <mesh position={[0, 0, -0.8]} rotation={[-0.5, 0, 0]}>
                <boxGeometry args={[0.4, 0.1, 1.2]} />
                <primitive object={armorMaterial} attach="material" />
              </mesh>
            </group>
          )}
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
