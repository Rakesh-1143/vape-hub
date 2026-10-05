import { store } from "../../features/home/data/store";
export function createStoreMetadata(siteURL: string) {
  return {
    title: "The Vape Hub | Adult Specialty Store in Pueblo, Colorado",
    description:
      "Explore devices, e-liquids, pods and accessories at The Vape Hub in Pueblo, Colorado. Local product guidance and in-store support. Adults 21+.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Store",
      name: store.name,
      url: siteURL,
      telephone: "+1-719-924-9524",
      email: store.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: store.address,
        addressLocality: store.locality,
        addressRegion: store.region,
        postalCode: store.postalCode,
        addressCountry: "US",
      },
    },
  };
}
