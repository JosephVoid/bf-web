"use server";

import { CoreAPI } from "@/lib/api";
import { wait } from "@/lib/helpers";
import { APIResponse, IOfferMakeParams } from "@/lib/types";
import { cookies } from "next/headers";

export async function makeOffer(
  params: Omit<IOfferMakeParams, "picture"> & {
    picture?: string | null;
    desireId: string;
  }
): Promise<APIResponse> {
  /* While Mocking */
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    return { result: true };
  }

  try {
    const response = params.picture
      ? await CoreAPI.createBid(
          params.desireId,
          {
            description: params.description,
            price: params.price,
            picture: params.picture,
          },
          cookies().get("auth")?.value ?? ""
        )
      : await CoreAPI.createBid(
          params.desireId,
          { description: params.description, price: params.price },
          cookies().get("auth")?.value ?? ""
        );
    if (response.status === 200)
      return {
        result: true,
        message: response.data.message,
        data: response.data.id,
      };
    else return { result: false, message: response.data.message };
  } catch (error: any) {
    console.log(error.response.data.message);
    return { result: false, message: error.response.data.message };
  }
}

export async function editOffer(
  params: Omit<IOfferMakeParams, "picture"> & {
    picture?: string | null;
    id: string;
  }
): Promise<APIResponse> {
  /* While Mocking */
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    return { result: true };
  }

  try {
    const response = params.picture
      ? await CoreAPI.editBid(
          params.id,
          {
            description: params.description,
            price: params.price,
            picture: params.picture,
          },
          cookies().get("auth")?.value ?? ""
        )
      : await CoreAPI.editBid(
          params.id,
          { description: params.description, price: params.price },
          cookies().get("auth")?.value ?? ""
        );
    if (response.status === 200)
      return {
        result: true,
        message: response.data.message,
        data: response.data.id,
      };
    else return { result: false, message: response.data.message };
  } catch (error: any) {
    console.log(error.response.data.message);
    return { result: false, message: error.response.data.message };
  }
}

export async function acceptOffer(offerId: string): Promise<APIResponse> {
  /* While Mocking */
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    return { result: true };
  }

  try {
    const response = await CoreAPI.acceptBid(
      offerId,
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
