import { IOffer } from "@/lib/types";
import mockOffers from "../../mock/offers.json";
import { wait } from "@/lib/helpers";

export async function fetchOffers(desireId: string): Promise<IOffer[]> {
  await wait();
  const offers = mockOffers as unknown;
  return offers as IOffer[];
}

export async function fetchSingleOffer(
  offerId: string
): Promise<IOffer | undefined> {
  await wait();
  const offers = mockOffers as unknown;
  return (offers as IOffer[]).find((offer) => offer.id === offerId);
}

export async function fetchUserOffers(userId: string): Promise<IOffer[]> {
  await wait();
  const offers = mockOffers as unknown;
  return offers as IOffer[];
}
