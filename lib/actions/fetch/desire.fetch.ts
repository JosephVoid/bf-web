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
  filterParams?: IFilterParams
): Promise<IDesireMeta> {
  await wait();
  const desires = mockDesires as unknown;
  const resultDesires = desires as IDesire[];
  const filtereDesires = resultDesires.slice(
    3 * (Number(filterParams?.page ?? 1) - 1),
    Number(filterParams?.page ?? 1) * 3
  );

  const desiresWMeta = {
    meta: {
      total: 9,
      page: Number(filterParams?.page) ?? 1,
      perPage: 3,
    },
    result: filtereDesires,
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
