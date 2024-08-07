import clsx from "clsx";

import { HousingType } from "@/entities";

const typeColorMap: Record<HousingType, string> = {
  [HousingType.Apartment]: "text-blue-800 bg-blue-100",
  [HousingType.Condo]: "text-teal-800 bg-teal-100",
  [HousingType.House]: "text-pink-800 bg-pink-100",
};

interface CardLabelProps {
  type: HousingType;
}

export function CardLabel({ type }: CardLabelProps) {
  return (
    <span
      className={clsx("px-1.5 py-0.5 text-xs rounded-full", typeColorMap[type])}
    >
      {HousingType[type]}
    </span>
  );
}
