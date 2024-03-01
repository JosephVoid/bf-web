import { Offer } from "./offer-list";

export default function UserOfferList() {
  return (
    <div>
      <h2 className="text-2xl font-medium mb-3">You Offered</h2>
      {Array.from({ length: 2 }).map((_, index) => (
        <Offer key={index} />
      ))}
    </div>
  );
}
