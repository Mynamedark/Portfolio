import * as THREE from "three";
import { useRef, useMemo, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  Vector3, 
  Quaternion, 
  Group, 
} from "three";

if (typeof window !== "undefined") {
  (window as any).THREE = THREE;
}
import { Float, Sparkles, Instances, Instance } from "@react-three/drei";
import { useMobileDetection, shouldDisable3D } from "@/hooks/useMobileDetection";

// Professional Cyber-OSINT Background: Node Graph
function NodeGraph() {
  const count = 40;
  const nodes = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: new Vector3(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        -15 + (Math.random() - 0.5) * 10
      ),
      speed: Math.random() * 0.2 + 0.1,
    }));
  }, []);

  const linesRef = useRef<THREE.LineSegments>(null);

  useFrame((state) => {
    if (!linesRef.current) return;
    const time = state.clock.getElapsedTime();
    const positions = linesRef.current.geometry.attributes.position.array as Float32Array;
    
    let idx = 0;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dist = nodes[i].position.distanceTo(nodes[j].position);
        if (dist < 8) {
          positions[idx++] = nodes[i].position.x;
          positions[idx++] = nodes[i].position.y + Math.sin(time * nodes[i].speed) * 0.2;
          positions[idx++] = nodes[i].position.z;
          positions[idx++] = nodes[j].position.x;
          positions[idx++] = nodes[j].position.y + Math.sin(time * nodes[j].speed) * 0.2;
          positions[idx++] = nodes[j].position.z;
        }
      }
    }
    linesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count * count}
            array={new Float32Array(count * count * 3)}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#00FF95" transparent opacity={0.03} />
      </lineSegments>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#00FF95" transparent opacity={0.1} />
        </mesh>
      ))}
    </group>
  );
}

function HUDGrid() {
  return (
    <group position={[0, 0, -10]}>
      <gridHelper args={[100, 50, "#00C8FF", "#00C8FF"]} rotation={[Math.PI / 2, 0, 0]} transparent opacity={0.03} />
      <Sparkles count={30} scale={30} size={0.6} speed={0.1} color="#00C8FF" opacity={0.1} />
    </group>
  );
}

function CyberDragon() {
  const { mouse, viewport, camera } = useThree();
  const segments = 45; 
  const segmentRefs = useRef<Group[]>([]);
  const headRef = useRef<Group>(null);
  const jawRef = useRef<Group>(null);
  const leftWingRef = useRef<Group>(null);
  const rightWingRef = useRef<Group>(null);
  
  const positions = useMemo(() => Array.from({ length: segments }, () => new Vector3()), []);
  const rotations = useMemo(() => Array.from({ length: segments }, () => new Quaternion()), []);

  const [roarState, setRoarState] = useState(0); // 0: idle, 1: roaring, 2: done

  useEffect(() => {
    const timer = setTimeout(() => setRoarState(1), 500);
    const endTimer = setTimeout(() => setRoarState(2), 3500);
    return () => {
      clearTimeout(timer);
      clearTimeout(endTimer);
    };
  }, []);

  // Professional Mature Materials: Obsidian & Slate
  const armorMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#050505",
    metalness: 1,
    roughness: 0.15,
    envMapIntensity: 1,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    reflectivity: 1,
  }), []);

  const scaleMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#1a1a1a",
    metalness: 0.8,
    roughness: 0.4,
    flatShading: true,
  }), []);

  const accentMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#00FF95",
    emissive: "#00FF95",
    emissiveIntensity: 0.5,
    transparent: true,
    opacity: 0.4,
  }), []);

  const hornMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#111",
    metalness: 0.9,
    roughness: 0,
    transmission: 0.5,
    thickness: 1,
  }), []);

  const wingMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#000",
    metalness: 0.9,
    roughness: 0.2,
    transparent: true,
    opacity: 0.15,
    side: THREE.DoubleSide,
  }), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    const targetX = (mouse.x * viewport.width) / 2.5;
    const targetY = (mouse.y * viewport.height) / 2.5;
    
    // Roar Animation Logic
    let roarFactor = 0;
    if (roarState === 1) {
      const roarProgress = Math.min(1, (time - 0.5) / 2);
      roarFactor = Math.sin(roarProgress * Math.PI);
      
      // Camera shake during roar
      camera.position.x += (Math.random() - 0.5) * 0.05 * roarFactor;
      camera.position.y += (Math.random() - 0.5) * 0.05 * roarFactor;
      
      if (jawRef.current) {
        jawRef.current.rotation.x = -0.8 * roarFactor;
      }
      if (headRef.current) {
        headRef.current.position.z += 1.5 * roarFactor;
        headRef.current.rotation.x -= 0.3 * roarFactor;
      }
    } else {
      if (jawRef.current) {
        jawRef.current.rotation.x = THREE.MathUtils.lerp(jawRef.current.rotation.x, -0.1, 0.1);
      }
    }

    if (headRef.current) {
      headRef.current.position.x += (targetX - headRef.current.position.x) * 0.05;
      headRef.current.position.y += (targetY - headRef.current.position.y) * 0.05;
      headRef.current.position.z = THREE.MathUtils.lerp(headRef.current.position.z, Math.sin(time * 0.3) * 1.5, 0.05);
      
      const mouse3D = new Vector3(targetX * 1.5, targetY * 1.5, 10);
      headRef.current.lookAt(mouse3D);
    }

    if (leftWingRef.current && rightWingRef.current) {
      const flapSpeed = roarState === 1 ? 8 : 1.5;
      const flapAmp = roarState === 1 ? 0.8 : 0.3;
      const flap = Math.sin(time * flapSpeed) * flapAmp;
      leftWingRef.current.rotation.z = 0.5 + flap;
      rightWingRef.current.rotation.z = -0.5 - flap;
    }

    // Body follow logic
    positions[0].copy(headRef.current?.position || new Vector3());
    rotations[0].copy(headRef.current?.quaternion || new Quaternion());

    for (let i = 0; i < segments; i++) {
      const seg = segmentRefs.current[i];
      if (!seg) continue;
      
      if (i > 0) {
        const prevPos = positions[i - 1];
        const distance = 0.4;
        const dir = new Vector3().subVectors(prevPos, positions[i]).normalize();
        positions[i].copy(prevPos).sub(dir.multiplyScalar(distance));
        rotations[i].slerp(rotations[i - 1], 0.1);
        
        seg.position.copy(positions[i]);
        seg.quaternion.copy(rotations[i]);
        
        // Mature serpentine movement
        seg.position.y += Math.sin(time * 1.5 + i * 0.2) * 0.08;
        seg.position.x += Math.cos(time * 1.0 + i * 0.15) * 0.05;
      } else {
        seg.position.copy(positions[0]);
        seg.quaternion.copy(rotations[0]);
      }
      
      const scale = Math.max(0.05, (1 - i / segments) * 1.2);
      seg.scale.setScalar(scale);
    }
  });

  return (
    <group>
      {/* Mature Stylized Dragon Head */}
      <group ref={headRef}>
        {/* Armored Skull */}
        <mesh material={armorMaterial}>
          <icosahedronGeometry args={[0.7, 1]} />
        </mesh>
        {/* Snout */}
        <mesh position={[0, -0.1, 0.6]} material={armorMaterial}>
          <boxGeometry args={[0.5, 0.4, 0.9]} />
        </mesh>
        {/* Articulated Lower Jaw */}
        <group ref={jawRef} position={[0, -0.3, 0.4]}>
          <mesh position={[0, -0.05, 0.3]} material={armorMaterial}>
            <boxGeometry args={[0.45, 0.15, 0.8]} />
          </mesh>
        </group>
        {/* Obsidian Horns */}
        <mesh position={[0.3, 0.5, -0.2]} rotation={[-0.4, 0, 0.3]} material={hornMaterial}>
          <coneGeometry args={[0.1, 1.2, 5]} />
        </mesh>
        <mesh position={[-0.3, 0.5, -0.2]} rotation={[-0.4, 0, -0.3]} material={hornMaterial}>
          <coneGeometry args={[0.1, 1.2, 5]} />
        </mesh>
        {/* Subtle Glow Eyes */}
        <mesh position={[0.3, 0.2, 0.45]} material={accentMaterial}>
          <sphereGeometry args={[0.08, 16, 16]} />
        </mesh>
        <mesh position={[-0.3, 0.2, 0.45]} material={accentMaterial}>
          <sphereGeometry args={[0.08, 16, 16]} />
        </mesh>

        {/* Cinematic Wings */}
        <group position={[0, 0.3, -0.2]}>
          <group ref={leftWingRef} position={[0.4, 0, 0]}>
            <mesh position={[2, 0, -1]} rotation={[0.2, 0, 0]} material={wingMaterial}>
              <boxGeometry args={[4, 0.02, 3]} />
            </mesh>
          </group>
          <group ref={rightWingRef} position={[-0.4, 0, 0]}>
            <mesh position={[-2, 0, -1]} rotation={[0.2, 0, 0]} material={wingMaterial}>
              <boxGeometry args={[4, 0.02, 3]} />
            </mesh>
          </group>
        </group>
      </group>

      {/* Armored Body Segments */}
      {Array.from({ length: segments }).map((_, i) => (
        <group key={i} ref={(el) => (segmentRefs.current[i] = el!)}>
          {/* Faceted Scale Mesh */}
          <mesh material={scaleMaterial}>
            <icosahedronGeometry args={[0.6, 1]} />
          </mesh>
          {/* Spinal Spikes */}
          {i % 2 === 0 && (
            <mesh position={[0, 0.4, 0]} rotation={[0.2, 0, 0]} material={armorMaterial}>
              <coneGeometry args={[0.1, 0.6, 4]} />
            </mesh>
          )}
          {/* Faint Energy Ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.65, 0.01, 8, 32]} />
            <meshBasicMaterial color="#00FF95" transparent opacity={0.05} />
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
        className="fixed inset-0 z-0 bg-[#050505]"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #1a1a1a 0%, #050505 100%)`
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 2, 18], fov: 40 }}>
        {/* Cinematic Lighting */}
        <color attach="background" args={["#050505"]} />
        <ambientLight intensity={0.15} />
        
        {/* Rim Lighting */}
        <spotLight 
          position={[15, 20, -10]} 
          angle={0.3} 
          penumbra={1} 
          intensity={4} 
          color="#00C8FF" 
        />
        <spotLight 
          position={[-15, 20, -10]} 
          angle={0.3} 
          penumbra={1} 
          intensity={4} 
          color="#00FF95" 
        />
        
        {/* Key Light */}
        <pointLight position={[5, 5, 10]} intensity={1.5} color="#fff" />
        
        <fog attach="fog" args={["#050505", 10, 35]} />

        <Suspense fallback={null}>
          <NodeGraph />
          <HUDGrid />
          <CyberDragon />
        </Suspense>
      </Canvas>
    </div>
  );
}
