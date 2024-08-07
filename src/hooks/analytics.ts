import { useMemo } from "react";

import { DataColor } from "@/app/(analytics)/chart-pie";
import { Housing, HousingType, PriceHistory } from "@/entities";
import { useHousingContext } from "@/providers/HousingProvider";

export interface HousingAveragePricePerMonth {
  date: number;
  apartment: number | null;
  condo: number | null;
  house: number | null;
}

const separator = ":";
type DateKey = string;

function setPriceHistory(
  memo: Map<DateKey, Map<HousingType, PriceHistory[]>>,
  housing: Housing,
  history: PriceHistory,
) {
  const date = new Date(history.updatedAt);
  const dateStr = `${date.getFullYear()}${separator}${date.getMonth()}`;
  if (!memo.has(dateStr)) {
    memo.set(dateStr, new Map());
  }
  const map = memo.get(dateStr)!;
  if (!map.has(housing.type)) {
    map.set(housing.type, []);
  }
  map.get(housing.type)!.push(history);
}

export function useHousingListAveragePricesPerMonth() {
  const { selectedOrFilteredHousingList } = useHousingContext();
  const housingAveragePrices: HousingAveragePricePerMonth[] = useMemo(() => {
    if (!selectedOrFilteredHousingList) {
      return [];
    }

    const now = Date.now();
    const memo: Map<DateKey, Map<HousingType, PriceHistory[]>> = new Map();
    for (const housing of selectedOrFilteredHousingList) {
      // Set today's price
      setPriceHistory(memo, housing, {
        price: housing.price,
        updatedAt: now,
      });
      for (const history of housing.priceHistory) {
        setPriceHistory(memo, housing, history);
      }
    }

    return Array.from(memo.keys())
      .sort((s1, s2) => s1.localeCompare(s2))
      .map((key) => {
        const [year, month] = key.split(separator).map((str) => Number(str));
        const map = memo.get(key)!;
        return {
          date: new Date(year, month).getTime(),
          apartment: getAveragePrice(map.get(HousingType.Apartment) ?? null),
          condo: getAveragePrice(map.get(HousingType.Condo) ?? null),
          house: getAveragePrice(map.get(HousingType.House) ?? null),
        };
      });
  }, [selectedOrFilteredHousingList]);

  return housingAveragePrices;
}

interface PriceItem {
  price: number;
}

function getAveragePrice(prices: PriceItem[] | null) {
  return (
    prices?.reduce((acc, item) => acc + item.price / prices.length, 0) ?? null
  );
}

export function useHousingListAveragePrice(type?: HousingType) {
  const { selectedOrFilteredHousingList } = useHousingContext();
  return useMemo(() => {
    if (selectedOrFilteredHousingList === null) {
      return null;
    }

    return getAveragePrice(
      typeof type === "number"
        ? selectedOrFilteredHousingList.filter((item) => item.type === type)
        : selectedOrFilteredHousingList,
    );
  }, [selectedOrFilteredHousingList, type]);
}

const primaryClassNameMap: Record<keyof Housing["options"], DataColor> = {
  cats: DataColor.Pink,
  dogs: DataColor.Teal,
  furnished: DataColor.Blue,
};

export function usePieChartData(key: keyof Housing["options"]) {
  const { selectedOrFilteredHousingList } = useHousingContext();
  return useMemo(() => {
    if (!selectedOrFilteredHousingList) {
      return null;
    }
    const primaryTotal = selectedOrFilteredHousingList.reduce(
      (acc, item) => acc + (item.options[key] ? 1 : 0),
      0,
    );
    return [
      { color: primaryClassNameMap[key], value: primaryTotal },
      {
        color: DataColor.Slate,
        value: selectedOrFilteredHousingList.length - primaryTotal,
      },
    ];
  }, [selectedOrFilteredHousingList, key]);
}
