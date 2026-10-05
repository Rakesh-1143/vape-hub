/** Presentation metadata only. These concepts are not catalog inventory. */
export interface FeaturedDevice {
  id: string;
  name: string;
  finish: string;
  accent: string;
  bodyColor: string;
  description: string;
  poster: string;
  /** Optional approved, normalized GLB. Absent until the client supplies assets. */
  modelPath?: string;
  modelScale?: number;
  /** Self-hosted Draco decoder directory; omitted for uncompressed/Meshopt GLBs. */
  dracoDecoderPath?: string;
}
