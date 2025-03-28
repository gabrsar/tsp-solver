"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.haversineDistance = exports.euclideanDistance = void 0;
const euclideanDistance = (a, b) => {
    return Math.sqrt((b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2);
};
exports.euclideanDistance = euclideanDistance;
const haversineDistance = (a, b) => {
    // Not implemented. Here for example of another distance solver.
    throw new Error('Not implemented for this exercise!');
};
exports.haversineDistance = haversineDistance;
//# sourceMappingURL=points.js.map