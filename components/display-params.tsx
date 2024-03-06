import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { fetchTags } from "@/lib/actions/fetch/tags.fetch";
import { SortBySelect, TagSelect } from "./tag-sort-select";

export default async function DisplayParams() {
  const tags = await fetchTags();
  return (
    <div className="flex justify-start">
      <TagSelect tags={tags} />
      <SortBySelect />
    </div>
  );
}
