import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "./ui/card";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export default function PostBanner() {
  return (
    <div className="p-5 font-bold text-wrap mt-3 cursor-pointer relative flex justify-between border-[1px] rounded-lg items-center">
      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
        Post Your Desire
      </h2>
      <ArrowRightIcon width={35} className="scale-150 translate-x-2" />
    </div>
  );
}
