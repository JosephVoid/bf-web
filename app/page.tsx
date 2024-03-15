"use client";

import DesireList from "@/components/desire-list";
import DisplayParams from "@/components/display-params";
import Paginate from "@/components/paginate";
import { IFilterParams } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const desireListParams: IFilterParams = {
    filterBy: searchParams.get("tag") ?? "",
    sortBy: searchParams.get("sortby") ?? "Date",
    sortDir: searchParams.get("sortdir") ?? "",
    search: searchParams.get("query") ?? "",
    page: searchParams.get("page") ?? "",
  };

  return (
    <main className="flex flex-col h-f-v-h">
      <div className="m-3 rounded-lg p-3 border-[1px]">
        <DisplayParams />
      </div>
      <div className="m-3">
        <Suspense fallback={<>Loading...</>}>
          <DesireList params={desireListParams} />
        </Suspense>
      </div>
    </main>
  );
}
