"use server";

import { fetchOffers, fetchUserOffers } from "@/lib/actions/fetch/offer.fetch";
import { Offer } from "./offer-list";
import { IOffer } from "@/lib/types";
import { getUserFromTokenId } from "@/lib/helpers";
import { cookies } from "next/headers";
import { ArchiveIcon } from "@radix-ui/react-icons";

export default async function UserOfferList() {
  const userId = getUserFromTokenId(cookies().get("auth")?.value ?? "");
  const offerList = await fetchUserOffers(userId!);
  return (
    <div>
      <h2 className="text-2xl font-medium mb-3">You Offered</h2>
      {offerList.length < 1 && (
        <div className="flex justify-center">
          <div className="flex flex-col items-center text-lg my-6 opacity-45">
            <ArchiveIcon width={40} height={40} className="mb-4" />
            No Offers
          </div>
        </div>
      )}
      {offerList.map((offer: IOffer, index) => (
        <Offer key={index} prop={offer} />
      ))}
    </div>
  );
}
