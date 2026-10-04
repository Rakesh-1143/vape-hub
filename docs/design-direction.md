# Homepage design direction

## Visual language

Product-led, adult-oriented retail presentation. Graphite #151719, raised charcoal #212325, warm off-white #eeece7, plum #bc87ba, blue #7eacd6, copper #d6a27b. Barlow Condensed 600/700 carries large headings; Manrope 400/500/600 carries controls and readable copy. Fonts are bundled locally through Fontsource and retain package licenses.

Desktop: left-aligned headline with a floating three-device stage to the right, quiet navigation, and compact product-selection controls. Keep the memorable motion in the product stage; avoid animating every card. Supporting content uses clear grids and restrained borders. Mobile: stacked headline, single featured device, explicit selection and a collapsible navigation.

## Motion

No automatic cycling. Selection coordinates metadata, interpolated carousel positions, turn-in rotation and accent lighting. A short desktop pin coordinates camera distance, device scale/rotation and a detail-copy reveal using one shared progress ref. Mobile has no pin and uses one device. Native scrolling remains intact. Reduced motion uses static posters and readable content. Pause offscreen/hidden rendering and revert timelines on cleanup.

The studio revision uses a 1,100px desktop scroll sequence: introduction, surface detail, then a separated construction concept. Motion for React handles HTML copy transitions; GSAP handles scene coordination. Manual rotate, inspect/assemble and ambient-pause controls supplement scroll interaction. Metallic trims, a brushed finish and custom softbox reflections supply depth without remote models or postprocessing. Construction geometry is an original design study, not a real product specification. Research and the consciously chosen design direction are recorded in `design-research.md`.

## Asset policy

The three devices are original unbranded geometry and SVG posters. They are not real inventory. The store sign is an original graphic, not a store photograph. Obtain clear front/back/side photos, dimensions, licensed artwork and client approval before final branded models. Optimize future GLBs and supply posters for every model. Asset integration notes: `apps/web/public/assets/models/README.md`.

## Acceptance

Check desktop and 390×844 mobile, text contrast, focus states, long copy, rapid selection, reduced motion, unavailable WebGL, loading failure, and working store links. Physical-phone performance remains a separate release check.
