"use server";
import { cookies } from "next/headers";
import { IEditProfile, IOTP, ISignIn, ISignUp } from "@/lib/types";
import { wait } from "@/lib/helpers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function editProfile(params: IEditProfile) {}

export async function setAlerts(tags: number[]) {}

export async function signOut(): Promise<void> {
  cookies().delete("auth");
}

export async function signIn(params: ISignIn): Promise<void> {
  await wait();
  cookies().set("auth", "12345678", { secure: true });
  revalidatePath("/");
  redirect("/");
}

export async function signUp(params: ISignUp, OTP: number): Promise<boolean> {
  await wait();
  cookies().set("auth", "12345678", { secure: true });
  return true;
}

export async function sendOTP(params: IOTP): Promise<boolean> {
  await wait();
  return true;
}
