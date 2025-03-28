import { Point } from '../geometry/points';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

export async function loadCoordinatesFromFile(inputFilePath: string): Promise<Point[]> {
  const fullPath = resolve(inputFilePath);

  if (!fullPath) {
    throw new Error(`Invalid file path for '${inputFilePath}'`);
  }

  console.log(`Loading data from: ${fullPath}`);
  const data = await readFile(fullPath, 'utf8');

  if (!data) {
    throw new Error(`Could not load data from file '${fullPath}'`);
  }

  const lines = data.split('\n');

  const seenPoints = new Set<string>();
  const points: Point[] = [];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i].trim();
    if (!rawLine) continue;

    const point = rawLine.split(',').map((c) => parseFloat(c.trim())) as Point;

    if (point.length !== 2 || point.some((n) => isNaN(n))) {
      throw new Error(`Invalid point data at line ${i + 1}: '${lines[i]}'`);
    }

    const key = point.join(',');
    if (!seenPoints.has(key)) {
      seenPoints.add(key);
      points.push(point);
    }
  }

  console.log(`Load data complete: ${points.length} points found and parsed.`);
  return points;
}
