# Project status

Updated: 2026-10-04. Phase: repository foundation and animated homepage.

## Implemented
- npm TypeScript monorepo: React/Vite storefront, shared contracts, documented Express and AWS boundaries.
- Homepage with original three-device 3D geometry, studio reflections, floating movement, explicit selection, coordinated copy/color, and scroll rotation.
- Lazy scene, SVG posters, reduced-motion presentation, offscreen/hidden-tab pausing, renderer failure boundary, and graphics-context cleanup.
- Responsive header/mobile menu; category guidance; local store graphic; pickup explanation; native FAQ; phone, email, directions and section links.
- Local licensed fonts, bundled license notices, semantic HTML controls, focus styles, and mobile control sizes.
- Shared CLAUDE.md, setup instructions, architecture/requirements/design/workflow/decision documentation, CI, four unit behavior tests and eight desktop/mobile browser scenarios.

## Validation ledger
Executed locally using bundled Node 24.19.0 after a clean dependency installation:

| Check | Observed result |
| --- | --- |
| `npm ci` | Passed; 286 packages installed from the lockfile |
| Dependency audit during clean install | 0 vulnerabilities reported |
| `npm run typecheck` | Passed for storefront and shared contracts |
| `npm run lint` | Passed |
| `npm test` | 4 tests passed in 1 test file |
| `npm run build` | Passed; Vite 7.3.6 production output generated |
| `npm run test:e2e` | Full-suite acceptance pending: latest production run passed desktop interaction and reduced-motion cases, then Chromium crashed before opening the failed-scene test page |

Build warning: lazy scene chunk is 887.01 kB minified / 239.89 kB gzipped; initial application chunk is 355.15 kB / 121.01 kB gzipped. Font assets are limited to Latin subsets. npm emits development-tool deprecation notices for ESLint 9 and a transitive whatwg-encoding package; audit nevertheless reported zero known vulnerabilities.

Browser inspection confirmed live rounded 3D at desktop and 390×844, and the observed mobile layout had no horizontal overflow. Earlier browser runs found slow cold scene startup, smooth-scroll actionability races, and a full-page WebGL screenshot timeout. Section links now use immediate native scrolling; tests use one worker, production preview, full Chromium new headless mode, and no automated screenshot capture. Desktop and mobile scenarios have passed across individual runs, but a complete final suite remains unverified because Chromium intermittently crashes before creating a page.

## Known limitations and pending production work
- Original concept devices and store graphic are temporary; no approved real product models, logo, photography, catalog, prices, or inventory.
- Drive requirements document remains inaccessible and unread. Obtain it before implementing commerce.
- No Express API, PostgreSQL integration, authentication, live stock, online orders, payments, purchase age verification, notifications, or POS sync.
- AWS is not provisioned; CI configuration is local and has not run on GitHub.
- 3D engine is a substantial lazy-loaded payload. Posters preserve immediate content, but actual-phone frame rate, low-end device behavior, and production Web Vitals are unverified.
- No SSR/prerendering; evaluate SEO requirements before public launch.
- Confirm store contact data and copy with the client before deployment.

## Next useful step
GitHub Pages preview requested after repository upload. Added a dedicated Pages workflow and base-path-aware poster URLs. Enabling Pages returned HTTP 422: the current GitHub plan does not support Pages for this private repository. The user approved public visibility; repository is now public and Pages is enabled. Pages-mode production build, lint and all four unit tests passed locally. Workflow deployment and live URL verification are pending.

Review the actual requirements document and obtain product photos/dimensions/artwork. Decide payment-at-pickup versus approved online payment, POS/inventory integration, launch date and AWS budget. Then implement catalog/API contracts and staff inventory workflows before checkout.
