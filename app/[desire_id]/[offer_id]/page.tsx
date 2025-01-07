import Loader from "@/components/loader";
import { fetchSingleOffer } from "@/lib/actions/fetch/offer.fetch";
import { getTitle, getUUID } from "@/lib/helpers";
import { getUserId } from "@/lib/server-helpers";
import Image from "next/image";
import React from "react";
import { fetchUserActivity } from "@/lib/actions/fetch/user.fetch";
import OfferAcceptUserDetail from "@/components/offer-accept-btn";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import ConfDialogBtn from "@/components/ConfirmDialogBtn";
import { closeOffer } from "@/lib/actions/act/offer.act";
import { getTranslations } from "next-intl/server";
import CommentBlock from "@/components/comment-block";

export default async function SingleOffer({
  params,
}: {
  params: { desire_id: string; offer_id: string };
}) {
  const t = await getTranslations();
  const current_path = `/${params.desire_id}/${params.offer_id}`;
  const userId = await getUserId();
  const desire_id_only = getUUID(params.desire_id);
  const offer = await fetchSingleOffer(current_path.split("/")[2]);
  const accepted =
    userId && offer
      ? (await fetchUserActivity(userId, "accepted")).includes(offer.id)
      : false;
  const offered =
    userId && offer
      ? (await fetchUserActivity(userId, "bid-offered")).includes(offer.id)
      : false;
  async function onClose() {
    "use server";
    return await closeOffer(offer?.id!);
  }
  return !offer ? (
    <div className="flex justify-center h-screen my-20">
      <Loader dark large />
    </div>
  ) : (
    <div className="flex flex-col">
      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
        {getTitle(current_path.split("/")[1])}
      </h2>
      {offer.isClosed && (
        <p className="w-min bg-red-700 font-bold text-white p-2 my-2">CLOSED</p>
      )}
      <p className="mt-4 opacity-85">
        {offer?.bidder} {t("SingleItems.offered")}:
      </p>
      {userId === offer.bidder_id && !offer.isClosed && (
        <div className="my-4 flex justify-between opacity-80">
          <Link
            href={`/${params.desire_id}/make-an-offer?mode=edit&offer_id=${offer.id}&desire_id=${desire_id_only}`}
          >
            <Button variant={"ghost"} size={"sm"}>
              <Pencil1Icon className="mr-1" />
              {t("SingleItems.edit")}
            </Button>
          </Link>
          <ConfDialogBtn
            context="Offer"
            afterOk={onClose}
            title="Are you sure you want to close this offer?"
            subheading="Your offer will not be accepted by anyone and they can not be reopened once they have been closed"
            type="danger"
          >
            <Button variant={"ghost"} size={"sm"} className="text-red-700">
              <TrashIcon className="mr-1 text-red-700" />
              {t("SingleItems.close-offer")}
            </Button>
          </ConfDialogBtn>
        </div>
      )}
      <div className="flex flex-col mt-4 w-full">
        {offer?.picture && (
          <div className="h-fit rounded-md mr-4 mb-8">
            <Image
              src={offer.picture ?? ""}
              alt="Desire"
              fill={true}
              style={{ objectFit: "cover" }}
              className="rounded-md w-full !relative"
            />
          </div>
        )}
        <p className={`mb-4`}>{offer?.description}</p>
      </div>
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0 mb-4">
        {t("SingleItems.offer-for")} {offer?.price} Br
      </h2>
      <CommentBlock entity_id={offer.id} />
      {!offer.isClosed && (
        <OfferAcceptUserDetail
          offer={offer}
          acceptedProp={accepted}
          offeredProp={offered}
        />
      )}
    </div>
  );
}
