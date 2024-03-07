"use client";

import { ITag } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuCheckboxItemProps,
} from "@radix-ui/react-dropdown-menu";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import React from "react";
import { Button } from "./ui/button";
import { fetchTags } from "@/lib/actions/fetch/tags.fetch";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export function TagSelect({
  onSelectProp,
}: {
  onSelectProp?: (tag: ITag) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [tags, setTags] = React.useState<ITag[]>([]);

  React.useEffect(() => {
    fetchTags().then((result) => setTags(result));
  }, []);

  return (
    <div className="flex flex-col mr-3">
      <Label className="mb-2">Select Tags</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? tags.find((tag) => tag.tag.toLowerCase() === value)?.tag
              : "Select tags"}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command
            filter={(value, search) => {
              if (value.includes(search)) return 1;
              return 0;
            }}
          >
            <CommandInput placeholder="Search tag..." className="h-9" />
            <CommandEmpty>No tag found.</CommandEmpty>
            <CommandGroup>
              {tags.map((tag) => (
                <CommandItem
                  key={tag.id}
                  value={tag.tag}
                  onSelect={(currentValue) => {
                    onSelectProp ? onSelectProp(tag) : null;
                    setValue(currentValue === value ? value : currentValue);
                    setOpen(false);
                  }}
                >
                  {tag.tag}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === tag.tag ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function SortBySelect() {
  const [sortBy, setSortBy] = React.useState("Date");
  const [sortDir, setSortDir] = React.useState("Asc");
  return (
    <div className="flex flex-col mr-3">
      <Label className="mb-2">Sort By</Label>
      <div className="flex">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-36">
              {sortBy}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-24">
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => setSortBy("Date")}>
              Date
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSortBy("Price")}>
              Price
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSortBy("Wanted")}>
              Wanted
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          className="ml-3"
          variant={"ghost"}
          onClick={() => setSortDir(sortDir === "Asc" ? "Desc" : "Asc")}
        >
          {sortDir}
        </Button>
      </div>
    </div>
  );
}
