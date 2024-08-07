import { Dropdown } from "@/app/dropdown";
import { ListCards } from "@/app/list-cards";
import { TabAnalytics } from "@/app/(analytics)/tab-analytics";

export enum TabContentType {
  Browse,
  Analytics,
  Saved,
}

interface TabContentProps {
  activeTab: TabContentType;
}

export function TabContent({ activeTab }: TabContentProps) {
  switch (activeTab) {
    case TabContentType.Browse: {
      return (
        <>
          <Dropdown />
          <ListCards />
        </>
      );
    }
    case TabContentType.Analytics: {
      return <TabAnalytics />;
    }
    case TabContentType.Saved: {
      return null;
    }
  }
}
