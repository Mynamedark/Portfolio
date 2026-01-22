import * as THREE from "three";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

if (typeof window !== "undefined") {
  (window as any).THREE = THREE;
}
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
  Quaternion,
  MeshStandardMaterial,
  Mesh,
} from "three";
import {
  useMobileDetection,
  shouldDisable3D,
} from "@/hooks/useMobileDetection";
import { createScrollThrottle } from "@/lib/utils/throttle";
import { webglManager } from "@/lib/three/webgl-manager";
import { Sparkles } from "@react-three/drei";

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
  | "osint-node-network"
  | "cyber-dragon";

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
    const count = 400; // Increased count
    const radius = 6.5;
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
      // Connect to geographic neighbors
      pts.forEach((p2, j) => {
        if (i >= j) return;
        const dist = p1.distanceTo(p2);
        if (dist < 1.8) {
          linePositions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
        }
      });
      
      // Long distance "intelligence links"
      if (i % 40 === 0) {
        const target = pts[(i + count / 2) % count];
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
    groupRef.current.rotation.y = time * 0.15; // Slower, subtle rotation
    groupRef.current.rotation.x = Math.sin(time * 0.05) * 0.1;

    if (nodesRef.current) {
      points.forEach((pt, i) => {
        const pulse = 1 + Math.sin(time * 2 + i * 0.1) * 0.2;
        dummy.position.copy(pt);
        dummy.scale.setScalar(0.05 * pulse);
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
        <meshBasicMaterial color={highlightColor} transparent opacity={0.5} blending={theme.blending} />
      </instancedMesh>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={lineColor} transparent opacity={0.12} blending={theme.blending} />
      </lineSegments>

      {/* Lat/Long Grid Lines */}
      {[0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4].map((rot, i) => (
        <group key={i} rotation={[0, rot, 0]}>
          <mesh>
            <ringGeometry args={[6.48, 6.52, 64]} />
            <meshBasicMaterial color={lineColor} transparent opacity={0.05} side={2} />
          </mesh>
        </group>
      ))}

      {/* Scanning Rings / Orbitals */}
      <group rotation={[Math.PI / 3, 0, 0]}>
        <mesh>
          <ringGeometry args={[7.0, 7.05, 64]} />
          <meshBasicMaterial color={highlightColor} transparent opacity={0.2} side={2} blending={theme.blending} />
        </mesh>
      </group>
      <group rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <mesh>
          <ringGeometry args={[7.8, 7.82, 64]} />
          <meshBasicMaterial color={lineColor} transparent opacity={0.1} side={2} blending={theme.blending} />
        </mesh>
      </group>
      
      {/* Grid Floor for depth */}
      <gridHelper args={[40, 20, lineColor, lineColor]} position={[0, -8, 0]} transparent opacity={0.05} />
    </group>
  );
}

// --- DIGITAL NETWORK MESH ---
function DigitalNetworkMesh() {
  const groupRef = useRef<Group>(null);
  const theme = useThemeColors();
  const particleColor = useMemo(() => new Color(theme.particle), [theme.particle]);
  const lineColor = useMemo(() => new Color(theme.line), [theme.line]);
  const highlightColor = useMemo(() => new Color(theme.highlight), [theme.highlight]);

  const { points, lines } = useMemo(() => {
    const count = 180;
    const range = 24;
    const pts: Vector3[] = [];
    const linePositions: number[] = [];

    for (let i = 0; i < count; i++) {
      pts.push(new Vector3(MathUtils.randFloatSpread(range), MathUtils.randFloatSpread(range * 0.8), MathUtils.randFloatSpread(range * 0.5)));
    }

    pts.forEach((p1, i) => {
      pts.forEach((p2, j) => {
        if (i >= j) return;
        const dist = p1.distanceTo(p2);
        if (dist < 4.5) {
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
    groupRef.current.rotation.y = time * 0.03;
    groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.05;

    if (nodesRef.current) {
      points.forEach((pt, i) => {
        // Individual node pulsing
        const pulse = 1 + Math.sin(time * 1.5 + i * 0.5) * 0.3;
        const offset = Math.sin(time * 0.4 + i) * 0.1;
        dummy.position.set(pt.x, pt.y + offset, pt.z);
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
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color={highlightColor} transparent opacity={0.6} blending={theme.blending} />
      </instancedMesh>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={lineColor} transparent opacity={0.12} blending={theme.blending} />
      </lineSegments>
      
      <FloatingData count={150} speed={0.05} range={30} />
    </group>
  );
}

// --- DATA STREAMS ---
function DataStreams() {
  const groupRef = useRef<Group>(null);
  const theme = useThemeColors();
  const lineColor = useMemo(() => new Color(theme.line), [theme.line]);
  const highlightColor = useMemo(() => new Color(theme.highlight), [theme.highlight]);

  const count = 40;
  const streams = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: MathUtils.randFloatSpread(40),
      y: MathUtils.randFloatSpread(20),
      z: MathUtils.randFloatSpread(20),
      speed: Math.random() * 0.15 + 0.05,
      length: Math.random() * 10 + 5,
    }));
  }, []);

  const meshRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    streams.forEach((s, i) => {
      // Diagonal motion
      const offset = (time * s.speed * 20) % 60;
      dummy.position.set(s.x + offset - 30, s.y - offset + 30, s.z);
      dummy.scale.set(0.05, s.length, 0.05);
      dummy.rotation.set(0, 0, Math.PI / 4); // Diagonal
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={highlightColor} transparent opacity={0.2} blending={theme.blending} />
      </instancedMesh>
      
      <gridHelper args={[80, 40, lineColor, lineColor]} position={[0, -10, -10]} rotation={[Math.PI / 4, 0, 0]} transparent opacity={0.05} />
      
      <FloatingData count={100} speed={0.1} />
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
  const sweepRef = useRef<Mesh>(null);
  const theme = useThemeColors();
  const highlightColor = useMemo(() => new Color(theme.highlight), [theme.highlight]);
  const lineColor = useMemo(() => new Color(theme.line), [theme.line]);

  const dotCount = 12;
  const dots = useMemo(() => {
    return Array.from({ length: dotCount }, () => ({
      r: Math.random() * 8 + 2,
      a: Math.random() * Math.PI * 2,
      id: Math.random(),
    }));
  }, []);

  const dotsRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (sweepRef.current) {
      sweepRef.current.rotation.z = -time * 1.5;
    }

    if (dotsRef.current) {
      dots.forEach((dot, i) => {
        // Blinking logic
        const blink = Math.sin(time * 3 + dot.id * 10) > 0.8 ? 1 : 0.2;
        dummy.position.set(Math.cos(dot.a) * dot.r, Math.sin(dot.a) * dot.r, 0);
        dummy.scale.setScalar(0.12 * blink);
        dummy.updateMatrix();
        dotsRef.current!.setMatrixAt(i, dummy.matrix);
      });
      dotsRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Radar Rings */}
      {[2, 4, 6, 8, 10].map((r, i) => (
        <mesh key={i}>
          <ringGeometry args={[r, r + 0.04, 64]} />
          <meshBasicMaterial color={lineColor} transparent opacity={0.15} side={2} />
        </mesh>
      ))}

      {/* Crosshairs */}
      <mesh>
        <boxGeometry args={[20, 0.02, 0.02]} />
        <meshBasicMaterial color={lineColor} transparent opacity={0.1} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[20, 0.02, 0.02]} />
        <meshBasicMaterial color={lineColor} transparent opacity={0.1} />
      </mesh>

      {/* Sweep Beam */}
      <mesh ref={sweepRef}>
        <ringGeometry args={[0, 10, 64, 1, 0, Math.PI / 4]} />
        <meshBasicMaterial color={highlightColor} transparent opacity={0.15} side={2} blending={theme.blending} />
      </mesh>

      {/* Detected Intel Dots */}
      <instancedMesh ref={dotsRef} args={[undefined, undefined, dotCount]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color={highlightColor} transparent opacity={0.8} blending={theme.blending} />
      </instancedMesh>

      <FloatingData count={60} speed={0.05} range={30} />
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

// --- NODE GRAPH for Dragon Scene ---
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

// --- CYBER DRAGON (Professional / Redesigned) ---
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
    
    let roarFactor = 0;
    if (roarState === 1) {
      const roarProgress = Math.min(1, (time - 0.5) / 2);
      roarFactor = Math.sin(roarProgress * Math.PI);
      
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
      {/* Lights specific to dragon */}
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
      <pointLight position={[5, 5, 10]} intensity={1.5} color="#fff" />

      <group ref={headRef}>
        <mesh material={armorMaterial}>
          <icosahedronGeometry args={[0.7, 1]} />
        </mesh>
        <mesh position={[0, -0.1, 0.6]} material={armorMaterial}>
          <boxGeometry args={[0.5, 0.4, 0.9]} />
        </mesh>
        <group ref={jawRef} position={[0, -0.3, 0.4]}>
          <mesh position={[0, -0.05, 0.3]} material={armorMaterial}>
            <boxGeometry args={[0.45, 0.15, 0.8]} />
          </mesh>
        </group>
        <mesh position={[0.3, 0.5, -0.2]} rotation={[-0.4, 0, 0.3]} material={hornMaterial}>
          <coneGeometry args={[0.1, 1.2, 5]} />
        </mesh>
        <mesh position={[-0.3, 0.5, -0.2]} rotation={[-0.4, 0, -0.3]} material={hornMaterial}>
          <coneGeometry args={[0.1, 1.2, 5]} />
        </mesh>
        <mesh position={[0.3, 0.2, 0.45]} material={accentMaterial}>
          <sphereGeometry args={[0.08, 16, 16]} />
        </mesh>
        <mesh position={[-0.3, 0.2, 0.45]} material={accentMaterial}>
          <sphereGeometry args={[0.08, 16, 16]} />
        </mesh>

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

      {Array.from({ length: segments }).map((_, i) => (
        <group key={i} ref={(el) => (segmentRefs.current[i] = el!)}>
          <mesh material={scaleMaterial}>
            <icosahedronGeometry args={[0.6, 1]} />
          </mesh>
          {i % 2 === 0 && (
            <mesh position={[0, 0.4, 0]} rotation={[0.2, 0, 0]} material={armorMaterial}>
              <coneGeometry args={[0.1, 0.6, 4]} />
            </mesh>
          )}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.65, 0.01, 8, 32]} />
            <meshBasicMaterial color="#00FF95" transparent opacity={0.05} />
          </mesh>
        </group>
      ))}
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
      {variant === "cyber-dragon" && (
        <>
          <NodeGraph />
          <HUDGrid />
          <CyberDragon />
        </>
      )}

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
      <div 
        aria-hidden="true" 
        className="pointer-events-none fixed inset-0 -z-10 bg-background"
        style={{
          backgroundImage: `
            radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0),
            linear-gradient(to bottom, rgba(10, 15, 31, 0.9), rgba(10, 15, 31, 1))
          `,
          backgroundSize: '32px 32px, 100% 100%'
        }}
      />
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
