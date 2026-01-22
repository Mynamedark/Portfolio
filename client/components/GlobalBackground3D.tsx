import * as THREE from "three";
import { Suspense, useEffect, useMemo, useRef } from "react";
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
  | "modern-data-lattice";

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
      highlight: cssVarHsl("--primary"),
      fogNear: 10,
      fogFar: 25,
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
      const targetZ = 18 + t * 4;
      camera.position.z += (targetZ - camera.position.z) * 0.05;
      camera.position.x += (mouseX * 3 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 3 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);
    }
  });

  return null;
}

// --- MODERN DATA LATTICE ---
function ModernDataLattice() {
  const groupRef = useRef<Group>(null);
  const theme = useThemeColors();
  const lineColor = useMemo(() => new Color(theme.line), [theme.line]);
  
  const { points, lines } = useMemo(() => {
    const count = 100;
    const range = 30;
    const pts: Vector3[] = [];
    const linePositions: number[] = [];

    for (let i = 0; i < count; i++) {
      pts.push(new Vector3(
        MathUtils.randFloatSpread(range),
        MathUtils.randFloatSpread(range * 0.6),
        MathUtils.randFloatSpread(range * 0.4)
      ));
    }

    pts.forEach((p1, i) => {
      pts.forEach((p2, j) => {
        if (i >= j) return;
        const dist = p1.distanceTo(p2);
        if (dist < 6) {
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
    groupRef.current.rotation.y = time * 0.02;

    if (nodesRef.current) {
      points.forEach((pt, i) => {
        const pulse = 1 + Math.sin(time * 1 + i) * 0.2;
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
        <meshBasicMaterial color={lineColor} transparent opacity={0.3} />
      </instancedMesh>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={lineColor} transparent opacity={0.05} />
      </lineSegments>
    </group>
  );
}

// --- THREAT INTEL GLOBE ---
function ThreatIntelGlobe() {
  const groupRef = useRef<Group>(null);
  const theme = useThemeColors();
  const highlightColor = useMemo(() => new Color(theme.highlight), [theme.highlight]);

  const { points, lines } = useMemo(() => {
    const count = 300;
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
      pts.forEach((p2, j) => {
        if (i >= j) return;
        const dist = p1.distanceTo(p2);
        if (dist < 2.5) {
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

    if (nodesRef.current) {
      points.forEach((pt, i) => {
        const pulse = 1 + Math.sin(time * 2 + i * 0.1) * 0.2;
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
        <sphereGeometry args={[1, 6, 6]} />
        <meshBasicMaterial color={highlightColor} transparent opacity={0.2} />
      </instancedMesh>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={highlightColor} transparent opacity={0.08} />
      </lineSegments>
    </group>
  );
}

// --- FLOATING DATA ---
function FloatingData({ count = 150, speed = 0.01 }: { count?: number; speed?: number }) {
  const theme = useThemeColors();
  const particleColor = useMemo(() => new Color(theme.line), [theme.line]);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = MathUtils.randFloatSpread(50);
      pos[i * 3 + 1] = MathUtils.randFloatSpread(50);
      pos[i * 3 + 2] = MathUtils.randFloatSpread(30);
    }
    return pos;
  }, [count]);

  const pointsRef = useRef<Points>(null);
  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    pointsRef.current.position.y = -(time * speed * 5) % 25;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color={particleColor} transparent opacity={0.15} depthWrite={false} blending={AdditiveBlending} />
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
      <ambientLight intensity={0.4} />
      
      {variant === "threat-intel-globe" && <ThreatIntelGlobe />}
      {variant === "modern-data-lattice" && <ModernDataLattice />}
      {variant === "osint-node-network" && <ModernDataLattice />}
      {/* Fallback to ModernDataLattice for other variants for consistency */}
      {!["threat-intel-globe", "modern-data-lattice", "osint-node-network"].includes(variant) && <ModernDataLattice />}

      <FloatingData />
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
    return <div aria-hidden="true" className="fixed inset-0 bg-background" />;
  }

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 18], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <Scene variant={variant} />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background pointer-events-none" />
      <div className="noise-bg" />
    </div>
  );
}
