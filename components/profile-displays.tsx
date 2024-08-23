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
  return (
    <div className="p-4 mb-3 flex flex-col relative justify-center items-center border-[1px] rounded-lg">
      <AvatarIcon height={50} width={50} className="m-4 opacity-50" />
      <div>
        <AuthDialogBtn afterAuthGoTo="/?sortby=Date&sortdir=Desc">
          <Button>Sign In</Button>
        </AuthDialogBtn>
      </div>
    </div>
  );
}

export function SignedInProfile() {
  const [user, setUser] = React.useState<IUser>();
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
      <Link href={"/profile"}>
        <Button variant={"outline"} className="mb-3">
          Profile
        </Button>
      </Link>
      <Button variant={"ghost"} onClick={handleSignOut}>
        <p className="text-sm opacity-70">Sign Out</p>
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
  return (
    <div className="">
      <div>
        <AuthDialogBtn afterAuthGoTo="/?sortby=Date&sortdir=Desc">
          <Button variant={"outline"}>Sign In</Button>
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
    <div className="">
      <Link href={"/profile"}>
        {user?.picture && (
          <Image
            height={30}
            width={30}
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
  );
}
