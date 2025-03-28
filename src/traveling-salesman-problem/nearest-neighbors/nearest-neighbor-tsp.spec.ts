import { euclideanDistance, Point } from '../../geometry/points';
import { NearestNeighborTSP } from './nearest-neighbor-tsp';

describe('NearestNeighborTSP', () => {
  const a = [0, 0] as Point;
  const b = [3, 4] as Point;
  const c = [5, 6] as Point;
  const d = [5, 7] as Point;
  it('should return the same point and 0 distance if only one destination', () => {
    const solver = new NearestNeighborTSP();
    const result = solver.solve([a], euclideanDistance);

    expect(result.bestDistance).toBe(0);
    expect(result.bestRoute).toEqual([a, a]);
  });

  it('should solve a two-point TSP', () => {
    const solver = new NearestNeighborTSP();
    const result = solver.solve([a, b], euclideanDistance);

    expect(result.bestDistance).toBeCloseTo(10, 5);
    expect(result.bestRoute.length).toBe(3); // a-b-a
    expect(result.bestRoute[0]).toEqual(result.bestRoute[2]); // starts and finishes at same place
  });

  it('should solve a square configuration correctly', () => {
    const solver = new NearestNeighborTSP();
    const square: Point[] = [
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 0],
    ];
    const result = solver.solve(square, euclideanDistance);

    expect(result.bestRoute.length).toBe(5); // 4 points + return
    expect(result.bestRoute[0]).toEqual(result.bestRoute.at(-1));
    expect(result.bestDistance).toBeCloseTo(4, 5);
  });

  it('should not mutate input points', () => {
    const solver = new NearestNeighborTSP();
    const points = [a, b];
    const pointsCopy = JSON.parse(JSON.stringify(points));

    solver.solve(points, euclideanDistance);
    expect(points).toEqual(pointsCopy);
  });
});
