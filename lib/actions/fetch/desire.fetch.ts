import {
  IDesire,
  IDesireMeta,
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
): Promise<IDesireMeta> {
  await wait();
  const desires = mockDesires as unknown;
  const desiresWMeta = {
    meta: {
      total: 9,
      page: 1,
      perPage: 3,
    },
    result: desires as IDesire[],
  } as IDesireMeta;
  return desiresWMeta;
}

export async function fetchUserPostedDesires(
  userId: number
): Promise<IDesire[]> {
  await wait();
  const desires = mockDesires as unknown;
  return desires as IDesire[];
}
