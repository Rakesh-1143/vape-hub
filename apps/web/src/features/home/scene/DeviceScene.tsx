import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
} from "react";
import gsap from "gsap";
import {
  ACESFilmicToneMapping,
  BoxGeometry,
  Color,
  DirectionalLight,
  Group,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  PMREMGenerator,
  PointLight,
  Scene,
  SRGBColorSpace,
} from "three";
import { ProductModel } from "./ProductModel";
import { devices } from "../data/devices";

export function SoftboxEnvironment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const studio = new Scene();
    studio.background = new Color("#0b0e13");
    const boxes: Mesh[] = [];
    const light = (
      position: [number, number, number],
      size: [number, number, number],
      color: string,
      intensity: number,
    ) => {
      const panel = new Mesh(
        new BoxGeometry(...size),
        new MeshBasicMaterial({
          color: new Color(color).multiplyScalar(intensity),
        }),
      );
      panel.position.set(...position);
      panel.lookAt(0, 0, 0);
      studio.add(panel);
      boxes.push(panel);
    };
    light([-4, 2, 3], [2, 7, 0.05], "#f2eee8", 5);
    light([4, 1, 2], [1, 6, 0.05], "#c7d7f5", 3);
    light([0, 6, 0], [5, 2, 0.05], "#ffffff", 4);
    light([1, 1, -4], [2, 4, 0.05], "#dfc6e2", 3);
    const generator = new PMREMGenerator(gl);
    const target = generator.fromScene(studio, 0.08, 0.1, 100, { size: 128 });
    const previous = scene.environment;
    scene.environment = target.texture;
    return () => {
      scene.environment = previous;
      target.dispose();
      generator.dispose();
      boxes.forEach((box) => {
        box.geometry.dispose();
        (box.material as MeshBasicMaterial).dispose();
      });
    };
  }, [gl, scene]);
  return null;
}
function StudioLighting({ activeIndex }: { activeIndex: number }) {
  const rim = useRef<DirectionalLight>(null);
  const pool = useRef<PointLight>(null);
  const target = useMemo(() => new Color(), []);
  useFrame((_, delta) => {
    target.set(devices[activeIndex].accent);
    const alpha = 1 - Math.exp(-Math.min(delta, 0.05) * 4);
    rim.current?.color.lerp(target, alpha);
    pool.current?.color.lerp(target, alpha);
  });
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[-3, 5, 5]} intensity={2.4} color="#f6f0e8" />
      <directionalLight position={[4, 2, -2]} intensity={3} ref={rim} />
      <pointLight
        position={[0, -2, 3]}
        intensity={8}
        distance={12}
        ref={pool}
      />
    </>
  );
}
function Product({
  index,
  activeIndex,
  mobile,
  progress,
  yaw,
  inspect,
  paused,
}: {
  index: number;
  activeIndex: number;
  mobile: boolean;
  progress: MutableRefObject<number>;
  yaw: MutableRefObject<number>;
  inspect: boolean;
  paused: boolean;
}) {
  const group = useRef<Group>(null);
  const pose = useRef({
    angle: ((index - activeIndex) * Math.PI * 2) / 3,
    enter: 0,
    turn: 0,
  });
  const time = useRef(0);
  const active = activeIndex === index;
  useEffect(() => {
    const enter = gsap.to(pose.current, {
      enter: 1,
      duration: 1.5,
      delay: index * 0.12,
      ease: "power3.out",
    });
    return () => {
      enter.kill();
    };
  }, [index]);
  useEffect(() => {
    const target = ((index - activeIndex) * Math.PI * 2) / 3;
    const nearest =
      pose.current.angle +
      Math.atan2(
        Math.sin(target - pose.current.angle),
        Math.cos(target - pose.current.angle),
      );
    const transition = gsap
      .timeline()
      .to(
        pose.current,
        { angle: nearest, duration: 1.05, ease: "power3.inOut" },
        0,
      )
      .to(
        pose.current,
        {
          turn: active ? Math.PI * 2 : 0,
          duration: 1.25,
          ease: "power3.inOut",
        },
        0,
      );
    return () => {
      transition.kill();
    };
  }, [index, activeIndex, active]);
  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const dt = Math.min(delta, 0.05);
    if (!paused) time.current += dt;
    const t = mobile ? progress.current * 0.28 : progress.current;
    const close = MathUtils.smoothstep(t, 0.1, 0.55);
    const explode = Math.max(
      inspect ? 1 : 0,
      MathUtils.smoothstep(t, 0.68, 0.94),
    );
    const angle = pose.current.angle;
    const front = (Math.cos(angle) + 1) / 2;
    g.visible = !mobile || active;
    const x = mobile
      ? Math.sin(angle) * 2.3
      : Math.sin(angle) * 2.7 * (1 + close * 0.8) + (active ? close * 1.15 : 0);
    g.position.x = MathUtils.damp(g.position.x, x, 7, dt);
    g.position.y = MathUtils.damp(
      g.position.y,
      -0.16 +
        (1 - front) * 0.4 +
        (1 - pose.current.enter) * -3.5 +
        Math.sin(time.current * 0.65 + index * 1.7) * 0.1,
      6,
      dt,
    );
    g.position.z = MathUtils.damp(
      g.position.z,
      Math.cos(angle) * 1.25 - close * (active ? 0 : 3),
      7,
      dt,
    );
    const scale =
      (mobile ? 1.16 : 0.77 + front * 0.62) +
      (active ? close * 0.12 - explode * 0.4 : -close * 0.16);
    g.scale.setScalar(
      MathUtils.damp(
        g.scale.x,
        scale * (0.7 + pose.current.enter * 0.3),
        6,
        dt,
      ),
    );
    g.rotation.y = MathUtils.damp(
      g.rotation.y,
      -0.32 -
        Math.sin(angle) * 0.6 +
        pose.current.turn +
        (active ? t * Math.PI * 1.4 + yaw.current : 0) +
        state.pointer.x * 0.1,
      7,
      dt,
    );
    g.rotation.z = MathUtils.damp(
      g.rotation.z,
      -0.28 +
        Math.sin(angle) * -0.22 +
        close * 0.43 -
        explode * 0.13 +
        Math.sin(time.current * 0.48 + index) * 0.035,
      6,
      dt,
    );
    g.rotation.x = MathUtils.damp(
      g.rotation.x,
      0.06 - close * 0.14 + state.pointer.y * 0.07,
      6,
      dt,
    );
  });
  return (
    <group ref={group} scale={0.4}>
      {(!mobile || active) && (
        <ProductModel
          index={index}
          active={active}
          progress={progress}
          inspect={inspect}
        />
      )}
    </group>
  );
}
function CameraRig({
  mobile,
  progress,
}: {
  mobile: boolean;
  progress: MutableRefObject<number>;
}) {
  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const close = mobile
      ? 0
      : MathUtils.smoothstep(progress.current, 0.1, 0.55);
    state.camera.position.z = MathUtils.damp(
      state.camera.position.z,
      (mobile ? 8.6 : 10) - close * 0.25,
      4,
      dt,
    );
    state.camera.position.x = MathUtils.damp(
      state.camera.position.x,
      state.pointer.x * 0.18,
      4,
      dt,
    );
    state.camera.lookAt(0, 0.22, 0);
  });
  return null;
}
export function ShaderWarmup({
  onComplete,
  onFailure,
}: {
  onComplete: () => void;
  onFailure: () => void;
}) {
  const { gl, scene, camera } = useThree();
  useEffect(() => {
    let cancelled = false;
    // KHR_parallel_shader_compile can prepare materials without blocking the
    // first visible frame. The poster stays in place until real frames render.
    gl.compileAsync(scene, camera).then(
      () => {
        if (!cancelled) onComplete();
      },
      () => {
        if (!cancelled) onFailure();
      },
    );
    return () => {
      cancelled = true;
    };
  }, [gl, scene, camera, onComplete, onFailure]);
  return null;
}
export function Lifecycle({
  onReady,
  onFailure,
}: {
  onReady: () => void;
  onFailure: () => void;
}) {
  const { gl } = useThree();
  const frames = useRef(0);
  useFrame(() => {
    if (++frames.current === 2) onReady();
  });
  useEffect(() => {
    const canvas = gl.domElement;
    const fail = () => onFailure();
    canvas.addEventListener("webglcontextlost", fail);
    return () => canvas.removeEventListener("webglcontextlost", fail);
  }, [gl, onFailure]);
  return null;
}
export function SoftwareRendererQuality() {
  const { gl, setDpr, size } = useThree();
  useEffect(() => {
    const context = gl.getContext();
    const extension = context.getExtension("WEBGL_debug_renderer_info");
    const renderer = extension
      ? String(context.getParameter(extension.UNMASKED_RENDERER_WEBGL))
      : "";
    if (/swiftshader|llvmpipe|software/i.test(renderer)) setDpr(0.75);
  }, [gl, setDpr, size.width, size.height]);
  return null;
}

export default function DeviceScene({
  activeIndex,
  mobile,
  running,
  progress,
  yaw,
  inspect,
  paused,
  onReady,
  onFailure,
}: {
  activeIndex: number;
  mobile: boolean;
  running: boolean;
  progress: MutableRefObject<number>;
  yaw: MutableRefObject<number>;
  inspect: boolean;
  paused: boolean;
  onReady: () => void;
  onFailure: () => void;
}) {
  const [warmed, setWarmed] = useState(false);
  const complete = useMemo(() => () => setWarmed(true), []);
  return (
    <Canvas
      camera={{ position: [0, 0.45, mobile ? 8.6 : 10], fov: mobile ? 35 : 34 }}
      dpr={[1, mobile ? 1.25 : 1.5]}
      frameloop={running && warmed ? "always" : "never"}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      fallback={<span className="sr-only">Static device presentation</span>}
      onCreated={({ gl }) => {
        gl.toneMapping = ACESFilmicToneMapping;
        gl.toneMappingExposure = 0.95;
        gl.outputColorSpace = SRGBColorSpace;
      }}
    >
      <SoftboxEnvironment />
      <SoftwareRendererQuality />
      <StudioLighting activeIndex={activeIndex} />
      <CameraRig mobile={mobile} progress={progress} />
      <ShaderWarmup onComplete={complete} onFailure={onFailure} />
      <Lifecycle onReady={onReady} onFailure={onFailure} />
      {devices.map((device, index) => (
        <Product
          key={device.id}
          index={index}
          activeIndex={activeIndex}
          mobile={mobile}
          progress={progress}
          yaw={yaw}
          inspect={inspect}
          paused={paused}
        />
      ))}
    </Canvas>
  );
}
