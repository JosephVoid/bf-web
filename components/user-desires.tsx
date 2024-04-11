"use server";

import { fetchUserPostedDesires } from "@/lib/actions/fetch/desire.fetch";
import { Desire } from "./desire-list";
import { IDesire } from "@/lib/types";
import { getUserFromTokenId, getUserId } from "@/lib/helpers";
import { cookies } from "next/headers";
import { ArchiveIcon } from "@radix-ui/react-icons";

export default async function UserDesireList() {
  const userId = getUserFromTokenId(cookies().get("auth")?.value ?? "");
  const userDesire = await fetchUserPostedDesires(userId!);
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-medium mb-3">Your Posted Desires</h2>
      {userDesire.length < 1 && (
        <div className="flex justify-center">
          <div className="flex flex-col items-center text-lg my-6 opacity-45">
            <ArchiveIcon width={40} height={40} className="mb-4" />
            No Desires
          </div>
        </div>
      )}
      {userDesire.map((desire: IDesire, index: number) => (
        <Desire key={index} prop={desire} />
      ))}
    </div>
  );
}
