import { MakeAnOfferSchemaType } from "@/components/make-an-offer-form";
import { postDesireFromSchematype } from "@/components/post-desire-form";
import {
  signInFormSchematype,
  signUpFormSchematype,
} from "@/components/profile";

export interface ISearchParams {}

export interface IFilterParams {
  sortDir: string;
  filterBy: string;
  sortBy: string;
  page: string;
  search: string;
}

export interface IPaginationParams {
  page: number;
  perPage: number;
}

export interface IDesirePostParams extends postDesireFromSchematype {}

export interface IOfferMakeParams extends MakeAnOfferSchemaType {}

export interface IEditProfile {}

export interface ISignIn extends signInFormSchematype {}

export interface ISignUp extends signUpFormSchematype {}

export interface IFileUpload {
  file: File;
  name: string;
}

export interface IDesire {
  id: string;
  title: string;
  description: string;
  tags: string[];
  price: number;
  views: number;
  wants: number;
  picture?: string;
  postedOn: Date;
}

export interface IDesireMeta {
  meta: {
    total: number;
    perPage: number;
    page: number;
  };
  result: IDesire[];
}

export interface IDesireDisplayParams {}

export interface IOffer {
  id: string;
  description: string;
  for_desire: string;
  bidder: string;
  bidder_phone?: string;
  bidder_email?: string;
  bidder_description?: string;
  bidder_picture?: string;
  price: number;
  picture?: string;
  bidOn: Date;
}

export interface ITag {
  id: string;
  name: string;
}

export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  description?: string;
  picture?: string;
}

export interface IOTP {
  email: string;
  phone: string;
}
