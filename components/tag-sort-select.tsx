"use client";

import { ITag } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  CheckIcon,
} from "@radix-ui/react-icons";
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
import { useSearchParams } from "next/navigation";
import { ScrollArea } from "./ui/scroll-area";
import useFetchTags from "@/lib/hooks/useFetchTags";
import { useTranslations } from "next-intl";

export function TagSelect({
  onSelectProp,
}: {
  onSelectProp?: (tag: ITag) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const searchParams = useSearchParams();
  // Fetch and cache
  const { data: tags, isSuccess } = useFetchTags();
  // Memoize the tags to not repeat without need
  const tag = React.useMemo(() => {
    if (isSuccess) {
      const tagId = searchParams.get("tag");
      return tags?.find((tag) => tag.id === tagId);
    }
    return null;
  }, [tags, isSuccess, searchParams]);
  const t = useTranslations();

  React.useEffect(() => {
    if (tag) {
      setValue(tag.name.toLowerCase());
    }
  }, [tag]);

  return (
    <div className="flex flex-col mr-3">
      <Label className="mb-2">{t("MainPage.select-tags")}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="md:w-[200px] justify-between"
          >
            {value
              ? tags?.find(
                  (tag) => tag.name.toLowerCase() === value.toLowerCase()
                )?.name
              : t("MainPage.choose-tag")}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command
            filter={(value, search) => {
              if (value.includes(search.toLowerCase())) return 1;
              return 0;
            }}
          >
            <CommandInput placeholder="Search tag..." className="h-9" />
            <ScrollArea className="h-32">
              <CommandEmpty>No tag found.</CommandEmpty>
              <CommandGroup>
                {tags
                  ?.sort((a, b) => a.name.localeCompare(b.name))
                  .map((tag) => (
                    <CommandItem
                      key={tag.id}
                      value={tag.name}
                      onSelect={(currentValue) => {
                        onSelectProp ? onSelectProp(tag) : null;
                        setValue(currentValue === value ? value : currentValue);
                        setOpen(false);
                      }}
                    >
                      {tag.name}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === tag.name ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function SortBySelect({
  onSelectProp,
}: {
  onSelectProp: ([]: string[]) => void;
}) {
  const searchParams = useSearchParams();
  let sortByURL = searchParams.get("sortby");
  let sortDirURL = searchParams.get("sortdir");

  const [sortBy, setSortBy] = React.useState(sortByURL ?? "Date");
  const [sortDir, setSortDir] = React.useState(sortDirURL ?? "Desc");
  const t = useTranslations();

  React.useEffect(() => {
    onSelectProp([sortBy, sortDir]);
  }, [sortBy, sortDir]);

  return (
    <div className="flex flex-col mr-3">
      <Label className="mb-2">{t("MainPage.sort-by")}</Label>
      <div className="flex">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="md:w-36 flex justify-between">
              {t(`MainPage.${sortBy.toLowerCase()}-filter`)}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="md:w-24">
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => setSortBy("Date")}>
              {t("MainPage.date-filter")}
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSortBy("Price")}>
              {t("MainPage.price-filter")}
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSortBy("Wanted")}>
              {t("MainPage.wanted-filter")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          className="ml-3"
          variant={"link"}
          onClick={() => setSortDir(sortDir === "Asc" ? "Desc" : "Asc")}
        >
          <div className="md:block hidden">
            {t(`MainPage.${sortDir.toLowerCase()}`)}
          </div>
          <div className="md:hidden">
            {sortDir === "Asc" ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </div>
        </Button>
      </div>
    </div>
  );
}
