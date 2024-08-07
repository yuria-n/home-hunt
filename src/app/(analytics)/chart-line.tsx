import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  TooltipProps,
  DefaultLegendContentProps,
} from "recharts";
import dayjs from "dayjs";

import { useHousingListAveragePricesPerMonth } from "@/hooks/analytics";
import { round } from "@/utils";

const chartHeight = 400;
const axisFontSize = 14;
const axisColor = "#475569"; // slate-600
const lines = [
  { key: "apartment", color: "#60a5fa" },
  { key: "condo", color: "#14b8a6" },
  { key: "house", color: "#f472b6" },
];

function dateFormatter(tick: number) {
  return dayjs(tick).format("MMM YYYY");
}

function renderCustomLegend({ payload }: DefaultLegendContentProps) {
  return (
    <ul className="flex justify-center">
      {payload?.map((entry) => (
        <li className="ml-4 flex items-center justify-start" key={entry.value}>
          <svg className="mr-1" width={10} height={10} aria-hidden>
            <circle cx={5} cy={5} r={5} fill={entry.color} />
          </svg>
          <p className="capitalize">{entry.value}s</p>
        </li>
      ))}
    </ul>
  );
}

function CustomTooltip({
  active,
  payload,
  label,
}: TooltipProps<number, number>) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }
  return (
    <div className="bg-white p-2 rounded border border-slate-300 shadow-lg">
      <p className="text-xs font-bold text-slate-600">{dateFormatter(label)}</p>
      {payload.map(({ value }, index) => {
        const { key, color } = lines[index];
        return (
          <p
            className="text-xs font-bold capitalize"
            key={key}
            style={{ color }}
          >{`${key}: $${round(payload[index].value!, 100).toLocaleString()}`}</p>
        );
      })}
    </div>
  );
}

export function ChartLine() {
  const data = useHousingListAveragePricesPerMonth();

  return (
    <div className={`w-full min-h-96 bg-white rounded grid items-center`}>
      {data ? (
        <ResponsiveContainer
          className="pt-6 pb-2"
          width="100%"
          height={chartHeight}
        >
          <LineChart width={800} height={400} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              stroke={axisColor}
              tick={{ fontSize: axisFontSize }}
              tickFormatter={dateFormatter}
            />
            <YAxis stroke={axisColor} tick={{ fontSize: axisFontSize }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend align="center" content={renderCustomLegend} />
            {lines.map(({ key, color }) => (
              <Line
                key={key}
                type="linear"
                dataKey={key}
                strokeWidth={2}
                stroke={color}
                connectNulls
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-2xl text-center font-bold text-slate-300">NO DATA</p>
      )}
    </div>
  );
}
