export type Point = [number, number];

export interface DistanceCalculator {
  (a: Point, b: Point): number;
}

export const euclideanDistance: DistanceCalculator = (a: Point, b: Point) => {
  return Math.sqrt((b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2);
};

export const haversineDistance: DistanceCalculator = (a: Point, b: Point) => {
  // Not implemented. Here for example of another distance solver.
  throw new Error('Not implemented for this exercise!');
};
