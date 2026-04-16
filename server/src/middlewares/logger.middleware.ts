import { NextFunction, Request, Response } from "express";

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  res.on("finish", () => {
    const responseTimeMs = Date.now() - start;
    console.log(
      `${req.method} ${req.originalUrl} ${res.statusCode} ${responseTimeMs}ms`
    );
  });

  next();
}
