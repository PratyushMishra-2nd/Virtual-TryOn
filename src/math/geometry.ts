import type { Point } from '../engine/types';

/** Euclidean distance between two 2D points */
export function distance(a: Point, b: Point): number {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

/** Midpoint between two 2D points */
export function midpoint(a: Point, b: Point): Point {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

/** Angle (radians) from point a to point b */
export function angle(a: Point, b: Point): number {
  return Math.atan2(b.y - a.y, b.x - a.x);
}

/** Average of multiple points */
export function centroid(points: Point[]): Point {
  const n = points.length;
  if (n === 0) return { x: 0, y: 0 };
  const sum = points.reduce(
    (acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y }),
    { x: 0, y: 0 }
  );
  return { x: sum.x / n, y: sum.y / n };
}
