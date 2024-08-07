"use client";

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { Housing, HousingType } from "@/entities";
import type { CheckboxState, RangeInputState } from "@/hooks";
import * as repositories from "@/repositories";
import * as services from "@/services";

const repository = new repositories.HousingRepository();
const service = new services.HousingService(repository);

export type SortKey = Extract<keyof Housing, "price" | "createdAt">;
export type Coordinate = [number, number, number?];
interface HousingContextType {
  filter: Filter | null;
  setFilter: Dispatch<SetStateAction<Filter | null>> | null;
  sortKey: SortKey | null;
  setSortKey: Dispatch<SetStateAction<SortKey | null>> | null;
  housingList: Housing[] | null;
  setHousingList: Dispatch<SetStateAction<Housing[]>> | null;
  filteredHousingList: Housing[] | null;
  selectedCoordinate: Coordinate | null;
  setSelectedCoordinate: Dispatch<SetStateAction<Coordinate | null>> | null;
  selectedHousingList: Housing[] | null;
  setSelectedHousingList: Dispatch<SetStateAction<Housing[] | null>> | null;
  selectedOrFilteredHousingList: Housing[] | null;
}

export const HousingContext = createContext<HousingContextType>({
  filter: null,
  setFilter: null,
  sortKey: null,
  setSortKey: null,
  housingList: null,
  setHousingList: null,
  filteredHousingList: null,
  selectedCoordinate: null,
  setSelectedCoordinate: null,
  selectedHousingList: null,
  setSelectedHousingList: null,
  selectedOrFilteredHousingList: null,
});

export interface Filter {
  price: RangeInputState;
  bedroom: RangeInputState;
  sqft: RangeInputState;
  cats: CheckboxState;
  dogs: CheckboxState;
  furnished: CheckboxState;
  housingTypeMap: {
    apartment: CheckboxState;
    condo: CheckboxState;
    house: CheckboxState;
  };
}

function isChecked(value: boolean, filter: CheckboxState | null) {
  return !filter || value;
}

function isWithinRange({
  value,
  filter,
}: {
  value: number;
  filter: RangeInputState | null;
}) {
  if (filter === null) {
    return true;
  }

  if (filter.min && value < filter.min) {
    return false;
  }

  if (filter.max && value > filter.max) {
    return false;
  }

  return true;
}

const descSet = new Set<SortKey>(["createdAt"]);

export function HousingProvider({ children }: PropsWithChildren<{}>) {
  const [filter, setFilter] = useState<Filter | null>(null);
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [housingList, setHousingList] = useState<Housing[]>([]);
  const [filteredHousingList, setFilteredHousingList] = useState<Housing[]>([]);
  const [selectedCoordinate, setSelectedCoordinate] =
    useState<Coordinate | null>(null);
  const [selectedHousingList, setSelectedHousingList] = useState<
    Housing[] | null
  >(null);
  useEffect(() => {
    service.getList().then(setHousingList);
  }, []);

  useEffect(() => {
    const housingTypeSet = new Set([
      HousingType.Apartment,
      HousingType.Condo,
      HousingType.House,
    ]);
    if (
      filter &&
      Object.values(filter.housingTypeMap).some((checked) => checked)
    ) {
      housingTypeSet.clear();
      if (filter.housingTypeMap.apartment) {
        housingTypeSet.add(HousingType.Apartment);
      }
      if (filter.housingTypeMap.condo) {
        housingTypeSet.add(HousingType.Condo);
      }
      if (filter.housingTypeMap.house) {
        housingTypeSet.add(HousingType.House);
      }
    }

    const filteredList = !filter
      ? housingList
      : housingList.filter(
          (housing) =>
            isWithinRange({ value: housing.price, filter: filter.price }) &&
            isWithinRange({
              value: housing.bedroom,
              filter: filter.bedroom,
            }) &&
            isWithinRange({
              value: housing.squareFeet,
              filter: filter.sqft,
            }) &&
            isChecked(housing.options.cats, filter.cats) &&
            isChecked(housing.options.dogs, filter.dogs) &&
            isChecked(housing.options.furnished, filter.furnished) &&
            housingTypeSet.has(housing.type),
        );
    if (sortKey) {
      const desc = descSet.has(sortKey) ? -1 : 1;
      filteredList.sort((f1, f2) => desc * (f1[sortKey] - f2[sortKey]));
    }
    setFilteredHousingList(filteredList);
  }, [filter, sortKey, housingList]);

  return (
    <HousingContext.Provider
      value={{
        filter,
        setFilter,
        sortKey,
        setSortKey,
        housingList,
        setHousingList,
        filteredHousingList,
        selectedCoordinate,
        setSelectedCoordinate,
        selectedHousingList,
        setSelectedHousingList,
        selectedOrFilteredHousingList:
          selectedHousingList ?? filteredHousingList,
      }}
    >
      {children}
    </HousingContext.Provider>
  );
}

export function useHousingContext() {
  return useContext(HousingContext);
}
