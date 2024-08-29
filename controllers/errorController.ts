import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";

export default function (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("❤️‍🔥 error caught ", err);
  let error;
  if (err instanceof AppError) error = err;
  else error = new AppError(500, err.message);

  res.status(error.statusCode).json({
    message: error.message,
    error: process.env.NODE_ENV === "dev" ? err : undefined,
  });
}
