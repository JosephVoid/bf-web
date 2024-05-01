"use server";

import {
  IDesire,
  IDesireMeta,
  IFilterParams,
  IPaginationParams,
  ISearchParams,
} from "@/lib/types";
import mockDesires from "../../mock/desires.json";
import mockTags from "../../mock/tags.json";
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
    const searchedDesires = resultDesires.filter((d) =>
      d.title.toLowerCase().includes(filterParams.search.toLowerCase())
    );

    const tag = mockTags.find((t) => t.id === filterParams.filterBy);

    const filteredDesires = tag
      ? searchedDesires.filter((d) => d.tags.includes(tag?.name))
      : searchedDesires;

    const pagedDesires = filteredDesires.slice(
      (Number(filterParams?.page) - 1) * 3,
      Number(filterParams?.page) * 3
    );

    const desiresWMeta = {
      meta: {
        total: filteredDesires.length,
        page: Number(filterParams?.page) ?? 1,
        perPage: 3,
      },
      result: pagedDesires,
    } as IDesireMeta;
    return desiresWMeta;
  }

  try {
    const response =
      filterParams.search !== ""
        ? await CoreAPI.searchDesires(
            transformParams(filterParams),
            filterParams.search
          )
        : await CoreAPI.getDesires(transformParams(filterParams));
    return <IDesireMeta>response.data;
  } catch (error) {
    return null;
  }
}

export async function fetchUserPostedDesires(
  userId: string
): Promise<IDesire[]> {
  /* While Mocking */
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    await wait();
    const desires = mockDesires as unknown;
    return desires as IDesire[];
  }

  try {
    const response = await CoreAPI.getUserDesires(userId);
    return <IDesire[]>response.data;
  } catch (error) {
    return [];
  }
}

export async function fetchSingleDesire(
  id: string
): Promise<IDesire | undefined> {
  /* While Mocking */
  if (process.env.NEXT_PUBLIC_API_MOCK) {
    await wait();
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
