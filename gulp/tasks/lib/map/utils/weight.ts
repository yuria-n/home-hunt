import { Weight } from "../config";

export function getDistribution<T extends Weight>(weights: T[], scale: number) {
  const total = weights.reduce((acc, w) => acc + w.weight, 0);
  return weights.map((item) => [item, (scale * item.weight) / total] as const);
}
