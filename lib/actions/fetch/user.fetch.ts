"use server";

import { IUser } from "@/lib/types";
import mockUser from "@/lib/mock/users.json";
import mockTags from "@/lib/mock/tags.json";
import { ITag } from "@/lib/types";
import { getUserId, wait } from "@/lib/helpers";
import { CoreAPI } from "@/lib/api";
import { cookies } from "next/headers";

export async function fetchUserProfile(userId: string): Promise<IUser> {
  /* ---When Mocking---- */
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    await wait();
    const user = mockUser[0] as unknown;
    return <IUser>user;
  }

  const response = await CoreAPI.getSingleUser(userId);
  return <IUser>response.data;
}

export async function fetchUserAlerts(userId: string): Promise<ITag[]> {
  await wait();
  const tags = mockTags as unknown;
  return (<ITag[]>tags).slice(0, 3);
}

export async function fetchUserActivity(
  userId: string,
  activityType:
    | "offered"
    | "wanted"
    | "accepted"
    | "viewed-desire"
    | "viewed-bid"
): Promise<string[]> {
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    await wait();
    return ["a", "b", "c"];
  }
  try {
    const response = await CoreAPI.getActivity(
      userId,
      activityType,
      cookies().get("auth")?.value ?? ""
    );
    return <string[]>response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
