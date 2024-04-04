import axios, { AxiosInstance, AxiosResponse } from "axios";
import { IFilterParams } from "./types";
import { getCookie } from "cookies-next";

class APIStub {
  protected axios: AxiosInstance;

  constructor(baseURL: string) {
    this.axios = axios.create({
      baseURL: baseURL,
    });
  }
}

class AuthStub extends APIStub {
  constructor() {
    super(process.env.NEXT_PUBLIC_AUTH_BASE_URL ?? "");
  }

  async signIn(body: {
    email: string;
    password: string;
  }): Promise<AxiosResponse> {
    return this.axios.post("/auth", body);
  }

  async signUp(body: any): Promise<AxiosResponse> {
    return this.axios.post("/auth/signup", body);
  }

  async sendOTP(body: any): Promise<AxiosResponse> {
    return this.axios.post("/auth/send-otp", body);
  }
}

class CoreStub extends APIStub {
  constructor() {
    super(process.env.NEXT_PUBLIC_CORE_BASE_URL ?? "");
  }

  async createDesires(body: any): Promise<AxiosResponse> {
    return this.axios.post(`/desires/create`, body, {
      headers: { Authorization: getCookie("auth") },
    });
  }

  async wantDesires(id: string): Promise<AxiosResponse> {
    return this.axios.post(`/desires/want/${id}`, null, {
      headers: { Authorization: getCookie("auth") },
    });
  }

  async viewItem(id: string): Promise<AxiosResponse> {
    return this.axios.post(`/view/desire/${id}`, null, {
      headers: { Authorization: getCookie("auth") },
    });
  }

  async getTags(): Promise<AxiosResponse> {
    return this.axios.get(`/tags`, {
      headers: { Authorization: getCookie("auth") },
    });
  }

  async getActivity(id: string, type: string): Promise<AxiosResponse> {
    return this.axios.get(`/activity/${id}`, {
      params: { type: type },
      headers: { Authorization: getCookie("auth") },
    });
  }

  async setAlert(body: any): Promise<AxiosResponse> {
    return this.axios.post(`/set-alert`, body, {
      headers: { Authorization: getCookie("auth") },
    });
  }

  async createBid(forDesireId: string, body: any): Promise<AxiosResponse> {
    return this.axios.post(`/bids/${forDesireId}/create`, body, {
      headers: { Authorization: getCookie("auth") },
    });
  }

  async acceptBid(bidId: string): Promise<AxiosResponse> {
    return this.axios.post(`/bids/accept/${bidId}`, null, {
      headers: { Authorization: getCookie("auth") },
    });
  }

  async getDesires(params: IFilterParams): Promise<AxiosResponse> {
    return this.axios.get(`/desires/all`, {
      params: {
        "sort-dir": params.sortDir,
        "filter-by:": params.filterBy,
        "sort-by": params.sortBy,
        "per-page": 20,
        page: params.page,
      },
      headers: { Authorization: getCookie("auth") },
    });
  }

  async searchDesires(
    params: IFilterParams,
    searchString: string
  ): Promise<AxiosResponse> {
    return this.axios.get(`/desires/search`, {
      params: {
        "search-string": searchString,
        "sort-dir": params.sortDir,
        "filter-by:": params.filterBy,
        "sort-by": params.sortBy,
        "per-page": 20,
        page: params.page,
      },
      headers: { Authorization: getCookie("auth") },
    });
  }

  async getSingleDesire(id: string): Promise<AxiosResponse> {
    return this.axios.get(`/desires/${id}`, {
      headers: { Authorization: getCookie("auth") },
    });
  }

  async getAllBids(desireId: string): Promise<AxiosResponse> {
    return this.axios.get(`/bids/all/${desireId}`, {
      headers: { Authorization: getCookie("auth") },
    });
  }

  async getSingleBid(bidId: string): Promise<AxiosResponse> {
    return this.axios.get(`/bids/${bidId}`, {
      headers: { Authorization: getCookie("auth") },
    });
  }

  async getSingleUser(userId: string): Promise<AxiosResponse> {
    return this.axios.get(`/users/${userId}`, {
      headers: { Authorization: getCookie("auth") },
    });
  }

  async updateUser(): Promise<AxiosResponse> {
    return this.axios.get(`/users`, {
      headers: { Authorization: getCookie("auth") },
    });
  }

  async getUserDesires(userId: string): Promise<AxiosResponse> {
    return this.axios.get(`/users/desires/${userId}`, {
      headers: { Authorization: getCookie("auth") },
    });
  }

  async getUserBids(userId: string): Promise<AxiosResponse> {
    return this.axios.get(`/users/bids/${userId}`, {
      headers: { Authorization: getCookie("auth") },
    });
  }
}

const AuthAPI = new AuthStub();
const CoreAPI = new CoreStub();

export { AuthAPI, CoreAPI };