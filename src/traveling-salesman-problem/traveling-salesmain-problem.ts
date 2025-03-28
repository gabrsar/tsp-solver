import {DistanceCalculator, Point} from "../geometry/points";

export interface TravelingSalespersonProblemSolver {
    /**
     * @param destinations arrays of @Point
     * @param distanceFormula is a @DistanceCalculator implementation used to compute distances.
     *
     * @return {bestRoute:Point[], bestDistance:number}
     */
    solve(destinations: Point[], distanceFormula: DistanceCalculator): { bestRoute: Point[], bestDistance: number }
}