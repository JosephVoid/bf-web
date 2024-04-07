"use client";

import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { fetchSingleOffer } from "@/lib/actions/fetch/offer.fetch";
import { getTitle } from "@/lib/helpers";
import { IOffer } from "@/lib/types";
import { CheckIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { hasCookie } from "cookies-next";
import { LoginForm, SignUpForm } from "@/components/profile";
import { acceptOffer } from "@/lib/actions/act/offer.act";
import { useToast } from "@/components/ui/use-toast";

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

  React.useEffect(() => {
    fetchSingleOffer(current_path.split("/")[2]).then((result) => {
      if (result) setOffer(result);
      else setFound(false);
      setLoading(false);
    });
  }, []);

  function handleAcceptOnClick() {
    if (hasCookie("auth")) {
      acceptOffer("0", "0").then((result: boolean) => {
        if (result) {
          setAccepted(true);
          toast({
            title: (
              <div className="flex items-center">
                <CheckIcon className="mr-2" />
                <span className="first-letter:capitalize">
                  successfully updated ssid
                </span>
              </div>
            ),
            description: "description",
          });
        }
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
    </div>
  );
}
