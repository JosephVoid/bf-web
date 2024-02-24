import DesireList from "@/components/desire-list";
import DisplayParams from "@/components/display-params";
import Paginate from "@/components/paginate";

export default function Home() {
  return (
    <main className="flex flex-col h-f-v-h">
      <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl text-center mb-5">
        Desires
      </h1>
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
