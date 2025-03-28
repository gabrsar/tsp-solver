export type Point = [number, number];

export function comparePoints(a: Point, b: Point) {
    return a[0] === b[0] && a[1] === b[1];
}

export interface DistanceCalculator {
    (a: Point, b: Point): number;
}


export const euclideanDistance: DistanceCalculator = (a: Point, b: Point) => {
    return Math.sqrt(
        ((b[0] - a[0]) ** 2) +
        ((b[1] - a[1]) ** 2)
    );
}

export const haversineDistance: DistanceCalculator = (a: Point, b: Point) => {
    // you got the point.
    throw new Error("Not implemented yet")
}

export function preComputeDistanceBetweenDestinations(destinations: Point[], distanceFormula: DistanceCalculator) {
    const distanceMap = new Map<Point, Map<Point, number>>();

    for (const a of destinations.values()) {
        const distancesFromA = new Map<Point, number>();
        for (const b of destinations.values()) {
            const d = distanceFormula(a, b);
            distancesFromA.set(b, d);
        }
        distanceMap.set(a, distancesFromA);
    }

    return distanceMap;
}




