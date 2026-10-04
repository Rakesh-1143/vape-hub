import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { Group, MathUtils, PMREMGenerator } from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { devices } from "../data/devices";

function RoundedPart({
  size,
  position = [0, 0, 0],
  color,
  metalness = 0.8,
  roughness = 0.27,
  radius = 0.055,
}: {
  size: [number, number, number];
  position?: [number, number, number];
  color: string;
  metalness?: number;
  roughness?: number;
  radius?: number;
}) {
  const [width, height, depth] = size;
  const geometry = useMemo(
    () => new RoundedBoxGeometry(width, height, depth, 3, radius),
    [width, height, depth, radius],
  );
  useEffect(() => () => geometry.dispose(), [geometry]);
  return (
    <mesh geometry={geometry} position={position}>
      <meshStandardMaterial
        color={color}
        metalness={metalness}
        roughness={roughness}
      />
    </mesh>
  );
}
function StudioEnvironment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const generator = new PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const target = generator.fromScene(room, 0.04);
    const previous = scene.environment;
    scene.environment = target.texture;
    return () => {
      scene.environment = previous;
      target.dispose();
      room.dispose();
      generator.dispose();
    };
  }, [gl, scene]);
  return null;
}
function Device({
  index,
  activeIndex,
  mobile,
  progress,
}: {
  index: number;
  activeIndex: number;
  mobile: boolean;
  progress: MutableRefObject<number>;
}) {
  const group = useRef<Group>(null);
  const device = devices[index];
  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const active = index === activeIndex;
    const offset = (index - activeIndex + 3) % 3;
    const side = offset === 1 ? 1 : -1;
    const t = progress.current;
    const step = Math.min(delta, 0.05);
    g.visible = !mobile || active;
    g.position.x = MathUtils.damp(
      g.position.x,
      active ? 0 : side * 2.05,
      7,
      step,
    );
    g.position.y = MathUtils.damp(
      g.position.y,
      (active ? 0.12 : -0.2) +
        Math.sin(state.clock.elapsedTime * 0.8 + index) * 0.07,
      5,
      step,
    );
    g.position.z = MathUtils.damp(g.position.z, active ? 0.5 : -0.7, 6, step);
    const scale = active ? 1.14 + t * 0.14 : 0.76;
    g.scale.setScalar(MathUtils.damp(g.scale.x, scale, 6, step));
    g.rotation.y = MathUtils.damp(
      g.rotation.y,
      active ? -0.3 + t * Math.PI * 1.3 : side * -0.55,
      5,
      step,
    );
    g.rotation.z = MathUtils.damp(
      g.rotation.z,
      active ? -0.16 + t * 0.2 : side * -0.17,
      5,
      step,
    );
  });
  return (
    <group ref={group} scale={0.8}>
      <RoundedPart size={[0.79, 2.48, 0.49]} color={device.bodyColor} />
      <RoundedPart
        size={[0.81, 0.22, 0.51]}
        position={[0, 1.18, 0]}
        color="#45464a"
        roughness={0.2}
        radius={0.04}
      />
      <RoundedPart
        size={[0.46, 0.4, 0.27]}
        position={[0, 1.46, 0]}
        color="#191b1d"
        metalness={0.15}
        roughness={0.19}
      />
      <RoundedPart
        size={[0.8, 0.13, 0.5]}
        position={[0, -1.19, 0]}
        color="#969696"
        metalness={1}
        radius={0.035}
      />
      <RoundedPart
        size={[0.26, 0.59, 0.025]}
        position={[0, 0.33, 0.251]}
        color="#10151a"
        metalness={0.1}
        roughness={0.14}
        radius={0.009}
      />
      <mesh position={[0, 0.32, 0.27]}>
        <boxGeometry args={[0.13, 0.025, 0.008]} />
        <meshBasicMaterial color={device.accent} />
      </mesh>
      <mesh position={[0, -0.3, 0.265]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.067, 0.067, 0.025, 24]} />
        <meshStandardMaterial color="#d4d1cb" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.79, 0.257]}>
        <boxGeometry args={[0.34, 0.015, 0.008]} />
        <meshStandardMaterial color="#bbb5af" metalness={0.8} />
      </mesh>
    </group>
  );
}
function ContextWatch({ onFailure }: { onFailure: () => void }) {
  const { gl } = useThree();
  useEffect(() => {
    const canvas = gl.domElement;
    const failed = () => onFailure();
    canvas.addEventListener("webglcontextlost", failed);
    return () => canvas.removeEventListener("webglcontextlost", failed);
  }, [gl, onFailure]);
  return null;
}
export default function DeviceScene({
  activeIndex,
  mobile,
  running,
  progress,
  onReady,
  onFailure,
}: {
  activeIndex: number;
  mobile: boolean;
  running: boolean;
  progress: MutableRefObject<number>;
  onReady: () => void;
  onFailure: () => void;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0.3, 7.5], fov: 38 }}
      dpr={[1, 1.5]}
      frameloop={running ? "always" : "never"}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      fallback={<span className="sr-only">Static device presentation</span>}
      onCreated={onReady}
    >
      <StudioEnvironment />
      <ContextWatch onFailure={onFailure} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 4]} intensity={2} color="#f5e9de" />
      <directionalLight
        position={[-4, 1, 3]}
        intensity={2}
        color={devices[activeIndex].accent}
      />
      <pointLight
        position={[0, -3, 2]}
        intensity={6}
        color={devices[activeIndex].accent}
      />
      {devices.map((d, index) => (
        <Device
          key={d.id}
          index={index}
          activeIndex={activeIndex}
          mobile={mobile}
          progress={progress}
        />
      ))}
    </Canvas>
  );
}
