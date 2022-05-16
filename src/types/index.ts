import { HttpCode } from "../constant/httpCode";

export type API_RESPONSE = {
  success: boolean;
  data?: any;
  errors?: API_ERROR[];
  message?: string;
};

export type API_ERROR = {
  errorCode: string;
  message: string;
};

export type API_OPTIONS = {
  status: HttpCode;
};
