"use server";

import { CoreAPI } from "@/lib/api";
import { wait } from "@/lib/helpers";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export async function postDesire(
  title: string,
  description: string,
  price: number,
  picture: string | null,
  tags_id: string[]
): Promise<string | boolean> {
  /* While Mocking */
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    console.log({ title, description, price, picture, tags_id });
    return true;
  }

  try {
    const response = picture
      ? await CoreAPI.createDesires(
          { title, description, price, tags_id, picture },
          cookies().get("auth")?.value ?? ""
        )
      : await CoreAPI.createDesires(
          { title, description, price, tags_id },
          cookies().get("auth")?.value ?? ""
        );
    if (response.status === 200) return response.data.id;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function wantDesire(
  userId: string,
  desireId: string
): Promise<boolean> {
  await wait();
  return true;
}

export async function unWantDesire(
  userId: string,
  desireId: string
): Promise<boolean> {
  await wait();
  return true;
}

export async function viewDesire(userId: string, desireId: string) {
  await wait();
}
