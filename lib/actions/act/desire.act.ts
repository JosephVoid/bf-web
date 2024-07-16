"use server";

import { CoreAPI } from "@/lib/api";
import { wait } from "@/lib/helpers";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export async function postDesire(
  title: string,
  description: string,
  minPrice: number,
  maxPrice: number,
  metric: string,
  picture: string | null,
  tags_id: string[]
): Promise<string | boolean> {
  /* While Mocking */
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    console.log({ title, description, minPrice, maxPrice, picture, tags_id });
    return true;
  }

  try {
    const response = picture
      ? await CoreAPI.createDesires(
          { title, description, minPrice, maxPrice, metric, tags_id, picture },
          cookies().get("auth")?.value ?? ""
        )
      : await CoreAPI.createDesires(
          { title, description, minPrice, maxPrice, metric, tags_id },
          cookies().get("auth")?.value ?? ""
        );
    if (response.status === 200) return response.data.id;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function wantDesire(desireId: string): Promise<boolean> {
  /* While Mocking */
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    await wait();
    return true;
  }

  try {
    const response = await CoreAPI.wantDesires(
      desireId,
      cookies().get("auth")?.value ?? ""
    );
    if (response.status === 200) return true;
    else {
      console.log(response.data);
      return false;
    }
  } catch (error) {
    return false;
  }
}

export async function unWantDesire(desireId: string): Promise<boolean> {
  /* While Mocking */
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    await wait();
    return true;
  }

  try {
    const response = await CoreAPI.unWantDesires(
      desireId,
      cookies().get("auth")?.value ?? ""
    );
    if (response.status === 200) return true;
    else {
      console.log(response.data);
      return false;
    }
  } catch (error) {
    return false;
  }
}

export async function viewDesire(userId: string, desireId: string) {
  await wait();
}
