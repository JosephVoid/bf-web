"use client";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { hasCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React from "react";
import Image from "next/image";
import { LoginForm, SignUpForm } from "./profile";
import { Button } from "./ui/button";
import AuthDialogBtn from "./AuthDialogBtn";

export default function Banner({
  text,
  href,
  variant,
}: {
  text: string;
  href: string;
  variant?: string;
}) {
  const router = useRouter();
  const [viewState, setViewState] = React.useState<"SIGNIN" | "SIGNUP">(
    "SIGNIN"
  );
  const [modalState, setModalState] = React.useState<boolean>(false);
  function handleOnClick() {
    if (hasCookie("auth")) router.push(`/${href}`);
  }

  return (
    <div>
      <div>
        <AuthDialogBtn afterAuthGoTo={href}>
          <div onClick={handleOnClick} className="">
            <div className="p-5 font-bold text-wrap mt-3 cursor-pointer relative md:flex justify-between border-[1px] rounded-lg items-center hidden">
              <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
                {text}
              </h2>
              <ArrowRightIcon width={35} className="scale-150 translate-x-2" />
            </div>
            <Button
              className="md:hidden"
              onClick={handleOnClick}
              variant={variant as "default" | "secondary"}
            >
              {text}
            </Button>
          </div>
        </AuthDialogBtn>
      </div>
    </div>
  );
}
