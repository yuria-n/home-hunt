"use client";

import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import {
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useState,
  useEffect,
} from "react";
import clsx from "clsx";

import { SortKey, useHousingContext } from "@/providers/HousingProvider";
import { Key } from "@/utils";

interface Item {
  value: string;
  text: string;
  sortKey: SortKey;
}

const items: Item[] = [
  {
    value: "date-posted",
    text: "Date posted (latest first)",
    sortKey: "createdAt",
  },
  { value: "price", text: "Price (lowest first)", sortKey: "price" },
];

export function Dropdown() {
  const { setSortKey } = useHousingContext();
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!setSortKey) {
      return;
    }
    setSortKey(items[selectedIndex].sortKey);
  }, [setSortKey, selectedIndex]);

  const toggleDropdown = useCallback(() => setOpen((open) => !open), []);
  const handleButtonKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) =>
      setOpen(e.key !== Key.Enter && e.key !== Key.Escape),
    [],
  );

  const handleSelectItem = useCallback(
    (e: MouseEvent<HTMLLIElement> | KeyboardEvent<HTMLLIElement>) => {
      if (!("dataset" in e.target)) {
        return;
      }

      // Handle KeyboardEvent
      if ("key" in e && e.key !== Key.Enter && e.key !== Key.Space) {
        return;
      }

      const target = e.target as HTMLElement;
      setSelectedIndex(Number(target.dataset.index));
      setOpen(false);
    },
    [],
  );

  const selectedItem = items[selectedIndex];
  return (
    <div className="relative flex-auto z-10">
      <button
        className="flex items-center bg-white border border-slate-300 pl-2 py-0.5 pr-1 rounded focus:border-cyan-600"
        onClick={toggleDropdown}
        onKeyDown={handleButtonKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        Sort by: {selectedItem.text}
        <ChevronUpDownIcon className="w-4 ml-1" aria-hidden />
      </button>
      {open && (
        <ul
          className="absolute bg-white mt-1 w-full rounded shadow-lg"
          role="listbox"
          tabIndex={1}
          aria-activedescendant={selectedItem.text}
        >
          {items.map((item, index) => (
            <li
              key={item.value}
              data-index={index}
              role="option"
              aria-selected={index === selectedIndex}
              className={clsx(
                "px-1 py-0.5 cursor-pointer",
                index === 0 && "rounded-t",
                index === items.length - 1 && "rounded-b",
                index === selectedIndex
                  ? "bg-cyan-600 text-white"
                  : "text-slate-900 hover:bg-cyan-50",
              )}
              onClick={handleSelectItem}
              onKeyDown={handleSelectItem}
              tabIndex={0}
            >
              {item.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
