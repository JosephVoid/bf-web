"use client";

import { usePathname } from "next/navigation";
import Banner from "./banner";

const BottomBanner = () => {
  const current_path = usePathname();
  return current_path === "/" ? (
    <div className="md:hidden flex justify-center gap-3 sticky bottom-0 bg-white py-4 border-t-[1px] rounded-t-md rounded-r-md flex-col items-center">
      <p className="font-extralight italic m-0">
        Do you want something? Post it!
      </p>
      <Banner text="LeftSide.post-a-desire" href="post-a-desire" />
    </div>
  ) : (
    <></>
  );
};

export default BottomBanner;
