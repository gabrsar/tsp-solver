"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const points_1 = require("./points");
describe('Euclidean Calculator', () => {
    const MAX_ACCEPTABLE_DIVERGENCE = 10 ** -9;
    const a = [0, 0];
    const b = [3, 4];
    const c = [100, 0];
    const d = [-100, 0];
    const e = [-0, -123.456];
    const f = [-567.890, 0];
    it('compute distance correctly for the 3-4-5 triangle', () => {
        expect((0, points_1.euclideanDistance)(a, b)).toBe(5);
    });
    it('distance of a->b === b->a', () => {
        expect((0, points_1.euclideanDistance)(b, a)).toBe(5);
    });
    it('distance of straight line', () => {
        expect((0, points_1.euclideanDistance)(a, c)).toBe(100);
    });
    it('negative distances with positive distances are handled correctly', () => {
        expect((0, points_1.euclideanDistance)(c, d)).toBe(200);
    });
    it('results have expected precision', () => {
        // This check if no operation truncate or approximate any step of calculation
        expect(Math.abs(581.1543994808952 - (0, points_1.euclideanDistance)(e, f))).toBeLessThan(MAX_ACCEPTABLE_DIVERGENCE);
    });
});
describe('preComputeDistanceBetweenDestinations', () => {
    it('should compute distance map between multiple destinations', () => {
        const destinations = [
            [0, 0],
            [3, 4],
            [6, 8]
        ];
        const distanceMap = (0, points_1.preComputeDistanceBetweenDestinations)(destinations, points_1.euclideanDistance);
        expect(distanceMap.has([0, 0])).toBe(true);
        expect(distanceMap.get([0, 0])?.has([3, 4])).toBe(true);
        expect(distanceMap.get([3, 4])?.get([0, 0])).toBe(5); // distance between [0,0] and [3,4] should be 5
    });
});
//# sourceMappingURL=points.spec.js.map