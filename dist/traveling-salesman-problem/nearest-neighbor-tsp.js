"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NearestNeighborTSP = void 0;
const points_1 = require("../geometry/points");
class NearestNeighborTSP {
    preComputeAllNearestNeighbors(destinations, distanceFormula) {
        const nearestNeighborsMap = new Map();
        for (const source of destinations) {
            const distancesFromSource = destinations
                .filter((target) => target !== source)
                .map((target) => [target, distanceFormula(source, target)])
                .sort((a, b) => a[1] - b[1]);
            nearestNeighborsMap.set(source, distancesFromSource);
        }
        return nearestNeighborsMap;
    }
    solve(destinations, distanceFormula) {
        console.log(`Running NN-TSP`, destinations);
        let bestRoute = [];
        let bestDistance = Infinity;
        for (let originIndex = 0; originIndex < destinations.length; originIndex++) {
            const nearestNeighborsMap = this.preComputeAllNearestNeighbors(destinations, distanceFormula);
            const originPoint = destinations[originIndex];
            const destinationsToVisit = destinations.slice();
            destinationsToVisit.splice(originIndex, 1);
            let pathDistance = 0;
            const path = [originPoint];
            while (destinationsToVisit.length > 0) {
                const currentPlace = path.at(-1);
                const distancesFromCurrentPlace = nearestNeighborsMap.get(currentPlace);
                const nearestPlace = distancesFromCurrentPlace.shift();
                const nearestDestination = nearestPlace[0];
                const nearestDistance = nearestPlace[1];
                // Remove current place from destination's neighbors list.
                const neighborsFromNearestDestination = nearestNeighborsMap.get(nearestDestination);
                const elementToRemoveIndex = neighborsFromNearestDestination.findIndex((n) => (0, points_1.comparePoints)(n[0], currentPlace));
                if (elementToRemoveIndex > -1) {
                    neighborsFromNearestDestination.splice(elementToRemoveIndex, 1);
                }
                path.push(nearestDestination);
                pathDistance += nearestDistance;
                console.log("removing", nearestDestination);
                destinationsToVisit.splice(destinationsToVisit.findIndex((p) => (0, points_1.comparePoints)(nearestDestination, p)), 1);
                console.log("path", path);
            }
            pathDistance += distanceFormula(path.at(-1), originPoint);
            path.push(originPoint);
            if (bestDistance > pathDistance) {
                bestRoute = path;
                bestDistance = pathDistance;
            }
        }
        return { bestRoute, bestDistance };
    }
}
exports.NearestNeighborTSP = NearestNeighborTSP;
//# sourceMappingURL=nearest-neighbor-tsp.js.map