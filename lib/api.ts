import axios, { AxiosInstance, AxiosResponse } from "axios";

class APIStub {
  private static _instance: any;

  private baseURL: string = process.env.NEXT_PUBLIC_BASE_URL ?? "";

  set setAuthToken(token: string) {
    this.axios.defaults.headers.common.Authorization = token;
  }

  private axios: AxiosInstance = axios.create({
    baseURL: this.baseURL,
  });

  constructor() {
    if (APIStub._instance) {
      return APIStub._instance;
    }
    APIStub._instance = this;
  }

  async signIn(body: any): Promise<AxiosResponse> {
    return this.axios.post("/auth/", body);
  }

  async signUp(body: any): Promise<AxiosResponse> {
    return this.axios.post("/auth/signup/", body);
  }
}

const API = new APIStub();
export default API;
