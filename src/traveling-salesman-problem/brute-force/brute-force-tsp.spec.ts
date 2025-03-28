import { Point } from "../../geometry/points";
import { euclideanDistance } from "../../geometry/points";
import {BruteForceTSP} from "./brute-force-tsp";

describe("BruteForceTSP", () => {
    const solver = new BruteForceTSP();

    it("should return a single point route correctly", () => {
        const input: Point[] = [[0, 0]];
        const result = solver.solve(input, euclideanDistance);
        expect(result.bestRoute).toEqual([[0, 0], [0, 0]]);
        expect(result.bestDistance).toBe(0);
    });

    it("should return the correct route and distance simple routes", () => {
        const a: Point = [0, 0];
        const b: Point = [0, 3];
        const c: Point = [4, 0];

        const input: Point[] = [a, b, c];
        const result = solver.solve(input, euclideanDistance);

        const expectedDistance = 12;

        expect(result.bestDistance).toBeCloseTo(expectedDistance, 5);
        expect(result.bestRoute.length).toBe(4); // 3 points + return to start
        expect(result.bestRoute[0]).toEqual(result.bestRoute[result.bestRoute.length - 1]); // cycle
    });

    it("should always return a cycle (route returns to starting point)", () => {
        const points: Point[] = [
            [0, 0],
            [1, 0],
            [0, 1]
        ];
        const { bestRoute } = solver.solve(points, euclideanDistance);
        expect(bestRoute[0]).toEqual(bestRoute[bestRoute.length - 1]);
    });

    it("should return 0 distance when all points are the same", () => {
        const input: Point[] = [
            [1, 1],
            [1, 1],
            [1, 1]
        ];
        const result = solver.solve(input, euclideanDistance);
        expect(result.bestDistance).toBe(0);
    });
});
