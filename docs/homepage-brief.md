# Homepage story implementation

Brief received 2026-10-05. Scope is the homepage and the reusable pieces it needs. The Express/PostgreSQL and AWS boundaries remain documentation only. No other application pages existed in this checkout. Existing scene, fixtures, contacts, CI and Pages base-path behavior were inspected before changes.

## Scene map

| Brief scene | Implementation |
| --- | --- |
| Adult entry | `AgeGate`: self-confirmation persisted locally; clean exit link; no sensitive data; homepage/3D unmounted before entry |
| Opening / product journey | `CinematicHero`: original procedural device lineup, progressive poster/scene loading, HTML entrance, selection, rotation, part inspection and coordinated desktop scroll |
| Product universe | `ProductCategories`, `CategoryVisual`: six original vector category studies; desktop pointer tilt; native tap/keyboard category links and guidance |
| Why visit | `WhyVapeHub`: three factual support themes, restrained staggered reveal |
| Visual story | `ProductStory`, lazy `StoryScene`: one shared progress ref controls category objects, camera, copy and accent; desktop pin only |
| Local store | `StoreExperience`, `StoreHours`: contacts from the published client site, marked original illustration, centralized hours awaiting owner confirmation |
| FAQ | Typed deduplicated data and reusable Motion `Accordion`; buttons, expanded state, controlled regions, keyboard activation |
| Closing / footer | `FinalCTA`, `Footer`: working map/phone/email/section links, content notice, useful policy notes with planned owner-approved publication |

## Design and motion ownership

Manual palette: graphite `#0d1015`, chalk `#eeece7`, titanium `#b2b5bb`, plum `#bc87ba`, blue `#7eacd6`, copper `#d6a27b`. Licensed self-hosted Barlow Condensed headings and Manrope body text remain in use. The original metallic product scene carries the strongest visual motion; category and local-store information use calmer spacing and readable copy.

UI UX Pro Max's broad retail query returned a generic light Swiss palette; it was not adopted or persisted. A narrower `3D hyperrealism --domain style` query returned a verified product-showcase/R3F match. Its performance and accessibility cautions informed the scene boundaries, button alternatives and reduced-motion modes. The palette and layout above remain intentional project decisions, not a claim that the generated recommendation was a fit.

Motion owns DOM entrances, card tilt, FAQ height and closing light position. GSAP owns pinned scene wrappers, copy visibility, shared progress and scroll accent transitions. R3F owns objects, camera and lights. No two systems animate the same element property. Native scrolling stays intact; no Lenis dependency. Tablet/mobile below 1024px avoid pins; mobile hero renders one device mesh, and the second scene loads only when approached. Refs carry continuous progress; effects revert timelines and listeners, offscreen/hidden tabs pause rendering, and scene resources are disposed on unmount. Reduced motion removes both canvases/pins and exposes every story panel.

## Verified content sources

Reviewed [homepage](https://www.thevapehubcolorado.com/), [products](https://www.thevapehubcolorado.com/products), and [contact](https://www.thevapehubcolorado.com/contact) on 2026-10-05. They agree on address, phone and email. Their schedules conflict: homepage has several daily time ranges, contact lists 8:30–20:00 Monday–Saturday and 12:00–17:00 Sunday, and products lists another weekday schedule. No schedule was selected. `data/store.ts` is the source of truth and explicitly marks hours for owner confirmation; structured data omits opening hours.

Descriptions are informational paraphrases. No stock, price, review, award, discount or health claim is invented. Existing duplicate FAQs are not copied. Purchase age verification, ordering, fulfillment and policies remain production work; local entry confirmation is not identity verification.

## Assets and SEO

Procedural geometry and vector posters/illustrations render without branded files. `ProductModel` accepts optional approved paths through `ApprovedModel`; Drei supports Meshopt, with a supplied self-hosted Draco decoder path for Draco assets. This path has not been exercised with a client model. Normalize approved assets around the same coordinate system, and supply matching posters. Cached GLTF resources are shared; clear loader cache only when retiring assets after every instance unmounts. Manual part inspection applies to the procedural concepts; approved models need authored part mappings before equivalent inspection is enabled.

Store photography supports optional AVIF/WebP picture sources with explicit dimensions and lazy loading. Current assets are vectors, not raster placeholders. An owner-approved photo, logo, models and social preview image remain required. Canonical and indexing configuration live in the root `.env.example`; Vite injects canonical, Open Graph and factual Store JSON-LD metadata at build time. The preview defaults to `noindex,follow` until launch approval. No opening hours or aggregate ratings are included.

## Validation

See the current project-status ledger. Tests cover adult-entry persistence/storage failure, keyboard actions, category/contact destinations, both scene fallbacks, reduced motion, FAQ state, metadata, accessibility and the 320/375/430/768/1024/1280/1440/1920 layout matrix. Automated desktop/phone emulation does not establish physical-device frame rate or a production performance guarantee.
