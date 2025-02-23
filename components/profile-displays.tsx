"use client";

import { Button } from "@/components/ui/button";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { AvatarIcon } from "@radix-ui/react-icons";
import { signOut } from "@/lib/actions/act/user.act";
import { hasCookie } from "cookies-next";
import { fetchUserProfile } from "@/lib/actions/fetch/user.fetch";
import { IUser } from "@/lib/types";
import { getUserId } from "@/lib/server-helpers";
import AuthDialogBtn from "./AuthDialogBtn";
import { useTranslations } from "next-intl";
import { Badge } from "./ui/badge";

const getBgStyle = (percent: number) => {
  if (percent > 50) return "hidden";
  else if (percent < 50 && percent > 10) return "text-black bg-slate-300";
  else if (percent < 10 && percent > 5)
    return "text-primary bg-yellow-200 font-extrabold";
  else if (percent < 5) return "text-white bg-primary font-bold";
  else "hidden";
};

export default function Profile() {
  /* These methods ensure that this component is rendered on the client 
    The components `<SignedInProfile /> & <UnSignedProfile />` will be rendered on hydration
  */
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
    <div>{hasCookie("auth") ? <SignedInProfile /> : <UnSignedProfile />}</div>
  ) : (
    <></>
  );
}

export function MobileProfile() {
  /* These methods ensure that this component is rendered on the client 
    The components `<SignedInProfile /> & <UnSignedProfile />` will be rendered on hydration
  */
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
    <div>
      {hasCookie("auth") ? (
        <MobileSignedInProfile />
      ) : (
        <UnSignedMobileProfile />
      )}
    </div>
  ) : (
    <></>
  );
}

export function UnSignedProfile() {
  const t = useTranslations();
  return (
    <div className="p-4 mb-3 flex flex-col relative justify-center items-center border-[1px] rounded-lg">
      <AvatarIcon height={50} width={50} className="m-4 opacity-50" />
      <div>
        <AuthDialogBtn afterAuthGoTo="/?sortby=Date&sortdir=Desc">
          <Button>{t("RightSide.sign-in")}</Button>
        </AuthDialogBtn>
      </div>
    </div>
  );
}

export function SignedInProfile() {
  const [user, setUser] = React.useState<IUser>();
  const t = useTranslations();
  async function handleSignOut() {
    await signOut();
  }

  React.useEffect(() => {
    getUserId().then((userId) => {
      fetchUserProfile(userId!).then((result) => {
        console.log(result);
        if (result) setUser(result);
      });
    });
  }, []);

  return (
    <div className="p-4 mb-1 flex flex-col relative justify-center items-center border-[1px] rounded-lg">
      {user?.picture && (
        <Image
          height={70}
          width={70}
          src={user?.picture}
          alt="prof pic"
          className="rounded-full mb-3"
        />
      )}
      {!user?.picture && (
        <AvatarIcon height={50} width={50} className="m-4 opacity-50" />
      )}
      <h3 className="text-xl text-wrap font-medium mb-3 text-center">{`${
        user?.first_name ?? ""
      } ${user?.last_name ?? ""}`}</h3>
      <p className="text-xs mb-3">
        {(user?.buyerScore ?? 0) + (user?.merchantScore ?? 0)} Pts{" "}
        <span
          className={`p-1 ${getBgStyle(
            user?.percentile ?? 100
          )} rounded-sm ml-2`}
        >
          Top {Math.ceil(user?.percentile ?? 100)}%
        </span>
      </p>
      <Link href={"/profile"}>
        <Button variant={"outline"} className="mb-3">
          {t("RightSide.profile")}
        </Button>
      </Link>
      <Button variant={"ghost"} onClick={handleSignOut}>
        <p className="text-sm opacity-70">{t("RightSide.sign-out")}</p>
      </Button>
    </div>
  );
}

export function SupportLink({
  onclick,
  text,
}: {
  onclick?: () => void;
  text: string;
}) {
  return (
    <div className="text-sm">
      <div onClick={onclick} className="flex justify-around cursor-pointer">
        <p>{text}</p>
        <FontAwesomeIcon icon={faArrowRight} className="w-[15px]" />
      </div>
    </div>
  );
}

function UnSignedMobileProfile() {
  const t = useTranslations();
  return (
    <div className="">
      <div>
        <AuthDialogBtn afterAuthGoTo="/?sortby=Date&sortdir=Desc">
          <Button variant={"outline"}>{t("RightSide.sign-in")}</Button>
        </AuthDialogBtn>
      </div>
    </div>
  );
}

function MobileSignedInProfile() {
  const [user, setUser] = React.useState<IUser>();

  React.useEffect(() => {
    getUserId().then((userId) => {
      fetchUserProfile(userId!).then((result) => {
        console.log(result);
        if (result) setUser(result);
      });
    });
  }, []);

  return (
    <div className="flex flex-row relative">
      <div className="absolute -top-2 -left-[3em] scale-75 flex flex-col">
        <Badge className={`w-fit ${getBgStyle(user?.percentile ?? 100)}`}>
          Top {Math.ceil(user?.percentile ?? 100)}% <br></br>{" "}
        </Badge>
        <Badge className="bg-white text-black text-xs rounded-sm flex justify-center">
          {(user?.buyerScore ?? 0) + (user?.merchantScore ?? 0)} Pts
        </Badge>
      </div>
      <div>
        <Link href={"/profile"}>
          {user?.picture && (
            <Image
              height={50}
              width={50}
              src={user?.picture}
              alt="prof pic"
              className="rounded-full"
            />
          )}
          {!user?.picture && (
            <AvatarIcon height={50} width={50} className="m-4 opacity-50" />
          )}
        </Link>
      </div>
    </div>
  );
}
