import { fetchOffers, fetchUserOffers } from "@/lib/actions/fetch/offer.fetch";
import { Offer } from "./offer-list";
import { IOffer } from "@/lib/types";

export default async function UserOfferList() {
  const offerList = await fetchUserOffers(0);
  return (
    <div>
      <h2 className="text-2xl font-medium mb-3">You Offered</h2>
      {offerList.map((offer: IOffer, index) => (
        <Offer key={index} prop={offer} />
      ))}
    </div>
  );
}
