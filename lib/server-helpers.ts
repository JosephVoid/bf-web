"use server";

import { JwtPayload, jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export async function getUserId() {
  /* While Mocking */
  if (process.env.NEXT_PUBLIC_API_MOCK)
    return "e03291f5-e54e-11ee-8430-704d7bc2ec86";
  const token = cookies().get("auth")?.value;
  if (token) {
    const decodedJWT = <JwtPayload & { userId: string }>jwtDecode(token);
    return decodedJWT.userId!;
  }
  return null;
}
