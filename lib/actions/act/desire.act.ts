"use server";

import { CoreAPI } from "@/lib/api";
import { wait } from "@/lib/helpers";
import { APIResponse } from "@/lib/types";
import { cookies } from "next/headers";

export async function postDesire(
  title: string,
  description: string,
  minPrice: number,
  maxPrice: number,
  metric: string,
  picture: string | null,
  tags_id: string[]
): Promise<APIResponse> {
  /* While Mocking */
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    console.log({ title, description, minPrice, maxPrice, picture, tags_id });
    return { result: true };
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
    if (response.status === 200)
      return { result: true, data: response.data.id };
    else return { result: false, message: response.data.message };
  } catch (error: any) {
    console.log(error.response.data.message);
    return { result: false, message: error.response.data.message };
  }
}

export async function editDesire(
  desireId: string,
  title: string,
  description: string,
  minPrice: number,
  maxPrice: number,
  metric: string,
  picture: string | null,
  tags_id: string[]
): Promise<APIResponse> {
  /* While Mocking */
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    console.log({ title, description, minPrice, maxPrice, picture, tags_id });
    return { result: true };
  }

  try {
    const response = picture
      ? await CoreAPI.editDesires(
          { title, description, minPrice, maxPrice, metric, tags_id, picture },
          desireId,
          cookies().get("auth")?.value ?? ""
        )
      : await CoreAPI.editDesires(
          { title, description, minPrice, maxPrice, metric, tags_id },
          desireId,
          cookies().get("auth")?.value ?? ""
        );
    if (response.status === 200)
      return { result: true, data: response.data.id };
    else return { result: false, message: response.data.message };
  } catch (error: any) {
    console.log(error.response.data.message);
    return { result: false, message: error.response.data.message };
  }
}

export async function wantDesire(desireId: string): Promise<APIResponse> {
  /* While Mocking */
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    await wait();
    return { result: true };
  }

  try {
    const response = await CoreAPI.wantDesires(
      desireId,
      cookies().get("auth")?.value ?? ""
    );
    if (response.status === 200) {
      return { result: true };
    } else {
      console.log(response.data);
      return { result: false, message: response.data.message };
    }
  } catch (error) {
    return { result: false };
  }
}

export async function unWantDesire(desireId: string): Promise<APIResponse> {
  /* While Mocking */
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    await wait();
    return { result: true };
  }

  try {
    const response = await CoreAPI.unWantDesires(
      desireId,
      cookies().get("auth")?.value ?? ""
    );
    if (response.status === 200) {
      return { result: true };
    } else {
      console.log(response.data);
      return { result: false, message: response.data.message };
    }
  } catch (error) {
    return { result: false };
  }
}

export async function viewDesire(userId: string, desireId: string) {
  await wait();
}
