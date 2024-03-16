"use client";

import OfferList from "@/components/offer-list";
import { Button } from "@/components/ui/button";
import { fetchSingleDesire } from "@/lib/actions/fetch/desire.fetch";
import { IDesire } from "@/lib/types";
import {
  ClockIcon,
  PersonIcon,
  EyeOpenIcon,
  HandIcon,
  CheckIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Suspense } from "react";
import Loader from "@/components/loader";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { hasCookie } from "cookies-next";
import { LoginForm, SignUpForm } from "@/components/profile";
import { unWantDesire, wantDesire } from "@/lib/actions/act/desire.act";
import { getUUID } from "@/lib/helpers";

export default function SingleDesire() {
  const current_path = usePathname();
  const [desire, setDesire] = React.useState<IDesire>();
  const [loading, setLoading] = React.useState(true);
  const [found, setFound] = React.useState(true);
  const [wanted, setWanted] = React.useState(false);
  const [viewState, setViewState] = React.useState<"SIGNIN" | "SIGNUP">(
    "SIGNIN"
  );
  const [modalState, setModalState] = React.useState<boolean>(false);
  const router = useRouter();

  function handleWantOnClick() {
    if (hasCookie("auth") && !wanted) {
      wantDesire("user", desire?.id ?? "").then((result) => {
        if (result) setWanted(true);
      });
    } else if (hasCookie("auth") && wanted) {
      unWantDesire("user", desire?.id ?? "").then((result) => {
        if (result) setWanted(false);
      });
    }
  }

  function handleOfferOnClick() {
    if (hasCookie("auth")) router.push(`${current_path}/make-an-offer`);
  }

  React.useEffect(() => {
    fetchSingleDesire(getUUID(current_path.split("/")[1])).then((result) => {
      if (result) setDesire(result);
      else setFound(false);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <Loader dark />
  ) : (
    <div className="flex flex-col">
      {!found ? (
        <>
          Desire Not Found <Link href={"/"}>Go Back</Link>
        </>
      ) : (
        <>
          {" "}
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
            {desire?.title}
          </h2>
          <div className="my-4 flex justify-between opacity-80">
            <p className="text-sm flex items-center">
              <ClockIcon className="mr-1" /> Posted on{" "}
              {new Date(desire?.posted_on ?? "").toLocaleDateString()}
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
                  objectFit="cover"
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
            <Dialog open={modalState} onOpenChange={setModalState}>
              <div className="flex justify-between mb-4">
                <DialogTrigger
                  asChild
                  onClick={(e) =>
                    hasCookie("auth") ? e.preventDefault() : setModalState(true)
                  }
                >
                  <Button variant={"ghost"} onClick={handleWantOnClick}>
                    {wanted ? (
                      <>
                        <CheckIcon className="mr-1" />
                        You'll be Alerted
                      </>
                    ) : (
                      <>
                        <HandIcon className="mr-1" />I want this
                      </>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogTrigger
                  asChild
                  onClick={(e) =>
                    hasCookie("auth") ? e.preventDefault() : setModalState(true)
                  }
                >
                  <div onClick={handleOfferOnClick}>
                    <Button>Make an Offer</Button>
                  </div>
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
            <div className="mt-4">
              <h3 className="scroll-m-20 text-2xl font-medium tracking-tight first:mt-0 mb-4">
                Offers
              </h3>
              <Suspense fallback={<>Loading</>}>
                <OfferList />
              </Suspense>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
