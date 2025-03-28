import { euclideanDistance, Point } from '../../geometry/points';
import { TwoOptTSP } from './two-otp';

describe('2-Otp TSP', () => {
  const a = [0, 0] as Point;
  const b = [3, 4] as Point;
  it('should return the same point and 0 distance if only one destination', () => {
    const solver = new TwoOptTSP();
    const result = solver.solve([a], euclideanDistance);

    expect(result.bestDistance).toBe(0);
    expect(result.bestRoute).toEqual([a, a]);
  });

  it('should solve a two-point TSP', () => {
    const solver = new TwoOptTSP();
    const result = solver.solve([a, b], euclideanDistance);

    expect(result.bestDistance).toBeCloseTo(10, 5);
    expect(result.bestRoute.length).toBe(3); // a-b-a
    expect(result.bestRoute[0]).toEqual(result.bestRoute[2]); // starts and finishes at same place
  });

  it('should solve a square configuration correctly', () => {
    const solver = new TwoOptTSP();
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
    const solver = new TwoOptTSP();
    const points = [a, b];
    const pointsCopy = JSON.parse(JSON.stringify(points));

    solver.solve(points, euclideanDistance);
    expect(points).toEqual(pointsCopy);
  });

  it('should improve a route by swapping adjacent points', () => {
    const solver = new TwoOptTSP();
    const points = [
      [0, 0],
      [0, 5],
      [0, 3],
      [0, 8],
    ] as Point[];

    const result = solver.solve(points, euclideanDistance);
    expect(result.bestRoute).toEqual([
      [0, 0],
      [0, 3],
      [0, 5],
      [0, 8],
      [0, 0],
    ]);
  });
});
