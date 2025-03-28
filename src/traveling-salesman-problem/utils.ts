import {Point} from "../geometry/points";

export function connectRouteEnds(coordinates: Point[]): void {
    if (coordinates.length > 1) {
        const startPoint = coordinates[0];
        const finishPoint = coordinates.at(-1)!;

        if (startPoint[0] != finishPoint[0] || startPoint[1] != finishPoint[1]) {
            coordinates.push(startPoint);
        }
    }
}