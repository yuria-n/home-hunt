"use client";

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Breadcrumbs() {
  return (
    <nav className="text-slate-400 mb-4" aria-label="Breadcrumb">
      <ol className="list-reset flex items-center">
        <li>
          <Link
            href="/"
            className="text-cyan-600 hover:text-cyan-800 border-b-2 border-transparent transition-all hover:border-cyan-700"
          >
            Home
          </Link>
        </li>
        <li>
          <ChevronRightIcon className="w-4 mx-2" aria-hidden />
        </li>
        <li>
          <Link
            href="/"
            className="text-cyan-600 hover:text-cyan-800 border-b-2 border-transparent transition-all hover:border-cyan-700"
          >
            Housing
          </Link>
        </li>
        <li>
          <ChevronRightIcon className="w-4 mx-2" aria-hidden />
        </li>
        <li className="text-slate-500">Search result</li>
      </ol>
    </nav>
  );
}
