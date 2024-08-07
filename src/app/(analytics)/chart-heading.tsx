interface ChartHeadingProps {
  title: string;
}

export function ChartHeading({ title }: ChartHeadingProps) {
  return <h2 className="mb-2">{title}</h2>;
}
