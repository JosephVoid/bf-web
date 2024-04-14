"use client";

import { ArrowLeftIcon, AvatarIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Logo from "./logo";
import Image from "next/image";
import React from "react";
import { hasCookie } from "cookies-next";
import { LoginForm, MobileProfile, SignUpForm } from "./profile";

export default function Header() {
  const current_path = usePathname();
  const router = useRouter();
  const [modalState, setModalState] = React.useState<boolean>(false);
  const [viewState, setViewState] = React.useState<"SIGNIN" | "SIGNUP">(
    "SIGNIN"
  );

  function getHeader() {
    if (current_path.split("/")[1] === "profile") return "Profile";
    else if (current_path.split("/")[1] === "search") return "Search";
    else if (current_path.split("/")[2] === "make-an-offer") return "Offer";
    else if (
      current_path.split("/")[2] !== "make-an-offer" &&
      current_path.split("/")[2] !== undefined
    )
      return "Offers";
    else return "Desires";
  }

  function goBack() {
    let backPath = current_path.split("/");
    if (backPath.length >= 2 && backPath[1] !== "") {
      backPath.pop();
      router.replace(`/${backPath.join("")}`);
    }
  }

  function handleOnClick() {
    if (hasCookie("auth")) router.push(`/profile`);
  }

  return (
    <>
      <div className="md:ml-6 md:flex md:items-center hidden">
        {current_path.split("/").length >= 2 &&
          current_path.split("/")[1] !== "" && (
            <ArrowLeftIcon
              width={40}
              className="scale-150 -translate-x-3 cursor-pointer"
              onClick={goBack}
            />
          )}
        <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl text-center">
          {getHeader()}
        </h1>
      </div>
      {/* Mobile Version */}
      <div className="flex flex-col items-center md:hidden">
        <div className="flex justify-start w-full px-3 pt-3">
          <Logo />
        </div>
        <div className="flex w-full px-3 pt-3 justify-between">
          <div className="flex justify-start items-center">
            {current_path.split("/").length >= 2 &&
              current_path.split("/")[1] !== "" && (
                <ArrowLeftIcon
                  width={40}
                  className="scale-150 -translate-x-3 cursor-pointer"
                  onClick={goBack}
                />
              )}
            <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl text-center">
              {getHeader()}
            </h1>
          </div>
          <MobileProfile />
        </div>
      </div>
    </>
  );
}
