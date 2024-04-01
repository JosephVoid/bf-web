import { expect, test } from "vitest";
import API from "@/lib/api";
import { AxiosError } from "axios";

test("Sign In Negative Test", async () => {
  try {
    const resp = await API.signIn({ username: "", password: "" });
  } catch (error: unknown) {
    const axiosErr = <AxiosError>error;
    expect(axiosErr.response?.status).toBe(401);
  }
});

test("Sign In Test", async () => {
  try {
    const resp = await API.signIn({
      username: "yosephten@gmail.com",
      password: "12345678",
    });
    expect(resp.status).toBe(200);
    expect(resp.data).not.toBe("");
    expect(resp.data).not.toBe(undefined);
    expect(resp.data).not.toBe(null);
  } catch (error: unknown) {}
});
