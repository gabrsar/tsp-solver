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
    const f = [-567.89, 0];
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
//# sourceMappingURL=points.spec.js.map