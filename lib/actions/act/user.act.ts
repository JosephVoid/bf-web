"use server";
import { cookies } from "next/headers";
import { IEditProfile, IOTP, ISignIn, ISignUp } from "@/lib/types";
import { wait } from "@/lib/helpers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { AuthAPI, CoreAPI } from "@/lib/api";

export async function editProfile(params: IEditProfile) {}

export async function setAlerts(tags: number[]) {}

export async function signOut(): Promise<void> {
  cookies().delete("auth");
  revalidatePath("/");
  redirect("/");
}

export async function signIn(
  params: ISignIn,
  currentpath?: string
): Promise<boolean> {
  /* ---When Mocking---- */
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    await wait();
    cookies().set("auth", "12345678", { secure: true });
    return true;
  }

  try {
    const response = await AuthAPI.signIn(params);
    cookies().set("auth", response.data, { secure: true });
    return true;
  } catch (error) {
    return false;
  }
}

export async function signUp(
  params: ISignUp,
  OTP: number,
  currentpath?: string
): Promise<void> {
  await wait();
  cookies().set("auth", "12345678", { secure: true });
  revalidatePath(currentpath ?? "/");
  redirect(currentpath ?? "/");
}

export async function sendOTP(params: IOTP): Promise<boolean> {
  await wait();
  return true;
}
