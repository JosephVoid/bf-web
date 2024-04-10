"use client";

import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { fetchSingleOffer } from "@/lib/actions/fetch/offer.fetch";
import { getTitle, getUserId } from "@/lib/helpers";
import { IOffer, IUser } from "@/lib/types";
import { CheckIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { hasCookie } from "cookies-next";
import { LoginForm, SignUpForm } from "@/components/profile";
import { acceptOffer } from "@/lib/actions/act/offer.act";
import { useToast } from "@/components/ui/use-toast";
import {
  fetchUserActivity,
  fetchUserProfile,
} from "@/lib/actions/fetch/user.fetch";

export default function SingleOffer() {
  const [offer, setOffer] = React.useState<IOffer>();
  const [loading, setLoading] = React.useState(true);
  const [found, setFound] = React.useState(true);
  const [modalState, setModalState] = React.useState<boolean>(false);
  const [accepted, setAccepted] = React.useState(false);
  const [viewState, setViewState] = React.useState<"SIGNIN" | "SIGNUP">(
    "SIGNIN"
  );
  const current_path = usePathname();
  const { toast } = useToast();

  React.useLayoutEffect(() => {
    fetchSingleOffer(current_path.split("/")[2]).then((offer_result) => {
      if (offer_result) setOffer(offer_result);
      else setFound(false);

      const userId = getUserId();

      if (userId && offer_result) {
        fetchUserActivity(userId, "accepted").then((result) => {
          if (result.includes(offer_result?.id)) setAccepted(true);
        });
      }

      setLoading(false);
    });
  }, []);

  function handleAcceptOnClick() {
    if (hasCookie("auth") && offer?.id && !accepted) {
      acceptOffer(offer?.id).then((result: boolean) => {
        if (result) setAccepted(true);

        toast({
          title: (
            <div className="flex items-center">
              {result && (
                <>
                  <CheckIcon className="mr-2" />
                  <span className="first-letter:capitalize">
                    Offer Accepted
                  </span>
                </>
              )}
              {!result && (
                <>
                  <ExclamationTriangleIcon className="mr-2" />
                  <span className="first-letter:capitalize">
                    Error Encounterd
                  </span>
                </>
              )}
            </div>
          ),
        });
      });
    }
  }

  return loading ? (
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
              objectFit="cover"
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
      <Dialog open={modalState} onOpenChange={setModalState}>
        <div className="flex justify-between mb-4">
          <DialogTrigger
            asChild
            onClick={(e) =>
              hasCookie("auth") ? e.preventDefault() : setModalState(true)
            }
          >
            <Button
              onClick={handleAcceptOnClick}
              variant={accepted ? "secondary" : "default"}
              disabled={accepted}
            >
              {accepted ? (
                <>
                  <CheckIcon className="mr-1" />
                  Accepted
                </>
              ) : (
                <>Accept the Offer</>
              )}
            </Button>
          </DialogTrigger>
        </div>
        <DialogContent
          className="sm:max-w-[825px] flex h-fit w-1/2"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <div className="w-1/2 relative">
            <Image
              src="/black_box.png"
              alt="login"
              fill={true}
              objectFit="cover"
              className="rounded-md"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-between p-2">
            {viewState === "SIGNIN" && (
              <LoginForm
                onSignUpSwitch={() => setViewState("SIGNUP")}
                onComplete={() => setModalState(false)}
              />
            )}
            {viewState === "SIGNUP" && (
              <SignUpForm
                onSignInSwitch={() => setViewState("SIGNIN")}
                onComplete={() => setModalState(false)}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
      {accepted && (
        <>
          <p className="mb-2 opacity-70 italic">
            Contact {offer?.bidder} with the below details, to get your item
          </p>
          <div className="flex bg-slate-100 p-3 rounded-md outline outline-slate-400 outline-1 mb-4">
            {offer?.bidder_picture && (
              <div>
                <Image
                  src={offer?.bidder_picture}
                  height={100}
                  width={100}
                  alt="desire"
                  className="rounded-md mr-5"
                />
              </div>
            )}
            <div className="flex flex-col">
              <p className="font-bold">{offer?.bidder}</p>
              <p>Phone: {offer?.bidder_phone}</p>
              <p>Email: {offer?.bidder_email}</p>
              <p>{offer?.bidder_description}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
