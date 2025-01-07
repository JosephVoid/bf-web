"use server";

import { CoreAPI } from "@/lib/api";
import { IComment, ICommentResponse } from "@/lib/types";
import { wait } from "@/lib/helpers";
import mockComments from "@/lib/mock/comments.json";

export async function fetchComments(
  entity_id: string,
  page: number,
  perPage: number
): Promise<ICommentResponse | null> {
  /* While Mocking */
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    await wait();
    const comments = mockComments as unknown;
    return {
      meta: {
        total: (comments as IComment[]).length,
        perPage,
        page,
      },
      data: comments as IComment[],
    };
  }

  try {
    const response = await CoreAPI.getComments(entity_id, page, perPage);
    return response.data;
  } catch (error) {
    return null;
  }
}
