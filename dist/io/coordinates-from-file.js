"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadCoordinatesFromFile = loadCoordinatesFromFile;
const promises_1 = require("fs/promises");
const path_1 = require("path");
async function loadCoordinatesFromFile(inputFilePath) {
    const fullPath = (0, path_1.resolve)(inputFilePath);
    if (!fullPath) {
        throw new Error(`Invalid file path for '${inputFilePath}'`);
    }
    console.log(`Loading data from: ${fullPath}`);
    const data = await (0, promises_1.readFile)(fullPath, "utf8");
    if (!data) {
        throw new Error(`Could not load data from file '${fullPath}'`);
    }
    const lines = data.split("\n");
    const seenPoints = new Set();
    const points = [];
    for (let i = 0; i < lines.length; i++) {
        const rawLine = lines[i].trim();
        if (!rawLine)
            continue;
        const point = rawLine
            .split(",")
            .map((c) => parseFloat(c.trim()));
        if (point.length !== 2 || point.some((n) => isNaN(n))) {
            throw new Error(`Invalid point data at line ${i + 1}: '${lines[i]}'`);
        }
        const key = point.join(",");
        if (!seenPoints.has(key)) {
            seenPoints.add(key);
            points.push(point);
        }
    }
    console.log(`Load data complete: ${points.length} points found and parsed.`);
    return points;
}
//# sourceMappingURL=coordinates-from-file.js.map