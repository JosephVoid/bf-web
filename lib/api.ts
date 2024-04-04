import axios, { AxiosInstance, AxiosResponse } from "axios";
import { IFilterParams } from "./types";

class APIStub {
  setAuthToken(token: string | undefined) {
    this.axios.defaults.headers.common.Authorization = token;
  }

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
    return this.axios.post(`/desires/create`, body);
  }

  async wantDesires(id: string): Promise<AxiosResponse> {
    return this.axios.post(`/desires/want/${id}`);
  }

  async viewItem(id: string): Promise<AxiosResponse> {
    return this.axios.post(`/view/desire/${id}`);
  }

  async getTags(): Promise<AxiosResponse> {
    return this.axios.get(`/tags`);
  }

  async getActivity(id: string, type: string): Promise<AxiosResponse> {
    return this.axios.get(`/activity/${id}`, { params: { type: type } });
  }

  async setAlert(body: any): Promise<AxiosResponse> {
    return this.axios.post(`/set-alert`, body);
  }

  async createBid(forDesireId: string, body: any): Promise<AxiosResponse> {
    return this.axios.post(`/bids/${forDesireId}/create`, body);
  }

  async acceptBid(bidId: string): Promise<AxiosResponse> {
    return this.axios.post(`/bids/accept/${bidId}`);
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
    return this.axios.get(`/users/${userId}`);
  }

  async updateUser(): Promise<AxiosResponse> {
    return this.axios.get(`/users`);
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
