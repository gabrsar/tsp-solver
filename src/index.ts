import {loadCoordinatesFromFile} from "./io/coordinates-from-file";
import {NearestNeighborTSP} from "./traveling-salesman-problem/nearest-neighbors/nearest-neighbor-tsp";
import {euclideanDistance} from "./geometry/points";
import {BruteForceTSP} from "./traveling-salesman-problem/brute-force/brute-force-tsp";

async function main() {
    const inputFile = "./delivery_points.txt";
    const coordinates = await loadCoordinatesFromFile(inputFile)

    const tspSolver = new NearestNeighborTSP();
    // const tspSolver = new BruteForceTSP();

    const result = tspSolver.solve(coordinates, euclideanDistance);

    console.log(result);

}

main().catch(error => {
    console.error("Could not complete TSP", error);
});

