# Architecture

## Implemented

npm workspaces: `@vape-hub/web` and `@vape-hub/contracts`. React + Vite serves the single-page homepage; anchor navigation needs no router. Strict TypeScript contracts carry presentation metadata only. Self-hosted Barlow Condensed and Manrope fonts come from licensed Fontsource packages.

The home feature owns selection, concept metadata, and GSAP scroll coordination. `ProductStage` lazily imports the Three.js scene through React Three Fiber, retains a poster until ready, and catches renderer failures. Media preferences control reduced motion and mobile layout. IntersectionObserver and document visibility pause the frame loop. Three.js declarative resources are disposed by React Three Fiber on unmount; GSAP context reversion removes timelines and ScrollTriggers.

`CinematicHero` coordinates the studio. Motion for React animates HTML entrance and finish copy using lazy DOM features; GSAP owns the shared scroll progress and 3D selection poses. Three.js renders original geometry with physical clearcoat, a procedural brushed normal texture, and a one-time PMREM softbox environment. Shared model materials, generated textures, rounded geometry and environment targets have explicit cleanup. Rotate, inspect/assemble and ambient pause use accessible HTML buttons. Ambient pause preserves user-requested selection and inspection transitions.

Devices are reusable procedural geometry, avoiding model downloads for the initial concepts. SVG posters provide a lightweight independent fallback. Product selection does not trigger backend requests. Category tiles reveal real category guidance within the homepage.

## Next boundaries

Express/PostgreSQL is not running. Add feature modules after requirements review. Connect catalog IDs and approved product media to the homepage only once a real catalog exists. Keep shared contracts transport-neutral; database entities and privileged code remain in the API. AWS is planning-only.

## Compatibility

Node 24 LTS, compatible React 19 / React Three Fiber 9 dependency line, npm lockfile as the reproducible source. Browser target: modern evergreen browsers. Essential content works without WebGL; JavaScript is required for the React app. No SSR in this phase; evaluate SEO/prerendering before client launch.


Browser acceptance uses Playwright's Chromium channel (new headless mode) with a single worker. The legacy headless shell showed intermittent pre-navigation crashes after software-WebGL tests, so it is not used. Visual review captures are separate from browser assertions; physical-phone performance remains unverified.

End-to-end tests target built production assets through Vite preview on strict port 4173. The root test:e2e command builds first. This isolates test traffic from the development server's module optimization, HMR and overlays; injected chunk failures target the actual deployed asset shape.
