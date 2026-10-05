import * as m from "motion/react-m";
import { MessageCircle, Cable, Wrench, ArrowUpRight } from "lucide-react";
import { guidance } from "../data/content";
import { useMediaQuery } from "../../../lib/useMediaQuery";
const icons = {
  conversation: MessageCircle,
  compatibility: Cable,
  support: Wrench,
};
export function WhyVapeHub() {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  return (
    <section className="why-hub" id="guidance" aria-labelledby="guidance-title">
      <div className="why-heading">
        <h2 id="guidance-title">
          Good questions.
          <br />
          Local answers.
        </h2>
        <p>
          Some details are easier to discuss in person.
          <br />
          That’s where our team comes in.
        </p>
      </div>
      <m.div
        className="guidance-grid"
        initial={reduced ? false : "rest"}
        whileInView="shown"
        viewport={{ once: true, amount: 0.25 }}
        variants={{
          rest: {},
          shown: { transition: { staggerChildren: 0.12 } },
        }}
      >
        {guidance.map((item) => {
          const Icon = icons[item.icon];
          return (
            <m.article
              key={item.id}
              variants={{
                rest: { opacity: 0.3, y: 18 },
                shown: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <Icon size={30} strokeWidth={1.4} aria-hidden="true" />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </m.article>
          );
        })}
      </m.div>
      <a className="text-link" href="#our-store">
        Meet us in Pueblo <ArrowUpRight size={18} aria-hidden="true" />
      </a>
    </section>
  );
}
