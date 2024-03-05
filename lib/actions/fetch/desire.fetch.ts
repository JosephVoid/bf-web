import { IFilterParams, IPaginationParams, ISearchParams } from "@/lib/types";

export async function fetchDesires(
  pagination: IPaginationParams,
  filterParams?: IFilterParams,
  searchParams?: ISearchParams
) {}

export async function fetchUserPostedDesires(userId: number) {}
