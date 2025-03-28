import {euclideanDistance, haversineDistance, preComputeDistanceBetweenDestinations, Point} from './points';

describe('Euclidean Calculator', () => {
    const MAX_ACCEPTABLE_DIVERGENCE = 10 ** -9;
    const a: Point = [0, 0];
    const b: Point = [3, 4];
    const c: Point = [100, 0];
    const d: Point = [-100, 0];
    const e: Point = [-0, -123.456];
    const f: Point = [-567.890, 0];
    it('compute distance correctly for the 3-4-5 triangle', () => {
        expect(euclideanDistance(a, b)).toBe(5);
    });

    it('distance of a->b === b->a', () => {
        expect(euclideanDistance(b, a)).toBe(5);
    })

    it('distance of straight line', () => {
        expect(euclideanDistance(a, c)).toBe(100);
    })

    it('negative distances with positive distances are handled correctly', () => {
        expect(euclideanDistance(c, d)).toBe(200);
    })

    it('results have expected precision', () => {
        // This check if no operation truncate or approximate any step of calculation
        expect(Math.abs(581.1543994808952 - euclideanDistance(e, f))).toBeLessThan(MAX_ACCEPTABLE_DIVERGENCE);
    })

});

describe('preComputeDistanceBetweenDestinations', () => {
    it('should compute distance map between multiple destinations', () => {
        const destinations: Point[] = [
            [0, 0],
            [3, 4],
            [6, 8]
        ];

        const distanceMap = preComputeDistanceBetweenDestinations(destinations, euclideanDistance);

        expect(distanceMap.has([0, 0])).toBe(true);
        expect(distanceMap.get([0, 0])?.has([3, 4])).toBe(true);
        expect(distanceMap.get([3, 4])?.get([0, 0])).toBe(5); // distance between [0,0] and [3,4] should be 5
    });
});
