"use server";

import { CoreAPI } from "@/lib/api";
import { wait } from "@/lib/helpers";
import mockTags from "@/lib/mock/tags.json";
import { ITag } from "@/lib/types";

export async function fetchTags(): Promise<ITag[]> {
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    await wait();
    const tags = mockTags as unknown;
    return tags as ITag[];
  }

  try {
    const response = await CoreAPI.getTags();
    return <ITag[]>response.data;
  } catch (error) {
    return [];
  }
}
