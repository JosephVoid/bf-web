"use client";

import Link from "next/link";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import Image from "next/image";
import { fetchDesires } from "@/lib/actions/fetch/desire.fetch";
import { IDesire, IDesireMeta, IFilterParams } from "@/lib/types";
import Paginate from "./paginate";
import React from "react";

export function Desire({ prop }: { prop: IDesire }) {
  return (
    <Link href={`/${prop.id}-${encodeURIComponent(prop.title)}`}>
      <Card className="p-4 mb-5 flex flex-col">
        <div className="flex justify-start">
          {prop.picture && (
            <Image
              src={prop.picture}
              height={150}
              width={150}
              alt="desire"
              className="rounded-md mr-5"
            />
          )}
          <div className="flex flex-col justify-between">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight line-clamp-1">
              {prop.title}
            </h3>
            <small className="text-sm font-normal line-clamp-4">
              {prop.description}
            </small>
            <div className="mt-2">
              {prop.tags.map((tag: string, index: number) => (
                <Badge className="mr-2" variant={"secondary"} key={index}>
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-3 items-baseline">
          <p className="text-sm">
            Looking for
            <b> {prop.price} Br</b>
          </p>
          <p className="text-sm">
            <b>{prop.wants}</b> want this
          </p>
          <p className="text-sm">
            <b>{prop.views}</b> views
          </p>
        </div>
      </Card>
    </Link>
  );
}

export default function DesireList({ params }: { params: IFilterParams }) {
  const [desireFetched, setDesireFetched] = React.useState<IDesireMeta>();

  React.useEffect(() => {
    if (params.sortBy !== "" && params.sortDir !== "") {
      fetchDesires().then((fetched) => {
        setDesireFetched(fetched);
      });
    }
  }, [params]);

  return (
    <>
      <div>
        {desireFetched?.result.map((desire: IDesire, index: number) => (
          <Desire prop={desire} key={index} />
        ))}
      </div>
      <div className="m-3">
        <Paginate
          itemCount={desireFetched?.meta.total ?? 0}
          perPage={desireFetched?.meta.perPage ?? 1}
        />
      </div>
    </>
  );
}
