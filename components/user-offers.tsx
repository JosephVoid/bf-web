"use server";

import { fetchOffers, fetchUserOffers } from "@/lib/actions/fetch/offer.fetch";
import { Offer } from "./offer-list";
import { IOffer } from "@/lib/types";
import { getUserFromTokenId } from "@/lib/helpers";
import { cookies } from "next/headers";

export default async function UserOfferList() {
  const userId = getUserFromTokenId(cookies().get("auth")?.value ?? "");
  const offerList = await fetchUserOffers(userId!);
  return (
    <div>
      <h2 className="text-2xl font-medium mb-3">You Offered</h2>
      {offerList.map((offer: IOffer, index) => (
        <Offer key={index} prop={offer} />
      ))}
    </div>
  );
}
