import { PopulateOptions } from "mongoose";

export interface IQuery {
  query?: any;
  page?: number;
  limit?: number;
  sort?: any;
  select?: string;
  options?: any;
}

export interface IPopulate {
  query?: any;
  populate: PopulateOptions | (string | PopulateOptions)[];
  sort?: any;
  select?: string;
  page: number;
  limit: number;
}

export interface IUpdateAndPopulate {
  query?: any;
  populate: PopulateOptions | (string | PopulateOptions)[];
  select?: string;
  data: any;
  options?: any;
}
