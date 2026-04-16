import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { apiResponse } from "../utils/ApiResponse";

export function errorMiddleware(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error instanceof ApiError) {
    return res
      .status(error.statusCode)
      .json(apiResponse.error(error.message, error.details));
  }

  const message =
    error instanceof Error ? error.message : "Internal Server Error";

  return res.status(500).json(apiResponse.error(message));
}
