import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
import { createStoreMetadata } from "./src/lib/seo/site";
const envDirectory = fileURLToPath(new URL("../../", import.meta.url));
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, envDirectory, "VITE_");
  const siteURL = new URL(
    env.VITE_PUBLIC_SITE_URL || "https://rakesh-1143.github.io/vape-hub/",
  ).href;
  if (!/^https?:/.test(siteURL))
    throw new Error("VITE_PUBLIC_SITE_URL must be an HTTP(S) URL.");
  const metadata = createStoreMetadata(siteURL);
  return {
    base: process.env.GITHUB_PAGES === "true" ? "/vape-hub/" : "/",
    envDir: envDirectory,
    plugins: [
      react(),
      tailwindcss(),
      {
        name: "storefront-metadata",
        transformIndexHtml() {
          return [
            {
              tag: "link",
              attrs: { rel: "canonical", href: siteURL },
              injectTo: "head" as const,
            },
            {
              tag: "meta",
              attrs: {
                name: "robots",
                content:
                  env.VITE_INDEXABLE === "true"
                    ? "index,follow"
                    : "noindex,follow",
              },
              injectTo: "head" as const,
            },
            ...Object.entries({
              "og:type": "website",
              "og:title": metadata.title,
              "og:description": metadata.description,
              "og:url": siteURL,
              "og:site_name": "The Vape Hub",
              ...(env.VITE_OG_IMAGE_URL
                ? { "og:image": env.VITE_OG_IMAGE_URL }
                : {}),
            }).map(([property, content]) => ({
              tag: "meta",
              attrs: { property, content },
              injectTo: "head" as const,
            })),
            {
              tag: "script",
              attrs: { type: "application/ld+json" },
              children: JSON.stringify(metadata.structuredData).replace(
                /</g,
                "\\u003c",
              ),
              injectTo: "head" as const,
            },
          ];
        },
      },
    ],
    test: {
      environment: "jsdom",
      setupFiles: ["./tests/setup.ts"],
      include: ["tests/**/*.test.tsx"],
    },
  };
});
