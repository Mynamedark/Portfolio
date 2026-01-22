import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Suspense } from "react";

function DragonSegment({ position, scale, color }: { position: THREE.Vector3, scale: number, color: string }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0.1} metalness={0.8} />
    </mesh>
  );
}

function Dragon() {
  const { mouse, viewport } = useThree();
  const segments = 20;
  const segmentRefs = useRef<THREE.Group[]>([]);
  const headRef = useRef<THREE.Group>(null);
  
  const segmentPositions = useMemo(() => {
    return Array.from({ length: segments }, () => new THREE.Vector3());
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Target position based on mouse
    const targetX = (mouse.x * viewport.width) / 2;
    const targetY = (mouse.y * viewport.height) / 2;
    
    // Move head
    if (headRef.current) {
      headRef.current.position.x += (targetX - headRef.current.position.x) * 0.1;
      headRef.current.position.y += (targetY - headRef.current.position.y) * 0.1;
      headRef.current.position.z = Math.sin(time) * 0.5;
      
      // Look at direction
      const lookAtTarget = new THREE.Vector3(targetX, targetY, 0);
      headRef.current.lookAt(lookAtTarget);
    }

    // Move body segments
    for (let i = 0; i < segments; i++) {
      const seg = segmentRefs.current[i];
      if (!seg) continue;
      
      const prevPos = i === 0 ? headRef.current!.position : segmentRefs.current[i - 1].position;
      
      // Smooth follow
      seg.position.x += (prevPos.x - seg.position.x) * 0.2;
      seg.position.y += (prevPos.y - seg.position.y) * 0.2;
      seg.position.z += (prevPos.z - seg.position.z) * 0.2;
      
      // Add some undulation
      seg.position.y += Math.sin(time * 2 + i * 0.5) * 0.02;
      
      // Scale based on position in body
      const s = Math.max(0.2, (1 - i / segments) * 0.8);
      seg.scale.setScalar(s);
      
      // Rotation
      seg.lookAt(prevPos);
    }
  });

  return (
    <group>
      {/* Head */}
      <group ref={headRef}>
        <mesh>
          <coneGeometry args={[0.6, 1.2, 8]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#00C8FF" emissive="#00C8FF" emissiveIntensity={1} />
        </mesh>
        {/* Eyes */}
        <mesh position={[0.2, 0.2, 0.4]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial color="#FF0000" />
        </mesh>
        <mesh position={[-0.2, 0.2, 0.4]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial color="#FF0000" />
        </mesh>
      </group>

      {/* Body segments */}
      {Array.from({ length: segments }).map((_, i) => (
        <group key={i} ref={(el) => (segmentRefs.current[i] = el!)}>
          <mesh>
            <sphereGeometry args={[1, 12, 12]} />
            <meshStandardMaterial 
              color={i % 2 === 0 ? "#00C8FF" : "#00FF95"} 
              emissive={i % 2 === 0 ? "#00C8FF" : "#00FF95"}
              emissiveIntensity={0.3}
              roughness={0.2}
              metalness={0.7}
            />
          </mesh>
          {/* Spikes/Wings on some segments */}
          {i < 10 && i > 2 && (
            <group>
               <mesh position={[1, 0, 0]} rotation={[0, 0, Math.PI/4]}>
                <boxGeometry args={[1.5, 0.1, 0.8]} />
                <meshStandardMaterial color="#00C8FF" transparent opacity={0.6} />
              </mesh>
              <mesh position={[-1, 0, 0]} rotation={[0, 0, -Math.PI/4]}>
                <boxGeometry args={[1.5, 0.1, 0.8]} />
                <meshStandardMaterial color="#00C8FF" transparent opacity={0.6} />
              </mesh>
            </group>
          )}
        </group>
      ))}
    </group>
  );
}

export function Dragon3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <Suspense fallback={null}>
          <Dragon />
        </Suspense>
      </Canvas>
    </div>
  );
}
