import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PostBanner() {
  return (
    <div className="p-4 font-bold text-wrap mt-3 bg-brand-dark-blue text-white rounded-md relative">
      <FontAwesomeIcon
        icon={faArrowRight}
        className="absolute w-1/6 top-3 right-3 -rotate-45 text-brand-yellow"
      />
      <p className="text-5xl">Post your desire</p>
    </div>
  );
}
