import { getCookie } from "cookies-next";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { IFilterParams } from "./types";
import Tips from "./tips.json";

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
  /* While Mocking */
  if (process.env.NEXT_PUBLIC_API_MOCK)
    return "e03291f5-e54e-11ee-8430-704d7bc2ec86";
  const token = getCookie("auth");
  if (token) {
    const decodedJWT = <JwtPayload & { userId: string }>jwtDecode(token);
    return decodedJWT.userId!;
  }
  return null;
}

export function getUserFromTokenId(jwt: string) {
  /* While Mocking */
  if (process.env.NEXT_PUBLIC_API_MOCK)
    return "e03291f5-e54e-11ee-8430-704d7bc2ec86";
  const decodedJWT = <JwtPayload & { userId: string }>jwtDecode(jwt);
  if (decodedJWT.userId) {
    return decodedJWT.userId;
  }
  return null;
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

export function fileToBase64(file: File | undefined): Promise<string> | null {
  if (file) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          const base64String = reader.result; // Extract base64 string from result
          resolve(base64String);
        } else {
          reject(new Error("Failed to read file as base64"));
        }
      };
      reader.onerror = (error) => reject(error);
    });
  }

  return null;
}

export function Base64ToBlob(base64Image: string) {
  const parts = base64Image.split(";base64,");

  const imageType = parts[0].split(":")[1];

  const decodedData = atob(parts[1]);

  const uInt8Array = new Uint8Array(decodedData.length);

  for (let i = 0; i < decodedData.length; ++i) {
    uInt8Array[i] = decodedData.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: imageType });
}

export function sanitizeRandomizeName(name: string) {
  const randomInt = Math.floor(1000 + Math.random() * 9000);
  return randomInt + "-" + name.replaceAll(" ", "-");
}

export function getTips(currentPath: string) {
  switch (currentPath) {
    case "":
      return Tips.home;
    case "profile":
      return Tips.profile;
    case "post-a-desire":
      return Tips.postingDesire;
    case "make-an-offer":
      return Tips.makingOffer;
    case "search":
      return Tips.home;
    default:
      return Tips.singleDesire;
  }
}
