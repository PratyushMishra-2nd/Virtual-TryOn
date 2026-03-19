import type { Point } from './types';

/**
 * Exponential Moving Average smoother for landmark arrays.
 * Reduces frame-to-frame jitter while keeping responsiveness.
 *
 * Usage:
 *   const smoother = new LandmarkSmoother(0.3);
 *   const smoothed = smoother.smooth(rawLandmarks);
 */
export class LandmarkSmoother {
  private prev: Point[] = [];

  /**
   * @param alpha  Smoothing factor (0–1).
   *   Higher = more responsive but jittery.
   *   Lower  = smoother but laggy.
   *   Default 0.3 is a good balance.
   */
  constructor(private alpha: number = 0.3) {}

  smooth(raw: Point[]): Point[] {
    if (this.prev.length === 0 || this.prev.length !== raw.length) {
      // First frame or landmark count changed — initialize
      this.prev = raw.map((p) => ({ ...p }));
      return this.prev;
    }

    this.prev = raw.map((p, i) => ({
      x: this.alpha * p.x + (1 - this.alpha) * this.prev[i].x,
      y: this.alpha * p.y + (1 - this.alpha) * this.prev[i].y,
      z:
        p.z !== undefined
          ? this.alpha * p.z + (1 - this.alpha) * (this.prev[i].z ?? p.z)
          : undefined,
    }));

    return this.prev;
  }

  reset(): void {
    this.prev = [];
  }
}
