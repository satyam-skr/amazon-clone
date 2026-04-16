import { Request, RequestHandler } from "express";
import { ZodTypeAny } from "zod";
import { ApiError } from "../utils/ApiError";

type RequestSource = "body" | "query" | "params" | "headers";

export const validate =
  (schema: ZodTypeAny, source: RequestSource): RequestHandler =>
  (req, _res, next) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      return next(new ApiError(400, "Validation failed", result.error.flatten()));
    }

    (req as Request)[source] = result.data;
    return next();
  };
