"use client";

import { ChangeEventHandler, useEffect } from "react";

import { useCheckbox, useRangeInput } from "@/hooks";
import { useHousingContext } from "@/providers/HousingProvider";

const rangeMap = {
  price: { min: "1", max: "10000" },
  bedroom: { min: "1", max: "5" },
  sqft: { min: "1", max: "2000" },
};

export function FilterPanel() {
  const { filter, setFilter } = useHousingContext();
  const price = useRangeInput(filter?.price);
  const bedroom = useRangeInput(filter?.bedroom);
  const sqft = useRangeInput(filter?.sqft);
  const cats = useCheckbox(filter?.cats);
  const dogs = useCheckbox(filter?.dogs);
  const furnished = useCheckbox(filter?.furnished);
  const apartment = useCheckbox(filter?.housingTypeMap.apartment);
  const condo = useCheckbox(filter?.housingTypeMap.condo);
  const house = useCheckbox(filter?.housingTypeMap.house);
  useEffect(() => {
    if (!setFilter) {
      return;
    }
    setFilter({
      price: { min: price.min.value, max: price.max.value },
      bedroom: { min: bedroom.min.value, max: bedroom.max.value },
      sqft: { min: sqft.min.value, max: sqft.max.value },
      cats: cats.checked,
      dogs: dogs.checked,
      furnished: furnished.checked,
      housingTypeMap: {
        apartment: apartment.checked,
        condo: condo.checked,
        house: house.checked,
      },
    });
  }, [
    setFilter,
    price,
    bedroom,
    sqft,
    cats,
    dogs,
    furnished,
    apartment,
    condo,
    house,
  ]);
  return (
    <div className="bg-white min-w-44 h-full p-4 shadow-lg col-start-1 col-end-2">
      <p className="font-bold mb-2">Filter by:</p>
      <label htmlFor="price">Price</label>
      <div className="grid grid-cols-2 gap-1 mt-1 mb-3">
        <input
          className="border border-slate-300 rounded"
          type="number"
          min={rangeMap.price.min}
          max={rangeMap.price.max}
          placeholder="min"
          onChange={price.min.onChange}
        />
        <input
          className="border border-slate-300 rounded"
          type="number"
          min={rangeMap.price.min}
          max={rangeMap.price.max}
          placeholder="max"
          onChange={price.max.onChange}
        />
      </div>

      <label>Bedrooms</label>
      <div className="grid grid-cols-2 gap-1 mt-1 mb-3">
        <input
          className="border border-slate-300 rounded"
          type="number"
          min={rangeMap.bedroom.min}
          max={rangeMap.bedroom.max}
          placeholder="min"
          onChange={bedroom.min.onChange}
        />
        <input
          className="border border-slate-300 rounded"
          type="number"
          min={rangeMap.bedroom.min}
          max={rangeMap.bedroom.max}
          placeholder="max"
          onChange={bedroom.max.onChange}
        />
      </div>

      <label>SQ ft.</label>
      <div className="grid grid-cols-2 gap-1 mt-1 mb-3">
        <input
          className="border border-slate-300 rounded"
          type="number"
          min={rangeMap.sqft.min}
          max={rangeMap.sqft.max}
          placeholder="min"
          onChange={sqft.min.onChange}
        />
        <input
          className="border border-slate-300 rounded"
          type="number"
          min={rangeMap.sqft.min}
          max={rangeMap.sqft.max}
          placeholder="max"
          onChange={sqft.max.onChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-0.5 mb-2">
        <p>Options</p>
        <Checkbox label="cats allowed" onChange={cats.onChange} />
        <Checkbox label="dogs allowed" onChange={dogs.onChange} />
        <Checkbox label="furnished" onChange={furnished.onChange} />
      </div>

      <div className="grid grid-cols-1 gap-0.5 mb-2">
        <p>Housing type</p>
        <Checkbox label="apartment" onChange={apartment.onChange} />
        <Checkbox label="condo" onChange={condo.onChange} />
        <Checkbox label="house" onChange={house.onChange} />
      </div>
    </div>
  );
}

interface CheckboxProps {
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

function Checkbox({ onChange, label }: CheckboxProps) {
  return (
    <label>
      <input className="mr-1" type="checkbox" onChange={onChange} />
      {label}
    </label>
  );
}
