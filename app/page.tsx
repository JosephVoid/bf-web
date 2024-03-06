import DesireList from "@/components/desire-list";
import DisplayParams from "@/components/display-params";
import Paginate from "@/components/paginate";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex flex-col h-f-v-h">
      <div className="m-3 rounded-lg p-3 border-[1px]">
        <DisplayParams />
      </div>
      <div className="m-3">
        <Suspense fallback={<>Loading...</>}>
          <DesireList />
        </Suspense>
      </div>
      <div className="m-3">
        <Paginate />
      </div>
    </main>
  );
}
