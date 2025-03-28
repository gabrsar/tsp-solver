"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coordinates_from_file_1 = require("./io/coordinates-from-file");
const nearest_neighbor_tsp_1 = require("./traveling-salesman-problem/nearest-neighbor-tsp");
const points_1 = require("./geometry/points");
async function main() {
    const inputFile = process.argv[2];
    const coordinates = await (0, coordinates_from_file_1.loadCoordinatesFromFile)(inputFile);
    const tspSolver = new nearest_neighbor_tsp_1.NearestNeighborTSP();
    // const tspSolver = new BruteForceTSP();
    const result = tspSolver.solve(coordinates, points_1.euclideanDistance);
    console.log(result);
}
main().catch(error => {
    console.error("Could not complete TSP", error);
});
//# sourceMappingURL=index.js.map