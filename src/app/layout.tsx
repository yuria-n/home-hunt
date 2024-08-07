import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import clsx from "clsx";

import Header from "@/app/header";
import { Providers } from "@/providers/providers";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home Hunt - Discover your perfect nest",
  description:
    "HomeHunt is your go-to platform for finding the perfect rental property. Whether you're searching for an apartment, condo, or house, HomeHunt makes it easy to discover and secure your next home.",
};

export default function RootLayout({ children }: PropsWithChildren<{}>) {
  return (
    <html lang="en" className="text-slate-900">
      <Providers>
        <body
          className={clsx(inter.className, "antialiased bg-white min-h-screen")}
        >
          <Header />
          <main className="flex flex-col">{children}</main>
        </body>
      </Providers>
    </html>
  );
}
