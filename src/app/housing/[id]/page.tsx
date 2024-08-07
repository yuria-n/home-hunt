"use client";

import React, { useMemo } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ChevronLeftIcon,
  EyeSlashIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { BookmarkIcon as SolidBookmarkIcon } from "@heroicons/react/24/solid";

import { useHousingContext } from "@/providers/HousingProvider";
import { CardLabel } from "@/app/card-label";

dayjs.extend(relativeTime);

export default function Housing() {
  const { id } = useParams();
  const { housingList } = useHousingContext();
  const housing = useMemo(
    () => housingList?.find((housing) => housing.id === id),
    [id, housingList],
  );
  if (!housing) {
    return null;
  }

  return (
    <div className="grid grid-rows-[1fr_auto] grid-cols-[1fr_1fr_auto_auto] gap-2 bg-white w-full h-full p-8">
      <div className="row-start1 row-end-2 col-start-1 col-end-3">
        <h1 className="font-bold text-3xl mb-2">{housing.name}</h1>
        <div className="flex items-center justify-start gap-2 mb-2">
          <div className="flex items-center">
            <CardLabel type={housing.type} />
          </div>
          <p className="text-xs text-slate-600">
            Created: {dayjs(housing.createdAt).fromNow()}
          </p>
          <p className="text-xs text-slate-600">
            Updated: {dayjs(housing.updatedAt).fromNow()}
          </p>
        </div>

        <div className="flex items-center justify-start gap-2 mb-2 text-xl">
          <p className="font-bold">${housing.price.toLocaleString()}</p>
          <span className="text-xs text-slate-300" aria-hidden>
            |
          </span>
          <p>
            {housing.bedroom}br, {housing.squareFeet}ft²
          </p>
        </div>

        <Image
          className="rounded object-cover"
          src={housing.image || "/placeholder.jpg"}
          alt="preview"
          width={400}
          height={250}
        />

        <ul className="my-4">
          <li>Cats: {housing.options.cats ? "Allowed" : "Not allowed"}</li>
          <li>Dogs: {housing.options.dogs ? "Allowed" : "Not allowed"}</li>
          <li>Furnished: {housing.options.furnished ? "Yes" : "No"}</li>
        </ul>

        <div className="row-start-2 row-end-3 col-start-1 col-end-5 pt-2 flex items-start justify-start gap-1 mb-8">
          {/* TODO: turn icons into button */}
          <SolidBookmarkIcon className="text-pink-600" width={24} height={24} />
          <EyeSlashIcon className="text-slate300" width={24} height={24} />
          <ShareIcon className="text-slate300" width={24} height={24} />
        </div>

        <Link
          className="border-b-2 border-transparent 0 pr-1 pb-0.5 transition hover:text-cyan-600 hover:border-cyan-600"
          href="/"
        >
          <ChevronLeftIcon
            className="inline mr-1"
            width={16}
            height={16}
            aria-hidden
          />
          Go back
        </Link>
      </div>
    </div>
  );
}
