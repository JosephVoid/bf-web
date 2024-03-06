"use client";

import { IOffer } from "@/lib/types";
import { Card } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { fetchOffers } from "@/lib/actions/fetch/offer.fetch";

export function Offer({ prop }: { prop: IOffer }) {
  const current_path = usePathname();
  return (
    <Link href={`${current_path}/0`}>
      <Card className="p-4 mb-5 flex flex-col">
        <div className="flex justify-start">
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
              Offering for
              <b> {prop.price} Br</b>
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default async function OfferList() {
  const offerList = await fetchOffers(0);
  return (
    <div>
      {offerList.map((offer: IOffer, index: number) => (
        <Offer key={index} prop={offer} />
      ))}
    </div>
  );
}
