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

  async resetPassword(body: any): Promise<AxiosResponse> {
    return this.axios.post("/auth/reset-password", body);
  }
}

class CoreStub extends APIStub {
  constructor() {
    super(process.env.NEXT_PUBLIC_CORE_BASE_URL ?? "");
  }

  async createDesires(body: any, token: string): Promise<AxiosResponse> {
    return this.axios.post(`/desires/create`, body, {
      headers: { Authorization: token },
    });
  }

  async editDesires(
    body: any,
    id: string,
    token: string
  ): Promise<AxiosResponse> {
    return this.axios.patch(`/desires/${id}`, body, {
      headers: { Authorization: token },
    });
  }

  async wantDesires(id: string, token: string): Promise<AxiosResponse> {
    return this.axios.post(`/desires/want/${id}`, null, {
      headers: { Authorization: token },
    });
  }

  async unWantDesires(id: string, token: string): Promise<AxiosResponse> {
    return this.axios.post(`/desires/not-want/${id}`, null, {
      headers: { Authorization: token },
    });
  }

  async viewItem(id: string, token: string): Promise<AxiosResponse> {
    return this.axios.post(`/view/desire/${id}`, null, {
      headers: { Authorization: token },
    });
  }

  async getTags(): Promise<AxiosResponse> {
    return this.axios.get(`/tags`);
  }

  async getMetrics(): Promise<AxiosResponse> {
    return this.axios.get(`/metrics`);
  }

  async getAlertTags(userId: string): Promise<AxiosResponse> {
    return this.axios.get(`/user-tags/${userId}`);
  }

  async getActivity(
    id: string,
    type: string,
    token: string
  ): Promise<AxiosResponse> {
    return this.axios.get(`/activity/${id}`, {
      params: { type: type },
      headers: { Authorization: token },
    });
  }

  async setAlert(body: any, token: string): Promise<AxiosResponse> {
    return this.axios.post(`/set-alert`, body, {
      headers: { Authorization: token },
    });
  }

  async createBid(
    forDesireId: string,
    body: any,
    token: string
  ): Promise<AxiosResponse> {
    return this.axios.post(`/bids/${forDesireId}/create`, body, {
      headers: { Authorization: token },
    });
  }

  async acceptBid(bidId: string, token: string): Promise<AxiosResponse> {
    return this.axios.post(`/bids/accept/${bidId}`, null, {
      headers: { Authorization: token },
    });
  }

  async getDesires(params: IFilterParams): Promise<AxiosResponse> {
    return this.axios.get(`/desires/all`, {
      params: {
        "sort-dir": params.sortDir,
        "filter-by": params.filterBy,
        "sort-by": params.sortBy,
        "per-page": 20,
        page: params.page,
      },
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
    });
  }

  async getSingleDesire(id: string): Promise<AxiosResponse> {
    return this.axios.get(`/desires/${id}`);
  }

  async getAllBids(desireId: string): Promise<AxiosResponse> {
    return this.axios.get(`/bids/all/${desireId}`);
  }

  async getSingleBid(bidId: string): Promise<AxiosResponse> {
    return this.axios.get(`/bids/${bidId}`);
  }

  async getSingleUser(userId: string): Promise<AxiosResponse> {
    return this.axios.get(`/users/${userId}`, {
      headers: { Authorization: getCookie("auth") },
    });
  }

  async updateUser(body: any, token: string): Promise<AxiosResponse> {
    return this.axios.patch(`/users/`, body, {
      headers: { Authorization: token },
    });
  }

  async getUserDesires(userId: string): Promise<AxiosResponse> {
    return this.axios.get(`/users/desires/${userId}`);
  }

  async getUserBids(userId: string): Promise<AxiosResponse> {
    return this.axios.get(`/users/bids/${userId}`);
  }
}

const AuthAPI = new AuthStub();
const CoreAPI = new CoreStub();

export { AuthAPI, CoreAPI };
