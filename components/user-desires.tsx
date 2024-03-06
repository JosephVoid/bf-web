import { fetchUserPostedDesires } from "@/lib/actions/fetch/desire.fetch";
import { Desire } from "./desire-list";
import { IDesire } from "@/lib/types";

export default async function UserDesireList() {
  const userDesire = await fetchUserPostedDesires(0);
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-medium mb-3">Posted Desires</h2>
      {userDesire.map((desire: IDesire, index: number) => (
        <Desire key={index} prop={desire} />
      ))}
    </div>
  );
}
