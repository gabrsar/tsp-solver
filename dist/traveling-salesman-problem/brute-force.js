"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BruteForceTSP = void 0;
const permutation_1 = __importDefault(require("../permutation"));
const factorial_1 = __importDefault(require("../math/factorial"));
const points_1 = require("../geometry/points");
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
class BruteForceTSP {
    solve(destinations, distanceFormula) {
        const distances = (0, points_1.preComputeDistanceBetweenDestinations)(destinations, points_1.euclideanDistance);
        console.log(`Running Brute Force TSP. Destinations: ${destinations.length}`);
        let routesChecked = 0;
        let totalRoutes = (0, factorial_1.default)(destinations.length);
        let bestDistance = Number.MAX_VALUE;
        let bestRoute = [];
        console.log("DISTANCES MATRIX", distances);
        for (const permutation of (0, permutation_1.default)(destinations)) {
            let currentDistance = 0;
            for (let i = 1; i < permutation.length; i++) {
                const d = distances.get(permutation[i - 1]).get(permutation[i]) || 0;
                currentDistance += d;
            }
            currentDistance += distances.get(permutation[permutation.length - 1]).get(permutation[0]) || 0;
            if (currentDistance < bestDistance) {
                bestDistance = currentDistance;
                bestRoute = [...permutation, permutation[0]];
                //FIXME: Check if late add of return is correct.
            }
            routesChecked += 1;
            if ((routesChecked - 1) % MILESTONE_CHECK === 0) {
                const pct = ((routesChecked / totalRoutes) * 100).toFixed(10);
                console.log(`Processing ${routesChecked}/${totalRoutes} possible routes: ${pct}%.`, `Best Distance: ${bestDistance}`);
            }
        }
        return { bestRoute, bestDistance };
    }
}
exports.BruteForceTSP = BruteForceTSP;
//# sourceMappingURL=brute-force.js.map