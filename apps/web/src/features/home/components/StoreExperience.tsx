import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { store } from "../data/store";
import { StoreHours } from "./StoreHours";
export function StoreExperience() {
  return (
    <section
      id="our-store"
      className="local-store"
      aria-labelledby="store-title"
    >
      <div className="local-store-art">
        {store.image ? (
          <picture>
            {store.image.avif && (
              <source
                srcSet={`${import.meta.env.BASE_URL}${store.image.avif}`}
                type="image/avif"
              />
            )}
            {store.image.webp && (
              <source
                srcSet={`${import.meta.env.BASE_URL}${store.image.webp}`}
                type="image/webp"
              />
            )}
            <img
              src={`${import.meta.env.BASE_URL}${store.image.fallback}`}
              alt={store.image.alt}
              loading="lazy"
              decoding="async"
              width="900"
              height="700"
            />
          </picture>
        ) : (
          <svg
            viewBox="0 0 900 700"
            role="img"
            aria-label="Original architectural store illustration; approved store photography pending"
          >
            <defs>
              <linearGradient id="store-sky" x2="0" y2="1">
                <stop stopColor="#18243b" />
                <stop offset="1" stopColor="#514352" />
              </linearGradient>
              <linearGradient id="store-wall">
                <stop stopColor="#282f3d" />
                <stop offset="1" stopColor="#141b27" />
              </linearGradient>
              <linearGradient id="store-glass">
                <stop stopColor="#1a293a" />
                <stop offset=".5" stopColor="#4e596c" />
                <stop offset="1" stopColor="#142030" />
              </linearGradient>
            </defs>
            <rect width="900" height="700" fill="url(#store-sky)" />
            <path d="M0 540L900 500V700H0Z" fill="#151c28" />
            <path
              d="M120 245L645 160L816 269V535L270 630L120 520Z"
              fill="url(#store-wall)"
            />
            <path d="M120 245L645 160L816 269L270 350Z" fill="#586171" />
            <path d="M270 350L816 269V535L270 630Z" fill="#252e40" />
            <path d="M295 377L782 302V348L295 426Z" fill="#121924" />
            <text
              x="541"
              y="380"
              fill="#eeece7"
              fontFamily="Barlow Condensed, sans-serif"
              fontSize="36"
              textAnchor="middle"
              transform="rotate(-9 541 380)"
            >
              THE VAPE HUB
            </text>
            <path
              d="M300 451L440 429V572L300 596Z"
              fill="url(#store-glass)"
              stroke="#697383"
              strokeWidth="3"
            />
            <path
              d="M461 426L589 405V548L461 570Z"
              fill="url(#store-glass)"
              stroke="#697383"
              strokeWidth="3"
            />
            <path
              d="M608 402L776 376V516L608 545Z"
              fill="url(#store-glass)"
              stroke="#697383"
              strokeWidth="3"
            />
            <path
              d="M374 439V584M694 389V532"
              stroke="#7e8797"
              strokeWidth="3"
            />
            <path
              d="M476 487L488 485V513L476 515"
              stroke="#d6a27b"
              strokeWidth="4"
            />
            <path
              d="M322 484L420 468M632 453L754 434"
              stroke="#bc87ba"
              strokeOpacity=".7"
              strokeWidth="4"
            />
            <path
              d="M163 328L228 369V534L163 493Z"
              fill="#142030"
              stroke="#475263"
            />
            <path
              d="M269 635L822 539L868 562L300 666Z"
              fill="#87909c"
              opacity=".2"
            />
            <path
              d="M0 658L263 609M583 700L900 646"
              stroke="#626e82"
              strokeOpacity=".4"
            />
          </svg>
        )}
        <span className="store-image-note">
          {store.image
            ? "The Vape Hub · Pueblo"
            : "Original store illustration · photography pending"}
        </span>
      </div>
      <div className="local-store-copy">
        <p className="store-place">
          <MapPin size={18} aria-hidden="true" /> Pueblo, Colorado
        </p>
        <h2 id="store-title">
          A real place.
          <br />
          Real people.
        </h2>
        <p>
          Product guidance, compatibility help and in-store support. Visit our
          local specialty shop with your questions.
        </p>
        <address>
          {store.address}
          <br />
          {store.locality}, {store.region} {store.postalCode}
        </address>
        <div className="store-actions">
          <a className="button button-light" href={store.telephone}>
            <Phone size={17} aria-hidden="true" /> Call the shop
          </a>
          <a
            className="button button-outline"
            href={store.directions}
            target="_blank"
            rel="noreferrer"
          >
            Directions <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
        <StoreHours />
        <p className="adult-store-note">{store.ageNotice}</p>
      </div>
    </section>
  );
}
