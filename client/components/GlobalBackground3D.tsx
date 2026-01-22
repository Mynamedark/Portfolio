import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  InstancedMesh,
  Object3D,
  Color,
  AdditiveBlending,
  Fog,
  Vector3,
  Group,
  Points,
  MathUtils,
  Blending,
} from "three";
import {
  useMobileDetection,
  shouldDisable3D,
} from "@/hooks/useMobileDetection";
import { createScrollThrottle } from "@/lib/utils/throttle";
import { webglManager } from "@/lib/three/webgl-manager";

export type BackgroundVariant =
  | "threat-intel-globe"
  | "digital-network-mesh"
  | "data-streams"
  | "cyber-matrix"
  | "security-lattice"
  | "signal-scanning"
  | "recon-spiral"
  | "traffic-flow"
  | "encryption-vortex"
  | "osint-node-network";

interface ThemeColors {
  line: string;
  particle: string;
  highlight: string;
  fogNear: number;
  fogFar: number;
  blending: Blending;
}

function cssVarHsl(name: string): string {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return "#000000";
  }
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  if (!raw) return "#000000";
  const parts = raw.split(/\s+/);
  if (parts.length >= 3) {
    return `hsl(${parts[0]}, ${parts[1]}, ${parts[2]})`;
  }
  return `hsl(${raw})`;
}

function useThemeColors(): ThemeColors {
  return useMemo(
    () => ({
      line: cssVarHsl("--primary"),
      particle: cssVarHsl("--secondary") || cssVarHsl("--primary"),
      highlight: cssVarHsl("--accent") || "#00ff00",
      fogNear: 8,
      fogFar: 22,
      blending: AdditiveBlending,
    }),
    [],
  );
}

function CameraRig({ variant }: { variant: BackgroundVariant }) {
  const { camera } = useThree();
  const scrollRef = useRef(0);

  useEffect(() => {
    const { handle, destroy } = createScrollThrottle((scrollY) => {
      scrollRef.current = scrollY;
    });

    const onScroll = () => handle(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      destroy();
    };
  }, []);

  useFrame((state) => {
    const t = Math.min(scrollRef.current / window.innerHeight, 2);
    const mouseX = state.mouse.x;
    const mouseY = state.mouse.y;

    if (variant === "data-streams") {
      const targetZ = 12 + t * 8;
      const targetY = 1.5 + t * 3 + mouseY * 1.5;
      const targetX = mouseX * 1.5;
      camera.position.z += (targetZ - camera.position.z) * 0.03;
      camera.position.y += (targetY - camera.position.y) * 0.03;
      camera.position.x += (targetX - camera.position.x) * 0.03;
      camera.lookAt(0, 0, 0);
    } else {
      const targetZ = 16 + t * 6;
      camera.position.z += (targetZ - camera.position.z) * 0.05;
      camera.position.x += (mouseX * 4 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 4 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);
    }
  });

  return null;
}

// --- THREAT INTEL GLOBE ---
function ThreatIntelGlobe() {
  const groupRef = useRef<Group>(null);
  const theme = useThemeColors();
  const particleColor = useMemo(() => new Color(theme.particle), [theme.particle]);
  const lineColor = useMemo(() => new Color(theme.line), [theme.line]);
  const highlightColor = useMemo(() => new Color(theme.highlight), [theme.highlight]);

  const { points, lines } = useMemo(() => {
    const count = 300;
    const radius = 6;
    const pts: Vector3[] = [];
    const linePositions: number[] = [];

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      pts.push(new Vector3(x, y, z));
    }

    pts.forEach((p1, i) => {
      pts.forEach((p2, j) => {
        if (i >= j) return;
        if (p1.distanceTo(p2) < 1.6) {
          linePositions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
        }
      });
    });

    return { points: pts, lines: new Float32Array(linePositions) };
  }, []);

  const nodesRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = time * 0.1;
    groupRef.current.rotation.x = Math.sin(time * 0.05) * 0.1;

    if (nodesRef.current) {
      points.forEach((pt, i) => {
        const pulse = 1 + Math.sin(time * 1.5 + i * 0.1) * 0.15;
        dummy.position.copy(pt);
        dummy.scale.setScalar(0.06 * pulse);
        dummy.updateMatrix();
        nodesRef.current!.setMatrixAt(i, dummy.matrix);
      });
      nodesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={nodesRef} args={[undefined, undefined, points.length]}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshBasicMaterial color={particleColor} transparent opacity={0.6} blending={theme.blending} />
      </instancedMesh>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={lineColor} transparent opacity={0.15} blending={theme.blending} />
      </lineSegments>

      {/* Scanning Rings */}
      <group rotation={[Math.PI / 3, 0, 0]}>
        <mesh>
          <ringGeometry args={[6.5, 6.55, 64]} />
          <meshBasicMaterial color={highlightColor} transparent opacity={0.4} side={2} blending={theme.blending} />
        </mesh>
      </group>
      <group rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <mesh>
          <ringGeometry args={[7.2, 7.23, 64]} />
          <meshBasicMaterial color={lineColor} transparent opacity={0.2} side={2} blending={theme.blending} />
        </mesh>
      </group>
    </group>
  );
}

// --- DIGITAL NETWORK MESH ---
function DigitalNetworkMesh() {
  const groupRef = useRef<Group>(null);
  const theme = useThemeColors();
  const particleColor = useMemo(() => new Color(theme.particle), [theme.particle]);
  const lineColor = useMemo(() => new Color(theme.line), [theme.line]);

  const { points, lines } = useMemo(() => {
    const count = 150;
    const range = 20;
    const pts: Vector3[] = [];
    const linePositions: number[] = [];

    for (let i = 0; i < count; i++) {
      pts.push(new Vector3(MathUtils.randFloatSpread(range), MathUtils.randFloatSpread(range), MathUtils.randFloatSpread(range)));
    }

    pts.forEach((p1, i) => {
      pts.forEach((p2, j) => {
        if (i >= j) return;
        const dist = p1.distanceTo(p2);
        if (dist < 4) {
          linePositions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
        }
      });
    });

    return { points: pts, lines: new Float32Array(linePositions) };
  }, []);

  const nodesRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = time * 0.04;
    groupRef.current.rotation.x = time * 0.02;

    if (nodesRef.current) {
      points.forEach((pt, i) => {
        const offset = Math.sin(time * 0.5 + i) * 0.2;
        dummy.position.set(pt.x, pt.y + offset, pt.z);
        dummy.scale.setScalar(0.05);
        dummy.updateMatrix();
        nodesRef.current!.setMatrixAt(i, dummy.matrix);
      });
      nodesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={nodesRef} args={[undefined, undefined, points.length]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={particleColor} transparent opacity={0.5} blending={theme.blending} />
      </instancedMesh>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={lineColor} transparent opacity={0.1} blending={theme.blending} />
      </lineSegments>
    </group>
  );
}

// --- DATA STREAMS ---
function DataStreams() {
  const groupRef = useRef<Group>(null);
  const theme = useThemeColors();
  const lineColor = useMemo(() => new Color(theme.line), [theme.line]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.position.z = (time * 8) % 15;
  });

  return (
    <group ref={groupRef}>
      <gridHelper args={[80, 40, lineColor, lineColor]} position={[0, -6, -20]} transparent opacity={0.2} />
      <gridHelper args={[80, 40, lineColor, lineColor]} position={[0, 6, -20]} transparent opacity={0.2} />
      <FloatingData count={200} speed={0.8} range={30} />
    </group>
  );
}

// --- CYBER MATRIX ---
function CyberMatrix() {
  const meshRef = useRef<InstancedMesh>(null);
  const theme = useThemeColors();
  const highlightColor = useMemo(() => new Color(theme.highlight), [theme.highlight]);

  const gridSize = 6;
  const nodeCount = gridSize * gridSize * gridSize;
  const dummy = useMemo(() => new Object3D(), []);

  const positions = useMemo(() => {
    const pos = [];
    const spacing = 4;
    const offset = ((gridSize - 1) * spacing) / 2;
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        for (let z = 0; z < gridSize; z++) {
          pos.push(new Vector3(x * spacing - offset, y * spacing - offset, z * spacing - offset));
        }
      }
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    positions.forEach((pt, i) => {
      const pulse = Math.sin(time * 2 + i * 0.1) * 0.5 + 0.5;
      dummy.position.copy(pt);
      dummy.scale.setScalar(0.2 * pulse);
      dummy.rotation.set(time * 0.5, time * 0.3, 0);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, nodeCount]}>
      <octahedronGeometry args={[1]} />
      <meshBasicMaterial color={highlightColor} transparent opacity={0.4} blending={theme.blending} />
    </instancedMesh>
  );
}

// --- SECURITY LATTICE ---
function SecurityLattice() {
  const groupRef = useRef<Group>(null);
  const theme = useThemeColors();
  const particleColor = useMemo(() => new Color(theme.particle), [theme.particle]);
  const lineColor = useMemo(() => new Color(theme.line), [theme.line]);

  const { points, lines } = useMemo(() => {
    const count = 40;
    const pts: Vector3[] = [];
    const linePositions: number[] = [];
    for (let i = 0; i < count; i++) {
      const y = (i - count / 2) * 0.6;
      const angle = i * 0.4;
      const r = 3;
      const p1 = new Vector3(Math.cos(angle) * r, y, Math.sin(angle) * r);
      const p2 = new Vector3(Math.cos(angle + Math.PI) * r, y, Math.sin(angle + Math.PI) * r);
      pts.push(p1, p2);
      linePositions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
      if (i > 0) {
        const prev1 = pts[pts.length - 4];
        const prev2 = pts[pts.length - 3];
        linePositions.push(p1.x, p1.y, p1.z, prev1.x, prev1.y, prev1.z);
        linePositions.push(p2.x, p2.y, p2.z, prev2.x, prev2.y, prev2.z);
      }
    }
    return { points: pts, lines: new Float32Array(linePositions) };
  }, []);

  const nodesRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = time * 0.3;
    groupRef.current.rotation.z = Math.PI / 8;

    if (nodesRef.current) {
      points.forEach((pt, i) => {
        dummy.position.copy(pt);
        dummy.scale.setScalar(0.12);
        dummy.updateMatrix();
        nodesRef.current!.setMatrixAt(i, dummy.matrix);
      });
      nodesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={nodesRef} args={[undefined, undefined, points.length]}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshBasicMaterial color={particleColor} transparent opacity={0.8} blending={theme.blending} />
      </instancedMesh>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={lineColor} transparent opacity={0.3} blending={theme.blending} />
      </lineSegments>
    </group>
  );
}

// --- SIGNAL SCANNING ---
function SignalScanning() {
  const groupRef = useRef<Group>(null);
  const theme = useThemeColors();
  const lineColor = useMemo(() => new Color(theme.line), [theme.line]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.z = time * 0.2;
  });

  return (
    <group ref={groupRef}>
      {[2, 4, 6, 8].map((r, i) => (
        <mesh key={i}>
          <ringGeometry args={[r, r + 0.05, 64]} />
          <meshBasicMaterial color={lineColor} transparent opacity={0.4 - i * 0.1} side={2} />
        </mesh>
      ))}
      <FloatingData count={100} speed={0.4} />
    </group>
  );
}

// --- RECON SPIRAL ---
function ReconSpiral() {
  const groupRef = useRef<Group>(null);
  const theme = useThemeColors();
  const particleColor = useMemo(() => new Color(theme.particle), [theme.particle]);

  const { points, lines } = useMemo(() => {
    const pts = [];
    const linePos = [];
    const count = 200;
    for (let i = 0; i < count; i++) {
      const t = i / 20;
      const angle = i * 0.2;
      const r = 2 + t;
      const x = Math.cos(angle) * r;
      const y = t * 1.5 - 7;
      const z = Math.sin(angle) * r;
      pts.push(new Vector3(x, y, z));
      if (i > 0) linePos.push(pts[i - 1].x, pts[i - 1].y, pts[i - 1].z, x, y, z);
    }
    return { points: pts, lines: new Float32Array(linePos) };
  }, []);

  const nodesRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    if (nodesRef.current) {
      points.forEach((pt, i) => {
        dummy.position.copy(pt);
        dummy.scale.setScalar(0.08);
        dummy.updateMatrix();
        nodesRef.current!.setMatrixAt(i, dummy.matrix);
      });
      nodesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={nodesRef} args={[undefined, undefined, points.length]}>
        <sphereGeometry args={[1, 4, 4]} />
        <meshBasicMaterial color={particleColor} transparent opacity={0.6} blending={theme.blending} />
      </instancedMesh>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={theme.line} transparent opacity={0.2} />
      </lineSegments>
    </group>
  );
}

// --- TRAFFIC FLOW ---
function TrafficFlow() {
  const meshRef = useRef<InstancedMesh>(null);
  const theme = useThemeColors();
  const dummy = useMemo(() => new Object3D(), []);
  const count = 300;
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: MathUtils.randFloatSpread(40),
      y: MathUtils.randFloatSpread(20),
      z: MathUtils.randFloatSpread(20),
      s: Math.random() * 0.05 + 0.02
    }));
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    particles.forEach((p, i) => {
      p.x += p.s * 2;
      if (p.x > 20) p.x = -20;
      dummy.position.set(p.x, p.y + Math.sin(time + p.x * 0.2) * 0.5, p.z);
      dummy.scale.setScalar(0.06);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 0.2, 0.2]} />
      <meshBasicMaterial color={theme.particle} transparent opacity={0.5} blending={theme.blending} />
    </instancedMesh>
  );
}

// --- ENCRYPTION VORTEX ---
function EncryptionVortex() {
  const meshRef = useRef<InstancedMesh>(null);
  const theme = useThemeColors();
  const dummy = useMemo(() => new Object3D(), []);
  const count = 400;
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      r: Math.random() * 10 + 2,
      a: Math.random() * Math.PI * 2,
      h: MathUtils.randFloatSpread(15),
      s: Math.random() * 0.4 + 0.2
    }));
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    particles.forEach((p, i) => {
      const angle = p.a + time * p.s;
      dummy.position.set(Math.cos(angle) * p.r, p.h + Math.sin(time * 0.5 + i) * 1, Math.sin(angle) * p.r);
      dummy.scale.setScalar(0.08);
      dummy.rotation.set(angle, time, 0);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <tetrahedronGeometry args={[1]} />
      <meshBasicMaterial color={theme.particle} wireframe transparent opacity={0.4} blending={theme.blending} />
    </instancedMesh>
  );
}

// --- OSINT NODE NETWORK ---
function OSINTNodeNetwork() {
  const groupRef = useRef<Group>(null);
  const theme = useThemeColors();
  const particleColor = useMemo(() => new Color(theme.particle), [theme.particle]);
  const lineColor = useMemo(() => new Color(theme.line), [theme.line]);
  const highlightColor = useMemo(() => new Color(theme.highlight), [theme.highlight]);

  const { points, lines } = useMemo(() => {
    const count = 200;
    const pts: Vector3[] = [];
    const linePositions: number[] = [];
    
    // Create clusters of data
    for (let c = 0; c < 5; c++) {
      const clusterCenter = new Vector3(
        MathUtils.randFloatSpread(15),
        MathUtils.randFloatSpread(10),
        MathUtils.randFloatSpread(10)
      );
      for (let i = 0; i < count / 5; i++) {
        const pt = new Vector3(
          clusterCenter.x + MathUtils.randFloatSpread(4),
          clusterCenter.y + MathUtils.randFloatSpread(4),
          clusterCenter.z + MathUtils.randFloatSpread(4)
        );
        pts.push(pt);
      }
    }

    pts.forEach((p1, i) => {
      // Connect to nearby points in the same cluster
      pts.forEach((p2, j) => {
        if (i >= j) return;
        const dist = p1.distanceTo(p2);
        if (dist < 2.5) {
          linePositions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
        }
      });
      
      // Random long-distance connections (cross-referencing data)
      if (Math.random() > 0.99) {
        const target = pts[Math.floor(Math.random() * pts.length)];
        linePositions.push(p1.x, p1.y, p1.z, target.x, target.y, target.z);
      }
    });

    return { points: pts, lines: new Float32Array(linePositions) };
  }, []);

  const nodesRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = time * 0.05;

    if (nodesRef.current) {
      points.forEach((pt, i) => {
        const pulse = 1 + Math.sin(time * 2 + i) * 0.2;
        dummy.position.copy(pt);
        dummy.scale.setScalar(0.04 * pulse);
        dummy.updateMatrix();
        nodesRef.current!.setMatrixAt(i, dummy.matrix);
      });
      nodesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={nodesRef} args={[undefined, undefined, points.length]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color={highlightColor} transparent opacity={0.6} blending={theme.blending} />
      </instancedMesh>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={lineColor} transparent opacity={0.1} blending={theme.blending} />
      </lineSegments>
    </group>
  );
}

// --- COMMON FLOATING DATA ---
function FloatingData({ count = 200, speed = 0.02, range = 40 }: { count?: number; speed?: number; range?: number }) {
  const theme = useThemeColors();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = MathUtils.randFloatSpread(range);
      pos[i * 3 + 1] = MathUtils.randFloatSpread(range);
      pos[i * 3 + 2] = MathUtils.randFloatSpread(range / 2);
    }
    return pos;
  }, [count, range]);

  const pointsRef = useRef<Points>(null);
  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    pointsRef.current.position.y = -(time * speed * 3) % (range / 2);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color={theme.particle} transparent opacity={0.3} depthWrite={false} blending={AdditiveBlending} />
    </points>
  );
}

function Scene({ variant }: { variant: BackgroundVariant }) {
  const theme = useThemeColors();
  const { scene, gl } = useThree();

  useEffect(() => {
    webglManager.registerScene("global-background", scene);
    webglManager.registerRenderer("global-background", gl);
  }, [scene, gl]);

  useEffect(() => {
    scene.fog = new Fog(cssVarHsl("--background"), theme.fogNear, theme.fogFar);
  }, [scene, theme]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 10, 6]} intensity={0.6} />

      {variant === "threat-intel-globe" && <ThreatIntelGlobe />}
      {variant === "digital-network-mesh" && <DigitalNetworkMesh />}
      {variant === "data-streams" && <DataStreams />}
      {variant === "cyber-matrix" && <CyberMatrix />}
      {variant === "security-lattice" && <SecurityLattice />}
      {variant === "signal-scanning" && <SignalScanning />}
      {variant === "recon-spiral" && <ReconSpiral />}
        {variant === "traffic-flow" && <TrafficFlow />}
        {variant === "encryption-vortex" && <EncryptionVortex />}
        {variant === "osint-node-network" && <OSINTNodeNetwork />}

        <FloatingData count={120} />
      <CameraRig variant={variant} />
    </>
  );
}

interface GlobalBackground3DProps {
  variant?: BackgroundVariant;
}

export function GlobalBackground3D({ variant = "threat-intel-globe" }: GlobalBackground3DProps) {
  const capabilities = useMobileDetection();
  const disable3D = shouldDisable3D(capabilities);

  useEffect(() => {
    return () => {
      webglManager.disposePage("global-background");
    };
  }, []);

  if (disable3D) {
    return (
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-background" />
    );
  }

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 18], fov: 45 }} gl={{ antialias: true, powerPreference: "high-performance" }}>
        <Suspense fallback={null}>
          <Scene variant={variant} />
        </Suspense>
      </Canvas>
    </div>
  );
}
