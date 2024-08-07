import assert from "node:assert";

import _ from "lodash";

import { Coordinate, precisionMap } from "../config";

interface Vertex {
  x: number;
  y: number;
}

export interface Triangle<T> extends Vertex {
  item: T;
}

const precision = precisionMap.coordinate;

/**
 * Vertices must be arranged in a clockwise order
 */
export function earClippingTriangulation(
  vertices: Coordinate[],
): Triangle<Coordinate>[][] {
  const triangles: Triangle<Coordinate>[][] = [];
  const remainingVertices = vertices.map((v) => ({
    x: Math.floor(v.latitude * precision),
    y: Math.floor(v.longitude * precision),
    item: v,
  }));

  loop: while (remainingVertices.length > 3) {
    for (let i = 0; i < remainingVertices.length; i++) {
      if (isEar(remainingVertices, i)) {
        const ear = [
          remainingVertices[
            (i - 1 + remainingVertices.length) % remainingVertices.length
          ],
          remainingVertices[i],
          remainingVertices[(i + 1) % remainingVertices.length],
        ];
        triangles.push(ear);
        remainingVertices.splice(i, 1);
        continue loop;
      }
    }
    console.error(require("util").inspect(remainingVertices, false, null));
    throw new Error("No ear found");
  }

  if (remainingVertices.length === 3) {
    triangles.push(remainingVertices);
  }

  return triangles;
}

function subtract(p1: Vertex, p2: Vertex): Vertex {
  return { x: p1.x - p2.x, y: p1.y - p2.y };
}

function crossProduct(v1: Vertex, v2: Vertex): number {
  return v1.x * v2.y - v1.y * v2.x;
}

function isPointInTriangle(point: Vertex, triangle: Vertex[]): boolean {
  const [p1, p2, p3] = triangle;

  // Calculate vectors for the edges of the triangle
  const v0 = subtract(p2, p1);
  const v1 = subtract(p3, p1);
  const v2 = subtract(point, p1);

  // Compute cross products
  const dot00 = crossProduct(v0, v0);
  const dot01 = crossProduct(v0, v1);
  const dot02 = crossProduct(v0, v2);
  const dot11 = crossProduct(v1, v1);
  const dot12 = crossProduct(v1, v2);

  // Compute barycentric coordinates
  const invDenominator = 1 / (dot00 * dot11 - dot01 * dot01);
  const u = (dot11 * dot02 - dot01 * dot12) * invDenominator;
  const v = (dot00 * dot12 - dot01 * dot02) * invDenominator;

  // Determine if the point is inside the triangle
  return u >= 0 && v >= 0 && u + v <= 1;
}

function isEar(vertices: Vertex[], i: number): boolean {
  const size = vertices.length;
  const prev = vertices[(i - 1 + size) % size];
  const curr = vertices[i];
  const next = vertices[(i + 1) % size];

  // Ensure the triangle is convex
  if (crossProduct(subtract(curr, prev), subtract(next, curr)) < 0) {
    return false;
  }

  // Ensure no other vertices are inside the triangle
  for (let j = 0; j < size; j++) {
    if (j !== (i - 1 + size) % size && j !== i && j !== (i + 1) % size) {
      if (isPointInTriangle(vertices[j], [prev, curr, next])) {
        return false;
      }
    }
  }
  return true;
}

export function getRandomCoordinate(
  triangles: Triangle<Coordinate>[][],
): Coordinate {
  const triangle = _.sample(triangles);
  assert.ok(triangle);
  const [p1, p2, p3] = triangle;

  const r1 = Math.random();
  const r2 = Math.random();

  // Barycentric Coordinates
  const sqrtR1 = Math.sqrt(r1);
  const x = (1 - sqrtR1) * p1.x + sqrtR1 * (1 - r2) * p2.x + sqrtR1 * r2 * p3.x;
  const y = (1 - sqrtR1) * p1.y + sqrtR1 * (1 - r2) * p2.y + sqrtR1 * r2 * p3.y;

  return {
    latitude: Math.round(x) / precision,
    longitude: Math.round(y) / precision,
  };
}
