import { Accordion } from "../../../components/ui/Accordion";
import { faqs } from "../data/content";
export function FAQSection() {
  return (
    <section
      id="questions"
      className="faq-section story-faq"
      aria-labelledby="faq-title"
    >
      <div>
        <h2 id="faq-title">
          Before
          <br />
          you visit.
        </h2>
        <p>
          Useful answers.
          <br />
          For everything else, ask our team.
        </p>
      </div>
      <Accordion items={faqs} />
    </section>
  );
}
