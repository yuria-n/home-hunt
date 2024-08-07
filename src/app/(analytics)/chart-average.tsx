import type { ReactNode } from "react";
import clsx from "clsx";

import { round } from "@/utils";

interface ChartAverageProps {
  label: string;
  value: number | null;
  icon: ReactNode;
  color: string;
}

export function ChartAverage({ label, value, icon, color }: ChartAverageProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[auto_auto] gap-2 items-center bg-white p-4 rounded shadow transition-all">
      <div
        className={clsx(
          "text-white rounded-full w-10 h-10 grid items-center justify-center",
          color,
        )}
      >
        {icon}
      </div>
      <div>
        <p className="text-slate-600">{label}</p>
        {value ? (
          <p className="text-xl font-bold">
            ${round(value, 100).toLocaleString()}
          </p>
        ) : (
          <p className="row-start-2 row-end-3 col-start-2 col-end-3 text-2xl font-bold text-slate-300">
            NO DATA
          </p>
        )}
      </div>
    </div>
  );
}
