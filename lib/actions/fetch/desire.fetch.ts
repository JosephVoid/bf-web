"use server";

import {
  IDesire,
  IDesireMeta,
  IFilterParams,
  IPaginationParams,
  ISearchParams,
} from "@/lib/types";
import mockDesires from "../../mock/desires.json";
import { transformParams, wait } from "@/lib/helpers";
import { CoreAPI } from "@/lib/api";

export async function fetchDesires(
  filterParams: IFilterParams
): Promise<IDesireMeta | null> {
  /* While Mocking */
  if (process.env.NEXT_PUBLIC_API_MOCK) {
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

  try {
    const response = await CoreAPI.getDesires(transformParams(filterParams));
    return <IDesireMeta>response.data;
  } catch (error) {
    return null;
  }
}

export async function fetchUserPostedDesires(
  userId: number
): Promise<IDesire[]> {
  await wait();
  const desires = mockDesires as unknown;
  return desires as IDesire[];
}

export async function fetchSingleDesire(
  id: string
): Promise<IDesire | undefined> {
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    await wait();
    console.log(id);
    const desires = mockDesires as unknown;
    return (desires as IDesire[]).find((desire) => desire.id === id);
  }

  try {
    const response = await CoreAPI.getSingleDesire(id);
    return <IDesire>response.data;
  } catch (error) {
    console.log(error);
  }
}
