/** Published contacts checked 2026-10-05. Hours conflict across source pages. */
export const store = {
  name: "The Vape Hub",
  phone: "(719) 924-9524",
  telephone: "tel:+17199249524",
  email: "gduran@thevapehubcolorado.com",
  address: "1281 West Pueblo Boulevard",
  locality: "Pueblo",
  region: "CO",
  postalCode: "81004",
  directions:
    "https://www.google.com/maps/search/?api=1&query=1281+West+Pueblo+Boulevard+Pueblo+CO+81004",
  ageNotice: "Adults 21+ only. Valid ID required for age-restricted purchases.",
  contentNotice:
    "Products may contain nicotine, an addictive chemical. Follow manufacturer instructions for devices and batteries.",
  hours: {
    status: "owner-confirmation" as const,
    label: "Hours are being confirmed",
    message: "Published schedules differ. Please call before your visit.",
    schedule: null,
    sources: [
      "https://www.thevapehubcolorado.com/",
      "https://www.thevapehubcolorado.com/contact",
      "https://www.thevapehubcolorado.com/products",
    ],
  },
  /** Optional approved photography. Paths are relative to the public folder. */
  image: null as null | {
    avif?: string;
    webp?: string;
    fallback: string;
    alt: string;
  },
  source: "https://www.thevapehubcolorado.com/",
};
