import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/requestError";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json(err.serializeErrors());
  }

  console.error("Unexpected error:", err);
  res.status(500).json({ message: "Internal Server Error" });
};

export default errorHandler;
