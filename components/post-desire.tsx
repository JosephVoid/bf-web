import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "./ui/card";

export default function PostBanner() {
  return (
    <Card className="p-8 font-bold text-wrap mt-3 cursor-pointer relative border">
      <FontAwesomeIcon
        icon={faArrowRight}
        className="absolute w-[8%] top-3 right-3 -rotate-45 text-brand-yellow"
      />
      <p className="text-4xl">Post Your Desire</p>
    </Card>
  );
}
