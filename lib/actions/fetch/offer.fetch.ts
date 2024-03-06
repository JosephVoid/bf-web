import { IOffer } from "@/lib/types";
import mockOffers from "../../mock/offers.json";
import { wait } from "@/lib/helpers";

export async function fetchOffers(desireId: number): Promise<IOffer[]> {
  await wait();
  const offers = mockOffers as unknown;
  return offers as IOffer[];
}

export async function fetchUserOffers(userId: number): Promise<IOffer[]> {
  await wait();
  const offers = mockOffers as unknown;
  return offers as IOffer[];
}
