import { Button } from "@/components/ui/button";
import { faArrowRight, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import Link from "next/link";

export default function Profile() {
  return (
    <>
      <UnSignedProfile />
    </>
  );
}

function UnSignedProfile() {
  return (
    <div className="p-4 mb-3 flex flex-col relative justify-center items-center border-[1px] rounded-lg">
      <FontAwesomeIcon className="w-1/2 mb-4 text-muted" icon={faUserCircle} />
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Sign In</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[825px] flex h-1/2 w-1/2">
            <div className="w-1/2 relative">
              <Image
                src="/black_box.png"
                alt="login"
                fill={true}
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <div className="w-1/2 flex flex-col justify-between">
              <LoginForm />
              <div>
                <Link href={"#"} className="flex justify-around">
                  <p>Don't have an account? Create one now</p>
                  <FontAwesomeIcon icon={faArrowRight} className="w-[15px]" />
                </Link>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

function LoginForm() {
  return (
    <div className="flex flex-col justify-center h-3/4">
      <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl text-start mb-5">
        Sign In
      </h1>
      <Label htmlFor="email" className="mb-2">
        Email
      </Label>
      <Input
        type="email"
        placeholder="Email"
        id="email"
        autoComplete="new-password"
        className="mb-4"
      />
      <Label htmlFor="pass" className="mb-2">
        Password
      </Label>
      <Input
        type="password"
        placeholder="Password"
        id="pass"
        autoComplete="new-password"
        className="mb-4"
      />
      <Button>Sign In</Button>
    </div>
  );
}
