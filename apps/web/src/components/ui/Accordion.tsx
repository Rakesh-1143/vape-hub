import { useState } from "react";
import * as m from "motion/react-m";
import { Plus } from "lucide-react";
import { useMediaQuery } from "../../lib/useMediaQuery";
interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}
export function Accordion({ items }: { items: readonly AccordionItem[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  return (
    <div className="faq-list animated-faq">
      {items.map((item) => {
        const expanded = open === item.id;
        return (
          <div className="faq-item" key={item.id}>
            <h3>
              <button
                id={`faq-trigger-${item.id}`}
                aria-expanded={expanded}
                aria-controls={`faq-panel-${item.id}`}
                onClick={() => setOpen(expanded ? null : item.id)}
              >
                {item.question}
                <m.span
                  animate={{ rotate: expanded ? 45 : 0 }}
                  transition={{ duration: reduced ? 0 : 0.2 }}
                  aria-hidden="true"
                >
                  <Plus size={20} />
                </m.span>
              </button>
            </h3>
            <m.div
              id={`faq-panel-${item.id}`}
              role="region"
              aria-labelledby={`faq-trigger-${item.id}`}
              aria-hidden={!expanded}
              inert={!expanded}
              initial={false}
              animate={{
                height: expanded ? "auto" : 0,
                opacity: expanded ? 1 : 0,
              }}
              transition={{ duration: reduced ? 0 : 0.3 }}
              className="faq-answer"
            >
              <p>{item.answer}</p>
            </m.div>
          </div>
        );
      })}
    </div>
  );
}
