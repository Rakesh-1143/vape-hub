# Product model integration

This phase uses procedural geometry in `src/features/home/scene/DeviceScene.tsx`; no GLB model is currently loaded. The three devices are original concepts, not offered products.

`ProductModel.tsx` now selects procedural geometry or a lazy `ApprovedModel.tsx` adapter. Set a device's optional `modelPath`, normalized `modelScale`, and matching poster only for approved assets. Meshopt is supported through Drei. For Draco, provide a self-hosted `dracoDecoderPath` with the decoder files; no decoder download is used by current concepts. Approved models need authored part mappings before inspection is enabled. Real compressed client assets have not been tested yet. Keep cached GLTF resources shared; clear the relevant useGLTF cache only after all instances have unmounted when retiring an asset.

For approved real products: obtain multi-angle photos, dimensions, and permission for artwork; model accurate geometry; export compressed GLB with modest texture sizes; supply an SVG/WebP poster; review browser load and GPU cost; associate the asset with a real catalog ID. Keep controls and descriptions in HTML and retain reduced-motion / no-WebGL fallbacks. Do not add large model binaries or manufacturer trademarks without approval.
