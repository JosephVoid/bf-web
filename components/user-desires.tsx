"use server";

import { fetchUserPostedDesires } from "@/lib/actions/fetch/desire.fetch";
import { Desire } from "./desire-list";
import { IDesire } from "@/lib/types";
import { getUserFromTokenId, getUserId } from "@/lib/helpers";
import { cookies } from "next/headers";

export default async function UserDesireList() {
  const userId = getUserFromTokenId(cookies().get("auth")?.value ?? "");
  const userDesire = await fetchUserPostedDesires(userId!);
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-medium mb-3">Posted Desires</h2>
      {userDesire.map((desire: IDesire, index: number) => (
        <Desire key={index} prop={desire} />
      ))}
    </div>
  );
}
