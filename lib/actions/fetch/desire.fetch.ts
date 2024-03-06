import {
  IDesire,
  IFilterParams,
  IPaginationParams,
  ISearchParams,
} from "@/lib/types";
import mockDesires from "../../mock/desires.json";
import { wait } from "@/lib/helpers";

export async function fetchDesires(
  pagination?: IPaginationParams,
  filterParams?: IFilterParams,
  searchParams?: ISearchParams
): Promise<IDesire[]> {
  await wait();
  const desires = mockDesires as unknown;
  return desires as IDesire[];
}

export async function fetchUserPostedDesires(
  userId: number
): Promise<IDesire[]> {
  await wait();
  const desires = mockDesires as unknown;
  return desires as IDesire[];
}
