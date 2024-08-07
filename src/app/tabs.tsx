"use client";

import clsx from "clsx";
import { useState, KeyboardEvent, useCallback, MouseEvent } from "react";

import { TabContent, TabContentType } from "@/app/tab-content";
import { Key } from "@/utils";

export const tabs = [
  { name: "Browse", type: TabContentType.Browse },
  { name: "Analytics", type: TabContentType.Analytics },
  { name: "Saved", type: TabContentType.Saved },
];

export function Tabs() {
  const [activeTab, setActiveTab] = useState(TabContentType.Browse);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      switch (event.key) {
        case Key.ArrowRight: {
          setActiveTab(
            (currentActiveIndex) => (currentActiveIndex + 1) % tabs.length,
          );
          break;
        }
        case Key.ArrowLeft: {
          setActiveTab(
            (currentActiveIndex) =>
              (currentActiveIndex - 1 + tabs.length) % tabs.length,
          );
        }
      }
    },
    [],
  );
  const handleClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    if (!("dataset" in e.target)) {
      return;
    }

    const target = e.target as HTMLElement;
    setActiveTab(Number(target.dataset.content));
  }, []);

  return (
    <div className="w-full">
      <div
        role="tablist"
        aria-label="Housing Tabs"
        className="flex justify-start border-b border-slate-300"
      >
        {tabs.map((tab) => (
          <button
            key={tab.type}
            role="tab"
            id={`tab-${tab.type}`}
            data-content={tab.type}
            aria-controls={`tabpanel-${tab.type}`}
            aria-selected={activeTab === tab.type}
            tabIndex={activeTab === tab.type ? 0 : -1}
            className={clsx(
              "px-4 py-2 font-bold border-b-2 transition-all",
              activeTab === tab.type
                ? "border-cyan-600 text-cyan-600"
                : "border-transparent text-slate-600 hover:text-cyan-600",
            )}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.type}
          role="tabpanel"
          id={`tabpanel-${tab.type}`}
          aria-labelledby={`tab-${tab.type}`}
          hidden={activeTab !== tab.type}
          className="focus:outline-none"
        >
          <h1 className="font-bold text-lg mt-4 mb-2">{tab.name}</h1>
        </div>
      ))}

      <TabContent activeTab={activeTab} />
    </div>
  );
}
