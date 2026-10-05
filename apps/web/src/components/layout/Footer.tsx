import { ArrowUpRight } from "lucide-react";
import { Brand } from "../ui/Brand";
import { store } from "../../features/home/data/store";
export function Footer() {
  return (
    <footer className="story-footer">
      <div className="footer-main">
        <div>
          <Brand />
          <p>
            Local guidance in Pueblo, Colorado.
            <br />
            For adults 21 and older.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <a href="#collection">Products</a>
          <a href="#guidance">Store guidance</a>
          <a href="#our-store">Store location</a>
          <a href="#questions">FAQ</a>
        </nav>
        <div className="footer-contacts">
          <address>
            {store.address}
            <br />
            {store.locality}, {store.region} {store.postalCode}
          </address>
          <a href={store.telephone}>{store.phone}</a>
          <a href={`mailto:${store.email}`}>{store.email}</a>
        </div>
      </div>
      <div className="footer-policy-links">
        <a href="#policy-privacy">Privacy</a>
        <a href="#policy-terms">Terms</a>
        <a href="#policy-returns">Returns</a>
        <a href="#top" className="footer-top-link">
          Back to top <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
      <div className="policy-notes">
        <details id="policy-privacy">
          <summary>Privacy information</summary>
          <p>
            This preview stores an adult-entry confirmation on this device.
            Owner-approved privacy terms for the future storefront are pending
            publication.
          </p>
        </details>
        <details id="policy-terms">
          <summary>Terms information</summary>
          <p>
            This is an informational homepage preview. Online purchases are
            unavailable. Owner-approved terms for the planned storefront are
            pending publication.
          </p>
        </details>
        <details id="policy-returns">
          <summary>Returns information</summary>
          <p>
            Eligibility depends on the item and its condition. Contact the store
            for its current policy before purchasing or returning a product.
          </p>
        </details>
      </div>
      <p className="footer-content-notice">
        {store.ageNotice} {store.contentNotice}
      </p>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} The Vape Hub</span>
        <span>Pueblo, Colorado</span>
      </div>
    </footer>
  );
}
