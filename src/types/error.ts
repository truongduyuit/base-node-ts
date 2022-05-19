import { HttpCode } from "../constant/httpCode";
import { API_ERROR } from ".";

export class CustomError extends Error {
  private httpStatus: HttpCode;
  private errorCode: string;

  /**
   *
   * @param param0 errorCode, message, httpStatus
   */
  constructor({ errorCode, message, httpStatus }: API_ERROR) {
    super(message);

    this.httpStatus = httpStatus;
    this.errorCode = errorCode;
  }
}
