import { forwardRef } from "react";
import { useIsPresent } from "motion/react";
import * as m from "motion/react-m";
import type { FeaturedDevice } from "@vape-hub/contracts";

export const AnimatedFinish = forwardRef<HTMLDivElement, { device: FeaturedDevice; reduced: boolean }>(function AnimatedFinish({ device, reduced }, ref) {
  const present = useIsPresent();
  return <m.div ref={ref} aria-hidden={!present} initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }} transition={{ duration: reduced ? 0 : 0.35 }}>
    <h2>{device.name}</h2><p>{device.finish}</p>
  </m.div>;
});
