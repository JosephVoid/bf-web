import { getCookie } from "cookies-next";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { IFilterParams } from "./types";

export async function wait() {
  return new Promise((res) => setTimeout(res, Math.random() * 2000));
}

export async function urlToFile(url?: string): Promise<File | null> {
  if (!url) return null;
  let response = await fetch(url);
  let fileBlob = await response.blob();
  return new File([fileBlob], "");
}

export function getUUID(str: string) {
  let temp = str.split("-");
  temp.length = 5;
  return temp.join("-");
}

export function getTitle(str: string) {
  let temp = str.slice(37);
  return decodeURIComponent(temp);
}

export function getUserId() {
  const token = getCookie("auth") ?? "";
  const decodedJWT = <JwtPayload & { userId: string }>jwtDecode(token);
  return decodedJWT.userId!;
}

export function transformParams(FP: IFilterParams): IFilterParams {
  switch (FP.sortBy) {
    case "Date":
      FP.sortBy = "created";
      FP.sortDir = FP.sortDir.toUpperCase();
      return FP;
    case "Price":
      FP.sortBy = "desired_price";
      FP.sortDir = FP.sortDir.toUpperCase();
      return FP;
    case "Wanted":
      FP.sortBy = "wants";
      FP.sortDir = FP.sortDir.toUpperCase();
      return FP;
    default:
      return FP;
  }
}
