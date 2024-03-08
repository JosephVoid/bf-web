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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import Link from "next/link";
import { RocketIcon, AvatarIcon, ExitIcon } from "@radix-ui/react-icons";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Profile() {
  return (
    <>
      <UnSignedProfile />
    </>
  );
}

const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const signUpFormSchema = z.object({
  firstname: z
    .string()
    .min(2, {
      message: "First name must be at least 2 characters.",
    })
    .max(15, {
      message: "First name must be less than 15 characters.",
    }),
  lastname: z
    .string()
    .min(2, {
      message: "Last name must be at least 2 characters.",
    })
    .max(15, {
      message: "Last name must be less than 15 characters.",
    }),
  email: z.string().email("Invalid Email"),
  phone: z
    .string()
    .length(13, "Phone number must be 13 characters")
    .refine(
      (phone) => /^\+251\d{9}$/.test(phone),
      "Invalid Phone number, include +251"
    ),
  password: z
    .string()
    .max(30, "Password too long")
    .min(8, "Password too short"),
});

function UnSignedProfile() {
  return (
    <div className="p-4 mb-3 flex flex-col relative justify-center items-center border-[1px] rounded-lg">
      <AvatarIcon height={50} width={50} className="m-4 opacity-50" />
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Sign In</Button>
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
              <LoginForm />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

function SignedInProfile() {
  return (
    <div className="p-4 mb-3 flex flex-col relative justify-center items-center border-[1px] rounded-lg">
      <Image
        height={70}
        width={70}
        src={"/black_box.png"}
        alt="prof pic"
        className="rounded-full mb-3"
      />
      <h3 className="text-xl text-wrap font-medium mb-3">Buyer User</h3>
      <Link href={"/profile"}>
        <Button variant={"outline"} className="mb-3">
          Profile
        </Button>
      </Link>
      <Button variant={"ghost"}>
        <p className="text-sm opacity-70">Sign Out</p>
      </Button>
    </div>
  );
}

function LoginForm() {
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => console.log(data))}
          className="py-5"
        >
          <div className="flex flex-col justify-center h-3/4">
            <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl text-start mb-5">
              Sign In
            </h1>
            <div className="mb-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        {...field}
                        type="password"
                        autoComplete="new-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Sign In</Button>
          </div>
        </form>
      </Form>
      <SupportLink href="#" text="Don't have an account? Create one now" />
    </>
  );
}

function SignUpForm() {
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      password: "",
    },
  });
  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => console.log(data))}
          className="mb-8"
        >
          <div className="flex flex-col justify-center">
            <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl text-start mb-5">
              Create New
            </h1>
            <div className="flex mb-2">
              <div className="flex flex-col w-1/2 mr-2">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col w-1/2">
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col mb-2">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+251" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col mb-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col mb-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        {...field}
                        type="password"
                        autoComplete="new-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Create Account</Button>
          </div>
        </form>
      </Form>
      <SupportLink href="#" text="You have an account? Sign In instead" />
    </div>
  );
}

function SupportLink({ href, text }: { href: string; text: string }) {
  return (
    <div className="text-sm">
      <Link href={href} className="flex justify-around">
        <p>{text}</p>
        <FontAwesomeIcon icon={faArrowRight} className="w-[15px]" />
      </Link>
    </div>
  );
}

function OTPInput() {
  return (
    <>
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
      <SupportLink href="#" text="Didn't receive text? Send it again" />
    </>
  );
}
