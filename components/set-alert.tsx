import { Cross1Icon, ExitIcon } from "@radix-ui/react-icons";
import { TagSelect } from "./tag-sort-select";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { fetchTags } from "@/lib/actions/fetch/tags.fetch";

export default async function SetAlert() {
  const tags = await fetchTags();
  return (
    <>
      <h2 className="text-2xl font-medium mb-3"> Set Alerts</h2>
      <div className="rounded-md p-4 border-[1px] mb-8 flex flex-col">
        <div className="flex space-x-5 items-center mb-4">
          <TagSelect tags={tags} />
          <div className="flex space-x-3">
            <Badge className="text-sm" variant={"outline"}>
              Electornics
              <Cross1Icon className="ml-2" />
            </Badge>
            <Badge variant={"outline"}>
              Electornics <Cross1Icon className="ml-2" />
            </Badge>
          </div>
        </div>
        <Button className="w-1/3">Set Alert</Button>
      </div>
    </>
  );
}
