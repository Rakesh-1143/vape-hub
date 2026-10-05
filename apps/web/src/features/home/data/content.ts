export type CategoryKind =
  "bottle" | "pod" | "device" | "coil" | "battery" | "accessory";
export interface ProductCategory {
  id: string;
  name: string;
  kind: CategoryKind;
  accent: "plum" | "blue" | "copper";
  description: string;
  guidance: string;
}
export const categories: ProductCategory[] = [
  {
    id: "liquids",
    name: "E-Liquids",
    kind: "bottle",
    accent: "copper",
    description: "Explore the selection with our team.",
    guidance:
      "Ask about current e-liquid options and device compatibility in store.",
  },
  {
    id: "pods",
    name: "Pod Systems",
    kind: "pod",
    accent: "blue",
    description: "Compare compact formats in person.",
    guidance:
      "Our team can explain the pod systems available and help check compatible replacement pods.",
  },
  {
    id: "devices",
    name: "Vaping Devices",
    kind: "device",
    accent: "plum",
    description: "A closer look at devices and kits.",
    guidance: "Compare devices and starter kits with guidance from our staff.",
  },
  {
    id: "coils",
    name: "Coils & Pods",
    kind: "coil",
    accent: "blue",
    description: "Find the right replacement parts.",
    guidance:
      "Bring your device model or packaging so staff can check replacement compatibility.",
  },
  {
    id: "batteries",
    name: "Batteries & Chargers",
    kind: "battery",
    accent: "copper",
    description: "Compatibility deserves attention.",
    guidance:
      "Ask the team about compatible batteries, chargers and protective cases.",
  },
  {
    id: "accessories",
    name: "Accessories & Glassware",
    kind: "accessory",
    accent: "plum",
    description: "Storage, glassware and related accessories.",
    guidance:
      "Ask about the glassware, cleaning supplies and storage accessories currently available.",
  },
];
export const guidance = [
  {
    id: "guidance",
    title: "A conversation first.",
    description:
      "Compare the store’s product categories with a member of our team.",
    icon: "conversation",
  },
  {
    id: "compatibility",
    title: "Details that fit.",
    description:
      "Get help checking device, pod, coil and charger compatibility.",
    icon: "compatibility",
  },
  {
    id: "support",
    title: "Support in person.",
    description:
      "Bring questions about your device, maintenance or manufacturer support.",
    icon: "support",
  },
] as const;
export const story = [
  {
    title: "Consider the device.",
    category: "Devices & pod systems",
    description:
      "Compare formats in person. Ask our team about current devices and compatible parts.",
    accent: "plum",
  },
  {
    title: "Explore the selection.",
    category: "E-liquids",
    description:
      "Browse the options available in store, with guidance on compatibility.",
    accent: "copper",
  },
  {
    title: "Keep the details together.",
    category: "Batteries & accessories",
    description:
      "Check the small essentials with the team: chargers, cases and replacement parts.",
    accent: "blue",
  },
] as const;
export const faqs = [
  {
    id: "id",
    question: "Do I need to bring ID?",
    answer:
      "Yes. Age-restricted purchases are for adults 21 and older. Bring valid government-issued photo identification.",
  },
  {
    id: "online",
    question: "Can I order online?",
    answer:
      "Online ordering is not available on this site yet. Call to check availability, then visit the store to purchase.",
  },
  {
    id: "compatibility",
    question: "Can you help check device compatibility?",
    answer:
      "Yes. Bring your device details or packaging so our staff can help check compatible pods, coils and accessories.",
  },
  {
    id: "support",
    question: "Can I bring a device for troubleshooting?",
    answer:
      "The team offers basic troubleshooting and can help with manufacturer support. Call ahead to discuss your device.",
  },
  {
    id: "returns",
    question: "What is your return policy?",
    answer:
      "Eligibility depends on the product and its condition. Contact the store about its current policy before purchasing or returning an item.",
  },
] as const;
