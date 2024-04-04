import { getCookie } from "cookies-next";
import { JwtPayload, jwtDecode } from "jwt-decode";

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
  const token = getCookie("auth") ?? "";
  const decodedJWT = <JwtPayload & { userId: string }>jwtDecode(token);
  return decodedJWT.userId!;
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        const base64String = reader.result.split(",")[1]; // Extract base64 string from result
        resolve(base64String);
      } else {
        reject(new Error("Failed to read file as base64"));
      }
    };
    reader.onerror = (error) => reject(error);
  });
}
