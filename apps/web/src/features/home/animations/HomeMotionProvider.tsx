import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";
const loadMotion = () =>
  import("../scene/domMotion").then((module) => module.default);
export function HomeMotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadMotion} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
