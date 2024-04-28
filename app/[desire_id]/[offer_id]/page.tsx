import Loader from "@/components/loader";
import { fetchSingleOffer } from "@/lib/actions/fetch/offer.fetch";
import { getTitle } from "@/lib/helpers";
import { getUserId } from "@/lib/server-helpers";
import Image from "next/image";
import React from "react";
import { fetchUserActivity } from "@/lib/actions/fetch/user.fetch";
import OfferAcceptUserDetail from "@/components/offer-accept-btn";

export default async function SingleOffer({
  params,
}: {
  params: { desire_id: string; offer_id: string };
}) {
  const current_path = `/${params.desire_id}/${params.offer_id}`;
  const userId = await getUserId();

  const offer = await fetchSingleOffer(current_path.split("/")[2]);
  const accepted =
    userId && offer
      ? (await fetchUserActivity(userId, "accepted")).includes(offer.id)
      : false;

  return !offer ? (
    <Loader dark />
  ) : (
    <div className="flex flex-col">
      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
        {getTitle(current_path.split("/")[1])}
      </h2>
      <p className="mt-4 opacity-85">{offer?.bidder} offered:</p>
      <div className="flex mt-4">
        {offer?.picture && (
          <div className="w-1/2 h-fit rounded-md mr-4 mb-8">
            <Image
              src={offer.picture ?? ""}
              alt="Desire"
              fill={true}
              style={{ objectFit: "cover" }}
              className="rounded-md w-full !relative"
            />
          </div>
        )}
        <p className={`mb-4 ${offer?.picture ? `w-1/2` : ``}`}>
          {offer?.description}
        </p>
      </div>
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0 mb-4">
        For {offer?.price} Br
      </h2>
      <OfferAcceptUserDetail offer={offer} acceptedProp={accepted} />
    </div>
  );
}
