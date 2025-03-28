import { DistanceCalculator, Point } from '../../geometry/points';
import { TravelingSalespersonProblemSolver } from '../traveling-salesmain-problem';

export class NearestNeighborTSP implements TravelingSalespersonProblemSolver {
  private preComputeAllNearestNeighbors(
    destinations: Point[],
    distanceFormula: DistanceCalculator,
  ) {
    const nearestNeighborsMap = new Map<Point, Array<[Point, number]>>();
    for (const source of destinations) {
      const distancesFromSource = destinations
        .filter((target) => target !== source)
        .map((target: Point): [Point, number] => [target, distanceFormula(source, target)])
        .sort((a, b) => a[1] - b[1]);

      nearestNeighborsMap.set(source, distancesFromSource);
    }
    return nearestNeighborsMap;
  }

  solve(
    destinations: Point[],
    distanceFormula: DistanceCalculator,
  ): { bestRoute: Point[]; bestDistance: number } {
    console.log(`Running NN-TSP`);

    const nearestNeighborsMap = this.preComputeAllNearestNeighbors(destinations, distanceFormula);
    let bestRoute: Point[] = [];
    let bestDistance = Infinity;
    for (let originIndex = 0; originIndex < destinations.length; originIndex++) {
      const originPoint = destinations[originIndex];

      let pathDistance = 0;
      const path = [originPoint];

      while (true) {
        const currentPlace = path.at(-1)!;
        const distancesFromCurrentPlace = nearestNeighborsMap.get(currentPlace)!;

        const nearestPlaceNotVisited = distancesFromCurrentPlace.find((p) => !path.includes(p[0]));

        if (!nearestPlaceNotVisited) {
          break;
        }

        const nearestDestination = nearestPlaceNotVisited[0];
        const nearestDistance = nearestPlaceNotVisited[1];

        path.push(nearestDestination);
        pathDistance += nearestDistance;
      }
      pathDistance += distanceFormula(path.at(-1)!, originPoint);
      path.push(originPoint);

      if (bestDistance > pathDistance) {
        bestRoute = path;
        bestDistance = pathDistance;
      }
    }

    return { bestRoute, bestDistance };
  }
}
