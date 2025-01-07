import OfferList from "@/components/offer-list";
import { fetchSingleDesire } from "@/lib/actions/fetch/desire.fetch";
import {
  ClockIcon,
  PersonIcon,
  EyeOpenIcon,
  Pencil1Icon,
  TrashIcon,
  CheckIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Suspense } from "react";
import { formatPrice, getPublicUrl, getUUID } from "@/lib/helpers";
import { fetchUserActivity } from "@/lib/actions/fetch/user.fetch";
import { viewItem } from "@/lib/actions/act/user.act";
import AcceptAlertComp from "@/components/accept-alert-comp";
import { redirect } from "next/navigation";
import { fetchOffers } from "@/lib/actions/fetch/offer.fetch";
import Loader from "@/components/loader";
import { getUserId } from "@/lib/server-helpers";
import type { Metadata, ResolvingMetadata } from "next";
import { Button } from "@/components/ui/button";
import ConfDialogBtn from "@/components/ConfirmDialogBtn";
import { closeDesire } from "@/lib/actions/act/desire.act";
import { APIResponse } from "@/lib/types";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: { desire_id: string };
}): Promise<Metadata> {
  const current_path = params.desire_id;
  const desire = await fetchSingleDesire(getUUID(current_path));

  return {
    metadataBase: new URL("https://buyersfirst.et"),
    title: desire?.title,
    description: desire?.description,
    keywords: [
      "Buyers",
      "Sellers",
      "Ethiopia",
      "Addis Ababa",
      "Ecommerce",
      "Shopping",
      "Offers",
      "Deals",
    ],
    openGraph: {
      title: desire?.title,
      description: desire?.description,
      images: getPublicUrl(desire?.picture),
      url: "https://buyersfirst.et",
      siteName: "Buyers First",
    },
  };
}

export default async function SingleDesire({
  params,
}: {
  params: { desire_id: string };
}) {
  const t = await getTranslations();
  const current_path = params.desire_id;
  const userId = await getUserId();
  const desire = await fetchSingleDesire(getUUID(current_path));
  const offerAct = userId
    ? await fetchUserActivity(userId, "offered-to-desire")
    : [];
  const desirePosted = userId
    ? await fetchUserActivity(userId, "posted-desire")
    : [];
  const wantAct = userId ? await fetchUserActivity(userId ?? "", "wanted") : [];
  const offers = await fetchOffers(desire?.id ?? "");

  if (userId && desire) viewItem(desire.id);

  if (current_path.length === 36 && desire) {
    redirect(`/${desire?.id}-${encodeURIComponent(desire?.title ?? "")}`);
  }

  async function onClose() {
    "use server";
    return await closeDesire(desire?.id!);
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
          {desire.isClosed && (
            <p className="w-min bg-red-700 font-bold text-white p-2 my-2">
              CLOSED
            </p>
          )}
          <div className="my-4 flex justify-between opacity-80">
            <p className="text-sm flex items-center">
              <ClockIcon className="mr-1" /> {t("SingleItems.posted-on")}{" "}
              {new Date(desire?.postedOn ?? "").toLocaleDateString()}
            </p>
            <p className="text-sm flex items-center">
              <PersonIcon className="mr-1" /> {desire?.wants + 1}{" "}
              {t("SingleItems.want-this")}
            </p>
            <p className="text-sm flex items-center">
              <EyeOpenIcon className="mr-1" /> {desire?.views}{" "}
              {t("SingleItems.viewd-this")}
            </p>
          </div>
          {userId === desire.userPostedId && !desire.isClosed && (
            <div className="mb-4 flex justify-between opacity-80">
              <Link href={`/post-a-desire?mode=edit&id=${desire.id}`}>
                <Button variant={"ghost"} size={"sm"}>
                  <Pencil1Icon className="mr-1" />
                  {t("SingleItems.edit")}
                </Button>
              </Link>
              <ConfDialogBtn
                context="Desire"
                afterOk={onClose}
                title="Are you sure you want to close this desire?"
                subheading="You will not receive offers and they can not be reopened once they have been closed"
                type="danger"
              >
                <Button variant={"ghost"} size={"sm"} className="text-red-700">
                  <TrashIcon className="mr-1 text-red-700" />
                  {t("SingleItems.close-desire")}
                </Button>
              </ConfDialogBtn>
            </div>
          )}
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
              {t("SingleItems.looking-for")}
              <h3 className="scroll-m-20 text-2xl font-medium tracking-tight first:mt-0 ml-2">
                {desire.minPrice === desire.maxPrice
                  ? formatPrice(desire.minPrice) + " Br"
                  : `${formatPrice(desire.minPrice)} - ${formatPrice(
                      desire.maxPrice
                    )} Br ${desire.metric === "None" ? "" : desire.metric}`}
              </h3>
            </div>
            {!desire.isClosed && (
              <AcceptAlertComp
                desire={desire}
                desirePosted={desirePosted}
                offerAct={offerAct}
                wantAct={wantAct}
              />
            )}
            <div className="mt-4">
              <h3 className="scroll-m-20 text-2xl font-medium tracking-tight first:mt-0 mb-4">
                {t("SingleItems.offers")}
              </h3>
              <Suspense
                fallback={
                  <div className="flex justify-center h-screen my-20">
                    <Loader dark large />
                  </div>
                }
              >
                <OfferList offerList={offers} />
              </Suspense>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
