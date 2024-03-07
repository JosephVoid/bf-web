import { IUser } from "@/lib/types";
import mockUser from "@/lib/mock/users.json";

export async function fetchUserProfile(userId: number): Promise<IUser> {
  const user = mockUser[0] as unknown;
  return <IUser>user;
}

export async function fetchUserAlerts(userId: number) {}
