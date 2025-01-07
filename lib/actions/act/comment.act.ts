"use server";

import { CoreAPI } from "@/lib/api";
import { wait } from "@/lib/helpers";
import { APIResponse } from "@/lib/types";
import { cookies } from "next/headers";

export async function postComment(
  entity_id: string,
  comment: string
): Promise<APIResponse> {
  /* While Mocking */
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    await wait();
    console.log({ entity_id, comment });
    return { result: true };
  }

  try {
    const response = await CoreAPI.createComment(
      entity_id,
      { comment },
      cookies().get("auth")?.value ?? ""
    );
    if (response.status === 200) return { result: true };
    else return { result: false, message: response.data.message };
  } catch (error: any) {
    console.log(error.response.data.message);
    return { result: false, message: error.response.data.message };
  }
}
