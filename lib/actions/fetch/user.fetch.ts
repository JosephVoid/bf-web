import { IUser } from "@/lib/types";
import mockUser from "@/lib/mock/users.json";
import mockTags from "@/lib/mock/tags.json";
import { ITag } from "@/lib/types";
import { wait } from "@/lib/helpers";

export async function fetchUserProfile(userId: string): Promise<IUser> {
  await wait();
  const user = mockUser[0] as unknown;
  return <IUser>user;
}

export async function fetchUserAlerts(userId: string): Promise<ITag[]> {
  await wait();
  const tags = mockTags as unknown;
  return (<ITag[]>tags).slice(0, 3);
}

export async function fetchUserActivity(
  userId: string,
  activityType: "OFFER" | "WANT" | "ACCEPT" | "VIEW"
): Promise<String[]> {
  await wait();
  return ["a", "b", "c"];
}
