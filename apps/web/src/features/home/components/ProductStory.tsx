import { lazy, Suspense, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import { useMediaQuery } from "../../../lib/useMediaQuery";
import { useSceneVisibility } from "../scene/useSceneVisibility";
import { SceneBoundary } from "./SceneBoundary";
import { CategoryVisual } from "./CategoryVisual";
import { story } from "../data/content";
const Scene = lazy(() => import("../scene/StoryScene"));
gsap.registerPlugin(ScrollTrigger);
export function ProductStory() {
  const section = useRef<HTMLElement>(null),
    progress = useRef(0);
  const { host, visited, running } = useSceneVisibility();
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)"),
    mobile = useMediaQuery("(max-width: 1023px)");
  const [ready, setReady] = useState(false),
    [failed, setFailed] = useState(false);
  useEffect(() => {
    if (reduced || !section.current) return;
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: mobile ? "top center" : "top top",
          end: mobile ? "bottom center" : "+=850",
          pin: !mobile,
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      });
      timeline.to(progress, { current: 1, ease: "none", duration: 1 }, 0);
      if (!mobile)
        timeline
          .to(".story-copy-0", { autoAlpha: 0, y: -24, duration: 0.1 }, 0.25)
          .fromTo(
            ".story-copy-1",
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.12 },
            0.32,
          )
          .to(".story-copy-1", { autoAlpha: 0, y: -24, duration: 0.1 }, 0.64)
          .fromTo(
            ".story-copy-2",
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.12 },
            0.73,
          )
          .to(
            section.current,
            { "--story-accent": "#d6a27b", duration: 0.3 },
            0.3,
          )
          .to(
            section.current,
            { "--story-accent": "#7eacd6", duration: 0.3 },
            0.68,
          );
    }, section);
    return () => {
      ctx.revert();
      progress.current = 0;
    };
  }, [mobile, reduced]);
  const enabled = !reduced && !failed && visited;
  useEffect(() => {
    if (!enabled) setReady(false);
  }, [enabled]);
  return (
    <section
      className={`product-story ${reduced ? "is-static" : ""}`}
      id="product-story"
      ref={section}
      aria-labelledby="story-heading"
    >
      <h2 id="story-heading" className="sr-only">
        A closer look at our product categories
      </h2>
      <div className="story-atmosphere" aria-hidden="true" />
      <div className="story-copy-stack">
        {story.map((item, index) => (
          <div className={`story-copy story-copy-${index}`} key={item.title}>
            <p className="story-category">{item.category}</p>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <a className="text-link" href="#collection">
              Explore categories <ArrowDown size={17} aria-hidden="true" />
            </a>
          </div>
        ))}
      </div>
      <div
        className="story-stage"
        ref={host}
        role="img"
        aria-label="Original device, bottle and battery category concepts"
      >
        <div
          className={`story-poster tone-plum ${ready && enabled ? "is-hidden" : ""}`}
        >
          <CategoryVisual kind="device" />
        </div>
        {enabled && (
          <SceneBoundary onFailure={() => setFailed(true)}>
            <Suspense fallback={null}>
              <Scene
                progress={progress}
                running={running}
                mobile={mobile}
                onReady={() => setReady(true)}
                onFailure={() => setFailed(true)}
              />
            </Suspense>
          </SceneBoundary>
        )}
        <span>Original category concepts · not inventory</span>
      </div>
    </section>
  );
}
