"use client";

import React from "react";
import { ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { ForgotPasswordForm, LoginForm, SignUpForm } from "./profile-forms";
import Image from "next/image";
import { hasCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";
import { useSearchParams } from "next/navigation";

export default function HomeModal({
  afterAuthGoTo,
}: {
  afterAuthGoTo?: string;
}) {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const hasVisitedBefore = getCookie("visit") ?? false;
  const [viewState, setViewState] = React.useState<
    "SIGNIN" | "SIGNUP" | "FORGOT"
  >(hasVisitedBefore ? "SIGNIN" : "SIGNUP");

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const afterAuthAction = () => {
    closeHomeModal();
    setCookie("visit", new Date().toISOString());
    afterAuthGoTo ? router.replace(afterAuthGoTo) : null;
  };

  const closeHomeModal = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("login");
    params.delete("signup");
    params.set("sortby", "Date");
    params.set("sortdir", "Desc");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    isClient && (
      <div>
        <Dialog
          open={searchParams.has("login") || searchParams.has("signup")}
          onOpenChange={(e) => {
            !e ? closeHomeModal() : null;
          }}
        >
          {
            <DialogContent
              className="md:max-w-[825px] flex h-fit md:w-1/2 w-5/6"
              onInteractOutside={(e) => {
                e.preventDefault();
              }}
              onOpenAutoFocus={(e) => e.preventDefault()}
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
                {!!searchParams.get("login") && (
                  <LoginForm
                    onSignUpSwitch={() => setViewState("SIGNUP")}
                    onComplete={() => afterAuthAction()}
                    onForgot={() => setViewState("FORGOT")}
                  />
                )}
                {!!searchParams.get("signup") && (
                  <SignUpForm
                    onSignInSwitch={() => setViewState("SIGNIN")}
                    onComplete={() => afterAuthAction()}
                  />
                )}
                {viewState === "FORGOT" && (
                  <ForgotPasswordForm
                    onComplete={() => {
                      closeHomeModal();
                      setViewState("SIGNIN");
                    }}
                  />
                )}
              </div>
            </DialogContent>
          }
        </Dialog>
      </div>
    )
  );
}
