# Animation reference review

Reviewed 2026-10-04: all four pages of the supplied Google Drive PDF, **Ciao Energy — Website Breakdown + How to Build a Similar Experience**. Download succeeded through Drive's public download route. The PDF is an educational reconstruction guide, not a client ecommerce requirements specification; its embedded source markers are not independently verified citations.

## Applied to The Vape Hub

- Original brand presentation rather than copying Ciao artwork or beverage claims.
- React / React Three Fiber / GSAP, with shared scroll progress in a ref rather than React state on every frame.
- A coordinated hero entrance and data-driven device carousel. Three original concept finishes remain appropriate; the reference's six beverage flavors do not constitute six client products.
- A short 700-pixel desktop pinned sequence coordinates camera distance, device scale/rotation, background lettering and HTML copy. Mobile has no pin and displays a single device.
- Separate reusable body, trim and display geometry/materials. Approved branded GLBs and compressed textures remain future work.
- Lazy 3D, immediate SVG poster, reduced-motion static presentation, offscreen/hidden-tab rendering pause, and resource/timeline cleanup.
- HTML information, selection controls, store navigation and FAQ remain accessible outside the canvas.

## Deferred or intentionally omitted

Sound, infinite-scroll easter eggs, six invented product states, beverage ingredient comparisons, and unrelated product claims are not added. A real-device performance review and Core Web Vitals measurement are outstanding. Actual ecommerce requirements, POS/payment decisions and approved product assets are still needed.

Source supplied by user: https://drive.google.com/file/d/1AfRXP38CnZ5QEcEniQTz8urzBSWxT10K/view

## Current implementation update (2026-10-05)

The earlier implementation notes describe prior revisions. The current hero uses a 1100px desktop pin plus a separate 850px category-story pin; widths below 1024px and reduced motion use no pins. Motion handles HTML reveals, selection copy and the FAQ; GSAP owns scrub coordination; R3F handles original concept graphics. The expanded scene map and accessibility/performance boundaries are in homepage-brief.md. The animation guide has been reviewed; it is not evidence of approved commerce requirements.
