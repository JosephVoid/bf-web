"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { hasCookie } from "cookies-next";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { LoginForm, SignUpForm } from "./profile";
import { useToast } from "@/components/ui/use-toast";
import {
  BellIcon,
  CheckIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";
import { unWantDesire, wantDesire } from "@/lib/actions/act/desire.act";
import { usePathname, useRouter } from "next/navigation";
import { IDesire } from "@/lib/types";

interface IProps {
  desire?: IDesire;
  offerAct: string[];
  desirePosted: string[];
  wantAct: string[];
}

export default function AcceptAlertComp({
  desire,
  offerAct,
  desirePosted,
  wantAct,
}: IProps) {
  const [viewState, setViewState] = React.useState<"SIGNIN" | "SIGNUP">(
    "SIGNIN"
  );
  const [modalState, setModalState] = React.useState<boolean>(false);
  const { toast } = useToast();
  const [wanted, setWanted] = React.useState(wantAct.includes(desire?.id!));
  const router = useRouter();
  const current_path = usePathname();

  async function handleWantOnClick() {
    if (desirePosted.includes(desire?.id!)) return null;
    if (hasCookie("auth") && !wanted) {
      const result = await wantDesire(desire?.id ?? "");
      if (result) setWanted(true);

      toast({
        title: (
          <div className="flex items-center">
            {result && (
              <>
                <CheckIcon className="mr-2" />
                <span className="first-letter:capitalize">
                  You will be Alerted on Offers
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
    } else if (hasCookie("auth") && wanted) {
      const result = await unWantDesire(desire?.id ?? "");
      if (result) setWanted(false);

      toast({
        title: (
          <div className="flex items-center">
            {result && (
              <>
                <CheckIcon className="mr-2" />
                <span className="first-letter:capitalize">
                  You won't be Alerted on Offers
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
    }
  }

  function handleOfferOnClick() {
    if (offerAct.includes(desire?.id!) || desirePosted.includes(desire?.id!))
      return null;
    if (hasCookie("auth")) router.push(`${current_path}/make-an-offer`);
  }

  return (
    <>
      <Dialog open={modalState} onOpenChange={setModalState}>
        <div className="flex justify-between mb-4">
          <DialogTrigger
            asChild
            onClick={(e) =>
              hasCookie("auth") ? e.preventDefault() : setModalState(true)
            }
          >
            <Button
              variant={"secondary"}
              onClick={handleWantOnClick}
              disabled={desirePosted.includes(desire?.id!)}
            >
              {wanted ? (
                <>Don't Alert Me</>
              ) : (
                <>
                  <BellIcon className="mr-1" />
                  Alert Me
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
              <Button
                disabled={
                  offerAct.includes(desire?.id!) ||
                  desirePosted.includes(desire?.id!)
                }
              >
                Make an Offer
              </Button>
            </div>
          </DialogTrigger>
        </div>
        <DialogContent
          className="md:max-w-[825px] flex h-fit md:w-1/2 w-5/6"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="w-1/2 relative md:block hidden">
            <Image
              src="/stock-min.jpg"
              alt="login"
              fill={true}
              style={{ objectFit: "cover" }}
              className="rounded-md"
            />
          </div>
          <div className="md:w-1/2 w-full flex flex-col justify-between p-2">
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
    </>
  );
}
