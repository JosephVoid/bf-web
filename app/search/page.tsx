import DesireList from "@/components/desire-list";
import DisplayParams from "@/components/display-params";
import Paginate from "@/components/paginate";

export default function Search() {
  return (
    <main className="flex flex-col h-f-v-h">
      <div className="m-3 rounded-lg p-3 border-[1px]">
        <DisplayParams />
      </div>
      <div className="m-3">
        <DesireList />
      </div>
      <div className="m-3">
        <Paginate />
      </div>
    </main>
  );
}
