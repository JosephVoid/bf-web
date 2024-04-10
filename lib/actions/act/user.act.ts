"use server";
import { cookies } from "next/headers";
import { IEditProfile, IOTP, ISignIn, ISignUp } from "@/lib/types";
import { wait } from "@/lib/helpers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { AuthAPI, CoreAPI } from "@/lib/api";

export async function editProfile(params: any): Promise<boolean> {
  /* ---When Mocking---- */
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    console.log(params);
    return true;
  }

  try {
    const response = await CoreAPI.updateUser(
      params,
      cookies().get("auth")?.value ?? ""
    );
    if (response.status === 200) return true;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function setAlerts(tags: string[]): Promise<boolean> {
  /* ---When Mocking---- */
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    console.log(tags);
    return true;
  }
  try {
    const response = await CoreAPI.setAlert(
      { tag_ids: tags },
      cookies().get("auth")?.value ?? ""
    );
    if (response.status === 200) return true;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

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
  otp: string,
  currentpath?: string
): Promise<boolean> {
  /* ---When Mocking---- */
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    await wait();
    cookies().set("auth", "12345678", { secure: true });
  }

  try {
    const paramsWOTP: ISignUp & { otp: string } = { ...params, otp };
    const response = await AuthAPI.signUp(paramsWOTP);
    if (response.status === 200) {
      cookies().set("auth", response.data, { secure: true });
      revalidatePath(currentpath ?? "/");
      redirect(currentpath ?? "/");
    } else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function sendOTP(params: IOTP): Promise<boolean> {
  /* ---When Mocking---- */
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    await wait();
    return true;
  }

  try {
    const response = await AuthAPI.sendOTP({
      email: params.email,
      phone: params.phone,
    });
    if (response.status === 200) return true;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function viewItem(id: string, userId: string): Promise<void> {
  /* ---When Mocking---- */
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    await wait();
    return;
  }

  try {
    await CoreAPI.viewItem(id, cookies().get("auth")?.value ?? "");
  } catch (error) {
    console.log(error);
  }
}
