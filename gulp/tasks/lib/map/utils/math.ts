export function floor(num: number, precision = 1): number {
  return Math.floor(num * precision) / precision;
}
