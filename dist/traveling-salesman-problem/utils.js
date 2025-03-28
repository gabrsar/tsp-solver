"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectRouteEnds = connectRouteEnds;
function connectRouteEnds(coordinates) {
    if (coordinates.length > 1) {
        const startPoint = coordinates[0];
        const finishPoint = coordinates.at(-1);
        if (startPoint[0] != finishPoint[0] || startPoint[1] != finishPoint[1]) {
            coordinates.push(startPoint);
        }
    }
}
//# sourceMappingURL=utils.js.map