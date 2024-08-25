"use client";

import { ArrowLeftIcon, AvatarIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Logo from "./logo";
import Image from "next/image";
import React from "react";
import { MobileProfile } from "./profile-displays";
import LangOption from "./LangOption";
import { useTranslations } from "next-intl";

export default function Header() {
  const current_path = usePathname();
  const router = useRouter();
  const t = useTranslations();

  function getHeader() {
    if (current_path.split("/")[1] === "profile") return "Headers.profile";
    else if (current_path.split("/")[1] === "search")
      return "Headers.search-res";
    else if (current_path.split("/")[2] === "make-an-offer")
      return "Headers.offer";
    else if (
      current_path.split("/")[2] !== "make-an-offer" &&
      current_path.split("/")[2] !== undefined
    )
      return "Headers.offers";
    else return "Headers.desires";
  }

  function goBack() {
    let backPath = current_path.split("/");
    if (backPath.length >= 2 && backPath[1] !== "") {
      backPath.pop();
      router.replace(`/${backPath.join("")}`);
    }
  }

  return (
    <>
      <div className="flex justify-between md:mr-6 items-baseline">
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
            {t(getHeader())}
          </h1>
        </div>
        <div className="hidden md:flex">
          <LangOption />
        </div>
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
              {t(getHeader())}
            </h1>
          </div>
          <MobileProfile />
        </div>
      </div>
    </>
  );
}
