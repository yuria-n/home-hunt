export function round(num: number, precision = 1): number {
  return Math.round(num * precision) / precision;
}
