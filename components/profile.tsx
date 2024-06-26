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
import {
  RocketIcon,
  AvatarIcon,
  ExitIcon,
  ExclamationTriangleIcon,
  CheckIcon,
} from "@radix-ui/react-icons";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendOTP, signIn, signOut, signUp } from "@/lib/actions/act/user.act";
import { getCookie, hasCookie } from "cookies-next";
import Loader from "./loader";
import { fetchUserProfile } from "@/lib/actions/fetch/user.fetch";
import { IUser } from "@/lib/types";
import { usePathname } from "next/navigation";
import { redirect, useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
import BFAlert from "./custom-alert";
import { getUserId } from "@/lib/server-helpers";
import { useToast } from "@/components/ui/use-toast";

export default function Profile() {
  /* These methods ensure that this component is rendered on the client 
    The components `<SignedInProfile /> & <UnSignedProfile />` will be rendered on hydration
  */
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
    <div>{hasCookie("auth") ? <SignedInProfile /> : <UnSignedProfile />}</div>
  ) : (
    <></>
  );
}

export function MobileProfile() {
  /* These methods ensure that this component is rendered on the client 
    The components `<SignedInProfile /> & <UnSignedProfile />` will be rendered on hydration
  */
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
    <div>
      {hasCookie("auth") ? (
        <MobileSignedInProfile />
      ) : (
        <UnSignedMobileProfile />
      )}
    </div>
  ) : (
    <></>
  );
}

const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const signUpFormSchema = z.object({
  first_name: z
    .string()
    .min(2, {
      message: "First name must be at least 2 characters.",
    })
    .max(15, {
      message: "First name must be less than 15 characters.",
    }),
  last_name: z
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

const OTPForm = z.object({
  otp: z.coerce
    .number()
    .int()
    .refine((num) => {
      return num.toString().length === 6;
    }, "Wrong OTP format"),
});

export type signUpFormSchematype = z.infer<typeof signUpFormSchema>;
export type signInFormSchematype = z.infer<typeof signInFormSchema>;

function UnSignedProfile() {
  const [viewState, setViewState] = React.useState<"SIGNIN" | "SIGNUP">(
    "SIGNIN"
  );

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
                src="/stock-min.jpg"
                alt="login"
                fill={true}
                style={{ objectFit: "cover" }}
                className="rounded-md"
              />
            </div>
            <div className="w-1/2 flex flex-col justify-between p-2">
              {viewState === "SIGNIN" && (
                <LoginForm onSignUpSwitch={() => setViewState("SIGNUP")} />
              )}
              {viewState === "SIGNUP" && (
                <SignUpForm onSignInSwitch={() => setViewState("SIGNIN")} />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

function SignedInProfile() {
  const [user, setUser] = React.useState<IUser>();
  async function handleSignOut() {
    await signOut();
  }

  React.useEffect(() => {
    getUserId().then((userId) => {
      fetchUserProfile(userId!).then((result) => {
        console.log(result);
        if (result) setUser(result);
      });
    });
  }, []);

  return (
    <div className="p-4 mb-3 flex flex-col relative justify-center items-center border-[1px] rounded-lg">
      {user?.picture && (
        <Image
          height={70}
          width={70}
          src={user?.picture}
          alt="prof pic"
          className="rounded-full mb-3"
        />
      )}
      {!user?.picture && (
        <AvatarIcon height={50} width={50} className="m-4 opacity-50" />
      )}
      <h3 className="text-xl text-wrap font-medium mb-3 text-center">{`${
        user?.first_name ?? ""
      } ${user?.last_name ?? ""}`}</h3>
      <Link href={"/profile"}>
        <Button variant={"outline"} className="mb-3">
          Profile
        </Button>
      </Link>
      <Button variant={"ghost"} onClick={handleSignOut}>
        <p className="text-sm opacity-70">Sign Out</p>
      </Button>
    </div>
  );
}

export function LoginForm({
  onSignUpSwitch,
  onComplete,
}: {
  onSignUpSwitch: () => void;
  onComplete?: () => void;
}) {
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const current_path = usePathname();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState(false);
  const router = useRouter();

  async function handleLogin(data: z.infer<typeof signInFormSchema>) {
    setIsLoading(true);
    const response = await signIn(data, current_path);

    if (response) {
      router.replace(current_path ?? "/");
      onComplete?.();
    } else {
      setIsError(true);
      setIsLoading(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)} className="py-5">
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
            <BFAlert
              variant={"destructive"}
              text="Check Email or Password!"
              show={isError}
            />
            <Button type="submit"> {isLoading ? <Loader /> : "Sign In"}</Button>
          </div>
        </form>
      </Form>
      <SupportLink
        onclick={onSignUpSwitch}
        text="Don't have an account? Create one now"
      />
    </>
  );
}

export function SignUpForm({
  onSignInSwitch,
  onComplete,
}: {
  onSignInSwitch: () => void;
  onComplete?: () => void;
}) {
  const form = useForm<signUpFormSchematype>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const [signUpDetails, setSignUpDetails] =
    React.useState<signUpFormSchematype>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { toast } = useToast();

  async function handleDetails(data: signUpFormSchematype) {
    setIsLoading(true);
    const result = await sendOTP(data);
    !result
      ? toast({
          title: (
            <div className="flex items-center">
              <ExclamationTriangleIcon className="mr-2" />
              <span className="first-letter:capitalize">OTP Error</span>
            </div>
          ),
        })
      : null;
    setIsLoading(false);
    setSignUpDetails(data);
  }

  return signUpDetails === undefined ? (
    <>
      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleDetails)} className="mb-8">
            <div className="flex flex-col justify-center">
              <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl text-start mb-5">
                Create New
              </h1>
              <div className="flex mb-2">
                <div className="flex flex-col w-1/2 mr-2">
                  <FormField
                    control={form.control}
                    name="first_name"
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
                    name="last_name"
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
              <Button type="submit">
                {isLoading ? <Loader /> : "Create Account"}
              </Button>
            </div>
          </form>
        </Form>
        <SupportLink
          onclick={onSignInSwitch}
          text="You have an account? Sign In instead"
        />
      </div>
    </>
  ) : (
    <OTPInput data={signUpDetails!} onComplete={onComplete} />
  );
}

function SupportLink({
  onclick,
  text,
}: {
  onclick?: () => void;
  text: string;
}) {
  return (
    <div className="text-sm">
      <div onClick={onclick} className="flex justify-around cursor-pointer">
        <p>{text}</p>
        <FontAwesomeIcon icon={faArrowRight} className="w-[15px]" />
      </div>
    </div>
  );
}

function OTPInput({
  data,
  onComplete,
}: {
  data: signUpFormSchematype;
  onComplete?: () => void;
}) {
  const form = useForm<z.infer<typeof OTPForm>>({
    resolver: zodResolver(OTPForm),
  });

  const current_path = usePathname();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { toast } = useToast();

  async function handleOTP() {
    setIsLoading(true);
    let otp = form.getValues("otp");
    const result = await signUp(data, otp.toString(), current_path);

    toast({
      title: (
        <div className="flex items-center">
          {result && (
            <>
              {" "}
              <CheckIcon className="mr-2" />
              <span className="first-letter:capitalize">
                Sucessfully Signed Up, Welcome aboard!
              </span>
            </>
          )}
          {!result && (
            <>
              {" "}
              <ExclamationTriangleIcon className="mr-2" />
              <span className="first-letter:capitalize">Error Encounterd</span>
            </>
          )}
        </div>
      ),
    });
    setIsLoading(false);
    onComplete?.();
  }

  return (
    <>
      <div className="flex flex-col justify-center h-3/4 py-6">
        <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl text-start mb-5">
          One-Time Password
        </h1>
        <Alert className="mb-4">
          <RocketIcon className="h-4 w-4" />
          <AlertTitle>We've sent a 6-digit code</AlertTitle>
          <AlertDescription>Check your SMS or email</AlertDescription>
        </Alert>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleOTP)}>
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Enter the 6-digit code</FormLabel>
                  <FormControl>
                    <Input placeholder="* * * * * *" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{isLoading ? <Loader /> : "Confirm"}</Button>
          </form>
        </Form>
      </div>
      <SupportLink text="Didn't receive text? Send it again" />
    </>
  );
}

function UnSignedMobileProfile() {
  const [viewState, setViewState] = React.useState<"SIGNIN" | "SIGNUP">(
    "SIGNIN"
  );
  const [modalState, setModalState] = React.useState<boolean>(false);

  return (
    <div className="">
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <AvatarIcon width={30} height={30} className="opacity-50" />
          </DialogTrigger>
          <DialogContent
            className="md:max-w-[825px] flex h-fit md:w-1/2 w-5/6"
            onInteractOutside={(e) => {
              e.preventDefault();
            }}
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

function MobileSignedInProfile() {
  const [user, setUser] = React.useState<IUser>();

  React.useEffect(() => {
    getUserId().then((userId) => {
      fetchUserProfile(userId!).then((result) => {
        console.log(result);
        if (result) setUser(result);
      });
    });
  }, []);

  return (
    <div className="">
      <Link href={"/profile"}>
        {user?.picture && (
          <Image
            height={30}
            width={30}
            src={user?.picture}
            alt="prof pic"
            className="rounded-full"
          />
        )}
        {!user?.picture && (
          <AvatarIcon height={50} width={50} className="m-4 opacity-50" />
        )}
      </Link>
    </div>
  );
}
