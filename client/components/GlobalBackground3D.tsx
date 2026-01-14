import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  InstancedMesh,
  Object3D,
  Color,
  AdditiveBlending,
  NormalBlending,
  Fog,
  Vector3,
  BufferGeometry,
  Float32BufferAttribute,
  Group,
  Points,
  Mesh,
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
  | "globe"
  | "network"
  | "grid"
  | "matrix"
  | "dna"
  | "hexgrid"
  | "spiral"
  | "flow"
  | "vortex";

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

function useThemeColors(isDark: boolean): ThemeColors {
  return useMemo(
    () => ({
      line: isDark ? cssVarHsl("--primary") : "#000000",
      particle: isDark ? cssVarHsl("--secondary") : "#000000",
      highlight: cssVarHsl("--accent") || "#00ff00",
      fogNear: isDark ? 10 : 12,
      fogFar: isDark ? 25 : 30,
      // Use AdditiveBlending for Dark mode to make colors pop ("perfect" look)
      // NormalBlending for Light mode for visibility
      blending: isDark ? AdditiveBlending : NormalBlending,
    }),
    [isDark],
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
    const t = Math.min(scrollRef.current / window.innerHeight, 1);

    if (variant === "grid") {
      // Fly through effect
      const targetZ = 15 + t * 5;
      const targetY = 2 + t * 2;
      camera.position.z += (targetZ - camera.position.z) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
    } else if (variant === "matrix") {
      // Static camera, slight mouse parallax could be added here
      const targetZ = 20;
      camera.position.z += (targetZ - camera.position.z) * 0.05;
    } else if (variant === "dna") {
      // DNA: Rotate around it
      const targetZ = 22;
      camera.position.z += (targetZ - camera.position.z) * 0.05;
    } else {
      // Globe/Network: Zoom out on scroll
      const targetZ = 18 + t * 5;
      camera.position.z += (targetZ - camera.position.z) * 0.05;
    }
  });

  return null;
}

// --- GLOBE SCENE (Home) ---
// Rotating cyber sphere + particle ring orbit
function GlobeScene({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<Group>(null);
  const theme = useThemeColors(isDark);
  const particleColor = useMemo(
    () => new Color(theme.particle),
    [theme.particle],
  );
  const lineColor = useMemo(() => new Color(theme.line), [theme.line]);
  const highlightColor = useMemo(
    () => new Color(theme.highlight),
    [theme.highlight],
  );

  const { points, lines } = useMemo(() => {
    const count = 250;
    const radius = 6;
    const pts: Vector3[] = [];
    const linePositions: number[] = [];

    // Sphere points
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      pts.push(new Vector3(x, y, z));
    }

    // Connect near points
    pts.forEach((p1, i) => {
      pts.forEach((p2, j) => {
        if (i >= j) return;
        if (p1.distanceTo(p2) < 1.8) {
          linePositions.push(p1.x, p1.y, p1.z);
          linePositions.push(p2.x, p2.y, p2.z);
        }
      });
    });

    return { points: pts, lines: new Float32Array(linePositions) };
  }, []);

  const nodesRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);

  useEffect(() => {
    if (!nodesRef.current) return;
    points.forEach((pt, i) => {
      dummy.position.copy(pt);
      dummy.scale.setScalar(0.08);
      dummy.updateMatrix();
      nodesRef.current!.setMatrixAt(i, dummy.matrix);
    });
    nodesRef.current.instanceMatrix.needsUpdate = true;
  }, [points, dummy]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = time * 0.15;
    groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
  });

  return (
    <group ref={groupRef}>
      <instancedMesh
        ref={nodesRef}
        args={[undefined, undefined, points.length]}
      >
        <sphereGeometry args={[1, 8, 8]} />
        {/* Adjusted opacity and blending to match DNA scene "perfect" look */}
        <meshBasicMaterial
          color={particleColor}
          transparent
          opacity={0.8}
          blending={theme.blending}
        />
      </instancedMesh>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        {/* Increased opacity slightly to match DNA line visibility */}
        <lineBasicMaterial
          color={lineColor}
          transparent
          opacity={0.3}
          blending={theme.blending}
        />
      </lineSegments>

      {/* Orbiting Particle Ring - simplified to be less distracting */}
      <mesh rotation={[Math.PI / 2.5, 0, 0]}>
        <ringGeometry args={[8.5, 8.55, 64]} />
        <meshBasicMaterial
          color={highlightColor}
          transparent
          opacity={0.6}
          side={2}
          blending={theme.blending}
        />
      </mesh>
    </group>
  );
}

// --- NETWORK SCENE (About, Experience) ---
function NetworkScene({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<Group>(null);
  const theme = useThemeColors(isDark);
  const particleColor = useMemo(
    () => new Color(theme.particle),
    [theme.particle],
  );
  const lineColor = useMemo(() => new Color(theme.line), [theme.line]);

  const { points, lines } = useMemo(() => {
    const count = 120;
    const range = 18;
    const pts: Vector3[] = [];
    const linePositions: number[] = [];

    for (let i = 0; i < count; i++) {
      pts.push(
        new Vector3(
          MathUtils.randFloatSpread(range),
          MathUtils.randFloatSpread(range),
          MathUtils.randFloatSpread(range),
        ),
      );
    }

    // Connect if close enough
    pts.forEach((p1, i) => {
      pts.forEach((p2, j) => {
        if (i >= j) return;
        const dist = p1.distanceTo(p2);
        if (dist < 3.5) {
          linePositions.push(p1.x, p1.y, p1.z);
          linePositions.push(p2.x, p2.y, p2.z);
        }
      });
    });

    return { points: pts, lines: new Float32Array(linePositions) };
  }, []);

  const nodesRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);

  useEffect(() => {
    if (!nodesRef.current) return;
    points.forEach((pt, i) => {
      dummy.position.copy(pt);
      dummy.scale.setScalar(Math.random() * 0.08 + 0.02);
      dummy.updateMatrix();
      nodesRef.current!.setMatrixAt(i, dummy.matrix);
    });
    nodesRef.current.instanceMatrix.needsUpdate = true;
  }, [points, dummy]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = time * 0.05;
    groupRef.current.rotation.x = time * 0.02;
  });

  return (
    <group ref={groupRef}>
      <instancedMesh
        ref={nodesRef}
        args={[undefined, undefined, points.length]}
      >
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial
          color={particleColor}
          transparent
          opacity={0.6}
          blending={theme.blending}
        />
      </instancedMesh>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={lineColor}
          transparent
          opacity={0.08}
          blending={theme.blending}
        />
      </lineSegments>
    </group>
  );
}

// --- GRID SCENE (Projects, etc.) ---
function GridScene({ isDark }: { isDark: boolean }) {
  const theme = useThemeColors(isDark);
  const groupRef = useRef<Group>(null);
  const lineColor = useMemo(() => new Color(theme.line), [theme.line]);
  const particleColor = useMemo(
    () => new Color(theme.particle),
    [theme.particle],
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    // Move grid towards camera to simulate flight
    groupRef.current.position.z = (time * 5) % 10;
  });

  return (
    <group ref={groupRef}>
      {/* Floor Grid */}
      <gridHelper
        args={[60, 60, lineColor, lineColor]}
        position={[0, -5, -20]}
        rotation={[0, 0, 0]}
      />
      {/* Ceiling Grid */}
      <gridHelper
        args={[60, 60, lineColor, lineColor]}
        position={[0, 5, -20]}
        rotation={[0, 0, 0]}
      />
      {/* Vertical Data Streams (Simulated by sparse points) */}
      <FloatingData isDark={isDark} count={50} speed={0.5} range={20} />
    </group>
  );
}

// --- MATRIX / HEX GRID SCENE (Skills/Services) ---
// Cubic grid with rotating elements
function MatrixScene({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<Group>(null);
  const innerGroupRef = useRef<Group>(null);
  const theme = useThemeColors(isDark);
  const particleColor = useMemo(
    () => new Color(theme.particle),
    [theme.particle],
  );
  const lineColor = useMemo(() => new Color(theme.line), [theme.line]);
  const highlightColor = useMemo(
    () => new Color(theme.highlight),
    [theme.highlight],
  );

  const gridSize = 5; // 5x5x5 grid
  const nodeCount = gridSize * gridSize * gridSize;
  const dummy = useMemo(() => new Object3D(), []);
  const meshRef = useRef<InstancedMesh>(null);

  // Create grid positions
  const { gridPositions, lines } = useMemo(() => {
    const positions: Vector3[] = [];
    const linePositions: number[] = [];
    const spacing = 3;
    const offset = ((gridSize - 1) * spacing) / 2;

    // Create grid nodes
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        for (let z = 0; z < gridSize; z++) {
          positions.push(
            new Vector3(
              x * spacing - offset,
              y * spacing - offset,
              z * spacing - offset,
            ),
          );
        }
      }
    }

    // Connect adjacent nodes
    positions.forEach((p1, i) => {
      positions.forEach((p2, j) => {
        if (i >= j) return;
        if (
          p1.distanceTo(p2) < spacing * 1.1 &&
          p1.distanceTo(p2) > spacing * 0.9
        ) {
          linePositions.push(p1.x, p1.y, p1.z);
          linePositions.push(p2.x, p2.y, p2.z);
        }
      });
    });

    return { gridPositions: positions, lines: new Float32Array(linePositions) };
  }, []);

  useEffect(() => {
    if (!meshRef.current) return;
    gridPositions.forEach((pt, i) => {
      dummy.position.copy(pt);
      dummy.scale.setScalar(0.3);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [gridPositions, dummy]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    // Pulsing effect
    gridPositions.forEach((pt, i) => {
      const pulse = Math.sin(time + i * 0.05) * 0.3 + 0.7;
      dummy.position.copy(pt);
      dummy.scale.setScalar(0.3 * pulse);
      dummy.rotation.set(time * 0.2, time * 0.3, time * 0.15);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;

    if (innerGroupRef.current) {
      innerGroupRef.current.rotation.x = time * 0.1;
      innerGroupRef.current.rotation.y = time * 0.15;
      innerGroupRef.current.rotation.z = time * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={innerGroupRef}>
        {/* Grid nodes */}
        <instancedMesh ref={meshRef} args={[undefined, undefined, nodeCount]}>
          <octahedronGeometry args={[1]} />
          <meshBasicMaterial
            color={highlightColor}
            transparent
            opacity={0.8}
            blending={theme.blending}
          />
        </instancedMesh>

        {/* Connection lines */}
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[lines, 3]} />
          </bufferGeometry>
          <lineBasicMaterial
            color={lineColor}
            transparent
            opacity={0.4}
            blending={theme.blending}
          />
        </lineSegments>

        {/* Wireframe cube */}
        <mesh>
          <boxGeometry args={[12, 12, 12]} />
          <meshBasicMaterial
            color={particleColor}
            wireframe
            transparent
            opacity={0.2}
            blending={theme.blending}
          />
        </mesh>
      </group>
    </group>
  );
}

// --- DNA SCENE (Experience) ---
function DNAScene({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<Group>(null);
  const theme = useThemeColors(isDark);
  const particleColor = useMemo(
    () => new Color(theme.particle),
    [theme.particle],
  );
  const lineColor = useMemo(() => new Color(theme.line), [theme.line]);

  const { points, lines } = useMemo(() => {
    const count = 60; // pairs
    const pts: Vector3[] = [];
    const linePositions: number[] = [];

    for (let i = 0; i < count; i++) {
      const t = i * 0.5;
      const x1 = Math.cos(t) * 2;
      const y = (i - count / 2) * 0.5;
      const z1 = Math.sin(t) * 2;

      const x2 = Math.cos(t + Math.PI) * 2;
      const z2 = Math.sin(t + Math.PI) * 2;

      const p1 = new Vector3(x1, y, z1);
      const p2 = new Vector3(x2, y, z2);

      pts.push(p1, p2);

      // Connect pair
      linePositions.push(p1.x, p1.y, p1.z);
      linePositions.push(p2.x, p2.y, p2.z);

      // Connect to prev (ladder rungs)
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

  useEffect(() => {
    if (!nodesRef.current) return;
    points.forEach((pt, i) => {
      dummy.position.copy(pt);
      dummy.scale.setScalar(0.15);
      dummy.updateMatrix();
      nodesRef.current!.setMatrixAt(i, dummy.matrix);
    });
    nodesRef.current.instanceMatrix.needsUpdate = true;
  }, [points, dummy]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = time * 0.2;
    groupRef.current.rotation.z = Math.PI / 6;
  });

  return (
    <group ref={groupRef}>
      <instancedMesh
        ref={nodesRef}
        args={[undefined, undefined, points.length]}
      >
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial
          color={particleColor}
          transparent
          opacity={0.8}
          blending={theme.blending}
        />
      </instancedMesh>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={lineColor}
          transparent
          opacity={0.3}
          blending={theme.blending}
        />
      </lineSegments>
    </group>
  );
}

// --- HEX GRID SCENE (Contact/Connections) ---
function HexGridScene({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<Group>(null);
  const theme = useThemeColors(isDark);
  const particleColor = useMemo(
    () => new Color(theme.particle),
    [theme.particle],
  );
  const lineColor = useMemo(() => new Color(theme.line), [theme.line]);

  const { points, lines } = useMemo(() => {
    const pts: Vector3[] = [];
    const linePositions: number[] = [];
    const hexRadius = 1.5;

    // Create multiple hexagon layers
    for (let layer = 0; layer < 4; layer++) {
      const layerRadius = hexRadius * (layer + 1);
      const hexPoints = 6;

      for (let i = 0; i < hexPoints; i++) {
        const angle = (i / hexPoints) * Math.PI * 2;
        const x = Math.cos(angle) * layerRadius;
        const z = Math.sin(angle) * layerRadius;
        const y = layer * 2 - 3;
        pts.push(new Vector3(x, y, z));

        // Connect to next point in hex
        if (i < hexPoints - 1) {
          const nextAngle = ((i + 1) / hexPoints) * Math.PI * 2;
          const nextX = Math.cos(nextAngle) * layerRadius;
          const nextZ = Math.sin(nextAngle) * layerRadius;
          linePositions.push(x, y, z, nextX, y, nextZ);
        } else {
          // Close the hex
          const nextAngle = 0;
          const nextX = Math.cos(nextAngle) * layerRadius;
          const nextZ = Math.sin(nextAngle) * layerRadius;
          linePositions.push(x, y, z, nextX, y, nextZ);
        }
      }

      // Connect layers vertically
      if (layer > 0) {
        const prevLayerStart = layer * hexPoints;
        const currentLayerStart = (layer + 1) * hexPoints;
        for (let i = 0; i < hexPoints; i++) {
          const prevIdx = prevLayerStart + i - hexPoints;
          const currIdx = currentLayerStart + i - hexPoints;
          if (prevIdx >= 0 && currIdx >= 0 && currIdx < pts.length) {
            const p1 = pts[prevIdx];
            const p2 = pts[currIdx];
            linePositions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
          }
        }
      }
    }

    return { points: pts, lines: new Float32Array(linePositions) };
  }, []);

  const nodesRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);

  useEffect(() => {
    if (!nodesRef.current) return;
    points.forEach((pt, i) => {
      dummy.position.copy(pt);
      dummy.scale.setScalar(0.12);
      dummy.updateMatrix();
      nodesRef.current!.setMatrixAt(i, dummy.matrix);
    });
    nodesRef.current.instanceMatrix.needsUpdate = true;
  }, [points, dummy]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.z = time * 0.3;
    groupRef.current.rotation.y = time * 0.1;
  });

  return (
    <group ref={groupRef}>
      <instancedMesh
        ref={nodesRef}
        args={[undefined, undefined, points.length]}
      >
        <octahedronGeometry args={[1]} />
        <meshBasicMaterial
          color={particleColor}
          transparent
          opacity={0.7}
          blending={theme.blending}
        />
      </instancedMesh>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={lineColor}
          transparent
          opacity={0.4}
          blending={theme.blending}
        />
      </lineSegments>
    </group>
  );
}

// --- SPIRAL SCENE (Education) ---
function SpiralScene({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<Group>(null);
  const theme = useThemeColors(isDark);
  const particleColor = useMemo(
    () => new Color(theme.particle),
    [theme.particle],
  );
  const lineColor = useMemo(() => new Color(theme.line), [theme.line]);

  const { points, lines } = useMemo(() => {
    const pts: Vector3[] = [];
    const linePositions: number[] = [];
    const spiralTurns = 8;
    const pointsPerTurn = 30;
    const totalPoints = spiralTurns * pointsPerTurn;

    for (let i = 0; i < totalPoints; i++) {
      const t = i / pointsPerTurn;
      const angle = (i / pointsPerTurn) * Math.PI * 2;
      const radius = 2 + t * 3;
      const height = (i / totalPoints) * 15 - 7.5;

      const x = Math.cos(angle) * radius;
      const y = height;
      const z = Math.sin(angle) * radius;

      pts.push(new Vector3(x, y, z));

      // Connect to previous point
      if (i > 0) {
        const prevPt = pts[i - 1];
        linePositions.push(prevPt.x, prevPt.y, prevPt.z, x, y, z);
      }
    }

    return { points: pts, lines: new Float32Array(linePositions) };
  }, []);

  const nodesRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);

  useEffect(() => {
    if (!nodesRef.current) return;
    points.forEach((pt, i) => {
      dummy.position.copy(pt);
      dummy.scale.setScalar(Math.random() * 0.1 + 0.05);
      dummy.updateMatrix();
      nodesRef.current!.setMatrixAt(i, dummy.matrix);
    });
    nodesRef.current.instanceMatrix.needsUpdate = true;
  }, [points, dummy]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = time * 0.15;
  });

  return (
    <group ref={groupRef}>
      <instancedMesh
        ref={nodesRef}
        args={[undefined, undefined, points.length]}
      >
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial
          color={particleColor}
          transparent
          opacity={0.65}
          blending={theme.blending}
        />
      </instancedMesh>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={lineColor}
          transparent
          opacity={0.25}
          blending={theme.blending}
        />
      </lineSegments>
    </group>
  );
}

// --- FLOW SCENE (Downloads) ---
function FlowScene({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<Group>(null);
  const theme = useThemeColors(isDark);
  const particleColor = useMemo(
    () => new Color(theme.particle),
    [theme.particle],
  );

  const count = 200;
  const dummy = useMemo(() => new Object3D(), []);
  const meshRef = useRef<InstancedMesh>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 30,
        y: (Math.random() - 0.5) * 20,
        z: (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 0.02,
        vy: (Math.random() - 0.5) * 0.02,
        vz: (Math.random() - 0.5) * 0.02,
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    particles.forEach((particle, i) => {
      // Wave motion
      particle.y += Math.sin(time + particle.x * 0.1) * 0.01;
      particle.z += Math.cos(time + particle.x * 0.1) * 0.01;

      // Wrap around
      if (particle.y > 10) particle.y = -10;
      if (particle.y < -10) particle.y = 10;

      dummy.position.set(particle.x, particle.y, particle.z);
      dummy.scale.setScalar(0.08);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;

    if (groupRef.current) {
      groupRef.current.rotation.z = time * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial
          color={particleColor}
          transparent
          opacity={0.5}
          blending={theme.blending}
        />
      </instancedMesh>
    </group>
  );
}

// --- VORTEX SCENE (Certifications) ---
function VortexScene({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<Group>(null);
  const theme = useThemeColors(isDark);
  const particleColor = useMemo(
    () => new Color(theme.particle),
    [theme.particle],
  );
  const lineColor = useMemo(() => new Color(theme.line), [theme.line]);

  const count = 300;
  const dummy = useMemo(() => new Object3D(), []);
  const meshRef = useRef<InstancedMesh>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 10 + 2;
      const height = (Math.random() - 0.5) * 15;
      temp.push({
        angle,
        radius,
        height,
        speed: Math.random() * 0.5 + 0.3,
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    particles.forEach((particle, i) => {
      const currentAngle = particle.angle + time * particle.speed;
      const currentRadius = particle.radius + Math.sin(time * 0.5 + i) * 2;

      const x = Math.cos(currentAngle) * currentRadius;
      const z = Math.sin(currentAngle) * currentRadius;
      const y = particle.height + Math.sin(time + i * 0.1) * 1;

      dummy.position.set(x, y, z);
      dummy.scale.setScalar(0.1);
      dummy.rotation.set(currentAngle, time * 0.5, 0);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <tetrahedronGeometry args={[1]} />
        <meshBasicMaterial
          color={particleColor}
          wireframe
          transparent
          opacity={0.5}
          blending={theme.blending}
        />
      </instancedMesh>
    </group>
  );
}

// --- COMMON FLOATING DATA ---
function FloatingData({
  isDark,
  count = 200,
  speed = 0.02,
  range = 40,
}: {
  isDark: boolean;
  count?: number;
  speed?: number;
  range?: number;
}) {
  const theme = useThemeColors(isDark);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * range;
      pos[i * 3 + 1] = (Math.random() - 0.5) * range;
      pos[i * 3 + 2] = (Math.random() - 0.5) * (range / 2);
    }
    return pos;
  }, [count, range]);

  const pointsRef = useRef<Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * speed;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color={theme.particle}
        transparent
        opacity={0.3}
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}

function Scene({
  isDark,
  variant,
}: {
  isDark: boolean;
  variant: BackgroundVariant;
}) {
  const theme = useThemeColors(isDark);
  const { scene, gl } = useThree();

  useEffect(() => {
    webglManager.registerScene("global-background", scene);
    webglManager.registerRenderer("global-background", gl);
  }, [scene, gl]);

  useEffect(() => {
    scene.fog = new Fog(cssVarHsl("--background"), theme.fogNear, theme.fogFar);
  }, [scene, theme, isDark]);

  // Boost lighting for matrix scene
  const isMatrixVariant = variant === "matrix";
  const ambientIntensity = isMatrixVariant
    ? isDark
      ? 0.8
      : 0.6
    : isDark
      ? 0.6
      : 0.4;
  const directionalIntensity = isMatrixVariant
    ? isDark
      ? 0.8
      : 0.65
    : isDark
      ? 0.6
      : 0.45;

  return (
    <>
      <ambientLight intensity={ambientIntensity} />
      <directionalLight
        position={[4, 10, 6]}
        intensity={directionalIntensity}
      />

      {variant === "globe" && <GlobeScene isDark={isDark} />}
      {variant === "network" && <NetworkScene isDark={isDark} />}
      {variant === "grid" && <GridScene isDark={isDark} />}
      {variant === "matrix" && <MatrixScene isDark={isDark} />}
      {variant === "dna" && <DNAScene isDark={isDark} />}
      {variant === "hexgrid" && <HexGridScene isDark={isDark} />}
      {variant === "spiral" && <SpiralScene isDark={isDark} />}
      {variant === "flow" && <FlowScene isDark={isDark} />}
      {variant === "vortex" && <VortexScene isDark={isDark} />}

      {/* Background dust for atmosphere */}
      {variant !== "dna" && variant !== "vortex" && variant !== "hexgrid" && (
        <FloatingData isDark={isDark} count={150} />
      )}

      <CameraRig variant={variant} />
    </>
  );
}

interface GlobalBackground3DProps {
  isDark: boolean;
  variant?: BackgroundVariant;
}

export function GlobalBackground3D({
  isDark,
  variant = "globe",
}: GlobalBackground3DProps) {
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
        className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-br from-background via-background to-muted"
      >
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(47,128,237,0.12)_0,transparent_55%),radial-gradient(circle_at_80%_80%,rgba(126,138,151,0.16)_0,transparent_55%)]" />
        </div>
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 18], fov: 45 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <Scene isDark={isDark} variant={variant} />
        </Suspense>
      </Canvas>
    </div>
  );
}
