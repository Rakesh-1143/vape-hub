import {
  Component,
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { FeaturedDevice } from "@vape-hub/contracts";
const Scene = lazy(() => import("../scene/DeviceScene"));
class SceneBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
export function ProductStage({
  device,
  index,
  reducedMotion,
  mobile,
  progress,
}: {
  device: FeaturedDevice;
  index: number;
  reducedMotion: boolean;
  mobile: boolean;
  progress: React.MutableRefObject<number>;
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
  return (
    <div
      className="product-stage"
      ref={host}
      aria-label={`${device.finish} concept device presentation`}
      role="img"
    >
      <div className="stage-ring ring-one" />
      <div className="stage-ring ring-two" />
      <div className="stage-floor" />
      <img
        className={`stage-poster ${ready && enabled ? "is-hidden" : ""}`}
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
