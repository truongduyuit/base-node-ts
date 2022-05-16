import { Response } from "express";
import { HttpCode } from "../../constant/httpCode";
import { API_OPTIONS, API_RESPONSE } from "../../types";

export const sendResponse = (
  res: Response,
  data: API_RESPONSE,
  options?: API_OPTIONS
) => {
  const status = options.status ?? HttpCode.OK;
  return res.status(status).json(data);
};

export const sendError = (
  res: Response,
  data: API_RESPONSE,
  options?: API_OPTIONS
) => {
  const status = options.status ?? HttpCode.INTERNAL_SERVER_ERROR;
  return res.status(status).json(data);
};
