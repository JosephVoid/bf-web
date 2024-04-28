import OfferList from "@/components/offer-list";
import { fetchSingleDesire } from "@/lib/actions/fetch/desire.fetch";
import { ClockIcon, PersonIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Suspense } from "react";
import { getUUID, getUserId } from "@/lib/helpers";
import { fetchUserActivity } from "@/lib/actions/fetch/user.fetch";
import { viewItem } from "@/lib/actions/act/user.act";
import AcceptAlertComp from "@/components/accept-alert-comp";
import { redirect } from "next/navigation";
import { fetchOffers } from "@/lib/actions/fetch/offer.fetch";
import Loader from "@/components/loader";

export default async function SingleDesire({
  params,
}: {
  params: { desire_id: string };
}) {
  const current_path = params.desire_id;
  const userId = getUserId();
  const desire = await fetchSingleDesire(getUUID(current_path));
  const offerAct = userId ? await fetchUserActivity(userId, "offered") : [];
  const desirePosted = userId
    ? await fetchUserActivity(userId, "posted-desire")
    : [];
  const wantAct = userId ? await fetchUserActivity(userId ?? "", "wanted") : [];
  const offers = await fetchOffers(desire?.id ?? "");

  if (userId && desire) viewItem(desire.id, userId);

  if (current_path.length === 36 && desire) {
    redirect(`/${desire?.id}-${encodeURIComponent(desire?.title ?? "")}`);
  }

  return (
    <div className="flex flex-col">
      {!desire ? (
        <>
          Desire Not Found <Link href={"/"}>Go Back</Link>
        </>
      ) : (
        <>
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
            {desire?.title}
          </h2>
          <div className="my-4 flex justify-between opacity-80">
            <p className="text-sm flex items-center">
              <ClockIcon className="mr-1" /> Posted on{" "}
              {new Date(desire?.postedOn ?? "").toLocaleDateString()}
            </p>
            <p className="text-sm flex items-center">
              <PersonIcon className="mr-1" /> {desire?.wants} want this
            </p>
            <p className="text-sm flex items-center">
              <EyeOpenIcon className="mr-1" /> {desire?.views} viewed this
            </p>
          </div>
          <div className="flex flex-col">
            {desire?.picture && (
              <div className="w-full h-fit rounded-md mr-4 mb-8">
                <Image
                  src={desire?.picture ?? ""}
                  alt="Desire"
                  fill={true}
                  style={{ objectFit: "cover" }}
                  className="rounded-md w-full !relative"
                />
              </div>
            )}
            <p className="mb-4">{desire?.description}</p>
            <div className="flex items-baseline mb-6">
              Looking for
              <h3 className="scroll-m-20 text-2xl font-medium tracking-tight first:mt-0 ml-2">
                {desire?.price} Br
              </h3>
            </div>

            <AcceptAlertComp
              desire={desire}
              desirePosted={desirePosted}
              offerAct={offerAct}
              wantAct={wantAct}
            />

            <div className="mt-4">
              <h3 className="scroll-m-20 text-2xl font-medium tracking-tight first:mt-0 mb-4">
                Offers
              </h3>
              <Suspense fallback={<Loader dark />}>
                <OfferList offerList={offers} />
              </Suspense>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
