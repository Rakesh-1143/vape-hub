import { lazy, Suspense, type MutableRefObject } from "react";
import { DeviceModel } from "./DeviceModel";
import { devices } from "../data/devices";
const ApprovedModel = lazy(() => import("./ApprovedModel"));
export function ProductModel(props: {
  index: number;
  active: boolean;
  progress: MutableRefObject<number>;
  inspect: boolean;
}) {
  const device = devices[props.index];
  if (!device.modelPath) return <DeviceModel {...props} />;
  return (
    <Suspense fallback={<DeviceModel {...props} />}>
      <ApprovedModel device={{ ...device, modelPath: device.modelPath }} />
    </Suspense>
  );
}
