import { Cross1Icon, ExitIcon } from "@radix-ui/react-icons";
import { TagSelect } from "./display-params";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export default function SetAlert() {
  return (
    <>
      <h2 className="text-2xl font-medium mb-3"> Set Alerts</h2>
      <div className="rounded-md p-4 border-[1px] mb-8 flex flex-col">
        <div className="flex space-x-5 items-center mb-4">
          <TagSelect tags={frameworks} />
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
