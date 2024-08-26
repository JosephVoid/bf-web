"use client";

import {
  CheckIcon,
  Cross1Icon,
  ExclamationTriangleIcon,
  ExitIcon,
} from "@radix-ui/react-icons";
import { TagSelect } from "./tag-sort-select";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ITag } from "@/lib/types";
import React from "react";
import { setAlerts } from "@/lib/actions/act/user.act";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function SetAlert({ alertTags }: { alertTags: ITag[] }) {
  /* These methods ensure that this component is rendered on the client
   */
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const [selectedtags, setSelectedTags] = React.useState<ITag[]>(alertTags);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();
  const t = useTranslations();

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

  async function saveAlerts() {
    setIsLoading(true);
    const alerts: string[] = [];
    selectedtags.forEach((tag) => alerts.push(tag.id));
    const response = await setAlerts(alerts);

    toast({
      title: (
        <div className="flex items-center">
          {response.result && (
            <>
              {" "}
              <CheckIcon className="mr-2" />
              <span className="first-letter:capitalize">Alerts Updated</span>
            </>
          )}
          {!response.result && (
            <>
              <ExclamationTriangleIcon className="mr-2" />
              <span className="first-letter:capitalize">
                {response.message}
              </span>
            </>
          )}
        </div>
      ),
    });

    setIsLoading(false);
    setTimeout(() => window.location.reload(), 1000);
  }

  return isClient ? (
    <>
      <h2 className="text-2xl font-medium mb-3">
        {t("Forms.profile.set-alert")}
      </h2>
      <div className="rounded-md p-4 border-[1px] mb-8 flex flex-col">
        <div className="flex space-x-5 md:items-center mb-4 md:flex-row flex-col items-start">
          <TagSelect onSelectProp={(tag) => handleAddtag(tag)} />
          <div className="flex flex-wrap justify-start mt-3 md:mt-0">
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
        <Button
          className="w-1/3"
          disabled={!alertChanged()}
          onClick={saveAlerts}
        >
          Save Alert
        </Button>
      </div>
    </>
  ) : (
    <></>
  );
}
