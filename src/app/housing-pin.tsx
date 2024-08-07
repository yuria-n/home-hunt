import clsx from "clsx";
import { useCallback, useMemo } from "react";

import { Housing } from "@/entities";
import { Coordinate, useHousingContext } from "@/providers/HousingProvider";

interface HousingPinProps {
  coordinate: Coordinate;
  zoom: number;
  list: Housing[];
}

const maxCount = 999;

export function HousingPin({ coordinate, zoom, list }: HousingPinProps) {
  const { selectedCoordinate, setSelectedCoordinate, setSelectedHousingList } =
    useHousingContext();
  const selected = useMemo(() => {
    if (!selectedCoordinate) {
      return false;
    }
    return (
      coordinate[0] === selectedCoordinate[0] &&
      coordinate[1] === selectedCoordinate[1] &&
      zoom === selectedCoordinate[2]
    );
  }, [coordinate, zoom, selectedCoordinate]);
  const handleClick = useCallback(() => {
    if (!setSelectedCoordinate || !setSelectedHousingList) {
      return;
    }

    if (selected) {
      setSelectedCoordinate(null);
      setSelectedHousingList(null);
      return;
    }
    setSelectedCoordinate([coordinate[0], coordinate[1], zoom]);
    setSelectedHousingList(list);
  }, [
    coordinate,
    zoom,
    list,
    selected,
    setSelectedCoordinate,
    setSelectedHousingList,
  ]);
  return (
    <div>
      <button
        className={clsx(
          "w-8 h-8 rounded-full text-white font-bold text-xs grid items-center justify-center border shadow transition-all hover:shadow-2xl",
          selected && "bg-pink-600 border-pink-800 hover:bg-pink-500",
          !selected && "bg-cyan-600 border-cyan-800 hover:bg-cyan-500",
        )}
        onClick={handleClick}
      >
        {Math.min(list.length, maxCount)}
      </button>
    </div>
  );
}
