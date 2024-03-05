import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import Link from "next/link";

export default function Search() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2 mt-3">
      <Input type="text" placeholder="Search Desires" />
      <Link href={`/search`}>
        <Button type="submit" className="relative">
          <FontAwesomeIcon
            icon={faSearch}
            className="text-muted w-1/2 absolute"
          />
        </Button>
      </Link>
    </div>
  );
}
