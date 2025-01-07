import DesireList from "@/components/desire-list";
import DisplayParams from "@/components/display-params";
import Loader from "@/components/loader";
import { IFilterParams } from "@/lib/types";
import { Suspense } from "react";

export default function Search({
  searchParams,
}: {
  searchParams: {
    sortby?: string;
    sortdir?: string;
    query?: string;
    page?: string;
    tag?: string;
  };
}) {
  const desireListParams: IFilterParams = {
    filterBy: searchParams.tag ?? "",
    sortBy: searchParams.sortby ?? "",
    sortDir: searchParams.sortdir ?? "",
    search: searchParams.query ?? "",
    page: searchParams.page ?? "1",
  };

  return (
    <main className="flex flex-col h-f-v-h">
      <div className="m-3 rounded-lg p-3 border-[1px]">
        <Suspense
          fallback={
            <div className="flex justify-center h-screen my-20">
              <Loader dark large />
            </div>
          }
        >
          <DisplayParams />
        </Suspense>
      </div>
      <div className="m-3">
        <DesireList params={desireListParams} />
      </div>
    </main>
  );
}
