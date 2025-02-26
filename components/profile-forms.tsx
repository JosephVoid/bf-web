"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import {
  RocketIcon,
  ExclamationTriangleIcon,
  CheckIcon,
} from "@radix-ui/react-icons";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPassword,
  sendOTP,
  signIn,
  signUp,
} from "@/lib/actions/act/user.act";
import Loader from "./loader";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import BFAlert from "./custom-alert";
import { useToast } from "@/components/ui/use-toast";
import { SupportLink } from "./profile-displays";
import { Checkbox } from "./ui/checkbox";
import { useTranslations } from "next-intl";

const signInFormSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim(),
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
  email: z.string().trim().email("Invalid Email"),
  phone: z
    .string()
    .trim()
    .length(13, "Phone number must be 13 characters")
    .refine(
      (phone) => /^\+251\d{9}$/.test(phone),
      "Invalid Phone number, include +251"
    ),
  password: z
    .string()
    .trim()
    .max(60, "Password too long")
    .min(8, "Password too short"),
});

const OTPForm = z.object({
  otp: z.coerce
    .number()
    .int()
    .refine((num) => {
      return num.toString().length === 6;
    }, "Wrong OTP format"),
  affiliateCode: z.string().min(6, "Must be six characters").optional(),
});

export type signUpFormSchematype = z.infer<typeof signUpFormSchema>;
export type signInFormSchematype = z.infer<typeof signInFormSchema>;

export function LoginForm({
  onSignUpSwitch,
  onComplete,
  onForgot,
}: {
  onSignUpSwitch: () => void;
  onComplete?: () => void;
  onForgot: () => void;
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
  const { toast } = useToast();
  const t = useTranslations();

  async function handleLogin(data: z.infer<typeof signInFormSchema>) {
    setIsLoading(true);
    const response = await signIn(data, current_path);

    if (response.result) {
      router.replace(current_path ?? "/?sortby=Date&sortdir=Desc");
      toast({
        title: (
          <div className="flex items-center">
            {
              <>
                <CheckIcon className="mr-2" />
                <span className="first-letter:capitalize">
                  Successfully Signed In!
                </span>
              </>
            }
          </div>
        ),
      });
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
              {t("Forms.auth.signin")}
            </h1>
            <div className="mb-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Forms.auth.email")}</FormLabel>
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
                    <FormLabel>{t("Forms.auth.pass")}</FormLabel>
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
              <p className="cursor-pointer text-xs my-2" onClick={onForgot}>
                {t("Forms.auth.forgot")}
              </p>
            </div>
            <BFAlert
              variant={"destructive"}
              text="Check Email or Password!"
              show={isError}
            />
            <Button type="submit">
              {" "}
              {isLoading ? <Loader /> : t("Forms.auth.signin")}
            </Button>
          </div>
        </form>
      </Form>
      <SupportLink
        onclick={onSignUpSwitch}
        text={t("Forms.auth.dont-hv-account")}
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
      phone: "+251",
      password: "",
    },
  });

  const [signUpDetails, setSignUpDetails] =
    React.useState<signUpFormSchematype>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { toast } = useToast();
  const t = useTranslations();
  async function handleDetails(data: signUpFormSchematype) {
    setIsLoading(true);
    const response = await sendOTP({ ...data, ForReset: false });
    !response.result
      ? toast({
          title: (
            <div className="flex items-center">
              <ExclamationTriangleIcon className="mr-2" />
              <span className="first-letter:capitalize">
                {response.message}
              </span>
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
                {t("Forms.auth.create-account")}
              </h1>
              <div className="flex mb-2">
                <div className="flex flex-col w-1/2 mr-2">
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("Forms.auth.first-name")}</FormLabel>
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
                        <FormLabel>{t("Forms.auth.last-name")}</FormLabel>
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
                      <FormLabel>{t("Forms.auth.phone")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+251"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\s+/g, "");
                            field.onChange(value);
                          }}
                        />
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
                      <FormLabel>{t("Forms.auth.email")}</FormLabel>
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
                      <FormLabel>{t("Forms.auth.pass")}</FormLabel>
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
                {isLoading ? <Loader /> : t("Forms.auth.create-account")}
              </Button>
            </div>
          </form>
        </Form>
        <SupportLink
          onclick={onSignInSwitch}
          text={t("Forms.auth.hv-account")}
        />
      </div>
    </>
  ) : (
    <OTPInput data={signUpDetails!} onComplete={onComplete} />
  );
}

export function ForgotPasswordForm({ onComplete }: { onComplete: () => void }) {
  const emailSchema = z.object({
    email: z.string().email(),
  });

  const otpSchema = z.object({
    otp: z.coerce
      .number()
      .int()
      .refine((num) => {
        return num.toString().length === 6;
      }, "Wrong OTP format"),
  });

  const newPassSchema = z.object({
    newPass: z
      .string()
      .max(60, "Password too long")
      .min(8, "Password too short"),
  });

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
  });
  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
  });
  const newPassForm = useForm<z.infer<typeof newPassSchema>>({
    resolver: zodResolver(newPassSchema),
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [stage, setStage] = React.useState<"EMAIL" | "OTP" | "NEW">("EMAIL");
  const [resetData, setResetData] = React.useState<{
    newPassword: string;
    otp: string;
    email: string;
  }>({ newPassword: "", otp: "", email: "" });
  const [isError, setIsError] = React.useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const t = useTranslations();

  async function handleEmail(data: z.infer<typeof emailSchema>) {
    setIsLoading(true);
    const result = await sendOTP({ email: data.email, ForReset: true });
    if (result) {
      setResetData({ ...resetData, email: data.email });
      setIsLoading(false);
      setStage("OTP");
    } else {
      setIsError(true);
      setIsLoading(false);
    }
  }

  function handleOTP(data: z.infer<typeof otpSchema>) {
    setResetData({ ...resetData, otp: data.otp.toString() });
    setStage("NEW");
  }

  async function handleNewPass(data: z.infer<typeof newPassSchema>) {
    setIsLoading(true);
    const response = await resetPassword(
      data.newPass,
      resetData.otp,
      resetData.email
    );
    setIsLoading(false);
    if (response.result) {
      toast({
        title: (
          <div className="flex items-center">
            {
              <>
                <CheckIcon className="mr-2" />
                <span className="first-letter:capitalize">
                  Password Reset! Login with you new password.
                </span>
              </>
            }
          </div>
        ),
      });
      router.replace("/?sortby=Date&sortdir=Desc");
      onComplete();
    } else {
      setIsError(true);
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center py-6">
        <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl text-start mb-5">
          {t("Forms.auth.forgot-pass-ok")}
        </h1>
        {stage === "EMAIL" && (
          <Form {...emailForm}>
            <form onSubmit={emailForm.handleSubmit(handleEmail)}>
              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>{t("Forms.auth.your-email")}</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                    <BFAlert
                      variant={"destructive"}
                      text="OTP Error"
                      show={isError}
                    />
                  </FormItem>
                )}
              />
              <Button type="submit">
                {isLoading ? <Loader /> : "Get Code"}
              </Button>
            </form>
          </Form>
        )}
        {stage === "OTP" && (
          <>
            <Alert className="mb-4">
              <RocketIcon className="h-4 w-4" />
              <AlertTitle>{t("Forms.auth.otp-inform-head")}</AlertTitle>
              <AlertDescription>
                {t("Forms.auth.reset-otp-inform-sub")}
              </AlertDescription>
            </Alert>
            <Form {...otpForm}>
              <form onSubmit={otpForm.handleSubmit(handleOTP)}>
                <FormField
                  control={otpForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>{t("Forms.auth.enter-otp")}</FormLabel>
                      <FormControl>
                        <Input placeholder="* * * * * *" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">
                  {isLoading ? <Loader /> : t("Forms.auth.confirm-otp")}
                </Button>
              </form>
            </Form>
          </>
        )}
        {stage === "NEW" && (
          <>
            <Form {...newPassForm}>
              <form onSubmit={newPassForm.handleSubmit(handleNewPass)}>
                <FormField
                  control={newPassForm.control}
                  name="newPass"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>{t("Forms.profile.n-pass")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Password"
                          {...field}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                      <BFAlert
                        variant={"destructive"}
                        text="Something is wrong, Try again"
                        show={isError}
                      />
                    </FormItem>
                  )}
                />
                {isError && (
                  <Button
                    variant={"secondary"}
                    onClick={() => {
                      setIsError(false);
                      setStage("EMAIL");
                    }}
                  >
                    Try Again
                  </Button>
                )}
                {!isError && (
                  <Button type="submit">
                    {isLoading ? <Loader /> : "Save"}
                  </Button>
                )}
              </form>
            </Form>
          </>
        )}
      </div>
    </>
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
  const [isAffilate, setIsAffilate] = React.useState<boolean>(false);
  const { toast } = useToast();
  const t = useTranslations();

  async function handleOTP() {
    setIsLoading(true);
    let otp = form.getValues("otp");
    let affCode = form.getValues("affiliateCode");
    const response = await signUp(data, otp.toString(), affCode);

    toast({
      title: (
        <div className="flex items-center">
          {response.result && (
            <>
              {" "}
              <CheckIcon className="mr-2" />
              <span className="first-letter:capitalize">
                Sucessfully Signed Up, Welcome aboard!
              </span>
            </>
          )}
          {!response.result && (
            <>
              {" "}
              <ExclamationTriangleIcon className="mr-2" />
              <span className="first-letter:capitalize">{response.result}</span>
            </>
          )}
        </div>
      ),
    });
    setIsLoading(false);
    onComplete?.();
  }

  function onAffiliateChange() {
    form.setValue(
      "affiliateCode",
      isAffilate ? undefined : form.getValues("affiliateCode")
    );
    setIsAffilate(!isAffilate);
  }

  return (
    <>
      <div className="flex flex-col justify-center h-4/5 py-6">
        <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl text-start mb-5">
          One-Time Password
        </h1>
        <Alert className="mb-4">
          <RocketIcon className="h-4 w-4" />
          <AlertTitle>{t("Forms.auth.otp-inform-head")}</AlertTitle>
          <AlertDescription>{t("Forms.auth.otp-inform-sub")}</AlertDescription>
        </Alert>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleOTP)}>
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>{t("Forms.auth.enter-otp")}</FormLabel>
                  <FormControl>
                    <Input placeholder="* * * * * *" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Checkbox
                id="affiliate"
                onCheckedChange={onAffiliateChange}
                checked={isAffilate}
              />
              <label htmlFor="affiliate" className="text-sm font-medium ml-2">
                {t("Forms.auth.affilate")}
              </label>
              <div className={`${isAffilate ? "visible" : "invisible"}`}>
                <FormField
                  control={form.control}
                  name="affiliateCode"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>{t("Forms.auth.enter-affilate")}</FormLabel>
                      <FormControl>
                        <Input placeholder="Code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button type="submit">{isLoading ? <Loader /> : "Confirm"}</Button>
          </form>
        </Form>
      </div>
      <SupportLink text="Didn't receive text? Send it again" />
    </>
  );
}
