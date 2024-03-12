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

export interface IDesirePostParams {}

export interface IOfferMakeParams {}

export interface IEditProfile {}

export interface ISignIn {}

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
