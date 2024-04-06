"use client";

import { Cross1Icon, ExitIcon } from "@radix-ui/react-icons";
import { TagSelect } from "./tag-sort-select";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ITag } from "@/lib/types";
import React from "react";

export default function SetAlert({ alertTags }: { alertTags: ITag[] }) {
  const [selectedtags, setSelectedTags] = React.useState<ITag[]>(alertTags);

  function handleRemoveAlert(id: string) {
    setSelectedTags(selectedtags.filter((tag) => tag.id !== id));
  }

  function handleAddtag(tag: ITag) {
    if (
      !selectedtags.find((sTag) => sTag.id === tag.id) &&
      selectedtags.length < 3
    )
      setSelectedTags([...selectedtags, tag]);
  }

  function alertChanged() {
    if (alertTags.length !== selectedtags.length) return true;

    const sortedAlArr = alertTags.sort((a, b) => a.id.localeCompare(b.id));
    const sortedSlArr = selectedtags.sort((a, b) => a.id.localeCompare(b.id));

    for (let index = 0; index < alertTags.length; index++) {
      if (sortedAlArr[index].id !== sortedSlArr[index].id) return true;
    }

    return false;
  }

  return (
    <>
      <h2 className="text-2xl font-medium mb-3"> Set Alerts</h2>
      <div className="rounded-md p-4 border-[1px] mb-8 flex flex-col">
        <div className="flex space-x-5 items-center mb-4">
          <TagSelect onSelectProp={(tag) => handleAddtag(tag)} />
          <div className="flex flex-wrap justify-start">
            {selectedtags.map((tag, index) => (
              <Badge
                className="text-sm h-fit mr-3 mb-3"
                variant={"outline"}
                key={index}
              >
                {tag.name}
                <Cross1Icon
                  className="ml-2 cursor-pointer"
                  onClick={() => handleRemoveAlert(tag.id)}
                />
              </Badge>
            ))}
          </div>
        </div>
        <Button className="w-1/3" disabled={!alertChanged()}>
          Save Alert
        </Button>
      </div>
    </>
  );
}
