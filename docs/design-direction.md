# Homepage design direction

## Visual language

Product-led, adult-oriented retail presentation. Graphite #151719, raised charcoal #212325, warm off-white #eeece7, plum #bc87ba, blue #7eacd6, copper #d6a27b. Barlow Condensed 600/700 carries large headings; Manrope 400/500/600 carries controls and readable copy. Fonts are bundled locally through Fontsource and retain package licenses.

Desktop: left-aligned headline with a floating three-device stage to the right, quiet navigation, and compact product-selection controls. Keep the memorable motion in the product stage; avoid animating every card. Supporting content uses clear grids and restrained borders. Mobile: stacked headline, single featured device, explicit selection and a collapsible navigation.

## Motion

No automatic cycling. Selection coordinates metadata, accent lighting and damped transforms; scroll controls additional rotation and scale. Native scrolling remains intact. Reduced motion uses static posters and readable content. Pause offscreen/hidden rendering and revert timelines on cleanup.

## Asset policy

The three devices are original unbranded geometry and SVG posters. They are not real inventory. The store sign is an original graphic, not a store photograph. Obtain clear front/back/side photos, dimensions, licensed artwork and client approval before final branded models. Optimize future GLBs and supply posters for every model. Asset integration notes: `apps/web/public/assets/models/README.md`.

## Acceptance

Check desktop and 390×844 mobile, text contrast, focus states, long copy, rapid selection, reduced motion, unavailable WebGL, loading failure, and working store links. Physical-phone performance remains a separate release check.
