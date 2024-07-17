"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { hasCookie } from "cookies-next";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { CheckIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { LoginForm, SignUpForm } from "./profile";
import { useToast } from "@/components/ui/use-toast";
import { acceptOffer } from "@/lib/actions/act/offer.act";
import { IOffer } from "@/lib/types";
import AuthDialogBtn from "./AuthDialogBtn";

export default function OfferAcceptUserDetail({
  offer,
  acceptedProp,
}: {
  offer?: IOffer;
  acceptedProp: boolean;
}) {
  const [modalState, setModalState] = React.useState<boolean>(false);
  const [viewState, setViewState] = React.useState<"SIGNIN" | "SIGNUP">(
    "SIGNIN"
  );
  const [accepted, setAccepted] = React.useState(acceptedProp);
  const { toast } = useToast();

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
  return (
    <>
      <AuthDialogBtn>
        <div className="flex justify-between mb-4">
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
        </div>
      </AuthDialogBtn>
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
    </>
  );
}
