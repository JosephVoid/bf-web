"use client";

import Link from "next/link";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import Image from "next/image";
import { fetchDesires } from "@/lib/actions/fetch/desire.fetch";
import { IDesire, IDesireMeta, IFilterParams } from "@/lib/types";
import Paginate from "./paginate";
import React from "react";
import { ArchiveIcon } from "@radix-ui/react-icons";
import Loader from "./loader";

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
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (params.sortBy !== "" && params.sortDir !== "") {
      setIsLoading(true);
      fetchDesires(params).then((fetched) => {
        if (fetched) setDesireFetched(fetched);
        setIsLoading(false);
      });
    }
  }, [params]);

  return isLoading ? (
    <Loader dark />
  ) : desireFetched?.result.length! > 0 ? (
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
  ) : (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col items-center text-lg my-6 opacity-45">
          <ArchiveIcon width={40} height={40} className="mb-4" />
          No Desires
        </div>
      </div>
    </>
  );
}
