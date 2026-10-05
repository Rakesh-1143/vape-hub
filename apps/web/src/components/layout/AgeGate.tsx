import { useEffect, useRef, useState, type ReactNode } from "react";
import * as m from "motion/react-m";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

const storageKey = "vape-hub:adult-entry:v1";
function confirmed() {
  try {
    return localStorage.getItem(storageKey) === "confirmed";
  } catch {
    return false;
  }
}
/** Entry self-confirmation only; purchase identity checks still happen in store. */
export function AgeGate({ children }: { children: ReactNode }) {
  const [accepted, setAccepted] = useState(confirmed);
  const [entered, setEntered] = useState(false);
  const enter = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!accepted) enter.current?.focus();
    else if (entered)
      document.getElementById("main")?.focus({ preventScroll: true });
  }, [accepted, entered]);
  if (accepted) return children;
  return (
    <main className="age-entry" aria-labelledby="age-title">
      <div className="entry-atmosphere" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <m.div
        className="age-entry-panel"
        initial={{ opacity: 0.6, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="entry-symbol" aria-hidden="true">
          <ShieldCheck size={28} />
        </div>
        <p className="entry-location">Pueblo, Colorado</p>
        <h1 id="age-title">The Vape Hub</h1>
        <h2>Adults 21+ Only</h2>
        <p>
          This website contains information about age-restricted products. By
          entering, you confirm that you are 21 or older.
        </p>
        <div className="entry-actions">
          <button
            ref={enter}
            className="button button-light"
            onClick={() => {
              try {
                localStorage.setItem(storageKey, "confirmed");
              } catch {
                /* Entry works without persistent storage. */
              }
              setEntered(true);
              setAccepted(true);
            }}
          >
            Enter Site <ArrowUpRight size={18} aria-hidden="true" />
          </button>
          <a className="button button-outline" href="https://www.google.com/">
            Exit
          </a>
        </div>
        <p className="entry-note">
          Valid ID is required for age-restricted purchases in store.
        </p>
      </m.div>
      <span className="entry-bottom">A local specialty store. For adults.</span>
    </main>
  );
}
