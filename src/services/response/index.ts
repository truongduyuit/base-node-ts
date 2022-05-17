import { Response } from "express";
import { ErrorCode } from "../../constant/errorCode";
import { HttpCode } from "../../constant/httpCode";
import { API_ERROR, API_RESPONSE } from "../../types";

/**
 *
 * @param res Express Response
 * @param data Response Data
 * @returns
 */
export const sendResponse = (res: Response, data?: API_RESPONSE) => {
  const { httpStatus, ...dataRes } = data;
  return res.status(httpStatus ?? HttpCode.OK).json({
    success: true,
    ...dataRes,
  });
};

/**
 *
 * @param res Express Response
 * @param error Custome Error
 * @returns
 */
export const sendError = (res: Response, error: API_ERROR) => {
  const { httpStatus, errorCode, message } = error;

  return res.status(httpStatus ?? HttpCode.INTERNAL_SERVER_ERROR).json({
    message,
    success: false,
    errorCode: errorCode ?? ErrorCode.INTERNAL_SERVER_ERROR,
  });
};
