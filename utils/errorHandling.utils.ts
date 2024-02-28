import { NextFunction, Request, Response } from "express";

import {
  badRequestResponse,
  serverErrorResponse,
} from "../services/Response/Response"

export const handleErrors = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Globally handled error ->", { err });

  if (err?.name?.includes("Sequelize")) {
    const errors = err?.errors || [];
    const firstError = errors[0] || {};

    const message =
      firstError?.message || err?.original?.message || err.message;

    serverErrorResponse(res, message);
    return null;
  }

  console.log({ errMsg: err.message });
  serverErrorResponse(res, err.message);
  return;
};

export default handleErrors
