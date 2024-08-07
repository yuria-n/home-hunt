"use client";

import {
  ListChildComponentProps,
  VariableSizeList as List,
} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { ListCard } from "@/app/list-card";
import { useHousingContext } from "@/providers/HousingProvider";
import { Housing } from "@/entities";

const headerHeight = 48;
const upperContent = headerHeight + 157 + 16 * 2;
const getItemSize = () => 137 + 12;

export function ListCards() {
  const { selectedOrFilteredHousingList } = useHousingContext();

  if (!selectedOrFilteredHousingList) {
    return;
  }

  return (
    <>
      <p className="text-xs my-2">
        Showing {selectedOrFilteredHousingList.length.toLocaleString()} postings
      </p>
      <AutoSizer>
        {({ width }) => (
          <List
            height={window.innerHeight - upperContent}
            itemCount={selectedOrFilteredHousingList.length}
            itemSize={getItemSize}
            itemData={selectedOrFilteredHousingList}
            width={width}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </>
  );
}

function Row({ data, index, style }: ListChildComponentProps<Housing[]>) {
  return <ListCard housing={data[index]} style={style} />;
}
