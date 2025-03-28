/**
 * IMPORTANT!: THIS IS A CHATGPT IMPLEMENTATION OF 2-OPT. NOT MINE!
 * Using my structure.
 *
 * I just fixed the imports.
 *
 * Prompt: Considering my project structure, implement an 2-OTP solution for TSP
 *
 * Ok. made some changes on it. You can get by checking diff with last commit.
 * */
import { TravelingSalespersonProblemSolver, TSPSolution } from '../traveling-salesmain-problem';
import { DistanceCalculator, Point } from '../../geometry/points';

export class TwoOptTSP implements TravelingSalespersonProblemSolver {
  solve(destinations: Point[], distanceFormula: DistanceCalculator): TSPSolution {
    console.log('Running 2-OPT-TSP');

    if (destinations.length <= 2) {
      const roundTrip = [...destinations, destinations[0]];
      const dist = this.calculateTotalDistance(roundTrip, distanceFormula);
      return { bestRoute: roundTrip, bestDistance: dist };
    }

    // Start with a naive path (as-is + return to origin)
    let bestRoute = [...destinations, destinations[0]];
    let bestDistance = this.calculateTotalDistance(bestRoute, distanceFormula);
    let improved = true;

    while (improved) {
      improved = false;
      for (let i = 1; i < bestRoute.length - 2; i++) {
        for (let k = i + 1; k < bestRoute.length - 1; k++) {
          const newRoute = this.twoOptSwap(bestRoute, i, k);
          const newDistance = this.calculateTotalDistance(newRoute, distanceFormula);

          if (newDistance < bestDistance) {
            bestRoute = newRoute;
            bestDistance = newDistance;
            improved = true;
          }
        }
      }
    }

    return { bestRoute, bestDistance };
  }

  private calculateTotalDistance(route: Point[], distanceFormula: DistanceCalculator): number {
    let total = 0;
    for (let i = 0; i < route.length - 1; i++) {
      total += distanceFormula(route[i], route[i + 1]);
    }
    return total;
  }

  private twoOptSwap(route: Point[], i: number, k: number): Point[] {
    const newRoute = route.slice(0, i);
    const reversedSegment = route.slice(i, k + 1).reverse();
    const tail = route.slice(k + 1);
    return [...newRoute, ...reversedSegment, ...tail];
  }
}
