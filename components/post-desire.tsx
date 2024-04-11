"use client";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { hasCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React from "react";
import Image from "next/image";
import { LoginForm, SignUpForm } from "./profile";

export default function Banner({ text, href }: { text: string; href: string }) {
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
        <Dialog open={modalState} onOpenChange={setModalState}>
          <DialogTrigger
            asChild
            onClick={(e) =>
              hasCookie("auth") ? e.preventDefault() : setModalState(true)
            }
          >
            <div onClick={handleOnClick}>
              <div className="p-5 font-bold text-wrap mt-3 cursor-pointer relative flex justify-between border-[1px] rounded-lg items-center">
                <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
                  {text}
                </h2>
                <ArrowRightIcon
                  width={35}
                  className="scale-150 translate-x-2"
                />
              </div>
            </div>
          </DialogTrigger>
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
    </div>
  );
}
