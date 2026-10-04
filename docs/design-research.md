# Product studio design research

## Brief and direction

The user rejected the earlier small, box-like device presentation and requested more convincing 3D, Motion for React, and UI UX Pro Max. The supplied Ciao PDF has already been reviewed in animation-reference.md. This revision makes the product stage dominant, improves physical materials and lighting, and adds explicit inspection controls.

## Sources reviewed

- Motion installation: https://motion.dev/docs/react-installation
- Motion bundle strategy: https://motion.dev/docs/react-reduce-bundle-size
- Motion accessibility: https://motion.dev/docs/react-accessibility
- Three.js physical materials: https://threejs.org/docs/pages/MeshPhysicalMaterial.html
- Three.js clearcoat example: https://threejs.org/examples/webgl_materials_physical_clearcoat.html
- UI UX Pro Max source: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill

The official Ciao site did not load reliably during this research session; its source implementation is not claimed to have been inspected. The supplied PDF and previously reviewed recording remain the animation reference.

## UI UX Pro Max application

Installed the official skill into the local Codex skills directory and successfully ran its design-system and focused queries. The first palette/style result was Apple Liquid Glass; the narrower retry returned a generic Swiss/interior palette. Neither is a verified fit for this brand, so those palettes were not persisted or adopted. Art direction below is a manual design decision. Verified dragging-accessibility guidance requires button and keyboard alternatives; the Three.js search supported shared materials and explicit color management. The ambient-plus-directional result is treated as general guidance rather than a claim that environment lighting cannot work independently.

## Chosen design system

| Token | Value | Use |
| --- | --- | --- |
| Graphite | #0d1015 | Hero studio background |
| Titanium | #b2b5bb | Model trim and reflective structure |
| Chalk | #eeece7 | Essential HTML text and primary CTA |
| Plum | #bc87ba | Plum finish lighting and selection |
| Blue | #7eacd6 | Midnight finish lighting and selection |
| Copper | #d6a27b | Copper finish lighting and selection |

Barlow Condensed remains the display face; Manrope remains the body/control face. Both are licensed and self-hosted. Layout: large left-aligned headline, broad central/right 3D lineup, lower finish identity, right-side explicit view controls, and a stable selection rail. Mobile stacks headline and one device; supporting information uses larger body text.

## Implementation decisions

- Motion uses LazyMotion, the smaller m components, a separate domAnimation feature chunk and MotionConfig reducedMotion=user.
- GSAP owns the desktop scroll timeline and device selection paths. Three.js owns frame updates; no React state update per scroll tick.
- Original devices use rounded shells, a lathed mouthpiece, a display texture, reused materials, a generated brushed normal map and separately movable concept parts.
- Custom softbox environment is baked once through PMREM, then disposed on cleanup. Material clearcoat, metalness and roughness produce reflections without a continuous reflection-render pass.
- Rotate, Inspect/Assemble and Pause/Resume are HTML controls with accessible names. Reduced-motion and unavailable-scene presentations keep controls disabled while category/contact links remain useful.
- Software WebGL uses a lower pixel ratio; hardware rendering retains the desktop/mobile caps. Physical-device performance is still a required production check.

No manufacturer assets, fake inventory, health claims, sound autoplay or purchase integrations are added. Actual branded models, client assets and physical-phone testing remain pending.
