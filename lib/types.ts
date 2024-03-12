import { formSchema as PostDesireFromSchema } from "@/components/post-desire-form";
import { signInFormSchema } from "@/components/profile";
import z from "zod";

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

export interface IDesirePostParams
  extends z.infer<typeof PostDesireFromSchema> {}

export interface IOfferMakeParams {}

export interface IEditProfile {}

export interface ISignIn extends z.infer<typeof signInFormSchema> {}

export interface ISignUp {}

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
