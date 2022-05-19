import { NextFunction, Request, Response } from "express";
import { ErrorCode, HttpCode } from "../../constant";
import { sendError } from "../../services/response";
import { CustomError } from "../../types/error";

const login = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (Object.keys(JSON.parse(JSON.stringify(req.user))).length === 0) {
      throw new CustomError({
        message: "Email or Password invalid",
        errorCode: ErrorCode.UNAUTHORIZED,
        httpStatus: HttpCode.UNAUTHORIZED,
      });
    }

    return res.status(200).json(req.user);
  } catch (error) {
    return sendError(res, error);
  }
};

export default {
  login,
};
