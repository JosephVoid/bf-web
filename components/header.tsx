"use client";

import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const current_path = usePathname();
  const router = useRouter();

  function getHeader() {
    if (current_path.split("/")[1] === "profile") return "Profile";
    else if (current_path.split("/")[2] === "make-an-offer") return "Offer";
    else if (
      current_path.split("/")[2] !== "make-an-offer" &&
      current_path.split("/")[2] !== undefined
    )
      return "Offers";
    else return "Desires";
  }

  function goBack() {
    let backPath = current_path.split("/");
    if (backPath.length >= 2 && backPath[1] !== "") {
      backPath.pop();
      router.replace(`/${backPath.join("")}`);
    }
  }

  return (
    <div className="ml-6 flex items-center">
      {current_path.split("/").length >= 2 &&
        current_path.split("/")[1] !== "" && (
          <ArrowLeftIcon
            width={40}
            className="scale-150 -translate-x-3 cursor-pointer"
            onClick={goBack}
          />
        )}
      <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl text-center">
        {getHeader()}
      </h1>
    </div>
  );
}
