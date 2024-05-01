import DesireList from "@/components/desire-list";
import DisplayParams from "@/components/display-params";
import Loader from "@/components/loader";
import Paginate from "@/components/paginate";
import Banner from "@/components/post-desire";
import { IFilterParams } from "@/lib/types";
import { Suspense } from "react";

export default function Home({
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
        <Suspense fallback={<Loader dark />}>
          <DisplayParams />
        </Suspense>
      </div>
      <div className="md:hidden px-3 flex justify-between">
        <Banner text="Post a Desire" href="post-a-desire" />
        <Banner text="Setup Alerts" href="profile" variant="secondary" />
      </div>
      <div className="m-3">
        <Suspense fallback={<Loader dark />}>
          <DesireList params={desireListParams} />
        </Suspense>
      </div>
    </main>
  );
}
