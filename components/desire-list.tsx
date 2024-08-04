import Link from "next/link";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import Image from "next/image";
import { fetchDesires } from "@/lib/actions/fetch/desire.fetch";
import { IDesire, IFilterParams } from "@/lib/types";
import Paginate from "./paginate";
import React, { Suspense } from "react";
import { ArchiveIcon } from "@radix-ui/react-icons";
import Search from "./search";
import Loader from "./loader";
import { formatPrice } from "@/lib/helpers";
import closedSVG from "@/public/closed.svg";

export function Desire({ prop }: { prop: IDesire }) {
  return (
    <Link href={`/${prop.id}-${encodeURIComponent(prop.title)}`}>
      <Card className="md:p-4 md:mb-5 md:flex md:flex-col hidden relative">
        <div
          className={`flex justify-start ${
            prop.isClosed ? "opacity-60" : "opacity-100"
          }`}
        >
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
        <div
          className={`flex justify-between mt-3 items-baseline ${
            prop.isClosed ? "opacity-60" : "opacity-100"
          }`}
        >
          <p className="text-sm">
            For{" "}
            <b>
              {prop.minPrice === prop.maxPrice
                ? formatPrice(prop.minPrice)
                : `${formatPrice(prop.minPrice)} - ${formatPrice(
                    prop.maxPrice
                  )} Br${prop.metric}`}
            </b>
          </p>
          <p className="text-sm">
            <b>{prop.wants + 1}</b> want this
          </p>
          <p className="text-sm">
            <b>{prop.views}</b> views
          </p>
        </div>
        {prop.isClosed && (
          <div className="absolute right-2 top-2">
            <Image src={closedSVG} height={60} width={80} alt="closed" />
          </div>
        )}
      </Card>
      {/* Mobile Verison */}
      <Card className="p-4 mb-5 flex flex-col md:hidden relative">
        <div className={prop.isClosed ? "opacity-60" : "opacity-100"}>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight line-clamp-2 leading-6 mb-3">
            {prop.title}
          </h3>
          {prop.picture && (
            <div className="flex justify-start relative w-full h-[250px] mb-3">
              <Image
                src={prop.picture}
                alt="desire"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-md mr-5"
              />
            </div>
          )}
          <div className="flex flex-col justify-between mb-3">
            <div className="mt-2">
              {prop.tags.map((tag: string, index: number) => (
                <Badge className="mr-2" variant={"secondary"} key={index}>
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <small className="text-sm font-normal line-clamp-4">
            {prop.description}
          </small>
          <div className="flex justify-between mt-3 items-baseline">
            <p className="text-sm flex flex-col">
              <b>
                {prop.minPrice === prop.maxPrice
                  ? formatPrice(prop.minPrice)
                  : `${formatPrice(prop.minPrice)} - ${formatPrice(
                      prop.maxPrice
                    )}`}
              </b>
              <b>Br{prop.metric}</b>
            </p>
            <p className="text-sm">
              <b>{prop.wants + 1}</b> wants
            </p>
            <p className="text-sm">
              <b>{prop.views}</b> views
            </p>
          </div>
        </div>
        {prop.isClosed && (
          <div className="absolute right-2 top-2">
            <Image src={closedSVG} height={60} width={100} alt="closed" />
          </div>
        )}
      </Card>
    </Link>
  );
}

export default async function DesireList({
  params,
}: {
  params: IFilterParams;
}) {
  const desireFetched = await fetchDesires(params);
  return desireFetched?.result.length! > 0 ? (
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
        <div className="md:hidden">
          <Suspense fallback={<Loader dark />}>
            <Search />
          </Suspense>
        </div>
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
