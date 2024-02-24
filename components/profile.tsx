import { Button } from "@/components/ui/button";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "./ui/card";

export default function Profile() {
  return (
    <div className="p-4 mb-3 flex flex-col relative justify-center items-center border-[1px] rounded-lg">
      <FontAwesomeIcon className="w-1/2 mb-4 text-muted" icon={faUserCircle} />
      <div>
        <Button>Sign In</Button>
      </div>
    </div>
  );
}
