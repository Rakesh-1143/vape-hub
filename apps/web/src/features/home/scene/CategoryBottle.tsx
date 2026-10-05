import { useEffect, useMemo } from "react";
import { CanvasTexture, LatheGeometry, SRGBColorSpace, Vector2 } from "three";

/** Original category study; geometry and lettering do not identify inventory. */
export function CategoryBottle() {
  const resources = useMemo(() => {
    const body = new LatheGeometry(
      [
        [0, -1.125],
        [0.53, -1.125],
        [0.58, -1.1],
        [0.6, -1.04],
        [0.6, 0.78],
        [0.59, 0.9],
        [0.55, 1.0],
        [0.4, 1.13],
        [0.28, 1.19],
        [0.28, 1.5],
        [0, 1.5],
      ].map(([x, y]) => new Vector2(x, y)),
      48,
    );
    const cap = new LatheGeometry(
      [
        [0, -0.3],
        [0.39, -0.3],
        [0.43, -0.27],
        [0.43, 0.24],
        [0.41, 0.29],
        [0.35, 0.31],
        [0, 0.31],
      ].map(([x, y]) => new Vector2(x, y)),
      48,
    );
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const context = canvas.getContext("2d");
    if (context) {
      context.fillStyle = "#15202c";
      context.fillRect(0, 0, 1024, 512);
      context.fillStyle = "#c39775";
      context.fillRect(0, 38, 1024, 2);
      context.fillRect(0, 472, 1024, 2);
      context.textAlign = "center";
      context.font = "500 40px sans-serif";
      context.fillText("E-LIQUIDS", 256, 245);
      context.font = "18px sans-serif";
      context.fillText("ORIGINAL CATEGORY STUDY", 256, 298);
    }
    const label = new CanvasTexture(canvas);
    label.colorSpace = SRGBColorSpace;
    return { body, cap, label };
  }, []);
  useEffect(
    () => () => {
      resources.body.dispose();
      resources.cap.dispose();
      resources.label.dispose();
    },
    [resources],
  );
  return (
    <group>
      <mesh geometry={resources.body}>
        <meshPhysicalMaterial
          color="#9b684d"
          metalness={0.35}
          roughness={0.22}
          clearcoat={1}
        />
      </mesh>
      <mesh position={[0, 1.43, 0]} geometry={resources.cap}>
        <meshPhysicalMaterial
          color="#1e2630"
          roughness={0.3}
          metalness={0.35}
          clearcoat={0.4}
        />
      </mesh>
      {[-0.21, -0.12, 0.15, 0.24].map((y) => (
        <mesh
          key={y}
          position={[0, 1.43 + y, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[0.426, 0.012, 6, 40]} />
          <meshStandardMaterial
            color="#283341"
            roughness={0.35}
            metalness={0.5}
          />
        </mesh>
      ))}
      <mesh position={[0, -0.14, 0]}>
        <cylinderGeometry args={[0.605, 0.605, 1.2, 48, 1, true]} />
        <meshStandardMaterial
          map={resources.label}
          roughness={0.45}
          metalness={0.15}
        />
      </mesh>
    </group>
  );
}
