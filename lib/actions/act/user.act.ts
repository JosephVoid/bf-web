"use server";
import { cookies } from "next/headers";
import { APIResponse, IEditProfile, IOTP, ISignIn, ISignUp } from "@/lib/types";
import { wait } from "@/lib/helpers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { AuthAPI, CoreAPI } from "@/lib/api";

export async function editProfile(params: any): Promise<APIResponse> {
  /* ---When Mocking---- */
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    console.log(params);
    return {
      result: true,
    };
  }

  try {
    const response = await CoreAPI.updateUser(
      params,
      cookies().get("auth")?.value ?? ""
    );
    if (response.status === 200) {
      return { result: true };
    } else return { result: false, message: response.data.message };
  } catch (error: any) {
    console.log(error.response.data.message);
    return { result: false, message: error.response.data.message };
  }
}

export async function setAlerts(tags: string[]): Promise<APIResponse> {
  /* ---When Mocking---- */
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    console.log(tags);
    return {
      result: true,
    };
  }
  try {
    const response = await CoreAPI.setAlert(
      { tag_ids: tags },
      cookies().get("auth")?.value ?? ""
    );
    if (response.status === 200) {
      return { result: true };
    } else return { result: false, message: response.data.message };
  } catch (error: any) {
    console.log(error.response.data.message);
    return { result: false, message: error.response.data.message };
  }
}

export async function signOut(): Promise<void> {
  cookies().delete("auth");
  revalidatePath("/?sortby=Date&sortdir=Desc");
  redirect("/?sortby=Date&sortdir=Desc");
}

export async function signIn(
  params: ISignIn,
  currentpath?: string
): Promise<APIResponse> {
  /* ---When Mocking---- */
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    await wait();
    cookies().set("auth", "12345678", { secure: true });
    return {
      result: true,
    };
  }

  try {
    const response = await AuthAPI.signIn(params);
    cookies().set("auth", response.data, { secure: true, maxAge: 7257600 });
    return {
      result: true,
    };
  } catch (error) {
    return { result: false };
  }
}

export async function signUp(
  params: ISignUp,
  otp: string,
  affCode?: string
): Promise<APIResponse> {
  /* ---When Mocking---- */
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    await wait();
    cookies().set("auth", "12345678", { secure: true });
    return {
      result: true,
    };
  }

  try {
    const paramsWOTP: ISignUp & { otp: string; affiliateCode?: string } = {
      ...params,
      otp,
      affiliateCode: affCode,
    };
    const response = await AuthAPI.signUp(paramsWOTP);
    console.log("SIGNUP RESP: ", JSON.stringify(response));
    if (response.status === 200) {
      cookies().set("auth", response.data, { secure: true, maxAge: 7257600 });
      return {
        result: true,
      };
    } else return { result: false, message: response.data.message };
  } catch (error: any) {
    console.log(error.response.data.message);
    return { result: false, message: error.response.data.message };
  }
}

export async function sendOTP(params: IOTP): Promise<APIResponse> {
  /* ---When Mocking---- */
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    await wait();
    return {
      result: true,
    };
  }

  try {
    const response = await AuthAPI.sendOTP({
      ForReset: params.ForReset,
      email: params.email,
      phone: params.phone,
    });
    if (response.status === 200) {
      return { result: true };
    } else return { result: false, message: response.data.message };
  } catch (error: any) {
    console.log(error.response);
    return { result: false, message: error.response.data.message };
  }
}

export async function viewItem(id: string): Promise<void> {
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

export async function resetPassword(
  newPassword: string,
  otp: string,
  email: string
): Promise<APIResponse> {
  /* ---When Mocking---- */
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    await wait();
    return {
      result: true,
    };
  }
  try {
    const response = await AuthAPI.resetPassword({
      newPassword,
      otp,
      email,
    });
    if (response.status === 200) {
      return { result: true };
    } else {
      console.log(response.data);
      return { result: false, message: response.data.message };
    }
  } catch (error: any) {
    console.log(error.response.data.message);
    return { result: false, message: error.response.data.message };
  }
}
