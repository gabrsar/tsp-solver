import factorial from '../../math/factorial';
import { DistanceCalculator, Point } from '../../geometry/points';
import { TravelingSalespersonProblemSolver, TSPSolution } from '../traveling-salesmain-problem';
import { generatePermutations } from './permutation';

const MILESTONE_CHECK = 1_000_000;

/**
 * Just a bruteForce TSP solution that checks every single possibility for the best route.
 *
 * Processing Complexity: O(n!)
 * Memory Complexity: O(n) (generators to avoid memory exhaustion)
 *
 * Although it will take forever, it will be able to run if you have some patience,
 * but probably the thermal death of the universe will arrive earlier than the result.
 */
export class BruteForceTSP implements TravelingSalespersonProblemSolver {
  solve(destinations: Point[], distanceFormula: DistanceCalculator): TSPSolution {
    const distances = this.preComputeDistanceBetweenDestinations(destinations, distanceFormula);
    console.log(`Running Brute Force TSP. Destinations: ${destinations.length}`);
    let routesChecked = 0;
    let totalRoutes = factorial(destinations.length);
    let bestDistance = Number.MAX_VALUE;
    let bestRoute: Point[] = [];
    console.log('DISTANCES MATRIX', distances);
    for (const permutation of generatePermutations(destinations)) {
      let currentDistance = 0;
      for (let i = 1; i < permutation.length; i++) {
        const d = distances.get(permutation[i - 1])!.get(permutation[i]) || 0;
        currentDistance += d;
      }

      currentDistance +=
        distances.get(permutation[permutation.length - 1])!.get(permutation[0]) || 0;

      if (currentDistance < bestDistance) {
        bestDistance = currentDistance;
        bestRoute = [...permutation, permutation[0]];
        //FIXME: Check if late add of return is correct.
      }

      routesChecked += 1;
      if ((routesChecked - 1) % MILESTONE_CHECK === 0) {
        const pct = ((routesChecked / totalRoutes) * 100).toFixed(10);
        console.log(
          `Processing ${routesChecked}/${totalRoutes} possible routes: ${pct}%.`,
          `Best Distance: ${bestDistance}`,
        );
      }
    }
    return { bestRoute, bestDistance };
  }

  /** Pre computes a distance map between each node as it's done a lot of times */
  private preComputeDistanceBetweenDestinations(
    destinations: Point[],
    distanceFormula: DistanceCalculator,
  ) {
    const distanceMap = new Map<Point, Map<Point, number>>();

    for (const a of destinations.values()) {
      const distancesFromA = new Map<Point, number>();
      for (const b of destinations.values()) {
        const d = distanceFormula(a, b);
        distancesFromA.set(b, d);
      }
      distanceMap.set(a, distancesFromA);
    }

    return distanceMap;
  }
}
