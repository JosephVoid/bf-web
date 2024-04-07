"use server";

import { CoreAPI } from "@/lib/api";
import { wait } from "@/lib/helpers";
import { IOfferMakeParams } from "@/lib/types";
import { cookies } from "next/headers";

export async function makeOffer(
  params: Omit<IOfferMakeParams, "picture"> & {
    picture?: string | null;
    desireId: string;
  }
): Promise<string | boolean> {
  /* While Mocking */
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    return true;
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
    if (response.status === 200) return response.data.id;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function acceptOffer(offerId: string, userId: string) {
  await wait();
  return true;
}
