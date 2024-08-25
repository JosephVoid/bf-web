import { IOffer } from "@/lib/types";
import React from "react";
import { ArchiveIcon } from "@radix-ui/react-icons";
import { Offer } from "./offer";
import { useTranslations } from "next-intl";

function OfferList({ offerList }: { offerList: IOffer[] }) {
  const t = useTranslations();

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
        {t("HomePage.no-offers")}
      </div>
    </div>
  );
}

export default OfferList;
