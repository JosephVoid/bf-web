"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function Search() {
  const currentQueries = useSearchParams().toString();
  const router = useRouter();
  const [searchQ, setSearchQ] = React.useState("");
  const params = new URLSearchParams(useSearchParams());

  function handleSearchClick() {
    params.set("query", searchQ);
    router.push(`/search?${params.toString()}`);
  }

  return (
    <div className="flex w-full max-w-sm items-center space-x-2 mt-3">
      <Input
        type="text"
        placeholder="Search Desires"
        onChange={(e) => setSearchQ(e.target.value)}
        defaultValue={useSearchParams().get("query") ?? ""}
      />
      <Button type="submit" className="relative" onClick={handleSearchClick}>
        <FontAwesomeIcon
          icon={faSearch}
          className="text-muted w-1/2 absolute"
        />
      </Button>
    </div>
  );
}
