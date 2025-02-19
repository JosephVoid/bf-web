import Link from "next/link";
import { Badge } from "./ui/badge";
import { Card, CardHeader } from "./ui/card";
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
import { useTranslations } from "next-intl";

export function Desire({ prop }: { prop: IDesire }) {
  const t = useTranslations();
  return (
    <Link
      href={`/${prop.id}-${encodeURIComponent(prop.title)}${
        prop.picture ? "1" : "0"
      }`}
    >
      <Card className="md:p-4 md:mb-5 md:flex md:flex-col hidden relative md:shadow-none">
        {prop.bounty && prop.bounty >= 10 && (
          <span className="text-xs absolute -top-4 right-3 bg-white rounded-sm p-2 border-[1px]">
            <b>{prop.bounty}Pts</b> {t("SingleItems.bounty")}
          </span>
        )}
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
            {t("SingleItems.for")}{" "}
            <b>
              {prop.minPrice === prop.maxPrice
                ? formatPrice(prop.minPrice)
                : `${formatPrice(prop.minPrice)} - ${formatPrice(
                    prop.maxPrice
                  )} Br${prop.metric}`}
            </b>
          </p>
          <p className="text-sm">
            <b>{prop.wants + 1}</b> {t("MainPage.want-this")}
          </p>
          <p className="text-sm">
            <b>{prop.views}</b> {t("MainPage.views")}
          </p>
        </div>
        {prop.isClosed && (
          <div className="absolute right-2 top-2">
            <Image src={closedSVG} height={60} width={80} alt="closed" />
          </div>
        )}
      </Card>
      {/* Mobile Verison */}
      <Card className="p-4 mb-5 flex flex-col md:hidden relative shadow-none">
        {prop.bounty && prop.bounty >= 10 && (
          <span className="text-xs absolute -top-3 right-3 bg-white rounded-sm p-2 border-[1px]">
            <b>{prop.bounty}Pts</b> {t("SingleItems.bounty")}
          </span>
        )}
        <div className="border-b-[1px] py-1 italic font-light opacity-85 mb-3 flex">
          <span>{t("SingleItems.someone-wants")}</span>
        </div>
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
              <b>{prop.wants + 1}</b> {t("MainPage.want-this")}
            </p>
            <p className="text-sm">
              <b>{prop.views}</b> {t("MainPage.views")}
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
          <Suspense
            fallback={
              <div className="flex justify-center h-screen my-20">
                <Loader dark large />
              </div>
            }
          >
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
