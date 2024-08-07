"use client";

import dynamic from "next/dynamic";

const Map = dynamic(async () => (await import("@/app/map")).Map, {
  ssr: false,
});

export function HomeContent() {
  return (
    <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-200">
      <Map />
    </div>
  );
}
