import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState, type MutableRefObject } from "react";
import {
  ACESFilmicToneMapping,
  Color,
  Group,
  MathUtils,
  PointLight,
  SRGBColorSpace,
} from "three";
import {
  SoftboxEnvironment,
  Lifecycle,
  SoftwareRendererQuality,
  ShaderWarmup,
} from "./DeviceScene";
import { DeviceModel } from "./DeviceModel";
function StoryObjects({ progress }: { progress: MutableRefObject<number> }) {
  const objects = useRef<Group>(null),
    zero = useRef(0),
    light = useRef<PointLight>(null),
    color = useRef(new Color());
  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05),
      t = progress.current;
    objects.current?.children.forEach((object, index) => {
      const distance = t * 2 - index;
      object.visible = Math.abs(distance) < 1.1;
      object.position.x = distance * -4.8;
      object.position.z = -Math.abs(distance) * 1.2;
      object.rotation.y = t * 1.4 + 0.25 + state.pointer.x * 0.1;
      object.rotation.z = -0.16 + Math.sin(t * Math.PI) * 0.23;
      object.scale.setScalar(1.14 - Math.abs(distance) * 0.3);
    });
    color.current.set(t < 0.35 ? "#bc87ba" : t < 0.72 ? "#d6a27b" : "#7eacd6");
    light.current?.color.lerp(color.current, 1 - Math.exp(-dt * 4));
    state.camera.position.x = MathUtils.damp(
      state.camera.position.x,
      state.pointer.x * 0.12,
      4,
      dt,
    );
    state.camera.lookAt(0, 0.1, 0);
  });
  return (
    <>
      <pointLight
        ref={light}
        position={[2, 1, 3]}
        intensity={12}
        distance={12}
      />
      <group ref={objects}>
        <group>
          <DeviceModel
            index={0}
            active={false}
            progress={zero}
            inspect={false}
          />
        </group>
        <group>
          <mesh>
            <cylinderGeometry args={[0.6, 0.6, 2.25, 32]} />
            <meshPhysicalMaterial
              color="#9b684d"
              metalness={0.35}
              roughness={0.22}
              clearcoat={1}
            />
          </mesh>
          <mesh position={[0, 1.42, 0]}>
            <cylinderGeometry args={[0.43, 0.43, 0.62, 32]} />
            <meshPhysicalMaterial
              color="#1e2630"
              roughness={0.25}
              metalness={0.45}
            />
          </mesh>
          <mesh position={[0, -0.1, 0.015]}>
            <cylinderGeometry args={[0.607, 0.607, 1.2, 32, 1, true]} />
            <meshStandardMaterial
              color="#172130"
              roughness={0.35}
              metalness={0.2}
            />
          </mesh>
          <mesh position={[0, -0.1, 0.61]}>
            <planeGeometry args={[0.64, 0.56]} />
            <meshStandardMaterial
              color="#d6a27b"
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>
        </group>
        <group>
          {[-0.38, 0.38].map((x, index) => (
            <group key={x} position={[x, -index * 0.14, 0]}>
              <mesh>
                <cylinderGeometry args={[0.3, 0.3, 2.55, 24]} />
                <meshPhysicalMaterial
                  color="#365875"
                  metalness={0.72}
                  roughness={0.24}
                  clearcoat={0.8}
                />
              </mesh>
              <mesh position={[0, 1.29, 0]}>
                <cylinderGeometry args={[0.28, 0.28, 0.06, 24]} />
                <meshStandardMaterial
                  color="#b2b5bb"
                  metalness={1}
                  roughness={0.23}
                />
              </mesh>
            </group>
          ))}
          <mesh position={[0.98, -0.2, -0.16]}>
            <boxGeometry args={[0.36, 2.1, 0.5]} />
            <meshStandardMaterial
              color="#18212f"
              metalness={0.4}
              roughness={0.3}
            />
          </mesh>
        </group>
      </group>
    </>
  );
}
export default function StoryScene({
  progress,
  running,
  mobile,
  onReady,
  onFailure,
}: {
  progress: MutableRefObject<number>;
  running: boolean;
  mobile: boolean;
  onReady: () => void;
  onFailure: () => void;
}) {
  const [warmed, setWarmed] = useState(false);
  const complete = useMemo(() => () => setWarmed(true), []);
  return (
    <Canvas
      camera={{ position: [0, 0.1, 8.8], fov: 33 }}
      dpr={[1, mobile ? 1 : 1.4]}
      frameloop={running && warmed ? "always" : "never"}
      gl={{ alpha: true, antialias: true }}
      onCreated={({ gl }) => {
        gl.toneMapping = ACESFilmicToneMapping;
        gl.outputColorSpace = SRGBColorSpace;
        gl.toneMappingExposure = 0.95;
      }}
    >
      <SoftboxEnvironment />
      <SoftwareRendererQuality />
      <ambientLight intensity={0.3} />
      <directionalLight position={[-3, 4, 4]} intensity={2.5} />
      <StoryObjects progress={progress} />
      <ShaderWarmup onComplete={complete} onFailure={onFailure} />
      <Lifecycle onReady={onReady} onFailure={onFailure} />
    </Canvas>
  );
}
