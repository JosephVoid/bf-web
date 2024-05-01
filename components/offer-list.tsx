import { IOffer } from "@/lib/types";
import React from "react";
import { ArchiveIcon } from "@radix-ui/react-icons";
import { Offer } from "./offer";

function OfferList({ offerList }: { offerList: IOffer[] }) {
  return offerList.length > 0 ? (
    <div>
      {offerList
        .sort(
          (a, b) => new Date(a.bidOn).getTime() - new Date(b.bidOn).getTime()
        )
        .map((offer: IOffer, index: number) => (
          <Offer key={index} prop={offer} />
        ))}
    </div>
  ) : (
    <div className="flex justify-center">
      <div className="flex flex-col items-center text-lg my-6 opacity-45">
        <ArchiveIcon width={40} height={40} className="mb-4" />
        No Offers
      </div>
    </div>
  );
}

export default OfferList;
