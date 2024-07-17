"use client";

import React from "react";
import { ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { LoginForm, SignUpForm } from "./profile";
import Image from "next/image";
import { hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function AuthDialogBtn({
  children,
  afterAuthGoTo,
}: {
  children: ReactNode;
  afterAuthGoTo?: string;
}) {
  const [viewState, setViewState] = React.useState<"SIGNIN" | "SIGNUP">(
    "SIGNIN"
  );
  const [modalState, setModalState] = React.useState<boolean>(false);
  const router = useRouter();

  const afterAuthAction = () => {
    setModalState(false);
    afterAuthGoTo ? router.replace(afterAuthGoTo) : null;
  };

  return (
    <div>
      <Dialog modal={modalState} onOpenChange={setModalState}>
        <DialogTrigger
          asChild
          onClick={(e) =>
            hasCookie("auth") ? e.preventDefault() : setModalState(true)
          }
        >
          {children}
        </DialogTrigger>
        <DialogContent
          className="md:max-w-[825px] flex h-fit md:w-1/2 w-5/6"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
          onOpenAutoFocus={(e) => e.preventDefault()}
          style={{ display: modalState ? "" : "none" }}
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
                onComplete={() => afterAuthAction()}
              />
            )}
            {viewState === "SIGNUP" && (
              <SignUpForm
                onSignInSwitch={() => setViewState("SIGNIN")}
                onComplete={() => afterAuthAction()}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
