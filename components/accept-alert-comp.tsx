"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { hasCookie } from "cookies-next";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { LoginForm, SignUpForm } from "./profile-forms";
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
import { useTranslations } from "next-intl";

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
  const t = useTranslations();

  async function handleWantOnClick() {
    if (desirePosted.includes(desire?.id!)) return null;
    if (hasCookie("auth") && !wanted) {
      const response = await wantDesire(desire?.id ?? "");
      if (response.result) setWanted(true);

      toast({
        title: (
          <div className="flex items-center">
            {response.result && (
              <>
                <CheckIcon className="mr-2" />
                <span className="first-letter:capitalize">
                  You will be Alerted on Offers
                </span>
              </>
            )}
            {!response.result && (
              <>
                <ExclamationTriangleIcon className="mr-2" />
                <span className="first-letter:capitalize">
                  {response.message}
                </span>
              </>
            )}
          </div>
        ),
      });
    } else if (hasCookie("auth") && wanted) {
      const response = await unWantDesire(desire?.id ?? "");
      if (response.result) setWanted(false);

      toast({
        title: (
          <div className="flex items-center">
            {response.result && (
              <>
                <CheckIcon className="mr-2" />
                <span className="first-letter:capitalize">
                  You won't be Alerted on Offers
                </span>
              </>
            )}
            {!response.result && (
              <>
                <ExclamationTriangleIcon className="mr-2" />
                <span className="first-letter:capitalize">
                  {response.message}
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
            <>{t("SingleItems.dont-alert-me")}</>
          ) : (
            <>
              <BellIcon className="mr-1" />
              {t("SingleItems.alert-me")}
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
            {t("SingleItems.make-an-offer")}
          </Button>
        </div>
      </AuthDialogBtn>
    </div>
  );
}
