import { useCallback, useEffect, useMemo, useState } from "react";
import { LatLngBounds } from "leaflet";
import { useMap } from "react-leaflet";

import type * as entities from "@/entities";
import * as repositories from "@/repositories";
import * as services from "@/services";
import { round } from "@/utils";
import { Coordinate, useHousingContext } from "@/providers/HousingProvider";

const repository = new repositories.HousingRepository();
const service = new services.HousingService(repository);

const precisions = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 20, 30, 50, 100, 250, 500, 1_000, 2_000,
];

function isWithinRange(
  bounds: LatLngBounds,
  housing: entities.Housing,
): boolean {
  return (
    housing.latitude >= bounds.getSouth() &&
    housing.latitude <= bounds.getNorth() &&
    housing.longitude <= bounds.getEast() &&
    housing.longitude >= bounds.getWest()
  );
}

export function useHousing() {
  const map = useMap();

  const { housingList, setHousingList, filteredHousingList } =
    useHousingContext();
  const [housingListMap, setHousingListMap] = useState<
    Map<Coordinate, entities.Housing[]>
  >(new Map());
  const fetchHousingList = useCallback(async () => {
    if (!setHousingList) {
      return;
    }
    setHousingList(await service.getList());
  }, [setHousingList]);
  useEffect(
    function updateHousingListMap() {
      if (!filteredHousingList) {
        return;
      }
      const coordinateMap = new Map<string, Coordinate>();
      const groupedMap = new Map<Coordinate, entities.Housing[]>();
      const bounds = map.getBounds();
      const precision = precisions[map.getZoom()];
      for (const housing of filteredHousingList) {
        if (!isWithinRange(bounds, housing)) {
          continue;
        }
        const latitude = round(housing.latitude, precision);
        const longitude = round(housing.longitude, precision);
        const key = `${latitude},${longitude}`;
        if (!coordinateMap.has(key)) {
          coordinateMap.set(key, [latitude, longitude]);
        }
        const coordinate = coordinateMap.get(key)!;
        if (!groupedMap.has(coordinate)) {
          groupedMap.set(coordinate, []);
        }
        groupedMap.get(coordinate)!.push(housing);
      }

      const adjustedMap = new Map(
        Array.from(groupedMap, ([, housingList]) => {
          const latitude = housingList.reduce(
            (acc, housing) => acc + housing.latitude / housingList.length,
            0,
          );
          const longitude = housingList.reduce(
            (acc, housing) => acc + housing.longitude / housingList.length,
            0,
          );
          return [[latitude, longitude] as Coordinate, housingList];
        }),
      );
      setHousingListMap(adjustedMap);

      map.on("zoom", updateHousingListMap).on("mouseup", updateHousingListMap);
      return () => {
        map
          .off("zoom", updateHousingListMap)
          .off("mouseup", updateHousingListMap);
      };
    },
    [map, filteredHousingList],
  );

  return useMemo(
    () => ({ housingList, fetchHousingList, housingListMap }),
    [housingList, fetchHousingList, housingListMap],
  );
}
