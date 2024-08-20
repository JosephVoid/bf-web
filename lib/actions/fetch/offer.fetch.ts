"use server";
import { IOffer } from "@/lib/types";
import mockOffers from "../../mock/offers.json";
import { wait } from "@/lib/helpers";
import { CoreAPI } from "@/lib/api";

export async function fetchOffers(desireId: string): Promise<IOffer[]> {
  /* While Mocking */
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    await wait();
    const offers = mockOffers as unknown;
    return offers as IOffer[];
  }

  try {
    const response = await CoreAPI.getAllBids(desireId);
    return <IOffer[]>response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchSingleOffer(
  offerId: string
): Promise<IOffer | undefined> {
  /* While Mocking */
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    await wait();
    const offers = mockOffers as unknown;
    return (offers as IOffer[]).find((offer) => offer.id === offerId);
  }

  try {
    const response = await CoreAPI.getSingleBid(offerId);
    return <IOffer>response.data;
  } catch (error) {
    console.log();
  }
}

export async function fetchUserOffers(userId: string): Promise<IOffer[]> {
  /* While Mocking */
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    await wait();
    const offers = mockOffers as unknown;
    return offers as IOffer[];
  }

  try {
    const response = await CoreAPI.getUserBids(userId);
    return <IOffer[]>response.data;
  } catch (error) {
    return [];
  }
}
