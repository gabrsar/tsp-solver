import {comparePoints, DistanceCalculator, Point} from "../../geometry/points";
import {TravelingSalespersonProblemSolver} from "../traveling-salesmain-problem";

export class NearestNeighborTSP implements TravelingSalespersonProblemSolver {

    private preComputeAllNearestNeighbors(destinations: Point[], distanceFormula: DistanceCalculator) {
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

    solve(destinations: Point[], distanceFormula: DistanceCalculator): { bestRoute: Point[]; bestDistance: number; } {

        console.log(`Running NN-TSP`, destinations)
        let bestRoute: Point[] = [];
        let bestDistance = Infinity;
        for (let originIndex = 0; originIndex < destinations.length; originIndex++) {
            const nearestNeighborsMap = this.preComputeAllNearestNeighbors(destinations, distanceFormula);

            const originPoint = destinations[originIndex];

            const destinationsToVisit = destinations.slice();
            destinationsToVisit.splice(originIndex, 1);

            let pathDistance = 0;
            const path = [originPoint];

            while (destinationsToVisit.length > 0) {
                const currentPlace = path.at(-1)!;
                const distancesFromCurrentPlace = nearestNeighborsMap.get(currentPlace)!;

                const nearestPlace = distancesFromCurrentPlace.shift()!;

                const nearestDestination = nearestPlace[0];
                const nearestDistance = nearestPlace[1];

                // Remove current place from destination's neighbors list.
                const neighborsFromNearestDestination = nearestNeighborsMap.get(nearestDestination)!;
                const elementToRemoveIndex = neighborsFromNearestDestination.findIndex((n) => comparePoints(n[0], currentPlace));
                if (elementToRemoveIndex > -1) {
                    neighborsFromNearestDestination.splice(elementToRemoveIndex, 1);
                }


                path.push(nearestDestination);
                pathDistance += nearestDistance;

                console.log("removing", nearestDestination);
                destinationsToVisit.splice(destinationsToVisit.findIndex((p) => comparePoints(nearestDestination, p)), 1);
                console.log("path", path);

            }
            pathDistance += distanceFormula(path.at(-1)!, originPoint);
            path.push(originPoint);

            if (bestDistance > pathDistance) {
                bestRoute = path;
                bestDistance = pathDistance;
            }
        }

        return {bestRoute, bestDistance};
    }
}




