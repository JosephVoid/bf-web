"use client";

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
import { RocketIcon, PersonIcon } from "@radix-ui/react-icons";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";

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
      <PersonIcon height={50} width={50} className="m-4" />
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Sign In</Button>
          </DialogTrigger>
          <DialogContent
            className="sm:max-w-[825px] flex h-1/2 w-1/2"
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
              <OTPInput />
              <SupportLink />
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

function SignUpForm() {
  return (
    <div className="flex flex-col justify-center h-3/4">
      <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl text-start mb-5">
        Create New
      </h1>
      <div className="flex">
        <div className="flex flex-col w-1/2 mr-2">
          <Label htmlFor="email" className="mb-2">
            First Name
          </Label>
          <Input
            type="fname"
            placeholder="First name"
            id="fname"
            className="mb-4"
          />
        </div>
        <div className="flex flex-col w-1/2">
          <Label htmlFor="email" className="mb-2">
            Last Name
          </Label>
          <Input
            type="lname"
            placeholder="Last name"
            id="lname"
            className="mb-4"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <Label htmlFor="phone" className="mb-2">
          Phone Number
        </Label>
        <Input type="phone" placeholder="+251" id="phone" className="mb-4" />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="email" className="mb-2">
          Email
        </Label>
        <Input type="email" placeholder="Email" id="email" className="mb-4" />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="pass" className="mb-2">
          Password
        </Label>
        <Input
          type="password"
          placeholder="Password 8 digits"
          id="pass"
          className="mb-4"
          autoComplete="new-password"
        />
      </div>
      <Button>Create Account</Button>
    </div>
  );
}

function SupportLink() {
  return (
    <div>
      <Link href={"#"} className="flex justify-around">
        <p>Don't have an account? Create one now</p>
        <FontAwesomeIcon icon={faArrowRight} className="w-[15px]" />
      </Link>
    </div>
  );
}

function OTPInput() {
  return (
    <div className="flex flex-col justify-center h-3/4">
      <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl text-start mb-5">
        One-Time Password
      </h1>
      <Alert className="mb-4">
        <RocketIcon className="h-4 w-4" />
        <AlertTitle>We've sent a 6-digit code</AlertTitle>
        <AlertDescription>Check your SMS or email</AlertDescription>
      </Alert>
      <Label htmlFor="email" className="mb-2">
        Enter the 6-digit code
      </Label>
      <Input type="otp" placeholder="* * * * * *" id="otp" className="mb-4" />
      <Button>Confirm</Button>
    </div>
  );
}
