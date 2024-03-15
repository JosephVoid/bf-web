"use client";

import * as React from "react";
import { SortBySelect, TagSelect } from "./tag-sort-select";
import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function DisplayParams() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function setURL(tagId?: string, sortBy?: string, sortDir?: string) {
    const params = new URLSearchParams(searchParams);
    if (tagId) params.set("tag", tagId);
    if (sortBy) params.set("sortby", sortBy);
    if (sortDir) params.set("sortdir", sortDir);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex justify-start">
      <TagSelect onSelectProp={(tag) => setURL(tag.id)} />
      <SortBySelect
        onSelectProp={(params) => setURL(undefined, params[0], params[1])}
      />
    </div>
  );
}
