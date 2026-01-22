import * as THREE from "three";
import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  Vector3, 
  Quaternion, 
  Group, 
} from "three";

if (typeof window !== "undefined") {
  (window as any).THREE = THREE;
}
import { Float, Sparkles } from "@react-three/drei";
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
  const segments = 40; 
  const segmentRefs = useRef<Group[]>([]);
  const headRef = useRef<Group>(null);
  const leftWingRef = useRef<Group>(null);
  const rightWingRef = useRef<Group>(null);
  
  const positions = useMemo(() => Array.from({ length: segments }, () => new Vector3()), []);
  const rotations = useMemo(() => Array.from({ length: segments }, () => new Quaternion()), []);

  // Modern Iridescent/Glass Materials
  const armorMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#111",
    metalness: 0.9,
    roughness: 0.1,
    transmission: 0.4,
    thickness: 1.5,
    iridescence: 1,
    iridescenceIOR: 1.3,
    clearcoat: 1,
  }), []);

  const accentMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#00FF95",
    emissive: "#00FF95",
    emissiveIntensity: 3.0,
    transparent: true,
    opacity: 0.9,
  }), []);

  const crystalMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#00C8FF",
    emissive: "#00C8FF",
    emissiveIntensity: 0.8,
    metalness: 0.2,
    roughness: 0,
    transmission: 0.9,
    thickness: 2,
    ior: 2.4,
  }), []);

  const wingMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#00C8FF",
    emissive: "#00C8FF",
    emissiveIntensity: 0.2,
    transparent: true,
    opacity: 0.4,
    side: THREE.DoubleSide,
    transmission: 0.8,
    thickness: 0.5
  }), []);

    useFrame((state) => {
      const time = state.clock.getElapsedTime();
      
      const targetX = (mouse.x * viewport.width) / 2;
      const targetY = (mouse.y * viewport.height) / 2;
      
      if (headRef.current) {
        // Smooth tracking with "organic" lag
        headRef.current.position.x += (targetX - headRef.current.position.x) * 0.08;
        headRef.current.position.y += (targetY - headRef.current.position.y) * 0.08;
        headRef.current.position.z = Math.sin(time * 0.4) * 2;
        
        // Face the mouse pointer directly
        const mouse3D = new Vector3(targetX, targetY, 15);
        headRef.current.lookAt(mouse3D);
        
        // Fluid idle movement
        headRef.current.rotation.z += Math.sin(time * 1.2) * 0.03;
      }

      if (leftWingRef.current && rightWingRef.current) {
        const flap = Math.sin(time * 3) * 0.6;
        leftWingRef.current.rotation.y = flap;
        rightWingRef.current.rotation.y = -flap;
      }

      positions[0].copy(headRef.current?.position || new Vector3());
      rotations[0].copy(headRef.current?.quaternion || new Quaternion());

      for (let i = 0; i < segments; i++) {
        const seg = segmentRefs.current[i];
        if (!seg) continue;
        
        if (i > 0) {
          const prevPos = positions[i - 1];
          const distance = 0.45;
          
          const dir = new Vector3().subVectors(prevPos, positions[i]).normalize();
          positions[i].copy(prevPos).sub(dir.multiplyScalar(distance));
          rotations[i].slerp(rotations[i - 1], 0.15);
          
          seg.position.copy(positions[i]);
          seg.quaternion.copy(rotations[i]);
          
          // Organic undulation
          seg.position.y += Math.sin(time * 2.5 + i * 0.4) * 0.15;
          seg.position.x += Math.cos(time * 1.5 + i * 0.3) * 0.1;
        } else {
          seg.position.copy(positions[0]);
          seg.quaternion.copy(rotations[0]);
        }
        
        // Tapered neck for visibility
        const neckTaper = i < 6 ? (i / 6) : 1;
        const scale = Math.max(0.1, (1 - i / segments) * 1.4 * neckTaper);
        seg.scale.setScalar(scale);
      }
    });

  return (
    <group>
      {/* Modern Faceted Dragon Head */}
      <group ref={headRef}>
        {/* Prismatic Skull */}
        <mesh>
          <icosahedronGeometry args={[0.8, 1]} />
          <primitive object={armorMaterial} attach="material" />
        </mesh>
        {/* Articulated Snout */}
        <mesh position={[0, -0.15, 0.8]}>
          <boxGeometry args={[0.6, 0.5, 1.2]} />
          <primitive object={armorMaterial} attach="material" />
        </mesh>
        {/* Sharp Lower Jaw */}
        <mesh position={[0, -0.4, 0.7]} rotation={[-0.15, 0, 0]}>
          <boxGeometry args={[0.5, 0.25, 1.0]} />
          <primitive object={armorMaterial} attach="material" />
        </mesh>
        {/* Radiant Eyes */}
        <mesh position={[0.35, 0.25, 0.6]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <primitive object={accentMaterial} attach="material" />
        </mesh>
        <mesh position={[-0.35, 0.25, 0.6]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <primitive object={accentMaterial} attach="material" />
        </mesh>
        {/* Crystal Horns */}
        <mesh position={[0.4, 0.6, -0.2]} rotation={[-0.5, 0, 0.4]}>
          <coneGeometry args={[0.12, 1.4, 6]} />
          <primitive object={crystalMaterial} attach="material" />
        </mesh>
        <mesh position={[-0.4, 0.6, -0.2]} rotation={[-0.5, 0, -0.4]}>
          <coneGeometry args={[0.12, 1.4, 6]} />
          <primitive object={crystalMaterial} attach="material" />
        </mesh>

        {/* Energy Wings */}
        <group position={[0, 0.2, -0.3]}>
          <group ref={leftWingRef} position={[0.4, 0, 0]}>
            <mesh position={[1.8, 0, -0.5]} rotation={[0, 0, 0.1]}>
              <boxGeometry args={[3.5, 0.01, 2.5]} />
              <primitive object={wingMaterial} attach="material" />
            </mesh>
            {/* Wing Structural Ribs */}
            <mesh position={[1.8, 0.05, -0.5]}>
              <boxGeometry args={[3.5, 0.05, 0.05]} />
              <primitive object={accentMaterial} attach="material" />
            </mesh>
          </group>
          <group ref={rightWingRef} position={[-0.4, 0, 0]}>
            <mesh position={[-1.8, 0, -0.5]} rotation={[0, 0, -0.1]}>
              <boxGeometry args={[3.5, 0.01, 2.5]} />
              <primitive object={wingMaterial} attach="material" />
            </mesh>
            <mesh position={[-1.8, 0.05, -0.5]}>
              <boxGeometry args={[3.5, 0.05, 0.05]} />
              <primitive object={accentMaterial} attach="material" />
            </mesh>
          </group>
        </group>
      </group>

      {/* Modern Armored Body Segments */}
      {Array.from({ length: segments }).map((_, i) => (
        <group key={i} ref={(el) => (segmentRefs.current[i] = el!)}>
          {/* Faceted Segment */}
          <mesh>
            <icosahedronGeometry args={[0.7, 1]} />
            <primitive object={armorMaterial} attach="material" />
          </mesh>
          {/* Prismatic Spikes */}
          <mesh position={[0, 0.5, 0]} rotation={[Math.PI / 4, 0, 0]}>
            <coneGeometry args={[0.15, 0.7, 4]} />
            <primitive object={crystalMaterial} attach="material" />
          </mesh>
          {/* Energy Core Ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.75, 0.03, 12, 48]} />
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
    <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        {/* Advanced Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#00C8FF" />
        <spotLight 
          position={[-10, 25, 10]} 
          angle={0.2} 
          penumbra={1} 
          intensity={3} 
          color="#00FF95"
        />
        <rectAreaLight
          width={25}
          height={25}
          intensity={1}
          position={[0, 0, -8]}
          color="#00C8FF"
        />

        <fog attach="fog" args={["#0a0f1f", 8, 28]} />

        <Suspense fallback={null}>
          <HUDGrid />
          <ScanningLines />
          <CyberDragon />
        </Suspense>
      </Canvas>
    </div>
  );
}
