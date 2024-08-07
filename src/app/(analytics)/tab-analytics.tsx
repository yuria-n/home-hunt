"use client";

import {
  BuildingOffice2Icon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

import { useHousingContext } from "@/providers/HousingProvider";
import { ChartPie } from "@/app/(analytics)/chart-pie";
import { ChartAverage } from "@/app/(analytics)/chart-average";
import { ChartHeading } from "@/app/(analytics)/chart-heading";
import { ChartLine } from "@/app/(analytics)/chart-line";
import { HousingType } from "@/entities";
import { useHousingListAveragePrice, usePieChartData } from "@/hooks/analytics";

export function TabAnalytics() {
  const { selectedOrFilteredHousingList } = useHousingContext();

  const overallAverage = useHousingListAveragePrice();
  const apartmentAverage = useHousingListAveragePrice(HousingType.Apartment);
  const condoAverage = useHousingListAveragePrice(HousingType.Condo);
  const houseAverage = useHousingListAveragePrice(HousingType.House);

  const catsData = usePieChartData("cats");
  const dogsData = usePieChartData("dogs");
  const furnishedData = usePieChartData("furnished");

  if (!selectedOrFilteredHousingList) {
    return null;
  }

  return (
    <div className="w-full h-full">
      <ChartHeading title="Average rent per type" />
      <div className="grid grid-rows-2 grid-cols-2 gap-4 mb-8">
        <ChartAverage
          label="Overall"
          value={overallAverage}
          color="bg-blue-900"
          icon={<CurrencyDollarIcon width={24} />}
        />
        <ChartAverage
          label="Apartments"
          value={apartmentAverage}
          color="bg-blue-400"
          icon={<BuildingOfficeIcon width={24} />}
        />
        <ChartAverage
          label="Condos"
          value={condoAverage}
          color="bg-teal-500"
          icon={<BuildingOffice2Icon width={24} />}
        />
        <ChartAverage
          label="Houses"
          value={houseAverage}
          color="bg-pink-400"
          icon={<HomeIcon width={24} />}
        />
      </div>

      <ChartHeading title="Average rent per month" />
      <div className="grid grid-cols-1 mb-8">
        <ChartLine />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <ChartPie title="Cats allowed" data={catsData} />
        <ChartPie title="Dogs allowed" data={dogsData} />
        <ChartPie title="Furnished" data={furnishedData} />
      </div>
    </div>
  );
}
