import { IUser } from "@/lib/types";
import mockUser from "@/lib/mock/users.json";
import mockTags from "@/lib/mock/tags.json";
import { ITag } from "@/lib/types";
import { wait } from "@/lib/helpers";

export async function fetchUserProfile(userId: number): Promise<IUser> {
  await wait();
  const user = mockUser[0] as unknown;
  return <IUser>user;
}

export async function fetchUserAlerts(userId: number): Promise<ITag[]> {
  await wait();
  const tags = mockTags as unknown;
  return (<ITag[]>tags).slice(0, 3);
}
