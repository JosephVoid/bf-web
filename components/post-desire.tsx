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
        <Dialog open={modalState} onOpenChange={setModalState}>
          <DialogTrigger
            asChild
            onClick={(e) =>
              hasCookie("auth") ? e.preventDefault() : setModalState(true)
            }
          >
            <div onClick={handleOnClick} className="">
              <div className="p-5 font-bold text-wrap mt-3 cursor-pointer relative md:flex justify-between border-[1px] rounded-lg items-center hidden">
                <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
                  {text}
                </h2>
                <ArrowRightIcon
                  width={35}
                  className="scale-150 translate-x-2"
                />
              </div>
              <Button
                className="md:hidden"
                onClick={handleOnClick}
                variant={variant as "default" | "secondary"}
              >
                {text}
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent
            className="md:max-w-[825px] flex h-fit md:w-1/2 w-5/6"
            onInteractOutside={(e) => {
              e.preventDefault();
            }}
          >
            <div className="w-1/2 relative md:block hidden">
              <Image
                src="/black_box.png"
                alt="login"
                fill={true}
                objectFit="cover"
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
      </div>
    </div>
  );
}
