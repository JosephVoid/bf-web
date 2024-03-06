import { wait } from "@/lib/helpers";
import mockTags from "@/lib/mock/tags.json";
import { ITag } from "@/lib/types";

export async function fetchTags(): Promise<ITag[]> {
  await wait();
  const tags = mockTags as unknown;
  return tags as ITag[];
}
