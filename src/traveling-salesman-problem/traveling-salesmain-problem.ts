import { DistanceCalculator, Point } from '../geometry/points';

export interface TSPSolution {
  bestRoute: Point[];
  bestDistance: number;
}

export interface TravelingSalespersonProblemSolver {
  /**
   * @param destinations arrays of @Point
   * @param distanceFormula is a @DistanceCalculator implementation used to compute distances.
   *
   * @return TSPSolution
   */
  solve(destinations: Point[], distanceFormula: DistanceCalculator): TSPSolution;
}
