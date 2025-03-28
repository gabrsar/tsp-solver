"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.haversineDistance = exports.euclideanDistance = void 0;
exports.comparePoints = comparePoints;
exports.preComputeDistanceBetweenDestinations = preComputeDistanceBetweenDestinations;
function comparePoints(a, b) {
    return a[0] === b[0] && a[1] === b[1];
}
const euclideanDistance = (a, b) => {
    return Math.sqrt(((b[0] - a[0]) ** 2) +
        ((b[1] - a[1]) ** 2));
};
exports.euclideanDistance = euclideanDistance;
const haversineDistance = (a, b) => {
    // you got the point.
    throw new Error("Not implemented yet");
};
exports.haversineDistance = haversineDistance;
function preComputeDistanceBetweenDestinations(destinations, distanceFormula) {
    const distanceMap = new Map();
    for (const a of destinations.values()) {
        const distancesFromA = new Map();
        for (const b of destinations.values()) {
            const d = distanceFormula(a, b);
            distancesFromA.set(b, d);
        }
        distanceMap.set(a, distancesFromA);
    }
    return distanceMap;
}
//# sourceMappingURL=points.js.map