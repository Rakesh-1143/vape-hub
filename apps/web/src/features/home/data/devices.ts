import type { FeaturedDevice } from "@vape-hub/contracts";
export const devices: FeaturedDevice[] = [
  {
    id: "plum",
    name: "Plum",
    finish: "Satin plum",
    accent: "#bc87ba",
    bodyColor: "#794771",
    description: "A compact silhouette. A little more character.",
    poster: "/assets/images/device-plum.svg",
  },
  {
    id: "blue",
    name: "Midnight",
    finish: "Brushed blue",
    accent: "#7eacd6",
    bodyColor: "#365875",
    description: "Clean lines. A finish that catches the light.",
    poster: "/assets/images/device-blue.svg",
  },
  {
    id: "copper",
    name: "Copper",
    finish: "Warm copper",
    accent: "#d6a27b",
    bodyColor: "#956547",
    description: "Warm metal. Considered down to the details.",
    poster: "/assets/images/device-copper.svg",
  },
];
export const categories = [
  {
    id: "devices",
    name: "Devices & kits",
    description: "Find a setup that fits your day.",
    kind: "device",
  },
  {
    id: "liquids",
    name: "E-liquids",
    description: "Explore the options in store.",
    kind: "bottle",
  },
  {
    id: "accessories",
    name: "Coils & accessories",
    description: "Keep your setup in good shape.",
    kind: "coil",
  },
] as const;
