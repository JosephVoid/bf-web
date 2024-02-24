import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "./ui/card";

export default function PostBanner() {
  return (
    <div className="p-5 font-bold text-wrap mt-3 cursor-pointer relative flex justify-between border-[1px] rounded-lg">
      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
        Post Your Desire
      </h2>
      <FontAwesomeIcon icon={faArrowRight} className="w-[10%]" />
    </div>
  );
}
