import { postDesireFromSchematype } from "@/components/post-desire-form";
import {
  signInFormSchematype,
  signUpFormSchematype,
} from "@/components/profile";

export interface ISearchParams {}

export interface IFilterParams {
  sortDir: "ASC" | "DESC";
  filterBy: string;
  sortBy: "Date" | "Price" | "Wanted";
}

export interface IPaginationParams {
  page: number;
  perPage: number;
}

export interface IDesirePostParams extends postDesireFromSchematype {}

export interface IOfferMakeParams {}

export interface IEditProfile {}

export interface ISignIn extends signInFormSchematype {}

export interface ISignUp extends signUpFormSchematype {}

export interface IFileUpload {}

export interface IDesire {
  id: string;
  title: string;
  description: string;
  tags: string[];
  price: number;
  views: number;
  wants: number;
  picture?: string;
  posted_on: Date;
}

export interface IOffer {
  id: string;
  description: string;
  price: number;
  picture?: string;
  posted_on: Date;
}

export interface ITag {
  id: string;
  tag: string;
}

export interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  description?: string;
  picture?: string;
}

export interface IOTP {
  email: string;
  phone: string;
}
