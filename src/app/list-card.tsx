import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  ChevronRightIcon,
  EyeSlashIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { BookmarkIcon as SolidBookmarkIcon } from "@heroicons/react/24/solid";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Housing } from "@/entities";
import { CardLabel } from "@/app/card-label";

dayjs.extend(relativeTime);

const placeholderSrc = "/images/placeholder.jpg";

type LiProps = React.JSX.IntrinsicElements["li"];
interface ListCardProps extends LiProps {
  housing: Housing;
}

export function ListCard({ housing, style }: ListCardProps) {
  return (
    <div style={style}>
      <Link
        className="grid grid-rows-[1fr_auto] grid-cols-[1fr_1fr_auto_auto] gap-2 bg-white rounded w-full pl-4 py-4 pr-1 drop-shadow transition-all hover:drop-shadow-xl overflow-hidden border-l-4 border-white hover:border-cyan-600 focus:border-cyan-600"
        href={`/housing/${housing.id}`}
        passHref
      >
        <div className="row-start1 row-end-2 col-start-1 col-end-3">
          <h2 className="font-bold mb-1 truncate" title={housing.name}>
            {housing.name}
          </h2>

          <div className="flex items-center justify-start gap-2 mb-1">
            <div className="flex items-center">
              <CardLabel type={housing.type} />
            </div>
            <p className="text-xs text-slate-600">
              {dayjs(housing.createdAt).fromNow()}
            </p>
          </div>

          <div className="flex items-center justify-start gap-2">
            <p className="font-bold text-xm">
              ${housing.price.toLocaleString()}
            </p>
            <span className="text-xs text-slate-300" aria-hidden>
              |
            </span>
            <p className="text-xm">
              {housing.bedroom}br, {housing.squareFeet}ft²
            </p>
          </div>
        </div>

        <Image
          className="w-auto h-auto row-start-1 row-end-2 col-start-3 col-end-4 rounded bg-slate-300"
          src={housing.image || placeholderSrc}
          alt="preview"
          width={100}
          height={75}
        />

        <ChevronRightIcon
          className="row-start-1 row-end-3 col-start-4 col-end-5 my-auto text-slate-600"
          width={16}
          height={16}
        />

        <div className="row-start-2 row-end-3 col-start-1 col-end-5 flex items-start justify-start gap-1">
          {/* TODO: turn icons into button */}
          <SolidBookmarkIcon className="text-pink-600" width={20} height={20} />
          <EyeSlashIcon className="text-slate300" width={24} height={20} />
          <ShareIcon className="text-slate300" width={20} height={20} />
        </div>
      </Link>
    </div>
  );
}
