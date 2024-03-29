import { wait } from "@/lib/helpers";
import { IOfferMakeParams } from "@/lib/types";

export async function makeOffer(params: IOfferMakeParams) {
  await wait();
  return true;
}

export async function acceptOffer(offerId: string, userId: string) {
  await wait();
  return true;
}
