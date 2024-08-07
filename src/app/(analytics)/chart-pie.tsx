import { DataKey } from "recharts/types/util/types";
import { PieChart, Pie, ResponsiveContainer, Cell, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import { ChartHeading } from "@/app/(analytics)/chart-heading";
import { round } from "@/utils";

const chartWidth = 144;
const outerRadius = chartWidth - 16 * 5;
const innerRadius = outerRadius - 16;

function renderActiveShape({
  className,
  cx,
  cy,
  percent = 0,
  value,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
}: PieSectorDataItem) {
  return (
    <g>
      <Sector
        className={className}
        cx={Number(cx)}
        cy={Number(cy)}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
      />
      <text
        className="fill-slate-900 font-bold"
        x={cx}
        y={cy}
        textAnchor="middle"
      >
        {value?.toLocaleString()}
      </text>
      <text
        className="fill-slate-600 text-xs"
        x={cx}
        y={cy}
        dy={18}
        textAnchor="middle"
      >
        {`(${round(percent * 100, 100)}%)`}
      </text>
    </g>
  );
}

function NoData() {
  return (
    <div className="w-full h-full grid items-center justify-center">
      <p className="text-slate-300 font-bold text-center mb-4">NO DATA</p>
    </div>
  );
}

export enum DataColor {
  Pink,
  Teal,
  Blue,
  Slate,
}

interface Data {
  color: DataColor;
  value: number;
}

export interface ChartPieProps {
  title: string;
  data: Data[] | null;
  dataKey?: DataKey<string>;
}

export function ChartPie({ title, data, dataKey }: ChartPieProps) {
  return (
    <div>
      <ChartHeading title={title} />
      <ResponsiveContainer width="100%" height={chartWidth}>
        {data ? (
          <PieChart width={chartWidth} height={chartWidth}>
            <Pie
              className="fill-slate-300"
              activeIndex={0}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              startAngle={90}
              endAngle={-270}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={2}
              dataKey={dataKey ?? "value"}
            >
              {data.map(({ color, value }, index) => (
                <Cell
                  className={
                    color === DataColor.Pink
                      ? "fill-pink-400"
                      : color === DataColor.Teal
                        ? "fill-teal-500"
                        : color === DataColor.Blue
                          ? "fill-blue-400"
                          : "fill-slate-300"
                  }
                  key={`cell-${index}`}
                />
              ))}
            </Pie>
          </PieChart>
        ) : (
          <NoData />
        )}
      </ResponsiveContainer>
    </div>
  );
}
