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
import AuthDialogBtn from "./AuthDialogBtn";

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
    <div className="flex justify-between mb-4">
      <AuthDialogBtn>
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
      </AuthDialogBtn>
      <AuthDialogBtn afterAuthGoTo="/make-an-offer">
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
      </AuthDialogBtn>
    </div>
  );
}
