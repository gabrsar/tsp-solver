import { loadCoordinatesFromFile } from './io/coordinates-from-file';
import { NearestNeighborTSP } from './traveling-salesman-problem/nearest-neighbors/nearest-neighbor-tsp';
import { euclideanDistance, Point } from './geometry/points';
import { TwoOptTSP } from './traveling-salesman-problem/n-otp/two-otp';
import { BruteForceTSP } from './traveling-salesman-problem/brute-force/brute-force-tsp';

async function main() {
  const inputFile = './delivery_points.txt';
  const coordinates = await loadCoordinatesFromFile(inputFile);

  const nnSolver = new NearestNeighborTSP();
  const twoOtpSolver = new TwoOptTSP();

  const nnResult = nnSolver.solve(coordinates, euclideanDistance);
  const twoOtpResult = twoOtpSolver.solve(nnResult.bestRoute, euclideanDistance);

  const distanceImprovement = nnResult.bestDistance - twoOtpResult.bestDistance;
  const distanceImprovementPct = (1 - twoOtpResult.bestDistance / nnResult.bestDistance) * 100;
  console.log('====================================================');

  console.log(
    `Best route (NN+2-OTP) for ${coordinates.length} destinations:`,
    twoOtpResult.bestRoute.join(' -> '),
  );
  console.log(`NearestNeighborTSP distance: ${nnResult.bestDistance.toFixed(2)}`);
  console.log(`2-Opt distance: ${twoOtpResult.bestDistance.toFixed(2)}`);
  console.log(
    `Improvement: ${distanceImprovement.toFixed(2)} (${distanceImprovementPct.toFixed(2)}%)`,
  );

  console.log('====================================================');

  runBruteForce(coordinates);
}

function runBruteForce(coordinates: Point[]) {
  const shortRoute = coordinates.slice(0, 12);

  console.log(
    `Now, it will run the BruteForce Solver but only for ${shortRoute.length} destinations . Press ENTER to EXIT and y/Y to run the BruteForce.`,
  );

  process.stdin.resume();
  process.stdin.on('data', (key) => {
    if (key.toString() === 'y\n' || key.toString() === 'Y\n') {
      console.log(
        `Running BruteForce just for fist ${shortRoute.length} coordinates:`,
        shortRoute.join(' - '),
      );
      const bruteForceSolver = new BruteForceTSP();

      const bruteForceResult = bruteForceSolver.solve(shortRoute, euclideanDistance);
      console.log(`Best route (Brute Force):`, bruteForceResult.bestRoute.join(' -> '));
      console.log(`Best distance (Brute Force):`, bruteForceResult.bestDistance);

      console.log('Hope you all had some fun reviewing this! Nice friday to you all! :)');
    } else {
      process.exit(0);
    }
  });
}

main().catch((error) => {
  console.error('Could not complete TSP', error);
  process.exit(1);
});
