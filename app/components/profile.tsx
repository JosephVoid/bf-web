import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { faClose } from "@fortawesome/free-solid-svg-icons/faClose";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Profile() {
  return (
    <div className="p-4 flex flex-col relative rounded-md bg-brand-grey justify-center items-center">
      <FontAwesomeIcon
        className="w-1/3 text-brand-dark-blue mb-2"
        icon={faUserCircle}
      />
      <div>
        <button>
          <p className="font-bold">Sign In</p>
        </button>
      </div>
    </div>
  );
}
