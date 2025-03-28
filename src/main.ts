import { loadCoordinatesFromFile } from './io/coordinates-from-file';
import { NearestNeighborTSP } from './traveling-salesman-problem/nearest-neighbors/nearest-neighbor-tsp';
import { euclideanDistance } from './geometry/points';
import { TwoOptTSP } from './traveling-salesman-problem/n-otp/two-otp';

async function main() {
  const inputFile = './delivery_points.txt';
  const coordinates = await loadCoordinatesFromFile(inputFile);

  const nnSolver = new NearestNeighborTSP();
  const twoOtpSolver = new TwoOptTSP();

  const nnResult = nnSolver.solve(coordinates, euclideanDistance);
  const twoOtpResult = twoOtpSolver.solve(nnResult.bestRoute, euclideanDistance);

  const distanceImprovement = nnResult.bestDistance - twoOtpResult.bestDistance;
  const distanceImprovementPct = (1 - twoOtpResult.bestDistance / nnResult.bestDistance) * 100;

  console.log(`Best route (NN+2-OTP):`, twoOtpResult.bestRoute.join(' -> '));
  console.log(`NearestNeighborTSP distance: ${nnResult.bestDistance.toFixed(2)}`);
  console.log(`2-Opt distance: ${twoOtpResult.bestDistance.toFixed(2)}`);
  console.log(
    `Improvement: ${distanceImprovement.toFixed(2)} (${distanceImprovementPct.toFixed(2)}%)`,
  );
}

main().catch((error) => {
  console.error('Could not complete TSP', error);
});
