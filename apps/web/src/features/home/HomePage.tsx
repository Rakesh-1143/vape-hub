import { ArrowUpRight, MapPin, Phone, Plus } from "lucide-react";
import { useState, type CSSProperties } from "react";

import { Header } from "../../components/layout/Header";
import { Brand } from "../../components/ui/Brand";

import { categories, devices } from "./data/devices";
import { CinematicHero } from "./components/CinematicHero";

const directions =
  "https://www.google.com/maps/search/?api=1&query=1281+West+Pueblo+Boulevard+Pueblo+CO+81004";
export function HomePage() {
  const [index, setIndex] = useState(0);
  const [category, setCategory] = useState<string | null>(null);
  const device = devices[index];
  const select = (n: number) => setIndex((n + devices.length) % devices.length);
  return (
    <div id="top" style={{ "--accent": device.accent } as CSSProperties}>
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
      <main id="main">
        <CinematicHero index={index} select={select} />
        <section id="details" className="feature-section">
          <div>
            <p className="section-note">The details make the difference</p>
            <h2>
              Small things.
              <br />
              Better choices.
            </h2>
          </div>
          <div className="feature-copy">
            <p>
              A finish you like. A size that feels right. A setup you
              understand.
            </p>
            <p>
              Our team helps you compare devices, check compatibility, and find
              what works for you. Start with a conversation in store.
            </p>
            <a className="text-link" href="#visit">
              Find your fit with us <ArrowUpRight size={17} />
            </a>
          </div>
          <p className="concept-disclaimer">
            The devices above are original design concepts, not products offered
            for sale. Ask our team about current stock.
          </p>
        </section>
        <section
          id="collection"
          className="collection-section"
          aria-labelledby="collection-title"
        >
          <div className="section-heading">
            <div>
              <p className="section-note">Explore your options</p>
              <h2 id="collection-title">Your setup starts here.</h2>
            </div>
            <a href="#visit" className="text-link">
              Ask about availability <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="category-grid">
            {categories.map((c) => (
              <a
                className={`category-card ${c.kind}`}
                key={c.id}
                href={`#category-${c.id}`}
                onClick={() => setCategory(c.id)}
              >
                <div className="category-art" aria-hidden="true">
                  <span className="art-object" />
                  <span className="art-object second" />
                </div>
                <div className="category-card-copy">
                  <h3>{c.name}</h3>
                  <p>{c.description}</p>
                  <span className="category-arrow">
                    <ArrowUpRight size={21} />
                  </span>
                </div>
              </a>
            ))}
          </div>
          <div className="category-details">
            {categories.map((c) => (
              <article
                id={`category-${c.id}`}
                key={c.id}
                hidden={category !== c.id}
              >
                <h3>{c.name}</h3>
                <p>
                  {c.id === "devices"
                    ? "Compare pod systems, devices, and starter kits with help from our team."
                    : c.id === "liquids"
                      ? "Ask our team about the e-liquids and nicotine options currently available."
                      : "Bring your device details so we can help check coil, battery, and charger compatibility."}{" "}
                  Selection changes; call ahead for current availability.
                </p>
                <a className="text-link" href="tel:+17199249524">
                  Call the store <Phone size={16} />
                </a>
              </article>
            ))}
          </div>
        </section>
        <section id="our-store" className="store-section">
          <div className="store-visual">
            <div className="store-sign">
              <span className="sign-small">Your local</span>
              <strong>
                VAPE
                <br />
                HUB.
              </strong>
              <span className="sign-bottom">Pueblo, Colorado</span>
            </div>
            <div className="store-visual-note">Good people. Good guidance.</div>
          </div>
          <div className="store-copy">
            <p className="section-note">Right here in Pueblo</p>
            <h2>
              More than a place
              <br />
              to pick up gear.
            </h2>
            <p>
              Sometimes you need a new coil. Sometimes you need someone to
              explain the options. We’re here for both.
            </p>
            <p>
              Visit our shop for product guidance, compatibility checks, and
              help looking after your setup.
            </p>
            <a href="#visit" className="button button-outline">
              Come say hello <ArrowUpRight size={18} />
            </a>
            <div className="store-facts">
              <span>
                <MapPin size={18} /> West Pueblo Boulevard
              </span>
              <span>Adults 21+ · ID required</span>
            </div>
          </div>
        </section>
        <section className="pickup-section">
          <div>
            <p className="section-note">Keep it local</p>
            <h2>Let’s get you sorted.</h2>
            <p>
              Online pickup ordering is planned. For now, contact the shop or
              visit us to make your purchase.
            </p>
          </div>
          <ol className="pickup-steps">
            <li>
              <span>01</span>
              <div>
                <h3>Explore your options</h3>
                <p>Get a feel for the categories we carry.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Talk to the team</h3>
                <p>Call ahead to check current stock.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Visit the shop</h3>
                <p>Bring valid photo ID. Purchases are in store.</p>
              </div>
            </li>
          </ol>
        </section>
        <section id="questions" className="faq-section">
          <div>
            <p className="section-note">Good to know</p>
            <h2>
              A few answers
              <br />
              before you visit.
            </h2>
          </div>
          <div className="faq-list">
            {[
              [
                "Do I need to bring ID?",
                "Yes. Age-restricted purchases are for adults 21 and older. Bring valid photo identification when you visit.",
              ],
              [
                "Can I order online?",
                "Online ordering is not available on this site yet. Call the store to check availability, then visit to purchase.",
              ],
              [
                "Can you help me choose a device?",
                "Our team can help compare options and explain device compatibility, operation, and maintenance.",
              ],
              [
                "What is your return policy?",
                "Return eligibility depends on the product and its condition. Ask our team about the current policy before purchasing.",
              ],
            ].map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <Plus size={18} />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
        <section id="visit" className="visit-section">
          <div>
            <p className="section-note">We’ll see you here</p>
            <h2>
              Your next stop.
              <br />
              The Vape Hub.
            </h2>
            <a
              className="button button-light"
              href={directions}
              target="_blank"
              rel="noreferrer"
            >
              Get directions <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="visit-details">
            <div>
              <MapPin size={20} />
              <address>
                1281 West Pueblo Boulevard
                <br />
                Pueblo, CO 81004
              </address>
            </div>
            <div>
              <Phone size={20} />
              <a href="tel:+17199249524">(719) 924-9524</a>
            </div>
            <p>Call ahead for current hours and product availability.</p>
            <a
              className="text-link"
              href="mailto:gduran@thevapehubcolorado.com"
            >
              Email the store <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
      </main>
      <footer>
        <div className="footer-top">
          <Brand />
          <a className="text-link" href="#top">
            Back to top <ArrowUpRight size={16} />
          </a>
        </div>
        <p className="legal">
          For adults 21 and older. Products may contain nicotine, an addictive
          chemical. Follow manufacturer instructions for devices and batteries.
        </p>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} The Vape Hub</span>
          <span>Made for our neighborhood.</span>
        </div>
      </footer>
    </div>
  );
}
