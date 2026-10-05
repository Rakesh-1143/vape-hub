import { lazy, Suspense, useEffect, useRef, useState } from "react";
import type { FeaturedDevice } from "@vape-hub/contracts";
import { SceneBoundary } from "./SceneBoundary";
const Scene = lazy(() => import("../scene/DeviceScene"));
export function ProductStage({
  device,
  index,
  reducedMotion,
  mobile,
  progress,
  yaw,
  inspect,
  paused,
  onStatus,
}: {
  device: FeaturedDevice;
  index: number;
  reducedMotion: boolean;
  mobile: boolean;
  progress: React.MutableRefObject<number>;
  yaw: React.MutableRefObject<number>;
  inspect: boolean;
  paused: boolean;
  onStatus?: (ready: boolean) => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [tabVisible, setTabVisible] = useState(!document.hidden);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "100px" },
    );
    observer.observe(el);
    const update = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  const enabled = !reducedMotion && !failed;
  useEffect(() => {
    if (!enabled) setReady(false);
  }, [enabled]);
  useEffect(() => {
    onStatus?.(ready && enabled);
  }, [ready, enabled, onStatus]);
  return (
    <div
      className="product-stage"
      ref={host}
      aria-label={`${device.finish} ${inspect ? "exploded" : "assembled"} concept device presentation`}
      role="img"
      data-view={inspect ? "exploded" : "assembled"}
    >
      <div className="stage-floor" />
      <img
        className={`stage-poster ${ready && enabled ? "is-hidden" : ""}`}
        fetchPriority="high"
        src={`${import.meta.env.BASE_URL}${device.poster.replace(/^\//, "")}`}
        alt=""
      />
      {enabled && (
        <SceneBoundary onFailure={() => setFailed(true)}>
          <Suspense fallback={null}>
            <Scene
              activeIndex={index}
              mobile={mobile}
              running={visible && tabVisible}
              progress={progress}
              yaw={yaw}
              inspect={inspect}
              paused={paused}
              onReady={() => setReady(true)}
              onFailure={() => setFailed(true)}
            />
          </Suspense>
        </SceneBoundary>
      )}
      <span className="stage-caption">Original concept · {device.finish}</span>
    </div>
  );
}
