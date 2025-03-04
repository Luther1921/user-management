import { Request, Response, NextFunction } from "express";

export const validator = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const isValidPayload = schema(req.body);
    if (isValidPayload === true) {
      next();
    } else {
      res.status(400).json({ error: isValidPayload[0].message });
    }
  };
};
