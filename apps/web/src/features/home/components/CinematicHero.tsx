import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Layers3,
  Pause,
  Play,
  RotateCw,
} from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, LazyMotion, MotionConfig } from "motion/react";
import * as m from "motion/react-m";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "../../../lib/useMediaQuery";
import { devices } from "../data/devices";
import { ProductStage } from "./ProductStage";
import { AnimatedFinish } from "./AnimatedFinish";

gsap.registerPlugin(ScrollTrigger);
const loadMotion = () =>
  import("../scene/domMotion").then((module) => module.default);

export function CinematicHero({
  index,
  select,
}: {
  index: number;
  select: (index: number) => void;
}) {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const mobile = useMediaQuery("(max-width: 767px)");
  const hero = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const yaw = useRef(0);
  const [inspect, setInspect] = useState(false);
  const [paused, setPaused] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const device = devices[index];
  useEffect(() => {
    if (reduced || !hero.current) {
      progress.current = 0;
      return;
    }
    const ctx = gsap.context(() => {
      const sequence = gsap.timeline({
        scrollTrigger: {
          trigger: hero.current,
          start: "top top",
          end: mobile ? "bottom center" : "+=1100",
          scrub: 0.75,
          pin: !mobile,
          invalidateOnRefresh: true,
        },
      });
      sequence.to(progress, { current: 1, duration: 1, ease: "none" }, 0);
      if (!mobile) {
        sequence
          .to(".hero-intro", { autoAlpha: 0, y: -70, duration: 0.22 }, 0.06)
          .fromTo(
            ".hero-story",
            { autoAlpha: 0, y: 35 },
            { autoAlpha: 1, y: 0, duration: 0.2 },
            0.26,
          )
          .to(".hero-story", { autoAlpha: 0, y: -35, duration: 0.14 }, 0.67)
          .fromTo(
            ".hero-construction",
            { autoAlpha: 0, y: 35 },
            { autoAlpha: 1, y: 0, duration: 0.17 },
            0.8,
          )
          .to(".cinema-backdrop", { scale: 1.12, duration: 1 }, 0);
      }
    }, hero);
    return () => {
      ctx.revert();
      progress.current = 0;
    };
  }, [mobile, reduced]);
  const change = (n: number) => {
    yaw.current = 0;
    select(n);
  };
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadMotion} strict>
        <section
          className="hero cinema-hero"
          ref={hero}
          aria-labelledby="hero-title"
          style={{ "--accent": device.accent } as CSSProperties}
        >
          <div className="cinema-backdrop" aria-hidden="true">
            <div className="cinema-halo" />
            <div className="cinema-horizon" />
          </div>
          <div className="cinema-topline">
            <span>
              <i /> Pueblo, Colorado
            </span>
            <span>A design study in three finishes</span>
          </div>
          <div className="hero-intro cinema-intro">
            <m.h1
              id="hero-title"
              aria-label="Find your next setup."
              initial={reduced ? false : { y: 24, opacity: 0.7 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <span>Find your</span>
              <span>next setup.</span>
            </m.h1>
            <p className="hero-description">
              Good gear. Real guidance.
              <br />
              Your next chapter starts here.
            </p>
            <a className="button button-light" href="#collection">
              Explore the collection{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
          <div className="hero-story cinema-story">
            <p className="section-note">Look a little closer</p>
            <h2>
              Form.
              <br />
              Finish.
              <br />
              Feeling.
            </h2>
            <p>
              Turn it around. Catch the light.
              <br />
              Find the details that feel like you.
            </p>
          </div>
          <div className="hero-construction cinema-story">
            <p className="section-note">An original design study</p>
            <h2>
              Outside.
              <br />
              Inside out.
            </h2>
            <p>
              A visual exploration of construction.
              <br />
              Concept parts, not technical specifications.
            </p>
          </div>
          <ProductStage
            device={device}
            index={index}
            reducedMotion={reduced}
            mobile={mobile}
            progress={progress}
            yaw={yaw}
            inspect={inspect}
            paused={paused}
            onStatus={setSceneReady}
          />
          <div className="cinema-side-note" aria-hidden="true">
            The Vape Hub / Concept studio
          </div>
          <div className="hero-product cinema-product">
            <span className="concept-label">Original device concept</span>
            <AnimatePresence initial={false} mode="popLayout">
              <AnimatedFinish key={device.id} device={device} reduced={reduced} />
            </AnimatePresence>
          </div>
          <div className="cinema-tools" aria-label="3D presentation controls">
            <m.button
              whileTap={reduced ? undefined : { scale: 0.95 }}
              onClick={() => {
                yaw.current += Math.PI / 3;
              }}
              aria-label="Rotate device"
              disabled={reduced || !sceneReady}
            >
              <RotateCw size={16} aria-hidden="true" />
              <span>Rotate</span>
            </m.button>
            <m.button
              whileTap={reduced ? undefined : { scale: 0.95 }}
              onClick={() => setInspect((v) => !v)}
              aria-label={inspect ? "Assemble design" : "Inspect design"}
              aria-pressed={inspect}
              disabled={reduced || !sceneReady}
            >
              <Layers3 size={16} aria-hidden="true" />
              <span>{inspect ? "Assemble" : "Inspect design"}</span>
            </m.button>
            <button
              onClick={() => setPaused((v) => !v)}
              aria-label={
                paused ? "Resume ambient motion" : "Pause ambient motion"
              }
              aria-pressed={paused}
              disabled={reduced || !sceneReady}
            >
              {paused ? (
                <Play size={16} aria-hidden="true" />
              ) : (
                <Pause size={16} aria-hidden="true" />
              )}
            </button>
          </div>
          <div className="hero-bottom cinema-bottom">
            <a className="scroll-cue" href="#details">
              <span className="circle-icon">
                <ArrowDown size={17} aria-hidden="true" />
              </span>
              <span>A closer look</span>
            </a>
            <div
              className="product-controls"
              aria-label="Choose a concept device"
            >
              <button
                className="circle-icon"
                aria-label="Previous device"
                onClick={() => change(index - 1)}
              >
                <ArrowLeft size={18} aria-hidden="true" />
              </button>
              <div className="product-dots">
                {devices.map((d, i) => (
                  <button
                    key={d.id}
                    className={`finish-choice ${i === index ? "active" : ""}`}
                    aria-label={`Show ${d.name} device`}
                    aria-pressed={i === index}
                    onClick={() => change(i)}
                    style={{ "--dot": d.accent } as CSSProperties}
                  >
                    <i />
                    <span>{d.name}</span>
                  </button>
                ))}
              </div>
              <button
                className="circle-icon"
                aria-label="Next device"
                onClick={() => change(index + 1)}
              >
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
            <span className="cinema-footnote">
              Concepts, not purchasable inventory.
            </span>
          </div>
          <div className="sr-only" aria-live="polite">
            Selected concept: {device.name}, {device.finish}.{" "}
            {inspect ? "Design inspection view." : "Assembled view."}
          </div>
        </section>
      </LazyMotion>
    </MotionConfig>
  );
}
