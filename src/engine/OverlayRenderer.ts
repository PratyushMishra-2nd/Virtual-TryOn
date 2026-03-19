import type { PlacementResult } from './types';

/**
 * Canvas-based overlay renderer.
 * Draws accessory images with position, scale, and rotation.
 */
export class OverlayRenderer {
  private ctx: CanvasRenderingContext2D;

  constructor(private canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get 2D canvas context');
    this.ctx = ctx;
  }

  /** Clear and draw the video frame (mirrored) */
  drawVideoFrame(video: HTMLVideoElement): void {
    const { width, height } = this.canvas;
    this.ctx.save();
    // Mirror the video for front-facing camera
    this.ctx.translate(width, 0);
    this.ctx.scale(-1, 1);
    this.ctx.drawImage(video, 0, 0, width, height);
    this.ctx.restore();
  }

  /** Draw a single accessory with transform */
  drawAccessory(image: HTMLImageElement, placement: PlacementResult): void {
    if (!placement.visible) return;

    const { x, y, width, height, angle } = placement;

    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(angle);
    this.ctx.drawImage(image, -width / 2, -height / 2, width, height);
    this.ctx.restore();
  }

  /** Draw debug landmark dots (useful during development) */
  drawLandmarks(
    points: { x: number; y: number }[],
    color: string = '#00ff00',
    radius: number = 2
  ): void {
    this.ctx.fillStyle = color;
    for (const p of points) {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  /** Clear the entire canvas */
  clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /** Get the canvas as a data URL (for screenshots) */
  toDataURL(type: string = 'image/png'): string {
    return this.canvas.toDataURL(type);
  }
}
