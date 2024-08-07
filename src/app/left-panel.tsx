import { FilterPanel } from "@/app/filter-panel";
import { Tabs } from "@/app/tabs";

export function LeftPanel() {
  return (
    <div className="absolute top-0 left-0 w-1/2 h-full bg-slate-100 grid grid-cols-[auto_1fr]">
      <FilterPanel />

      <div className="p-4 col-start-2 col-end-3">
        <Tabs />
      </div>
    </div>
  );
}
