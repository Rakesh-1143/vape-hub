import { useState, type CSSProperties } from "react";
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { AgeGate } from "../../components/layout/AgeGate";
import { HomeMotionProvider } from "./animations/HomeMotionProvider";
import { devices } from "./data/devices";
import { CinematicHero } from "./components/CinematicHero";
import { ProductCategories } from "./components/ProductCategories";
import { WhyVapeHub } from "./components/WhyVapeHub";
import { ProductStory } from "./components/ProductStory";
import { StoreExperience } from "./components/StoreExperience";
import { FAQSection } from "./components/FAQSection";
import { FinalCTA } from "./components/FinalCTA";
function HomeContent() {
  const [index, setIndex] = useState(0);
  const select = (n: number) => setIndex((n + devices.length) % devices.length);
  return (
    <div
      id="top"
      style={{ "--accent": devices[index].accent } as CSSProperties}
    >
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="announcement">
        <span>A local shop. A considered selection.</span>
        <span>
          For adults 21+ <span className="announcement-dot" /> Pueblo, CO
        </span>
      </div>
      <Header />
      <main id="main" tabIndex={-1}>
        <CinematicHero index={index} select={select} />
        <section id="details" className="story-bridge">
          <h2>
            A closer look.
            <br />A better conversation.
          </h2>
          <div>
            <p>
              Explore categories here. See the current selection in store with
              help from our team.
            </p>
            <p className="concept-disclaimer">
              The devices above are original design concepts, not products
              offered for sale. Ask our team about current stock.
            </p>
          </div>
        </section>
        <ProductCategories />
        <WhyVapeHub />
        <ProductStory />
        <StoreExperience />
        <section className="pickup-section">
          <div>
            <h2>Keep it local.</h2>
            <p>
              Online pickup ordering is planned. For now, contact the shop or
              visit us to make your purchase.
            </p>
          </div>
          <ol className="pickup-steps">
            <li>
              <span>01</span>
              <div>
                <h3>Explore the categories</h3>
                <p>Browse the information on this page.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Talk to the team</h3>
                <p>Call to check current availability.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Visit the store</h3>
                <p>Bring valid photo ID. Purchases are in store.</p>
              </div>
            </li>
          </ol>
        </section>
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
export function HomePage() {
  return (
    <HomeMotionProvider>
      <AgeGate>
        <HomeContent />
      </AgeGate>
    </HomeMotionProvider>
  );
}
