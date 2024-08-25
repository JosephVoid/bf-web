"use client";

import { IOffer } from "@/lib/types";
import { Card } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import closedSVG from "@/public/closed.svg";
import { useTranslations } from "next-intl";

export function Offer({ prop }: { prop: IOffer }) {
  const current_path = usePathname();
  const t = useTranslations();

  return (
    <Link href={`${current_path}/${prop.id}`}>
      <Card className="p-4 mb-5 flex flex-col relative">
        <div
          className={`flex justify-start ${
            prop.isClosed ? "opacity-60" : "opacity-100"
          }`}
        >
          {prop.picture && (
            <Image
              src={prop.picture ?? ""}
              height={150}
              width={150}
              alt="desire"
              className="rounded-md mr-5"
            />
          )}
          <div className="flex flex-col justify-between">
            <div>
              <small className="text-sm font-normal line-clamp-6">
                {prop.description}
              </small>
            </div>
            <p className="text-sm">
              {t("SingleItems.offer-for")}
              <b> {prop.price} Br</b>
            </p>
          </div>
        </div>
        {prop.isClosed && (
          <div className="absolute right-2 top-2">
            <Image src={closedSVG} height={60} width={80} alt="closed" />
          </div>
        )}
      </Card>
    </Link>
  );
}
