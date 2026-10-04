import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { Group, MathUtils, PMREMGenerator } from "three";
import gsap from "gsap";
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
  const pose = useRef({
    angle: (index - activeIndex) * ((Math.PI * 2) / 3),
    turn: 0,
    enter: 0,
  });
  const device = devices[index];
  useEffect(() => {
    const tween = gsap.to(pose.current, {
      enter: 1,
      duration: 1.6,
      delay: index * 0.13,
      ease: "power3.out",
    });
    return () => {
      tween.kill();
    };
  }, [index]);
  useEffect(() => {
    const target = (index - activeIndex) * ((Math.PI * 2) / 3);
    const current = pose.current.angle;
    const nearest =
      current +
      Math.atan2(Math.sin(target - current), Math.cos(target - current));
    const timeline = gsap.timeline();
    timeline
      .to(
        pose.current,
        { angle: nearest, duration: 1.2, ease: "power3.inOut" },
        0,
      )
      .to(
        pose.current,
        {
          turn: index === activeIndex ? Math.PI * 2 : 0,
          duration: 1.35,
          ease: "power3.inOut",
        },
        0,
      );
    return () => {
      timeline.kill();
    };
  }, [activeIndex, index]);
  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const active = index === activeIndex;
    const t = progress.current;
    const step = Math.min(delta, 0.05);
    const angle = pose.current.angle;
    const front = (Math.cos(angle) + 1) / 2;
    const reveal = pose.current.enter;
    const close = MathUtils.smoothstep(t, 0.12, 0.65);
    const exit = MathUtils.smoothstep(t, 0.75, 1);
    const pointer = state.pointer;
    g.visible = !mobile || active;
    g.position.x = MathUtils.damp(
      g.position.x,
      Math.sin(angle) * 2.75 * (1 - close * 0.15) +
        (active ? close * -0.6 : close * Math.sign(Math.sin(angle)) * 1.5),
      7,
      step,
    );
    g.position.y = MathUtils.damp(
      g.position.y,
      (front - 0.6) * 0.4 +
        (1 - reveal) * -4 +
        exit * 1.1 +
        Math.sin(state.clock.elapsedTime * 0.75 + index * 2) * 0.12,
      5,
      step,
    );
    g.position.z = MathUtils.damp(
      g.position.z,
      Math.cos(angle) * 1.05 - close * (active ? 0 : 3),
      6,
      step,
    );
    const scale =
      (0.62 + front * 0.48 + (active ? close * 0.16 : -close * 0.22)) *
      (0.65 + reveal * 0.35);
    g.scale.setScalar(MathUtils.damp(g.scale.x, scale, 6, step));
    g.rotation.y = MathUtils.damp(
      g.rotation.y,
      angle * -0.2 +
        pose.current.turn -
        0.32 +
        t * Math.PI * 1.6 +
        pointer.x * 0.16,
      5,
      step,
    );
    g.rotation.z = MathUtils.damp(
      g.rotation.z,
      Math.sin(angle) * -0.3 -
        0.13 +
        Math.sin(state.clock.elapsedTime * 0.6 + index) * 0.035 +
        close * 0.32,
      5,
      step,
    );
    g.rotation.x = MathUtils.damp(
      g.rotation.x,
      close * -0.25 + pointer.y * 0.08,
      5,
      step,
    );
  });
  return (
    <group ref={group} scale={0.8}>
      <RoundedPart
        size={[0.79, 2.48, 0.49]}
        color={device.bodyColor}
        roughness={0.23}
        radius={0.12}
      />
      <RoundedPart
        size={[0.69, 2.19, 0.018]}
        position={[0, -0.03, 0.247]}
        color={device.bodyColor}
        metalness={0.55}
        roughness={0.32}
        radius={0.008}
      />
      {[-0.36, 0.36].map((x) => (
        <RoundedPart
          key={x}
          size={[0.025, 2.2, 0.035]}
          position={[x, 0, 0.235]}
          color="#bdb6c0"
          radius={0.01}
          metalness={1}
          roughness={0.18}
        />
      ))}
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
      {[0, 1, 2, 3].map((bar) => (
        <mesh key={bar} position={[-0.074 + bar * 0.048, 0.47, 0.271]}>
          <boxGeometry args={[0.028, 0.018 + bar * 0.015, 0.006]} />
          <meshBasicMaterial color={device.accent} />
        </mesh>
      ))}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[side * 0.3, -1.14, 0.258]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.017, 0.017, 0.012, 12]} />
          <meshStandardMaterial color="#202225" metalness={0.8} />
        </mesh>
      ))}
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
function CameraRig({ progress }: { progress: MutableRefObject<number> }) {
  useFrame((state, delta) => {
    const close = MathUtils.smoothstep(progress.current, 0.12, 0.65);
    state.camera.position.z = MathUtils.damp(
      state.camera.position.z,
      8.1 - close * 0.2,
      4,
      Math.min(delta, 0.05),
    );
    state.camera.position.x = MathUtils.damp(
      state.camera.position.x,
      state.pointer.x * 0.18,
      3,
      Math.min(delta, 0.05),
    );
    state.camera.lookAt(0, 0.15, 0);
  });
  return null;
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
      camera={{ position: [0, 0.3, 8.1], fov: 38 }}
      dpr={[1, 1.5]}
      frameloop={running ? "always" : "never"}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      fallback={<span className="sr-only">Static device presentation</span>}
      onCreated={onReady}
    >
      <StudioEnvironment />
      <ContextWatch onFailure={onFailure} />
      <CameraRig progress={progress} />
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
