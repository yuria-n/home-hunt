"use client";

import type { PropsWithChildren } from "react";

import { HousingProvider } from "@/providers/HousingProvider";

export function Providers({ children }: PropsWithChildren<{}>) {
  return <HousingProvider>{children}</HousingProvider>;
}
