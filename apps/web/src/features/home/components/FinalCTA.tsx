import { useRef } from "react";
import { useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { ArrowUpRight, Phone, Mail } from "lucide-react";
import { store } from "../data/store";
import { useMediaQuery } from "../../../lib/useMediaQuery";
export function FinalCTA() {
  const section = useRef<HTMLElement>(null);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-35, 35]);
  return (
    <section
      id="visit"
      className="final-cta"
      ref={section}
      aria-labelledby="visit-title"
    >
      <m.div
        className="closing-light"
        aria-hidden="true"
        style={{ y: reduced ? 0 : y }}
      />
      <div className="final-cta-heading">
        <p>Pueblo, Colorado · Adults 21+</p>
        <h2 id="visit-title">
          Visit
          <br />
          The Vape Hub.
        </h2>
        <a
          className="button button-light"
          href={store.directions}
          target="_blank"
          rel="noreferrer"
        >
          Get directions <ArrowUpRight size={19} aria-hidden="true" />
        </a>
      </div>
      <div className="final-cta-contact">
        <address>
          {store.address}
          <br />
          {store.locality}, {store.region} {store.postalCode}
        </address>
        <a href={store.telephone}>
          <Phone size={18} aria-hidden="true" /> {store.phone}
        </a>
        <a href={`mailto:${store.email}`}>
          <Mail size={18} aria-hidden="true" /> Email the store
        </a>
        <a href="#collection" className="text-link">
          Explore products <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
