import { HttpCode } from "../constant/httpCode";

export type API_RESPONSE = {
  data?: any;
  message?: string;
  httpStatus?: HttpCode;
};

export type API_ERROR = {
  errorCode: string;
  message?: string;
  httpStatus?: HttpCode;
};
