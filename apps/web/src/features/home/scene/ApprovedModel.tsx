import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import type { FeaturedDevice } from "@vape-hub/contracts";
export default function ApprovedModel({
  device,
}: {
  device: FeaturedDevice & { modelPath: string };
}) {
  const url = `${import.meta.env.BASE_URL}${device.modelPath.replace(/^\//, "")}`;
  const draco = device.dracoDecoderPath
    ? `${import.meta.env.BASE_URL}${device.dracoDecoderPath.replace(/^\//, "")}`
    : false;
  const { scene } = useGLTF(url, draco, true);
  // Clone transforms; cached loader resources stay shared across scene instances.
  const clone = useMemo(() => scene.clone(true), [scene]);
  return (
    <primitive object={clone} scale={device.modelScale ?? 1} dispose={null} />
  );
}
