import { expect, test } from "vitest";
import { AuthAPI, CoreAPI } from "@/lib/api";
import { AxiosError } from "axios";

test("Sign In Negative Test", async () => {
  try {
    const resp = await AuthAPI.signIn({ email: "", password: "" });
  } catch (error: unknown) {
    const axiosErr = <AxiosError>error;
    expect(axiosErr.response?.status).toBe(401);
  }
});

test("Sign In Test", async () => {
  try {
    const resp = await AuthAPI.signIn({
      email: "yosephten@gmail.com",
      password: "12345678",
    });
    expect(resp.status).toBe(200);
    expect(resp.data).not.toBe("");
    expect(resp.data).not.toBe(undefined);
    expect(resp.data).not.toBe(null);
  } catch (error: unknown) {}
});

test("Sign In and View", async () => {
  const authResp = await AuthAPI.signIn({
    email: "yosephten@gmail.com",
    password: "12345678",
  });
  expect(authResp.status).toBe(200);
  CoreAPI.setAuthToken(authResp.data);
  const coreResp = await CoreAPI.viewItem(
    "95999305-ea0a-4e29-ba89-1527b111893b"
  );
  expect(coreResp.status).toBe(200);
});
