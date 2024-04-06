"use server";

import { IUser } from "@/lib/types";
import mockUser from "@/lib/mock/users.json";
import mockTags from "@/lib/mock/tags.json";
import { ITag } from "@/lib/types";
import { getUserId, wait } from "@/lib/helpers";
import { CoreAPI } from "@/lib/api";
import { cookies } from "next/headers";

export async function fetchUserProfile(
  userId: string
): Promise<IUser | undefined> {
  /* ---When Mocking---- */
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    await wait();
    const user = mockUser[0] as unknown;
    return <IUser>user;
  }

  try {
    const response = await CoreAPI.getSingleUser(userId);
    return <IUser>response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchUserAlerts(userId: string): Promise<ITag[]> {
  /* ---When Mocking---- */
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    await wait();
    const tags = mockTags as unknown;
    return (<ITag[]>tags).slice(0, 3);
  }

  try {
    const response = await CoreAPI.getAlertTags(userId);
    return <ITag[]>response.data;
  } catch (error) {
    return [];
  }
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
  /* ---When Mocking---- */
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
