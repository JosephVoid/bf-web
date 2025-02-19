import { MakeAnOfferSchemaType } from "@/components/make-an-offer-form";
import { postDesireFromSchematype } from "@/components/post-desire-form";
import {
  signInFormSchematype,
  signUpFormSchematype,
} from "@/components/profile-forms";

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
  minPrice: number;
  maxPrice: number;
  metric: string;
  views: number;
  wants: number;
  picture?: string;
  postedOn: Date;
  userPostedId: string;
  isClosed: boolean;
  bounty: number;
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
  bidder_id?: string;
  bidder_phone?: string;
  bidder_email?: string;
  bidder_description?: string;
  bidder_picture?: string;
  price: number;
  picture?: string;
  bidOn: Date;
  isClosed: boolean;
  isNegotiable: boolean;
}

export interface ITag {
  id: string;
  name: string;
}

export interface IMetric {
  id: string;
  metric: string;
  display: string;
}

export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  description?: string;
  picture?: string;
  buyerScore: number;
  merchantScore: number;
  percentile: number;
}

export interface IOTP {
  ForReset: boolean;
  email: string;
  phone?: string;
}

export interface APIResponse {
  result: boolean;
  message?: string;
  data?: string;
}

export interface IComment {
  id: string;
  comment: string;
  commentedBy: string;
  commentedOnId: string;
  commentDate: Date;
}

export interface ICommentResponse {
  meta: {
    total: number;
    perPage: number;
    page: number;
  };
  data: IComment[];
}
