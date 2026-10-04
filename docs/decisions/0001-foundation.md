# ADR 0001 — shared monorepo and homepage boundary

Status: accepted for phase one, 2026-10-04.

Use npm workspaces and strict TypeScript for a 3–4 developer PERN/AWS team. Keep storefront, future API, shared contracts, and infrastructure separated. Implement only the homepage and foundation now; do not pretend pending backend work exists.

Use React Three Fiber for reusable original device geometry, GSAP for homepage coordination, and independent posters for fallbacks. Keep native scrolling, HTML controls, homepage-only motion, and no auto product cycling. Select by explicit controls; shorter mobile motion and static reduced-motion presentation.

CLAUDE.md is the shared instruction entrypoint; project-status.md is the detailed progress ledger. No secrets, invented inventory, checkout claims, or cloud deployment in this phase. Original models are temporary until client assets arrive.

Tooling decision: require Node 24 LTS and use patched Vitest 4.1.11 / typescript-eslint 8.71.0. Older lint pins introduced advisories, so current compatible lint tooling is retained with the supported Node runtime. Native section links jump directly; smooth scrolling is not forced. Browser tests are sequential and failure traces omit continuous screenshots to reduce software-GPU capture overhead.

Browser decision: use Playwright's chromium channel (new headless mode), rather than the separate legacy shell. Retain DOM/network failure traces without continuous screenshots; keep visual captures separate from interaction assertions.
