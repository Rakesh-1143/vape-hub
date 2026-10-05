import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import {
  CanvasTexture,
  DataTexture,
  Group,
  LatheGeometry,
  Material,
  MathUtils,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  RGBAFormat,
  SRGBColorSpace,
  Vector2,
} from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { devices } from "../data/devices";

function Part({
  size,
  position = [0, 0, 0],
  material,
  radius = 0.05,
}: {
  size: [number, number, number];
  position?: [number, number, number];
  material: Material;
  radius?: number;
}) {
  const [width, height, depth] = size;
  const geometry = useMemo(
    () => new RoundedBoxGeometry(width, height, depth, 3, radius),
    [width, height, depth, radius],
  );
  useEffect(() => () => geometry.dispose(), [geometry]);
  return <mesh geometry={geometry} material={material} position={position} />;
}

function brushedSurface() {
  const pixels = new Uint8Array(128 * 128 * 4);
  for (let y = 0; y < 128; y++)
    for (let x = 0; x < 128; x++) {
      const i = (y * 128 + x) * 4;
      pixels[i] = 128;
      pixels[i + 1] = 128 + Math.round(Math.sin(y * 3.19) * 19);
      pixels[i + 2] = 250;
      pixels[i + 3] = 255;
    }
  return new DataTexture(pixels, 128, 128, RGBAFormat);
}
function displayTexture(name: string, accent: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#070d11";
    ctx.fillRect(0, 0, 256, 512);
    ctx.strokeStyle = accent;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(128, 168, 70, Math.PI * 0.8, Math.PI * 2.2);
    ctx.stroke();
    ctx.fillStyle = "#e8e8e0";
    ctx.font = "500 28px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("HUB", 128, 176);
    ctx.font = "16px sans-serif";
    ctx.fillStyle = accent;
    ctx.fillText(name.toUpperCase(), 128, 290);
    ctx.fillStyle = "#627278";
    ctx.font = "13px sans-serif";
    ctx.fillText("DESIGN CONCEPT", 128, 324);
    for (let i = 0; i < 14; i++) {
      ctx.fillStyle = i < 10 ? accent : "#233039";
      ctx.fillRect(39 + i * 13, 374, 6, 24);
    }
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

export function DeviceModel({
  index,
  active,
  progress,
  inspect,
}: {
  index: number;
  active: boolean;
  progress: MutableRefObject<number>;
  inspect: boolean;
}) {
  const body = useRef<Group>(null);
  const cap = useRef<Group>(null);
  const face = useRef<Group>(null);
  const base = useRef<Group>(null);
  const inner = useRef<Group>(null);
  const separation = useRef(0);
  const device = devices[index];
  const resources = useMemo(() => {
    const normal = brushedSurface();
    normal.needsUpdate = true;
    const display = displayTexture(device.name, device.accent);
    const paint = new MeshPhysicalMaterial({
      color: device.bodyColor,
      metalness: 0.78,
      roughness: 0.25,
      clearcoat: 0.8,
      clearcoatRoughness: 0.16,
      normalMap: normal,
      normalScale: new Vector2(0.12, 0.06),
      envMapIntensity: 1.15,
    });
    const chrome = new MeshPhysicalMaterial({
      color: "#b2b5bb",
      metalness: 1,
      roughness: 0.19,
      clearcoat: 0.4,
      envMapIntensity: 1.3,
    });
    const rubber = new MeshStandardMaterial({
      color: "#11151c",
      roughness: 0.4,
      metalness: 0.2,
    });
    const resin = new MeshPhysicalMaterial({
      color: "#222531",
      metalness: 0.15,
      roughness: 0.13,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
    });
    const screen = new MeshPhysicalMaterial({
      map: display,
      emissiveMap: display,
      emissive: "#ffffff",
      emissiveIntensity: 0.5,
      roughness: 0.18,
      clearcoat: 1,
      metalness: 0.1,
    });
    const copper = new MeshStandardMaterial({
      color: "#b98b61",
      metalness: 0.92,
      roughness: 0.28,
    });
    const mouth = new LatheGeometry(
      [
        new Vector2(0.22, 0),
        new Vector2(0.26, 0.04),
        new Vector2(0.265, 0.22),
        new Vector2(0.23, 0.44),
        new Vector2(0.2, 0.51),
        new Vector2(0.155, 0.54),
      ],
      40,
    );
    return {
      normal,
      display,
      paint,
      chrome,
      rubber,
      resin,
      screen,
      copper,
      mouth,
    };
  }, [device]);
  useEffect(
    () => () => {
      resources.normal.dispose();
      resources.display.dispose();
      resources.mouth.dispose();
      [
        resources.paint,
        resources.chrome,
        resources.rubber,
        resources.resin,
        resources.screen,
        resources.copper,
      ].forEach((material) => material.dispose());
    },
    [resources],
  );
  useFrame((_, delta) => {
    const scroll = MathUtils.smoothstep(progress.current, 0.68, 0.94);
    const target = active ? Math.max(inspect ? 1 : 0, scroll) : 0;
    separation.current = MathUtils.damp(
      separation.current,
      target,
      5,
      Math.min(delta, 0.05),
    );
    const t = separation.current;
    if (body.current) {
      body.current.position.set(-t * 0.46, 0, -t * 0.65);
      body.current.rotation.y = -t * 0.3;
    }
    if (face.current) {
      face.current.position.set(t * 0.72, 0, t * 0.7);
      face.current.rotation.y = t * 0.3;
    }
    if (cap.current) cap.current.position.y = t * 0.82;
    if (base.current) base.current.position.y = -t * 0.42;
    if (inner.current) inner.current.visible = t > 0.05;
  });
  return (
    <group>
      <group ref={body}>
        <Part
          size={[1.04, 2.68, 0.61]}
          radius={0.18}
          material={resources.paint}
        />
        <Part
          size={[1.05, 0.08, 0.61]}
          position={[0, -1.24, 0]}
          radius={0.035}
          material={resources.chrome}
        />
        {[-1, 1].map((side) => (
          <Part
            key={side}
            size={[0.026, 2.31, 0.035]}
            position={[side * 0.466, 0, 0.27]}
            radius={0.01}
            material={resources.chrome}
          />
        ))}
        <Part
          size={[0.05, 0.37, 0.13]}
          position={[0.52, 0.32, 0]}
          material={resources.chrome}
          radius={0.025}
        />
        {Array.from({ length: 8 }, (_, i) => (
          <Part
            key={i}
            size={[0.42, 0.018, 0.013]}
            position={[0, -0.85 + i * 0.04, -0.31]}
            material={resources.rubber}
            radius={0.004}
          />
        ))}
      </group>
      <group ref={face}>
        <Part
          size={[0.82, 2.27, 0.035]}
          position={[0, 0, 0.308]}
          radius={0.015}
          material={resources.paint}
        />
        <Part
          size={[0.44, 1.04, 0.027]}
          position={[0, 0.36, 0.334]}
          radius={0.013}
          material={resources.chrome}
        />
        <Part
          size={[0.4, 1, 0.018]}
          position={[0, 0.36, 0.354]}
          radius={0.008}
          material={resources.screen}
        />
        <mesh
          position={[0, -0.44, 0.357]}
          rotation={[Math.PI / 2, 0, 0]}
          material={resources.chrome}
        >
          <cylinderGeometry args={[0.104, 0.104, 0.035, 40]} />
        </mesh>
        <mesh
          position={[0, -0.44, 0.382]}
          rotation={[Math.PI / 2, 0, 0]}
          material={resources.rubber}
        >
          <cylinderGeometry args={[0.078, 0.078, 0.015, 40]} />
        </mesh>
        <Part
          size={[0.26, 0.018, 0.008]}
          position={[0, -0.94, 0.334]}
          material={resources.chrome}
          radius={0.004}
        />
      </group>
      <group ref={cap}>
        <Part
          size={[1.03, 0.18, 0.6]}
          position={[0, 1.31, 0]}
          material={resources.chrome}
          radius={0.07}
        />
        <Part
          size={[0.96, 0.2, 0.56]}
          position={[0, 1.45, 0]}
          material={resources.resin}
          radius={0.08}
        />
        <mesh
          geometry={resources.mouth}
          material={resources.resin}
          position={[0, 1.54, 0]}
          scale={[1.36, 1, 0.9]}
        />
        <mesh
          position={[0, 2.08, 0]}
          material={resources.rubber}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <circleGeometry args={[0.13, 32]} />
        </mesh>
      </group>
      <group ref={base}>
        <Part
          size={[1.03, 0.16, 0.6]}
          position={[0, -1.37, 0]}
          material={resources.chrome}
          radius={0.06}
        />
        <Part
          size={[0.29, 0.065, 0.02]}
          position={[0, -1.36, 0.31]}
          material={resources.rubber}
          radius={0.025}
        />
      </group>
      <group ref={inner} visible={false}>
        <Part
          size={[0.74, 2.34, 0.3]}
          material={resources.rubber}
          radius={0.1}
        />
        <Part
          size={[0.4, 1.6, 0.06]}
          position={[0, -0.1, 0.19]}
          material={resources.copper}
          radius={0.025}
        />
        {Array.from({ length: 7 }, (_, i) => (
          <Part
            key={i}
            size={[0.54, 0.021, 0.03]}
            position={[0, -0.65 + i * 0.16, 0.238]}
            material={resources.chrome}
            radius={0.006}
          />
        ))}
        {[-0.27, 0.27].map((x) => (
          <Part
            key={x}
            size={[0.018, 1.7, 0.025]}
            position={[x, 0, 0.23]}
            material={resources.copper}
            radius={0.006}
          />
        ))}
      </group>
    </group>
  );
}
