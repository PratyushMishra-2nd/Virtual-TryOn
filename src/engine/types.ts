// ─── Core Point Types ───────────────────────────────────────────────

export interface Point {
  x: number;
  y: number;
  z?: number;
}

export interface NormalizedLandmark {
  x: number; // 0.0 - 1.0
  y: number; // 0.0 - 1.0
  z?: number;
}

// ─── Accessory Types ────────────────────────────────────────────────

export type AccessoryType = 'glasses' | 'ring' | 'bracelet' | 'watch' | 'necklace';

export type TrackingSource = 'face' | 'hand';

export interface AccessoryConfig {
  id: string;
  name: string;
  type: AccessoryType;
  imagePath: string;
  thumbnailPath: string;
  trackingSource: TrackingSource;
  /** Tuning multiplier for width scaling (e.g., 1.6 for glasses) */
  scaleFactor: number;
  /** Vertical offset as fraction of computed height (positive = down) */
  offsetY: number;
}

// ─── Placement Result ───────────────────────────────────────────────

export interface PlacementResult {
  x: number;       // center x in canvas pixels
  y: number;       // center y in canvas pixels
  width: number;   // rendered width in pixels
  height: number;  // rendered height in pixels
  angle: number;   // rotation in radians
  visible: boolean;
}

// ─── Active Accessory (runtime state) ───────────────────────────────

export interface ActiveAccessory {
  config: AccessoryConfig;
  image: HTMLImageElement;
}
